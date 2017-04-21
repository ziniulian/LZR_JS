LZR 的 Javascript 库：
===================================================================

*******************************************************************

缓存：
-------------------------------------------------------------------

- 设计反思：
	- 防止同名css重复加载
	- 控制器兼容触屏
	- nodejs 通用回调接口
	- nodejs 使用 doT 模版
	- 字符串添加 trim 方法
	- canvas 指纹，网页追踪
	- nodejs 访问 Mongo 数据库类
	- 导入日记

*******************************************************************

计划：
-------------------------------------------------------------------

- 设计反思：
	- 日记页面
	- 考虑时差后的日精度时间戳换算函数
	- 基础数据类图补充获取子元素的总数方法
	- 时间工具类图补充时间戳换算方法
	- 页面工具类图补充指纹方法
	- 字符工具类图补充二进制字符转16进制数方法
	- 数据库类图完善
	- 设计通用 DAO 结构
	- 数据库通用连接模块，兼容 mysql 和 Mongo

	- 设计分类目录数据库
	- 设计分类查看页面
	- 分类的新增、修改、删除、移动

	- Ajax 的异常处理（同步时，send方法加 try/catch）
	- 基于 FormData 的新的 Ajax 类
	- 设计外链图片数据库
	- 图片的关联与导入
	- 批量上传图片的功能
	- 域名解析不支持 https 问题
	- nodejs 对 Markdown 文件的处理

	- 网站访问统计页面
	- 设计通用 session
	- 设计通用 用户功能，登录、注册、忘记密码、密码修改、权限管理等

	- 连接远程数据库问题：rhc登录失败
	- 设计一个通用URL对象，供 nodejs 和 HTML 使用
	- nodejs 版的 ajax 工具
	- Ajax 跨域访问功能

	- 数据类添加序列化与反序列化方法
	- nodejs 访问 Excel、Oracle 数据库类

	- md5 编码、解码工具
	- 项目代码的管理和生成工具，取消 load、loadAnnex 方法，隐藏类名，自动压缩
	- 解决 UTF-8 转码时使用的 js 位移运算符，在移动较大数据时出错的问题
	- 枚举的EA逆向工程有问题：LZR.Pro.Rfid.EmTagTyp

	- 设计文件目录数据库
	- 设计目录查看页面
	- 目录的新增、修改、删除、移动
	- 设计文件类型数据库
	- 设计文件数据库
	- 文件的新增、修改、删除、移动

	- 设计模式封装
	- 研究 css 的响应式布局
	- 思考 css 的管理方案
	- 移动端页面布局的统一解决办法
	- 封装天中地，中部判断dpi并做相应布局变化
	- 自适应屏幕的动态布局器
	- 判断客户端是否为移动端
	- 初始化html的fontsize。其它字体以rem为单位。

	- nodejs 不支持 https 协议

	- 休眠函数导致前台卡死的问题
	- 多线程机制

	- 滚动条 控制器
	- 设计下拉式选择框 控制器
	- 加载进度类，可实现多种样式
	- 弹窗类
	- 鹰眼 控制器
	- 元素 resize 控制器
	- 设计布局器，属于一种控制器
	- 元素拖动控制器（自由、垂直、水平、是否在父容器范围内）

	- js动态修改css的值
	- js动态动态创建css
	- css通用类 对 style 的处理
	- 各种CSS动画效果控制器

- 服务：
	- 图片服务（ws形式、URL形式、数据库关系）
	- 代理服务
	- 时间服务
	- 风场缩小范围后有偏差问题
	- 新的风服务

- 作品移植 ：
	- 3D盒子
	- 时间轴
	- 图例

- 2D库：
	- 封装 canvas

- 3D库：
	- 封装 THREE.js
	- 封装 WebGL

- Gis库（兼容3D）：
	- 封装 OpenLayers.js

- 兼容微信浏览器：
	- 在微信浏览器中使用其它浏览器打开链接
	- 微信分享类，朋友圈分享时有 标题、描述、图片

*******************************************************************





开发明细：
-------------------------------------------------------------------

##### 201-4-21 （ Mongo 数据库测试类 ）：
	新增 Mongo 数据库测试类
	基础.数据 ：
		新增 获取子元素的总数 方法

##### 201-4-5 （ 添加 trim 方法 ）：
	基础.字符串 ：
		新增 trim 方法
		新增 左trim 方法
		新增 右trim 方法

