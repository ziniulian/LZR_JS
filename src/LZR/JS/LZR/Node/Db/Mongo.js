/*************************************************
作者：子牛连
类名：Mongo
说明：Mongo数据库通用DAO
创建日期：27-五月-2017 10:44:25
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Node.Db",
	"LZR.Base.Json"
], "LZR.Node.Db.Mongo");
LZR.Node.Db.Mongo = function (obj) /*bases:LZR.Node.Db*/ {
	LZR.initSuper(this, obj);

	// 连接池
	this.mcs = LZR.getSingleton(null, null, "mongodb").MongoClient;	/*as:Object*/

	// Json转换工具
	this.utJson/*m*/ = LZR.getSingleton(LZR.Base.Json);	/*as:LZR.Base.Json*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Node.Db.Mongo.prototype = LZR.clone (LZR.Node.Db.prototype, LZR.Node.Db.Mongo.prototype);
LZR.Node.Db.Mongo.prototype.super_ = [LZR.Node.Db];
LZR.Node.Db.Mongo.prototype.className_ = "LZR.Node.Db.Mongo";
LZR.Node.Db.Mongo.prototype.version_ = "1.0";

LZR.load(null, "LZR.Node.Db.Mongo");

// 构造器
LZR.Node.Db.Mongo.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Node.Db.Mongo.prototype.init_.lzrClass_ = LZR.Node.Db.Mongo;

// 执行查询
LZR.Node.Db.Mongo.prototype.qry = function (sqlNam/*as:string*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/, args/*as:___*/) {
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
LZR.Node.Db.Mongo.prototype.qry.lzrClass_ = LZR.Node.Db.Mongo;
