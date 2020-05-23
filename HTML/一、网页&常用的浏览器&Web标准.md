[TOC]
### 一、网页
#### 1、什么是网页
&emsp;&emsp;==网站==是指在因特网上根据一定的规则，使用HTML等制作的用于展示特定内容相关的网页集合。

&emsp;&emsp;==网页==是网站中的一“页”，通常是HTML格式的文件，它要通过浏览器来阅读。

&emsp;&emsp;==网页是构成网站的基本元素==，它通常由图片、链接、文字、声音、视频等元素组成。通常我们看到的网页，常见以 ==.htm== 或 ==.html== 后缀结尾的文件，因此称其为 ==HTML文件==。
#### 2、什么是HTML
&emsp;&emsp;==HTML== 指 ==超文本标记语言(Hyper Text Markup Language)==，它是用来描述网页的一种语言。

**注释：**
&emsp;&emsp;html不是一种编程语言，是一种标记语言(Markup Language)。
&emsp;&emsp;标记语言是一套标记标签(Markup Tag)。

&emsp;&emsp;==超文本==
&emsp;&emsp;有两层含义：
&emsp;&emsp;&emsp;1、它可以加入图片、声音、动画、多媒体等内容(超越了文本限制)。
&emsp;&emsp;&emsp;2、它可以从一个文件跳转到另一个文件，与世界各地的主机连接(超链接)。
#### 3、网页的形成
&emsp;&emsp;==网页==是由网页元素组成的，这些元素利用html标签描述出来，通过浏览器解析来显示给用户的。
前端人员开发代码 —> 浏览器显示代码(解析、渲染) —> 生成最后的Web页面

---

### 二、常用的浏览器
&emsp;&emsp;浏览器是由网页显示、运行的平台。
##### 1、常用的浏览器
&emsp;&emsp;IE、火狐(FireFox)、谷歌(Chrome)、Safari和Opera等，其中最常用的是谷歌浏览器。

##### 2、浏览器内核
&emsp;&emsp;浏览器内核是负责读取网页内容，整理讯息，计算网页的显示方式并显示页面。
| 浏览器 | 内核 | 备注 |
|--|--|--|
| IE | Trident | IE、猎豹安全、360极速浏览器、百度浏览器 |
| FireFox | Gecko | 火狐浏览器内核 |
| Safari | Webkit | 苹果浏览器内核 |
| Chrome/Opera | Blink | Chrome/Opera浏览器内核。Blink其实是Webkit的分支 |
&emsp;&emsp;目前国内一般的浏览器采用的是Webkit/Blink内核，如360、UC、QQ、搜狗等。

---

### 三、==Web标准==
&emsp;&emsp;Web标准是由W3C组织和其他标准化组织制定的一系列标准的集合。W3C(万维网联盟)是国际最著名的标准化组织。

##### 1、为什么需要Web标准
&emsp;&emsp;浏览器不同，显示的页面或排版会有差异。

##### 2、Web标准的构成
&emsp;&emsp;主要包括结构(Structure)、表现(Presentation)和行为(Behavior)
| 标准 | 说明 |
|--|--|
| 结构 | 用于对**网页元素**进行整理和分类，指HTML |
| 表现 | 用于设置网页元素的版式、颜色、大小等**外观样式**，指CSS |
| 行为 | 指网页模型的定义及**交互**的编写，指JavaScript |
&emsp;&emsp;Web标准提出的**最佳体验方案**：结构、样式、行为**相分离**。
&emsp;&emsp;可以理解为：结构写到html文件中、表现写到CSS文件中、行为写到JS中。