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
	- 作品展示 —— 电商

- 设计反思：
	- NodeAjax 支持多编码格式
	- 将 HTML.URL工具 作为 nodejs 和 HTML 的通用URL工具
	- NodeAjax 支持 post 的请求
	- 前端通用分页对象
	- 通用数据库分页添加普通的get方法
	- 通用数据库分页添加信息提示方法
	- 对模板获取进行异常处理
	- 将域名服务放在通用模板路由中创建。并在模板的返回值中自动加入域名信息。
	- 研究可否用自动生成的_id进行排序和分页（在非分布式情况下，且并发量不大时，勉强可行）。
	- 用模板实现一个通用的数据库管理页面，包括基本的增删改查功能。
	- Node.Srv.start 带返回值
	- 调整数据库操作日志的存储位置
	- 处理分页模板 路径为 /qry_ 时的报错问题
	- 完成作品展示
	- 分页查询模板路由 ， 删除条件从 cond 改为 cont
	- 重写股票服务

- 发布到 npm

*******************************************************************

计划：
-------------------------------------------------------------------

- 设计反思：
	- 在dot模板中载入JS文件，带缓存功能 （以后项目将全部采用此种方式）
	- 一个载入JS文件的路由服务，以替换 load 功能。
	- 分类服务
	- 基于 FormData 的新的 Ajax 类
	- 图床服务
	- 相册服务
	- 用户服务
		- 设计通用 session
		- 设计通用 用户功能，登录、注册、忘记密码、密码修改、权限管理等
	- 账号服务
		- 自定义一套加密解密规范用于存储保密信息（算法不能放到网上）
		- 账户数据整理

	- 游戏动画初体验
	- 删除 NodeJs、HTML.Widget、Pro.Gis、Pro.Green、Pro.Rfid 等无用项目。
		- 删除相关的 UML、src、test 。版本跳级，并保证作品展示的可用性。
		- 删除通用模板内关联的域名服务。

	- 获取 URL 参数方法的优化
	- 数据库管理页面 加入导入、导出功能

	- 自建 nodejs 获取 post 数据的类
	- 解决 UTF-8 转码时使用的 js 位移运算符，在移动较大数据时出错的问题
	- 枚举的EA逆向工程有问题：LZR.Pro.Rfid.EmTagTyp
	- EA逆向工程有问题：LZR.Pro.Gu.ParseByEastmoney 307 行带汉字的正则表达式报错
	- 彻底清理或修改与 LZR_annex、loadAnnex 相关的类（主要集中在 HTML 的控制器里）
	- nodejs 对 Markdown 文件的处理
	- md5 加密工具
	- 项目代码的管理和生成工具，取消 load、loadAnnex 方法，隐藏类名，自动压缩
	- 各服务相关的 LZR库 前端代码打包（依据实际网速决定是否要打包）

	- 一个可表明高热度高频率的数据缓存器（基本思想：一个有限的链表结构，每命中一次，向前提n位的排名）
	- mysql 数据库通用连接模块，可参考 LZR.Pro.TmpTagMgmt 类
	- nodejs 访问 Excel、sqlite、Oracle 数据库类

*******************************************************************

开发明细：
-------------------------------------------------------------------

##### 2019-5-15 （ 7 股服务基本完成 ）：
	Node.路由器 :
		添加 获取Openshift的数据库连接字 方法
	Node.路由器.分页查询模板路由 :
		修改 初始化 方法 : 处理无数据库且无请求时的异常
	Node.服务.股票服务 :
		修改 集合竞价抓取器_ajax回调处理 方法 : 添加股票名
		修改 集合竞价抓取器_生成缓存信息 方法
		修改 集合竞价抓取器_整理缓存 方法 : 计算幅度
		修改 初始化 方法 : 添加集合竞价概览路由
		添加 集合竞价概览_数据查询 方法
		添加 集合竞价概览_数据整理 方法

##### 2019-4-30 （ 集合竞价数据整理 ）：
	Node.服务.股票服务 :
		修改 数据库初始化 方法 : 集合竞价获取缓存回调处理
		修改 集合竞价抓取器_ajax回调处理 方法
		修改 集合竞价抓取器_生成缓存信息 方法
		添加 集合竞价抓取器_整理缓存 方法

