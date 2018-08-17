李泽荣 的 Javascript 库：
===================================================================

*******************************************************************

缓存：
-------------------------------------------------------------------

- 服务：
	- 拆分 openshift 服务
	- 主服务
	- 股服务
	- 域名服务
	- 修改库里的域名服务类
	- 访问统计
	- 代理服务
	- 日记服务
	- 给每个服务都增加一个 myNam 路由，返回服务名
	- 一个能显示所有服务状态的检查页
	- 代理服务计划添加一个接龙小游戏

- 设计反思：
	- NodeAjax 支持多编码格式
	- 将 HTML.URL工具 作为 nodejs 和 HTML 的通用URL工具
	- NodeAjax 支持 post 的请求
	- 前端通用分页对象
	- 通用数据库分页添加普通的get方法
	- 通用数据库分页添加信息提示方法

- 发布到 npm

*******************************************************************

计划：
-------------------------------------------------------------------

- 服务：
	- 作品展示
		- 电商
		- WebGL
		- 银川页面
		- 河北页面
		- 污染物分布图 初版
		- 污染物分布图 新版
		- 时间轴
		- 风场服务
		- 测温标签
		- 铁路手持机模拟器
		- 卧具演示模拟器
		- 新疆仓库模拟器
		- 四方厂配件管理模拟器
		- 检测所板卡模拟器
	- 分类服务
	- 图床服务（ws形式、URL形式）
		- 设计外链图片数据库
		- 图片的关联与导入
		- 批量上传图片的功能
		- 图片查询及管理
	- 相册服务
	- 用户服务
		- 设计通用 session
		- 设计通用 用户功能，登录、注册、忘记密码、密码修改、权限管理等
	- 账号服务
		- 自定义一套加密解密规范用于存储保密信息（算法不能放到网上）
		- 账户数据整理
	- 比特币交易系统

- 设计反思：
	- 模板初始化需要进行异常处理
	- 获取 URL 参数方法的优化
	- 自建 nodejs 获取 post 数据的类
	- 基于 FormData 的新的 Ajax 类
	- 尝试用模板载入JS文件，需要引入类的前置条件和后置条件。
	- 游戏动画初体验

	- rfid读写小工具
	- rfid读写器对接基类
	- rfid模拟工具
	- rfid前端代码打包

	- 解决 UTF-8 转码时使用的 js 位移运算符，在移动较大数据时出错的问题
	- 枚举的EA逆向工程有问题：LZR.Pro.Rfid.EmTagTyp
	- 彻底清理或修改与 LZR_annex、loadAnnex 相关的类（主要集中在 HTML 的控制器里）
	- nodejs 对 Markdown 文件的处理
	- md5 加密工具
	- 基础的mongodb数据库查询、导入、导出、清空、修改功能
	- 项目代码的管理和生成工具，取消 load、loadAnnex 方法，隐藏类名，自动压缩
	- 各服务相关的 LZR库 前端代码打包（依据实际网速决定是否要打包）

	- 一个可表明高热度高频率的数据缓存器（基本思想：一个有限的链表结构，每命中一次，向前提n位的排名）
	- mysql 数据库通用连接模块，可参考 LZR.Pro.TmpTagMgmt 类
	- nodejs 访问 Excel、sqlite、Oracle 数据库类

*******************************************************************

开发明细：
-------------------------------------------------------------------

##### 2018-8-17 （ 添加GPL许可 ）：

##### 2018-8-9 （ 0 主域名改为HTTPS_1.2.0 ）：
	自使用 HTTPS 开始，版本升级为 1.2.0
	HTML ：
		修改 主域名 属性 ： 改为 HTTPS

##### 2018-5-3 （ 9 优化通用数据库分页 ）：
	HTML.服务相关.通用数据库分页 ：
		新增 普通查询 方法
		新增 显示提示信息 方法

##### 2018-3-16 （ 8 选择不应答时，自动执行 next 方法 ）：
	Node.服务.常用数据库功能 ：
		修改 初始化数据库 方法

##### 2018-3-13 （ 7 避免服务绑定过多的 end 事件 ）：
	Node.服务.服务端代理服务 ： 避免服务绑定过多的 on end 事件

##### 2018-3-13 （ 6 重新封装代理服务 ）：
	HTML.工具 ： 删除所有与代理相关的方法
	新增 Node.服务.客户端代理服务 类
	新增 Node.服务.服务端代理服务 类

##### 2018-3-8 （ 5 对参数做URI解码 ）：
	HTML.工具 ：
		修改 逆HTTP 方法 ： 对参数做URI解码

##### 2018-3-7 （ 4 间接代理方法 ）：
	HTML.工具 ：
		新增 逆HTTP 方法

##### 2018-3-5 （ 3 分页新增设置按钮方法 ）：
	HTML.服务相关.通用数据库分页 ：
		新增 设置按钮 方法

##### 2018-3-2 （ 2 自定义分页执行 ）：
	HTML.服务相关.通用数据库分页 ：
		新增 是否自定义执行 属性
		修改 执行回调 方法 ：

