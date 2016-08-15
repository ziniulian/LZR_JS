/*************************************************
作者：子牛连
类名：Doe
说明：元素
创建日期：27-七月-2016 12:30:02
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base",
	"LZR.Base.Data",
	"LZR.HTML.Base.Ctrl",
	"LZR.HTML.Util.Evt",
	"LZR.Base.InfEvt",
	"LZR.Base.CallBacks",
	"LZR.Util",
	"LZR.HTML.Base.Doe.Css",
	"LZR.HTML.Util.DomPosition",
	"LZR.HTML.Util.DomTool"
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
	this.position/*m*/ = new LZR.HTML.Util.DomPosition();	/*as:LZR.HTML.Util.DomPosition*/

	// 元素工具
	this.utDt/*m*/ = LZR.getSingleton(LZR.HTML.Util.DomTool);	/*as:LZR.HTML.Util.DomTool*/

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

// 适配参数
LZR.HTML.Base.Doe.prototype.adaptation = "";	/*as:string*/

// 构造器
LZR.HTML.Base.Doe.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.HTML.Base.Doe.prototype.init_.lzrClass_ = LZR.HTML.Base.Doe;

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
LZR.HTML.Base.Doe.prototype.hdObj_.lzrClass_ = LZR.HTML.Base.Doe;

// 处理标记
LZR.HTML.Base.Doe.prototype.hdTyp = function (hd_typ/*as:string*/, flushCss/*as:boolean*/) {
	this.typ = hd_typ;
	this.doe = document.createElement(hd_typ);
	if (flushCss !== false) {
		this.css.flush(this.doe);
	}
};
LZR.HTML.Base.Doe.prototype.hdTyp.lzrClass_ = LZR.HTML.Base.Doe;

// 处理样式
LZR.HTML.Base.Doe.prototype.hdCss = function (hd_css/*as:string*/, flushCss/*as:boolean*/) {
	if (typeof(hd_css) === "string") {
		this.css = this.css.constructor.parse(hd_css);
		if (flushCss !== false) {
			this.css.flush(this.doe);
		}
	}
};
LZR.HTML.Base.Doe.prototype.hdCss.lzrClass_ = LZR.HTML.Base.Doe;

// 处理DOM元素
LZR.HTML.Base.Doe.prototype.hdDoe = function (hd_doe/*as:Object*/) {
	if (hd_doe.tagName) {
		this.doe = hd_doe;
		this.typ = hd_doe.tagName;
		this.css = this.css.constructor.parse(hd_doe);
		this.initSubsByDom ();
	}
};
LZR.HTML.Base.Doe.prototype.hdDoe.lzrClass_ = LZR.HTML.Base.Doe;

// 用元素初始化时包含递归的子元素
LZR.HTML.Base.Doe.prototype.initSubsByDom = function () {
	var i, d, idd;
	var ns = this.doe.childNodes;
	for (i = 0; i<ns.length; i++) {
		if (ns[i].tagName) {
			idd = ns[i].getAttribute("idLzr");
			if (!idd) {
				idd = ns[i].id ? ns[i].id : ("doe_" + this.count.toString());
			}
			d = new this.constructor ({
				id: idd,
				hd_doe: ns[i]
			});
			this.utLzr.supCall (this, 0, "add", d);	// 不能用 this.add (d); 方法
		}
	}
};
LZR.HTML.Base.Doe.prototype.initSubsByDom.lzrClass_ = LZR.HTML.Base.Doe;

// 添加CSS样式
LZR.HTML.Base.Doe.prototype.addCss = function (name/*as:string*/)/*as:boolean*/ {
	if (this.css.add(name)) {
		this.css.flush(this.doe);
		return true;
	} else {
		return false;
	}
};
LZR.HTML.Base.Doe.prototype.addCss.lzrClass_ = LZR.HTML.Base.Doe;

// 删除CSS样式
LZR.HTML.Base.Doe.prototype.delCss = function (name/*as:string*/)/*as:boolean*/ {
	if (this.css.del(name)) {
		this.css.flush(this.doe);
		return true;
	} else {
		return false;
	}
};
LZR.HTML.Base.Doe.prototype.delCss.lzrClass_ = LZR.HTML.Base.Doe;

// 替换CSS样式
LZR.HTML.Base.Doe.prototype.chgCss = function (name/*as:string*/)/*as:boolean*/ {
	this.css.delAll();
	if (name) {
		return this.addCss(name);
	} else {
		this.css.flush(this.doe);
		return true;
	}
};
LZR.HTML.Base.Doe.prototype.chgCss.lzrClass_ = LZR.HTML.Base.Doe;

// 添加控制器
LZR.HTML.Base.Doe.prototype.addCtrl = function (ctl/*as:LZR.HTML.Base.Ctrl*/) {
	ctl.add(this);
};
LZR.HTML.Base.Doe.prototype.addCtrl.lzrClass_ = LZR.HTML.Base.Doe;

// 删除控制器
LZR.HTML.Base.Doe.prototype.delCtrl = function (ctl/*as:LZR.HTML.Base.Ctrl*/)/*as:boolean*/ {
	return ctl.del(this);
};
LZR.HTML.Base.Doe.prototype.delCtrl.lzrClass_ = LZR.HTML.Base.Doe;

