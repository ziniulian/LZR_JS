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

	// ID类
	this.clsOid = LZR.getSingleton(null, null, "mongodb").ObjectID;	/*as:Object*/

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
		var pa = this.parseArg;
		this.mcs.connect(this.conf, function (err_c, db) {
			if (err_c) {
				cerr.execute(err_c, req, res, next);
			} else {
				var cdb;
				if (sql.db && (sql.db !== db.databaseName)) {
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
							var a = pa(fas[i], args);
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

// 参数解析
LZR.Node.Db.Mongo.prototype.parseArg = function (a/*as:Object*/, args/*as:Array*/)/*as:Object*/ {
	var r = a, i, n;
	switch (typeof(a)) {
		case "object":
			if (Object.prototype.toString.apply(a) === "[object Array]") {
				r = [];
			} else {
				r = {};
			}
			for (var s in a) {
				var ss = s;

				// // 可对键名进行替换
				// n = s.length - 1;
				// if ((n > 1) && (s[0] === "<") && (s[n] === ">")) {
				// 	i = s.substring(1, n);
				// 	ss = args[i];
				// }

				if (typeof(a[s]) === "string") {
					n = a[s].length - 1;
					if ((n > 1) && (a[s][0] === "<") && (a[s][n] === ">")) {
						i = a[s].substring(1, n);
						r[ss] = args[i];
					} else {
						// r[ss] = this.parseArg (a[s], args);	// 暂不考虑使用递归，待日后参数必须如此处理时再做修改。
						r[ss] = a[s];
					}
				} else {
					r[ss] = a[s];
				}
			}
			break;
		case "string":
			n = a.length - 1;
			if ((n > 1) && (a[0] === "<") && (a[n] === ">")) {
				i = a.substring(1, n);
				r = args[i];
			} else if ((n > 1) && (((a[0] === "{") && (a[n] === "}")) || ((a[0] === "[") && (a[n] === "]"))) ) {
				// 尽量不用此方式传参
				for (var j = 0; j < args.length; j++) {
					a = a.replace(new RegExp("<" + j + ">", "g"), args[j]);
				}
				try {
					r = utj.toObj(a);
				} catch (e) {}
			}
			break;
	}
	return r;
};
LZR.Node.Db.Mongo.prototype.parseArg.lzrClass_ = LZR.Node.Db.Mongo;
