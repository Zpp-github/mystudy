- [demo](https://zpp-github.github.io/mystudy/ECharts/index.html)
- [笔记](https://github.com/Zpp-github/mystudy/blob/master/ECharts/note.md)

### 01-使用技术
#### 技术栈
- 基于flexible.js+rem智能大屏适配
- VScode cssrem插件
- flex 布局
- Less
- 基于ECharts数据可视化展示
- ECharts柱状图数据设置
- ECharts地图引入

#### 所需知识
- div + css 布局
- flex 布局
- Less
- 原生js + jquery 使用
- rem适配
- echarts基础

### 02- 案例适配方案
- 设计稿是1920px  
  - flexible.js 把屏幕分为 24 等份
  - cssrem 插件的基准值是 80px
    - 插件-配置按钮---配置扩展设置(Extension Settings)--Root Font Size 里面设置成 80
    - 但是别忘记重启vscode软件保证生效

### 03-基础设置
- body 设置背景图，缩放为 100%， 行高1.15
- css初始化

### 04-header 布局
- 高度为100px
- 背景图，在容器内显示
- 缩放比例为 100%
- h1 标题部分：白色，38像素，居中显示，行高为 80像素
- 时间模块 showTime：定位右侧，right 为 30px，行高为 75px，文字颜色为：rgba(255, 255, 255, 0.7)，而文字大小为 20像素,（注意位置，必要时用top调整）

~~~javascript
// 格式：当前时间：2020年3月17-0时54分14秒
var showTime = document.querySelector('.showTime');
getTime();
var timer = setInterval(getTime, 1000);
function getTime() {
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    var date = time.getDate();
    date = date < 10 ? '0' + date : date;
    var hours = time.getHours();
    hours = hours < 10 ? '0' + hours : hours;
    var minutes = time.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var seconds = time.getSeconds();
    seconds = seconds < 10 ? '0' + seconds : seconds;
    showTime.innerHTML = '当前时间：' + year + '年' + month + '月' + date + '日-' + hours + '时' + minutes + '分' + seconds + '秒';
}
~~~

- header部分css样式

~~~less
header {
  position: relative;
  height: 1.25rem;
  background: url(../images/head_bg.png) no-repeat top center;
  background-size: 100% 100%;
  h1 {
    font-size: 0.475rem;
    color: #fff;
    text-align: center;
    line-height: 1rem;
  }
  .showTime {
    position: absolute;
    top: 0;
    right: 0.375rem;
    line-height: 0.9375rem;
    font-size: 0.25rem;
    color: rgba(255, 255, 255, 0.7);
  }
}
~~~

### 05-mainbox  主体模块
- 一个上左右的 10px 的内边距
- column 列容器，分三列，占比 3：5：3

```less
.mainbox {
  padding: 0.125rem 0.125rem 0;
  display: flex;
  .column {
    // 3列，占比为3：5：3
    flex: 3;
    &:nth-child(2){
        flex: 5;
    }
  }
}
// 或
.mainbox {
  padding: 0.125rem 0.125rem 0;
  display: flex;
  // 3列，占比为3：5：3
  .column {
    flex: 3;
  }
  .column:nth-child(2){
    flex: 5;
  }
}
```

### 06-公共面板模块 panel 
  - 高度为 310px
  - 边框：1px solid rgba(25, 186, 139, 0.17) 
  - 有 line.jpg 背景图片
  - padding为 上 0  左右 15px  下40px
  - 下外边距是 15px
  - 利用panel 盒子 before 和after 制作上面两个角，大小为 10px，线条为 2px solid #02a6b5
  - 新加一个盒子 before 和after 制作下侧两个角，宽度高度为 10px

~~~less
.panel {
    position: relative;
    height: 3.875rem;
    padding: 0 0.1875rem 0.5rem;
    margin-bottom: 0.1875rem;
    border: 1px solid rgba(25, 186, 139, 0.17);
    background: url(../images/line.png) rgba(255, 255, 255, 0.03);
    &::before {// 左上角
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 0.125rem;
        height: 0.125rem;
        border-top: 2px solid #02a6b5;
        border-left: 2px solid #02a6b5;
    }
    &::after {// 右上角
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 0.125rem;
        height: 0.125rem;
        border-top: 2px solid #02a6b5;
        border-right: 2px solid #02a6b5;
    }
    .panel-footer::before {// 左下角
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0.125rem;
        height: 0.125rem;
        border-bottom: 2px solid #02a6b5;
        border-left: 2px solid #02a6b5;
    }
    .panel-footer::after {// 右下角
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        width: 0.125rem;
        height: 0.125rem;
        border-right: 2px solid #02a6b5;
        border-bottom: 2px solid #02a6b5;
    }
}
~~~

### 07-柱形图 bar 模块(布局)
- 标题模块 h2：高度为 48px，文字颜色为白色，文字大小为 20px
- 图标内容模块 chart：高度 240px
- 以上可以作为panel公共样式部分

~~~less
h2 {
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
  color: #fff;
  font-size: 20px;
  font-weight: 400;
}
.chart {
  height: 3rem;
  background-color: pink;
}
~~~

### 08-中间布局
- 上面是 no 数字模块
- 下面是 map 地图模块

#### no 数字模块
1. 数字模块 no 有个背景颜色：rgba(101, 132, 226, 0.1);有个15像素的内边距
2. 中间列 column：左右 10px 下 15px 的外边距
3. no 模块里面上下划分：上面是数字（no-hd)，下面是相关文字说明(no-bd)
4. no-hd 数字模块：有一个边框 1px solid rgba(25, 186, 139, 0.17)
5. no-hd 数字模块：里面分为两个li，每个小li高度为 80px，文字大小为70px，颜色为 #ffeb7b，字体是图标字体 electronicFont
6. no-hd 利用 after 和 before制作2个小角，边框 2px solid #02a6b5，宽度为 30px，高度为 10px
7. 小竖线给第一个li after 就可以，宽 1px，背景颜色为 rgba(255, 255, 255, 0.2)，高度 50%，top 25%
8. no-bd 里面也有两个li：高度为 40px，文字颜色为 rgba(255, 255, 255, 0.7)，文字大小为 18px，上内边距为 10px

~~~less
/* 声明字体*/
@font-face {
  font-family: electronicFont;
  src: url(../font/DS-DIGIT.TTF);
}
~~~

#### map 地图模块
1. 地图模块高度为 810px，里面包含4个盒子：chart 放图表模块、球体盒子、旋转球体、旋转箭头
2. 球体图片模块 map1：大小为 518px，要加背景图片，因为要缩放100%，定位到最中央，透明度 .3
3. 旋转球体 map 2：大小为 643px，要加背景图片，因为要缩放100%，定位到中央，透明度 .6，旋转动画，利用z-index压住球体
4. 旋转箭头 map3：大小为 566px，要加背景图片，因为要缩放100%，定位到中央，透明度 .6，旋转动画，注意是逆时针

```html
<!-- no模块 -->
<div class="no">
    <!-- 数字 -->
    <div class="no-hd">
        <ul>
            <li>13876</li>
            <li>21325</li>
        </ul>
    </div>
    <!-- 相关文字说明 -->
    <div class="no-bd">
        <ul>
            <li>前端需求人数</li>
            <li>市场供应人数</li>
        </ul>
    </div>
</div>
<!-- 地图模块 -->
<div class="map">
    <!-- 球体盒子 -->
    <div class="map1"></div>
    <!-- 旋转球体 -->
    <div class="map2"></div>
    <!-- 旋转箭头 -->
    <div class="map3"></div>
    <!-- 地图 -->
    <div class="chart"></div>
</div>
```

```less
.no {
    padding: 0.1875rem;
    background-color: rgba(101, 132, 226, 0.1);
    .no-hd {// 数字
        position: relative;
        border: 1px solid rgba(25, 186, 139, 0.17);
        &::before {
            position: absolute;
            top: 0;
            left: 0;
            content: '';
            width: 0.375rem;
            height: 0.125rem;
            border-top: 2px solid #02a6b5;
            border-left: 2px solid #02a6b5;
        }
        &::after {
            position: absolute;
            right: 0;
            bottom: 0;
            content: '';
            width: 0.375rem;
            height: 0.125rem;
            border-right: 2px solid #02a6b5;
            border-bottom: 2px solid #02a6b5;
        }
        ul {
            display: flex;
            li {
                position: relative;
                flex: 1;
                line-height: 1rem;
                text-align: center;
                font-size: 0.875rem;
                color: #ffeb7b;
                font-family: 'electronicFont';
                &:nth-child(1)::after {
                    position: absolute;
                    top: 25%;
                    right: 0;
                    content: '';
                    width: 0.0125rem;
                    height: 50%;
                    background-color: rgba(255, 255, 255, 0.2);
                }
            }
        }
    }
    .no-bd {
        ul {// 相关文字说明
            display: flex;
            li {
                flex: 1;
                height: 0.5rem;
                line-height: 0.5rem;
                padding-top: 0.125rem;
                text-align: center;
                color: rgba(255, 255, 255, 0.7);
                font-size: 0.225rem;
            }
        }
    }
}

.map {
    position: relative;
    height: 10.125rem;
    .map1 {// 球体盒子
        position: absolute;
        top: 50%;
        left: 50%;
        width: 6.475rem;
        height: 6.475rem;
        transform: translate(-50%, -50%);
        background: url(../images/map.png);
        background-size: 100% 100%;
        opacity: .3;
    }
    .map2 {// 旋转球体
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 2;
        width: 8.0375rem;
        height: 8.0375rem;
        transform: translate(-50%, -50%);
        background: url(../images/lbx.png);
        background-size: 100% 100%;
        opacity: .6;
        animation: rotate1 15s linear infinite;
    }

    .map3 {// 旋转箭头
        position: absolute;
        top: 50%;
        left: 50%;
        width: 7.075rem;
        height: 7.075rem;
        transform: translate(-50%, -50%);
        background: url(../images/jt.png);
        background-size: 100% 100%;
        opacity: .6;
        animation: rotate2 10s linear infinite;
    }

    .chart {// 地图
        position: absolute;
        top: 0;
        left: 0;
        z-index: 5;
        width: 100%;
        height: 10.125rem;
    }

    @keyframes rotate1 {
        form {
            transform: translate(-50%, -50%) rotate(0deg);
        }
        to {
            transform: translate(-50%, -50%) rotate(360deg);
        }
    }

    @keyframes rotate2 {
        form {
            transform: translate(-50%, -50%) rotate(0deg);
        }
        to {
            transform: translate(-50%, -50%) rotate(-360deg);
        }
    }
}
```

### 09-柱状图1
- 官网找到类似实例，适当分析，并且引入到HTML页面中
- 根据需求定制图表

#### 1. 引入到html页面中
```js
// 柱状图1
(function() {
  // 实例化对象
  let myChart = echarts.init(document.querySelector(".bar1 .chart"));
  // 指定配置和数据
  let option = {
    color: ["#3398DB"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: "value"
      }
    ],
    series: [
      {
        name: "直接访问",
        type: "bar",
        barWidth: "60%",
        data: [10, 52, 200, 334, 390, 330, 220]
      }
    ]
  };

  // 把配置给实例对象
  myChart.setOption(option);
})();
```

#### 2. 根据需求定制
- 修改图表柱形颜色 #2f89cf
- 修改图表大小，top 为 10px，bottom 为 4%，grid决定柱状图的大小
```js
color: ["#2f89cf"],
grid: {
    top: "10px",
    right: "0%",
    bottom: "4%",
    left: "0%",
    containLabel: true
},
```

- X轴相关设置  xAxis
  - 文本颜色设置为 rgba(255,255,255,.6)，字体大小为 12px
  - X轴线的样式不显示

```js
axisLabel: {//刻度标签
    color: "rgba(255,255,255,.6)",
    fontSize: 12
},
axisLine: {
    // x轴样式不显示
    show: false
    // 如果想要设置单独的线条样式 
    // lineStyle: {
    //     color: "rgba(255,255,255,.1)",
    //     width: 1,
    //     type: "solid"
    // }
}
```

- Y 轴相关定制
  - 文本颜色设置为 rgba(255,255,255,.6)，字体大小为 12px
  - Y 轴线条样式更改为 2像素 的 rgba(255,255,255,.1) 边框
  - 分隔线的颜色修饰为 1像素 的 rgba(255,255,255,.1)   

```js
axisLabel: {// y 轴文字标签样式
    color: "rgba(255,255,255,.6)",
    fontSize: 12
},
axisLine: {// y轴线条样式
    lineStyle: {
        color: "rgba(255,255,255,.1)",
        width: 2,
        type: "solid"
    }
},
splitLine: {// y 轴分隔线样式
    lineStyle: {
        color: "rgba(255,255,255,.1)"
    }
}
```

- 修改柱形为圆角以及柱子宽度，series 里面设置
```js
series: [
    {
        name: "直接访问",
        type: "bar",
        barWidth: "35%", //柱宽
        data: [10, 52, 200, 334, 390, 330, 220],
        itemStyle: {// 柱子圆角
            barBorderRadius: 5
        }
    }
]
```

- 更换对应数据
~~~JavaScript
// x轴中更换data数据
 data: [ "旅游行业","教育培训", "游戏行业", "医疗行业", "电商行业", "社交行业", "金融行业" ],
// series 更换数据
 data: [200, 300, 300, 900, 1500, 1200, 600]
~~~

- 让图表跟随屏幕自适应
~~~javascript
  window.addEventListener("resize", function() {
    myChart.resize();
  });
~~~

### 10-柱状图2
- 官网找到类似实例，适当分析，并且引入到HTML页面中
- 根据需求定制图表

```js
// 柱状图2
(function () {
    let myChart = echarts.init(document.querySelector('.bar2 .chart'));
    let option = {
        title: {
            text: '世界人口总量',
            subtext: '数据来自网络'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['2011年', '2012年']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
        },
        series: [
            {
                name: '2011年',
                type: 'bar',
                data: [18203, 23489, 29034, 104970, 131744, 630230]
            },
            {
                name: '2012年',
                type: 'bar',
                data: [19325, 23438, 31000, 121594, 134141, 681807]
            }
        ]
    };
    myChart.setOption(option);
})();
```

#### 1. 修改图形大小 grid
~~~javascript
// 图标位置
grid: {
    top: '10%',
    left: '22%',
    bottom: '10%'
},
~~~

#### 2. 不显示x轴 
~~~javascript
xAxis: {
    show: false
},
~~~

#### 3. y轴相关定制

- 不显示y轴线和相关刻度
~~~javascript
yAxis: {
    type: 'category',
    data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)'],
    axisLine: {//不显示y轴线条
        show: false
    },
    axisTick: {// 不显示刻度
        show: false
    }
},
~~~

