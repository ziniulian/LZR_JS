/*************************************************
作者：子牛连
类名：Db
说明：数据库
创建日期：27-五月-2017 10:15:38
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Node",
	"LZR.Base.CallBacks"
], "LZR.Node.Db");
LZR.Node.Db = function (obj) {
	// 连接信息
	this.conf = null;	/*as:Object*/

	// 查询语句
	this.sqls = null;	/*as:Object*/

	// 回调事件
	this.evt = {};	/*as:Object*/

	// 错误事件
	this.err = {};	/*as:Object*/

	// 是否自动处理错误
	this.autoErr = false;	/*as:boolean*/

	// 连接数据库失败事件
	this.err.connect/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 回调类
	this.clsCb/*m*/ = (LZR.Base.CallBacks);	/*as:fun*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Node.Db.prototype.className_ = "LZR.Node.Db";
LZR.Node.Db.prototype.version_ = "1.0";

LZR.load(null, "LZR.Node.Db");

// 构造器
LZR.Node.Db.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Node.Db.prototype.init_.lzrClass_ = LZR.Node.Db;

// 对构造参数的特殊处理
LZR.Node.Db.prototype.hdObj_ = function (obj/*as:Object*/) {
	if (obj.hd_sqls) {
		this.crtEvt(obj.hd_sqls);
	}
};
LZR.Node.Db.prototype.hdObj_.lzrClass_ = LZR.Node.Db;

// 生成查询语句的事件
LZR.Node.Db.prototype.crtEvt = function (sql/*as:Object*/) {
	if (!this.sqls) {
		this.sqls = {};
		if (this.autoErr) {
			this.err.connect.add(LZR.bind(this, this.hdAutoErr, "connect"));
		}
	}
	for (var s in sql) {
		if (!this.sqls[s]) {
			this.sqls[s] = sql[s];
			this.evt[s] = new this.clsCb();
			this.err[s] = new this.clsCb();
			if (this.autoErr) {
				this.err[s].add(LZR.bind(this, this.hdAutoErr, s));
			}
		}
	}
};
LZR.Node.Db.prototype.crtEvt.lzrClass_ = LZR.Node.Db;

// 自动处理错误
LZR.Node.Db.prototype.hdAutoErr = function (nam/*as:string*/, e/*as:Object*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	res.json({
		ok: false,
		msg: nam,
		dat: e
	});
};
LZR.Node.Db.prototype.hdAutoErr.lzrClass_ = LZR.Node.Db;

// 执行查询
LZR.Node.Db.prototype.qry = function (sqlNam/*as:string*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/, args/*as:___*/) {};
LZR.Node.Db.prototype.qry.lzrClass_ = LZR.Node.Db;
