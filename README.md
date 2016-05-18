LZR 的 Javascript 库：
===================================================================

*******************************************************************

缓存：
-------------------------------------------------------------------

- 设计反思：
	- 时间类
	- 测试时间类
	- 带范围的数值
	- 带范围的数值测试
	- Doe元素添加 属性设置 方法
	- Doe元素添加 样式属性设置 方法
	- 文本输入控制器
	- 块状数值增减控制器
	- 块状数值增减控制器测试
	- 块状时间控制器
	- 研究 div 可输入文字功能
	- 带范围的数值添加界限检查功能
	- 设计Doe的鼠标控制器
	- 按钮屏蔽双击或长按事件
	- Doe的鼠标控制器测试
	- 条状数值增减控制器
	- 条状数值增减控制器测试
	- 条状数值增减控制器添加move事件
	- 条状数值增减控制器添加极值变化事件
	- 设计时间轴
	- 时间刻度

*******************************************************************

计划：
-------------------------------------------------------------------

- 设计反思：
	- 刻度样式放入数据中
	- 条状时间控制器 处理时间变化方法 执行时，有空值被传入，从而导致时间类必须判断有无空值，否则会出错。
	- 事件集接口 setEventObj 方法 无法对多级子集进行设置
	- 按钮控制器左键判断不兼容 IE6、7、8
	- 一个专门区分鼠标按键的 函数/枚举/类
	- 元素拖动控制器（自由、垂直、水平、是否在父容器范围内）
	- 选择器、按钮控制器改用基类的标准方法
	- 文本输入控制器的 hct_txt 应改为值控制器
	- 文本输入控制器 hct_txt 字符与数字值不相等问题
	- 文本输入控制器 独立出文本与HTML文法的转换函数
	- 设计滚动条
	- 元素 resize 控制器

	- 将Doe元素定位到父元素的可视范围内
	- Doe元素添加 删除所有子元素 方法
	- 事件类添加 触发DOM事件的方法
	- Doe元素添加 事件触发 方法
	- App-GF-数据模型类图：关联元素的使用外链
	- 项目代码的管理和生成工具，目前的 builder 测试页顺序有误
	- 获取一个正在执行的方法所属的 prototype / 对象
	- 对使用 this.constructor 的方法的优化，特别在枚举中可能用于直接用类调用的方法。
	- 调用父类方法的优化，不使用参数，而是反射 caller 的 super_
	- 通过键值对匹配枚举值
	- 时间类封装出自己的 b、c、s 事件
	- 封装气象枚举
	- 封装风力枚举
	- 封装风向枚举
	- 污染等级 加入健康提示

	- 设计图片部署服务
	- 设计通用 DAO 结构

	- 控制器兼容触屏
	- 设计下拉式选择框

	- js动态修改css的值
	- js动态动态创建css
	- css通用类 对 style 的处理
	- 设计布局器，属于一种控制器
	- 各种CSS动画效果控制器
	- 加载进度类，可实现多种样式
	- 弹窗类
	- 鹰眼控制器
	- 多按钮滚动条控制器（滚动条不止一个按钮）

	- nodejs 不支持 https 协议
	- nodejs 对 Markdown 文件的处理
	- nodejs 版的 ajax 工具
	- 设计一个通用URL对象，供 nodejs 和 HTML 使用

	- Ajax 的异常处理
	- Ajax 跨域访问功能
	- 2016-3-28 更新时，刷新样式为什么不能给 className 赋空字串？
	- 休眠函数导致前台卡死的问题
	- 多线程机制

- 作品移植 ：
	- 流动的风
	- Q_V1
	- C_V0
	- 改版

- 3D库：
	- 封装 THREE.js
	- 封装 WebGL

- Gis库（兼容3D）：
	- 封装 OpenLayers.js

- 2D库：
	- 封装 canvas

- 其它：
	- 笔记转存到 Gist

