// 引入用来发送请求的方法
import { request } from "../../request/index.js";

import regeneratorRuntime from '../../lib/runtime/runtime';

// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 被点击的左侧菜单
    currentIndex: 0,

    // 右侧商品数据
    rightContent: [],
    // 右侧内容的滚动条距离顶部的距离
    scrollTop: []
  },

  // 接口的返回数据
  Category: [],


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     * 先判断一下本地存储中有没有旧的数据：{time: Data.now(), data:[...]}
     * 如果没有旧数据，就直接发送新请求
     * 如果有旧数据，同时旧数据也没有过期，使用本地存储中的旧数据即可
     */

    // 获取本地存储中的数据
    const Cates = wx.getStorageSync("categlories");
    // 判断
    if (!Cates) {
      // console.log("1");
      // 不存在 发送请求获取数据
      this.getCategoryList();
    } else {
      // 存在 定义过期时间
      if (Date.now() - Cates.time > 1000 * 300) {
        // console.log("2");
        // 超过10s 重新发送请求
        this.getCategoryList();
      } else {
        // console.log("3");
        // 可以使用旧的数据
        this.Cate = Cates.data;

        // 构造左侧大菜单数据
        let leftMenuList = this.Cate.map(v => v.cat_name);

        // 构造右侧商品数据
        let rightContent = this.Cate[0].children;

        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },

  // 获取分类数据
  async getCategoryList() {
    try {
      // // 优化写法 通过promise
      // request({
      //   url: "/categories"
      // }).then(result => {
      //   // console.log(result);
      //   this.Cate = result.data.message;

      //   // 构造左侧大菜单数据
      //   let leftMenuList = this.Cate.map(v => v.cat_name);

      //   // 构造右侧商品数据
      //   let rightContent = this.Cate[0].children;

      //   this.setData({
      //     leftMenuList,
      //     rightContent
      //   })

      //   // 把接口的数据存入到本地存储中
      //   wx.setStorageSync("categlories", { time: Date.now(), data: this.Cate });
      // })
      // // .then({})

      // 再优化写法 使用es7的async await来发送请求
      const result = await request({ url: "/categories" });
      this.Cate = result.data.message;

      // 把接口的数据存入到本地存储中
      wx.setStorageSync("categlories", { time: Date.now(), data: this.Cate });

      // 构造左侧大菜单数据
      let leftMenuList = this.Cate.map(v => v.cat_name);

      // 构造右侧商品数据
      let rightContent = this.Cate[0].children;

      this.setData({
        leftMenuList,
        rightContent
      })
    } catch (error) {
      console.log(error);
    }
  },

  // 左侧菜单点击事件
  handleItemTp(e) {
    // console.log(e);
    // console.log(e.currentTarget.dataset);
    // console.log(e.currentTarget.dataset.index);
    // 1. 获取被点击的标题的索引
    const { index } = e.currentTarget.dataset;
    // 或 const index = e.currentTarget.dataset.index;

    // 2. 根据不同的索引来渲染右侧的商品内容
    let rightContent = this.Cate[index].children;

    this.setData({
      currentIndex: index,
      rightContent,
      // 重新设置 右侧内容的scroll-view标签的距离顶部的距离
      scrollTop: 0
    })

  }
})


/**
 * web中的本地存储和小程序中的本地存储的区别
 * 1. 代码不同
 *   web: localStorage.setItem("key", "value"); localStorage.getItem("key");
 *   小程序: wx.setStorageSync("key","value"); wx.getStorageSync("key");
 * 2. 存储的时候有无做类型转换
 *   web：不过存入的是什么类型的数据，最终都会先调用一下toString()，把数据变成了字符串再存入
 *   小程序：不需要类型转换，存什么类型的数据进去，获取的时候就是什么类型
 */