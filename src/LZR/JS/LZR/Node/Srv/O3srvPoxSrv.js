/*************************************************
作者：子牛连
类名：O3srvPoxSrv
说明：Openshift3服务端代理服务
创建日期：13-三月-2018 13:47:04
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Node.Srv",
	"LZR.Base.Json"
], "LZR.Node.Srv.O3srvPoxSrv");
LZR.Node.Srv.O3srvPoxSrv = function (obj) {
	// 缓存类
	this.clsBuf = global.Buffer || LZR.getSingleton(null, null, "buffer").Buffer;	/*as:Object*/

	// 网络模块
	this.net = LZR.getSingleton(null, null, "net");	/*as:Object*/

	// 服务队列
	this.srvarr = [];	/*as:Array*/

	// 数据头
	this.headDat = null;	/*as:Object*/

	// 结束标记
	this.endTag = "\r\n\r\n\t<w*p>\t";	/*as:string*/

	// 是否输出连接信息
	this.showLog = false;	/*as:boolean*/

	// JSON工具
	this.utJson/*m*/ = LZR.getSingleton(LZR.Base.Json);	/*as:LZR.Base.Json*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Node.Srv.O3srvPoxSrv.prototype.className_ = "LZR.Node.Srv.O3srvPoxSrv";
LZR.Node.Srv.O3srvPoxSrv.prototype.version_ = "1.0";

LZR.load(null, "LZR.Node.Srv.O3srvPoxSrv");

// 构造器
LZR.Node.Srv.O3srvPoxSrv.prototype.init_ = function (obj/*as:Object*/) {
	this.headDat = new this.clsBuf("HTTP/1.1 200" + this.endTag);

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Node.Srv.O3srvPoxSrv.prototype.init_.lzrClass_ = LZR.Node.Srv.O3srvPoxSrv;

// 对构造参数的特殊处理
LZR.Node.Srv.O3srvPoxSrv.prototype.hdObj_ = function (obj/*as:Object*/) {

};
LZR.Node.Srv.O3srvPoxSrv.prototype.hdObj_.lzrClass_ = LZR.Node.Srv.O3srvPoxSrv;

// 获取POST数据
LZR.Node.Srv.O3srvPoxSrv.prototype.getPost = function (fun/*as:fun*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var arr = [];
	req.on("data", function (dat) {
		arr.push(dat);
	});
	req.on ("end", LZR.bind(this, function () {
		fun(this.clsBuf.concat(arr), req, res);
	}));
};
LZR.Node.Srv.O3srvPoxSrv.prototype.getPost.lzrClass_ = LZR.Node.Srv.O3srvPoxSrv;

// 处理HTTP代理
LZR.Node.Srv.O3srvPoxSrv.prototype.hdHttp = function (buf/*as:Object*/, req/*as:Object*/, res/*as:Object*/) {
	var e = buf.indexOf(String.fromCharCode(125)) + 1;
	if (e > 0) {
		var o = false;
		try {
			o = this.utJson.toObj(buf.slice(0, e).toString());
		} catch (err) {}
		if (o && o.h && o.p) {
			var c = req.socket;
			c.removeAllListeners("data");
			var s = this.net.createConnection(o.p, o.h);
			s.on("error", LZR.bind(this, function () {
				s.end();
				c.end();
				if (this.showLog) {
					console.log(o.h + ":" + o.p + " s - err");
				}
			}));
			if (o.k) {
				var sas = this.srvarr.length;
				s.idCatch = {	// 记录接受数据的顺序
					cur: 0,		// 即将接收的顺序
					max: 0,		// 最大顺序
					c: c,		// 当前的客户端连接
					bufs: {},		// 缓存
					h: o.h,		// host
					p: o.p		// 端口号
				};
				this.srvarr.push(s);
				var sae = this.srvarr.length;
				if ((sae - sas) > 1) {
					if (this.showLog) {
						console.log("... " + (sae - sas));
					}
					for (var i = sas; i < sae; i ++) {
						if (this.srvarr[i] === s) {
							sas = i;
							break;
						}
					}
				}
				c.write(new this.clsBuf("HTTP/1.1 200 OK\r\n\r\n" + sas));
				c.end();
			} else {
				var b = false;
				s.on("data", LZR.bind(this, function (dat) {
					if (b) {
						c.write(dat);
					} else {
						b = true;
						c.write(this.clsBuf.concat([this.headDat, dat]));
					}
					if (this.showLog) {
						console.log(o.h + ":" + o.p + " <<---- " + dat.length);
					}
				}));
				s.on("end", LZR.bind(this, function() {
					c.end();
					if (this.showLog) {
						console.log(o.h + ":" + o.p + " s - end");
					}
				}));
				s.write(buf.slice(e));
			}
		} else {
			res.status(404).send("数据错误");
		}
	} else {
		res.status(404).send("没有结束符");
	}
};
LZR.Node.Srv.O3srvPoxSrv.prototype.hdHttp.lzrClass_ = LZR.Node.Srv.O3srvPoxSrv;

// 处理HTTPS代理
LZR.Node.Srv.O3srvPoxSrv.prototype.hdHttps = function (buf/*as:Object*/, req/*as:Object*/, res/*as:Object*/) {
	var key = req.params.key - 0;
	var id = req.params.id - 0;
	var s = this.srvarr[key];
	if (s) {
		s.removeAllListeners("data");
		var cah = s.idCatch;
		if (cah.c) {
			cah.c.end();
			cah.c = null;
		}
		if (id > cah.max) {
			cah.max = id;
		}
		cah.bufs[id] = buf;
		var i, arr = [];
		for (i = cah.cur; i <= cah.max; i ++) {
			if (cah.bufs[i]) {
				cah.cur = i + 1;
				arr.push(cah.bufs[i]);
				LZR.del(cah.bufs, i);
			} else {
				break;
			}
		}
		i--;
		if (arr.length) {
			var b = false;
			var c = req.socket;
			c.removeAllListeners("data");
			cah.c = c;
			s.on("data", LZR.bind(this, function (dat) {
				if (b) {
					c.write(dat);
				} else {
					b = true;
					c.write(this.clsBuf.concat([this.headDat, dat]));
				}
				if (this.showLog) {
					console.log(key + "-" + i + " <<---- " + dat.length);
				}
			}));
			s.write(this.clsBuf.concat(arr));
			if (this.showLog) {
				console.log(key + "-" + i + " >> " + buf.length);
			}
		}
	} else {
		res.status(404).send("没有远程服务");
	}
};
LZR.Node.Srv.O3srvPoxSrv.prototype.hdHttps.lzrClass_ = LZR.Node.Srv.O3srvPoxSrv;

// 清空服务队列
LZR.Node.Srv.O3srvPoxSrv.prototype.delSrvs = function ()/*as:int*/ {
	var s, hosts = "", r = this.srvarr.length;
	for (var i = 0; i < r; i ++) {
		s = this.srvarr[i];
		if (s.remoteAddress) {
			hosts += s.remoteAddress + "\t" + s.idCatch.h + "\n";
		}
		if (s.idCatch.c) {
			s.idCatch.c.end();
			s.idCatch.c = undefined;
		}
		s.end();
		this.srvarr[i] = undefined;
	}
	if (r) {
		this.srvarr = [];
	}
	return [r, hosts];
};
LZR.Node.Srv.O3srvPoxSrv.prototype.delSrvs.lzrClass_ = LZR.Node.Srv.O3srvPoxSrv;