- 网页兼容移动端：
	- 移动端页面布局的统一解决办法
	- 封装天中地，中部判断dpi并做相应布局变化
	- 自适应屏幕的动态布局器
	- 判断客户端是否为移动端
	- 初始化body的fontsize。其它字体以em为单位。

- 兼容微信浏览器：
	- 在微信浏览器中使用其它浏览器打开链接
	- 微信分享类，朋友圈分享时有 标题、描述、图片

- 服务：
	- 风场缩小范围后有偏差
	- 设计功能更强大的代理服务
	- 时间服务
	- 图片服务（ws形式、URL形式、数据库关系）

*******************************************************************




开发明细：
-------------------------------------------------------------------

##### 2016-5-18（ 时间刻度 ）：
	HTML.基础.控制器.时间刻度 ： 新增类
	HTML.基础.控制器.刻度接口 ： 划刻度方法取消控制器参数
	HTML.基础.控制器.条状时间控制器 ： 划刻度方法取消控制器参数

##### 2016-5-16（ 条状时间控制器 ）：
	HTML.基础.控制器.条状数值增减控制器 ：
		初始添加时正确放置按钮位置
		添加move事件
		添加极值变化事件
	HTML.基础.Doe控制器.鼠标控制器 ： 
		鼠标按下时，move事件依然被激活
		鼠标移动时，只有坐标变化了，才将状态设为 0
	HTML.基础.控制器.条状时间控制器 ： 新增类
	基础.时间 ：
		修改 处理基础值与时间对象的同步 方法 ： 保证 v 值不为空

##### 2016-5-14（ 条状数值增减控制器 ）：
	基础.值.带范围的数值 ：
		修改圆整数据方法 ： 添加是否检查继续范围的参数
	HTML.基础.控制器.条状数值增减控制器 ： 新增类

##### 2016-5-13（ 鼠标控制器测试OK ）：
	HTML.基础.Doe控制器.鼠标控制器 ： 
		添加 evt 属性
		添加时间工具
		添加抬起事件
		其它方法的测试修改
	HTML.基础.Doe控制器.鼠标控制器.鼠标信息 ：
		添加抬起函数属性
		添加移动函数属性
		取消移动的键属性
		取消元素位置属性
	HTML.基础.元素 ： 
		添加 获取样式值 方法
	HTML.基础.控制器.块状数值增减控制器 ： 
		修改 构造方法 ： 使长按失效

##### 2016-5-12（ 鼠标控制器 ）：
	基础.值控制器： 修改版本号 1.1版，带有临时值
	基础.值.带范围的数值 ：
		添加界限检查功能
	HTML.基础.元素.样式 ： 放入元素包中
	HTML.基础.元素.元素位置 ： 新增类
	HTML.基础.元素 ： 
		添加 计算元素位置方法 和 元素位置属性
	HTML.基础.Doe控制器.按钮 ：
		长按间隔设 0 可屏蔽长按事件
	HTML.基础.Doe控制器.鼠标控制器 ： 新增类 （未测试）

##### 2016-5-11（ 块状时间控制器 ）：
	HTML.基础.控制器 ：
		添加一些对元素内部的数据及子元素的增删方法
	HTML.基础.控制器.数值增减基类 ： 结构大调整
	HTML.基础.控制器.块状数值增减控制器 ： 新增类
	HTML.基础.元素：
		添加 删除DOM元素属性 方法
	HTML.基础.控制器.文本输入控制器 ： 
		使用元素的删除属性方法，删除属性值
	基础.值.时间 ：
		修改设置方法 ： 可触发 b、c、s 事件
		其它所有do设置方法都加上 doEvt 参数
		添加 通过日期参数设置 方法
		添加 最大、最小界限
	基础.值控制器：
		新增 事件中的临时值 属性
		所有事件方法 添加 临时值 参数
	HTML.基础.控制器.块状时间控制器 ： 新增类

