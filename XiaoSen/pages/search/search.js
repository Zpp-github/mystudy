// pages/search/search.js
/**
 * 1. 输入框绑定，值改变事件，input事件
 *    获取到输入框的值
 *    合法性判断
 *    检验通过，把输入框的值发送到后台
 *    返回的数据打印到页面上
 * 2. 防抖（防止抖动），定时器，节流
 *    防抖 一般 输入框中 防止重复输入 重复发送请求
 *    节流 一般是用在页面下拉和上拉
 *    定义全局的定时器id
 */

// 引入用来发送请求的方法
import { request } from "../../request/index.js";

import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    // 取消按钮是否显示
    isFocus: false,
    // 输入框的值
    inpValue: ""
  },

  // 定义全局的定时器
  TimeId: -1,

  // 输入框的值改变，就会触发该事件
  handleInput(e) {
    // 获取输入框的值
    const { value } = e.detail;
    // 检测合法性
    if (!value.trim()) {
      // 不合法
      this.setData({
        goods: [],
        isFocus: false
      })
      clearTimeout(this.TimeId);
      return;
    }
    // 发送请求获取数据
    this.setData({
      isFocus: true
    })
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.qsearch(value);
    }, 600);
  },

  async qsearch(query) {
    const res = await request({ url: "/goods/qsearch", data: { query } });
    this.setData({
      goods: res.data.message
    })
  },

  handleCancel() {
    this.setData({
      goods: [],
      isFocus: false,
      inpValue: ""
    })
  }
})