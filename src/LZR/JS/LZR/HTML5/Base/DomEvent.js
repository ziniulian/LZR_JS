/*************************************************
作者：子牛连
类名：DomEvent
说明：DOM元素事件
创建日期：14-一月-2016 11:02:49
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML5.Base"
], "LZR.HTML5.Base.DomEvent");
LZR.HTML5.Base.DomEvent = function (obj) {
	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML5.Base.DomEvent.prototype.className_ = "LZR.HTML5.Base.DomEvent";
LZR.HTML5.Base.DomEvent.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML5.Base.DomEvent");

// 构造器
LZR.HTML5.Base.DomEvent.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
	}
};

// 获取事件
LZR.HTML5.Base.DomEvent.prototype.getEvent = function (e/*as:Object*/)/*as:Object*/ {
	return window.event || e;
};

// 获取触发事件的DOM对象
LZR.HTML5.Base.DomEvent.prototype.getEventTarg = function (e/*as:Object*/)/*as:Object*/ {
	return window.event.srcElement || e.target;
};

// 阻止默认事件的执行
LZR.HTML5.Base.DomEvent.prototype.stopDefault = function (e/*as:Object*/) {
	if ( e && e.preventDefault ) {
		e.preventDefault();
	} else {
		// IE 浏览器
		window.event.returnValue = false;
	}
};

// 阻止事件冒泡
LZR.HTML5.Base.DomEvent.prototype.stopBubble = function (e/*as:Object*/) {
	if (e && e.stopPropagation)  {
		e.stopPropagation();
	} else {
		// IE 浏览器
		window.event.cancelBubble=true;
	}
};

// 获取鼠标位置
LZR.HTML5.Base.DomEvent.prototype.getMousePosition = function (e/*as:Object*/)/*as:Object*/ {
	if (e.pageX || e.pageY){
		return {x: e.pageX, y: e.pageY};
	} else {
		// IE 浏览器
		return {
			x: window.event.clientX + document.body.scrollLeft - document.body.clientLeft,
			y: window.event.clientY + document.body.scrollTop - document.body.clientTop
		};
	}
};

// 添加一个DOM事件
LZR.HTML5.Base.DomEvent.prototype.appendEvent = function (obj/*as:Object*/, eventName/*as:string*/, callback/*as:fun*/, useCapture/*as:boolean*/)/*as:fun*/ {
	if(obj.dispatchEvent){
		obj.addEventListener(type, callback, useCapture  );
	} else {
		// IE 浏览器
		obj.attachEvent( "on"+type, callback);
	}
	return callback;
};

// 移除一个DOM事件
LZR.HTML5.Base.DomEvent.prototype.removeEvent = function (obj/*as:Object*/, eventName/*as:string*/, callback/*as:fun*/, useCapture/*as:boolean*/) {
	if(obj.dispatchEvent){
		obj.removeEventListener(type, callback, useCapture  );
	} else {
		// IE 浏览器
		obj.detachEvent( "on"+type, callback);
	}
};

// 添加一个滚轮事件
LZR.HTML5.Base.DomEvent.prototype.appendWheel = function (obj/*as:Object*/, callback/*as:fun*/, useCapture/*as:boolean*/)/*as:fun*/ {
	var wheelType = "mousewheel";
	try {
		document.createEvent("MouseScrollEvents");
		wheelType = "DOMMouseScroll";			// 火狐浏览器私有类型
	} catch(e) {}

	return this.appendEvent(obj, wheelType, function(e){
		var event = this.getEvent(e);
		if ("wheelDelta" in event){

			//统一为±120，其中正数表示为向上滚动，负数表示向下滚动
			var delta = event.wheelDelta;

			//opera 9x系列的滚动方向与IE保持一致，10后修正
			if( window.opera && opera.version() < 10 ) delta = -delta;

			//由于事件对象的原有属性是只读，我们只能通过添加一个私有属性delta来解决兼容问题
			event.delta = Math.round(delta) /120; //修正safari的浮点 bug

		} else if ("detail" in event ) {
			//为火狐添加更大众化的wheelDelta
			event.wheelDelta = -event.detail * 40;

			//添加私有的delta
			event.delta = event.wheelDelta /120;
		}

		// callback.call(obj,event);	// 修正this指向
		callback(event);
	}, useCapture);
};

// 移除一个滚轮事件
LZR.HTML5.Base.DomEvent.prototype.removeWheel = function (obj/*as:Object*/, callback/*as:fun*/, useCapture/*as:boolean*/) {
	var wheelType = "mousewheel";
	try {
		document.createEvent("MouseScrollEvents");
		wheelType = "DOMMouseScroll";			// 火狐浏览器私有类型
	} catch(e) {}

	this.removeEvent(obj, wheelType, callback, useCapture);
};