- y轴文字的颜色设置为白色
~~~javascript
axisLabel: {
    color: '#fff'
}
~~~

#### 4. 修改第一组柱子相关样式（条状）
~~~javascript
name: "条",
type: 'bar',
data: [18203, 23489, 29034, 104970, 131744, 630230],
// 柱子之间的距离
barCategoryGap: 50,
// 柱子的宽度
barWidth: 10,
// 柱子设为圆角
itemStyle: {
    normal: {
        barBorderRadius: 20
    }
},
~~~

- 设置第一组柱子内百分比显示数据
~~~javascript
// 图形上的文本标签
label: {
    normal: {
         show: true,
         // 图形内显示
         position: "inside",
         // 文字的显示格式
         formatter: "{c}%"
     }
},
~~~

- 设置第一组柱子不同颜色
~~~javascript
// 声明颜色数组
var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
// 2. 给 itemStyle 里面的color 属性设置一个返回值函数
itemStyle: {
    normal: {
        // 柱子设为圆角
        barBorderRadius: 20,
        // 此时的color可以修改柱子的颜色
        color: function(params) {// params传进来的时柱子对象
            return myColor[params.dataIndex];// dataIndex是当前柱子的索引号
        }
    }
},
~~~

#### 5. 修改第二组柱子的相关配置（框状）
~~~javascript
  	    name: "框",
        type: "bar",
        barCategoryGap: 50,
        barWidth: 15,
        itemStyle: {
            color: "none",
            borderColor: "#00c1de",
            borderWidth: 3,
            barBorderRadius: 15
        },
        data: [19325, 23438, 31000, 121594, 134141, 681807]
      }
