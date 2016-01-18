/*************************************************
作者：子牛连
类名：Ajax
说明：
创建日期：14-一月-2016 11:02:49
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML5.Base",
	"LZR.Base.Json"
], "LZR.HTML5.Base.Ajax");
LZR.HTML5.Base.Ajax = function (obj) {
	// AJAX对象
	this.ajax = this.getAjax();	/*as:Object*/

	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML5.Base.Ajax.prototype.className_ = "LZR.HTML5.Base.Ajax";
LZR.HTML5.Base.Ajax.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML5.Base.Ajax");

// 构造器
LZR.HTML5.Base.Ajax.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
	}
};

// 获得一个ajax对象
LZR.HTML5.Base.Ajax.prototype.getAjax = function ()/*as:Object*/ {
	var xmlHttp = null;
	try{
		xmlHttp = new XMLHttpRequest();
	} catch (MSIEx) {
		var activeX = [ "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP" ];
		for (var i=0; i < activeX.length; i++) {
			try {
				xmlHttp = new ActiveXObject( activeX[i] );
			} catch (e) {}
		}
	}
	return xmlHttp;
};

// 发送POST请求
LZR.HTML5.Base.Ajax.prototype.post = function (url/*as:string*/, msg/*as:Object*/, callback/*as:fun*/, msgType/*as:string*/, isGet/*as:boolean*/)/*as:string*/ {
	var isAsyn = false;
	if ( callback ) {
		isAsyn = true;
		this.ajax.onreadystatechange = LZR.bind ( this,  this.asynCallback, callback );
	}

	// 处理 msg
	if ( msg && typeof msg == "object" ) {
		var ms="";
		for (var n in msg) {
			if ("" !== ms) {
				ms += "&";
			}
			ms += n;
			ms += "=";
			ms += LZR.Base.Json.toJson ( msg[n] );
		}
		msg = ms;
	}

	// 发送请求
	try {
		if ( isGet ) {
			this.ajax.open("GET", url, isAsyn);
		} else {
			this.ajax.open("POST", url, isAsyn);
			if ( !msgType ) {
				msgType = "application/x-www-form-urlencoded; charset=utf-8";
			}
			this.ajax.setRequestHeader("Content-Type", msgType);
		}
		this.ajax.send(msg);
	} catch ( e ) {
		return null;
	}

	// 同步回调
	var s =  null;
	if ( !isAsyn && this.ajax.readyState == 4 ) {
		s = this.ajax.responseText;
		// this.ajax.close();
	}
	return s;
};

// 发送GET请求
LZR.HTML5.Base.Ajax.prototype.get = function (url/*as:string*/, callback/*as:fun*/)/*as:string*/ {
	return this.post ( url, null, callback, null, true );
};

// 异步回调
LZR.HTML5.Base.Ajax.prototype.asynCallback = function (callback/*as:fun*/) {
	if ( this.ajax.readyState == 4 ) {
		callback ( this.ajax.responseText,  this.ajax.status );
	}
};

// 取消请求
LZR.HTML5.Base.Ajax.prototype.abort = function () {
	this.ajax.abort();
};