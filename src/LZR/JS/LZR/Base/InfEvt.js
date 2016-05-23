/*************************************************
作者：子牛连
类名：InfEvt
说明：事件集接口
创建日期：17-三月-2016 13:33:38
版本号：1.1
*************************************************/

LZR.load([
	"LZR.Base"
], "LZR.Base.InfEvt");
LZR.Base.InfEvt = function (obj) {
	// 事件集
	this.evt = {};	/*as:Object*/
};
LZR.Base.InfEvt.prototype.className_ = "LZR.Base.InfEvt";
LZR.Base.InfEvt.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.InfEvt");

// 设置事件调用对象
LZR.Base.InfEvt.prototype.setEventObj = function (obj/*as:Object*/) {
	this.setEventObjRecursion(this.evt, obj);
};

// 递归设置调用对象
LZR.Base.InfEvt.prototype.setEventObjRecursion = function (o/*as:Object*/, obj/*as:Object*/) {
	for (var s in o) {
		if (o.className_ === "LZR.Base.CallBacks") {
			o[s].obj = obj;
		} else {
			this.setEventObjRecursion(o[s], obj);
		}
	}
};
