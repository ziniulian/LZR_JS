/*************************************************
作者：子牛连
类名：Finger
说明：指纹
创建日期：26-五月-2017 16:05:06
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Util",
	"LZR.Base.Str"
], "LZR.HTML.Util.Finger");
LZR.HTML.Util.Finger = function (obj) {
	// 机器识别码
	this.uuid = "";	/*as:string*/

	// 字符串工具
	this.utStr/*m*/ = LZR.getSingleton(LZR.Base.Str);	/*as:LZR.Base.Str*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Util.Finger.prototype.className_ = "LZR.HTML.Util.Finger";
LZR.HTML.Util.Finger.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Util.Finger");

// 构造器
LZR.HTML.Util.Finger.prototype.init_ = function (obj/*as:Object*/) {
	this.uuid = this.crtByCanvas();

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.HTML.Util.Finger.prototype.init_.lzrClass_ = LZR.HTML.Util.Finger;

// 对构造参数的特殊处理
LZR.HTML.Util.Finger.prototype.hdObj_ = function (obj/*as:Object*/) {

};
LZR.HTML.Util.Finger.prototype.hdObj_.lzrClass_ = LZR.HTML.Util.Finger;

// 利用画布生成指纹
LZR.HTML.Util.Finger.prototype.crtByCanvas = function ()/*as:string*/ {
    var cav = document.createElement("canvas");
    var ctx = cav.getContext("2d");
    var txt = "ziniulian";

    ctx.textBaseline = "top";
    ctx.font = "bolder 30px Chiller";
    ctx.fillStyle = "#FF0";
    ctx.fillRect(6, 17, 85, 19);
    ctx.fillStyle = "#666";
    ctx.fillText(txt, 0, 0);
    ctx.fillStyle = "rgba(200, 200, 0, 0.6)";
    ctx.fillText(txt, 3, 3);

	var r = atob(cav.toDataURL().replace("data:image/png;base64,","")).slice(-16, -12);
    return this.utStr.bytes2Hex(r);
};
LZR.HTML.Util.Finger.prototype.crtByCanvas.lzrClass_ = LZR.HTML.Util.Finger;
