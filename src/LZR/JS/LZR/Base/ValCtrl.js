/*************************************************
作者：子牛连
类名：ValCtrl
说明：值控制器
创建日期：14-一月-2016 11:02:50
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base",
	"LZR.Base.ValCtrl.Event"
], "LZR.Base.ValCtrl");
LZR.Base.ValCtrl = function (obj) {
	// 值
	this.val = null;	/*as:Object*/

	// 是否触发事件
	this.enableEvent = true;	/*as:boolean*/

	// 事件自动恢复
	this.autoEvent = true;	/*as:boolean*/

	// 事件集
	this.event = new LZR.Base.ValCtrl.Event({self:this});	/*as:LZR.Base.ValCtrl.Event*/

	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Base.ValCtrl.prototype.className_ = "LZR.Base.ValCtrl";
LZR.Base.ValCtrl.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.ValCtrl");

// 构造器
LZR.Base.ValCtrl.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		this.val = obj;
	}
};

// 获取值
LZR.Base.ValCtrl.prototype.get = function ()/*as:Object*/ {
	return val;
};

// 设置值
LZR.Base.ValCtrl.prototype.set = function (obj/*as:Object*/, doEvent/*as:boolean*/) {
	if (doEvent === false) {
		this.val = obj;
	} else {
		if (this.enableEvent) {
			var old = this.val;
			if (this.beforeSet (obj, this, old) !== false) {
				if (obj !== this.val) {
					this.val = obj;
					this.onChange (obj, this, old);
				}
				this.onSet (obj, this, old);
			}
		} else {
			this.enableEvent = this.autoEvent;
			this.val = obj;
		}
	}
};

// 设置事件调用对象
LZR.Base.ValCtrl.prototype.setEventObj = function (obj/*as:Object*/) {
	this.event.before.obj = obj;
	this.event.change.obj = obj;
	this.event.set.obj = obj;
};

// 设置值之前触发的事件
LZR.Base.ValCtrl.prototype.beforeSet = function (val/*as:Object*/, self/*as:ValCtrl*/, old/*as:Object*/)/*as:boolean*/ {
	return this.event.before.execute (val, self, old);
};

// 值变动后触发的事件
LZR.Base.ValCtrl.prototype.onChange = function (val/*as:Object*/, self/*as:ValCtrl*/, old/*as:Object*/) {
	return this.event.change.execute (val, self, old);
};

// 设置值后触发的事件
LZR.Base.ValCtrl.prototype.onSet = function (val/*as:Object*/, self/*as:ValCtrl*/, old/*as:Object*/) {
	return this.event.set.execute (val, self, old);
};