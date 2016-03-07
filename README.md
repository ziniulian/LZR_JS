LZR 的 Javascript 库：
===========

缓存：
---------------------

>基础值：
1. 值控制器加入基础值，只有get和set方法。项目上的属性通通使用此类型。
1. LZR 的构造属性也要相应值控制器的基础值做出调整
1. 后处理对基础值的相应处理（无需做特殊处理）

>单件模式：
1. 工具包的单件模式支持
1. HTML 常量元素的合理解决方案（使用单件模式解决）

计划：
---------------------

>设计反思：
1. 数据类的合理结构
1. 基础容器的合理结构
1. 值控制器是否真的需要 前、中、后 三段事件？

>网页兼容移动端：
1. 移动端页面布局的统一解决办法
1. 封装天中地，中部判断dpi并做相应布局变化
1. 自适应屏幕的动态布局器
1. 判断客户端是否为移动端
1. 初始化body的fontsize。其它字体以em为单位。
1. js动态修改css的值

>项目：
1. 发布系统
1. 作品移植
1. 幻灯片播放框架
1. PC蛋蛋刷金币

>兼容微信浏览器：
1. 在微信浏览器中使用其它浏览器打开链接
1. 微信分享类，朋友圈分享时有 标题、描述、图片

>URL：
1. 设计一个通用URL对象，供 nodejs 和 HTML 使用

>服务：
1. 时间服务
1. 代理服务




开发明细：
---------------------

#### 2016-3-7（添加基础值）：
	基础：添加基础值类（LZR.Base.Val）
	nodejs.未使用框架的最基础主服务：
		添加服务属性（srv）
		修改构造器（_init）：构造器初始化服务属性
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
		修改构造器（_init）：初始化事件的调用对象
	LZR：
		修改构造属性方法（setObj）：适应基础值
		修改判断一个对象的属性是否存在（exist）：解决值为 null 和 undefined 时的报错问题
	改用 readme 记录开发日志

#### 2016-3-4（添加单件模式）：
	LZR：添加单件对象创建方法
	后处理对重数为1的外链进行单件处理
	基础.时间：用到的字符串工具改为单件模式
	H5.基础.Ajax：用到的JSON工具改为单件模式
	H5.基础.JSON：源对象改为私有属性
	将类图中未完善的、有隐患的、没采用最新理念结构的类标记为红色




设计原则：
---------------------

#### 以数据为根，以事件驱动：
1. 尽量以数据驱动方法，而不是用方法去变更数据
1. 项目要分清 数据层、操作层、展示层（MVC）
		数据层：存放项目所需要的所有查询数据及操作数据 等
		操作层：依赖数据层的数据，并实现各数据变换时的所有功能操作
		展示层：分为控制器的展示层，和功能的展示层
			功能展示层：由操作层控制，以展示相应功能
			控制器展示层：是用户可以修改数据的界面，既要能够修改数据，也要被操作层控制，以响应数据层数据的变化。
1. 尽量不使用值控制器的 set 事件

#### 构造参数：
1. 任何类都能 new 空值
1. 创建参数统一用 LZR.setObj 进行赋值

#### DOM元素：
1. 要考虑到视图元素的大小、和可见性的变化

#### 语法：
1. 删除方法统一使用 del
1. 添加方法统一使用 add
1. 服务缩写 srv
1. 事件缩写 evt
