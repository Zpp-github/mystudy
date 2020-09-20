// 柱状图1
(function () {
    // 实例化对象
    let myChart = echarts.init(document.querySelector('.bar1 .chart'));
    // 指定配置项和数据
    let option = {
        color: ["#2f89cf"],
        tooltip: {
            trigger: "axis",
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            top: "10px",
            right: "0%",
            bottom: "4%",
            left: "0%",
            containLabel: true
        },
        xAxis: [
            {
                type: "category",
                data: ["旅游行业", "教育培训", "游戏行业", "医疗行业", "电商行业", "社交行业", "金融行业"],
                axisTick: {
                    alignWithLabel: true
                },
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
            }
        ],
        yAxis: [
            {
                type: "value",
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
            }
        ],
        series: [
            {
                name: "直接访问",
                type: "bar",
                barWidth: "35%", //柱宽
                data: [200, 300, 300, 900, 1500, 1200, 600],
                itemStyle: {// 柱子圆角
                    barBorderRadius: 5
                }
            }
        ]
    };
    // 把配置项给实例对象
    myChart.setOption(option);
    // 让图表跟随屏幕自适应
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();


// 柱状图2
(function () {
    // 声明颜色数组
    let myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
    // 实例化对象
    let myChart = echarts.init(document.querySelector('.bar2 .chart'));
    // 指定配置和数据
    let option = {
        grid: {
            top: '10%',
            left: '22%',
            bottom: '10%'
        },
        xAxis: {// 不显示x轴
            show: false
        },
        yAxis: [
            {
                type: 'category',
                // 反向坐标轴
                inverse: true,
                data: ['HTML5', 'CSS3', 'JavaScript', 'VUE', 'Node'],
                axisLine: {//不显示y轴线条
                    show: false
                },
                axisTick: {// 不显示刻度
                    show: false
                },
                axisLabel: {// y轴文字的颜色设置为白色
                    color: '#fff'
                }
            },
            {
                show: true,
                // 反向坐标轴
                inverse: true,
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
        series: [
            {
                name: "条",
                type: 'bar',
                data: [70, 34, 60, 78, 69],
                // 柱子之间的距离
                barCategoryGap: 50,
                // 柱子的宽度
                barWidth: 10,
                itemStyle: {
                    normal: {
                        // 柱子设为圆角
                        barBorderRadius: 20,
                        // 此时的color可以修改柱子的颜色
                        color: function (params) {// params传进来的时柱子对象
                            return myColor[params.dataIndex];// dataIndex是当前柱子的索引号
                        }
                    }
                },
                // 图形上的文本标签
                label: {
                    normal: {
                        show: true,
                        // 图形内显示
                        position: "inside",
                        // 文字的显示格式 {c}数据值：会自动解析为数据(data里面的数据)
                        formatter: "{c}%"
                    }
                },
                yAxisIndex: 0
            },
            {
                name: '框',
                type: 'bar',
                barCategoryGap: 50,
                barWidth: 15,
                itemStyle: {
                    color: "none",
                    borderColor: "#00c1de",
                    borderWidth: 3,
                    barBorderRadius: 15
                },
                data: [100, 100, 100, 100, 100],
                yAxisIndex: 1
            }
        ]
    };
    // 把配置给实例对象
    myChart.setOption(option);
    // 让图表跟随屏幕自适应
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();


// 折线图1
(function () {
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

    // 实例化对象
    let myChart = echarts.init(document.querySelector('.line1 .chart'));
    // 指定配置项和数据
    let option = {
        color: ['#00f2f1', '#ed3f35'], //通过color修改两条线的颜色
        tooltip: {
            trigger: 'axis'
        },
        legend: {// 图例组件
            data: ['新增粉丝', '新增游客'], //如果series对象右name值，legend可以不用写data
            textStyle: {
                color: '#4c9bfd' // 图例文字颜色
            },
            right: '10%' // 距离右边10% (必须加引号)
        },
        grid: {// 网格样式
            top: '20%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            show: true,// 显示边框
            borderColor: '#012f4a',// 边框颜色
            containLabel: true // 包含刻度文字在内
        },
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
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
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
                    color: '#012f4a' //分割线颜色
                }
            }
        },
        series: [
            {
                name: '新增粉丝',
                data: yearData[0].data[0],
                type: 'line',
                // 折线修饰为圆滑
                smooth: true,
            }, {
                name: '新增游客',
                data: yearData[0].data[1],
                type: 'line',
                smooth: true,
            }
        ]
    };
    // 把配置给实例对象
    myChart.setOption(option);
    // 让图表跟随屏幕自适应
    window.addEventListener("resize", function () {
        myChart.resize();
    });

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
})();

// 折线图2
(function () {
    // 实例化对象
    let myChart = echarts.init(document.querySelector('.line2 .chart'));
    // 指定配置项和数据
    let option = {
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
            top: '0%',
            textStyle: {
                color: 'rgba(255,255,255,.5)',
                fontSize: 12
            },
            data: ['播放量', '转发量']
        },
        grid: {
            left: "10",
            top: "30",
            right: "10",
            bottom: "10",
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    textStyle: {
                        color: 'rgba(255,255,255,.6)',
                        fontSize: 12
                    },
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.2)'
                    }
                },
                data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "26", "28", "29", "30"]
            }
        ],
        yAxis: [
            {
                type: 'value',
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
            }
        ],
        series: [
            {
                name: '播放量',
                type: 'line',
                // 单独修改线的样式
                lineStyle: {
                    color: "#0184d5",
                    width: 2
                },
                data: [30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 20, 60, 50, 40],
                // 折线修饰为圆滑
                smooth: true,
                // 填充区域
                areaStyle: {
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
                showSymbol: false
            },
            {
                name: '转发量',
                type: 'line',
                // 单独修改线的样式
                lineStyle: {
                    color: "#00d887",
                    width: 2
                },
                data: [130, 10, 20, 40, 30, 40, 80, 60, 20, 40, 90, 40, 20, 140, 30, 40, 130, 20, 20, 40, 80, 70, 30, 40, 30, 120, 20, 99, 50, 20],
                // 折线修饰为圆滑
                smooth: true,
                // 填充区域
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                offset: 0,
                                color: "rgba(0, 216, 135, 0.4)"   // 渐变色的起始颜色
                            },
                            {
                                offset: 0.8,
                                color: "rgba(0, 216, 135, 0.1)"   // 渐变线的结束颜色
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
                    color: "#00d887",
                    borderColor: "rgba(221, 220, 107, .1)",
                    borderWidth: 12
                },
                // 开始不显示拐点，鼠标经过显示
                showSymbol: false
            }
        ]
    };
    // 把配置给实例对象
    myChart.setOption(option);
    // 让图表跟随屏幕自适应
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();


