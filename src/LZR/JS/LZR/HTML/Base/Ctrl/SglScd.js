/*************************************************
作者：子牛连
类名：SglScd
说明：单选器
创建日期：22-三月-2016 13:56:29
版本号：1.1
*************************************************/

LZR.load([
	"LZR.HTML.Base.Ctrl",
	"LZR.HTML.Base.Doe",
	"LZR.HTML.Base.Ctrl.Scd"
], "LZR.HTML.Base.Ctrl.SglScd");
LZR.HTML.Base.Ctrl.SglScd = function (obj) /*bases:LZR.HTML.Base.Ctrl.Scd*/ {
	LZR.initSuper(this, obj);

	// 至少有一个选项被选中
	this.only = true;	/*as:boolean*/

	// 当前被选中的元素
	this.vcCur/*m*/ = new LZR.Base.Val.Ctrl();	/*as:LZR.Base.Val.Ctrl*/

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
LZR.HTML.Base.Ctrl.SglScd.prototype.hdBefore = function (doeo/*as:LZR.HTML.Base.Doe*/, val/*as:boolean*/)/*as:boolean*/ {
// console.log (doeo.doe);
// console.log (this.vcCur.get());
	if (this.vcCur.get()) {
// alert(0);
		if (this.vcCur.get() === doeo) {
// alert(4);
			// 当，当前被选中的选项 与 正在选择的选项一致，时：
			if (!val && !this.only) {
// alert(5);
				// 当，预设值为 false，且 不需要 至少有一个选项被选中，时：则可进行设值处理。
				this.vcCur.set(null);
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
				var old = this.vcCur.get();
				this.vcCur.set(doeo);
				old.dat.hct_scd.set(false);
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
			this.vcCur.set(doeo);
			return true;
		} else {
// alert(3);
			// 否则，也可进行设值处理。
			return true;
		}
	}
};

// ---- 给元素添加事件集
LZR.HTML.Base.Ctrl.SglScd.prototype.addEvt = function (doeo/*as:LZR.HTML.Base.Doe*/, pro/*as:Object*/, obj/*as:Object*/) {
	this.utLzr.supCall(this, 0, "addEvt", doeo);

	// 添加事件
	this.crtCb2Dat(doeo, doeo.dat.hct_scd.evt.before, "hdBefore");

	// 与 Scd 的设置Css样式不同，无论关联多少个元素，只能触发一次
	var evtName = this.className_ + "_hdBefore_";
	var cbs = doeo.dat.hct_scd.evt.before.funs;
	var b = true;
	for (var s in cbs) {
		if (this.utStr.startWith(s, evtName)) {
			if (cbs[s].enableEvent && cbs[s].autoEvent) {
				if (b) {
					b = false;
				} else {
// console.log (s);
					cbs[s].enableEvent = false;
					cbs[s].autoEvent = false;
				}
			}
		}
	}
};

// ---- 移除元素的事件集
LZR.HTML.Base.Ctrl.SglScd.prototype.delEvt = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	var cb = this.delCb2Dat(doeo, doeo.dat.hct_scd.evt.before, "hdBefore");

	// 只能触发一次的事件被关闭时，须寻找有无其它可开启的事件。
	if (cb.enableEvent && cb.autoEvent) {
		var evtName = this.className_ + "_hdBefore_";
		var cbs = doeo.dat.hct_scd.evt.before.funs;
		for (var s in cbs) {
			if (this.utStr.startWith(s, evtName)) {
// console.log (s);
				cbs[s].enableEvent = true;
				cbs[s].autoEvent = true;
				if (this.vcCur.get() === doeo) {
					// 当前被选中的与要删除的元素相同，且 元素的数据有与之匹配的其它元素时：须将当前被选中元素改为可用的其它元素。
					// （目前暂未实现此部分功能）
				}
				break;
			}
		}
	}

	// 调用父类方法
	this.utLzr.supCall(this, 0, "delEvt", doeo);
};
