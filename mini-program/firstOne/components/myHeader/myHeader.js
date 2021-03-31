// components/myHeader/myHeader.js
Component({
  /**
   * 存放从父组件中接收的数据
   */
  properties: {
    // 要接收的数据的名称
    aa: {
      // type要接收的数据的类型
      type: String,
      // value 默认值
      vaue: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    myHeader: [
      {
        id: 0,
        name: "首页",
        isActive: true
      },
      {
        id: 1,
        name: "原创",
        isActive: false
      },
      {
        id: 2,
        name: "分类",
        isActive: false
      },
      {
        id: 3,
        name: "关于",
        isActive: false
      }
    ]
  },

  /**
   * 1. 页面js文件中存放事件回调函数的时候，存放在data同层级下！！
   * 2. 组件js文件中存放事件回调函数的时候，存放在methods中！！
   */

  /**
   * 组件的方法列表
   * 
   */
  methods: {
    handleItemTap(e){
      /**
       * 1. 绑定点击事件，需要在methods中绑定
       * 2. 获取被点击的索引
       * 3. 获取原数组
       * 4. 对数组循环
       *   1. 给每一个循环性选中属性，改为false
       *   2. 给当前的索引的项添加激活选中效果
      */
      //  console.log("点击了");
      
      // 获取索引
      const {index} = e.currentTarget.dataset;
      // 获取data中的数组
      // 解构  对 复杂类型进行结构的时候 复制了一份 变量的引用而已
      // 最严谨的做法 重新拷贝一份 数组，再对这个数组的备份进行处理，
      // let myHeader=JSON.parse(JSON.stringify(this.data.myHeader));
      // 不要直接修改 this.data.数据 
      let {myHeader}=this.data;
      // let tabs=this.data;
      // 4 循环数组
      // [].forEach 遍历数组 遍历数组的时候 修改了 v ，也会导致源数组被修改
      myHeader.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
  
      this.setData({
        myHeader
      })
    }
  }
})
