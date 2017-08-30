/*************************************************
作者：子牛连
类名：DataMgrSrv
说明：数据管理器的服务
创建日期：10-七月-2017 9:15:45
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Node.Srv",
	"LZR.Node.Db.Mongo"
], "LZR.Node.Srv.DataMgrSrv");
LZR.Node.Srv.DataMgrSrv = function (obj) {
	// 数据集
	this.root = null;	/*as:Object*/

	// 锁
	this.lock = false;	/*as:boolean*/

	// 锁时间
	this.lockTimout = 50;	/*as:int*/

	// 数据库
	this.db/*m*/ = new LZR.Node.Db.Mongo();	/*as:LZR.Node.Db.Mongo*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Node.Srv.DataMgrSrv.prototype.className_ = "LZR.Node.Srv.DataMgrSrv";
LZR.Node.Srv.DataMgrSrv.prototype.version_ = "1.0";

LZR.load(null, "LZR.Node.Srv.DataMgrSrv");

// 构造器
LZR.Node.Srv.DataMgrSrv.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Node.Srv.DataMgrSrv.prototype.init_.lzrClass_ = LZR.Node.Srv.DataMgrSrv;

// 对构造参数的特殊处理
LZR.Node.Srv.DataMgrSrv.prototype.hdObj_ = function (obj/*as:Object*/) {

};
LZR.Node.Srv.DataMgrSrv.prototype.hdObj_.lzrClass_ = LZR.Node.Srv.DataMgrSrv;

// 数据库初始化
LZR.Node.Srv.DataMgrSrv.prototype.initDb = function (dbNam/*as:string*/, tnam/*as:string*/, conf/*as:string*/, autoErr/*as:boolean*/)/*as:LZR.Node.Db.Mongo*/ {
	if (this.root === null) {
		this.db.conf = conf;
		if (autoErr) {
			this.db.autoErr = autoErr;
		}
		var sql = {
			// 获取一个数据
			get: {
				db: dbNam,
				tnam: tnam,
				funs: {
					findOne: ["<0>", {_id: 0}]
				}
			},

			// 新增一个数据
			new: {
				db: dbNam,
				tnam: tnam,
				funs: {
					insertOne: ["<0>"]
				}
			},

			// 序号加一
			inc: {
				db: dbNam,
				tnam: tnam,
				funs: {
					updateOne: [
						{id: "root"},
						{$inc: {im: 1}}
					]
				}
			},

			// 修改一个数据
			chg: {
				db: dbNam,
				tnam: tnam,
				funs: {
					updateOne: [
						{id: "<0>"},
						{$set: "<1>"}
					]
				}
			},

			// 获取一个数据下的所有子元素
			sub: {
				db: dbNam,
				tnam: tnam,
				funs: {
					// find: [{chd_: {$all: "<0>"}}, {id: 1}],
					find: [{chd_: "<0>"}, {id: 1, _id: 0}],
					toArray: []
				}
			},

			// 删除数据
			del: {
				db: dbNam,
				tnam: tnam,
				funs: {
					// deleteMany: [{id: {$in: "<0>"}}]
					deleteMany: [{id: "<0>"}]
				}
			},

			// 删除树形结构中的数据
			delRoot: {
				db: dbNam,
				tnam: tnam,
				funs: {
					updateOne: [
						{id: "root"},
						// {$unset: {"<0>": 1}}
						{$unset: "<0>"}
					]
				}
			},

			// 父类修改
			chgParent: {
				db: dbNam,
				tnam: tnam,
				funs: {
					updateMany: [
						{id: "<0>"},
						"<1>"
					]
				}
			}

		};
		this.db.crtEvt(sql);

		// 事件处理
		this.db.evt.get.add(LZR.bind(this, this.cbGet));
		this.db.evt.sub.add(LZR.bind(this, this.cbSub));

		// 获取数据集
		this.db.qry("get", {qpobj: {dbSt: "root"}}, null, null, [{id: "root"}]);
	}
};
LZR.Node.Srv.DataMgrSrv.prototype.initDb.lzrClass_ = LZR.Node.Srv.DataMgrSrv;

