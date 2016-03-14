/*************************************************
作者：子牛连
类名：Json
说明：
创建日期：11-三月-2016 14:25:05
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base"
], "LZR.Base.Json");
LZR.Base.Json = function (obj) {
	// 映射的源 JSON 对象
	this.src = JSON ? (JSON) : (LZR.load(["/Lib/Util/JSON.js"]), JSON);	/*as:Object*/

	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
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

// 对构造参数的特殊处理
LZR.Base.Json.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};

// 将对象转换成 json 文本
LZR.Base.Json.prototype.toJson = function (obj/*as:Object*/)/*as:string*/ {
	return this.src.stringify(obj);
};

// 将字符串转换成对象
LZR.Base.Json.prototype.toObj = function (json/*as:string*/)/*as:Object*/ {
	return this.src.parse(json);
};
