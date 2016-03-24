/*************************************************
作者：子牛连
类名：SglScd
说明：单选器
创建日期：22-三月-2016 13:56:29
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base.Ctrl",
	"LZR.HTML.Base.Doe",
	"LZR.HTML.Base.Ctrl.Scd"
], "LZR.HTML.Base.Ctrl.SglScd");
LZR.HTML.Base.Ctrl.SglScd = function (obj) /*bases:LZR.HTML.Base.Ctrl.Scd*/ {
	LZR.initSuper(this, obj);

	// 当前被选中的单选器
	this.cur = null;	/*as:Object*/

	// 至少有一个选项被选中
	this.only = true;	/*as:boolean*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ctrl.SglScd.prototype = LZR.clone (LZR.HTML.Base.Ctrl.Scd.prototype, LZR.HTML.Base.Ctrl.SglScd.prototype);
LZR.HTML.Base.Ctrl.SglScd.prototype.super_ = [LZR.HTML.Base.Ctrl.Scd];
LZR.HTML.Base.Ctrl.SglScd.prototype.className_ = "LZR.HTML.Base.Ctrl.SglScd";
LZR.HTML.Base.Ctrl.SglScd.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ctrl.SglScd");

// 构造器
LZR.HTML.Base.Ctrl.SglScd.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.SglScd.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};

// 选择前处理
LZR.HTML.Base.Ctrl.SglScd.prototype.hdBefore = function (ctrl/*as:Object*/, val/*as:boolean*/)/*as:boolean*/ {
// console.log (this.doe);
// console.log (ctrl.cur);
	if (ctrl.cur) {
// alert(0);
		// 此处 this 指向 doeo 元素
		if (ctrl.cur === this) {
// alert(4);
			// 当，当前被选中的选项 与 正在选择的选项一致，时：
			if (!val && !ctrl.only) {
// alert(5);
				// 当，预设值为 false，且 不需要 至少有一个选项被选中，时：则可进行设值处理。
				ctrl.cur = null;
				return true;
			} else {
// alert(6);
				// 否则，不做设置处理
				return false;
			}
		} else {
// alert(7);
			// 当，当前被选中的选项 与 正在选择的选项 不一致，时：
			if (val) {
// alert(8);
				// 当，预设值为 true 时：
				var old = ctrl.cur;
				ctrl.cur = this;
				old.dat.vcScd.set(false);
				return true;
			} else {
// alert(9);
				// 否则，也可进行设值处理。
				return true;
			}
		}
	} else {
// alert(1);
		// 当，没有任何被选中选项，时：
		if (val) {
// alert(2);
			// 当，预设值为 true 时，可进行设值处理。
			ctrl.cur = this;
			return true;
		} else {
// alert(3);
			// 否则，也可进行设值处理。
			return true;
		}
	}
	return false;
};

// ---- 添加一个Doe元素
LZR.HTML.Base.Ctrl.SglScd.prototype.add = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	this.utLzr.supCall(this, 0, "add", doeo);
	var evtName = this.className_ + "_hdBefore";

	// 与 Scd 的设置Css样式不同，无论关联多少个元素，只能触发一次
	if (!doeo.dat.vcScd.evt.before.funs[evtName]) {
		doeo.dat.vcScd.evt.before.add( this.utLzr.bind(doeo, this.hdBefore, this), evtName );
	}
};

// ---- 删除一个Doe元素
LZR.HTML.Base.Ctrl.SglScd.prototype.del = function (doeo/*as:LZR.HTML.Base.Doe*/)/*as:boolean*/ {
	if (this.utLzr.supCall(this, 0, "del", doeo)) {
		var evtName = this.className_ + "_hdBefore";
		doeo.dat.vcScd.evt.before.del(evtName);
		LZR.del (doeo.ctrlCbs, evtName);
		this.cleanDat(doeo.dat);
		return true;
	} else {
		return false;
	}
};