~~~

#### 6. 给y轴添加第二组数据
~~~javascript
yAxis: [
    {
      type: "category",
      data: ['HTML5', 'CSS3', 'JavaScript', 'VUE', 'Node'],
      // 不显示y轴的线
      axisLine: {
        show: false
      },
      // 不显示刻度
      axisTick: {
        show: false
      },
      // 把刻度标签里面的文字颜色设置为白色
      axisLabel: {
        color: "#fff"
      }
    },
    {
      show: true,
      data: [702, 350, 610, 793, 664],
         // 不显示y轴的线
      axisLine: {
        show: false
      },
      // 不显示刻度
      axisTick: {
        show: false
      },
      axisLabel: {
        textStyle: {
          fontSize: 12,
          color: "#fff"
        }
      }
    }
],
~~~

#### 7. 设置两组柱子层叠以及更换数据
~~~javascript
// 给series  第一个对象里面的添加 
yAxisIndex: 0,
// 给series  第二个对象里面的添加 
yAxisIndex: 1,
// series 第一个对象里面的data
data: [70, 34, 60, 78, 69],
// series 第二个对象里面的data
data: [100, 100, 100, 100, 100],
// y轴更换第一个对象更换data数据
data: ["HTML5", "CSS3", "javascript", "VUE", "NODE"],
// y轴更换第二个对象更换data数据
data:[702, 350, 610, 793, 664],
~~~