##### 2016-5-9（ 时间、范围数值、文本输入 ）：
	基础.值.时间 ： 分组到值文件夹内
	基础.值.带范围的数值 ： 新增类
	HTML.基础.控制器.数值增减基类 ： 新增类
	HTML.基础.元素：
		添加 设置DOM元素属性 、 设置DOM元素Style样式 方法
	HTML.基础.控制器.文本输入控制器 ： 新增类

##### 2016-5-6（ 加载外部库 ）：
	基础.回调函数集合 ： 添加回调函数 新增是否带自身信息参数的选项
	HTML.基础.样式：
		修改 刷新样式 方法：样式为空字串时，也可修改 className（与2016-3-28修改有冲突）
	LZR ：
		添加 加载外部库 方法
	修改后处理：
		解决引入外部库的问题：对类的 LZR_annex 扩展属性做处理。
	基础.时间 ： 新增类

##### 2016-5-5（ 回调函数添加自身信息 ）：
	nodejs.专项服务.风场服务 ： 删除查询子类
	基础.回调函数集合 ： 函数参数可追加回调函数的自身信息
	基础.回调函数集合.回调函数 ： 添加 可带有自我的相关信息参数的属性

##### 2016-5-5（ 风场服务 ）：
	nodejs.专项服务.风场服务 ： 新增类

##### 2016-4-28（截屏、代理）：
	HTML.基础.Ajax ： 回调事件更名为 onRsp
	HTML.基础.截屏 ： 新增类
	nodejs.简单的代理服务 ： 新增类

##### 2016-4-1（规范特殊构造参数）：
	修改后处理：对初始值为 null 的类属性做处理
	HTML.基础.元素：
		规范 Doe 元素特的殊构造参数
		修改 用元素初始化时包含递归的子元素 方法：保证 Doe 元素的ID没有数字
	基础.数据：
		修改 处理克隆参数 方法：添加 返回值 参数
		修改 克隆 方法：正确处理 处理克隆参数 方法返回的键值对集合

##### 2016-3-31（myLib 映射库）：
	测试代码都改用 myLib 映射库

##### 2016-3-30（污染物修正）：
	项目.环保.空气质量.应用.公_发.数据模型：
		添加 城市图片路径 属性
		添加 地图小图标Doe 属性
		添加 地图大图标Doe 属性
	基础.时间：
		修改 字符串转时间 方法：修改参数名
	项目.环保.空气质量.污染物.AQI：
		添加 附加信息 属性
		添加 处理主要污染物 方法
		添加 获取唯一首要污染物 方法
	项目.环保.空气质量.污染物.污染物类型枚举：
		添加 set 方法：兼容大小写，和 2.5 即可带小数点也可不带小数点
		修改元素的名称属性与数据库值匹配
	项目.环保.空气质量.污染物.污染物级别枚举：
		添加 通过名称设置对应的级别 方法
		修改元素的名称属性与数据库值匹配
	HTML.基础.Ajax：
		修改 post 方法：保证 IE 浏览器同步调用正常
	将实际应用的测试从库中移除

##### 2016-3-28（元素添加替换样式方法）：
	HTML.基础.元素：
		添加 替换CSS样式 方法：
	HTML.基础.样式：
		修改 添加 方法：能够处理多个样式字串
		修改 刷新样式 方法：保证有值时，再修改 className
	统一使用 emnull 作为枚举的空属性
	项目.环保.空气质量.污染物.AQI：
		修改 参数特殊处理 方法：对 min 和 max 的处理
	项目.环保.空气质量.应用.公_发.数据模型：
		修改 参数特殊处理 方法：对 aqis 的处理
		添加 播报 属性
	完善公_发的测试（未完成）

