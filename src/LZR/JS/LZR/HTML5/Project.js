/*************************************************
作者：子牛连
类名：Project
说明：项目
创建日期：14-一月-2016 11:02:50
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML5"
], "LZR.HTML5.Project");
LZR.HTML5.Project = function (obj) {
	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML5.Project.prototype.className_ = "LZR.HTML5.Project";
LZR.HTML5.Project.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML5.Project");

// 构造器
LZR.HTML5.Project.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
	}
};