/*************************************************
作者：子牛连
类名：CallBacks
说明：回调函数集合
创建日期：27-七月-2016 12:30:02
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base",
	"LZR.Base.Str",
	"LZR.Base.CallBacks.CallBack",
	"LZR.Util"
], "LZR.Base.CallBacks");
LZR.Base.CallBacks = function (obj) {
	// 是否触发事件
	this.enableEvent = true;	/*as:boolean*/

	// 事件自动恢复
	this.autoEvent = true;	/*as:boolean*/

	// 调用对象
	this.obj = this;	/*as:Object*/

	// 回调函数个数
	this.count = 0;	/*as:int*/

	// 自身回调
	this.exe = null;	/*as:fun*/

	// 唯一ID
	this.id = 0;	/*as:int*/

	// 回调函数集合
	this.funs/*m*/ = {};	/*as:LZR.Base.CallBacks.CallBack*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Base.CallBacks.prototype.className_ = "LZR.Base.CallBacks";
LZR.Base.CallBacks.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.CallBacks");

// 构造器
LZR.Base.CallBacks.prototype.init_ = function (obj/*as:Object*/) {
	this.exe = LZR.bind (this, this.execute);
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Base.CallBacks.prototype.init_.lzrClass_ = LZR.Base.CallBacks;

// 对构造参数的特殊处理
LZR.Base.CallBacks.prototype.hdObj_ = function (obj/*as:Object*/) {

};
LZR.Base.CallBacks.prototype.hdObj_.lzrClass_ = LZR.Base.CallBacks;

// 添加回调函数
LZR.Base.CallBacks.prototype.add = function (fun/*as:fun*/, name/*as:LZR.Base.Str*/, self/*as:boolean*/)/*as:string*/ {
	if (name === undefined || name === null) {
		name = this.id;
	}
	this.id ++;
	if (this.funs[name] === undefined) {
		this.count ++;
	}
	var o = {
		name: name,
		fun: fun
	};
	if (self === true) {
		o.selfInfo = true;
	}
	this.funs[name] = new LZR.Base.CallBacks.CallBack (o);
	return name;
};
LZR.Base.CallBacks.prototype.add.lzrClass_ = LZR.Base.CallBacks;

// 删除回调函数
LZR.Base.CallBacks.prototype.del = function (name/*as:LZR.Base.Str*/)/*as:LZR.Base.CallBacks.CallBack*/ {
	var r = this.funs[name];
	if (r !== undefined) {
		LZR.del(this.funs, name);
		this.count --;
	}
	return r;
};
LZR.Base.CallBacks.prototype.del.lzrClass_ = LZR.Base.CallBacks;

// 执行回调函数
LZR.Base.CallBacks.prototype.execute = function ()/*as:boolean*/ {
	var b = true;	// 回调函数正常执行则返回 true，否则返回 false
	if (this.enableEvent) {
		for (var s in this.funs) {
			switch (s) {
				case "length":
					break;
				default:
					if (this.funs[s].enableEvent) {
						var arg;
						if (this.funs[s].selfInfo) {
							arg = Array.prototype.slice.call ( arguments );
							arg.push({
								id: "selfInfo",
								root: this,
								parent: this.funs,
								self: this.funs[s],
								nam: this.funs[s].name
							});
						} else {
							arg = arguments;
						}
						if ( (this.funs[s].fun.apply ( this.obj, arg )) === false ) {
							b = false;
						}
					} else {
						this.funs[s].enableEvent = this.funs[s].autoEvent;
					}
					break;
			}
		}
	} else {
		this.enableEvent = this.autoEvent;
	}
	return b;
};
LZR.Base.CallBacks.prototype.execute.lzrClass_ = LZR.Base.CallBacks;
