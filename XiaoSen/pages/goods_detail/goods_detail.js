/**
 * 1. 发送请求获取数据 
 * 2. 点击轮播图预览大图
 *   给轮播图绑定点击事件
 *   调用小程序的api  previewImage 
 * 3. 点击 加入购物车
 *   先绑定点击事件
 *   获取缓存中的购物车数据 数组格式
 *   先判断当前的商品是否已经存在于购物车
 *      已经存在 修改商品数据，执行购物车数量++，重新把购物车数组填充回缓存中
 *      不存在于购物车的数组中 直接给购物车数组添加一个新元素，新元素带上购买数量属性num，重新把购物车数组填充回缓存中
 *   弹出提示
 * 4. 商品收藏
 *   页面onShow的时候，加载缓存中的商品收藏的数据
 *   判断当前商品是不是被收藏
 *     如果是，改变页面的图标
 *     如果不是 。。
 *   点击商品收藏按钮
 *     判断该商品是否存在于缓存数组中
 *       如果已经存在，把该商品删除
 *       如果没有存在，把商品添加到收藏数组中，存入到缓存中即可
 */



// 引入用来发送请求的方法
import { request } from "../../request/index.js";

import regeneratorRuntime from '../../lib/runtime/runtime';


// pages/goods_detail/goods_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetailObj: {},
    // 商品是否被收藏
    isCollect: false
  },

  // 商品对象
  GoodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   const { goods_id } = options;
  //   // console.log(goods_id);
  //   this.getGoodsDetail(goods_id);
  // },
  onShow: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    const { goods_id } = options;
    // console.log(goods_id);
    this.getGoodsDetail(goods_id);
  },

  // 收藏
  handleCollect() {
    let isCollect = false;
    // 获取缓存中的商品收藏按钮
    let collect = wx.getStorageSync("collect") || [];
    // 判断该商品是否被收藏过
    let index = collect.findIndex(v => v.data.message.goods_id === this.GoodsInfo.data.message.goods_id);
    if (index !== -1) {
      // 已被收藏
      collect.splice(index, 1);
      isCollect = false;
    } else {
      // 未收藏
      collect.push(this.GoodsInfo);
      isCollect = true;
    }
    // 把数组存入到缓存中
    wx.setStorageSync("collect", collect);
    // 修改data中的属性 isCollect
    this.setData({
      isCollect
    })
  },

  // 获取商品详情数据
  async getGoodsDetail(goods_id) {
    try {
      const goodsDetailObj = await request({ url: "/goods/detail", data: { goods_id } });
      // console.log(goodsDetailObj.data.message.pics);
      // console.log(goodsDetailObj.data.message.goods_name);
      this.GoodsInfo = goodsDetailObj;
      // 1 获取缓存中的商品收藏的数组
      let collect = wx.getStorageSync("collect") || [];
      // 2 判断当前商品是否被收藏
      let isCollect = collect.some(v => v.data.message.goods_id === this.GoodsInfo.data.message.goods_id);
      this.setData({
        goodsDetailObj: {
          goods_name: goodsDetailObj.data.message.goods_name,
          goods_price: goodsDetailObj.data.message.goods_price,
          // iphone部分手机 不识别 webp图片格式 
          // 最好找到后台 让他进行修改 
          // 临时自己改 确保后台存在 name.webp => name.jpg 
          goods_introduce: goodsDetailObj.data.message.goods_introduce.replace(/\.webp/g, '.jpg'),
          pics: goodsDetailObj.data.message.pics
        },
        isCollect
      })
    } catch (error) {
      console.log(error);
    }
  },

  // 点击轮播图预览大图
  handlePrevewImage(e) {
    // 先构造要预览图片的数组
    // map指定的这个属性创建一个新数组，v是每一个元素
    const urls = this.GoodsInfo.data.message.pics.map(v => v.pics_mid);
    // 接收传递过来的图片url
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    })
  },


  // 点击加入购物车
  handleCartAdd() {
    // 获取缓存中的购物车 数组
    let cart = wx.getStorageSync("carts") || [];

    // 判断商品对象是否存在于购物车数组中
    let index = cart.findIndex(v => v.data.message.goods_id === this.GoodsInfo.data.message.goods_id);
    // console.log(index);
    if (index === -1) {
      // 不存在 第一次添加
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo);
    } else {
      // 存在 执行num++
      cart[index].num++;
    }

    // 把购物车重新添加回缓存中
    wx.setStorageSync("carts", cart);

    // 弹窗提示
    wx.showToast({
      title: '已加入购物车',
      icon: 'success',
      mask: true
    })
  }
})