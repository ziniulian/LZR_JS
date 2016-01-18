/*************************************************
作者：子牛连
类名：CallBacks
说明：回调函数集合
创建日期：14-一月-2016 11:02:49
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base",
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
	this.m_CallBack = {};	/*as:LZR.Base.CallBacks.CallBack*/

	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Base.CallBacks.prototype.className_ = "LZR.Base.CallBacks";
LZR.Base.CallBacks.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.CallBacks");

// 添加回调函数
LZR.Base.CallBacks.prototype.append = function (fun/*as:fun*/, name/*as:string*/) {
	if (name === undefined || name === null) {
		name = this.count;
	}
	if (this.m_CallBack[name] === undefined) {
		this.count ++;
	}
	this.m_CallBack[name] = new LZR.Base.CallBacks.CallBack ({name: name, fun: fun});
};

// 删除回调函数
LZR.Base.CallBacks.prototype.del = function (name/*as:string*/) {
	if (this.m_CallBack[name] !== undefined) {
		this.m_CallBack[name] = undefined;
		this.count --;
	}
};

// 执行回调函数
LZR.Base.CallBacks.prototype.execute = function ()/*as:boolean*/ {
	if (this.enableEvent) {
		var b = true;	// 回调函数正常执行则返回 true，否则返回 false
		for (var s in this.m_CallBack) {
			switch (s) {
				case "length":
					break;
				default:
					if (this.m_CallBack[s].enableEvent) {
						if ( (this.m_CallBack[s].fun.apply ( this.obj, arguments )) === false ) {
							b = false;
						}
					} else {
						this.m_CallBack[s].enableEvent = this.m_CallBack[s].autoEvent;
					}
					break;
			}
		}
		return b;
	} else {
		this.enableEvent = this.autoEvent;
		return false;
	}
};

// 构造器
LZR.Base.CallBacks.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		this.obj = obj;
	}
};