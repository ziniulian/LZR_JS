/*************************************************
作者：子牛连
类名：Ary
说明：数组
创建日期：27-七月-2016 12:30:02
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base"
], "LZR.Base.Ary");
LZR.Base.Ary = function (obj) {
	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Base.Ary.prototype.className_ = "LZR.Base.Ary";
LZR.Base.Ary.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.Ary");

// 构造器
LZR.Base.Ary.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Base.Ary.prototype.init_.lzrClass_ = LZR.Base.Ary;

// 对构造参数的特殊处理
LZR.Base.Ary.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Base.Ary.prototype.hdObj_.lzrClass_ = LZR.Base.Ary;

// 获取元素在数组中的位置
LZR.Base.Ary.prototype.getId = function (ary/*as:Array*/, val/*as:Object*/)/*as:int*/ {
	for (i = 0; i < ary.length; i++)
	{
		if (val === ary[i])
		return i;
	}
	return undefined;
};
LZR.Base.Ary.prototype.getId.lzrClass_ = LZR.Base.Ary;

// 删除数组中某个位置的元素
LZR.Base.Ary.prototype.delById = function (ary/*as:Array*/, id/*as:int*/) {
	if (!isNaN(id)) {
		ary.splice(id, 1);
	}
};
LZR.Base.Ary.prototype.delById.lzrClass_ = LZR.Base.Ary;

// 删除数组中的元素
LZR.Base.Ary.prototype.delByVal = function (ary/*as:Array*/, val/*as:Object*/) {
	this.delById(ary, this.getId(ary, val));
};
LZR.Base.Ary.prototype.delByVal.lzrClass_ = LZR.Base.Ary;