// 获取数据
LZR.Node.Srv.DataMgrSrv.prototype.get = function (road/*as:Array*/)/*as:Object*/ {
	var r = this.root;
	var n = road.length - 1;
	for (var i = 0; i < n; i++) {
		r = r[road[i]].chd_;	// 暂时假定路径一定是正确的，不会出错，故不做 null 值检查
	}
	return r[road[n]];
};
LZR.Node.Srv.DataMgrSrv.prototype.get.lzrClass_ = LZR.Node.Srv.DataMgrSrv;

// 获取带父类的数据
LZR.Node.Srv.DataMgrSrv.prototype.getLong = function (road/*as:Array*/, all/*as:boolean*/)/*as:Array*/ {
	var s, k;
	var i = 0;
	var r = [];
	var o = this.root[road[i]];	// 暂时假定路径一定是正确的，不会出错，故不做 null 值检查
	do {
		k = LZR.simpleClone(o, {
			id: road[i]
		}, "chd_");
		i ++;
		if (i < road.length) {
			o = o.chd_[road[i]];
		} else if (all) {
			k.chd_ = o.chd_;
		}
		r.push(k);
	} while (i < road.length);
	return r;
};
LZR.Node.Srv.DataMgrSrv.prototype.getLong.lzrClass_ = LZR.Node.Srv.DataMgrSrv;

// 返回字符串形式的数据路径
LZR.Node.Srv.DataMgrSrv.prototype.road2str = function (road/*as:Array*/)/*as:string*/ {
	var r = "";
	var n = road.length - 1;
	for (var i = 0; i < n; i++) {
		r += road[i];
		r += ".chd_.";
	}
	r += road[n];
	return r;
};
LZR.Node.Srv.DataMgrSrv.prototype.road2str.lzrClass_ = LZR.Node.Srv.DataMgrSrv;

// 获取数据的回调处理
LZR.Node.Srv.DataMgrSrv.prototype.cbGet = function (r/*as:Object*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	switch (req.qpobj.dbSt) {
		case "srvGet":
			if (r) {
				res.json(LZR.simpleClone(r, r, "chd_id", "chd_"));
			} else {
				res.send("null");
			}
			break;
		case "srvGetLong":
			if (r) {
				res.json(this.getLong(r.chd_, false));
			} else {
				res.send("null");
			}
			break;
		case "srvNew":
			this.cbNew(r, req, res, next, false);
			break;
		case "srvNewPid":
			this.cbNew(r, req, res, next, true);
			break;
		case "srvSp":
			this.cbSpSelf(r, req, res, next);
			break;
		case "srvSpHas":
			this.cbSpHas(r, req, res, next);
			break;
		case "srvSpCheck":
			this.cbSpCheck(r, req, res, next);
			break;
		case "srvDel":
			if (r) {
				req.qpobj.obj = r;
				this.db.qry("sub", req, res, next, [{$all: r.chd_}]);
			} else {
				this.lock = false;
				res.send("null");
			}
			break;
		case "srvSet":
			this.cbSet(r, req, res, next);
			break;
		case "srvGetAll":
			if (r) {
				res.json(LZR.simpleClone(this.get(r.chd_), {
					id: r.id
				}));
			} else {
				res.send("null");
			}
			break;
		case "srvGetAllLong":
			if (r) {
				res.json(this.getLong(r.chd_, true));
			} else {
				res.send("null");
			}
			break;
		case "root":
			if (r) {
				this.root = r;
				LZR.del(this.root, "id");
			} else {
				// 创建数据集
				this.db.qry("new", null, null, null, [{id: "root", im: 1}]);
				this.root = {im: 1};
			}
			break;
	}
};
LZR.Node.Srv.DataMgrSrv.prototype.cbGet.lzrClass_ = LZR.Node.Srv.DataMgrSrv;

// 新建数据
LZR.Node.Srv.DataMgrSrv.prototype.srvNew = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/, obj/*as:Object*/, pid/*as:int*/) {
	if (this.lock) {
		setTimeout(LZR.bind(this, this.srvNew, req, res, next, obj, pid), this.lockTimout);
		return;
	}
	this.lock = true;

	req.qpobj = {
		dbSt: "srvNew",
		obj: obj
	};
	obj.chd_id = pid ? (pid - 0) : 0;	// chd_id：代表父类ID
	this.db.qry("get", req, res, next, [obj]);
};
LZR.Node.Srv.DataMgrSrv.prototype.srvNew.lzrClass_ = LZR.Node.Srv.DataMgrSrv;

