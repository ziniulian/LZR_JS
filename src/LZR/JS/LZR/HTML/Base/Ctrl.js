/*************************************************
作者：子牛连
类名：Ctrl
说明：控制器
创建日期：18-三月-2016 9:09:10
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Util",
	"LZR.HTML.Base",
	"LZR.HTML.Base.Doe",
	"LZR.Base.InfEvt",
	"LZR.Base.Ary",
	"LZR.Base.Data",
	"LZR.HTML.Util.Evt"
], "LZR.HTML.Base.Ctrl");
LZR.HTML.Base.Ctrl = function (obj) /*interfaces:LZR.Base.InfEvt*/ {
	LZR.Base.InfEvt.call(this);

	// 数据
	this.dat/*m*/ = null;	/*as:LZR.Base.Data*/

	// 元素集合
	this.subs/*m*/ = [];	/*as:LZR.HTML.Base.Doe*/

	// 数组工具
	this.utAry/*m*/ = LZR.getSingleton(LZR.Base.Ary);	/*as:LZR.Base.Ary*/

	// 事件工具
	this.utEvt/*m*/ = LZR.getSingleton(LZR.HTML.Util.Evt);	/*as:LZR.HTML.Util.Evt*/

	// 通用工具
	this.utLzr/*m*/ = LZR.getSingleton(LZR.Util);	/*as:LZR.Util*/

	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
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
LZR.HTML.Base.Ctrl.prototype.add = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	var dc = doeo.ctrl[this.className_];
	if (dc) {
		dc.del(doeo);
	}
	doeo.ctrl[this.className_] = this;
	this.subs.push(doeo);
	this.addEvt(doeo);
};

// 删除一个Doe元素
LZR.HTML.Base.Ctrl.prototype.del = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	this.delEvt(doeo);
	LZR.del (doeo.ctrl, this.className_);
	this.utAry.delByVal(this.subs, doeo);
};

// 获取触发事件的元素
LZR.HTML.Base.Ctrl.prototype.getDoeo = function (evt/*as:Object*/)/*as:LZR.HTML.Base.Doe*/ {
	var doe = this.utEvt.getEventTarg (evt);
	for (var i=0; i<this.subs.length; i++) {
		if (this.subs[i].doe === doe) {
			return this.subs[i];
		}
	}
	return undefined;
};
