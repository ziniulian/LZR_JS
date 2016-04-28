/*************************************************
作者：子牛连
类名：H2c
说明：Html2Canvas
创建日期：27-四月-2016 16:25:07
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base.InfScrnshot",
	"LZR.Util"
], "LZR.HTML.Base.InfScrnshot.H2c");
LZR.HTML.Base.InfScrnshot.H2c = function (obj) /*interfaces:LZR.HTML.Base.InfScrnshot*/ {
	LZR.HTML.Base.InfScrnshot.call(this);

	// 控件对象
	this.h2c = window.html2canvas ? (html2canvas) : (LZR.load(["/Lib/Util/htm2cav/h2c_noIE.js"]), html2canvas);	/*as:Object*/

	// 代理服务名
	this.proxy = "";	/*as:string*/

	// 是否输出记录
	this.loog = false;	/*as:boolean*/

	// 允许加载跨域图片
	this.allowTaint = false;	/*as:boolean*/

	// 是否用CORS方式处理跨域问题
	this.useCORS = false;	/*as:boolean*/

	// 常用工具
	this.utLzr/*m*/ = LZR.getSingleton(LZR.Util);	/*as:LZR.Util*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.InfScrnshot.H2c.prototype = LZR.clone (LZR.HTML.Base.InfScrnshot.prototype, LZR.HTML.Base.InfScrnshot.H2c.prototype);
LZR.HTML.Base.InfScrnshot.H2c.prototype.className_ = "LZR.HTML.Base.InfScrnshot.H2c";
LZR.HTML.Base.InfScrnshot.H2c.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.InfScrnshot.H2c");

// 构造器
LZR.HTML.Base.InfScrnshot.H2c.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.HTML.Base.InfScrnshot.H2c.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};

// ---- 截图
LZR.HTML.Base.InfScrnshot.H2c.prototype.shot = function (doe/*as:Object*/) {
	var d = {
		logging: this.loog,
		allowTaint: this.allowTaint,
		useCORS: this.useCORS,
		onrendered: this.utLzr.bind(this, this.onRender)
	};
	if (this.proxy) {
		d.proxy = this.proxy;
	}
	this.h2c(doe, d);
};
