/*************************************************
作者：子牛连
类名：ComDbSrv
说明：常用数据库功能
创建日期：07-二月-2018 14:43:33
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Node.Srv",
	"LZR.Node.Srv.Result",
	"LZR.Node.Db.Mongo",
	"LZR.Node.Db.NodeAjax",
	"LZR.Node.Util",
	"LZR.Node.Srv.DomainSrv"
], "LZR.Node.Srv.ComDbSrv");
LZR.Node.Srv.ComDbSrv = function (obj) {
	// 分页默认排序
	this.qrySort = 1;	/*as:int*/

	// 分页默认大小
	this.qrySize = 10;	/*as:int*/

	// 支持分页删除
	this.qryDelAble = false;	/*as:boolean*/

	// 是否记录操作日志
	this.logAble = 0;	/*as:int*/

	// 结果类
	this.clsR/*m*/ = (LZR.Node.Srv.Result);	/*as:fun*/

	// 数据库
	this.mdb/*m*/ = new LZR.Node.Db.Mongo();	/*as:LZR.Node.Db.Mongo*/

	// Ajax工具
	this.ajx/*m*/ = new LZR.Node.Db.NodeAjax();	/*as:LZR.Node.Db.NodeAjax*/

	// node工具
	this.utNode/*m*/ = new LZR.Node.Util();	/*as:LZR.Node.Util*/

	// 域名
	this.dms/*m*/ = new LZR.Node.Srv.DomainSrv();	/*as:LZR.Node.Srv.DomainSrv*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Node.Srv.ComDbSrv.prototype.className_ = "LZR.Node.Srv.ComDbSrv";
LZR.Node.Srv.ComDbSrv.prototype.version_ = "1.0";

LZR.load(null, "LZR.Node.Srv.ComDbSrv");

// 构造器
LZR.Node.Srv.ComDbSrv.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Node.Srv.ComDbSrv.prototype.init_.lzrClass_ = LZR.Node.Srv.ComDbSrv;

// 对构造参数的特殊处理
LZR.Node.Srv.ComDbSrv.prototype.hdObj_ = function (obj/*as:Object*/) {

};
LZR.Node.Srv.ComDbSrv.prototype.hdObj_.lzrClass_ = LZR.Node.Srv.ComDbSrv;

// 初始化Ajax
LZR.Node.Srv.ComDbSrv.prototype.initAjx = function () {
	if (!this.dms.ds.vs) {
		this.dms.initAjx();
		this.dms.ajx.evt.get.add(LZR.bind(this, function (r) {
			this.ajx.crtEvt({
				vs: this.dms.ds.vs + "srvTrace/"
			});
			console.log("DomainSrv OK!");
		}));
		this.dms.get("vs");
	}
};
LZR.Node.Srv.ComDbSrv.prototype.initAjx.lzrClass_ = LZR.Node.Srv.ComDbSrv;

