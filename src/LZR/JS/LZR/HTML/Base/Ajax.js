/*************************************************
作者：子牛连
类名：Ajax
说明：
创建日期：25-二月-2018 13:23:33
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base",
	"LZR.HTML.Util.Url",
	"LZR.Base.CallBacks",
	"LZR.Base.InfEvt"
], "LZR.HTML.Base.Ajax");
LZR.HTML.Base.Ajax = function (obj) /*interfaces:LZR.Base.InfEvt*/ {
	LZR.Base.InfEvt.call(this);

	// AJAX对象
	this.ajax = LZR.getAjax();	/*as:Object*/

	// URL工具
	this.utUrl/*m*/ = LZR.getSingleton(LZR.HTML.Util.Url);	/*as:LZR.HTML.Util.Url*/

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
LZR.HTML.Base.Ajax.prototype.init_.lzrClass_ = LZR.HTML.Base.Ajax;

// 对构造参数的特殊处理
LZR.HTML.Base.Ajax.prototype.hdObj_ = function (obj/*as:Object*/) {

};
LZR.HTML.Base.Ajax.prototype.hdObj_.lzrClass_ = LZR.HTML.Base.Ajax;

// 发送POST请求
LZR.HTML.Base.Ajax.prototype.post = function (url/*as:string*/, msg/*as:Object*/, msgType/*as:string*/, isAsyn/*as:boolean*/, isGet/*as:boolean*/)/*as:string*/ {
	if ( isAsyn ) {
		this.ajax.onreadystatechange = LZR.bind ( this,  this.onRsp );
		isAsyn = true;
	} else {
		isAsyn = false;
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
		this.ajax.send(this.utUrl.toPostDat(msg, true) || null);
	} catch ( e ) {
		if (isAsyn) {
			this.evt.rsp.execute (null, 404);
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
LZR.HTML.Base.Ajax.prototype.post.lzrClass_ = LZR.HTML.Base.Ajax;

// 发送GET请求
LZR.HTML.Base.Ajax.prototype.get = function (url/*as:string*/, isAsyn/*as:boolean*/)/*as:string*/ {
	return this.post ( url, null, null, isAsyn, true );
};
LZR.HTML.Base.Ajax.prototype.get.lzrClass_ = LZR.HTML.Base.Ajax;

// 异步POST请求
LZR.HTML.Base.Ajax.prototype.asynPost = function (url/*as:string*/, msg/*as:Object*/, msgType/*as:string*/) {
	this.post ( url, msg, msgType, true, false );
};
LZR.HTML.Base.Ajax.prototype.asynPost.lzrClass_ = LZR.HTML.Base.Ajax;

// Ajax应答触发的事件
LZR.HTML.Base.Ajax.prototype.onRsp = function (text/*as:string*/, status/*as:int*/) {
	if ( this.ajax.readyState == 4 ) {
		this.evt.rsp.execute (this.ajax.responseText, this.ajax.status);
	}
};
LZR.HTML.Base.Ajax.prototype.onRsp.lzrClass_ = LZR.HTML.Base.Ajax;

// 取消请求
LZR.HTML.Base.Ajax.prototype.abort = function () {
	this.ajax.abort();
};
LZR.HTML.Base.Ajax.prototype.abort.lzrClass_ = LZR.HTML.Base.Ajax;
