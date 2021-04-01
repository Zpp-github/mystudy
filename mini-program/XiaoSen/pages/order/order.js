// pages/order/order.js
/**
 * 页面被打开的时候 onShow
 *     onShow不同于onLoad，onShow无法在形参上接收options参数
 *     onShow只要页面显示就重新请求，而onLoad只请求一次
 *   判断缓存中有没有token
 *     没有就直接跳转到授权页面
 *     有就直接往下进行
 *   获取url上的参数type
 *   根据type来决定页面标题的数组元素，那个被激活选中
 *   根据type去发送请求获取订单数据
 *   渲染页面
 * 点击不同的标题重新发送请求来获取和渲染数据
 */

// 引入用来发送请求的方法
import { request } from "../../request/index.js";

import regeneratorRuntime from '../../lib/runtime/runtime';


Page({
  data: {
    orders: [],
    tabs: [
      {
        id: 0,
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "待收货",
        isActive: false
      },
      {
        id: 3,
        value: "退款/退货",
        isActive: false
      }
    ]
  },

  // onLoad(options) {
  //   console.log(options);
  // },

  onShow(options) {
    // console.log(options);
    // onShow无法在形参上接收options参数
    const token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/auth'
      });
      return;
    }

    // 获取当前小程序的页面栈--数组，长度最大是10页面
    // 数组中，索引最大的页面就是当前页面
    let curPages = getCurrentPages();
    let currentPages = curPages[curPages.length - 1];
    // console.log(currentPages.options);
    const { type } = currentPages.options;
    // 激活选中页面标题
    this.changeTitleByIndex(type - 1);
    // 获取url上的type参数
    this.getOrders(currentPages.options);
  },

  // 获取订单列表的方法
  async getOrders(type) {
    const res = await request({ url: "/my/orders/all", data: { type } });
    // console.log(res.data.message);
    this.setData({
      orders: res.orders.map(v => ({ ...v, create_time_cn: (new Date(v.create_time * 1000).toLocaleString()) }))
    })
  },

  // 根据标题索引来激活选中标题数组
  changeTitleByIndex(index) {
    // 修改源数组
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 赋值到data中
    this.setData({
      tabs
    })
  },

  // 标题点击事件 从子组件传递过来
  handleTabsItemChange(e) {
    // console.log(e);
    // 获取被点击的标题索引
    const { index } = e.detail;
    this.changeTitleByIndex(index);
    // 重新发送请求
    this.getOrders(index + 1);
  }
})