##### 201-3-27 （ 不能嵌套调用主类的闭包方法 ）：
	工具包 ：
		修改 闭包调用 方法

##### 201-3-15 （ 闭包调用方法移入主类 ）：
	LZR ： 将工具包的 闭包调用 移入 LZR 主类
		新增 闭包调用 方法
	工具包 ：
		修改 闭包调用 方法

##### 201-3-8 （ 温度标签管理系统数据库功能 ）：
	Node.路由器 ：
		重命名 路由 delete 匹配 方法
		修改 设置静态文件夹 方法
	项目.温度标签管理系统 ：添加与 MySql 数据库交互功能

##### 201-1-25 （ 新增温度标签管理系统 ）：
	项目.温度标签管理系统 ：新增类

##### 201-1-20（ 路由修改 ）：
	Node.路由器 ：（取消对参数的特殊处理）
		新增 doT 模板功能
		修改 设置回调 方法
		修改 获取回调 方法
		修改 路由参数匹配 方法

##### 201-1-5（ RFID功能 ）：
	完成RFID项目

##### 2016-12-29（ RFID规划 ）：
	新增 RFID 项目类
	基础.字符串：
		新增 UTF-8 与 Unicode 互相转码的函数

##### 2016-12-19（ 防止按钮多点触控 ）：
	HTML.基础.Doe控制器.按钮：
		新增 处理触摸抬起事件 方法
		修改 处理触摸按下事件 方法
		修改 给元素添加事件集 方法

##### 2016-12-15（ 添加触控可用性 ）：
	HTML.基础.Doe控制器.按钮：
		新增 触控可用 属性
		新增 鼠标可用 属性
		修改 给元素添加事件集 方法
		修改 移除元素的事件集 方法
	HTML.基础.Doe控制器.单选器：
		新增 触控可用 属性
		新增 鼠标可用 属性
		修改 给元素添加事件集 方法
		修改 移除元素的事件集 方法
	HTML.基础.Doe控制器.鼠标控制器：
		新增 触控可用 属性
		新增 鼠标可用 属性
		修改 给元素添加事件集 方法
		修改 移除元素的事件集 方法

##### 2016-12-14（ 完善控制器的触控功能 ）：
	HTML.基础.Doe控制器.按钮：添加触控功能
		新增 处理触摸按下事件 方法
		修改 处理按下事件 方法
		修改 给元素添加事件集 方法
		修改 移除元素的事件集 方法
	HTML.基础.Doe控制器.单选器：添加触控功能
		新增 处理触摸按下事件 方法
		修改 处理按下事件 方法
		修改 给元素添加事件集 方法
		修改 移除元素的事件集 方法
	HTML.基础.Doe控制器.鼠标控制器：
		新增 触控长按容错系数 属性
		新增 触单 事件
		新增 触拖 事件
		新增 触双 事件
		新增 触长 事件
		新增 触控 事件
		新增 触控事件 方法
		新增 触摸拖动事件 方法
		新增 触摸长按事件 方法
		新增 触摸单击事件 方法
		新增 触摸双击事件 方法
		新增 处理触摸按下事件 方法
		新增 处理触摸移动事件 方法
		新增 处理触摸抬起事件 方法
		修改 给元素添加事件集 方法
		修改 移除元素的事件集 方法
	HTML.基础.Doe控制器.鼠标控制器.鼠标信息：
		新增 触控 属性
	HTML.基础.Doe控制器.鼠标控制器.鼠标各键：
		新增 触摸对象 属性
	HTML.基础.Doe控制器.触控按钮：删除类

##### 2016-12-10（ 远望谷测试项目 ）：
	修改库整合方式
	新增远望谷测试项目：网络访问测试小页面（Invengo）
	HTML.基础.Doe控制器.触控按钮：新增类

##### 2016-11-6（ 路由器可传递带自身回调的函数 ）：
	Node.路由器 ：
		修改 设置回调 方法 ： 对于有自身回调的函数无需再次进行函数类封装。
	Node.服务接口 ： 新增类

##### 2016-10-9（ 时间轴自动停止播放 ）：
	HTML.基础.Doe控制器.日刻度时间控制器 ：
		修改 构造器 方法 ： 停止播放
		修改 处理点击事件 方法 ： 停止播放
	HTML.基础.Doe控制器.日刻度时间控制器.日刻度时间控制器信息 ：
		新增 自动停止播放 方法
		修改 生成日模块集合 方法 ： 停止播放
	HTML.基础.Doe控制器.日刻度时间控制器.日刻度长轴时间控制器信息 ：
		新增 自动停止播放 方法
		修改 设置时间范围 方法 ： 设置右边遮挡条的宽度