##### 2016-3-26（单选器的数据共用）：
	基础.回调函数集合：
		修改删除方法：返回被删除的对象
		添加唯一ID：
	HTML.基础.Doe控制器.单选器：
		共用数据时的优化
		被选中项目改为 值控制器类型
	基础.时间：
		修改转换字符串方法
	nodejs.简单的Web文件服务：
		修改 返回Web文件请求 方法：处理 CSS 类型
	项目.环保.空气质量.预警：新增类
	项目.环保.空气质量.污染物.AQI：新增类，从污染物类型枚举中单独提出
	项目：新增 公_发 的数据模型
	HTML.基础.元素：
		修改 参数特殊处理 方法：兼容 css 为空字符串的参数
	HTML.基础.Doe控制器：
		删除 获取触发事件的元素 方法
	HTML.基础.Doe控制器.按钮：
		取消自身调用属性
	HTML.基础.Doe控制器.选择器：
		取消自身调用属性

##### 2016-3-24（新增枚举类）：
	基础.值.枚举：新增类
	后处理及逆向工程支持外链属性的静态声明
	后处理兼容外链的初始化
	基础.颜色：新增类
	基础.颜色枚举：新增类
	新增污染物类
	新增区域类
	基础.回调函数集合：
		修改添加方法：返回函数的 name
	HTML.基础.Doe控制器.选择器：
		调整为一个数据的选择属性可对应多个元素
	HTML.基础.元素：
		添加属性：控制器相关的回调函数集合
		修改克隆方法：深度克隆css、忽视控制器回调集合
	HTML.基础.Doe控制器.单选器：
		调整为一个数据的选择属性可对应多个元素

##### 2016-3-22（新增单选控制器）：
	不能让属性和方法的顺序影响类功能的实现
	HTML.基础.Doe控制器：
		删除 数据属性
	将项目从HTML中提出
	HTML.基础.Doe控制器.选择器： 新增类
	HTML.基础.Doe控制器.单选器： 新增类
	LZR：
		修改 父类构造器方法：可实现多层次继承
	LZR.工具包：
		添加 调用父类方法：
	所有类的继承 规范使用 lzrGeneralization_ 特殊字段
	后处理适应多层次继承的解决办法

##### 2016-3-18（新增Doe控制器）：
	基础.数组：
		添加 获取数组位置 方法
		添加 删除数组元素 方法
		添加 删除数组某位置元素 方法
	HTML.基础.Doe控制器： 新增类
	HTML.基础.Doe控制器.按钮： 新增类
	HTML.基础.元素：
		修改 删除事件 方法：当事件没有可执行的方法时，则关闭相关的事件监听

##### 2016-3-17（新增事件集接口）：
	HTML.工具包.事件：
		解决滚轮事件中this指针错误问题
	LZR：
		添加删除方法
	HTML.基础.元素：
		修改处理克隆参数方法：保持css的数据结构
	基础：新增事件集接口		
	HTML.基础.Ajax：修改事件集的类图结构
	基础.值.控制器：修改事件集的类图结构
	逆向工程：忽略的链接属性可以是带 “.” 的全名称
	数据统一使用 dat 变量名

##### 2016-3-16（Doe事件）：
	LZR：
		添加开关：控制是否可将已存在类存储为文本形式
	HTML.基础.元素：
		实现事件、及控制相关功能
	基础.回调函数集合：
		添加 自身回调属性

##### 2016-3-15（数据的克隆）：
	基础.数据：
		添加克隆方法
		添加处理克隆参数的方法
	HTML.基础.元素：
		删除克隆方法
		添加处理克隆参数的方法
	LZR：
		修改克隆方法：构造参数忽略原型里的属性
		删除 exist 方法
		删除 bind 方法
		移入 Ajax 的 getAjax 方法
	工具包：
		移入 LZR的bind方法
		移入 LZR的exist方法
		添加延时方法
	HTML.基础.Ajax：
		删除 getAjax 方法
		添加 异步post 方法
		使用事件处理回调
	HTML.基础.Ajax.事件集：新增类

