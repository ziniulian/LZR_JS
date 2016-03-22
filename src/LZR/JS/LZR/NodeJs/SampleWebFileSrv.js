/*************************************************
作者：子牛连
类名：SampleWebFileSrv
说明：简单的Web文件服务
创建日期：11-三月-2016 13:50:08
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Util",
	"LZR.NodeJs",
	"LZR.NodeJs.Util.Url",
	"LZR.NodeJs.InfHttpSrv",
	"LZR.NodeJs.Util.File"
], "LZR.NodeJs.SampleWebFileSrv");
LZR.NodeJs.SampleWebFileSrv = function (obj) /*interfaces:LZR.NodeJs.InfHttpSrv*/ {
	LZR.NodeJs.InfHttpSrv.call(this);

	// 起始文件夹路径
	this.path = null;	/*as:string*/

	// 路径前缀
	this.dir = null;	/*as:string*/

	// 允许 Ajax 跨域访问
	this.ajaxAllow = null;	/*as:string*/

	// URL工具
	this.utUrl/*m*/ = LZR.getSingleton(LZR.NodeJs.Util.Url);	/*as:LZR.NodeJs.Util.Url*/

	// 文件处理工具
	this.utFile/*m*/ = LZR.getSingleton(LZR.NodeJs.Util.File);	/*as:LZR.NodeJs.Util.File*/

	// 通用工具
	this.utLzr/*m*/ = LZR.getSingleton(LZR.Util);	/*as:LZR.Util*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.NodeJs.SampleWebFileSrv.prototype = LZR.clone (LZR.NodeJs.InfHttpSrv.prototype, LZR.NodeJs.SampleWebFileSrv.prototype);
LZR.NodeJs.SampleWebFileSrv.prototype.className_ = "LZR.NodeJs.SampleWebFileSrv";
LZR.NodeJs.SampleWebFileSrv.prototype.version_ = "1.0";

LZR.load(null, "LZR.NodeJs.SampleWebFileSrv");

// 构造器
LZR.NodeJs.SampleWebFileSrv.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.NodeJs.SampleWebFileSrv.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};

// 返回Web文件请求
LZR.NodeJs.SampleWebFileSrv.prototype.loadFile = function (filename/*as:string*/, rsp/*as:Object*/) {
	this.utFile.exists (filename, this.utLzr.bind (this, function (exists) {
// console.log(exists + " : " + filename);
		if (exists === 1) {
			this.utFile.readFile (filename, "binary", this.utLzr.bind (this, function (err, file) {
				if (err) {
					rsp.writeHeader (500, {"Content-Type":"text/plain;charset=utf-8"});
					rsp.write((err + "\n"), "utf-8");
					rsp.end();
				} else {
					var h = {};	// HTTP头内容
					if (this.ajaxAllow) {
						h["Access-Control-Allow-Origin"] = this.ajaxAllow;
					}
					h["Content-Type"] = "text/html; charset=utf-8";	// 文件格式； 字符编码
					// h["Content-Type"] = "image/jpeg; charset=utf-8";	// 图片
					// h["Content-Type"] = "x-world/x-vrml; charset=utf-8";	// vrml 3D模型
					rsp.writeHeader (200, h);
					rsp.write(file, "binary");
					rsp.end();
// console.log("OK");
				}
			}));
		} else {
			rsp.writeHeader (404, {"Content-Type":"text/plain;charset=utf-8"});
			rsp.write ("404 页面不存在\n", "utf-8");
			rsp.end();
		}
	}));
};

// ---- 执行服务
LZR.NodeJs.SampleWebFileSrv.prototype.execute = function (req/*as:Object*/, rsp/*as:Object*/, url/*as:string*/) {
	var p = url;
	if (this.path !== null) {
		var reg=new RegExp("^" + this.name);
		p = url.replace(reg, this.path);
	}
	var filename = this.utUrl.getPath( p, this.dir );
// console.log (filename);
	this.loadFile(filename, rsp);
};