##### 2019-4-26 （ 三阳测试 ）：
	新增 项目.股.三阳 类
	Node.服务.常用数据库功能 :
		添加 通用get处理 方法
	项目.股.模拟测试统一接口 :
		修改 条件匹配 方法 : 添加序号参数
		修改 获取参数 方法
		修改 计算结果 方法 : 结果添加超时状态、止盈止损补充
		修改 初始化参数 方法 : 添加是否填充默认值参数
		修改 刷新页面 方法 : 结果包含超时状态
		修改 数据处理 方法 : 为条件匹配传入序号参数
	项目.股.放量涨 :
		修改 获取参数 方法
	Node.服务.股票服务 :
		添加 集合竞价缓存 属性
		添加 集合竞价Ajax工具 属性
		修改 初始化 方法 : 添加 集合竞价抓取器 路由
		修改 数据库初始化 方法 : 添加SQL语句
			1. guk表单基础查询
			1. bid表单基础查询
			1. 添加 bid
			1. 获取 bid 缓存
			1. 删除 bid 缓存
		修改 Ajax初始化 方法 : 对 集合竞价Ajax 做回调处理
		修改 量能抓取器查询历史数据 方法 : 改用新SQL查询
		修改 获取个股的历史K线数据 方法 : 改用新SQL查询
		添加 集合竞价抓取器_获取所有股票ID 方法
		添加 集合竞价抓取器_触发抓取 方法
		添加 集合竞价抓取器_生成路径集 方法
		添加 集合竞价抓取器_ajax回调处理 方法
		添加 集合竞价抓取器_生成缓存信息 方法

##### 2019-4-23 （ 模拟测试框架 ）：
	新增 项目.股.模拟测试统一接口 类
	新增 项目.股.地量且在均线附近 类
	新增 项目.股.放量涨 类
	新增 项目.股.放量跌 类
	HTML.基础.元素.信息提示框 :
		添加 显示样式 属性
		修改 显示信息 方法
		修改 隐藏信息 方法

##### 2019-4-12 （ 模拟测试 ）：
	Node.服务.股票服务 : 添加模拟测试路由
		修改 初始化 方法
		添加 整理代码列表 方法
		添加 获取个股的历史K线数据 方法
	HTML.服务.聚合排序分页 : 修正容器名
		修改 加入缓存 方法
		修改 排序 方法
		修改 刷新页面 方法

##### 2019-4-11 （ 聚合排序、当前趋势算法更换 ）：
	新增 HTML.服务.聚合排序分页 类
	Node.服务.股票服务 :
		修改 获取全部代码 方法 : 名称缩写
		修改 年报查询器数据查询 方法 : 名称缩写
		修改 获取全部收盘代码 方法 : 名称缩写
		修改 补充指数历史数据 方法
		修改 量能抓取器查询历史数据 方法 :
			1. 名称缩写
			1. 最高最低量价不包含当前数据
			1. 取消当前趋势的判断
			1. 查询条件包含查询时间点
		修改 量能抓取器查询历史数据 方法 :
			1. 初始化最值
			1. 数字精确至两位小数
			1. 采用新的方法判断当前趋势

##### 2019-4-11 （ 指数收盘、量能抓取 ）：
	Node.服务.股票服务 :
		修改 初始化 方法 :
			1. 修改收盘路由
			1. 添加创建指数的路由
			1. 添加量能抓取器的路由
		修改 新浪实时数据的ajax回调处理 方法 :
			1. 使用 req.qpobj.skTyp 参数做步阶控制
			1. 加入解析为通用数据结构的功能
		修改 新浪历史数据的ajax回调处理 方法 :
			1. 使用 req.qpobj.skTyp 参数做步阶控制
			1. 加入对指数历史数据的处理和保存
		修改 收盘 方法 :
			1. 添加步阶参数
			1. 支持对指数的收盘
		修改 收入构成的ajax回调处理 方法 : 添加步阶参数
		修改 更新获取基础数据 方法 : 添加步阶参数
		添加 获取全部收盘代码 方法
		添加 添加指数 方法
		添加 补充指数历史数据 方法
		添加 趋势判断 方法
		添加 量能抓取器查询历史数据 方法
		添加 量能抓取器数据统计 方法
	项目.股.东方财富数据解析 :
		解析新浪实时日线 改名为 解析用于收盘的新浪实时日线
		修改 解析用于收盘的新浪实时日线 方法 : 兼容指数收盘
		添加 解析新浪实时日线 方法

