### CSS文本属性
#### 1、color
> 文本颜色

#### 2、text-align
> 规定元素中的文本的水平对齐方式

##### 用法
> 该属性通过指定行框与哪个点对齐，从而设置块级元素内文本的水平对齐方式。

| 值 | 描述 |
|--|--|
| left | 左对齐。默认值。 |
| right | 右对齐 |
| center | 居中 |
| justify |自适应(相当于两端对齐)

#### 3、text-decoration
> 规定添加到文本的修饰

| 值 | 描述 |
|--|--|
| none | 没有装饰线。默认。最常用 |
| underline | 下划线。超链接`<a></a>`自带下划线 |
| overline | 上划线。几乎不用 |
| line-through | 删除线。不常用 |
| blink | 定义闪烁的文本。 |

##### 注释
- 修饰的颜色由 "color" 属性设置
- IE、Chrome 或 Safari 不支持 "blink" 属性值。

#### 4、text-indent
> 规定文本块中首行文本的缩进

| 值 | 描述 |
|--|--|
| length | 定义固定的缩进。默认值：0 |
| % | 定义基于父元素宽度的百分比的缩进 |

##### 示例
```css
p {
    text-indent: 2em; /* 2em表示首行缩进当前元素的2个文字的大小 */
}
```

##### 注释
- 最常用于建立一个“标签页”效果。
- **允许使用负值**。如果使用负值，那么首行会被缩进到左边。这会产生一种“悬挂缩进”的效果。
- 在 CSS 2.1 之前，text-indent 总是继承计算值，而不是声明值。
- em是一个相对单位，就是当前元素(font-size) 1个文字的大小。如果当前元素没有设置大小，则会按照父元素的1个文字大小。建议使用。

#### 5、line-height
> 设置行间的距离（行高）。可以控制文字行与行之间的距离。

| 值 | 描述 |
|--|--|
| normal | 默认。设置合理的行间距。 |
| number | 设置数字，此数字会与当前的字体尺寸相乘来设置行间距。 |
| length | 设置数字，此数字会与当前的字体尺寸相乘来设置行间距。 |
| % | 基于当前字体尺寸的百分比行间距。 |

##### 注释
- 不允许使用负值
- 该属性会影响行框的布局。在应用到一个块级元素时，它定义了该元素中基线之间的最小距离而不是最大距离。
- line-height 与 font-size 的计算值之差（在 CSS 中成为“行间距”）分为两半，分别加到一个文本行内容的顶部和底部。可以包含这些内容的最小框就是行框。

<img src="images/css3(1).png" style="display:block; margin:0 auto">

##### 举例
- css没有提供文字垂直居中的代码，可以使用line-height来实现，即让文字的行高都等于盒子的高度
- 理解为：行高的上空隙把下空隙的文字都挤到中间了。如果`行高 < 盒子高度`，文字偏上；`行高 > 盒子高度`，文字偏下。

#### 7、问问时间
- 问：怎么取消超链接自带的下划线？
```html
<head>
    <style>
        a {
            text-decoration: none;
        }
    </style>
</head>

<body>
    <a href="#">加油</a>
</body>
```
	
- 问：怎么修改超链接自带的下划线颜色？
```html
<head>
    <style>
        a {
            /* 修饰的颜色由 "color" 属性设置 */
            text-decoration: underline red;
        }
    </style>
</head>

<body>
    <a href="#">加油</a>
</body>
```
	
#### 零碎知识

<img src="images/css3(2).jpg">

##### 测量行高(多行文字)
<img src="images/css3(3).png" style="display:block; margin:0 auto">

- 从第一行的最下联，量到第二行的最下联

- 使用工具：FastStone Capture(FSCapture)
- 使用方法：
<img src="images/css3(4).png" style="display:block; margin:0 auto">
