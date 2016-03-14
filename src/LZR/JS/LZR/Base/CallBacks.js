/*************************************************
作者：子牛连
类名：CallBacks
说明：回调函数集合
创建日期：11-三月-2016 14:27:33
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base",
	"LZR.Base.Str",
	"LZR.Base.CallBacks.CallBack"
], "LZR.Base.CallBacks");
LZR.Base.CallBacks = function (obj) {
	// 是否触发事件
	this.enableEvent = true;	/*as:boolean*/

	// 事件自动恢复
	this.autoEvent = true;	/*as:boolean*/

	// 调用对象
	this.obj = this;	/*as:Object*/

	// 回调函数个数
	this.count = 0;	/*as:int*/

	// 回调函数集合
	this.funs/*m*/ = {};	/*as:LZR.Base.CallBacks.CallBack*/

	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Base.CallBacks.prototype.className_ = "LZR.Base.CallBacks";
LZR.Base.CallBacks.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.CallBacks");

// 构造器
LZR.Base.CallBacks.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.Base.CallBacks.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};

// 添加回调函数
LZR.Base.CallBacks.prototype.add = function (fun/*as:fun*/, name/*as:LZR.Base.Str*/) {
	if (name === undefined || name === null) {
		name = this.count;
	}
	if (this.funs[name] === undefined) {
		this.count ++;
	}
	this.funs[name] = new LZR.Base.CallBacks.CallBack ({name: name, fun: fun});
};

// 删除回调函数
LZR.Base.CallBacks.prototype.del = function (name/*as:LZR.Base.Str*/) {
	if (this.funs[name] !== undefined) {
		this.funs[name] = undefined;
		delete this.funs[name];
		this.count --;
	}
};

// 执行回调函数
LZR.Base.CallBacks.prototype.execute = function ()/*as:boolean*/ {
	var b = true;	// 回调函数正常执行则返回 true，否则返回 false
	if (this.enableEvent) {
		for (var s in this.funs) {
			switch (s) {
				case "length":
					break;
				default:
					if (this.funs[s].enableEvent) {
						if ( (this.funs[s].fun.apply ( this.obj, arguments )) === false ) {
							b = false;
						}
					} else {
						this.funs[s].enableEvent = this.funs[s].autoEvent;
					}
					break;
			}
		}
	} else {
		this.enableEvent = this.autoEvent;
	}
	return b;
};
