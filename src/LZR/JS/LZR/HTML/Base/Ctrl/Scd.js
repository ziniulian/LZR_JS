/*************************************************
作者：子牛连
类名：Scd
说明：选择器
创建日期：21-三月-2016 11:24:04
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base.Ctrl",
	"LZR.HTML.Base.Css",
	"LZR.HTML.Base.Doe",
	"LZR.Base.Val.Ctrl"
], "LZR.HTML.Base.Ctrl.Scd");
LZR.HTML.Base.Ctrl.Scd = function (obj) /*bases:LZR.HTML.Base.Ctrl*/ {
	LZR.initSuper(this, obj);

	// 按下自身回调
	this.down = null;	/*as:Object*/

	// 被选中时的样式
	this.css = "";	/*as:string*/

	// 值控制器类
	this.clsVc/*m*/ = (LZR.Base.Val.Ctrl);	/*as:fun*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ctrl.Scd.prototype = LZR.clone (LZR.HTML.Base.Ctrl.prototype, LZR.HTML.Base.Ctrl.Scd.prototype);
LZR.HTML.Base.Ctrl.Scd.prototype.super_ = [LZR.HTML.Base.Ctrl];
LZR.HTML.Base.Ctrl.Scd.prototype.className_ = "LZR.HTML.Base.Ctrl.Scd";
LZR.HTML.Base.Ctrl.Scd.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ctrl.Scd");

// 构造器
LZR.HTML.Base.Ctrl.Scd.prototype.init_ = function (obj/*as:Object*/) {
	this.down = this.utLzr.bind(this, this.hdDown);

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.Scd.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};

// 处理按下事件
LZR.HTML.Base.Ctrl.Scd.prototype.hdDown = function (evt/*as:Object*/) {
	if (this.utEvt.getEvent(evt).button === 0) {	// 判断是左键被按下
		var doeo = this.getDoeo(evt);
		var b = doeo.dat.vcScd.get();
		doeo.dat.vcScd.set (!b);
	}
};

// 设置css样式
LZR.HTML.Base.Ctrl.Scd.prototype.setCss = function (val/*as:boolean*/, self/*as:Object*/) {
	if (val) {
		// 此处 this 指向 doeo 元素，self 中也特别加入了选择器的引用 “scdCtrl”
		this.addCss(self.scdCtrl.css);
	} else {
		this.delCss(self.scdCtrl.css);
	}
};

// ---- 添加一个Doe元素
LZR.HTML.Base.Ctrl.Scd.prototype.add = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	this.utLzr.supCall(this, 0, "add", doeo);
	if (!doeo.dat) {
		doeo.dat = {};
	}
	doeo.dat.vcScd = new this.clsVc(false);
	doeo.dat.vcScd.scdCtrl = this;		// 在值控制器中引用选择器
	doeo.dat.vcScd.setEventObj (doeo);
	doeo.dat.vcScd.evt.set.add(this.setCss, "Scd_setCss");
};

// ---- 删除一个Doe元素
LZR.HTML.Base.Ctrl.Scd.prototype.del = function (doeo/*as:LZR.HTML.Base.Doe*/)/*as:boolean*/ {
	if (this.utLzr.supCall(this, 0, "del", doeo)) {
		LZR.del (doeo.dat, "vcScd");
		return true;
	} else {
		return false;
	}
};

// ---- 给元素添加事件集
LZR.HTML.Base.Ctrl.Scd.prototype.addEvt = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	doeo.addEvt ("mousedown", this.down, this.className_);
};

// ---- 移除元素的事件集
LZR.HTML.Base.Ctrl.Scd.prototype.delEvt = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	doeo.delEvt ("mousedown", this.className_);
};
