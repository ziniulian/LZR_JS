/*************************************************
作者：子牛连
类名：Result
说明：返回结果
创建日期：20-九月-2017 15:23:02
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Node.Srv"
], "LZR.Node.Srv.Result");
LZR.Node.Srv.Result = function (obj) {
	// 状态
	this.ok = false;	/*as:boolean*/

	// 返回值
	this.dat = null;	/*as:Object*/

	// 消息
	this.msg = "";	/*as:string*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Node.Srv.Result.prototype.className_ = "LZR.Node.Srv.Result";
LZR.Node.Srv.Result.prototype.version_ = "1.0";

LZR.load(null, "LZR.Node.Srv.Result");

// 返回符合类型规格的结果
LZR.Node.Srv.Result.get = function (dat/*as:Object*/, msg/*as:string*/, ok/*as:boolean*/)/*as:Object*/ {
	var r = {
		ok: dat ? true : false,
		dat: dat,
		msg: ""
	};
	if (ok !== undefined) {
		r.ok = ok;
	}
	if (msg) {
		r.msg = msg;
	}
	return r;
};
LZR.Node.Srv.Result.get.lzrClass_ = LZR.Node.Srv.Result;

// 构造器
LZR.Node.Srv.Result.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Node.Srv.Result.prototype.init_.lzrClass_ = LZR.Node.Srv.Result;

// 对构造参数的特殊处理
LZR.Node.Srv.Result.prototype.hdObj_ = function (obj/*as:Object*/) {

};
LZR.Node.Srv.Result.prototype.hdObj_.lzrClass_ = LZR.Node.Srv.Result;

// 返回结果
LZR.Node.Srv.Result.prototype.get = function ()/*as:Object*/ {
	return {
		ok: this.ok,
		dat: this.dat,
		msg: this.msg
	};
};
LZR.Node.Srv.Result.prototype.get.lzrClass_ = LZR.Node.Srv.Result;