### 11-折线图1 人员变化模块制作
- 官网找到类似实例， 适当分析，并且引入到HTML页面中
- 根据需求定制图表

```js
option = {
    title: {
        text: '折线图堆叠'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
};
```

#### 1. 修改折线图
修改大小，显示边框设置颜色：#012f4a，并且显示刻度标签

```js
    // 设置网格样式
    grid: { 
      top: '20%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      show: true,// 显示边框
      borderColor: '#012f4a',// 边框颜色
      containLabel: true // 包含刻度文字在内
    },
```

#### 2. 修改图例组件
文字颜色 #4c9bfd， 距离右侧 right 为 10%

```javascript
 // 图例组件
    legend: {
      textStyle: {
        color: '#4c9bfd' // 图例文字颜色
      },
      right: '10%' // 距离右边10%
    },
```

#### 3. x轴相关配置
- 刻度去除
- x轴刻度标签字体颜色：#4c9bfd
- 剔除x坐标轴线颜色（将来使用Y轴分割线)
- 轴两端是不需要内间距 boundaryGap

```javascript
xAxis: {
    type: 'category',
    axisTick: {
        show: false // 去除刻度线
    },
    axisLabel: {
        color: '#4c9bfd' // 文本颜色
    },
    axisLine: {
        show: false // 去除轴线
    },
    boundaryGap: false,// 去除轴内间距
    data: ['1月', '3月', '5月', '7月', '9月', '11月']
},
```

