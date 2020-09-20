### 目录
- Less
  - 介绍
  - 自动转化为css
  - 遇到的与css写法的不同之处
- 可视化面板介绍
- Echarts
  - Echarts介绍
  - Echarts体验
    - 使用步骤
  - Echarts基础配置
  - Echarts社区介绍
- IIFE 立即调用函数表达式

### Less
#### 介绍
> Less是一种CSS的扩展和动态样式表语言，CSS预处理器，可以在客户端或服务器端运行，帮助我们自定义，管理和重用网页的样式表。
> Less是一种开源语言，也是跨浏览器兼容的语言。

#### 自动转化为css
- less文件中的代码不能直接被浏览器解析渲染，需要在koala等软件中编译后，才能生成对应的文件和css代码，然后浏览器解析它。
- 可以使用vscode中的插件 Easy LESS ，在less文件中写入css代码保存后自动转换成css文件

#### 遇到的与css写法的不同之处
```html
<header>
    <h1></h1>
    <span></span>
</header>
```
```css
header {
    height: 1.25rem;
}
h1 {
    font-size: 0.475rem;
}
span {
    font-size: 0.25rem;
}
```

而less是这样写的
```less
header {
    height: 1.25rem;
    h1 {
        font-size: 0.475rem;
    }
    span {
        font-size: 0.25rem;
    }
}
```

### 可视化面板介绍
应对现在数据可视化的趋势，越来越多企业需要在很多场景(营销数据，生产数据，用户数据)下使用，可视化图表来展示体现数据，让数据更加直观，数据特点更加突出。

### Echarts
#### Echarts介绍
常见的数据可视化库：
- D3.js 目前 Web 端评价最高的 Javascript 可视化工具库(入手难)  
- ECharts.js 百度出品的一个开源 Javascript 数据可视化库   
- Highcharts.js 国外的前端数据可视化库，非商用免费，被许多国外大公司所使用  
- AntV 蚂蚁金服全新一代数据可视化解决方案等等
- Highcharts 和 Echarts 就像是 Office 和 WPS 的关系

> ECharts，一个使用 JavaScript 实现的开源可视化库，可以流畅的运行在 PC 和移动设备上，兼容当前绝大部分浏览器（IE8/9/10/11，Chrome，Firefox，Safari等），底层依赖矢量图形库 [ZRender](https://github.com/ecomfe/zrender)，提供直观，交互丰富，可高度个性化定制的数据可视化图表。

- 是一个JS插件
- 性能好可流畅运行PC与移动设备
- 兼容主流浏览器
- 提供很多常用图表，且可定制
  - [折线图](https://echarts.apache.org/zh/option.html#series-line)、[柱状图](https://echarts.apache.org/zh/option.html#series-bar)、[散点图](https://echarts.apache.org/zh/option.html#series-scatter)、[饼图](https://echarts.apache.org/zh/option.html#series-pie)、[K线图](https://echarts.apache.org/zh/option.html#series-candlestick)
- 官网地址：<https://echarts.apache.org/zh/index.html>

#### Echarts体验
- 官方教程：[五分钟上手ECharts](https://echarts.apache.org/zh/tutorial.html#5%20%E5%88%86%E9%92%9F%E4%B8%8A%E6%89%8B%20ECharts)

##### 使用步骤
1. 下载并引入echarts.js文件(图标依赖这个库)
- [4.9.0版本](https://github.com/apache/incubator-echarts/tree/4.9.0/dist)
```html
<!-- 引入 -->
<script src="js/echarts.min.js"></script>
```

2. 准备一个具备大小的DOM容器(生成的图标嵌入此容器内)
```html
<div id="main" style="width: 600px;height:400px;"></div>
```

3. 初始化echarts实例对象
- 通过 echarts.init 方法初始化一个 echarts 实例
```js
var myChart = echarts.init(document.getElementById('main'));
```

4. 指定配置项和数据(option)
```js
var option = {
    title: {
        text: 'ECharts 入门示例'
    },
    tooltip: {},
    legend: {
        data:['销量']
    },
    xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
};
```

5. 将配置项设置给echarts实例对象(让echarts对象根据修改好的配置生效)
```js
myChart.setOption(option);
```

- [demo]()
- 位置：ECharts/ECharts练习.html

#### Echarts基础配置
- [配置项手册](https://echarts.apache.org/zh/option.html#title)

> 需要了解的主要配置：`series` `xAxis` `yAxis` `grid` `tooltip` `title` `legend` `color` 

- series
  - 系列列表。每个系列通过 `type` 决定自己的图表类型(图标数据，指定什么类型的图标，可以多个图表重叠)
- xAxis：直角坐标系 grid 中的 x 轴
  - boundaryGap: 坐标轴两边留白策略 true，这时候刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间。
- yAxis：直角坐标系 grid 中的 y 轴
- grid：直角坐标系内绘图网格
- title：标题组件
- tooltip：提示框组件
- legend：图例组件
- color：调色盘颜色列表
- 数据堆叠，同个类目轴上系列配置相同的`stack`值后，后一个系列的值会在前一个系列的值上相加。

##### 示例
~~~javascript
option = {
    // color设置线条的颜色 注意后面是个数组
    color: ['pink', 'red', 'green', 'skyblue'],
    // 设置图表的标题
    title: {
        text: '折线图堆叠123'
    },
    // 图表的提示框组件 
    tooltip: {
        // 触发方式
        trigger: 'axis' //坐标轴触发
    },
    // 图例组件
    legend: {
       // series里面有了 name值则 legend里面的data可以删掉
    },
    // 网格配置  grid可以控制线形图 柱状图 图表大小
    grid: {
        left: '3%', //grid 组件离容器左侧的距离
        right: '4%', //grid 组件离容器右侧的距离
        bottom: '3%', //grid 组件离容器下侧的距离
        // 是否显示刻度标签 如果是true 就显示,否则反之
        containLabel: true
    },
    // 工具箱组件 可以另存为图片等功能
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    // 设置x轴的相关配置
    xAxis: {
        // 坐标轴类型
        type: 'category', //类目轴，适用于离散的类目数据
        // 是否让线条和坐标轴有缝隙
        boundaryGap: false,
        data: ['星期一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
     // 设置y轴的相关配置
    yAxis: {
        type: 'value' //数值轴，适用于连续数据
    },
    // 系列图表配置 它决定着显示哪种类型的图表
    series: [
        {
            name: '邮件营销',
            type: 'line', //折线/面积图
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'line',
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'line',
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '直接访问',
            type: 'line',
            data: [320, 332, 301, 334, 390, 330, 320]
        }
    ]
};
~~~

#### Echarts社区介绍
> [社区](https://gallery.echartsjs.com/explore.html#sort=rank~timeframe=all~author=all)就是一些，活跃的echart使用者，交流和贡献定制好的图表的地方。

- 在这里可以找到一些基于echart的高度定制好的图表，相当于基于jquery开发的插件，这里是基于echarts开发的第三方的图表。

### IIFE 立即调用函数表达式
- 在定义时就会立即执行的  JavaScript 函数
- 为了防止变量污染，减少命名冲突，所以可以采取立即执行函数的写法。因为里面的变量都是局部变量
- 主要包含两部分
  - 第一部分是包围在`圆括号运算符()`里的一个匿名函数，这个匿名函数拥有独立的词法作用域。这不仅避免了外界访问此 IIFE 中的变量，而且又不会污染全局作用域。
  - 第二部分再一次使用`()`创建了一个立即执行函数表达式，JavaScript 引擎到此将直接执行函数。

```js
(function () {
    statements
})();
```