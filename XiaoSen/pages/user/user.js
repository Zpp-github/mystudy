// pages/user/user.js
Page({
  data: {
    userinfo: {},
    collectNums: 0
  },

  onShow() {
    const userinfo = wx.getStorageSync("userInfo");
    const collect = wx.getStorageSync("collect");
    this.setData({
      userinfo,
      collectNums: collect.length
    })
  }
})