#### 4. y轴相关配置
- 刻度去除
- 字体颜色：#4c9bfd
- 分割线颜色：#012f4a

```javascript
    yAxis: {
      type: 'value',
      axisTick: {
        show: false  // 去除刻度
      },
      axisLabel: {
        color: '#4c9bfd' // 文字颜色
      },
      axisLine: {
        show: false // 去除轴线
      },
      splitLine: {
        lineStyle: {
          color: '#012f4a' // 分割线颜色
        }
      }
    },
```

#### 5. 两条线形图
- 颜色分别：#00f2f1  #ed3f35
- 把折线修饰为圆滑 series 数据中添加 smooth 为 true

```js
  color: ['#00f2f1', '#ed3f35'],//通过color修改两条线的颜色
	series: [{
      name:'新增粉丝',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      // 折线修饰为圆滑
      smooth: true,
      },{
      name:'新增游客',
      data: [100, 331, 200, 123, 233, 543, 400],
      type: 'line',
      smooth: true,
    }]
```

#### 6.  配置数据
```js
// x轴的文字
xAxis: {
  type: 'category',
  data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
```

```js
// 图标数据
    series: [{
      name:'新增粉丝',
      data:  [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
      type: 'line',
      smooth: true
    },{
      name:'新增游客',
      data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
      type: 'line',
      smooth: true
      }
    }]
```

