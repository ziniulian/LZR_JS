/*************************************************
作者：子牛连
类名：Evt
说明：事件
创建日期：27-七月-2016 12:30:03
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Util",
	"LZR.HTML.Util.DomTool"
], "LZR.HTML.Util.Evt");
LZR.HTML.Util.Evt = function (obj) {
	// 元素工具
	this.utDt/*m*/ = LZR.getSingleton(LZR.HTML.Util.DomTool);	/*as:LZR.HTML.Util.DomTool*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Util.Evt.prototype.className_ = "LZR.HTML.Util.Evt";
LZR.HTML.Util.Evt.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Util.Evt");

// 鼠标按键状态常量
LZR.HTML.Util.Evt.prototype.MouseStat = {nan: 0, lk: 1, rk: 2, mid: 4, touch:128};	/*as:Object*/

// 构造器
LZR.HTML.Util.Evt.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.HTML.Util.Evt.prototype.init_.lzrClass_ = LZR.HTML.Util.Evt;

// 对构造参数的特殊处理
LZR.HTML.Util.Evt.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.HTML.Util.Evt.prototype.hdObj_.lzrClass_ = LZR.HTML.Util.Evt;

// 获取事件
LZR.HTML.Util.Evt.prototype.getEvent = function (e/*as:Object*/)/*as:Object*/ {
	return window.event || e;
};
LZR.HTML.Util.Evt.prototype.getEvent.lzrClass_ = LZR.HTML.Util.Evt;

// 获取触发事件的DOM对象
LZR.HTML.Util.Evt.prototype.getEventTarg = function (e/*as:Object*/)/*as:Object*/ {
	e = this.getEvent(e);
	return e.srcElement || e.target;
};
LZR.HTML.Util.Evt.prototype.getEventTarg.lzrClass_ = LZR.HTML.Util.Evt;

// 阻止默认事件的执行
LZR.HTML.Util.Evt.prototype.stopDefault = function (e/*as:Object*/) {
	if ( e && e.preventDefault ) {
		e.preventDefault();
	} else {
		// IE 浏览器
		window.event.returnValue = false;
	}
};
LZR.HTML.Util.Evt.prototype.stopDefault.lzrClass_ = LZR.HTML.Util.Evt;

// 阻止事件冒泡
LZR.HTML.Util.Evt.prototype.stopBubble = function (e/*as:Object*/) {
	if (e && e.stopPropagation)  {
		e.stopPropagation();
	} else {
		// IE 浏览器
		window.event.cancelBubble=true;
	}
};
LZR.HTML.Util.Evt.prototype.stopBubble.lzrClass_ = LZR.HTML.Util.Evt;

// 获取鼠标位置
LZR.HTML.Util.Evt.prototype.getMousePosition = function (e/*as:Object*/)/*as:Object*/ {
	if (!isNaN(e.pageX) || !isNaN(e.pageY)) {
		return {x: e.pageX, y: e.pageY};
	} else {
		// IE 浏览器
		var dm = this.utDt.getDocument(this.getEventTarg(e));
		return {
			x: window.event.clientX + dm.documentElement.scrollLeft - dm.documentElement.clientLeft,
			y: window.event.clientY + dm.documentElement.scrollTop - dm.documentElement.clientTop
		};
	}
};
LZR.HTML.Util.Evt.prototype.getMousePosition.lzrClass_ = LZR.HTML.Util.Evt;

// 解析鼠标按键状态
LZR.HTML.Util.Evt.prototype.parseMouseKey = function (evt/*as:Object*/)/*as:string*/ {
	var e = this.getEvent(evt);
	var en = LZR.getClassName(e);
	var k;
	switch (en) {
		case "TouchEvent":
			return "touch";
			break;
		case "MouseEvent":
			k = this.getEvent(evt).button;
			if ("\v" != "v") {
				// 非 IE 6、7、8 版 rotate
				switch (k) {
					case 0:
						k = this.MouseStat.lk;
						break;
					case 1:
						k = this.MouseStat.mid;
						break;
				}
			}
			switch (k) {
				case this.MouseStat.lk:
					return "lk";
				case this.MouseStat.rk:
					return "rk";
				case this.MouseStat.mid:
					return "mid";
				default:
					return "nan";
			}
			break;
		default:
			return "nan";
			break;
	}
};
LZR.HTML.Util.Evt.prototype.parseMouseKey.lzrClass_ = LZR.HTML.Util.Evt;

// 添加一个DOM事件
LZR.HTML.Util.Evt.prototype.addEvt = function (obj/*as:Object*/, eventName/*as:string*/, callback/*as:fun*/, useCapture/*as:boolean*/)/*as:fun*/ {
	if(obj.dispatchEvent){
		obj.addEventListener(eventName, callback, useCapture  );
	} else {
		// IE 浏览器
		obj.attachEvent( "on"+eventName, callback);
	}
	return callback;
};
LZR.HTML.Util.Evt.prototype.addEvt.lzrClass_ = LZR.HTML.Util.Evt;

// 移除一个DOM事件
LZR.HTML.Util.Evt.prototype.delEvt = function (obj/*as:Object*/, eventName/*as:string*/, callback/*as:fun*/, useCapture/*as:boolean*/) {
	if(obj.dispatchEvent){
		obj.removeEventListener(eventName, callback, useCapture  );
	} else {
		// IE 浏览器
		obj.detachEvent( "on"+eventName, callback);
	}
};
LZR.HTML.Util.Evt.prototype.delEvt.lzrClass_ = LZR.HTML.Util.Evt;

// 添加一个滚轮事件
LZR.HTML.Util.Evt.prototype.addWheel = function (obj/*as:Object*/, callback/*as:fun*/, useCapture/*as:boolean*/)/*as:fun*/ {
	var wheelType = "mousewheel";
	var dm = this.utDt.getDocument(obj);
	try {
		dm.createEvent("MouseScrollEvents");
		wheelType = "DOMMouseScroll";			// 火狐浏览器私有类型
	} catch(e) {}

	var self = this;
	return this.addEvt(obj, wheelType, function(e){
		var event = self.getEvent(e);
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
LZR.HTML.Util.Evt.prototype.addWheel.lzrClass_ = LZR.HTML.Util.Evt;

// 移除一个滚轮事件
LZR.HTML.Util.Evt.prototype.delWheel = function (obj/*as:Object*/, callback/*as:fun*/, useCapture/*as:boolean*/) {
	var wheelType = "mousewheel";
	var dm = this.utDt.getDocument(obj);
	try {
		dm.createEvent("MouseScrollEvents");
		wheelType = "DOMMouseScroll";		// 火狐浏览器私有类型
	} catch(e) {}

	this.delEvt(obj, wheelType, callback, useCapture);
};
LZR.HTML.Util.Evt.prototype.delWheel.lzrClass_ = LZR.HTML.Util.Evt;

// 触发事件
LZR.HTML.Util.Evt.prototype.trigger = function (doe/*as:Object*/, evtNam/*as:string*/) {
	var evt;
	var dm = this.utDt.getDocument(doe);
	if (dm.createEventObject){
		// dispatch for IE
		evt = dm.createEventObject();
		doe.fireEvent("on"+evtNam,evt);
	} else {
		// dispatch for firefox + others
		evt = dm.createEvent("HTMLEvents");
		evt.initEvent(evtNam, true, true );	// event name, bubbling, cancelable
		doe.dispatchEvent(evt);
	}
};
LZR.HTML.Util.Evt.prototype.trigger.lzrClass_ = LZR.HTML.Util.Evt;