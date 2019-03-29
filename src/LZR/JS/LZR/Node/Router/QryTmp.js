/*************************************************
作者：子牛连
类名：QryTmp
说明：分页查询模板路由
创建日期：03-九月-2018 9:16:34
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Node.Router",
	"LZR.Node.Srv.ComDbSrv",
	"LZR.Base.Json"
], "LZR.Node.Router.QryTmp");
LZR.Node.Router.QryTmp = function (obj) {
	// 数据库连接字
	this.conf = "";	/*as:string*/

	// 是否记录日志
	this.logAble = 0;	/*as:int*/

	// 排序值解析表
	this.pvs = {	// 1:数字；2:ID；0:文字
		"_id": 2
	};	/*as:Object*/

	// 添加条件
	this.addC = null;

	// 默认表名
	this.defTnam = "test";	/*as:string*/

	// 数据库
	this.db/*m*/ = null;	/*as:LZR.Node.Srv.ComDbSrv*/

	// 数据库类
	this.clsDbSrv/*m*/ = (LZR.Node.Srv.ComDbSrv);	/*as:fun*/

	// 路由器
	this.ro/*m*/ = null;	/*as:LZR.Node.Router*/

	// JSON工具
	this.utJson/*m*/ = LZR.getSingleton(LZR.Base.Json);	/*as:LZR.Base.Json*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Node.Router.QryTmp.prototype.className_ = "LZR.Node.Router.QryTmp";
LZR.Node.Router.QryTmp.prototype.version_ = "1.0";

LZR.load(null, "LZR.Node.Router.QryTmp");

// 构造器
LZR.Node.Router.QryTmp.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
		// 模板的分页查询数据结构：
		// {
		//     mt: 方法,		pag,count,drop,add,clear,del,set
		//     tn: 表名,
		//     size: 每页显示个数,
		//     sort: 排序方式,		1:从小到大,-1:从大到小
		//     k: 排序键,
		//     v: 排序值,
		//     sm: 上下页,		0:第一页,1:下一页,-1:上一页
		//     cond: 查询条件(JSON),
		//     cont: 内容(JSON),
		//     mark: 遮罩(JSON),
		//     id: 修改时的_id值,
		//     ---------- 返回值 -------
		//     total: 符合查询条件的结果总数,
		//     ok: 数据库符合查询条件的结果总数,
		// }
	}
};
LZR.Node.Router.QryTmp.prototype.init_.lzrClass_ = LZR.Node.Router.QryTmp;

// 对构造参数的特殊处理
LZR.Node.Router.QryTmp.prototype.hdObj_ = function (obj/*as:Object*/) {

};
LZR.Node.Router.QryTmp.prototype.hdObj_.lzrClass_ = LZR.Node.Router.QryTmp;

// 初始化
LZR.Node.Router.QryTmp.prototype.init = function (nam/*as:string*/) {
	if (!this.db && this.conf) {
		this.db = new this.clsDbSrv({logAble: this.logAble});
		this.db.initDb (this.conf, this.defTnam, true);

		// 对数据库进行错误处理
		var hdErr = LZR.bind(this, function (e, req, res, next) {
// console.log (e);
			req.qpobj.comDbSrvReturn = {ErrQryTmp: e};
			next();
		});
		for (var s in this.db.mdb.err) {
			this.db.mdb.err[s].add(hdErr);
		}
	}
	this.ro.get(nam + "qry_:x/:tn?/:k?/:size?/:sort?/", LZR.bind(this,this.hdGet));
	this.ro.hdPost(nam + "qry*");	// 解析 post 参数
	this.ro.post(nam + "qry_:x/", LZR.bind(this,this.hdPost));
	this.ro.all(nam + "qry_*", LZR.bind(this,this.pagQry));
	this.ro.post(nam + "qry_:x/", LZR.bind(this,this.hdAddQry));
	this.ro.post(nam + "qryAddOne/:bck/", LZR.bind(this,this.hdAdd));
};
LZR.Node.Router.QryTmp.prototype.init.lzrClass_ = LZR.Node.Router.QryTmp;