// 初始化数据库
LZR.Node.Srv.ComDbSrv.prototype.initDb = function (conf/*as:string*/, tabnam/*as:string*/) {
	if (this.logAble) {
		this.initAjx();
	}

	// 数据库设置
	this.mdb.conf = conf;
	this.mdb.autoErr = true;
	this.mdb.crtEvt({
		get: {
			tnam: tabnam,
			funs: {
				find: ["<0>", "<1>"],
				toArray: []
			}
		},

		add: {
			tnam: tabnam,
			funs: {
				insertMany: ["<0>"]
			}
		},

		qry: {
			tnam: tabnam,
			funs: {
				find: ["<0>", "<1>"],
				sort: ["<2>"],
				limit: ["<3>"],
				toArray: []
			}
		},

		count: {
			tnam: tabnam,
			funs: {
				count: ["<0>"]
			}
		},

		set: {
			tnam: tabnam,
			funs: {
				updateMany: ["<0>", "<1>"]
			}
		},

		del: {
			tnam: tabnam,
			funs: {
				deleteMany: ["<0>"]
			}
		}
	});

	// 数据库事件处理
	this.mdb.evt.get.add(LZR.bind(this, function (r, req, res, next) {
		if (req.qpobj.comDbSrvNoRes) {
			req.qpobj.comDbSrvReturn = r;
		} else {
			switch (req.qpobj.comDbSrvTyp) {
				case "get":
					if (r.length) {
						res.json(this.clsR.get(r));
					} else {
						res.json(this.clsR.get(null, "暂无数据"));
					}
					break;
				case "add":
					if (r.length) {
						res.json(this.clsR.get(0, "数据已存在", false));
					} else {
						this.mdb.qry("add", req, res, next, [req.qpobj.comDbSrvObjs]);
					}
					break;
			}
		}
	}));
	this.mdb.evt.add.add(LZR.bind(this, function (r, req, res, next) {
		var b = (r.result.ok === 1 && r.result.n > 0);
		if (req.qpobj.comDbSrvNoRes) {
			req.qpobj.comDbSrvReturn = r.result;
		} else {
			res.json(this.clsR.get(r.result.n, "", b));
		}

		// 记录操作日志
		if (b && (this.logAble & 2)) {
			this.ajx.qry("vs", req, res, next, null, {
				url: req.protocol + "://" + req.hostname + req.originalUrl,
				ip: this.utNode.getClientIp(req),
				uuid: {
					method: "add",
					cond: r.insertedIds
				}
			});
		}
	}));
	this.mdb.evt.qry.add(LZR.bind(this, function (r, req, res, next) {
		if (req.qpobj.comDbSrvNoRes) {
			req.qpobj.comDbSrvReturn = r;
		} else {
			if (r.length) {
				res.json(this.clsR.get(r));
			} else {
				res.json(this.clsR.get(null, "暂无数据"));
			}
		}
	}));
	this.mdb.evt.count.add(LZR.bind(this, function (r, req, res, next) {
		if (req.qpobj.comDbSrvNoRes) {
			req.qpobj.comDbSrvReturn = r;
		} else {
			if (r === 0) {
				res.json(this.clsR.get(r, "", true));
			} else {
				res.json(this.clsR.get(r));
			}
		}
	}));
	this.mdb.evt.set.add(LZR.bind(this, function (r, req, res, next) {
		var b = (r.result.ok === 1 && r.result.nModified > 0);
		if (req.qpobj.comDbSrvNoRes) {
			req.qpobj.comDbSrvReturn = r.result;
		} else {
			res.json(this.clsR.get(r.result.nModified, "", b));
		}

		// 记录操作日志
		if (b && (this.logAble & 4)) {
			this.ajx.qry("vs", req, res, next, null, {
				url: req.protocol + "://" + req.hostname + req.originalUrl,
				ip: this.utNode.getClientIp(req),
				uuid: req.qpobj.comDbSrvCond
			});
		}
	}));
	this.mdb.evt.del.add(LZR.bind(this, function (r, req, res, next) {
		var b = (r.result.ok === 1 && r.result.n > 0);
		if (req.qpobj.comDbSrvNoRes) {
			req.qpobj.comDbSrvReturn = r.result;
		} else {
			res.json(this.clsR.get(r.result.n, "", b));
		}

		// 记录操作日志
		if (b && (this.logAble & 1)) {
			this.ajx.qry("vs", req, res, next, null, {
				url: req.protocol + "://" + req.hostname + req.originalUrl,
				ip: this.utNode.getClientIp(req),
				uuid: req.qpobj.comDbSrvCond
			});
		}
	}));
};
LZR.Node.Srv.ComDbSrv.prototype.initDb.lzrClass_ = LZR.Node.Srv.ComDbSrv;

// 基础查询
LZR.Node.Srv.ComDbSrv.prototype.get = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/, cond/*as:Object*/, mark/*as:Object*/, noRes/*as:double*/) {
	this.setPro (req, "get", noRes);
	this.mdb.qry("get", req, res, next, [cond, mark]);
};
LZR.Node.Srv.ComDbSrv.prototype.get.lzrClass_ = LZR.Node.Srv.ComDbSrv;