// 新建数据的回调处理
LZR.Node.Srv.DataMgrSrv.prototype.cbNew = function (r/*as:Object*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/, hasParent/*as:boolean*/) {
	if (r) {
		if (!hasParent) {
			// 已存在重复元素， 无需新增
			this.lock = false;
			req.qpobj.dbSt = "srvGet";
			this.cbGet(r, req, res, next);
			return;
		}
	} else {
		if (hasParent) {
			// 没找到欲新增元素的父类
			this.lock = false;
			res.send("null");
			return;
		} else if (req.qpobj.obj.chd_id) {
			// 检查父元素是否存在
			req.qpobj.dbSt = "srvNewPid";
			this.db.qry("get", req, res, next, [{id: req.qpobj.obj.chd_id}]);
			return;
		}
	}

	var sr = {};
	var sn = req.qpobj.obj;
	// var o = LZR.simpleClone(sn, {}, "chd_id");
	var o = LZR.simpleClone(sn, {chd_: {}}, "chd_id");
	sn.id = this.root.im;

	if (hasParent) {
		// 新增有父类的元素
		var p = this.get(r.chd_);
		// if (!p.chd_) {
		// 	p.chd_ = {};
		// 	sr[this.road2str(r.chd_) + ".chd_"] = p.chd_;
		// 	r.chd_.push(this.root.im);
		// } else {
			r.chd_.push(this.root.im);
			sr[this.road2str(r.chd_)] = o;
		// }
		sn.chd_ = r.chd_;
		p.chd_[this.root.im] = o;
	} else {
		// 新增无父类的元素
		sr[this.root.im] = o;
		sn.chd_ = [this.root.im];
		this.root[this.root.im] = o;
	}

	// 新增
	this.db.qry("new", null, null, null, [sn]);

	// 序号加一
	this.root.im ++;
	this.db.qry("inc");

	// root 修改
	this.db.qry("chg", null, null, null, ["root", sr]);

	this.lock = false;
	res.json(LZR.simpleClone(o, {
		id: sn.id
	}, "chd_"));

};
LZR.Node.Srv.DataMgrSrv.prototype.cbNew.lzrClass_ = LZR.Node.Srv.DataMgrSrv;

// 获取数据
LZR.Node.Srv.DataMgrSrv.prototype.srvGet = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/, id/*as:int*/, typ/*as:int*/) {
	if (this.lock) {
		setTimeout(LZR.bind(this, this.srvGet, req, res, next, id, typ), this.lockTimout);
		return;
	}

	req.qpobj = {};
	switch (typ) {
		case "1":
			req.qpobj.dbSt = "srvGetAll"
			break;
		case "2":
			req.qpobj.dbSt = "srvGetLong"
			break;
		case "3":
			req.qpobj.dbSt = "srvGetAllLong"
			break;
		default:
			req.qpobj.dbSt = "srvGet"
			break;
	}
	this.db.qry("get", req, res, next, [{id: (id - 0)}]);
};
LZR.Node.Srv.DataMgrSrv.prototype.srvGet.lzrClass_ = LZR.Node.Srv.DataMgrSrv;

// 修改数据
LZR.Node.Srv.DataMgrSrv.prototype.srvSet = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/, obj/*as:Object*/, id/*as:int*/) {
	if (this.lock) {
		setTimeout(LZR.bind(this, this.srvSet, req, res, next, obj, id), this.lockTimout);
		return;
	}
	this.lock = true;

	req.qpobj = {
		dbSt: "srvSet",
		obj: obj
	};
	this.db.qry("get", req, res, next, [{id: (id - 0)}]);
};
LZR.Node.Srv.DataMgrSrv.prototype.srvSet.lzrClass_ = LZR.Node.Srv.DataMgrSrv;

