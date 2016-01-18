/*************************************************
作者：子牛连
类名：DomCss
说明：DOM元素样式
创建日期：14-一月-2016 11:02:49
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML5.Base"
], "LZR.HTML5.Base.DomCss");
LZR.HTML5.Base.DomCss = function (obj) {
	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML5.Base.DomCss.prototype.className_ = "LZR.HTML5.Base.DomCss";
LZR.HTML5.Base.DomCss.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML5.Base.DomCss");

// 构造器
LZR.HTML5.Base.DomCss.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
	}
};

// 添加一个CSS样式
LZR.HTML5.Base.DomCss.prototype.appendCss = function (dom/*as:Object*/, css/*as:string*/) {
	var s = css.split(" ");
	for (var i=0; i<s.length; i++) {
		if (!dom.className.match(s[i])) {
			dom.className += " " + s[i];
		}
	}
};

// 移除一个CSS样式
LZR.HTML5.Base.DomCss.prototype.removeCss = function (dom/*as:Object*/, css/*as:string*/) {
	var s = css.split(" ");
	for (var i=0; i<s.length; i++) {
		if (dom.className.match(s[i])) {
			dom.className = obj.className.replace(s[i], " ").replace("  ", "");
		}
	}
};