/*************************************************
作者：子牛连
类名：CallBack
说明：回调函数
创建日期：27-七月-2016 12:30:02
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base.CallBacks"
], "LZR.Base.CallBacks.CallBack");
LZR.Base.CallBacks.CallBack = function (obj) {
	// 名字
	this.name = "";	/*as:string*/

	// 是否触发事件
	this.enableEvent = true;	/*as:boolean*/

	// 事件自动恢复
	this.autoEvent = true;	/*as:boolean*/

	// 回调参数中是否添加自我的相关信息
	this.selfInfo = false;	/*as:boolean*/

	// 函数
	this.fun = null;	/*as:fun*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Base.CallBacks.CallBack.prototype.className_ = "LZR.Base.CallBacks.CallBack";
LZR.Base.CallBacks.CallBack.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.CallBacks.CallBack");

// 构造器
LZR.Base.CallBacks.CallBack.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Base.CallBacks.CallBack.prototype.init_.lzrClass_ = LZR.Base.CallBacks.CallBack;

// 对构造参数的特殊处理
LZR.Base.CallBacks.CallBack.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Base.CallBacks.CallBack.prototype.hdObj_.lzrClass_ = LZR.Base.CallBacks.CallBack;