#### 7. 新增需求
- 点击 2020年、2021年 数据发生变化
以下是后台送过来数据（ajax请求过来的）
~~~javascript
 var yearData = [
      {
        year: '2020',  // 年份
        data: [  // 两个数组是因为有两条线
             [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
             [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
          ]
      },
      {
        year: '2021',  // 年份
        data: [  // 两个数组是因为有两条线
             [123, 175, 112, 197, 121, 67, 98, 21, 43, 64, 76, 38],
     		[143, 131, 165, 123, 178, 21, 82, 64, 43, 60, 19, 34]
          ]
      }
     ];
~~~

- tab栏切换事件
- 点击2020按钮，需要把 series 第一个对象里面的data 换成 2020年对象里面data[0] 
- 点击2020按钮，需要把 series 第二个对象里面的data 换成 2020年对象里面data[1] 
- 2021 按钮同样道理
```js
// 点击切换效果
$(".line1 h2").on("click", "a", function () {
    // 输出索引号
    // console.log($(this).index());
    // 点击 a 之后 根据当前a的索引号 找到对应的 yearData的相关对象
    // console.log(yearData[$(this).index()]);
    var obj = yearData[$(this).index()];
    option.series[0].data = obj.data[0];
    option.series[1].data = obj.data[1];
    // 需要重新渲染
    myChart.setOption(option);
});
```

### 12-折线图2 播放量模块
- 官网找到类似实例， 适当分析，并且引入到HTML页面中
- 根据需求定制图表
```js
let option = {
    title: {
        text: '堆叠区域图'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
};
```

#### 1. 更换图例组件
- 文字颜色 rgba(255,255,255,.5)  文字大小为12

~~~javascript
 legend: {
      top: "0%",
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
},
~~~

#### 2. 修改图表大小
~~~javascript
grid: {
      left: "10",
      top: "30",
      right: "10",
      bottom: "10",
      containLabel: true
    },
~~~

#### 3. 修改x轴相关配置
- 修改文本颜色为rgba(255,255,255,.6)  文字大小为 12
- x轴线的颜色为   rgba(255,255,255,.2)

~~~javascript
     // 文本颜色为rgba(255,255,255,.6)  文字大小为 12
     axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12
          }
        },
         // x轴线的颜色为   rgba(255,255,255,.2)
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.2)"
          }
        },
~~~

#### 4. 修改y轴的相关配置
~~~javascript
axisTick: { show: false },
axisLine: {
    lineStyle: {
        color: "rgba(255,255,255,.1)"
    }
},
axisLabel: {
    textStyle: {
        color: "rgba(255,255,255,.6)",
        fontSize: 12
    }
},
// 修改分割线的颜色
splitLine: {
    lineStyle: {
        color: "rgba(255,255,255,.1)"
    }
} 
~~~

#### 5. 修改两个线模块配置(注意在series 里面定制)
~~~javascript
// 折线修饰为圆滑
smooth: true,
 // 单独修改线的样式
 lineStyle: {
     color: "#0184d5",
     width: 2 
 },
  // 填充区域
 areaStyle: {
       // 渐变色，只需要复制即可
     color: new echarts.graphic.LinearGradient(
       0,
       0,
       0,
       1,
       [
         {
           offset: 0,
           color: "rgba(1, 132, 213, 0.4)"   // 渐变色的起始颜色
         },
         {
           offset: 0.8,
           color: "rgba(1, 132, 213, 0.1)"   // 渐变线的结束颜色
         }
       ],
       false
     ),
     shadowColor: "rgba(0, 0, 0, 0.1)"
 },
 // 设置拐点 小圆点
 symbol: "circle",
 // 拐点大小
 symbolSize: 8,
 // 设置拐点颜色以及边框
