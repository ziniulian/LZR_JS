/*************************************************
作者：子牛连
类名：Div
说明：基础容器
创建日期：14-一月-2016 11:02:49
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML5.Base",
	"LZR.Base.Data",
	"LZR.HTML5.Base.DomEvent",
	"LZR.HTML5.Base.DomCss"
], "LZR.HTML5.Base.Div");
LZR.HTML5.Base.Div = function (obj) /*bases:LZR.Base.Data*/ {
	LZR.initSuper(this);

	// DOM元素
	this.dom = document.createElement("div");	/*as:Object*/

	// 数据
	this.data = new LZR.Base.Data();	/*as:LZR.Base.Data*/

	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML5.Base.Div.prototype = LZR.clone (LZR.Base.Data.prototype, LZR.HTML5.Base.Div.prototype);
LZR.HTML5.Base.Div.prototype.super_ = [LZR.Base.Data];
LZR.HTML5.Base.Div.prototype.className_ = "LZR.HTML5.Base.Div";
LZR.HTML5.Base.Div.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML5.Base.Div");

// DOM事件
LZR.HTML5.Base.Div.prototype.domEvent = new LZR.HTML5.Base.DomEvent();	/*as:LZR.HTML5.Base.DomEvent*/

// DOM CSS样式
LZR.HTML5.Base.Div.prototype.domCss = new LZR.HTML5.Base.DomCss();	/*as:LZR.HTML5.Base.DomCss*/

// 构造器
LZR.HTML5.Base.Div.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
	}
};

// 添加子数据
LZR.HTML5.Base.Div.prototype.append = function (sub/*as:LZR.Base.Data*/, id/*as:string*/) {
	this.super_[0].prototype.append.call(this, sub, id);
	this.dom.appendChild(sub.dom);
};

// 删除子数据
LZR.HTML5.Base.Div.prototype.del = function (id/*as:string*/)/*as:Object*/ {
	var sub = this.super_[0].prototype.del.call(this, id);
	this.dom.removeChild(sub);
	return sub;
};

// 添加CSS样式
LZR.HTML5.Base.Div.prototype.appendCss = function (cssName/*as:string*/) {
	this.domCss.appendCss(this.dom, cssName);
};

// 移除CSS样式
LZR.HTML5.Base.Div.prototype.removeCss = function (cssName/*as:string*/) {
	this.domCss.removeCss(this.dom, cssName);
};

// 添加事件
LZR.HTML5.Base.Div.prototype.appendEvent = function (eventName/*as:string*/, callback/*as:fun*/, useCapture/*as:boolean*/) {
	this.domEvent.appendEvent(this.dom, eventName, callback, useCapture);
};

// 移除事件
LZR.HTML5.Base.Div.prototype.removeEvent = function (eventName/*as:string*/, callback/*as:fun*/, useCapture/*as:boolean*/) {
	this.domEvent.appendEvent(this.dom, eventName, callback, useCapture);
};

// 移除滚轮事件
LZR.HTML5.Base.Div.prototype.appendWheel = function (callback/*as:fun*/, useCapture/*as:boolean*/) {
	this.domEvent.appendWheel(this.dom, eventName, callback, useCapture);
};

// 移除滚轮事件
LZR.HTML5.Base.Div.prototype.removeWheel = function (callback/*as:fun*/, useCapture/*as:boolean*/) {
	this.domEvent.removeWheel(this.dom, eventName, callback, useCapture);
};

// 获取DOM元素在document中的位置
LZR.HTML5.Base.Div.prototype.getPositionInDocument = function (dom/*as:Object*/)/*as:Object*/ {
	if (!dom) {
		dom = this.dom;
	}

	var p = {
		left:0,
		top:0,
		width:0,
		height:0
	};

	if (obj === document) {
		p.left = 0;
		p.top = 0;
		p.width = window.innerWidth;
		p.height = window.innerHeight;
	} else {
		var d, box = obj.getBoundingClientRect();
		p.width = box.right - box.left;
		p.height = box.bottom - box.top;
		if (window.pageXOffset !== undefined) {
			d = obj.ownerDocument.documentElement;
			p.left = box.left - d.clientLeft + window.pageXOffset;
			p.top = box.top - d.clientTop + window.pageYOffset;
		} else {
			// IE 浏览器
			d = obj.ownerDocument.body;
			p.left = box.left - d.clientLeft + (d.scrollLeft || obj.ownerDocument.documentElement.scrollLeft);
			p.top = box.top - d.clientTop + (d.scrollTop || obj.ownerDocument.documentElement.scrollTop);
		}
	}

	return p;
};