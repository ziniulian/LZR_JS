/*************************************************
作者：子牛连
类名：Json
说明：
创建日期：14-一月-2016 11:02:49
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base"
], "LZR.Base.Json");
LZR.Base.Json = function (obj) {
	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Base.Json.prototype.className_ = "LZR.Base.Json";
LZR.Base.Json.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.Json");

// 映射的源 JSON 对象
LZR.Base.Json.src = JSON ? (JSON) : (LZR.load(["/Lib/Util/JSON.js"]), JSON);	/*as:Object*/

// 构造器
LZR.Base.Json.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
	}
};

// 将对象转换成 json 文本
LZR.Base.Json.toJson = function (obj/*as:Object*/)/*as:string*/ {
	return LZR.Base.Json.src.stringify(obj);
};

// 将字符串转换成对象
LZR.Base.Json.toObj = function (json/*as:string*/)/*as:Object*/ {
	return LZR.Base.Json.src.parse(json);
};