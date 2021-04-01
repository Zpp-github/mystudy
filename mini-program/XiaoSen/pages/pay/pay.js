/**
 * 1. 页面加载的时候，从缓存中获取购物车数据，渲染到页面中
 *    这些数据  checked=true 
 * 2. 微信支付
 *    哪些人，哪些帐号可以实现微信支付
 *      企业帐号
 *      企业帐号的小程序后台中必须给开发者添加上白名单
 *        一个appid可以同时绑定多个开发者
 *        这些开发者就可以公用这个appid和它的开发权限
 * 3. 支付按钮
 *    先判断缓存中有没有token
 *    如果没有，就跳转到授权页面，进行获取token
 *    如果有token 。。。
 *      创建订单获取订单编号
 *      已经完成了微信支付
 *      手动删除缓存中已经被选中了的商品
 *      删除后的购物车数据填充回缓存
 *      再跳转页面
 */



// 引入用来发送请求的方法
import { showToast, requestPayment } from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/index.js";

Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },

  // 获取缓存中的购物车数组
  onShow() {
    // 获取本地存储中的地址数据
    const address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart") || [];
    // console.log(cart);

    // 过滤后的购物车数组
    cart = cart.filter(v => v.checked);

    // 设置购物车状态同时，重新计算底部工具栏的数据 全选 总价格 购买数量
    // 把购物车数据重新设置回data中缓存

    // 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.data.message.goods_price * v.num;
      totalNum += v.num;
    })

    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
  },

  // 点击 支付 
  async handleOrderPay() {
    try {
      // 判断缓存中有没有token 
      const token = wx.getStorageSync("token");
      // 判断
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/auth'
        });
        return;
      }
      // 创建订单
      // 准备 请求头参数
      // const header = { Authorization: token };
      // 准备 请求体参数
      const order_price = this.data.totalPrice;
      const consignee_addr = this.data.address.all;
      const cart = this.data.cart;
      let goods = [];
      cart.forEach(v => goods.push({
        goods_id: v.data.message.goods_id,
        goods_number: v.num,
        goods_price: v.data.message.goods_price
      }))
      const orderParams = { order_price, consignee_addr, goods };
      // 准备发送请求 创建订单 获取订单编号
      const { order_number } = await request({ url: "/my/orders/create", method: "POST", data: orderParams });
      console.log(order_number);
      // 发起预支付接口
      const { pay } = await request({ url: "/my/orders/req_unifiedorder", method: "POST", data: { order_number } });
      console.log(pay);
      // 发起微信支付 
      await requestPayment(pay);
      // 查询后台订单状态
      const res = await request({ url: "/my/orders/chkOrder", method: "POST", data: { order_number } });
      await showToast({ title: "支付成功" });
      // 手动删除缓存中已经支付了的商品
      let newCart = wx.getStorageSync("cart");
      newCart = newCart.filter(v => !v.checked);
      wx.setStorageSync("cart", newCart);

      // 支付成功了,跳转到订单页面
      wx.navigateTo({
        url: '/pages/order/order'
      });

    } catch (error) {
      await showToast({ title: "支付失败" })
      console.log(error);
    }
  }
})