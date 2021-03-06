/*************************************************
作者：子牛连
类名：Ctrl
说明：值控制器
创建日期：27-七月-2016 12:30:02
版本号：1.1
*************************************************/

LZR.load([
	"LZR.Base.Val",
	"LZR.Base.CallBacks",
	"LZR.Base.InfEvt",
	"LZR.Util"
], "LZR.Base.Val.Ctrl");
LZR.Base.Val.Ctrl = function (obj) /*bases:LZR.Base.Val*/ /*interfaces:LZR.Base.InfEvt*/ {
	LZR.initSuper(this, obj);

	LZR.Base.InfEvt.call(this);

	// 是否触发事件
	this.enableEvent = true;	/*as:boolean*/

	// 事件自动恢复
	this.autoEvent = true;	/*as:boolean*/

	// 设置值之前触发的事件
	this.evt.before/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 值变动后触发的事件
	this.evt.change/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 设置值后触发的事件
	this.evt.set/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 通用工具
	this.utLzr/*m*/ = LZR.getSingleton(LZR.Util);	/*as:LZR.Util*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Base.Val.Ctrl.prototype = LZR.clone (LZR.Base.InfEvt.prototype, LZR.Base.Val.Ctrl.prototype);
LZR.Base.Val.Ctrl.prototype = LZR.clone (LZR.Base.Val.prototype, LZR.Base.Val.Ctrl.prototype);
LZR.Base.Val.Ctrl.prototype.super_ = [LZR.Base.Val];
LZR.Base.Val.Ctrl.prototype.className_ = "LZR.Base.Val.Ctrl";
LZR.Base.Val.Ctrl.prototype.version_ = "1.1";

LZR.load(null, "LZR.Base.Val.Ctrl");

// 构造器
LZR.Base.Val.Ctrl.prototype.init_ = function (obj/*as:Object*/) {
	if (obj !== undefined) {
		this.val = obj;
		this.hdObj_(obj);
	}
};
LZR.Base.Val.Ctrl.prototype.init_.lzrClass_ = LZR.Base.Val.Ctrl;

// ---- 设置值
LZR.Base.Val.Ctrl.prototype.set = function (obj/*as:Object*/, doEvent/*as:boolean*/)/*as:boolean*/ {
	var r = true;
	if (doEvent === false) {
		this.val = obj;
	} else {
		if (this.enableEvent) {
			var old = this.val;
			var tmp = {
				tmpVal: obj
			};
			if (this.beforeSet (obj, this, old, tmp)) {
				if (tmp.tmpVal !== old) {
					this.val = tmp.tmpVal;
					r = this.onChange (this.val, this, old, tmp);
					if (!r) {
						this.val = tmp.tmpVal;
					}
				}
				if (!(this.onSet (this.val, this, old, tmp))) {
					this.val = tmp.tmpVal;
					r = false;
				}
			}
		} else {
			this.enableEvent = this.autoEvent;
			this.val = obj;
		}
	}
	return r;
};
LZR.Base.Val.Ctrl.prototype.set.lzrClass_ = LZR.Base.Val.Ctrl;

// 设置值之前触发的事件
LZR.Base.Val.Ctrl.prototype.beforeSet = function (val/*as:Object*/, self/*as:Object*/, old/*as:Object*/, tmpVal/*as:Object*/)/*as:boolean*/ {
	return this.evt.before.execute (val, self, old, tmpVal);
};
LZR.Base.Val.Ctrl.prototype.beforeSet.lzrClass_ = LZR.Base.Val.Ctrl;

// 值变动后触发的事件
LZR.Base.Val.Ctrl.prototype.onChange = function (val/*as:Object*/, self/*as:Object*/, old/*as:Object*/, tmpVal/*as:Object*/)/*as:boolean*/ {
	return this.evt.change.execute (val, self, old, tmpVal);
};
LZR.Base.Val.Ctrl.prototype.onChange.lzrClass_ = LZR.Base.Val.Ctrl;

// 设置值后触发的事件
LZR.Base.Val.Ctrl.prototype.onSet = function (val/*as:Object*/, self/*as:Object*/, old/*as:Object*/, tmpVal/*as:Object*/)/*as:boolean*/ {
	return this.evt.set.execute (val, self, old, tmpVal);
};
LZR.Base.Val.Ctrl.prototype.onSet.lzrClass_ = LZR.Base.Val.Ctrl;

// 对构造参数的特殊处理
LZR.Base.Val.Ctrl.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Base.Val.Ctrl.prototype.hdObj_.lzrClass_ = LZR.Base.Val.Ctrl;

// ---- 克隆
LZR.Base.Val.Ctrl.prototype.clone = function (dep/*as:boolean*/)/*as:Object*/ {
	var r = this.utLzr.supCall(this, 0, "clone", dep);
	r.enableEvent = this.enableEvent;
	r.autoEvent = this.autoEvent;

	// 事件克隆
	// LZR.clone(this.evt[s], true);
	for (var s in r.evt) {
		LZR.setObj (r.evt[s], this.evt[s]);
		if (dep) {
			// 深度克隆
			r.evt[s].funs = LZR.clone(this.evt[s].funs, true);
		}
	}
	r.setEventObj(r);
};
LZR.Base.Val.Ctrl.prototype.clone.lzrClass_ = LZR.Base.Val.Ctrl;