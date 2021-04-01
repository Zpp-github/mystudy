// pages/cart/cart.js

/**
 * 1. 获取用户的收货地址
 *   1.1 绑定点击事件
 *   1.2 调用小程序内置api  chooseAddress
 * 2. 获取用户对小程序所授予获取地址的权限状态 scope
 *   2.1 假设用户获取收货地址的提示框 【确定】  scope值为true
 *       直接调用收货地址的api
 *   2.2 假设用户从来没有调用过收货地址的api scope值为undefined
 *       直接调用收货地址的api
 *   2.3 假设用户获取收货地址的提示框 【取消】  scope值为false
 *       引导用户自己打开授权设置页面，当用户重新给与获取地址权限的时候获取收货地址
 *   2.4 把获取到的收货地址存入到本地存储中
 * 3. 页面加载完毕
 *   3.1 onLoad onShow
 *   3.2 获取本地存储中的地址数据
 *   3.3 把数据设置给data中的一个变量
 * 4. 获取用户加入购物车的商品
 *   onShow
 *   在商品详情页面.js，第一次添加商品的时候手动添加属性：num=1; checked=true;
 *   获取本地存储中的购物车数组
 *   把购物车数据填充到data中
 * 5. 全选
 *   onShow 获取缓存中的购物车数组
 *   根据购物车中的商品数据 所有的商品都被选中 checked=true
 * 6. 总价格和总数量
 *    都需要商品被选中
 *    获取购物车数组
 *    遍历
 *    判断商品是否被选中
 *    总价格+=商品的单价*商品数量
 *    总数量+=商品的数量
 *    把计算后的价格和数量设置回data中
 * 7. 商品的选中
 *    绑定change事件
 *    获取到被修改的商品对象
 *    商品对象的选中状态 取反
 *    重新填重回data中和缓存中
 *    重新计算全选 总价格 总数量
 * 8. 全选和反选
 *    全选复选框绑定事件 change
 *    获取 data中的全选变量 allChecked
 *    直接取反 allChecked =! allChecked
 *    遍历购物车数组让里面商品的选中状态跟随 allChecked 改变而改变
 *    把购物车数组和 allChecked 重新设置回data，把购物车重新设置回缓存中
 * 9. 商品数量的编辑
 *    "+" "-" 按钮绑定同一个点击事件，区分的关键是自定义属性
 *       “+” "+1"
 *       "-" "-1"
 *    传递被点击的商品id goods_id
 *    获取data中的购物车数组来获取需要被修改的商品对象
 *       当购物车的数量为1时，用户点击 "-"，要弹窗提示(showModal) 询问用户是否要删除此商品
 *         确定 直接执行删除
 *         取消  什么都不做 
 *    直接修改商品对象的数量 num
 *    把cart数组重新设置回缓存和data中 this.setCart
 * 10. 点击结算
 *    判断有没有收货地址信息
 *    判断用户有没有选购商品
 *    经过以上的验证后跳转到支付页面 
 */


// // 引入用来发送请求的方法
import { getSetting, chooseAddress, openSetting, showModal, showToast } from "../../utils/asyncWx.js";

