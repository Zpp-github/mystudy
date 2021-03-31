// pages/demo01/demo01.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: 'Hello WeChat',
    num: 100,
    yORn: true,
    person: {
      name: 'LiLy',
      age: 1,
      weight: 85,
      height: 165
    },
    id: 10,
    isChecked: false,
    name: 'LiLy',
    array: [{
      id:0,
      message:'foo'
    }, {
      id: 1,
      message: 'bar'
    }]
  },
  // 输入框的input事件的执行逻辑
  handleInput(e) {
    console.log("哈哈");
    console.log(e);
    console.log(e.detail.value);
    console.log(e.currentTarget.dataset);
    this.setData({
      num: e.detail.value
    })
  },
  // 加减按钮事件
  handleTap(e) {
    console.log(e);
    console.log(e.currentTarget.dataset.operation);
    var operation = e.currentTarget.dataset.operation;
    this.setData({
      num: Number(this.data.num) + Number(operation)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})