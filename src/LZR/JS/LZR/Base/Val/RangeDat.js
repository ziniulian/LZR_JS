/*************************************************
作者：子牛连
类名：RangeDat
说明：带范围的数据
创建日期：27-六月-2016 15:13:29
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base.Val",
	"LZR.Base.Data",
	"LZR.Base.Val.RangeNum"
], "LZR.Base.Val.RangeDat");
LZR.Base.Val.RangeDat = function (obj) /*bases:LZR.Base.Data*/ {
	LZR.initSuper(this, obj);

	// 通用工具
	this.utLzr = null;	/*as:Object*/

	// 范围值类
	this.clsRn = null;	/*as:fun*/

	// 范围数
	this.rn/*m*/ = new LZR.Base.Val.RangeNum();	/*as:LZR.Base.Val.RangeNum*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Base.Val.RangeDat.prototype = LZR.clone (LZR.Base.Data.prototype, LZR.Base.Val.RangeDat.prototype);
LZR.Base.Val.RangeDat.prototype.super_ = [LZR.Base.Data];
LZR.Base.Val.RangeDat.prototype.className_ = "LZR.Base.Val.RangeDat";
LZR.Base.Val.RangeDat.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.Val.RangeDat");

// 构造器
LZR.Base.Val.RangeDat.prototype.init_ = function (obj/*as:Object*/) {
	this.utLzr = this.rn.utLzr;
	this.clsRn = this.rn.constructor;

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.Base.Val.RangeDat.prototype.hdObj_ = function (obj/*as:Object*/) {
	if (this.rn.constructor === this.clsRn) {
		if (obj.isNorm !== undefined) {
			this.rn.isNorm = obj.isNorm;
		}
		if (obj.inLimit !== undefined) {
			this.rn.inLimit = obj.inLimit;
		}
		this.rn.hdObj_(obj);
	}

	// 调用父类的参数处理
	this.utLzr.supCall (this, 0, "hdObj_", obj);
};