##### 2018-3-1 （ 1 对Ajax数据进行URI转码 ）：
	HTML.基础.Ajax ：
		修改 发送POST请求 方法
	Node.数据库.Ajax ：
		修改 执行查询 方法

##### 2018-2-28 （ 0 版本修正_1.1.0 ）：
	版本修正
	Node.数据库 ：
		修改 生成查询语句的事件 方法 ： 能够重复添加事件
	HTML.工具包.URL工具 ：
		修改 转换成可传输的post数据 方法 ： 避免 null 和 undefined 的赋值
	HTML.服务相关.通用数据库分页 ：
		删除 参数名 属性
		新增 合并 方法
		修改 执行回调 方法 ： 处理合并
		修改 查询总数 方法 ： 删除 参数名 属性
		修改 查询式删除 方法 ： 删除 参数名 属性
	Node.服务.常用数据库功能 ：
		新增 合并 方法
		修改 设置参数 方法
		修改 初始化数据库 方法 ：
			处理合并
			增、删、改 返回操作名称
			添加数据库日志字段
	Node.服务.域名服务 ： 适应域名服务的POST形式
		修改 获取域名 方法
		修改 初始化Ajax 方法

##### 2018-2-27 （ 12 前端通用分页 ）：
	新增 HTML.与服务相关的前端控件 类
	新增 HTML.服务相关.通用数据库分页 类

##### 2018-2-26 （ 11 NodeAjax 支持 post 的请求 ）：
	基础.数学 ：
		新增 将字符串转换成数字 方法
	HTML.基础.Ajax ：
		修改 发送POST请求 方法 ： 统一使用URL工具的数据转换方法
	HTML.工具包.URL工具 ：
		新增 Json工具 属性
		新增 url解析 方法
		新增 转换成可传输的post数据 方法
		修改 获取 URL 参数 方法 ： 添加传参 和 问号忽略功能 （该方法仍需对性能做进一步优化）
	Node.数据库.Ajax ：
		修改 执行查询 方法 ：
			新增POST传输方式
			统一使用URL工具的 url解析 和 数据转换方法
	Node.服务.常用数据库功能 ：
		新增 初始化Ajax 方法
		修改 初始化数据库 方法 ： 以新版访问服务的POST形式记录操作日志
		修改 新增 方法 ： 可忽略条件检查直接添加
		修改 分页查询 方法 ：
			分页条件兼容固定条件
			保存操作日志
		修改 修改 方法 ： 保存操作日志
		修改 删除 方法 ： 保存操作日志

##### 2018-2-7 （ 常用数据库功能 ）：
	新增 Node.服务.常用数据库功能 类
	Node.数据库 ：
		修改 自动处理错误 方法 ： 规范返回值的数据结构

##### 2018-1-24 （ 10 | 带毫秒的时间格式 ）：
	基础.时间工具 ：
		修改 时间转换为字符串 方法 ： 增加带毫秒的常用格式

##### 2018-1-23 （ 9 | 通过名称设置元素属性 ）：
	HTML.工具.元素工具 ：
		新增 通过名称设置元素属性 方法

##### 2018-1-22 （ 8 | 时间动态格式化 ）：
	基础.时间工具 ：
		修改 时间转换为字符串 方法 ： 实现时间的动态格式化

##### 2018-1-20 （ 7 | 重写域名服务 ）：
	Node.路由器 ：
		修改 初始化模板 方法 ： 修正模板静态文件夹的路径问题
	HTML ：
		修改 主域名 属性 ： 文件路径统一不以斜杠（ / ）起头
	Node.服务.域名服务 ： 重写，改为使用访问域名服务的方式来获取域名

##### 2018-1-17 （ 6 | 修正补零错误的BUG ）：
	基础.数学 ：
		修改 格式化为指定精度的字串 方法

##### 2018-1-3 （ 5 | 格式化指定精度的字串 ）：
	基础.数学 ：
		新增 格式化为指定精度的字串 方法

##### 2017-12-29 （ 4 | 更新域名服务 ）：
	Node.服务.域名服务 ：
		修改 获取域名 方法

##### 2017-11-20 （ 3 | 简单的域名服务 ）：
	新增 Node.服务.域名服务 类
	HTML ：
		新增 主域名 属性

##### 2017-11-16 （ 2 | 配置参数的数据库名可为空 ）：
	Node.数据库.Mongo ：
		修改 执行查询 方法 ： 数据库配置信息的 db 参数可为空

##### 2017-11-11 （ NodeAjax 支持多编码格式 ）：
	NodeAjax 支持多编码格式

##### 2017-11-10 （ npm发布 、 禁用 LZR_annex ）：
	将Lib文件移出npm发布的夹子，且以后控件也不再依赖Lib做初始化。
	JSON取消对 Lib 的依赖
	截图取消对 Lib 的依赖
	禁用 LZR_annex

##### 2017-11-8 （ 拆分服务 ）：
	拆分服务

##### 2017-11-8 （ 精简计划 ）：
	删除一些不重要的计划

*******************************************************************