##### 2016-3-14（Doe基本结构）：
	HTML.基础.元素：新增此类
	HTML.基础.样式：新增此类
	HTML.工具包.样式：新增此类
	删除解析外链的逆向工程
	基础.值.事件集：改名为Evt。原名 Event
	单独提出一个方法（hdObj_）来对构造参数进行特殊处理
	LZR：
		修改克隆方法：
		修改构造属性方法：对于值控制器本身，不做 set 赋值
	基础.值：
		添加克隆方法
	基础.值.控制器：
		添加克隆方法

##### 2016-3-9（基础数据）：
	HTML：改名。原名 HTML5
	基础.数据：
		类图结构优化
		修改构造器方法（init_）：实现子数据的递归创建
		添加递归创建子数据方法（initSubs）
		添加结构输出方法（print）
	基础.值控制器：
		明确before、change、set三个事件之间的关系。（值控制器 before 事件的返回值决定 change、set 事件是否触发，但不影响 set 方法的返回值。 而change、set事件的返回值则影响set方法的返回值。）
	nodejs.未使用框架的最基础主服务：
		修改配置子服务（initSubs）：统一采用 cls_ 特殊字段进行配置
	后处理模版修正父类构造函数的执行问题

##### 2016-3-7（添加基础值）：
	基础：添加基础值类（LZR.Base.Val）
	nodejs.未使用框架的最基础主服务：
		添加服务属性（srv）
		修改构造器（init_）：构造器初始化服务属性
		添加停止服务方法（stop）
		修改启动服务方法（start）：使用服务属性
	基础.回调函数集合：
		改名添加回调函数方法（add）：原名 append
		修改删除回调函数方法（del）：加入 JS 的 delete 去属性功能
		修改执行回调函数（execute）：函数不调用不返回 false，有一个函数调用返回 false，就返回 false。
	基础.值控制器：
		继承基础值
		改名事件集属性（evt）：原名 event
		修改设置值（set）：适应基础值的返回标准
		修改构造器（init_）：初始化事件的调用对象
	LZR：
		修改构造属性方法（setObj）：适应基础值
		修改判断一个对象的属性是否存在（exist）：解决值为 null 和 undefined 时的报错问题
	改用 readme 记录开发日志

##### 2016-3-4（添加单件模式）：
	LZR：添加单件对象创建方法
	后处理对重数为1的外链进行单件处理
	基础.时间：用到的字符串工具改为单件模式
	H5.基础.Ajax：用到的JSON工具改为单件模式
	H5.基础.JSON：源对象改为私有属性
	将类图中未完善的、有隐患的、没采用最新理念结构的类标记为红色

*******************************************************************




设计原则：
-------------------------------------------------------------------

##### 以数据为根，以事件驱动：
1. 项目要分清 数据层、操作层、展示层（MVC）
	- 数据层：存放项目所需要的所有查询数据及操作数据 等
	- 操作层：依赖数据层的数据，并实现各数据变换时的所有功能操作
	- 展示层：分为控制器的展示层，和功能的展示层
		- 功能展示层：由操作层控制，以展示相应功能
		- 控制器展示层：是用户可以修改数据的界面，既要能够修改数据，也要被操作层控制，以响应数据层数据的变化。
1. 尽量以数据驱动方法，而不是用方法去变更数据
1. 值控制器的 before 事件不影响 set 方法的返回值
1. 为避免事件重复绑定，最好在添加事件时加上特定的名称

##### 类构造：
1. 任何类都能 new 空值
1. 创建参数统一用 LZR.setObj 进行赋值
1. 静态方法 和 静态公共属性 不能被继承
1. 避免枚举类使用静态方法
1. 构造子类时，会执行父类的 init_ 方法，但并不会处理构造参数。只有子类的 init_ 方法会处理构造参数。 所以子类尽量不重载构造方法，若重载，且要使用父类对参数的处理，则需特别调用父类的参数处理方法。也因此，对参数的处理方法尽量放在 hdObj_ 方法中完成。 另：子类不重载构造方法，可能导致父类构造方法中的非参数内容被执行两次，为避免此情况发生，则子类的构造方法必须重载。

