/*************************************************
作者：子牛连
类名：Util
说明：工具包
创建日期：27-七月-2016 12:30:04
版本号：1.0
*************************************************/

LZR.load([
	"LZR"
], "LZR.Util");
LZR.Util = function (obj) {
	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Util.prototype.className_ = "LZR.Util";
LZR.Util.prototype.version_ = "1.0";

LZR.load(null, "LZR.Util");

// 构造器
LZR.Util.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Util.prototype.init_.lzrClass_ = LZR.Util;

// 对构造参数的特殊处理
LZR.Util.prototype.hdObj_ = function (obj/*as:Object*/) {

};
LZR.Util.prototype.hdObj_.lzrClass_ = LZR.Util;

// 闭包调用
LZR.Util.prototype.bind = function (self/*as:Object*/, fun/*as:fun*/, args/*as:___*/)/*as:fun*/ {
	var arg = Array.prototype.slice.call(arguments, 2);
	return function () {
		var i, args = [];
		for ( i=0; i<arg.length; i++ ) {
			args.push ( arg[i] );
		}
		for ( i=0; i<arguments.length; i++ ) {
			args.push ( arguments[i] );
		}
		return fun.apply ( self, args );
	};
};
LZR.Util.prototype.bind.lzrClass_ = LZR.Util;

// 判断一个对象的属性是否存在
LZR.Util.prototype.exist = function (obj/*as:Object*/, pro/*as:string*/)/*as:Object*/ {
	return LZR.fillPro(obj, pro, true);
};
LZR.Util.prototype.exist.lzrClass_ = LZR.Util;

// 休眠函数
LZR.Util.prototype.sleep = function (numberMillis/*as:int*/) {
	var now = new Date();
	var exitTime = now.getTime() + numberMillis;
	while (true) {
		now = new Date();
		if (now.getTime() > exitTime) {
			return;
		}
	}
};
LZR.Util.prototype.sleep.lzrClass_ = LZR.Util;

// 调用父类方法
LZR.Util.prototype.supCall = function (self/*as:Object*/, idx/*as:int*/, funam/*as:string*/, args/*as:___*/)/*as:Object*/ {
	// 参数
	var arg = Array.prototype.slice.call(arguments, 3);

	// 确认父类
	var s = arguments.callee.caller.lzrClass_.prototype.super_;
// console.log (self.className_ + " ---> " + s[idx].prototype.className_);

	// 父类函数
	var f = s[idx].prototype[funam];

	// 执行父类函数
	return f.apply ( self, arg );
};
LZR.Util.prototype.supCall.lzrClass_ = LZR.Util;