##### 2019-4-8 （ 修正最小净利润判断算法 ）：
	Node.服务.股票服务 :
		修改 计算并更新近5年平均净利润 方法

##### 2019-4-7 （ 年报查询器 ）：
	Node.服务.股票服务 :
		添加 年报查询器数据查询 方法
		添加 年报查询器数据整理 方法
		修改 初始化 方法
		修改 Ajax初始化 方法
		修改 获取全部代码 方法 : 添加分类、分红信息
		修改 保存更新 方法 : 修正dvdTim不更新问题
		修改 生成图表参数 方法 : Y轴线上零线
		修改 获取近五年年报 方法
		修改 计算并更新近5年平均净利润 方法 : 添加净利润、营收5年同比的平均值和最小值

##### 2019-4-6 （ 股票图表 ）：
	Node.服务.股票服务 :
		修改 初始化 方法 : 添加图表和计算5年平均净利润路由
		修改 新浪实时数据的ajax回调处理 方法 : 修改返回值
		修改 数据整理 方法 : 用净利润替换每股收益
		修改 获取全部代码 方法
		修改 更新获取基础数据 方法
		修改 更新获取股本 方法
		修改 收盘保存 方法
		添加 获取图表相关数据 方法
		添加 生成图表数据 方法
		添加 生成图表参数 方法
		添加 获取近五年年报 方法
		添加 计算并更新近5年平均净利润 方法
	项目.股.东方财富数据解析 :
		修改 解析新浪实时日线 方法 : 基本信息用净利润替换每股收益

##### 2019-4-4 （ 股票服务 ）：
	新增 Node.服务.股票服务 类
	项目.股.东方财富数据解析 :
		修改 解析新浪实时日线 方法 ： 解决BUG

##### 2019-4-4 （ 东方财富数据解析 ）：
	新增 项目.股.东方财富数据解析 类
	Node.服务.常用数据库 :
		修改 初始化数据库 方法 ： 解决BUG

##### 2019-4-3 （ 聚合排序式分页查询 ）：
	Node.路由器.分页查询模板路由 : 添加聚合排序式分页查询
		修改 处理GET请求 方法
		修改 处理POST请求 方法
		修改 触发分页查询 方法
	Node.服务.常用数据库 :
		修改 初始化数据库 方法
		添加 聚合排序式分页查询 方法

##### 2019-3-29 （ 支持Ajax在URL前加字符编码信息 ）：
	Node.数据库.Ajax ：
		修改 执行查询 方法

##### 2019-3-29 （ 改用 cont 作为分页查询模板路由的删除条件 ）：
	Node.路由器.分页查询模板路由 :
		修改 处理POST请求 方法

##### 2019-3-29 （ 重写股服务（未完成） ）：
	新增 项目.股.搜狐网数据解析 类
	新增 HTML.基础.元素.信息提示框 类
	基础.回调函数集合 :
		删除 通用工具 属性
		修改 构造器 方法 : 改用 LZR.bind 方法
	基础.时间工具 :
		修改 获取UTC时间戳 方法 : 精简算法
		修改 解析以秒为单位的时间戳 方法
		添加 UTC时间戳转换为字符串 方法
	Node.路由器.通用模板路由 :
		添加 模板用工具包 属性
		添加 模板调用 方法
		修改 初始化模板 方法
	Node.路由器.分页查询模板路由 :
		添加 复制查询参数 方法
		添加 触发分页查询 方法
		修改 添加或修改 方法
		修改 处理POST请求 方法
		修改 分页查询 方法 : 取消 add 和 drop 的 cond 修改
		修改 对添加后的查询做特殊处理 方法
		修改 添加或修改 方法

##### 2019-1-29 （ 6 修正无参数获取时间的错误 ）：
	基础.时间工具 :
		修改 获取当前时间 方法 : 修复BUG。修复前若不带参数，会返回错误的时间对象。

