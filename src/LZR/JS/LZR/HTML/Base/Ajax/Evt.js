/*************************************************
作者：子牛连
类名：Evt
说明：事件集
创建日期：15-三月-2016 17:27:37
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base.Ajax",
	"LZR.Base.CallBacks"
], "LZR.HTML.Base.Ajax.Evt");
LZR.HTML.Base.Ajax.Evt = function (obj) {
	// Ajax应答
	this.rsp/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ajax.Evt.prototype.className_ = "LZR.HTML.Base.Ajax.Evt";
LZR.HTML.Base.Ajax.Evt.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ajax.Evt");

// 构造器
LZR.HTML.Base.Ajax.Evt.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.HTML.Base.Ajax.Evt.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