// 新增
LZR.Node.Srv.ComDbSrv.prototype.add = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/, cond/*as:Object*/, objs/*as:Object*/, noRes/*as:boolean*/) {
	this.setPro (req, "add", noRes);
	if (LZR.getClassName(objs) === "Array") {
		req.qpobj.comDbSrvObjs = objs;
	} else {
		req.qpobj.comDbSrvObjs = [objs];
	}
	if (cond) {
		this.mdb.qry("get", req, res, next, [cond]);
	} else {
		this.mdb.qry("add", req, res, next, [req.qpobj.comDbSrvObjs]);
	}
};
LZR.Node.Srv.ComDbSrv.prototype.add.lzrClass_ = LZR.Node.Srv.ComDbSrv;

// 分页查询
LZR.Node.Srv.ComDbSrv.prototype.qry = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/, k/*as:string*/, v/*as:Object*/, cond/*as:Object*/, mark/*as:Object*/, noRes/*as:boolean*/) {
	this.setPro (req, "qry", noRes);
	var n = (req.body.size - 0) || (req.params.size - 0) || this.qrySize;
	var s = (req.body.sort - 0) || (req.params.sort - 0) || this.qrySort;
	var o = {};
	if (!cond) {
		cond = {};
	}
	if (!cond[k] && v && (n > 0)) {
		cond[k] = {};
	}
	if (s > 0) {
		s = 1;
		if ((v || v === 0) && (n > 0)) {
			if (!cond[k]["$gte"] || cond[k]["$gte"] < v) {
				cond[k]["$gte"] = v;
			}
		}
	} else {
		s = -1;
		if ((v || v === 0) && (n > 0)) {
			if (!cond[k]["$lte"] || cond[k]["$lte"] > v) {
				cond[k]["$lte"] = v;
			}
		}
	}
	if (n > 0) {
		n ++;
		o[k] = s;
		this.mdb.qry("qry", req, res, next, [cond, mark, o, n]);
	} else if (this.qryDelAble && n === -2) {
		req.qpobj.comDbSrvCond = {
			method: "del",
			cond: cond
		};
		this.mdb.qry("del", req, res, next, [cond]);
	} else {
		this.mdb.qry("count", req, res, next, [cond]);
	}
};
LZR.Node.Srv.ComDbSrv.prototype.qry.lzrClass_ = LZR.Node.Srv.ComDbSrv;

// 获取总数
LZR.Node.Srv.ComDbSrv.prototype.count = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/, cond/*as:Object*/, noRes/*as:boolean*/) {
	this.setPro (req, "count", noRes);
	this.mdb.qry("count", req, res, next, [cond]);
};
LZR.Node.Srv.ComDbSrv.prototype.count.lzrClass_ = LZR.Node.Srv.ComDbSrv;

// 修改
LZR.Node.Srv.ComDbSrv.prototype.set = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/, cond/*as:Object*/, cont/*as:Object*/, noRes/*as:boolean*/) {
	this.setPro (req, "set", noRes);
	req.qpobj.comDbSrvCond = {
		method: "set",
		cond: cond
	};
	this.mdb.qry("set", req, res, next, [cond, cont]);
};
LZR.Node.Srv.ComDbSrv.prototype.set.lzrClass_ = LZR.Node.Srv.ComDbSrv;

// 删除
LZR.Node.Srv.ComDbSrv.prototype.del = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/, cond/*as:Object*/, noRes/*as:boolean*/) {
	this.setPro (req, "del", noRes);
	req.qpobj.comDbSrvCond = {
		method: "del",
		cond: cond
	};
	this.mdb.qry("del", req, res, next, [cond]);
};
LZR.Node.Srv.ComDbSrv.prototype.del.lzrClass_ = LZR.Node.Srv.ComDbSrv;

// 设置参数
LZR.Node.Srv.ComDbSrv.prototype.setPro = function (req/*as:Object*/, typ/*as:string*/, noRes/*as:boolean*/) {
	if (!req.qpobj) {
		req.qpobj = {};
	}
	req.qpobj.comDbSrvTyp = typ;
	req.qpobj.comDbSrvNoRes = noRes;
};
LZR.Node.Srv.ComDbSrv.prototype.setPro.lzrClass_ = LZR.Node.Srv.ComDbSrv;
