/*************************************************
作者：子牛连
类名：Util
说明：工具包
创建日期：11-三月-2016 13:40:35
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

// 对构造参数的特殊处理
LZR.Util.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};

// 闭包调用
LZR.Util.prototype.bind = function (self/*as:Object*/, fun/*as:fun*/, args/*as:___*/)/*as:fun*/ {
	var arg = Array.prototype.slice.call ( arguments, 2 );
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

// 调用父类方法
LZR.Util.prototype.supCall = function (self/*as:Object*/, idx/*as:int*/, funam/*as:string*/, args/*as:___*/)/*as:Object*/ {
	var arg = Array.prototype.slice.call(arguments, 3);

	// 检查最后一个参数值
// console.log (arguments);
	var last = arguments.callee.caller.arguments;
// console.log (last);
	last = last[last.length - 1];
// console.log (last);

	// 确定父类
	var s;
	if (last && last.lzrGeneralization_) {
// console.log (last.lzrGeneralization_.prototype.className_);
		s = last.lzrGeneralization_.prototype.super_;
	} else {
		s = self.super_;
	}

	var f = s[idx].prototype[funam];		// 父类函数
	var n = f.length;	// 函数的形参个数

	// 填充不完整的参数
	while (arg.length < n) {
// console.log (arg.length + " : " + n);
		arg.push(undefined);
	}

	// 填充特殊的继承参数
	arg.push({
		lzrGeneralization_: s[idx]
	});
// console.log (arg);

	// 执行父类函数
	return f.apply ( self, arg );
};

// 判断一个对象的属性是否存在
LZR.Util.prototype.exist = function (obj/*as:Object*/, pro/*as:string*/)/*as:Object*/ {
	var ps = pro.split(".");
	for (var i = 0; i<ps.length; i++) {
		if (undefined === obj || null === obj) {
			return undefined;
		}
		obj = obj[ps[i]];
	}
	return obj;
};

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