// 创建事件
LZR.HTML.Base.Doe.prototype.crtEvt = function (name/*as:string*/)/*as:Object*/ {
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
	return e;
};
LZR.HTML.Base.Doe.prototype.crtEvt.lzrClass_ = LZR.HTML.Base.Doe;

// 添加事件
LZR.HTML.Base.Doe.prototype.addEvt = function (name/*as:string*/, fun/*as:fun*/, funam/*as:string*/) {
	this.crtEvt(name).add(fun, funam);
};
LZR.HTML.Base.Doe.prototype.addEvt.lzrClass_ = LZR.HTML.Base.Doe;

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
LZR.HTML.Base.Doe.prototype.delEvt.lzrClass_ = LZR.HTML.Base.Doe;

// 触发事件
LZR.HTML.Base.Doe.prototype.trigger = function (evtNam/*as:string*/) {
	this.utEvt.trigger(this.doe, evtNam);
};
LZR.HTML.Base.Doe.prototype.trigger.lzrClass_ = LZR.HTML.Base.Doe;

// 放入一个DOM元素中
LZR.HTML.Base.Doe.prototype.place = function (doe/*as:Object*/) {
	this.parent.set(null);
	doe.appendChild(this.doe);
};
LZR.HTML.Base.Doe.prototype.place.lzrClass_ = LZR.HTML.Base.Doe;

// 从DOM中移出
LZR.HTML.Base.Doe.prototype.remove = function () {
	this.parent.set(null);
	var p = this.doe.parentNode;
	if (p) {
		p.removeChild(this.doe);
	}
};
LZR.HTML.Base.Doe.prototype.remove.lzrClass_ = LZR.HTML.Base.Doe;

// 设置DOM元素属性
LZR.HTML.Base.Doe.prototype.setAtt = function (key/*as:string*/, val/*as:string*/) {
	this.utDt.setAtt(key, val, this.doe);
};
LZR.HTML.Base.Doe.prototype.setAtt.lzrClass_ = LZR.HTML.Base.Doe;

// 获取DOM元素属性
LZR.HTML.Base.Doe.prototype.getAtt = function (key/*as:string*/)/*as:string*/ {
	return this.utDt.getAtt(key, this.doe);
};
LZR.HTML.Base.Doe.prototype.getAtt.lzrClass_ = LZR.HTML.Base.Doe;

// 删除DOM元素属性
LZR.HTML.Base.Doe.prototype.delAtt = function (key/*as:string*/) {
	this.utDt.delAtt(key, this.doe);
};
LZR.HTML.Base.Doe.prototype.delAtt.lzrClass_ = LZR.HTML.Base.Doe;

// 设置DOM元素的Styley样式
LZR.HTML.Base.Doe.prototype.setStyle = function (key/*as:string*/, val/*as:string*/) {
	if (typeof (val) === "number") {
		val = val + "px";
	}
	this.utDt.setStyle(key, val, this.doe);
};
LZR.HTML.Base.Doe.prototype.setStyle.lzrClass_ = LZR.HTML.Base.Doe;

// 获取DOM元素的Styley样式
LZR.HTML.Base.Doe.prototype.getStyle = function (key/*as:string*/)/*as:string*/ {
	return this.utDt.getStyle(key, this.doe);
};
LZR.HTML.Base.Doe.prototype.getStyle.lzrClass_ = LZR.HTML.Base.Doe;

// 计算位置
LZR.HTML.Base.Doe.prototype.calcPosition = function () {
	this.position = this.utDt.calcPosition(this.doe);
};
LZR.HTML.Base.Doe.prototype.calcPosition.lzrClass_ = LZR.HTML.Base.Doe;

// 在父元素中滚动条定位
LZR.HTML.Base.Doe.prototype.matchParent = function (vertical/*as:string*/, horizontal/*as:string*/, padding/*as:int*/) {
	this.utDt.matchParent(vertical, horizontal, padding, this.doe);
};
LZR.HTML.Base.Doe.prototype.matchParent.lzrClass_ = LZR.HTML.Base.Doe;

// 获取文档
LZR.HTML.Base.Doe.prototype.getDocument = function ()/*as:Object*/ {
	return this.utDt.getDocument(this.doe);
};
LZR.HTML.Base.Doe.prototype.getDocument.lzrClass_ = LZR.HTML.Base.Doe;

// ---- 添加
LZR.HTML.Base.Doe.prototype.add = function (sub/*as:LZR.Base.Data*/, id/*as:string*/)/*as:boolean*/ {
	if (this.utLzr.supCall (this, 0, "add", sub, id)) {
		this.doe.appendChild(sub.doe);
		return true;
	} else {
		return false;
	}
};
LZR.HTML.Base.Doe.prototype.add.lzrClass_ = LZR.HTML.Base.Doe;

// ---- 删除
LZR.HTML.Base.Doe.prototype.del = function (id/*as:string*/)/*as:Object*/ {
	var r = this.utLzr.supCall (this, 0, "del", id);
	if (r) {
		this.doe.removeChild(r.doe);
	}
	return r;
};
LZR.HTML.Base.Doe.prototype.del.lzrClass_ = LZR.HTML.Base.Doe;

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
LZR.HTML.Base.Doe.prototype.hdClonePro.lzrClass_ = LZR.HTML.Base.Doe;

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
LZR.HTML.Base.Doe.prototype.clone.lzrClass_ = LZR.HTML.Base.Doe;
