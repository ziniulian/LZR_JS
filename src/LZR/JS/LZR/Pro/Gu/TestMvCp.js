/*************************************************
作者：子牛连
类名：TestMvCp
说明：地量且在均线附近
创建日期：22-四月-2019 17:06:12
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Gu",
	"LZR.Pro.Gu.InfTest"
], "LZR.Pro.Gu.TestMvCp");
LZR.Pro.Gu.TestMvCp = function (obj) /*bases:LZR.Pro.Gu.InfTest*/ {
	LZR.initSuper(this, obj);

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Gu.TestMvCp.prototype = LZR.clone (LZR.Pro.Gu.InfTest.prototype, LZR.Pro.Gu.TestMvCp.prototype);
LZR.Pro.Gu.TestMvCp.prototype.super_ = [LZR.Pro.Gu.InfTest];
LZR.Pro.Gu.TestMvCp.prototype.className_ = "LZR.Pro.Gu.TestMvCp";
LZR.Pro.Gu.TestMvCp.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Gu.TestMvCp");

// 构造器
LZR.Pro.Gu.TestMvCp.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Gu.TestMvCp.prototype.init_.lzrClass_ = LZR.Pro.Gu.TestMvCp;

// 对构造参数的特殊处理
LZR.Pro.Gu.TestMvCp.prototype.hdObj_ = function (obj/*as:Object*/) {

};
LZR.Pro.Gu.TestMvCp.prototype.hdObj_.lzrClass_ = LZR.Pro.Gu.TestMvCp;

// ----条件匹配
LZR.Pro.Gu.TestMvCp.prototype.match = function (o/*as:Object*/)/*as:boolean*/ {
	if (
		o.p < o.pc * 1.015 &&
		o.p > o.pc * 0.985 &&
		o.v < o.vl * 1.1 &&
		(o.p - o.pl) / (o.ph - o.pl) < 0.35
	) {
		return true;
	}
	return false;
};
LZR.Pro.Gu.TestMvCp.prototype.match.lzrClass_ = LZR.Pro.Gu.TestMvCp;