// 处理GET请求
LZR.Node.Router.QryTmp.prototype.hdGet = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var o = LZR.fillPro(req, "qpobj.tmpo.qry");
	if (req.params.tn === "null") {
		req.params.tn = null;
	}
	if (req.params.k === "null") {
		req.params.k = null;
	}
	o.mt = "pag";
	o.tn = req.params.tn || o.tn || this.defTnam;
	o.size = (req.params.size - 0) || o.size || 10;
	o.sort = (req.params.sort - 0) || o.sort || 1;
	o.k = req.params.k || o.k || "_id";
	o.v = "";
	o.sm = 0;
	o.total = 0;
	o.cond = o.cond || "{}";
	o.mark = o.mark || "{}";
	req.body = {};		// GET请求不会自动生成 body

	this.hdPost(req, res, next);
};
LZR.Node.Router.QryTmp.prototype.hdGet.lzrClass_ = LZR.Node.Router.QryTmp;

// 处理POST请求
LZR.Node.Router.QryTmp.prototype.hdPost = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var o = LZR.fillPro(req, "qpobj.tmpo.qry");
	if (!o.mt) {
		this.copyQryPro(req, o);
		o.cont = req.body.cont;
	}

	if (o.sm === -1) {
		req.body.sort = -o.sort;
		req.body.size = o.size + 1;
	} else {
		req.body.sort = o.sort;
		req.body.size = o.size;
	}

	// TODO: 未来可在此进行权限管控
	switch (o.mt) {
		case "pag":
			this.qry(req, res, next, o);
			break;
		case "count":
			this.db.count( req, res, next, this.utJson.toObj(o.cond), true );
			break;
		case "add":
			var d = this.utJson.toObj(o.cont);
			if (this.addC) {
				LZR.setObj(this.addC, d);
			}
			this.db.add( req, res, next, this.addC, this.utJson.toObj(o.cont), true );
			break;
		case "set":
			this.db.set( req, res, next, {"_id": this.parsV("_id", req.body.id)}, {"$set": this.utJson.toObj(o.cont)}, true );
			break;
		case "del":		// 删除单个记录
			this.db.del( req, res, next, {"_id": this.parsV("_id", o.cont)}, true );
			break;
		case "clear":	// 清空符合查询条件的所有记录
			this.db.del( req, res, next, this.utJson.toObj(o.cond), true );
			break;
		case "drop":
			this.db.drop( req, res, next, true );
			break;
		default:
			res.send("暂无数据！");	// TODO: 需要一个可返回上一页，且有错误提示的专门的错误提示页面
			break;
	}
};
LZR.Node.Router.QryTmp.prototype.hdPost.lzrClass_ = LZR.Node.Router.QryTmp;

// 分页查询
LZR.Node.Router.QryTmp.prototype.pagQry = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	if (!req.params[0]) {
		next();
		return;
	}
	var o = LZR.fillPro(req, "qpobj.tmpo.qry");
	var r = req.qpobj.comDbSrvReturn;
	var redo = 1;
	req.body.sort = o.sort;
	req.body.size = o.size;
	switch (o.mt) {
		case "pag":
			if (r.ErrQryTmp) {
				redo = 0;
			} else {
				if (o.sm === -1) {
					if (r.length > o.size) {
						if (r.length >= o.size + 2) {
							o.sm = 1;
							o.v = r[o.size][o.k];
							r.pop();
						} else {
							o.sm = 0;
							o.v = "";
						}
						r.reverse();
						redo = 2;
					} else {
						o.v = "";
						o.sm = 0;
					}
				} else {
					redo = 2;
				}
			}
			break;
		case "count":
			if (r.ErrQryTmp) {
				redo = 0;
			} else {
				o.total = r;
				o.v = "";
				o.sm = 0;
				if (r === 0) {
					req.qpobj.comDbSrvReturn = [];
					redo = 2;
				}
			}
			break;
		case "drop":
			o.ok = (r === true);
			if (o.ok) {
				o.v = "";
				o.sm = 0;
			}
			break;
		case "add":
			o.ok = (r.ErrQryTmp) ? false : (r.result.ok === 1 && r.result.n > 0);
			if (o.ok) {
				var obj = r.ops[0];
				o.v = obj[o.k];
				o.sm = -1;
				req.body.sort = -o.sort;
			}
			break;
		case "clear":
			o.ok = (r.ok === 1 && r.n > 0);
			if (o.ok) {
				o.v = "";
				o.sm = 0;
			}
			break;
		case "del":
			o.ok = (r.ok === 1 && r.n > 0);
			if (o.ok) {
				o.v = "";
				o.sm = 0;
			}
			break;
		case "set":
			o.ok = (r.ok === 1 && r.nModified > 0);
			break;
		default:
			redo = 0;
			break;
	}

	switch (redo) {
		case 1:
			this.qry(req, res, next, o);
			break;
		case 2:
			next();
			break;
		default:
			res.send("暂无数据！");	// TODO: 需要一个可返回上一页，且有错误提示的专门的错误提示页面
			break;
	}
};
LZR.Node.Router.QryTmp.prototype.pagQry.lzrClass_ = LZR.Node.Router.QryTmp;

