LZR 的 Javascript 库：
===========

***

缓存：
---------------------

- 基础值：
	- 值控制器加入基础值，只有get和set方法。项目上的属性通通使用此类型。
	- LZR 的构造属性也要相应值控制器的基础值做出调整
	- 后处理对基础值的相应处理（无需做特殊处理）

- 单件模式：
	- 工具包的单件模式支持
	- HTML 常量元素的合理解决方案（使用单件模式解决）

- 设计反思：
	- 值控制器是否真的需要 前、中、后 三段事件？（值控制器 before 事件的返回值决定 change、set 事件是否触发，但不影响 set 方法的返回值。 而change、set事件的返回值则影响set方法的返回值。）
	- nodejs的基础服务，统一采用 cls_ 特殊字段进行配置
	- 数据类的合理结构
	- 后处理模版修正父类构造函数的执行问题
	- 数据类的测试
	- nodejs 统一 cls_ 配置后， openshift 的更新
	- 封装一个 css 通用类
	- css 通用类测试
	- 明确 逆向工程要忽略外链
	- 后处理加入外链的类引用重数： 1..
	- 值控制器的事件集统一使用 Evt 命名
	- 单独提出一个方法（hdObj_）来对构造参数进行特殊处理
	- Doe的合理结构
	- Doe基础测试
	- Css 和 Doe 能够初始化 字符串 参数
	- getAjax 方法放到 LZR 里
	- Ajax 以事件方式处理异步回调

- 克隆问题：
	- LZR应对需要特殊克隆的进行特殊克隆
	- 使用 new + obj 方式进行 LZR 库内对象克隆。（为适应此克隆模式，事件添加须全部写在 init_ 里，不能在 init_ 之外的其它地方随意更改事件方法的 this 指针。此方式并不是非常合理，但临时可按此方式实现。）
	- 值控制器的克隆问题
	- 数据的克隆问题

***

计划：
---------------------

- 项目：
	- 发布系统
	- 作品移植

- 设计反思：
	- 设计Doe的事件集
	- 设计Doe的控制器，包含触屏

	- 设计一个通用URL对象，供 nodejs 和 HTML 使用
	- nodejs 对 Markdown 文件的处理
	- Ajax 的异常处理
	- 休眠函数导致前台卡死的问题

- 克隆问题：
	- Doe的数据、事件集、控制器的克隆问题

- 网页兼容移动端：
	- 移动端页面布局的统一解决办法
	- 封装天中地，中部判断dpi并做相应布局变化
	- 自适应屏幕的动态布局器
	- 判断客户端是否为移动端
	- 初始化body的fontsize。其它字体以em为单位。
	- js动态修改css的值
	- js动态动态创建css
	- css通用类 对 style 的处理

- 兼容微信浏览器：
	- 在微信浏览器中使用其它浏览器打开链接
	- 微信分享类，朋友圈分享时有 标题、描述、图片

- 服务：
	- 时间服务
	- 代理服务

***




开发明细：
---------------------

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
	HTML.基础.元素.样式：新增此类
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

***




设计原则：
---------------------

##### 以数据为根，以事件驱动：
1. 项目要分清 数据层、操作层、展示层（MVC）
	- 数据层：存放项目所需要的所有查询数据及操作数据 等
	- 操作层：依赖数据层的数据，并实现各数据变换时的所有功能操作
	- 展示层：分为控制器的展示层，和功能的展示层
		- 功能展示层：由操作层控制，以展示相应功能
		- 控制器展示层：是用户可以修改数据的界面，既要能够修改数据，也要被操作层控制，以响应数据层数据的变化。
1. 尽量以数据驱动方法，而不是用方法去变更数据
1. 值控制器的 before 事件不影响 set 方法的返回值

##### 类构造：
1. 任何类都能 new 空值
1. 创建参数统一用 LZR.setObj 进行赋值

##### 类图：
1. 类图中未完善的、有隐患的、待修改的类标记为红色
1. 类图中只是未测试的类标记为黄色
1. 外链重数说明：
	- 0	= null
	- 0..*	= {}
	- *	= []
	- 1	= 单件
	- 1..	= 类引用
	- 空	= 普通对象

##### 方法：
1. 同样功能的代码不要重复出现在多个方法内
1. 方法内能用参数尽量不用属性，能用属性尽量不用自定义类
1. 方法名定义好就不能再修改
1. 避免在方法内直接用自定义类名 new 对象，从而保证类名、结构的可变性
1. 工具包内可能共用的方法，尽量保证与自定义类无关，与属性无关
1. 在对事件克隆，回调函数指针无法明确的情况下，应尽量避免触发类似值控制器一类的克隆方法

##### 属性：
1. 类属性的设计，需考虑到能否克隆的问题
1. 一个属性只关系到自身对象时，不需要值控制器
1. 一个属性关系到多个对象时，可能需要值控制器

##### DOM元素：
1. 要考虑到视图元素的大小、和可见性的变化

##### 语法规范：
1. 删除方法统一使用 del
1. 添加方法统一使用 add
1. 克隆方法统一使用 clone
1. 服务缩写： srv
1. 事件缩写： evt
1. 网络请求缩写： req
1. 网络应答缩写： rsp
1. HTML DOM Element 对象的缩写： doe
1. 被选中的缩写： scd
1. handle 的缩写： hd
1. 单件工具包，均以 ut 为前缀

1. cls_ ：初始化时，用于明确创建类型的特殊字段
1. chd_ ：用于递归创建子数据的特殊字段

1. init_ ：LZR库，统一的构造器方法名
1. hdObj_ ：对构造参数进行特殊处理的方法名
1. super_ ：LZR库，统一的父类集合名（数组）
1. className_ ：LZR库，统一的类名标识
1. version_ ：LZR库，统一的版本标识

***
