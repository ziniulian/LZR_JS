/*************************************************
作者：子牛连
类名：Project
说明：项目
创建日期：08-三月-2016 11:24:23
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML"
], "LZR.HTML.Project");
LZR.HTML.Project = function (obj) {
	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Project.prototype.className_ = "LZR.HTML.Project";
LZR.HTML.Project.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Project");

// 构造器
LZR.HTML.Project.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
	}
};