// 对添加后的查询做特殊处理
LZR.Node.Router.QryTmp.prototype.hdAddQry = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var o = LZR.fillPro(req, "qpobj.tmpo.qry");
	if (o.mt === "add" && o.sm === -1) {
		var r = req.qpobj.comDbSrvReturn;
		if (r.length > o.size) {
			o.sm = 1;
			o.v = r[o.size - 1][o.k];
		} else {
			o.sm = 0;
			o.v = "";
		}
		req.body.sort = o.sort;
		req.body.size = o.size;
		this.qry(req, res, next, o);
	} else {
		next();
	}
};
LZR.Node.Router.QryTmp.prototype.hdAddQry.lzrClass_ = LZR.Node.Router.QryTmp;

// 添加或修改
LZR.Node.Router.QryTmp.prototype.hdAdd = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var o = LZR.fillPro(req, "qpobj.tmpo.qry");
	this.copyQryPro(req, o);
	o.id = req.body.cont;
	o.bck = req.params.bck;

	if (o.mt === "add") {
		next();
	} else {
		this.db.get( req, res, next, {"_id": this.parsV("_id", o.id)}, {"_id": 0}, true );
	}
};
LZR.Node.Router.QryTmp.prototype.hdAdd.lzrClass_ = LZR.Node.Router.QryTmp;

// 解析排序值
LZR.Node.Router.QryTmp.prototype.parsV = function (k/*as:string*/, v/*as:string*/)/*as:Object*/ {
	var r = v;
	if (v) {
		switch (this.pvs[k]) {
			case 1:
				r = v - 0;
				break;
			case 2:
				r = new this.db.mdb.clsOid(v);
				break;
		}
	}
	return r;
};
LZR.Node.Router.QryTmp.prototype.parsV.lzrClass_ = LZR.Node.Router.QryTmp;

// 复制查询参数
LZR.Node.Router.QryTmp.prototype.copyQryPro = function (req/*as:Object*/, o/*as:Object*/) {
	if (!o) {
		o = {};
	}
	o.mt = req.body.mt;
	o.tn = req.body.tn;
	o.size = req.body.size - 0;
	o.sort = req.body.sort - 0;
	o.k = req.body.k;
	o.v = req.body.v;
	o.sm = req.body.sm - 0;
	o.total = req.body.total - 0;
	o.cond = req.body.cond;
	o.mark = req.body.mark;
	return o;
};
LZR.Node.Router.QryTmp.prototype.copyQryPro.lzrClass_ = LZR.Node.Router.QryTmp;

// 触发分页查询
LZR.Node.Router.QryTmp.prototype.qry = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/, o/*as:Object*/) {
	if (!o) {
		o = LZR.fillPro(req, "qpobj.tmpo.qry");
	}
	if (!o.mt) {
		this.copyQryPro(req, o);
	}
	this.db.qry( req, res, next, o.k, this.parsV(o.k, o.v), this.utJson.toObj(o.cond), this.utJson.toObj(o.mark), true );
};
LZR.Node.Router.QryTmp.prototype.qry.lzrClass_ = LZR.Node.Router.QryTmp;
