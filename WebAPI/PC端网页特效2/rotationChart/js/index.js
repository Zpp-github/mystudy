window.addEventListener('load', function () {
    // 获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;

    // 鼠标经过图片就显示左右箭头按钮
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';

        // 鼠标经过轮播图模块， 自动播放停止
        clearInterval(timer);
        timer = null;  // 清除定时器变量
    });
    // 鼠标离开图片就隐藏左右箭头按钮
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';

        // 鼠标离开轮播图模块， 自动播放开始
        timer = setInterval(function () {
            // 手动调用右侧按钮点击事件
            arrow_r.click();
        }, 2000);
    });


    // 动态生成小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // ul.children.length   ul里面图片的张数
    for (var i = 0; i < ul.children.length; i++) {
        // 创建节点
        var li = document.createElement('li');
        // 插入节点 把li插入到ol里面
        ol.appendChild(li);

        // 记录当前小圆圈的索引号，通过自定义属性来做
        li.setAttribute('index', i);

        // 小圆圈的排他思想
        li.addEventListener('click', function () {
            // 干掉所有人
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下我自己
            this.className = 'current';

            // 点击小圆圈，移动图片，即ul
            // 当点击了某个li，就拿到了当前li的索引号
            var index = this.getAttribute('index');
            // 点击某个li，就把此li的索引号给num、circle
            num = index;
            circle = index;
            // ul移动的距离为小圆圈的索引号乘以图片的宽度，注意，向左移动是负值
            animate(ul, -index * focusWidth);
        })
    }
    // 把ol里面的第一个li设置类名为current
    ol.children[0].className = 'current';


    // 克隆第一张图片且放到ul的最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 点击两侧按钮，图片滚动
    var num = 0;
    // 点击两侧按钮，小圆圈随之变化
    var circle = 0;

    // 节流阀
    var flag = true;

    // 点击右侧按钮
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;  // 关闭节流阀
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;  // 打开节流阀
            });
            // 点击右侧按钮时，小圆圈自增1
            circle++;

            // 如果circle==4，说明在最后一张图片(克隆的那张),复原小圆圈
            if (circle == ol.children.length) {
                circle = 0;
            }

            circleChange();
        }
    })

    // 点击左侧按钮
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;  // 关闭节流阀
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -focusWidth * num + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;  // 打开节流阀
            });
            // 点击左侧按钮时，小圆圈自增1
            circle--;

            // 如果circle<0，说明在第一张图片，则小圆圈要改为第4个小圆圈(编号为3)
            // if (circle < 0) {
            //     circle = ol.children.length - 1;
            // }
            // 优化
            circle = circle < 0 ? ol.children.length - 1 : circle;

            circleChange();
        }
    })

    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }


    // 自动播放
    // 添加定时器
    var timer = setInterval(function () {
        // 手动调用右侧按钮点击事件
        arrow_r.click();
    }, 2000)
})