##### 2019-1-9 （ 5 调整数据库操作日志的存储位置 ）：
	Node.服务.常用数据库 : 数据库操作日志不再调用 Ajax 存储到其它服务里，改为将其存储到本地数据库的 vs 表里。
		删除 Ajax工具 属性
		删除 域名 属性
		删除 初始化Ajax 方法
		修改 初始化数据库 方法 ：
			1. 删除 初始化Ajax 方法的调用
			2. 添加 日志记录 数据库功能
			3. 修改 日志记录 相关的语句
	Node.路由器.分页查询模板路由 :
		修改 处理GET请求 方法 ：
			1. 空值处理
			2. 条件 和 遮罩 的继承
		修改 分页查询 方法 ： 处理 路径为 /qry_ 时的报错问题

##### 2019-1-9 （ 4 用基础服务启动监听 ）：
	Node.服务 :
		添加 基础服务 属性
		添加 基础服务对象 属性
		添加 基础服务对象回调 属性
		添加 获取基础服务 方法
		修改 启动服务 方法 : 改为以基础服务启动监听

##### 2019-1-9 （ 3 启动服务有返回值 ）：
	Node.服务 :
		修改 启动服务 方法 : 添加返回值

##### 2018-12-25 （ GCC ）：
	添加 GCC JS压缩工具包

##### 2018-11-28 （ 2 hosts ）：
	Node.服务.代理服务端 : 输出 hosts 信息
		修改 处理HTTP代理 方法 ： 记录远程域名和端口
		修改 清空服务队列 方法 ： 输出远程的IP及域名

##### 2018-9-13 （ 1 配置依赖模块 ）：

##### 2018-9-6 （ 0 撤销1.2.3版_1.3.0 ）：
	考虑到v1.2.3版新增了依赖包，故撤销v1.2.3版的发布，将版本号更新到 1.3.0
	Node.数据库.Mongo :
		修改 获取表名 方法 : 修正错误的属性名
	LZR :
		修改 填充属性 方法
			1. 添加一个只检查属性是否存在的参数
			2. 可操作的对象类型除了 object ， 还可以是 function
	工具包 :
		修改 判断一个对象的属性是否存在 方法
	Node.路由器.分页查询模板路由 :
		新增 默认表名 属性
		修改 初始化 方法
			1. 取消表名参数
			2. 使用默认表名
		修改 处理GET请求 方法 : 使用默认表名
	Node.服务.常用数据库功能 :
		修改 初始化数据库 方法 : 加入销毁表事件的 BUG

##### 2018-9-5 （ 3 用模板实现通用的数据库管理页面 ）：
	新增 Node.路由器.分页查询模板路由 类
	Node.数据库.Mongo :
		新增 获取表名 方法
		修改 执行查询 方法
			1. 兼容动态表名的查询
			2. 修正 正确事件与错误事件同时触发的 BUG : 解决 Promise 的 catch、then 串链问题
	LZR :
		新增 填充属性 方法
		新增 合并属性 方法
	基础.时间工具 :
		修改 获取当前时间 方法 : 加入了初始化参数
	Node.路由器 :
		新增 POST解析工具 属性
		新增 模板工具 属性
		新增 绑定了POST解析的路由名集 属性
		新增 解析POST数据 方法
		修改 创建doT模板 方法 : 使用 模板工具 属性
	Node.路由器.通用模板路由 :
		修改 初始化模板 方法
			1. 添加工具参数
			2. 使用 填充属性 方法进行参数修改
	Node.服务.常用数据库功能 :
		修改 初始化Ajax 方法 : 取消域名服务启动成功的提示
		新增 销毁表 方法
		修改 初始化数据库 方法
			1. 加入不做错误处理的参数
			2. 加入销毁表功能的事件处理
			3. 修改 新增事件 不应答时返回的结果类型
			4. 修正 基础查询事件 BUG : 不应答时需要根据不同的操作类型返回不同的结果

##### 2018-8-20 （ 2 从路由中提取出常用模板 ）：
	新增 Node.路由器.通用模板路由 类
	Node.路由器 ：
		删除 通用工具 属性
		修改 获取模板 方法 ： 进行异常处理
		删除 初始化模板 方法
	Node.服务.域名服务 ：
		修改 初始化Ajax 方法 ： 防止重复初始化

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
