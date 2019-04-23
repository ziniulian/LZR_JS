/*************************************************
作者：子牛连
类名：Memo
说明：信息提示框
创建日期：28-三月-2019 9:11:12
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base.Doe"
], "LZR.HTML.Base.Doe.Memo");
LZR.HTML.Base.Doe.Memo = function (obj) {
	// DOM元素
	this.doe = null;	/*as:Object*/

	// 延时毫秒数
	this.timout = 3000;	/*as:int*/

	// 延时句柄
	this.tid = 0;	/*as:int*/

	// 标题缓存
	this.til = "";	/*as:string*/

	// 显示样式
	this.css = "";	/*as:string*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Doe.Memo.prototype.className_ = "LZR.HTML.Base.Doe.Memo";
LZR.HTML.Base.Doe.Memo.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Doe.Memo");

// 构造器
LZR.HTML.Base.Doe.Memo.prototype.init_ = function (obj/*as:Object*/) {
	this.exeHid = LZR.bind (this, this.hid);
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.HTML.Base.Doe.Memo.prototype.init_.lzrClass_ = LZR.HTML.Base.Doe.Memo;

// 对构造参数的特殊处理
LZR.HTML.Base.Doe.Memo.prototype.hdObj_ = function (obj/*as:Object*/) {

};
LZR.HTML.Base.Doe.Memo.prototype.hdObj_.lzrClass_ = LZR.HTML.Base.Doe.Memo;

// 显示信息
LZR.HTML.Base.Doe.Memo.prototype.show = function (msg/*as:string*/, t/*as:int*/) {
	if (this.tid) {
		clearTimeout(this.tid);
		this.tid = 0;
	}
	if (this.doe && msg) {
		this.doe.innerHTML = msg;
		if (this.css) {
			this.doe.className = this.css;
		}
		if (isNaN(t)) {
			t = this.timout;
		}
		if (t !== 0) {
			this.tid = setTimeout(this.exeHid, t);
		}
	}
};
LZR.HTML.Base.Doe.Memo.prototype.show.lzrClass_ = LZR.HTML.Base.Doe.Memo;

// 隐藏信息
LZR.HTML.Base.Doe.Memo.prototype.hid = function () {
	if (this.doe) {
		this.doe.innerHTML = "";
		if (this.css) {
			this.doe.className = "Lc_nosee";
		}
	}
	if (this.tid) {
		clearTimeout(this.tid);
		this.tid = 0;
	}
	if (this.til) {
		document.title = this.til;
		this.til = "";
	}
};
LZR.HTML.Base.Doe.Memo.prototype.hid.lzrClass_ = LZR.HTML.Base.Doe.Memo;

// 退出提醒
LZR.HTML.Base.Doe.Memo.prototype.exit = function (msg/*as:string*/, til/*as:string*/) {
	if (!this.til) {
		this.til = document.title;
		document.title = til;
		this.show(msg);
	}
};
LZR.HTML.Base.Doe.Memo.prototype.exit.lzrClass_ = LZR.HTML.Base.Doe.Memo;
