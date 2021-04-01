// 引入用来发送请求的方法
import { request } from "../../request/index.js";

import regeneratorRuntime from '../../lib/runtime/runtime';

//Page Object
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航数组
    cateList: [],
    // 楼层数组
    floorList: []
  },

  // 页面开始加载就会触发
  //options(Object)
  onLoad: function (options) {
    // 发送异步请求获取轮播图数据

    // 复杂写法
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     // console.log(result);
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   }
    // });

    // 调用轮播图数据函数
    this.getSwiperList();

    // 调用导航数据函数
    this.getCateList();

    // 调用楼层数据函数
    this.getFloorList();
  },

  // 获取轮播图数据
  async getSwiperList() {
    try {
      // // 优化写法 通过promise
      // request({
      //   url: "/home/swiperdata"
      // }).then(result => {
      //   this.setData({
      //     swiperList: result.data.message
      //   })
      // })
      // // .then({})

      // 再优化写法 使用es7的async await来发送请求
      const result = await request({ url: "/home/swiperdata" });
      // 由于后台返回数据问题，所以前端要修改url路径
      result.data.message.forEach((v, i) => {
        result.data.message[i].navigator_url = v.navigator_url.replace('main', 'goods_detail');
      });
      this.setData({
        swiperList: result.data.message
      })
    } catch (error) {
      console.log(error);
    }
  },

  // 获取导航数据
  async getCateList() {
    try {
      // // 优化写法 通过promise
      // request({
      //   url: "/home/catitems"
      // }).then(result => {
      //   this.setData({
      //     cateList: result.data.message
      //   })
      // })
      // // .then({})

      // 再优化写法 使用es7的async await来发送请求
      const result = await request({ url: "/home/catitems" });
      this.setData({
        cateList: result.data.message
      })
    } catch (error) {
      console.log(error);
    }
  },

  // 获取楼层数据
  async getFloorList() {
    try {
      // // 优化写法 通过promise
      // request({
      //   url: "/home/floordata"
      // }).then(result => {
      //   this.setData({
      //     floorList: result.data.message
      //   })
      // })
      // // .then({})

      // 再优化写法 使用es7的async await来发送请求
      const result = await request({ url: "/home/floordata" });
      console.log(result);
      // 由于后台返回数据问题，所以前端要修改url路径
      for (let k = 0; k < result.data.message.length; k++) {
        result.data.message[k].product_list.forEach((v, i) => {
          result.data.message[k].product_list[i].navigator_url = v.navigator_url.replace('?', '/goods_list?');
        });
      }
      this.setData({
        floorList: result.data.message
      })
    } catch (error) {
      console.log(error);
    }
  }

});