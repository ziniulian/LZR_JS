/*************************************************
作者：子牛连
类名：DomCss
说明：DOM元素样式
创建日期：08-三月-2016 11:24:23
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base"
], "LZR.HTML.Base.DomCss");
LZR.HTML.Base.DomCss = function (obj) {
	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.DomCss.prototype.className_ = "LZR.HTML.Base.DomCss";
LZR.HTML.Base.DomCss.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.DomCss");

// 构造器
LZR.HTML.Base.DomCss.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
	}
};

// 添加一个CSS样式
LZR.HTML.Base.DomCss.prototype.appendCss = function (dom/*as:Object*/, css/*as:string*/) {
	var s = css.split(" ");
	for (var i=0; i<s.length; i++) {
		if (!dom.className.match(s[i])) {
			dom.className += " " + s[i];
		}
	}
};

// 移除一个CSS样式
LZR.HTML.Base.DomCss.prototype.removeCss = function (dom/*as:Object*/, css/*as:string*/) {
	var s = css.split(" ");
	for (var i=0; i<s.length; i++) {
		if (dom.className.match(s[i])) {
			dom.className = obj.className.replace(s[i], " ").replace("  ", "");
		}
	}
};