/*************************************************
作者：子牛连
类名：HTML5
说明：
创建日期：14-一月-2016 11:02:49
版本号：1.0
*************************************************/

LZR.load([
	"LZR"
], "LZR.HTML5");
LZR.HTML5 = function (obj) {
	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML5.prototype.className_ = "LZR.HTML5";
LZR.HTML5.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML5");

// LOG容器
LZR.HTML5.logger = null;	/*as:Object*/

// 构造器
LZR.HTML5.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
	}
};

// 创建LOG
LZR.HTML5.createLog = function () {
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
LZR.HTML5.log = function (memo/*as:string*/) {
	this.createLog();
	this.logger.innerHTML = memo;
};

// 追加LOG
LZR.HTML5.alog = function (memo/*as:string*/) {
	this.createLog();
	this.logger.innerHTML += memo;
	this.logger.innerHTML += "<br>";
};