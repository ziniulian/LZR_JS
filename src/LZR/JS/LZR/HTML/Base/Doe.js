/*************************************************
作者：子牛连
类名：Doe
说明：元素
创建日期：12-五月-2016 15:10:09
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base",
	"LZR.HTML.Base.Ctrl",
	"LZR.Base.Data",
	"LZR.HTML.Util.Evt",
	"LZR.Base.InfEvt",
	"LZR.Base.CallBacks",
	"LZR.Util",
	"LZR.HTML.Base.Doe.Css",
	"LZR.HTML.Base.Doe.DoePosition"
], "LZR.HTML.Base.Doe");
LZR.HTML.Base.Doe = function (obj) /*bases:LZR.Base.Data*/ /*interfaces:LZR.Base.InfEvt*/ {
	LZR.initSuper(this, obj);

	LZR.Base.InfEvt.call(this);

	// DOM元素
	this.doe = null;	/*as:Object*/

	// DOM元素的标记名称
	this.typ = "";	/*as:string*/

	// 控制器相关的回调函数集合
	this.ctrlCbs = null;	/*as:Object*/

	// 事件工具
	this.utEvt/*m*/ = LZR.getSingleton(LZR.HTML.Util.Evt);	/*as:LZR.HTML.Util.Evt*/

	// 数据
	this.dat/*m*/ = null;	/*as:LZR.Base.Data*/

	// 回调函数类
	this.clsCb/*m*/ = (LZR.Base.CallBacks);	/*as:fun*/

	// 通用工具
	this.utLzr/*m*/ = LZR.getSingleton(LZR.Util);	/*as:LZR.Util*/

	// 样式
	this.css/*m*/ = new LZR.HTML.Base.Doe.Css();	/*as:LZR.HTML.Base.Doe.Css*/

	// 元素在文档中的位置
	this.position/*m*/ = new LZR.HTML.Base.Doe.DoePosition();	/*as:LZR.HTML.Base.Doe.DoePosition*/

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
	if (obj.hd_typ) {
		this.hdCss(obj.hd_css, false);
		this.hdTyp (obj.hd_typ);
	} else if (obj.hd_doe) {
		this.hdDoe(obj.hd_doe);
	}

	// 调用父类的参数处理（子数据的递归创建）
	this.utLzr.supCall (this, 0, "hdObj_", obj);
};

// 处理标记
LZR.HTML.Base.Doe.prototype.hdTyp = function (hd_typ/*as:string*/, flushCss/*as:boolean*/) {
	this.typ = hd_typ;
	this.doe = document.createElement(hd_typ);
	if (flushCss !== false) {
		this.css.flush(this.doe);
	}
};

// 处理样式
LZR.HTML.Base.Doe.prototype.hdCss = function (hd_css/*as:string*/, flushCss/*as:boolean*/) {
	if (typeof(hd_css) === "string") {
		this.css = this.css.constructor.parse(hd_css);
		if (flushCss !== false) {
			this.css.flush(this.doe);
		}
	}
};

// 处理DOM元素
LZR.HTML.Base.Doe.prototype.hdDoe = function (hd_doe/*as:Object*/) {
	if (hd_doe.tagName) {
		this.doe = hd_doe;
		this.typ = hd_doe.tagName;
		this.css = this.css.constructor.parse(hd_doe);
		this.initSubsByDom ();
	}
};

