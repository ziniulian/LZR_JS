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
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.Scd.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};

// 处理按下事件
LZR.HTML.Base.Ctrl.Scd.prototype.hdDown = function (doeo/*as:LZR.HTML.Base.Doe*/, evt/*as:Object*/) {
	if (this.utEvt.getEvent(evt).button === 0) {	// 判断是左键被按下
		var b = doeo.dat.vcScd.get();
		doeo.dat.vcScd.set (!b);
	}
};

// 设置css样式
LZR.HTML.Base.Ctrl.Scd.prototype.setCss = function (ctrl/*as:Object*/, val/*as:boolean*/) {
	if (val) {
		// 此处 this 指向 doeo 元素
		this.addCss(ctrl.css);
	} else {
		this.delCss(ctrl.css);
	}
};

// 清理选择器在数据中额外添加的属性
LZR.HTML.Base.Ctrl.Scd.prototype.cleanDat = function (dat/*as:LZR.Base.Data*/) {
	var n = dat.vcScd.evt.set.count;
	n += dat.vcScd.evt.before.count;
	n += dat.vcScd.evt.change.count;
	if (n === 0) {
		LZR.del (dat, "vcScd");
	}
};

// ---- 添加一个Doe元素
LZR.HTML.Base.Ctrl.Scd.prototype.add = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	this.utLzr.supCall(this, 0, "add", doeo);

	// 给数据添加 是否被选中的属性 vcScd
	if (!doeo.dat) {
		doeo.dat = {};
	}
	if (!doeo.dat.vcScd) {
		doeo.dat.vcScd = new this.clsVc(false);
		doeo.dat.vcScd.setEventObj (doeo.dat);
	}

	// 给元素添加 回调函数
	if (!doeo.ctrlCbs) {
		doeo.ctrlCbs = {};	// 控制器相关的回调函数集合
	}
	var evtName = this.className_ + "_setCss";
	doeo.ctrlCbs[evtName] = doeo.dat.vcScd.evt.set.add( this.utLzr.bind(doeo, this.setCss, this) );
};

// ---- 删除一个Doe元素
LZR.HTML.Base.Ctrl.Scd.prototype.del = function (doeo/*as:LZR.HTML.Base.Doe*/)/*as:boolean*/ {
	if (this.utLzr.supCall(this, 0, "del", doeo)) {
		var evtName = this.className_ + "_setCss";
		doeo.dat.vcScd.evt.set.del(doeo.ctrlCbs[evtName]);
		LZR.del (doeo.ctrlCbs, evtName);
		this.cleanDat(doeo.dat);
		return true;
	} else {
		return false;
	}
};

// ---- 给元素添加事件集
LZR.HTML.Base.Ctrl.Scd.prototype.addEvt = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	doeo.addEvt ("mousedown", this.utLzr.bind(this, this.hdDown, doeo), this.className_);
};

// ---- 移除元素的事件集
LZR.HTML.Base.Ctrl.Scd.prototype.delEvt = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	doeo.delEvt ("mousedown", this.className_);
};
