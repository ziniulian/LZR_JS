/*************************************************
作者：子牛连
类名：Btn
说明：按钮
创建日期：17-三月-2016 16:22:16
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Util.Evt",
	"LZR.HTML.Base.Ctrl",
	"LZR.HTML.Base.Doe",
	"LZR.HTML.Base.Css",
	"LZR.Base.CallBacks",
	"LZR.Base.Data"
], "LZR.HTML.Base.Ctrl.Btn");
LZR.HTML.Base.Ctrl.Btn = function (obj) /*bases:LZR.HTML.Base.Ctrl*/ {
	LZR.initSuper(this);

	// 按钮按下时的样式
	this.css/*m*/ = new LZR.HTML.Base.Css();	/*as:LZR.HTML.Base.Css*/

	// 单击
	this.evt.click/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 长按
	this.evt.lclick/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 双击
	this.evt.dbclick/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 按下
	this.evt.down/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 抬起
	this.evt.up/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 数据
	this.dat/*m*/ = null;	/*as:LZR.Base.Data*/

	// 事件工具
	this.utEvt/*m*/ = LZR.getSingleton(LZR.HTML.Util.Evt);	/*as:LZR.HTML.Util.Evt*/

	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ctrl.Btn.prototype = LZR.clone (LZR.HTML.Base.Ctrl.prototype, LZR.HTML.Base.Ctrl.Btn.prototype);
LZR.HTML.Base.Ctrl.Btn.prototype.super_ = [LZR.HTML.Base.Ctrl];
LZR.HTML.Base.Ctrl.Btn.prototype.className_ = "LZR.HTML.Base.Ctrl.Btn";
LZR.HTML.Base.Ctrl.Btn.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ctrl.Btn");

// 构造器
LZR.HTML.Base.Ctrl.Btn.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}

	this.vcDoe.setEventObj (this);
	this.vcDoe.evt.change.add(this.onVcDoeChange, "BtnChange");

	this.css.id.set(this.className_ + "_down");
	var d = this.vcDoe.get();
	if (d) {
		this.addEvt (d);
	}
};

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.Btn.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};

// 添加按下样式
LZR.HTML.Base.Ctrl.Btn.prototype.addCss = function () {
	this.vcDoe.get().addCss(this.css);
};

// 删除按下样式
LZR.HTML.Base.Ctrl.Btn.prototype.delCss = function () {
	this.vcDoe.get().delCss(this.css);
};

// 给元素添加事件集
LZR.HTML.Base.Ctrl.Btn.prototype.addEvt = function (doe/*as:LZR.HTML.Base.Doe*/) {
	var c = doe.ctrl[this.className_];
	if (c) {
		if (c === this) {
			//
		} else {
			c.delEvt (doe);
		}
	}
	doe.ctrl[this.className_] = this;
};

// 移除元素的事件集
LZR.HTML.Base.Ctrl.Btn.prototype.delEvt = function (doe/*as:LZR.HTML.Base.Doe*/) {
	LZR.del (doe.ctrl, this.className_);
};

// 元素变动后触发的事件
LZR.HTML.Base.Ctrl.Btn.prototype.onVcDoeChange = function (val/*as:Object*/, self/*as:Object*/, old/*as:Object*/)/*as:boolean*/ {
	if (old) {
		this.delEvt (old);
	}
	if (val) {
		this.addEvt (val);
	}
};

// 按下时事件
LZR.HTML.Base.Ctrl.Btn.prototype.ondown = function () {
	
};

// 抬起时事件
LZR.HTML.Base.Ctrl.Btn.prototype.onup = function () {
	
};

// 移出时事件
LZR.HTML.Base.Ctrl.Btn.prototype.onout = function () {
	
};