// 修改数据的回调处理
LZR.Node.Srv.DataMgrSrv.prototype.cbSet = function (r/*as:Object*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	if (r) {
		var o = this.get(r.chd_);
		var rd = this.road2str(r.chd_);
		var p = req.qpobj.obj;
		var rs = {};
		var s;
		this.db.qry("chg", null, null, null, [r.id, p]);
		for (s in p) {
			rs[rd + "." + s] = p[s];
			o[s] = p[s];
		}
		this.db.qry("chg", null, null, null, ["root", rs]);

		// 返回值
		res.json(LZR.simpleClone(o, {
			id: r.id
		}, "chd_"));
	} else {
		// 修改失败
		res.send("null");
	}

	this.lock = false;
};
LZR.Node.Srv.DataMgrSrv.prototype.cbSet.lzrClass_ = LZR.Node.Srv.DataMgrSrv;

// 删除数据
LZR.Node.Srv.DataMgrSrv.prototype.srvDel = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/, id/*as:int*/) {
	if (this.lock) {
		setTimeout(LZR.bind(this, this.srvDel, req, res, next, id), this.lockTimout);
		return;
	}
	this.lock = true;

	req.qpobj = {
		dbSt: "srvDel"
	};
	this.db.qry("get", req, res, next, [{id: (id - 0)}]);
};
LZR.Node.Srv.DataMgrSrv.prototype.srvDel.lzrClass_ = LZR.Node.Srv.DataMgrSrv;

// 获取子元素的回调处理
LZR.Node.Srv.DataMgrSrv.prototype.cbSub = function (r/*as:Object*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	switch (req.qpobj.dbSt) {
		case "srvDel":
			this.cbDel(r, req, res, next);
			break;
		case "srvSp":
			this.cbSp(r, req, res, next);
			break;
		default:
			this.lock = false;
			res.json(r);
			break;
	}
};
LZR.Node.Srv.DataMgrSrv.prototype.cbSub.lzrClass_ = LZR.Node.Srv.DataMgrSrv;

// 删除数据的回调处理
LZR.Node.Srv.DataMgrSrv.prototype.cbDel = function (r/*as:Object*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var a = [];
	for (var i = 0; i < r.length; i++) {
		a.push(r[i].id);
	}
	this.db.qry("del", null, null, null, [{$in: a}]);

	var rs = {};
	var road = req.qpobj.obj.chd_;
	rs[this.road2str(road)] = 1;
	var n = "" + road.pop();
	var p;
	if (road.length) {
		p = this.get(road).chd_;
	} else {
		p = this.root;
	}
	LZR.del(p, n);
	this.db.qry("delRoot", null, null, null, [rs]);

	this.lock = false;
	res.json(a);
};
LZR.Node.Srv.DataMgrSrv.prototype.cbDel.lzrClass_ = LZR.Node.Srv.DataMgrSrv;

// 修改父类
LZR.Node.Srv.DataMgrSrv.prototype.srvSp = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/, id/*as:int*/, pid/*as:int*/) {
	if (this.lock) {
		setTimeout(LZR.bind(this, this.srvSp, req, res, next, id, pid), this.lockTimout);
		return;
	}
	this.lock = true;

	req.qpobj = {
		dbSt: "srvSp"
	};
	req.qpobj.p = pid ? (pid - 0) : 0;
	this.db.qry("get", req, res, next, [{id: (id - 0)}]);
};
LZR.Node.Srv.DataMgrSrv.prototype.srvSp.lzrClass_ = LZR.Node.Srv.DataMgrSrv;

