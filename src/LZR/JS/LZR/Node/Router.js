/*************************************************
作者：子牛连
类名：Router
说明：路由器
创建日期：18-九月-2016 11:35:54
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Node",
	"LZR.Base.CallBacks"
], "LZR.Node.Router");
LZR.Node.Router = function (obj) {
	// express 框架
	this.ep = LZR.getSingleton (null, null, "express");	/*as:Object*/

	// 路由对象
	this.ro = this.ep.Router();	/*as:Object*/

	// 回调集合
	this.cbs = {};	/*as:Object*/

	// 路径
	this.path = "./";	/*as:string*/

	// 回调类
	this.clsCb/*m*/ = (LZR.Base.CallBacks);	/*as:fun*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Node.Router.prototype.className_ = "LZR.Node.Router";
LZR.Node.Router.prototype.version_ = "1.0";

LZR.load(null, "LZR.Node.Router");

// 构造器
LZR.Node.Router.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}

	this.setStaticDir("/", this.path + "web");
};
LZR.Node.Router.prototype.init_.lzrClass_ = LZR.Node.Router;

// 对构造参数的特殊处理
LZR.Node.Router.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Node.Router.prototype.hdObj_.lzrClass_ = LZR.Node.Router;

// 设置静态文件夹
LZR.Node.Router.prototype.setStaticDir = function (nam/*as:string*/, dir/*as:string*/) {
	this.use(nam, this.ep.static(dir));
};
LZR.Node.Router.prototype.setStaticDir.lzrClass_ = LZR.Node.Router;

// 获取回调
LZR.Node.Router.prototype.getCbs = function (nam/*as:string*/, matching/*as:string*/, proNam/*as:string*/)/*as:Array*/ {
	var r;
	if (nam && matching) {
		r = this.cbs[nam];
		if (!r) {
			r = {};
			this.cbs[nam] = r;
		}

		r = r[matching];
		if (!r) {
			if (matching === "param") {
				r = {};
			} else {
				r = [];
			}
			this.cbs[nam][matching] = r;
		}

		if (matching === "param") {
			if (proNam) {
				r = r[proNam];
				if (!r) {
					r[proNam] = [];
				}
			} else {
				r = undefined;
			}
		}
	}
	return r;
};
LZR.Node.Router.prototype.getCbs.lzrClass_ = LZR.Node.Router;

// 设置回调
LZR.Node.Router.prototype.setCbs = function (nam/*as:string*/, matching/*as:string*/, fun/*as:Object*/, proNam/*as:string*/)/*as:Object*/ {
	var r;
	var c = this.getCbs(nam, matching, proNam);
	if (fun.className_ === this.className_) {
		this.ro[matching](nam, fun.ro);
	} else if (c) {
		switch (LZR.getClassName(fun)) {
			case "function":
				r = new this.clsCb();
				r.add(fun);
				break;
			default:
				if (fun.exe) {
					r = fun;
				}
				break;
		}
		if (r) {
			c.push(r);
			if (matching === "param") {
				this.ro[matching](proNam, r.exe);
			} else {
				this.ro[matching](nam, r.exe);
			}
		}
	}
	return r;
};
LZR.Node.Router.prototype.setCbs.lzrClass_ = LZR.Node.Router;

// 路由参数匹配
LZR.Node.Router.prototype.param = function (nam/*as:string*/, proNam/*as:string*/, fun/*as:Object*/)/*as:Object*/ {
	if (LZR.getClassName(fun) === "function") {
		return this.setCbs(nam, "param", fun, proNam);
	}
};
LZR.Node.Router.prototype.param.lzrClass_ = LZR.Node.Router;

// 路由前缀匹配
LZR.Node.Router.prototype.use = function (nam/*as:string*/, fun/*as:Object*/)/*as:Object*/ {
	return this.setCbs(nam, "use", fun);
};
LZR.Node.Router.prototype.use.lzrClass_ = LZR.Node.Router;

// 路由完全匹配
LZR.Node.Router.prototype.all = function (nam/*as:string*/, fun/*as:Object*/)/*as:Object*/ {
	return this.setCbs(nam, "all", fun);
};
LZR.Node.Router.prototype.all.lzrClass_ = LZR.Node.Router;

// 路由 get 匹配
LZR.Node.Router.prototype.get = function (nam/*as:string*/, fun/*as:Object*/)/*as:Object*/ {
	return this.setCbs(nam, "get", fun);
};
LZR.Node.Router.prototype.get.lzrClass_ = LZR.Node.Router;

// 路由 post 匹配
LZR.Node.Router.prototype.post = function (nam/*as:string*/, fun/*as:Object*/)/*as:Object*/ {
	return this.setCbs(nam, "post", fun);
};
LZR.Node.Router.prototype.post.lzrClass_ = LZR.Node.Router;

// 路由 put 匹配
LZR.Node.Router.prototype.put = function (nam/*as:string*/, fun/*as:Object*/)/*as:Object*/ {
	return this.setCbs(nam, "put", fun);
};
LZR.Node.Router.prototype.put.lzrClass_ = LZR.Node.Router;

// 路由 delete 匹配
LZR.Node.Router.prototype.delete = function (nam/*as:string*/, fun/*as:Object*/)/*as:Object*/ {
	return this.setCbs(nam, "delete", fun);
};
LZR.Node.Router.prototype.delete.lzrClass_ = LZR.Node.Router;
