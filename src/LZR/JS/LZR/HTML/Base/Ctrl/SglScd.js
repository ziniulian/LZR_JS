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
LZR.HTML.Base.Ctrl.SglScd.prototype.hdBefore = function (ctrl/*as:Object*/, val/*as:boolean*/)/*as:boolean*/ {
// console.log (this.doe);
// console.log (ctrl.vcCur.get());
	if (ctrl.vcCur.get()) {
// alert(0);
		// 此处 this 指向 doeo 元素
		if (ctrl.vcCur.get() === this) {
// alert(4);
			// 当，当前被选中的选项 与 正在选择的选项一致，时：
			if (!val && !ctrl.only) {
// alert(5);
				// 当，预设值为 false，且 不需要 至少有一个选项被选中，时：则可进行设值处理。
				ctrl.vcCur.set(null);
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
				var old = ctrl.vcCur.get();
				ctrl.vcCur.set(this);
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
			ctrl.vcCur.set(this);
			return true;
		} else {
// alert(3);
			// 否则，也可进行设值处理。
			return true;
		}
	}
};

// ---- 添加一个Doe元素
LZR.HTML.Base.Ctrl.SglScd.prototype.add = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	this.utLzr.supCall(this, 0, "add", doeo);

	var evtName = this.className_ + "_hdBefore_";
	doeo.ctrlCbs[evtName] =  evtName + doeo.dat.vcScd.evt.before.id;
	doeo.dat.vcScd.evt.before.add( this.utLzr.bind(doeo, this.hdBefore, this), doeo.ctrlCbs[evtName] );

	// 与 Scd 的设置Css样式不同，无论关联多少个元素，只能触发一次
	var cbs = doeo.dat.vcScd.evt.before.funs;
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

// ---- 删除一个Doe元素
LZR.HTML.Base.Ctrl.SglScd.prototype.del = function (doeo/*as:LZR.HTML.Base.Doe*/)/*as:boolean*/ {
	if (this.utLzr.supCall(this, 0, "del", doeo)) {
		var evtName = this.className_ + "_hdBefore_";
		var cb = doeo.dat.vcScd.evt.before.del(doeo.ctrlCbs[evtName]);
		LZR.del (doeo.ctrlCbs, evtName);

		if (cb.enableEvent && cb.autoEvent) {
			var cbs = doeo.dat.vcScd.evt.before.funs;
			// 只能触发一次的事件被关闭时，须寻找有无其它可开启的事件。
			for (var s in cbs) {
				if (this.utStr.startWith(s, evtName)) {
// console.log (s);
					cbs[s].enableEvent = true;
					cbs[s].autoEvent = true;
					if (this.vcCur.get() === doeo) {
						// 当前被选中的与要删除的元素相同，且 元素的数据有与之匹配的其它元素时：须将当前被选中元素改为可用的其它元素。
						// （目前暂无实现此部分功能）
					}
					break;
				}
			}
		}
		this.cleanDat(doeo.dat);
		return true;
	} else {
		return false;
	}
};
