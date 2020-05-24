$(function () {
    //全选
    // 当元素的值改变时发生 change 事件（仅适用于表单字段）。
    // change() 方法触发 change 事件，或规定当发生 change 事件时运行的函数。
    $('.checkall').change(function () {
        $('.j-checkbox, .checkall').prop('checked', $(this).prop('checked'));

        // 选中的商品添加背景，不选中移除背景
        if ($(this).prop('checked')) {
            // 所有商品添加 check-cart-item 类名
            $('.cart-item').addClass('check-cart-item');
        } else {
            // 所有商品删除 check-cart-item 类名
            $('.cart-item').removeClass('check-cart-item');
        }

        // 调用计算总计和总额函数
        getSum();
    })

    // 给所有的子复选框注册单击事件
    $('.j-checkbox').change(function () {
        // $('.j-checkbox:checked').length 小复选框已被选中的个数
        // $('.j-checkbox').length 所有小复选框的个数
        if ($('.j-checkbox:checked').length == $('.j-checkbox').length) {
            $('.checkall').prop('checked', true);
        } else {
            $('.checkall').prop('checked', false);
        }

        // 选中的商品添加背景，不选中移除背景
        if ($(this).prop('checked')) {
            // 此商品添加 check-cart-item 类名
            $(this).parents('.cart-item').addClass('check-cart-item');
        } else {
            // 此商品删除 check-cart-item 类名
            $(this).parents('.cart-item').removeClass('check-cart-item');
        }

        // 调用计算总计和总额函数
        getSum();
    })


    // 增加商品数量和修改商品小计
    $('.increment').click(function () {
        // 得到当前兄弟文本框的值
        var num = $(this).siblings('.itxt').val();
        num++;
        // 修改文本框内的数量
        $(this).siblings('.itxt').val(num);

        // 修改商品小计
        var price = $(this).parent().siblings('.p-price').html();
        // 或 var price = $(this).parents('.p-num').siblings('.p-price').html();
        // 把￥符号去掉
        price = price.substr(1);
        // 修改小计
        // 注意html内的计算不能在 '' 内，否则就成了字符串
        $(this).parent().siblings('.p-sum').html('￥' + price * num);
        // 或 $(this).parents('.p-num').siblings('.p-sum').html('￥' + price * num);
        // 保留2位小数 (price * num).toFixed(2)

        // 调用计算总计和总额函数
        getSum();
    })

    // 减少商品数量和修改商品小计
    $('.decrement').click(function () {
        // 得到当前兄弟文本框的值
        var num = $(this).siblings('.itxt').val();
        num--;
        // 控制商品数量，不能让商品为0或出现负值
        // 也可以设置商品数量上限哦
        if (num < 1) {
            num = 1;
            // 或 return false;
        }
        // 修改文本框内的数量
        $(this).siblings('.itxt').val(num);

        // 修改商品小计
        var price = $(this).parent().siblings('.p-price').html();
        // 或 var price = $(this).parents('.p-num').siblings('.p-price').html();
        // 把￥符号去掉
        price = price.substr(1);
        // 修改小计
        // 注意html内的计算不能在 '' 内，否则就成了字符串
        $(this).parents().siblings('.p-sum').html('￥' + (price * num));
        // 或 $(this).parents('.p-num').siblings('.p-sum').html('￥' + price * num);
        // 保留2位小数 (price * num).toFixed(2)

        // 调用计算总计和总额函数
        getSum();
    })

    // 直接修改商品数量，计算商品小计
    $('.itxt').change(function () {
        // 获取输入的商品数量
        var num = $(this).val();
        // 当前商品的单价
        var price = $(this).parent().siblings('.p-price').html();
        // 或 var price = $(this).parents('.p-num').siblings('.p-price').html();
        // 把￥符号去掉
        price = price.substr(1);
        // 修改小计
        // 注意html内的计算不能在 '' 内，否则就成了字符串
        $(this).parents().siblings('.p-sum').html('￥' + (price * num));
        // 或 $(this).parents('.p-num').siblings('.p-sum').html('￥' + price * num);
        // 保留2位小数 (price * num).toFixed(2)

        // 调用计算总计和总额函数
        getSum();
    })


    // 总计和总额

    // 封装计算总计和总额函数
    function getSum() {
        var money = 0;// 计算总金额
        var count = 0;// 计算总件数
        // 计算总计
        $('.itxt').each(function (i, ele) {
            if ($(this).parents().siblings().children('.j-checkbox').prop('checked')) {
                count += parseInt($(ele).val());
            }
        });

        $('.amount-sum em').text(count);
        // 计算总额
        $(".p-sum").each(function (i, ele) {
            if ($(this).siblings().children('.j-checkbox').prop('checked')) {
                money += parseFloat($(ele).text().substr(1));
            }
        });
        $(".price-sum em").text("￥" + money);
        // 保留2位小数 money.toFixed(2)
    }

    // 删除商品
    // 商品后面的删除按钮
    $('.p-action').click(function () {
        $(this).parents('.cart-item').remove();
        // 调用计算总计和总额函数
        getSum();
    })

    // 删除选中的商品
    $('.remove-batch').click(function () {
        $('.j-checkbox:checked').parents('.cart-item').remove();
        // 调用计算总计和总额函数
        getSum();
    })

    // 清理购物车：将购物车内所有商品删除
    $('.clear-all').click(function () {
        $('.cart-item').remove();
        // 调用计算总计和总额函数
        getSum();
    })
})