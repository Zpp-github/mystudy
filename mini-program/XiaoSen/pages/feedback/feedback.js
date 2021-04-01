// pages/feedback/feedback.js

/**
 * 1. 点击 “+” 触发tap点击事件
 *    调用小程序内置的选择图片的api
 *    获取到图片的路径 数组
 *    把图片路径存到data的变量中
 *    页面就可以根据图片数组进行循环显示自定义组件
 * 2. 点击自定义图片组件
 *    获取被点击的元素的索引
 *    获取data中的图片数组
 *    根据索引数组中删除对应的元素
 *    把数组重新设置回data中
 * 3. 点击 “提交”
 *    获取文本域的内容，类似输入框的获取
 *      data中定义变量表示输入框内容
 *      文本域绑定输入事件，事件触发的时候把输入框的值存入到变量中 
 *    对这些内容进行合法性验证
 *    验证通过，用户选择的图片上传到专门的图片的服务器，返回图片外网的链接
 *      遍历图片数组 
 *      挨个上传
 *      自己再维护图片数组，存放图片上传后的外网的链接
 *    文本域和外网的图片的路径一起提交到服务器，前端的模拟不会发送请求到后台。。。 
 *    清空当前页面
 *    返回上一页 
 */


Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品、商家投诉",
        isActive: false
      }
    ],
    // 被选中的图片的路径 数组
    chooseImgs: [],
    // 文本域的内容
    textVal: ""
  },

  // 外网的图片的路径数组
  UpLoadImgs: [],

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

  // 点击 “+” 触发tap点击事件
  handleChooseImg() {
    // 调用小程序内置的选择图片的api
    wx.chooseImage({
      // 最多可以选择的图片的张数
      count: 6,
      // 所选图片的尺寸
      sizeType: ['original', 'compressed'],
      // 选择图片的来源
      sourceType: ['album', 'camera'],
      // 成功
      success: (result) => {
        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      }
    });
  },

  // 点击自定义图片组件
  handleRemoveImg(e) {
    // 获取被点击的元素的索引
    const { index } = e.currentTarget.dataset;
    // 获取data中的图片数组
    let { chooseImgs } = this.data;
    // 根据索引数组中删除对应的元素
    chooseImgs.splice(index, 1);
    this.setData({
      chooseImgs
    })
  },

  // 文本域输入事件
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value
    })
  },

  // 点击提交按钮
  handleFormSubmit() {
    // 获取文本域的内容，类似输入框的获取
    const { textVal, chooseImgs } = this.data;
    // 验证是否合法
    if (!textVal.trim()) {
      // 不合法
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true,
      });
      return;
    }

    // 用户选择的图片上传到专门的图片的服务器，返回图片外网的链接
    // 显示正在等待的图片
    wx.showLoading({
      title: "正在上传中",
      mask: true
    });
    // 判断有没有需要上传的图片数组
    if (chooseImgs.length != 0) {
      chooseImgs.forEach((v, i) => {
        wx.uploadFile({
          // 图片要上传到哪里
          url: 'https://img.coolcr.cn/api/upload',
          // 被上传的文件的路径
          filePath: v,
          // 上传的文件的名称，后台要获取文件file
          // name要与图床api中file类型的变量名相同，图床api中其他的变量赋值要在formdata中写
          name: "image",
          // 顺带的文本信息
          formData: {},
          success: (result) => {
            let url = JSON.parse(result.data).data.url;
            this.UpLoadImgs.push(url);

            // 所有的图片都上传完毕了才触发  
            if (i === chooseImgs.length - 1) {
              wx.hideLoading();
              // 把文本的内容和外网的图片数组提交到后台中
              //  提交都成功了
              // 重置页面
              this.setData({
                textVal: "",
                chooseImgs: []
              })
              // 返回上一个页面
              wx.navigateBack({
                delta: 1
              });

            }
          }
        });
      })
    } else {
      wx.hideLoading();
      console.log("只是提交了文本");
      wx.navigateBack({
        delta: 1
      });
    }
  }
})