// 修改父类的回调处理
LZR.Node.Srv.DataMgrSrv.prototype.cbSp = function (r/*as:Object*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var pid = 0;
	var us = {};
	var st = {};
	var o = this.get(req.qpobj.obj.chd_);
	var op = this.root;
	var np = this.root;
	var a = [];
	for (var i = 0; i < r.length; i++) {
		a.push(r[i].id);
	}

	us[this.road2str(req.qpobj.obj.chd_)] = 1;
	req.qpobj.obj.chd_.pop();
	if (req.qpobj.obj.chd_.length > 0) {
		// 删除这些子元素的原有路径
		this.db.qry("chgParent", null, null, null, [{$in: a}, {$pullAll: {chd_: req.qpobj.obj.chd_}}]);
		op = this.get(req.qpobj.obj.chd_).chd_;
	}
	if (req.qpobj.p) {
		pid = req.qpobj.p.id;
		np = this.get(req.qpobj.p.chd_).chd_;
		st[this.road2str(req.qpobj.p.chd_) + ".chd_." + req.qpobj.obj.id] = o;
		// 给这些子元素添加新的路径
		this.db.qry("chgParent", null, null, null, [{$in: a}, {$push: {chd_: {
			$each: req.qpobj.p.chd_,
			$position: 0
		}}}]);
	} else {
		st[req.qpobj.obj.id] = o;
	}

	// 修改数据
	this.db.qry("chg", null, null, null, [req.qpobj.obj.id, {chd_id: pid}]);

	// root 修改
	np[req.qpobj.obj.id] = o;
	LZR.del(op, req.qpobj.obj.id);

	// 数据库 root 修改
	this.db.qry("chgParent", null, null, null, ["root", {
		$unset: us,
		$set: st
	}]);

	this.lock = false;
	res.json(a);
};
LZR.Node.Srv.DataMgrSrv.prototype.cbSp.lzrClass_ = LZR.Node.Srv.DataMgrSrv;

// 修改父类的回调处理 之 自身是否存在
LZR.Node.Srv.DataMgrSrv.prototype.cbSpSelf = function (r/*as:Object*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	if (r && (r.chd_id !== req.qpobj.p)) {
		req.qpobj.obj = r;
		if (req.qpobj.p) {
			// 检查父类是否存在
			req.qpobj.dbSt = "srvSpHas";
			this.db.qry("get", req, res, next, [{id: req.qpobj.p}]);
		} else {
			// 抓取所有相关的子元素
			this.cbSpCheck(false, req, res, next);
		}
	} else {
		// 欲修改的数据不存在
		this.lock = false;
		res.send("null");
	}
};
LZR.Node.Srv.DataMgrSrv.prototype.cbSpSelf.lzrClass_ = LZR.Node.Srv.DataMgrSrv;

// 修改父类的回调处理 之 父类是否存在
LZR.Node.Srv.DataMgrSrv.prototype.cbSpHas = function (r/*as:Object*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	if (r) {
		// 检查父类的路径中是否包含欲修改的ID
		var oid = req.qpobj.obj.id;
		for (var i = 0; i < r.chd_.length; i++) {
			if (oid === r.chd_[i]) {
				// 父类的路径中存在欲修改的ID，不能修改
				this.lock = false;
				res.send("null");
				return;
			}
		}

		// 检查父类中是否存在与自身数据相同的元素
		req.qpobj.p = r;
		req.qpobj.dbSt = "srvSpCheck";
		var o = LZR.simpleClone(req.qpobj.obj, {}, "chd_", "id");
		o.chd_id = r.id;
		this.db.qry("get", req, res, next, [o]);
	} else {
		// 父元素不存在
		this.lock = false;
		res.send("null");
	}
};
LZR.Node.Srv.DataMgrSrv.prototype.cbSpHas.lzrClass_ = LZR.Node.Srv.DataMgrSrv;

// 修改父类的回调处理 之 检查父类中有无相同元素
LZR.Node.Srv.DataMgrSrv.prototype.cbSpCheck = function (r/*as:Object*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	if (r) {
		// 已存在相同元素不能修改
		this.lock = false;
		res.send("null");
	} else {
		// 抓取所有相关的子元素
		req.qpobj.dbSt = "srvSp";
		this.db.qry("sub", req, res, next, [{$all: req.qpobj.obj.chd_}]);
	}
};
LZR.Node.Srv.DataMgrSrv.prototype.cbSpCheck.lzrClass_ = LZR.Node.Srv.DataMgrSrv;
