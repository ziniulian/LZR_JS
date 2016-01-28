/*************************************************
作者：子牛连
类名：CallBacks
说明：回调函数集合
创建日期：28-一月-2016 17:59:25
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base",
	"LZR.Base.String",
	"LZR.Base.CallBacks.CallBack"
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

	// 函数集合
	this.funs/*m*/ = new LZR.Base.CallBacks.CallBack();	/*as:LZR.Base.CallBacks.CallBack*/

	if (obj && obj.super_) {
		this.init_();
	} else {
		this.init_(obj);
	}
};
LZR.Base.CallBacks.prototype.className_ = "LZR.Base.CallBacks";
LZR.Base.CallBacks.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.CallBacks");

// 添加回调函数
LZR.Base.CallBacks.prototype.append = function (fun/*as:fun*/, name/*as:string*/) {
	if (name === undefined || name === null) {
		name = this.count;
	}
	if (this.funs[name] === undefined) {
		this.count ++;
	}
	this.funs[name] = new LZR.Base.CallBacks.CallBack ({name: name, fun: fun});
};

// 删除回调函数
LZR.Base.CallBacks.prototype.del = function (name/*as:string*/) {
	if (this.funs[name] !== undefined) {
		this.funs[name] = undefined;
		this.count --;
	}
};

// 执行回调函数
LZR.Base.CallBacks.prototype.execute = function ()/*as:boolean*/ {
	if (this.enableEvent) {
		var b = true;	// 闁搞儳鍋犻惃鐔煎礄閼恒儲娈舵慨婵撶到閻栧爼骞嶈椤㈡垿宕氬▎鎺旂闁?true闁挎稑鑻幆渚€宕氬▎鎺旂闁?false
		for (var s in this.funs) {
			switch (s) {
				case "length":
					break;
				default:
					if (this.funs[s].enableEvent) {
						if ( (this.funs[s].fun.apply ( this.obj, arguments )) === false ) {
							b = false;
						}
					} else {
						this.funs[s].enableEvent = this.funs[s].autoEvent;
					}
					break;
			}
		}
		return b;
	} else {
		this.enableEvent = this.autoEvent;
		return false;
	}
};

// 构造器
LZR.Base.CallBacks.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		this.obj = obj;
	}
};