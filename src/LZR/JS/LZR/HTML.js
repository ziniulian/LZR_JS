/*************************************************
作者：子牛连
类名：HTML
说明：
创建日期：11-三月-2016 13:43:56
版本号：1.0
*************************************************/

LZR.load([
	"LZR"
], "LZR.HTML");
LZR.HTML = function (obj) {
	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.prototype.className_ = "LZR.HTML";
LZR.HTML.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML");

// LOG容器
LZR.HTML.logger = null;	/*as:Object*/

// 构造器
LZR.HTML.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.HTML.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};

// 创建LOG
LZR.HTML.createLog = function () {
	if (!this.logger) {
		this.logger = document.getElementById("LZR_LOG");
		if (!this.logger) {
			this.logger = document.createElement( "pre" );
			this.logger.id = "LZR_LOG";
			if (document.body.children.length) {
				document.body.insertBefore(this.logger, document.body.children[0]);
			} else {
				document.body.appendChild(this.logger);
			}
		}
	}
};

// 覆盖LOG
LZR.HTML.log = function (memo/*as:string*/) {
	this.createLog();
	this.logger.innerHTML = memo;
};

// 追加LOG
LZR.HTML.alog = function (memo/*as:string*/) {
	this.createLog();
	this.logger.innerHTML += memo;
	this.logger.innerHTML += "<br>";
};
