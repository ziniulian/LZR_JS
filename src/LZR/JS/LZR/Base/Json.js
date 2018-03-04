/*************************************************
作者：子牛连
类名：Json
说明：
创建日期：27-七月-2016 12:30:03
版本号：1.0
*************************************************/

// LZR.loadAnnex({
// 	JSON: "/Lib/Util/JSON.js"
// });

LZR.load([
	"LZR.Base"
], "LZR.Base.Json");
LZR.Base.Json = function (obj) {
	// 映射的源 JSON 对象
	this.src = JSON;	/*as:Object*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Base.Json.prototype.className_ = "LZR.Base.Json";
LZR.Base.Json.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.Json");

// 构造器
LZR.Base.Json.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Base.Json.prototype.init_.lzrClass_ = LZR.Base.Json;

// 对构造参数的特殊处理
LZR.Base.Json.prototype.hdObj_ = function (obj/*as:Object*/) {

};
LZR.Base.Json.prototype.hdObj_.lzrClass_ = LZR.Base.Json;

// 将对象转换成 json 文本
LZR.Base.Json.prototype.toJson = function (obj/*as:Object*/)/*as:string*/ {
	if (obj.className_ && obj.toJson && (obj.className_.indexOf("LZR.") === 0)) {
		return obj.toJson();
	} else {
		return this.src.stringify(obj);
	}
};
LZR.Base.Json.prototype.toJson.lzrClass_ = LZR.Base.Json;

// 将字符串转换成对象
LZR.Base.Json.prototype.toObj = function (json/*as:string*/)/*as:Object*/ {
	return this.src.parse(json);
};
LZR.Base.Json.prototype.toObj.lzrClass_ = LZR.Base.Json;
