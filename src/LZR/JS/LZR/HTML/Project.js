/*************************************************
作者：子牛连
类名：Project
说明：项目
创建日期：11-三月-2016 13:58:04
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
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.HTML.Project.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
