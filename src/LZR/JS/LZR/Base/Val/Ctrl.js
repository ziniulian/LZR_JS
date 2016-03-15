/*************************************************
作者：子牛连
类名：Ctrl
说明：值控制器
创建日期：11-三月-2016 14:28:51
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base.Val",
	"LZR.Base.Val.Evt"
], "LZR.Base.Val.Ctrl");
LZR.Base.Val.Ctrl = function (obj) /*bases:LZR.Base.Val*/ {
	LZR.initSuper(this);

	// 是否触发事件
	this.enableEvent = true;	/*as:boolean*/

	// 事件自动恢复
	this.autoEvent = true;	/*as:boolean*/

	// 事件集
	this.evt/*m*/ = new LZR.Base.Val.Evt();	/*as:LZR.Base.Val.Evt*/

	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Base.Val.Ctrl.prototype = LZR.clone (LZR.Base.Val.prototype, LZR.Base.Val.Ctrl.prototype);
LZR.Base.Val.Ctrl.prototype.super_ = [LZR.Base.Val];
LZR.Base.Val.Ctrl.prototype.className_ = "LZR.Base.Val.Ctrl";
LZR.Base.Val.Ctrl.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.Val.Ctrl");

// 构造器
LZR.Base.Val.Ctrl.prototype.init_ = function (obj/*as:Object*/) {
	this.setEventObj(this);
	if (obj) {
		this.val = obj;
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.Base.Val.Ctrl.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};

// ---- 设置值
LZR.Base.Val.Ctrl.prototype.set = function (obj/*as:Object*/, doEvent/*as:boolean*/)/*as:boolean*/ {
	var r = true;
	if (doEvent === false) {
		this.val = obj;
	} else {
		if (this.enableEvent) {
			var old = this.val;
			if (this.beforeSet (obj, this, old)) {
				if (obj !== old) {
					this.val = obj;
					r = this.onChange (obj, this, old);
				}
				r = this.onSet (obj, this, old) && r;
			}
		} else {
			this.enableEvent = this.autoEvent;
			this.val = obj;
		}
	}
	return r;
};

// ---- 克隆
LZR.Base.Val.Ctrl.prototype.clone = function (dep/*as:boolean*/)/*as:Object*/ {
	var r = this.super_[0].prototype.clone.call (this, dep);
	r.enableEvent = this.enableEvent;
	r.autoEvent = this.autoEvent;

	// 事件克隆
	// LZR.clone(this.evt[s], true);
	for (var s in r.evt) {
		LZR.setObj (r.evt[s], this.evt[s]);
		if (dep) {
			// 深度克隆
			r.evt[s].funs = LZR.clone(this.evt[s].funs, dep);
		}
	}
	r.setEventObj(r);

	return r;
};

// 设置事件调用对象
LZR.Base.Val.Ctrl.prototype.setEventObj = function (obj/*as:Object*/) {
	this.evt.before.obj = obj;
	this.evt.change.obj = obj;
	this.evt.set.obj = obj;
};

// 设置值之前触发的事件
LZR.Base.Val.Ctrl.prototype.beforeSet = function (val/*as:Object*/, self/*as:Object*/, old/*as:Object*/)/*as:boolean*/ {
	return this.evt.before.execute (val, self, old);
};

// 值变动后触发的事件
LZR.Base.Val.Ctrl.prototype.onChange = function (val/*as:Object*/, self/*as:Object*/, old/*as:Object*/)/*as:boolean*/ {
	return this.evt.change.execute (val, self, old);
};

// 设置值后触发的事件
LZR.Base.Val.Ctrl.prototype.onSet = function (val/*as:Object*/, self/*as:Object*/, old/*as:Object*/)/*as:boolean*/ {
	return this.evt.set.execute (val, self, old);
};
