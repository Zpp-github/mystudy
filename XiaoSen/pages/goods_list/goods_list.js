/**
 * 用户上滑页面，滚动条触底，开始加载下一页数据
 * 1. 找到滚动条触底事件(微信小程序官方开发文档)
 * 2. 获取到总页数和当前的页码
 *    总页数 = Math.ceil(总条数 / 页容量)
 *    总条数 total
 *    页容量 pagesize
 *    页码pagenum
 * 3. 判断还有没有下一页数据
 *    如果当前页码大于等于总页数，则表示没有下一页数据，弹出提斯
 *    如果当前页码小于总页数，则表示有下一页数据，加载下一页数据
 *       当前页码++
 *       重新发送请求
 *       数据请求回答 要对data中的数组进行拼接，而不是全部替换
 * 4. 下拉刷新页面
 *    触发下拉刷新事件，需要再页面的json文件中开启一个配置项，"enablePullDownRefresh": true, 如果已经在app.json中开启全局配置，则无需再开启
 *    重置数组数据
 *    重置页码，设为1
 *    重新发送请求
 */


// 引入用来发送请求的方法
import { request } from "../../request/index.js";

import regeneratorRuntime from '../../lib/runtime/runtime';

// pages/goods_list/goods_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],

    // 商品列表数据
    goodsList: []
  },

  // 接口要的参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },

  // 总页数
  totalPages: 1,// 赋值 默认值

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.QueryParams.cid = options.cid || "";
    this.QueryParams.query = options.query || "";
    this.getGoodsList();
  },

  // 标题点击事件 从子组件传递过来
  handleTabsItemChange(e) {
    // console.log(e);
    // 获取被点击的标题索引
    const { index } = e.detail;
    // 修改源数组
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 赋值到data中
    this.setData({
      tabs
    })
  },


  // 获取商品列表数据
  async getGoodsList() {
    try {
      const result = await request({ url: "/goods/search", data: this.QueryParams });
      // 获取总条数
      const total = result.data.message.total;
      // console.log(total);
      // 计算总页数
      this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
      // console.log(this.totalPages);
      this.setData({
        // 拼接数组
        goodsList: [...this.data.goodsList, ...result.data.message.goods]
      })

      // 优化 数据请求回来即关闭下拉刷新窗口，减少等待时间
      wx.stopPullDownRefresh();
    } catch (error) {
      console.log(error);
    }
  },


  // 页面上滑，滚动条触底事件
  onReachBottom() {
    // 判断还有没有下一页
    if (this.QueryParams.pagenum >= this.totalPages) {
      wx.showToast({ title: '到底了，不要再往下拉了 >_<', icon: 'none', duration: 2500 });
    } else {
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },


  // 下拉刷新页面
  onPullDownRefresh() {
    // 重置数组数据
    this.setData({
      goodsList: []
    })
    // 重置页码
    this.QueryParams.pagenum = 1;
    // 重新发送请求
    this.getGoodsList();
  }
})