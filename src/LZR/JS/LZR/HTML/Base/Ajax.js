/*************************************************
作者：子牛连
类名：Ajax
说明：
创建日期：17-三月-2016 14:09:15
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base",
	"LZR.Base.Json",
	"LZR.Util",
	"LZR.Base.CallBacks",
	"LZR.Base.InfEvt"
], "LZR.HTML.Base.Ajax");
LZR.HTML.Base.Ajax = function (obj) /*interfaces:LZR.Base.InfEvt*/ {
	LZR.Base.InfEvt.call(this);

	// AJAX对象
	this.ajax = LZR.getAjax();	/*as:Object*/

	// Json转换工具
	this.utJson/*m*/ = LZR.getSingleton(LZR.Base.Json);	/*as:LZR.Base.Json*/

	// 常用工具
	this.utLzr/*m*/ = LZR.getSingleton(LZR.Util);	/*as:LZR.Util*/

	// Ajax应答
	this.evt.rsp/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ajax.prototype = LZR.clone (LZR.Base.InfEvt.prototype, LZR.HTML.Base.Ajax.prototype);
LZR.HTML.Base.Ajax.prototype.className_ = "LZR.HTML.Base.Ajax";
LZR.HTML.Base.Ajax.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ajax");

// 构造器
LZR.HTML.Base.Ajax.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.HTML.Base.Ajax.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};

// 发送POST请求
LZR.HTML.Base.Ajax.prototype.post = function (url/*as:string*/, msg/*as:Object*/, msgType/*as:string*/, isAsyn/*as:boolean*/, isGet/*as:boolean*/)/*as:string*/ {
	if ( isAsyn ) {
		this.ajax.onreadystatechange = this.utLzr.bind ( this,  this.asynCallback );
		isAsyn = true;
	} else {
		isAsyn = false;
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
			ms += this.utJson.toJson ( msg[n] );
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
		if (isAsyn) {
			// this.evt.rsp.execute (null);
		}
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
LZR.HTML.Base.Ajax.prototype.get = function (url/*as:string*/, isAsyn/*as:boolean*/)/*as:string*/ {
	return this.post ( url, null, null, isAsyn, true );
};

// 异步POST请求
LZR.HTML.Base.Ajax.prototype.asynPost = function (url/*as:string*/, msg/*as:Object*/, msgType/*as:string*/) {
	this.post ( url, msg, msgType, true, false );
};

// 异步回调
LZR.HTML.Base.Ajax.prototype.asynCallback = function () {
	if ( this.ajax.readyState == 4 ) {
		this.evt.rsp.execute (this.ajax.responseText, this.ajax.status);
	}
};

// 取消请求
LZR.HTML.Base.Ajax.prototype.abort = function () {
	this.ajax.abort();
};
