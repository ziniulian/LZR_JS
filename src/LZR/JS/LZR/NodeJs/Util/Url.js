/*************************************************
作者：子牛连
类名：Url
说明：对URL路径的处理工具
创建日期：27-七月-2016 12:30:04
版本号：1.0
*************************************************/

LZR.load([
	"LZR.NodeJs.Util"
], "LZR.NodeJs.Util.Url");
LZR.NodeJs.Util.Url = function (obj) {
	// Nodejs的 URL 模块
	this.url = LZR.getSingleton (null, null, "url");	/*as:Object*/

	// Nodejs的参数解析模块
	this.qry = LZR.getSingleton (null, null, "querystring");	/*as:Object*/

	// Nodejs的路径工具模块
	this.path = LZR.getSingleton (null, null, "path");	/*as:Object*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.NodeJs.Util.Url.prototype.className_ = "LZR.NodeJs.Util.Url";
LZR.NodeJs.Util.Url.prototype.version_ = "1.0";

LZR.load(null, "LZR.NodeJs.Util.Url");

// 获取不带域名和参数的URI路径
LZR.NodeJs.Util.Url.prototype.getUri = function (req/*as:Object*/)/*as:string*/ {
	return decodeURIComponent ( this.parseUrl(req).pathname );
};
LZR.NodeJs.Util.Url.prototype.getUri.lzrClass_ = LZR.NodeJs.Util.Url;

// 获取GET参数
LZR.NodeJs.Util.Url.prototype.getParamGet = function (req/*as:Object*/)/*as:string*/ {
	var dat = this.parseUrl(req).query;
	return this.qry.parse(dat);
};
LZR.NodeJs.Util.Url.prototype.getParamGet.lzrClass_ = LZR.NodeJs.Util.Url;

// 获取POST参数
LZR.NodeJs.Util.Url.prototype.getParamPost = function (req/*as:Object*/, rsp/*as:Object*/, callback/*as:Object*/) {
	if (req.method == "POST") {
		this.getParam (req, rsp, callback);
	} else {
		callback (req, rsp, {});
	}
};
LZR.NodeJs.Util.Url.prototype.getParamPost.lzrClass_ = LZR.NodeJs.Util.Url;

// 获取域名
LZR.NodeJs.Util.Url.prototype.getDomain = function (req/*as:Object*/)/*as:string*/ {
	return decodeURIComponent ( this.parseUrl(req).hostname );
};
LZR.NodeJs.Util.Url.prototype.getDomain.lzrClass_ = LZR.NodeJs.Util.Url;

// 获取GET或POST形式的参数
LZR.NodeJs.Util.Url.prototype.getParam = function (req/*as:Object*/, rsp/*as:Object*/, callback/*as:Object*/) {
	var postData = "";

	// 执行回调函数
	var cb = function () {
		callback (req, rsp, this.qry.parse(postData));
	};

	if (req.method == "GET") {
		postData = this.parseUrl(req).query;
		cb();
	} else if (req.method == "POST") {
		// 设置接收数据编码格式为 UTF-8
		req.setEncoding("utf8");

		// 因为nodejs在处理post数据的时候，会将数据分成小包来序列处理。所以必须监听每一个数据小包的结果
		req.addListener("data", function (postDataChunk) {
			postData += postDataChunk;
		});
 
		// 所有数据包接收完毕
		req.addListener("end", cb);
	}
};
LZR.NodeJs.Util.Url.prototype.getParam.lzrClass_ = LZR.NodeJs.Util.Url;

// 解析URL
LZR.NodeJs.Util.Url.prototype.parseUrl = function (req/*as:Object*/)/*as:Object*/ {
	return this.url.parse(req.url);
};
LZR.NodeJs.Util.Url.prototype.parseUrl.lzrClass_ = LZR.NodeJs.Util.Url;

// 获取URI的物理路径
LZR.NodeJs.Util.Url.prototype.getPath = function (uri/*as:string*/, dir/*as:string*/)/*as:string*/ {
	if (!dir) {
		dir = process.cwd();
	}
	return this.path.join(dir, uri);
};
LZR.NodeJs.Util.Url.prototype.getPath.lzrClass_ = LZR.NodeJs.Util.Url;

// 构造器
LZR.NodeJs.Util.Url.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.NodeJs.Util.Url.prototype.init_.lzrClass_ = LZR.NodeJs.Util.Url;

// 对构造参数的特殊处理
LZR.NodeJs.Util.Url.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.NodeJs.Util.Url.prototype.hdObj_.lzrClass_ = LZR.NodeJs.Util.Url;