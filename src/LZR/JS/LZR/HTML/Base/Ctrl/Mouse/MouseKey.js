/*************************************************
作者：子牛连
类名：MouseKey
说明：鼠标各键
创建日期：12-五月-2016 15:22:13
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base.Ctrl.Mouse"
], "LZR.HTML.Base.Ctrl.Mouse.MouseKey");
LZR.HTML.Base.Ctrl.Mouse.MouseKey = function (obj) {
	// 起始X坐标
	this.sx = 0;	/*as:double*/

	// 起始Y坐标
	this.sy = 0;	/*as:double*/

	// 结束X坐标
	this.ex = 0;	/*as:double*/

	// 结束Y坐标
	this.ey = 0;	/*as:double*/

	// 双击状态
	this.dbStat = 0;	/*as:int*/

	// 延时函数
	this.timout = null;	/*as:fun*/

	// 按下时间
	this.tim = 0;	/*as:int*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ctrl.Mouse.MouseKey.prototype.className_ = "LZR.HTML.Base.Ctrl.Mouse.MouseKey";
LZR.HTML.Base.Ctrl.Mouse.MouseKey.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ctrl.Mouse.MouseKey");

// 构造器
LZR.HTML.Base.Ctrl.Mouse.MouseKey.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.Mouse.MouseKey.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