// 用元素初始化时包含递归的子元素
LZR.HTML.Base.Doe.prototype.initSubsByDom = function () {
	var ns = this.doe.childNodes;
	for (var i = 0; i<ns.length; i++) {
		if (ns[i].tagName) {
			var d = new this.constructor ({
				id: (ns[i].id ? ns[i].id : "doe_" + this.count.toString()),
				hd_doe: ns[i]
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

// 替换CSS样式
LZR.HTML.Base.Doe.prototype.chgCss = function (name/*as:string*/)/*as:boolean*/ {
	for (var s in this.css.subs) {
		this.css.del (s);
	}
	return this.addCss(name);
};

// 设置DOM元素属性
LZR.HTML.Base.Doe.prototype.setAtt = function (key/*as:string*/, val/*as:string*/) {
	this.doe.setAttribute(key, val);
};

// 删除DOM元素属性
LZR.HTML.Base.Doe.prototype.delAtt = function (key/*as:string*/) {
	this.doe.removeAttribute(key);
};

// 设置DOM元素的Styley样式
LZR.HTML.Base.Doe.prototype.setStyle = function (key/*as:string*/, val/*as:string*/) {
	this.doe.style[this.calcStyleNam(key)] = val;
};

// 获取DOM元素的Styley样式
LZR.HTML.Base.Doe.prototype.getStyle = function (key/*as:string*/)/*as:string*/ {
	if ("\v" == "v") {
		//简单判断ie6~8
		key = this.calcStyleNam(key);
		if(key === "backgroundPosition"){
			//IE6~8不兼容backgroundPosition写法，识别backgroundPositionX/Y
			return this.doe.currentStyle.backgroundPositionX + " " + this.doe.currentStyle.backgroundPositionY;
		}
		return this.doe.currentStyle[key];
	}else{
		return document.defaultView.getComputedStyle(this.doe, null).getPropertyValue(this.calcStyleNam(key, true));
	}
};

// 处理样式名
LZR.HTML.Base.Doe.prototype.calcStyleNam = function (key/*as:int*/, lower/*as:boolean*/)/*as:string*/ {
	if (lower) {
		return key.replace(/[A-Z]/g, function(all, letter){
			// console.log ("all : " + all);
			// console.log ("leter : " + letter);
			return "-" + all.toLowerCase();
		});
	} else {
		return key.replace(/\-(\w)/g, function(all, letter){
			// console.log ("all : " + all);
			// console.log ("leter : " + letter);
			return letter.toUpperCase();
		});
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

// 计算位置
LZR.HTML.Base.Doe.prototype.calcPosition = function (doe/*as:Object*/)/*as:Object*/ {
	var d, box, b = false;
	var r = new this.position.constructor();
	if (!doe) {
		b = true;
		doe = this.doe;
	}

	if (doe === document) {
		r.left = 0;
		r.top = 0;
		r.width = window.innerWidth;
		r.height = window.innerHeight;
	} else {
		box = doe.getBoundingClientRect();
		r.width = box.right - box.left;
		r.height = box.bottom - box.top;
		if (window.pageXOffset !== undefined) {
			d = doe.ownerDocument.documentElement;
			r.left = box.left - d.clientLeft + window.pageXOffset;
			r.top = box.top - d.clientTop + window.pageYOffset;
		} else {
			// IE 浏览器
			d = doe.ownerDocument.body;
			r.left = box.left - d.clientLeft + (d.scrollLeft || doe.ownerDocument.documentElement.scrollLeft);
			r.top = box.top - d.clientTop + (d.scrollTop || doe.ownerDocument.documentElement.scrollTop);
		}
	}

	if (b) {
		this.position = r;
	}
	return r;
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
LZR.HTML.Base.Doe.prototype.hdClonePro = function (name/*as:string*/, rt/*as:Object*/, dep/*as:boolean*/)/*as:Object*/ {
	switch (name) {
		case "doe":
		case "evt":
		case "ctrl":
		case "ctrlCbs":
		case "clsCb":
		case "utEvt":
		case "utLzr":
			break;
		case "typ":
			rt.hd_typ = this[name];
			break;
		case "dat":	// 数据不克隆
			rt.dat = this[name];
			break;
		case "css":
			rt.hd_css = this.css.print();
			break;
		default:
			this.utLzr.supCall (this, 0, "hdClonePro", name, rt, dep);
			break;
	}
	return rt;
};

// ---- 克隆
LZR.HTML.Base.Doe.prototype.clone = function (dep/*as:boolean*/)/*as:Object*/ {
	var r = this.utLzr.supCall (this, 0, "clone", dep);

	// 追加控制器
	if (this.ctrl) {
		for (var s in this.ctrl) {
			this.ctrl[s].add(r);
		}
	}
	return r;
};
