### jQuery 多库共存
> 实际开发中，很多项目连续开发十多年，jQuery版本不断更新，最初的 jQuery 版本无法满足需求，这时就需要保证在旧有版本正常运行的情况下，新的功能使用新的jQuery版本实现，这种情况被称为 jQuery多库共存。

> jQuery使用`$`作为标识符，随着jQuery的流行，其它js库也会使用`$`作为标识符，但一起使用会引起冲突。所以需要一个解决方案，让jQuery和其他的js库不存在冲突，可以同时存在，这种情况被称为 jQuery多库共存。

**解决方案**
- 把里面的`$`符号统一改为`jQuery`。例如`jQuery('div')`
- jQuery变量规定新的名称：`jQuery.noConflict()`。例如`var xx=jQuery.noConflict();`

**示例**

```js
    <script>
        $(function () {
            function $(ele) {
                return document.querySelector(ele);
            }
            console.log($('div'));
            // 如果$符号冲突，我们就使用jQuery
            jQuery.each();
            // 让jquery释放对$控制权，让用自己决定
            var n = jQuery.noConflict();
            console.log(n("span"));
            n.each();
        })
    </script>
```