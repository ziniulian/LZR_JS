/*************************************************
作者：子牛连
类名：Doe
说明：元素
创建日期：17-三月-2016 15:37:55
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base",
	"LZR.HTML.Base.Ctrl",
	"LZR.Base.Data",
	"LZR.HTML.Base.Css",
	"LZR.Base.CallBacks",
	"LZR.HTML.Util.Evt",
	"LZR.Base.InfEvt",
	"LZR.Util"
], "LZR.HTML.Base.Doe");
LZR.HTML.Base.Doe = function (obj) /*bases:LZR.Base.Data*/ /*interfaces:LZR.Base.InfEvt*/ {
	LZR.initSuper(this, obj);

	LZR.Base.InfEvt.call(this);

	// DOM元素
	this.doe = null;	/*as:Object*/

	// DOM元素的标记名称
	this.typ = "";	/*as:string*/

	// 数据
	this.dat/*m*/ = null;	/*as:LZR.Base.Data*/

	// 样式
	this.css/*m*/ = new LZR.HTML.Base.Css();	/*as:LZR.HTML.Base.Css*/

	// 回调函数类
	this.clsCb/*m*/ = (LZR.Base.CallBacks);	/*as:fun*/

	// 样式工具
	this.utCss/*m*/ = (LZR.HTML.Base.Css);	/*as:fun*/

	// 事件工具
	this.utEvt/*m*/ = LZR.getSingleton(LZR.HTML.Util.Evt);	/*as:LZR.HTML.Util.Evt*/

	// 通用工具
	this.utLzr/*m*/ = LZR.getSingleton(LZR.Util);	/*as:LZR.Util*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Doe.prototype = LZR.clone (LZR.Base.InfEvt.prototype, LZR.HTML.Base.Doe.prototype);
LZR.HTML.Base.Doe.prototype = LZR.clone (LZR.Base.Data.prototype, LZR.HTML.Base.Doe.prototype);
LZR.HTML.Base.Doe.prototype.super_ = [LZR.Base.Data];
LZR.HTML.Base.Doe.prototype.className_ = "LZR.HTML.Base.Doe";
LZR.HTML.Base.Doe.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Doe");

// 构造器
LZR.HTML.Base.Doe.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.HTML.Base.Doe.prototype.hdObj_ = function (obj/*as:Object*/) {
	if (obj.typ) {
		this.doe = document.createElement(obj.typ);
		if (obj.css && (typeof(obj.css) === "string")) {
			this.css = this.utCss.parse(obj.css);
		}
		this.css.flush(this.doe);
	} else if (obj.doe) {
		if (this.doe.tagName) {
			this.typ = this.doe.tagName;
			this.css = this.utCss.parse(this.doe);
			this.initSubsByDom ();
		}
	}

	// 调用父类的参数处理（子数据的递归创建）
	this.utLzr.supCall (this, 0, "hdObj_", obj);
};

// 用元素初始化时包含递归的子元素
LZR.HTML.Base.Doe.prototype.initSubsByDom = function () {
	var ns = this.doe.childNodes;
	for (var i = 0; i<ns.length; i++) {
		if (ns[i].tagName) {
			var d = new this.constructor ({
				id: (ns[i].id ? ns[i].id : this.count.toString()),
				doe: ns[i]
			});
			this.utLzr.supCall (this, 0, "add", d);	// 不能用 this.add (d); 方法
		}
	}
};

// 添加CSS样式
LZR.HTML.Base.Doe.prototype.addCss = function (name/*as:string*/)/*as:boolean*/ {
	if (this.css.add(name)) {
		this.css.flush(this.doe);
		return true;
	} else {
		return false;
	}
};

// 删除CSS样式
LZR.HTML.Base.Doe.prototype.delCss = function (name/*as:string*/)/*as:boolean*/ {
	if (this.css.del(name)) {
		this.css.flush(this.doe);
		return true;
	} else {
		return false;
	}
};

// 添加控制器
LZR.HTML.Base.Doe.prototype.addCtrl = function (ctl/*as:LZR.HTML.Base.Ctrl*/) {
	ctl.add(this);
};

// 删除控制器
LZR.HTML.Base.Doe.prototype.delCtrl = function (ctl/*as:LZR.HTML.Base.Ctrl*/)/*as:boolean*/ {
	return ctl.del(this);
};

// 添加事件
LZR.HTML.Base.Doe.prototype.addEvt = function (name/*as:string*/, fun/*as:fun*/, funam/*as:string*/) {
	var e = this.evt[name];
	if (!e) {
		// 创建事件
		e = new this.clsCb({
			obj: this
		});
		this.evt[name] = e;
		switch (name) {
			case "wheel":
				this.utEvt.addWheel (this.doe, e.exe, false);
				break;
			case "resize":
				this.utEvt.addEvt (window, name, e.exe, false);
				break;
			default:
				this.utEvt.addEvt (this.doe, name, e.exe, false);
				break;
		}
	}
	e.add(fun, funam);
};

// 删除事件
LZR.HTML.Base.Doe.prototype.delEvt = function (name/*as:string*/, funam/*as:string*/) {
	var e = this.evt[name];
	if (e) {
		if (funam) {
			e.del(funam);
			if (e.count) {
				return;
			}
		}

		switch (name) {
			case "wheel":
				this.utEvt.delWheel (this.doe, e.exe, false);
				break;
			case "resize":
				this.utEvt.delEvt (window, name, e.exe, false);
				break;
			default:
				this.utEvt.delEvt (this.doe, name, e.exe, false);
				break;
		}
		LZR.del(this.evt, name);
	}
};

// 放入一个DOM元素中
LZR.HTML.Base.Doe.prototype.place = function (doe/*as:Object*/) {
	this.parent.set(null);
	doe.appendChild(this.doe);
};

// 从DOM中移出
LZR.HTML.Base.Doe.prototype.remove = function () {
	this.parent.set(null);
	var p = this.doe.parentNode;
	if (p) {
		p.removeChild(this.doe);
	}
};

// ---- 添加
LZR.HTML.Base.Doe.prototype.add = function (sub/*as:LZR.Base.Data*/, id/*as:string*/)/*as:boolean*/ {
	if (this.utLzr.supCall (this, 0, "add", sub, id)) {
		this.doe.appendChild(sub.doe);
		return true;
	} else {
		return false;
	}
};

// ---- 删除
LZR.HTML.Base.Doe.prototype.del = function (id/*as:string*/)/*as:Object*/ {
	var r = this.utLzr.supCall (this, 0, "del", id);
	if (r) {
		this.doe.removeChild(r.doe);
	}
	return r;
};

// ---- 处理克隆参数
LZR.HTML.Base.Doe.prototype.hdClonePro = function (name/*as:string*/, dep/*as:boolean*/)/*as:Object*/ {
	var r;
	switch (name) {
		case "doe":
		// 事件、控制器 暂不知如何克隆
		case "evt":
		case "ctrl":
			r = undefined;
			break;
		case "typ":
		case "dat":	// 数据不克隆
		case "utCss":
			r = this[name];
			break;
		default:
			r = this.utLzr.supCall (this, 0, "hdClonePro", name, dep);
			break;
	}
	return r;
};
