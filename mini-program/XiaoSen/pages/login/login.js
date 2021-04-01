// pages/login/login.js
Page({
  handleGetUserInfo(e) {
    const { userInfo } = e.detail;
    // console.log(userInfo);
    wx.setStorageSync("userInfo", userInfo);
    wx.navigateBack({
      delta: 1
    });
  }
})