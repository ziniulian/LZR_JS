/*************************************************
作者：子牛连
类名：SrcDat
说明：源数据
创建日期：04-五月-2016 11:40:15
版本号：1.0
*************************************************/

LZR.load([
	"LZR.NodeJs.ProSrv.WindSrv"
], "LZR.NodeJs.ProSrv.WindSrv.SrcDat");
LZR.NodeJs.ProSrv.WindSrv.SrcDat = function (obj) {
	// 行数
	this.rows = 328;	/*as:int*/

	// 列数
	this.cols = 374;	/*as:int*/

	// 最小经度
	this.lonmin = 50.5;	/*as:double*/

	// 最小纬度
	this.latmin = -4;	/*as:double*/

	// 最大经度
	this.lonmax = 161.5;	/*as:double*/

	// 最大纬度
	this.latmax = 58;	/*as:double*/

	// 经度间隔
	this.lonstep = 0;	/*as:double*/

	// 纬度间隔
	this.latstep = 0;	/*as:double*/

	// 风场数据
	this.val = [];	/*as:Array*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.NodeJs.ProSrv.WindSrv.SrcDat.prototype.className_ = "LZR.NodeJs.ProSrv.WindSrv.SrcDat";
LZR.NodeJs.ProSrv.WindSrv.SrcDat.prototype.version_ = "1.0";

LZR.load(null, "LZR.NodeJs.ProSrv.WindSrv.SrcDat");

// 构造器
LZR.NodeJs.ProSrv.WindSrv.SrcDat.prototype.init_ = function (obj/*as:Object*/) {
	this.calcStep();

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.NodeJs.ProSrv.WindSrv.SrcDat.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};

// 计算间隔
LZR.NodeJs.ProSrv.WindSrv.SrcDat.prototype.calcStep = function () {
	this.lonstep = (this.lonmax - this.lonmin) / (this.cols - 1);
	this.latstep = (this.latmax - this.latmin) / (this.rows - 1);
};
