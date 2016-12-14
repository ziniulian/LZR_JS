/*************************************************
作者：子牛连
类名：MouseInfo
说明：鼠标信息
创建日期：27-七月-2016 12:30:03
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base.Ctrl.Mouse",
	"LZR.HTML.Base.Ctrl.Mouse.MouseKey"
], "LZR.HTML.Base.Ctrl.Mouse.MouseInfo");
LZR.HTML.Base.Ctrl.Mouse.MouseInfo = function (obj) {
	// 鼠标按下状态
	this.stat = 0;	/*as:int*/

	// 按键可用性状态
	this.enableStat = 3;	/*as:int*/

	// 滚动值
	this.wheelVal = 0;	/*as:int*/

	// 硬滚动值
	this.dwVal = 0;	/*as:int*/

	// 鼠标状态常量
	this.STAT = null;	/*as:Object*/

	// 文档移动函数
	this.docMoveFun = null;	/*as:fun*/

	// 文档抬起函数
	this.docUpFun = null;	/*as:fun*/

	// 自身移动函数
	this.selfMoveFun = null;	/*as:fun*/

	// 左
	this.lk/*m*/ = new LZR.HTML.Base.Ctrl.Mouse.MouseKey();	/*as:LZR.HTML.Base.Ctrl.Mouse.MouseKey*/

	// 中
	this.mid/*m*/ = new LZR.HTML.Base.Ctrl.Mouse.MouseKey();	/*as:LZR.HTML.Base.Ctrl.Mouse.MouseKey*/

	// 右
	this.rk/*m*/ = new LZR.HTML.Base.Ctrl.Mouse.MouseKey();	/*as:LZR.HTML.Base.Ctrl.Mouse.MouseKey*/

	// 触摸
	this.touch/*m*/ = new LZR.HTML.Base.Ctrl.Mouse.MouseKey();	/*as:LZR.HTML.Base.Ctrl.Mouse.MouseKey*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ctrl.Mouse.MouseInfo.prototype.className_ = "LZR.HTML.Base.Ctrl.Mouse.MouseInfo";
LZR.HTML.Base.Ctrl.Mouse.MouseInfo.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ctrl.Mouse.MouseInfo");

// 构造器
LZR.HTML.Base.Ctrl.Mouse.MouseInfo.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.HTML.Base.Ctrl.Mouse.MouseInfo.prototype.init_.lzrClass_ = LZR.HTML.Base.Ctrl.Mouse.MouseInfo;

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.Mouse.MouseInfo.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.HTML.Base.Ctrl.Mouse.MouseInfo.prototype.hdObj_.lzrClass_ = LZR.HTML.Base.Ctrl.Mouse.MouseInfo;
