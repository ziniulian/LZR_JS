/*************************************************
作者：子牛连
类名：Enum
说明：通用枚举
创建日期：23-三月-2016 10:42:36
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base.Val"
], "LZR.Base.Val.Enum");
LZR.Base.Val.Enum = function (obj) /*bases:LZR.Base.Val*/ {
	LZR.initSuper(this, obj);

	// 枚举名
	this.key = "";	/*as:string*/

	// 通用工具
	this.utLzr/*m*/ = LZR.getSingleton(LZR.Util);	/*as:LZR.Util*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Base.Val.Enum.prototype = LZR.clone (LZR.Base.Val.prototype, LZR.Base.Val.Enum.prototype);
LZR.Base.Val.Enum.prototype.super_ = [LZR.Base.Val];
LZR.Base.Val.Enum.prototype.className_ = "LZR.Base.Val.Enum";
LZR.Base.Val.Enum.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.Val.Enum");

// 构造器
LZR.Base.Val.Enum.prototype.init_ = function (obj/*as:Object*/) {
	this.set(obj);
	if (obj) {
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.Base.Val.Enum.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};

// 获取枚举名
LZR.Base.Val.Enum.prototype.getKey = function ()/*as:string*/ {
	return this.key;
};

// 通过枚举值获取枚举名
LZR.Base.Val.Enum.prototype.getKeyByVal = function (value/*as:Object*/)/*as:string*/ {
	for (var s in this.constructor) {
		if (value === this.constructor[s]) {
			return s;
		}
	}
	return undefined;
};

// 获取所有枚举集合
LZR.Base.Val.Enum.prototype.enums = function ()/*as:Object*/ {
	var ems = {};
	for (var s in this.constructor) {
		switch (s) {
			// case "getKeyByVal":
			// case "enums":
				// break;
			default:
				ems[s] = this.constructor[s];
				break;
		}
	}
	return ems;
};

// ---- 设置值
LZR.Base.Val.Enum.prototype.set = function (key/*as:string*/)/*as:boolean*/ {
	if (key && this.constructor[key]) {
		this.key = key;
		this.val = this.constructor[key];
		return true;
	} else if (!key && this.constructor.emnull) {
		this.key = "emnull";
		this.val = this.constructor.emnull;
		return true;
	} else {
		return false;
	}
};

// ---- 克隆
LZR.Base.Val.Enum.prototype.clone = function (dep/*as:boolean*/)/*as:Object*/ {
	return new this.constructor (this.key);
};