##### 类图：
1. 类图中未完善的、有隐患的、待修改的类标记为红色
1. 类图中只是未测试的类标记为黄色
1. 以后不会参考的、不好的设计标记为灰色
1. 外链重数说明：
	- 0	= null
	- 0..*	= {}
	- *	= []
	- 1	= 单件
	- 1..	= 类引用
	- 空	= 普通对象
1. 属性、方法的顺序，不能影响类的功能

##### 方法：
1. 同样功能的代码不要重复出现在多个方法内
1. 方法内能用参数尽量不用属性，能用属性尽量不用自定义类
1. 方法名定义好就不能再修改
1. 避免在方法内直接用自定义类名 new 对象，从而保证类名、结构的可变性
1. 工具包内可能共用的方法，尽量保证与自定义类无关，与属性无关
1. 在对事件克隆，回调函数指针无法明确的情况下，应尽量避免触发类似值控制器一类的克隆方法
1. 每个需特殊处理的构造参数，都应有一个独立的处理方法
1. 事件的触发方法全部命名为 on + 事件名，且参数结构与事件回调函数所传参数结果统一

##### 属性：
1. 类属性的设计，需考虑到能否克隆的问题
1. 一个属性只关系到自身对象时，不需要值控制器
1. 一个属性关系到多个对象时，可能需要值控制器
1. 值控制器变量的 this 指针尽量设到数据上，或能准确获得数据的对象上
1. 枚举和值控制器变量的初始化，尽量在 hdObj_ 方法中进行

##### DOM元素：
1. 要考虑到视图元素的大小、和可见性的变化
1. js 不直接使用元素Id引用元素，而使用 document.getElementById() 或其它相关函数来引用元素
1. 测试函数也应针对不太功能封装出不同的类

##### 语法规范：
1. 删除方法统一使用 del
1. 添加方法统一使用 add
1. 克隆方法统一使用 clone
1. 枚举默认的空属性统一使用 emnull

1. 服务的缩写： srv
1. 事件的缩写： evt
1. 网络请求的缩写： req
1. 网络应答的缩写： rsp
1. HTML DOM Element 对象的缩写： doe
1. 被选中的缩写： scd
1. handle 的缩写： hd
1. 按钮的缩写： btn
1. 状态的缩写： stat
1. 数据的缩写： dat
1. 颜色的缩写： clr

1. 单件工具包，均以 ut 为前缀
1. 引用的类，均以 cls 为前缀
1. 枚举对象，均以 em 为前缀
1. 值控制器变量，均以 vc 为前缀
1. 创建对象的方法名，均以 crt 为前缀
1. 枚举类，均以 Em 为前缀
1. 接口，均以 Inf 为前缀
1. 需要特殊处理的构造参数，均以 hd_ 为前缀
1. 用加载外部库方法加载样式时的使用的名称，均以 css_ 为前缀
1. 控制器加入的数据 或 特定子元素id，均以 hct_ 为前缀
1. 库内样式名称，均以 Lc_ 为前缀

1. cls_ ：初始化时，用于明确创建类型的特殊字段
1. chd_ ：用于递归创建子数据的特殊字段
1. lzrGeneralization_ ：为多层次继承，而定义的非常特殊的字段

1. init_ ：LZR库，统一的构造器方法名
1. hdObj_ ：LZR库，对构造参数进行特殊处理的方法名
1. super_ ：LZR库，统一的父类集合名（数组）
1. className_ ：LZR库，统一的类名标识
1. version_ ：LZR库，统一的版本标识

1. LZR_initial ：后处理外链初始值
1. LZR_code ：后处理方法内容
1. LZR_annex ：后处理附加的外部库

*******************************************************************
