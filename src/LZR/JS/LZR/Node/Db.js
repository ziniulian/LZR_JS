/*************************************************
作者：子牛连
类名：Db
说明：数据库
创建日期：19-九月-2016 13:01:48
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Node",
	"LZR.Base.CallBacks",
	"LZR.Base.Json"
], "LZR.Node.Db");
LZR.Node.Db = function (obj) {
	// 连接信息
	this.conf = null;

	// 查询语句
	this.sqls = {
		example: {
			db: "库名",
			tnam: "表名",
			evt: true,
			funs: {
				find: ["arg1", "arg2", "..."],
				skip: [1],
				limit: [10]
			}
		}
	};

	// 回调事件
	this.evt = {};

	// 错误事件
	this.err = {};

	// 是否自动处理错误
	this.autoErr = false;

	// 连接数据库失败事件
	this.err.connect = new LZR.Base.CallBacks();

	// Json转换工具
	this.utJson = LZR.getSingleton(LZR.Base.Json);

	// 回调类
	this.clsCb = (LZR.Base.CallBacks);

/******************************************/

	// 连接池
	this.mcs = LZR.getSingleton(null, null, "mongodb").MongoClient;

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
		this.sqls = obj.hd_sqls;
		this.crtEvt(obj.hd_sqls);
	}
};
LZR.Node.Db.prototype.hdObj_.lzrClass_ = LZR.Node.Db;

// 生成查询语句的事件
LZR.Node.Db.prototype.crtEvt = function (sql/*as:Object*/) {
	if (this.autoErr) {
		this.err.connect.add(LZR.bind(this, this.hdAutoErr, "connect"));
	}
	for (var s in sql) {
		this.evt[s] = new this.clsCb();
		this.err[s] = new this.clsCb();
		if (this.autoErr) {
			this.err[s].add(LZR.bind(this, this.hdAutoErr, s));
		}
	}
};
LZR.Node.Db.prototype.crtEvt.lzrClass_ = LZR.Node.Db;

// 自动处理错误
LZR.Node.Db.prototype.hdAutoErr = function (nam, e, req, res, next) {
	e.nam = nam;
	res.send(e);
};
LZR.Node.Db.prototype.hdAutoErr.lzrClass_ = LZR.Node.Db;

// 执行查询
LZR.Node.Db.prototype.qry = function (sqlNam, req, res, next, args) {
	var sql = this.sqls[sqlNam];
	if (this.conf && sql) {
		var cerr = this.err.connect;
		var err = this.err[sqlNam];
		var evt = this.evt[sqlNam];
		var utj = this.utJson;
		this.mcs.connect(this.conf, function (err_c, db) {
			if (err_c) {
				cerr.execute(err_c, req, res, next);
			} else {
				var cdb;
				if (sql.db !== db.databaseName) {
					cdb = db.db(sql.db);
				} else {
					cdb = db;
				}
				var c = cdb.collection(sql.tnam);
				for (var s in sql.funs) {
					var as = sql.funs[s];

					// 参数处理
					if (args) {
						var fas = as;
						as = [];
						for (var i = 0; i < fas.length; i++) {
							var a = fas[i];
							if (typeof(a) === "string") {
								for (var j = 0; j < args.length; j++) {
									a = a.replace(new RegExp("<" + j + ">", "g"), args[j]);
								}
								try {
									a = utj.toObj(a);
								} catch (e) {}
							}
							as.push(a);
						}
					}
// console.log (s);
// console.log (as);

					// 方法执行
					c = c[s].apply(c, as);
				}
				c.catch(function (err_r) {
					db.close();
					cdb.close();
					err.execute(err_r, req, res, next);
				}).then(function (r) {
					db.close();
					cdb.close();
					evt.execute(r, req, res, next);
				});
			}
		});
	}
};
LZR.Node.Db.prototype.qry.lzrCls_ = LZR.Node.Db;

/******************************************/