itemStyle: {
     color: "#0184d5",
     borderColor: "rgba(221, 220, 107, .1)",
     borderWidth: 12
 },
 // 开始不显示拐点，鼠标经过显示
 showSymbol: false,
~~~

~~~javascript
       name: "转发量",
        type: "line",
        smooth: true,
        lineStyle: {
          normal: {
            color: "#00d887",
            width: 2
          }
         },
         areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(0, 216, 135, 0.4)"
                },
                {
                  offset: 0.8,
                  color: "rgba(0, 216, 135, 0.1)"
                }
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)"
          }
        },
        // 设置拐点 小圆点
        symbol: "circle",
        // 拐点大小
        symbolSize: 5,
        // 设置拐点颜色以及边框
         itemStyle: {
            color: "#00d887",
            borderColor: "rgba(221, 220, 107, .1)",
            borderWidth: 12
        },
        // 开始不显示拐点， 鼠标经过显示
        showSymbol: false,
~~~

#### 6. 更换数据
~~~javascript
// x轴更换数据
data: [ "01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","26","28","29","30"],
// series  第一个对象data数据
 data: [ 30, 40, 30, 40,30, 40, 30,60,20, 40, 30, 40, 30, 40,30, 40, 30,60,20, 40, 30, 40, 30, 40,30, 40, 20,60,50, 40],
// series  第二个对象data数据
 data: [ 130, 10, 20, 40,30, 40, 80,60,20, 40, 90, 40,20, 140,30, 40, 130,20,20, 40, 80, 70, 30, 40,30, 120, 20,99,50, 20],
~~~

### 13-饼形图1 年龄分布模块制作
- 官网找到类似实例， 适当分析，并且引入到HTML页面中
- 根据需求定制图表

#### 1. 定制图表需求1
- 修改图例组件在底部并且居中显示
- 每个小图标的宽度和高度修改为 10px   
- 文字大小为12 颜色  rgba(255,255,255,.5)

~~~javascript
 legend: {
      // 距离底部为0%
      bottom: '0%',
      // 小图标的宽度和高度
      itemWidth: 10,
      itemHeight: 10,
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
      // 图例组件的文字
      textStyle: {
        color: 'rgba(255,255,255,.5)',
        fontSize: 12
      }
 },
~~~

#### 2. 定制需求
- 修改水平居中 垂直居中
- 修改内圆半径和外圆半径为    ["40%", "60%"]   pink老师友情提示，带有直角坐标系的比如折线图柱状图是 grid修改图形大小，而我们饼形图是通过 radius 修改大小

