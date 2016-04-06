LZR 的 Javascript 库：
===================================================================

*******************************************************************

缓存：
-------------------------------------------------------------------

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
	- LZR.existedClasses 是否需存储文本内容的开关设定
	- 设计Doe的事件集
	- 解决滚轮事件中this指针错误问题
	- 逆向工程：忽略的链接属性可以是带 “.” 的全名称
	- 设计Doe通用控制器
	- 按钮控制器
	- Doe控制器测试
	- 解决多层次继承时，父类构造器 和 调用父类方法问题
	- 单选、多选控制器
	- 通用枚举类
	- 后处理及逆向工程支持外链属性的静态声明
	- 后处理兼容外链的初始化
	- 新增颜色类 和 常用颜色枚举
	- 枚举测试
	- 选择器数据的scd属性要能够响应多重事件
	- 单选器的事件触发 BUG：目前克隆后做事件增删会出问题。
	- 解决 Doe控制器 获取触发事件的元素 可能会是子元素，而非监听事件的元素 问题
	- 解决 Ajax 在IE浏览器上无法进行同步调用的问题
	- 后处理对初始值为 null 的类属性做处理（如：DatMod）
	- 规范 Doe 元素特殊构造参数的处理
	- Doe 元素克隆时的顺序错误。临时解决方法：保证同层级的每个元素要么都有ID号，要么都没有ID号

- 公_发：
	- 污染物类型设计
	- 省市结构设计
	- 设计数据模型
	- 页面整合
	- 访问数据接口
	- 封包

- 克隆问题：
	- Doe的数据不克隆
	- Doe的事件集的克隆问题：不克隆事件集
	- 单选、多选、普通按钮等控制器的克隆问题：控制器不克隆，但要循环添加

- 其它：
	- 记事本 >> git笔记 >> clone命令，增加 http 语法样式
	- 明确EA的配置项目
	- 系统镜像备份
	- 记事本提交更新，H同步更新
	- H添加谷歌APP应用的入口
	- 记录谷歌浏览器缓存文件路径的配置方法  及 外链设置方法
	- App项目从库中提出，独立为新项目

*******************************************************************

计划：
-------------------------------------------------------------------

- 公_发：
	- 功能优化（2016-3-30 修改日志）
	- 匹配服务器时间
	- 按钮、提示框应使用同一时间数据的优化

- 设计反思：
	- 将Doe元素定位到父元素的可视范围内
	- 数据模型类图关联元素的使用外链
	- 刷新样式时，无法给 className 赋空字串问题
	- 项目代码的管理和生成工具，目前的 builder 测试页顺序有误
	- 获取一个正在执行的方法所属的 prototype / 对象
	- 对使用 this.constructor 的方法的优化，特别在枚举中可能用于直接用类调用的方法。
	- 调用父类方法的优化，不使用参数，而是反射 caller 的 super_
	- OpenLayers 封装
	- 设计通用 DAO 结构

	- 创建鼠标按键的状态枚举
	- 设计Doe的鼠标控制器
	- 控制器兼容触屏

	- 设计一个通用URL对象，供 nodejs 和 HTML 使用
	- nodejs 对 Markdown 文件的处理

	- 休眠函数导致前台卡死的问题
	- 设计滚动条
	- 设计时间轴
	- 设计布局器，属于一种控制器

	- Ajax 的异常处理

- 其它：
	- 笔记转存到 Gist

- 项目：
	- 作品移植

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

*******************************************************************




开发明细：
-------------------------------------------------------------------

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
		修改 刷新样式 方法：保证有值时，再修改 className
	HTML.基础.元素.样式：
		修改 添加 方法：能够处理多个样式字串
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

##### 类构造：
1. 任何类都能 new 空值
1. 创建参数统一用 LZR.setObj 进行赋值
1. 静态方法 和 静态公共属性 不能被继承
1. 通常情况，继承的子类不需要 init_ 和 hdObj_ 方法
1. 避免枚举类使用静态方法

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

##### 属性：
1. 类属性的设计，需考虑到能否克隆的问题
1. 一个属性只关系到自身对象时，不需要值控制器
1. 一个属性关系到多个对象时，可能需要值控制器
1. 值控制器变量的 this 指针尽量设到数据上，或能准确获得数据的对象上
1. 枚举和值控制器变量的初始化，尽量在 hdObj_ 方法中进行

##### DOM元素：
1. 要考虑到视图元素的大小、和可见性的变化

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
1. 颜色的缩写：clr

1. 单件工具包，均以 ut 为前缀
1. 引用的类，均以 cls 为前缀
1. 枚举对象，均以 em 为前缀
1. 值控制器变量，均以 vc 为前缀
1. 创建对象的方法名，均以 crt 为前缀
1. 枚举类，均以 Em 为前缀
1. 接口，均以 Inf 为前缀
1. 需要特殊处理的构造参数，均以 hd_ 为前缀

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

*******************************************************************