##### 2016-10-8（ 关于爱的函数 ）：
	Love ： 新增文件

##### 2016-9-29（ 时间轴播放自动停止功能 ）：
	HTML.基础.Doe控制器.日刻度时间控制器 ：
		修改 处理点击事件 方法 ： 停止播放
	HTML.基础.Doe控制器.日刻度时间控制器.日刻度长轴时间控制器信息 ：
		修改 设置时间范围 方法 ： 设置遮挡条的宽度

##### 2016-9-28（ 新增时间轴长轴 ）：
	HTML.基础.Doe控制器.日刻度时间控制器.日刻度长轴时间控制器 ： 新增类
	HTML.基础.Doe控制器.日刻度时间控制器.日刻度长轴时间控制器信息 ： 新增类
	HTML.基础.Doe控制器.日刻度时间控制器 ：
		修改 处理经过提示事件 方法 ： 在特定DIV中显示内容
		新增 生成滚动条控制器参数 方法 ： 从原方法中提取出来，供子类重载
	HTML.基础.Doe控制器.日刻度时间控制器.日刻度时间控制器信息 ：
		新增 计算日模块最小值及个数 方法 ： 从原方法中提取出来
		修改 生成单个日模块 方法 ： 边线处理

##### 2016-9-20（ 防止外部库文件重复加载 ）：
	LZR ：
		新增 外部库加载信息 属性
		修改 加载外部库 方法 ： 防止同名文件重复加载

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
1. 属性一定不能使用 undefined 赋值。否则将意味着该属性无法被构造参数赋值。

##### DOM元素：
1. 要考虑到视图元素的大小、和可见性的变化
1. js 不直接使用元素Id引用元素，而使用 document.getElementById() 或其它相关函数来引用元素
1. 测试函数也应针对不同功能封装出不同的类
1. 百分比布局，字体使用rem，高度最好也使用rem。在html中，设置 1rem = 2%的模块宽度。
1. 保证每个body里只有一个 div。每个模块外层都要有一个总的div
1. 网页全部加 DTD 声明
1. 控制器的不同功能应对应不同的div

##### 服务：
1. 尽量避免使用带 ? 的服务请求

##### 语法规范：
1. 删除方法统一使用 del
1. 添加方法统一使用 add
1. 克隆方法统一使用 clone
1. 枚举默认的空属性统一使用 emnull
1. body里唯一的一个总 div 其 id 和 class 统一命名为 boso （body only sub out）

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
1. 管理器的缩写： mgr
1. 自身回调的缩写： exe

1. 单件工具包，均以 ut 为前缀
1. 引用的类，均以 cls 为前缀
1. 枚举对象，均以 em 为前缀
1. 值控制器变量，均以 vc 为前缀
1. 创建对象的方法名，均以 crt 为前缀
1. 通用DAO结构获取SQL方法名，均已 sql 为前缀
1. 枚举类，均以 Em 为前缀
1. 接口，均以 Inf 为前缀
1. 需要特殊处理的构造参数，均以 hd_ 为前缀
1. 用加载外部库方法加载样式时的使用的名称，均以 css_ 为前缀
1. 控制器加入的数据 或 特定子元素id，均以 hct_ 为前缀
1. 库内样式名称，均以 Lc_ 为前缀

1. cls_ ：初始化时，用于明确创建类型的特殊字段
1. chd_ ：用于递归创建子数据的特殊字段
1. LZR_ : 用于编译后的类名前缀

1. lzrGeneralization_ ：为多层次继承，而定义的非常特殊的字段
1. lzrClass_ ： 为方法绑定的类信息字段
1. init_ ：LZR库，统一的构造器方法名
1. hdObj_ ：LZR库，对构造参数进行特殊处理的方法名
1. super_ ：LZR库，统一的父类集合名（数组）
1. className_ ：LZR库，统一的类名标识
1. version_ ：LZR库，统一的版本标识

1. LZR_initial ：后处理外链初始值
1. LZR_code ：后处理方法内容
1. LZR_annex ：后处理附加的外部库

1. tmp2web ：模板里用到的静态文件夹
1. qpobj ：路由请求对象里用于传递给模板的参数信息

*******************************************************************