~~~javascript
series: [
    {
        name: '年龄分布',
        type: 'pie',
        // 设置饼形图在容器中的位置
        center: ['50%', '50%'],
        //  内圆半径和外圆半径，百分比是相对于容器宽度来说的
        radius: ['40%', '60%'],
        label: {// 不显示标签文字
            show: false,
            position: 'center'
        },
        labelLine: {// 不显示连接线
            show: false
        },
        data: [
            { value: 1, name: '0岁以下' },
            { value: 4, name: '20-29岁' },
            { value: 2, name: '30-39岁' },
            { value: 2, name: '40-49岁' },
            { value: 1, name: '50岁以上' }
        ]
    }
~~~

#### 3. 更换数据
~~~javascript
// legend 中的data 可省略
data: ['0岁以下', '20-29岁', '30-39岁', '40-49岁', '50岁以上']
// series 中的数据
data: [
    { value: 1, name: '0岁以下' },
    { value: 4, name: '20-29岁' },
    { value: 2, name: '30-39岁' },
    { value: 2, name: '40-49岁' },
    { value: 1, name: '50岁以上' }
]
~~~

#### 4. 更换颜色
~~~javascript
color: [
    '#065aab',
    '#066eab',
    '#0682ab',
    '#0696ab',
    '#06a0ab',
],
~~~

~~~javascript
 // 4. 让图表跟随屏幕自动的去适应
  window.addEventListener("resize", function() {
    myChart.resize();
  });
~~~

### 14-饼形图2 地区分布模块制作（南丁格尔玫瑰图）
- 官网找到类似实例,适当分析，并且引入到HTML页面中
- 根据需求定制图表
```js
option = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        left: 'center',
        top: 'bottom',
        data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
    },
    series: [
        {
            name: '面积模式',
            type: 'pie',
            radius: [30, 110],
            center: ['75%', '50%'],
            roseType: 'area',
            data: [
                {value: 10, name: 'rose1'},
                {value: 5, name: 'rose2'},
                {value: 15, name: 'rose3'},
                {value: 25, name: 'rose4'},
                {value: 20, name: 'rose5'},
                {value: 35, name: 'rose6'},
                {value: 30, name: 'rose7'},
                {value: 40, name: 'rose8'}
            ]
        }
    ]
};
```

### 1. 颜色设置
```js
color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
```

#### 2. 修改饼形图大小 ( series对象)

```javascript
radius: ['10%', '70%'],
```

#### 3. 把饼形图的显示模式改为半径模式
```javascript
 roseType: "radius",
```

#### 4. 数据使用更换（series对象 里面 data对象）
```js
{ value: 20, name: '云南' },
{ value: 26, name: '北京' },
{ value: 24, name: '山东' },
{ value: 25, name: '河北' },
{ value: 20, name: '江苏' },
{ value: 25, name: '浙江' },
{ value: 30, name: '四川' },
{ value: 42, name: '湖北' }
```

#### 5. 字体略小些 10 px ( series对象里面设置 )
饼图图形上的文本标签可以控制饼形图的文字的一些样式。label 对象设置
```javascript
series: [
      {
        name: "地区分布",
        type: "pie",
        radius: ['10%', '70%'],
        center: ["50%", "50%"],
        roseType: "radius",
        // 文本标签控制饼形图文字的相关样式， 注意它是一个对象
        label: {
          fontSize: 10
        },
      }
    ]
  };
```

#### 6. 防止缩放的时候，引导线过长，引导线略短些(series对象里面的labelLine对象设置)
- 连接图表 6 px
- 连接文字 8 px

```js
label: {
    fontSize: 10
},
// 引导线调整
labelLine: {
    // 连接扇形图线长
    length: 6,
    // 连接文字线长
    length2: 8
}
```

#### 7.s
```js
legend: {
    bottom: '0%',
    itemWidth: 10,
    itemHeight: 10,
    // 图例组件的文字
    textStyle: {
        color: 'rgba(255,255,255,.5)',
        fontSize: 12
    },
},
```

### 15-Echarts-map使用（扩展）
> 参考社区的例子：[https://gallery.echartsjs.com/editor.html?c=x0-ExSkZDM](https://gallery.echartsjs.com/editor.html?c=x0-ExSkZDM)  (模拟飞机航线)

实现步骤：
- 第一需要下载china.js提供中国地图的js文件
- 第二个因为里面代码比较多，我们新建一个新的js文件 myMap.js 引入
- 使用社区提供的配置即可。

需要修改：
- 去掉标题组件
- 去掉背景颜色
- 修改地图省份背景 #142957，areaColor 里面做修改
- 地图放大通过 zoom 设置为1.1即可

~~~javascript
geo: {
    map: 'china',
    // 把地图放大了1.1倍
    zoom: 1.1,
    label: {
        emphasis: {
            show: true,
            color: '#fff'
        }
    },
    roam: true,
    itemStyle: {
        normal: {
            // 地图省份背景色
            areaColor: 'rgba(20, 41, 87, 0.6)',
            borderColor: '#195BB9',
            borderWidth: 1
        },
        emphasis: {// 鼠标经过时的颜色
            areaColor: 'rgb(11, 28, 45, .6)'
        }
    }
},
~~~

### 16-最后约束缩放
~~~css
/* 约束屏幕尺寸 */
@media screen and (max-width: 1024px) {
  html {
    font-size: 42px !important;
  }
}
@media screen and (min-width: 1920px) {
  html {
    font-size: 80px !important;
  }
}
~~~