// 饼形图1
(function () {
    // 实例化对象
    let myChart = echarts.init(document.querySelector('.pie1 .chart'));
    // 指定配置项和数据
    let option = {
        color: [
            '#065aab',
            '#066eab',
            '#0682ab',
            '#0696ab',
            '#06a0ab',
        ],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            // 距离底部为0%
            bottom: '0%',
            // 小图标的宽度和高度
            itemWidth: 10,
            itemHeight: 10,
            // 图例组件的文字
            textStyle: {
                color: 'rgba(255,255,255,.5)',
                fontSize: 12
            },
            data: ['0岁以下', '20-29岁', '30-39岁', '40-49岁', '50岁以上']
        },
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
        ]
    };
    // 把配置给实例对象
    myChart.setOption(option);
    // 让图表跟随屏幕自适应
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();

// 饼形图2
(function () {
    // 实例化对象
    let myChart = echarts.init(document.querySelector('.pie2 .chart'));
    // 指定配置项和数据
    let option = {
        color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
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
        series: [
            {
                name: '地区分布',
                type: 'pie',
                radius: ['10%', '70%'],
                center: ['50%', '50%'],
                roseType: 'radius',// 饼形图的显示模式
                data: [
                    { value: 20, name: '云南' },
                    { value: 26, name: '北京' },
                    { value: 24, name: '山东' },
                    { value: 25, name: '河北' },
                    { value: 20, name: '江苏' },
                    { value: 25, name: '浙江' },
                    { value: 30, name: '四川' },
                    { value: 42, name: '湖北' }
                ],
                // 文本标签控制饼形图文字的相关样式，注意它是一个对象
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
            }
        ]
    };
    // 把配置给实例对象
    myChart.setOption(option);
    // 让图表跟随屏幕自适应
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})()