import regeneratorRuntime from '../../lib/runtime/runtime';


Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  // 获取缓存中的购物车数组
  onShow() {
    // 获取本地存储中的地址数据
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("carts") || [];
    // console.log(cart);

    this.setData({
      address
    });
    this.setCart(cart);
  },


  // 点击收货地址
  async handleChooseAddress() {
    try {
      // wx.getSetting({
      //   success: (result) => {
      //     // console.log(result);
      //     // 获取权限状态
      //     const scopeAddress = result.authSetting["scope.address"];
      //     if (scopeAddress === true || scopeAddress === undefined) {
      //       wx.chooseAddress({
      //         success: (result1) => {
      //           // console.log(result1);
      //           // 把获取到的收货地址存入到本地存储中
      //           wx.setStorageSync("address", result1);
      //         }
      //       });
      //     } else {
      //       // 用户以前拒绝过授予权限 先引导用户打开授权页面
      //       wx.openSetting({
      //         success: (result2) => {
      //           wx.chooseAddress({
      //             success: (result3) => {
      //               // console.log(result3);
      //               // 把获取到的收货地址存入到本地存储中
      //               wx.setStorageSync("address", result3);
      //             }
      //           });
      //         }
      //       })
      //     }
      //   }
      // });

      // 优化(promise)  获取权限状态
      const result = await getSetting();
      const scopeAddress = result.authSetting["scope.address"];
      // 判断权限状态
      if (scopeAddress === false) {
        // 用户以前拒绝过授予权限 先引导用户打开授权页面
        await openSetting();
      }
      // 调用获取收货地址的api
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      // console.log(res2);
      // 把获取到的收货地址存入到本地存储中
      wx.setStorageSync("address", address);

    } catch (error) {
      error;
    }
  },

  // 商品的选中
  handeItemChange(e) {
    // 获取被修改的商品id
    const good_id = e.currentTarget.dataset.id;
    // console.log(good_id);
    // 获取购物车数组
    let { cart } = this.data;
    // 找到被修改的商品对象
    let index = cart.findIndex(v => v.data.message.goods_id === good_id);
    // 选中状态取反
    cart[index].checked = !cart[index].checked;

    this.setCart(cart);
  },

  // 设置购物车状态同时，重新计算底部工具栏的数据 全选 总价格 购买数量
  setCart(cart) {
    // 把购物车数据重新设置回data中缓存

    // 计算全选
    // every 数组方法，会遍历，会接收一个回调函数，如果每个回调函数都返回true，你们every方法的返回值为true; 但是空数组调用every，返回值也是true
    // some 数组方法，会遍历，会接收一个回调函数，如果有一个回调函数返回true，你们every方法的返回值为true
    // const allChecked = cart.every(v => v.checked);
    // const allChecked = cart.length ? cart.every(v => v.checked) : false;
    // 优化
    let allChecked = true;

    // 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.data.message.goods_price * v.num;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    })

    // 判断数组即购物车是否为空
    allChecked = cart.length != 0 ? allChecked : false;

    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    });

    wx.setStorageSync("cart", cart);
  },

  // 商品全选
  handleItemAllCheck() {
    // 获取data中的数据
    let { cart, allChecked } = this.data;
    // 修改值
    allChecked = !allChecked;
    // 循环修改cart数组中的商品选中状态
    cart.forEach(v => v.checked = allChecked);

    this.setCart(cart);
  },

  //商品数量的编辑功能
  async handleItemNumEdit(e) {
    // 获取传递过来的参数
    const { operation, id } = e.currentTarget.dataset;
    // console.log(operation, id);

    // 获取购物车数组
    let { cart } = this.data;
    // 找到被修改的商品对象
    let index = cart.findIndex(v => v.data.message.goods_id === id);
    if (cart[index].num === 1 && operation === -1) {
      try {
        // 弹窗提示
        // wx.showModal({
        //   title: '提示',
        //   content: '您是否要删除此商品？',
        //   success:(res) =>{
        //     if (res.confirm) {
        //       cart.splice(index, 1);
        //       this.setCart(cart);
        //     } else if (res.cancel) {
        //       console.log('用户点击取消');
        //     }
        //   }
        // })

        // 优化(promise)  获取权限状态
        const result = await showModal({ content: '您是否要删除此商品？' });
        if (result.confirm) {
          cart.splice(index, 1);
          this.setCart(cart);
        }
      } catch (error) {
        error;
      }
    } else {
      // 进行修改数量
      cart[index].num += operation;
    }
    this.setCart(cart);
  },

  // 先判断再跳转结算页面
  async handlePay() {
    const { address, totalNum } = this.data;
    if (!address.userName) {
      await showToast({ title: '还没有收货地址' });
    }
    // else if (totalNum === 0) {
    //   // 判断用户是否选购商品
    //   await showToast({ title: '还没有选购商品' });
    //   return;
    // }
    else {
      // 跳转至支付页面
      wx.navigateTo({
        url: '/pages/pay/pay'
      })
    }
  }
})