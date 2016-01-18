/*************************************************
作者：子牛连
类名：Url
说明：URL
创建日期：14-一月-2016 11:02:50
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML5.Base"
], "LZR.HTML5.Base.Url");
LZR.HTML5.Base.Url = function (obj) {
	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML5.Base.Url.prototype.className_ = "LZR.HTML5.Base.Url";
LZR.HTML5.Base.Url.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML5.Base.Url");

// 构造器
LZR.HTML5.Base.Url.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
	}
};

// 相对路径转换为绝对路径
LZR.HTML5.Base.Url.prototype.toAbsURL = function (url/*as:string*/)/*as:string*/ {
	var directlink = function(url){
		var a = document.createElement ( "a" );
		a.href = url;
		return a.href;
	};
	if (directlink("") === "") {
		return directlink(url);
	} else {
		var div = document.createElement ( "div" );
		div.innerHTML = "<a href=\"" + url.replace(/"/g, "%22") + "\"/>";
		return div.firstChild.href;
	}
};

// 获取 URL 参数
LZR.HTML5.Base.Url.prototype.getRequest = function ()/*as:Object*/ {
	var url = location.search;
	var theRequest = {};
	if (url.indexOf("?") != -1) {
		url = url.substr(1).split("&");
		for(var i = 0; i < url.length; i ++) {
			var str = url[i].split("=");
			theRequest[str[0]] = unescape(str[1]);
		}
	}
	return theRequest;
};