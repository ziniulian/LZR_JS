/*************************************************
作者：子牛连
类名：HTML
说明：
创建日期：27-七月-2016 12:30:03
版本号：1.0
*************************************************/

LZR.load([
	"LZR"
], "LZR.HTML");
LZR.HTML = function (obj) {
	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.prototype.className_ = "LZR.HTML";
LZR.HTML.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML");

// LOG容器
LZR.HTML.logger = null;	/*as:Object*/

// 主域名
LZR.HTML.domain = "https://srv-lzrmain.193b.starter-ca-central-1.openshiftapps.com/";	/*as:string*/

// 构造器
LZR.HTML.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.HTML.prototype.init_.lzrClass_ = LZR.HTML;

// 对构造参数的特殊处理
LZR.HTML.prototype.hdObj_ = function (obj/*as:Object*/) {

};
LZR.HTML.prototype.hdObj_.lzrClass_ = LZR.HTML;

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
LZR.HTML.createLog.lzrClass_ = LZR.HTML;

// 覆盖LOG
LZR.HTML.log = function (memo/*as:string*/) {
	this.createLog();
	this.logger.innerHTML = memo;
};
LZR.HTML.log.lzrClass_ = LZR.HTML;

// 追加LOG
LZR.HTML.alog = function (memo/*as:string*/) {
	this.createLog();
	this.logger.innerHTML += memo;
	this.logger.innerHTML += "<br>";
};
LZR.HTML.alog.lzrClass_ = LZR.HTML;
