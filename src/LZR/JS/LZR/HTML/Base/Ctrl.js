/*************************************************
作者：子牛连
类名：Ctrl
说明：Doe控制器
创建日期：26-三月-2016 18:43:03
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base",
	"LZR.HTML.Base.Doe",
	"LZR.Base.InfEvt",
	"LZR.Base.Ary",
	"LZR.Base.Str",
	"LZR.Util",
	"LZR.HTML.Util.Evt"
], "LZR.HTML.Base.Ctrl");
LZR.HTML.Base.Ctrl = function (obj) /*interfaces:LZR.Base.InfEvt*/ {
	LZR.Base.InfEvt.call(this);

	// 数组工具
	this.utAry/*m*/ = LZR.getSingleton(LZR.Base.Ary);	/*as:LZR.Base.Ary*/

	// 事件工具
	this.utEvt/*m*/ = LZR.getSingleton(LZR.HTML.Util.Evt);	/*as:LZR.HTML.Util.Evt*/

	// 元素类
	this.clsDoe/*m*/ = (LZR.HTML.Base.Doe);	/*as:fun*/

	// 元素集合
	this.subs/*m*/ = [];	/*as:LZR.HTML.Base.Doe*/

	// 字串工具
	this.utStr/*m*/ = LZR.getSingleton(LZR.Base.Str);	/*as:LZR.Base.Str*/

	// 通用工具
	this.utLzr/*m*/ = LZR.getSingleton(LZR.Util);	/*as:LZR.Util*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ctrl.prototype = LZR.clone (LZR.Base.InfEvt.prototype, LZR.HTML.Base.Ctrl.prototype);
LZR.HTML.Base.Ctrl.prototype.className_ = "LZR.HTML.Base.Ctrl";
LZR.HTML.Base.Ctrl.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ctrl");

// 构造器
LZR.HTML.Base.Ctrl.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};

// 添加一个Doe元素
LZR.HTML.Base.Ctrl.prototype.add = function (doeo/*as:LZR.HTML.Base.Doe*/, pro/*as:Object*/, obj/*as:Object*/) {
	if (!doeo.ctrl) {
		doeo.ctrl = {};
	}
	var dc = doeo.ctrl[this.className_];
	if (dc) {
		dc.del(doeo);
	}
	doeo.ctrl[this.className_] = this;
	this.subs.push(doeo);
	this.addEvt(doeo, pro, obj);
};

// 删除一个Doe元素
LZR.HTML.Base.Ctrl.prototype.del = function (doeo/*as:LZR.HTML.Base.Doe*/)/*as:boolean*/ {
	if (doeo.ctrl && doeo.ctrl[this.className_] === this) {
		this.delEvt(doeo);
		LZR.del (doeo.ctrl, this.className_);
		this.utAry.delByVal(this.subs, doeo);
		return true;
	}
	return false;
};

// 前缀检查
LZR.HTML.Base.Ctrl.prototype.checkPrefix = function (nam/*as:string*/)/*as:string*/ {
	if (!this.utStr.startWith (nam, "hct_")) {
		nam = "hct_" + nam;
	}
	return nam;
};

// 在元素内创建子元素
LZR.HTML.Base.Ctrl.prototype.crtDoe = function (doeo/*as:LZR.HTML.Base.Doe*/, id/*as:string*/, typ/*as:string*/, css/*as:string*/)/*as:LZR.HTML.Base.Doe*/ {
	id = this.checkPrefix(id);
	if (css === undefined) {
		css = "Lc_" + id;
	}

	var d = doeo.getById(id);
	if (!d) {
		d = new this.clsDoe ({
			id: id,
			hd_typ: typ,
			hd_css: css
		});
		doeo.add(d);
	}
	return d;
};

// 在元素内创建数据
LZR.HTML.Base.Ctrl.prototype.crtDat = function (doeo/*as:LZR.HTML.Base.Doe*/, key/*as:string*/, obj/*as:Object*/)/*as:Object*/ {
	key = this.checkPrefix(key);

	// var cls = this.clsNum;
	if (!doeo.dat) {
		doeo.dat = {};
	}
	if (!doeo.dat[key]) {
		doeo.dat[key] = obj;
	}
	return doeo.dat[key];
};

// 删除元素内数据
LZR.HTML.Base.Ctrl.prototype.delDat = function (doeo/*as:LZR.HTML.Base.Doe*/, key/*as:string*/)/*as:boolean*/ {
	key = this.checkPrefix(key);

	var s;
	var n = 0;
	var e = doeo.dat[key];
	if (e && e.evt) {
		e = e.evt;
		for (s in e) {
			n += e[s].count;
		}
	}
	if (n === 0) {
		LZR.del (doeo.dat, key);
		return true;
	} else {
		return false;
	}
};

// 为元素的数据创建回调
LZR.HTML.Base.Ctrl.prototype.crtCb2Dat = function (doeo/*as:LZR.HTML.Base.Doe*/, evt/*as:Object*/, cbNam/*as:string*/, f/*as:fun*/) {
	var enam = this.className_ + "_" + cbNam;
	if (!doeo.ctrlCbs) {
		doeo.ctrlCbs = {};	// 控制器相关的回调函数集合
	}
	doeo.ctrlCbs[enam] =  enam + "_" + evt.id;
	if (f) {
		evt.add( f, doeo.ctrlCbs[enam] );
	} else {
		evt.add( this.utLzr.bind(this, this[cbNam], doeo), doeo.ctrlCbs[enam] );
	}
};

// 删除元素数据的相关回调
LZR.HTML.Base.Ctrl.prototype.delCb2Dat = function (doeo/*as:LZR.HTML.Base.Doe*/, evt/*as:Object*/, cbNam/*as:string*/) {
	var enam = this.className_ + "_" + cbNam;
	evt.del(doeo.ctrlCbs[enam]);
	LZR.del (doeo.ctrlCbs, enam);
};
