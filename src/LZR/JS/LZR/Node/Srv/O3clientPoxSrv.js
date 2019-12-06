/*************************************************
作者：子牛连
类名：O3clientPoxSrv
说明：Openshift3客户端代理服务
创建日期：13-三月-2018 9:40:47
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Node.Srv"
], "LZR.Node.Srv.O3clientPoxSrv");
LZR.Node.Srv.O3clientPoxSrv = function (obj) {
	// 缓存类
	this.clsBuf = global.Buffer || LZR.getSingleton(null, null, "buffer").Buffer;	/*as:Object*/

	// 网络模块
	this.net = LZR.getSingleton(null, null, "net");	/*as:Object*/

	// 代理服务端口
	this.srvPort = 80;	/*as:int*/

	// 代理服务域名
	this.srvHost = "";	/*as:string*/

	// 代理服务的HTTP方法名
	this.srvHttp = "POST /a";	/*as:string*/

	// 代理服务的HTTPS方法名
	this.srvHttps = "POST /b/";	/*as:string*/

	// 数据头
	this.headTxt = "";	/*as:string*/

	// HTTPS 初始应答
	this.firstHttpsRes = null;	/*as:Object*/

	// 是否输出连接信息
	this.showLog = false;	/*as:boolean*/

	// 结束标记
	this.endTag = "\r\n\r\n\t<w*p>\t";	/*as:string*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Node.Srv.O3clientPoxSrv.prototype.className_ = "LZR.Node.Srv.O3clientPoxSrv";
LZR.Node.Srv.O3clientPoxSrv.prototype.version_ = "1.0";

LZR.load(null, "LZR.Node.Srv.O3clientPoxSrv");

// 构造器
LZR.Node.Srv.O3clientPoxSrv.prototype.init_ = function (obj/*as:Object*/) {
	this.firstHttpsRes = new this.clsBuf.from(
		"HTTP/1.1 200 Connection established\r\nConnection: close\r\n\r\n"
	);

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Node.Srv.O3clientPoxSrv.prototype.init_.lzrClass_ = LZR.Node.Srv.O3clientPoxSrv;

// 对构造参数的特殊处理
LZR.Node.Srv.O3clientPoxSrv.prototype.hdObj_ = function (obj/*as:Object*/) {
	this.headTxt = " HTTP/1.1\r\nHost: " + this.srvHost + "\r\nContent-Length: ";
};
LZR.Node.Srv.O3clientPoxSrv.prototype.hdObj_.lzrClass_ = LZR.Node.Srv.O3clientPoxSrv;

// 启动服务
LZR.Node.Srv.O3clientPoxSrv.prototype.start = function (ip/*as:string*/, port/*as:int*/) {
	this.net.createServer(LZR.bind(this, this.mainSrv)).listen(port, ip);
	console.log("代理服务已启动 " + ip + ":" + port);
};
LZR.Node.Srv.O3clientPoxSrv.prototype.start.lzrClass_ = LZR.Node.Srv.O3clientPoxSrv;

// 主服务程序
LZR.Node.Srv.O3clientPoxSrv.prototype.mainSrv = function (socket/*as:Object*/) {
	var buf = {
		dat: new this.clsBuf.alloc(0),
		e: -1,
		b: false
	};

	socket.on("error", function () {});
	socket.on("data", LZR.bind(this, function(dat) {
		buf.dat = this.clsBuf.concat([buf.dat, dat]);
		buf.e = buf.dat.indexOf("\r\n\r\n");
		if (buf.e > 0) {
			socket.removeAllListeners("data");
			var o = this.parseHead(buf.dat, buf.e);
			if (o) {
				if (this.srvHost) {
					this.hdHttp(o, socket);
				} else {
					this.hdBase(o, socket);
				}
			}
		}
	}));
};
LZR.Node.Srv.O3clientPoxSrv.prototype.mainSrv.lzrClass_ = LZR.Node.Srv.O3clientPoxSrv;

// 头部解析
LZR.Node.Srv.O3clientPoxSrv.prototype.parseHead = function (dat/*as:Object*/, e/*as:int*/)/*as:Object*/ {
	var i, j, k;
	var o = false;
	var txt = dat.slice(0, e).toString("utf8");

	if (txt.substring(0, 8) === "CONNECT ") {
		i = 8;
		j = txt.indexOf(":", i);
		k = txt.indexOf(" ", j + 1);
		o = {
			host: txt.substring(i, j),
			port: txt.substring(j + 1, k) - 0
		};
	} else {
		i = txt.indexOf("\r\nHost:");
		if (i !== -1) {
			var s1 = txt.substring(0, i);
			var s, s2;
			o = {};

			// 替换网址格式(去掉域名部分)
			if (txt[i-1] === "1") {
				j = s1.indexOf("http://");
				if (j > 0) {
					k = s1.indexOf ("/", (j + 7));
					s1 = txt.substr(0, j) + s1.substr(k);
				}
			}

			// 抓取域名部分
			i += 7;
			while (txt[i] === " ") {
				i ++;
			}
			j = txt.indexOf("\r\n", i);
			if (j === -1) {
				s = txt.substring(i);
				s2 = "";
			} else {
				s = txt.substring(i, j);

				// 替换connection头
				s2 = txt.substring(j)
					.replace(/(Proxy\-)?Connection\:.+\r\n/ig,"")
					.replace(/Keep\-Alive\:.+\r\n/i,"");
			}

			// 解析域名和端口
			k = s.indexOf(":");
			if (k === -1) {
				o.host = s;
				o.port = 80;
			} else {
				o.host = s.substring(0, k);
				o.port = (s.substring(k + 1) - 0);
			}

			// 替换 buffer
			o.buf = this.clsBuf.concat([
				new this.clsBuf.from(s1 + "\r\nHost: " + s + s2 + "\r\nConnection: close"),
				dat.slice(e)
			]);
		}
	}

// console.log ("------- " + o.host + ":" + o.port + "\n" + o.buf.toString());
	return o;
};
LZR.Node.Srv.O3clientPoxSrv.prototype.parseHead.lzrClass_ = LZR.Node.Srv.O3clientPoxSrv;

// 不依赖Openshift3的基础代理
LZR.Node.Srv.O3clientPoxSrv.prototype.hdBase = function (headDat/*as:Object*/, socket/*as:Object*/) {
	//建立到目标服务器的连接
	var srv = this.net.createConnection(headDat.port, headDat.host);

	//交换服务器与浏览器的数据
	socket.pipe(srv);
	srv.pipe(socket);
	// socket.on("end", function () { srv.end(); });
	// srv.on("end", function () { socket.end(); });
	srv.on("error", function () {});

	if (headDat.buf) {
		srv.write(headDat.buf);
	} else {
		socket.write(this.firstHttpsRes);
	}
};
LZR.Node.Srv.O3clientPoxSrv.prototype.hdBase.lzrClass_ = LZR.Node.Srv.O3clientPoxSrv;

// 处理HTTP代理
LZR.Node.Srv.O3clientPoxSrv.prototype.hdHttp = function (headDat/*as:Object*/, socket/*as:Object*/) {
	var srv = this.net.createConnection(this.srvPort, this.srvHost);
	var o = "{\"h\":\"" + headDat.host + "\",\"p\":" + headDat.port;
	var buf = {
		dat: new this.clsBuf.alloc(0),
		e: -1,
		b: false
	};

	socket.on("end", function() {
		srv.end();
		if (this.showLog) {
			console.log(headDat.host + ":" + headDat.port + " c - end");
		}
	});
	srv.on("error", function (e) {
		srv.end();
		socket.end();
		if (this.showLog) {
			console.log(headDat.host + ":" + headDat.port + " s - err");
		}
	});

	if (headDat.buf) {
		// HTTP
		srv.on("data", LZR.bind(this, this.doDat, socket, buf, (headDat.host + ":" + headDat.port)));
		socket.on("data", function(dat) {
			socket.end();
			if (this.showLog) {
				console.log(headDat.host + ":" + headDat.port + " >> 服务端已关闭连接，不能再次发送请求。");
			}
		});
		srv.on("end", LZR.bind(this, function() {
			socket.end();
			if (this.showLog) {
				console.log(headDat.host + ":" + headDat.port + " s - end");
			}
		}));

		o += String.fromCharCode(125);	// 添加 } 符号
		srv.write(this.clsBuf.concat([
			new this.clsBuf.from(this.srvHttp + this.headTxt + (o.length + headDat.buf.length) + "\r\n\r\n" + o),
			headDat.buf
		]));
	} else {
		// HTTPS
		var key = "";
		var id = 0;
		srv.on("data", LZR.bind(this, function(dat) {
			buf.dat = this.clsBuf.concat([buf.dat, dat]);
			buf.e = buf.dat.indexOf("\r\n\r\n");
			if (buf.e > 0) {
				key = buf.dat.slice(buf.e + 4).toString();
				srv.end();
				socket.write(this.firstHttpsRes);
			}
			if (this.showLog) {
				console.log(key + "," + headDat.host + ":" + headDat.port + " <<---- https 连接OK");
			}
		}));
		socket.on("data", LZR.bind(this, function(dat) {
			this.hdHttps(dat, key, id, socket);
			if (this.showLog) {
				console.log(key + "-" + id + ": >> " + dat.length);
			}
			id ++;
		}));

		o += ",\"k\":1}";
		srv.write(new this.clsBuf.from(this.srvHttp + this.headTxt + o.length + "\r\n\r\n" + o));
	}
};
LZR.Node.Srv.O3clientPoxSrv.prototype.hdHttp.lzrClass_ = LZR.Node.Srv.O3clientPoxSrv;

// 处理HTTPS代理
LZR.Node.Srv.O3clientPoxSrv.prototype.hdHttps = function (dat/*as:Object*/, key/*as:string*/, id/*as:int*/, socket/*as:Object*/) {
	var srv = this.net.createConnection(this.srvPort, this.srvHost);
	var buf = {
		dat: new this.clsBuf.alloc(0),
		e: -1,
		b: false
	};

	srv.on("data", LZR.bind(this, this.doDat, socket, buf, (key + "-" + id)));
	srv.on("error", function (e) {
		srv.end();
		socket.end();
		if (this.showLog) {
			console.log(key + "-" + id + ": s - err");
		}
	});

	srv.write(this.clsBuf.concat([
		new this.clsBuf.from(this.srvHttps + key + "/" + id + this.headTxt + dat.length + "\r\n\r\n"),
		dat
	]));
};
LZR.Node.Srv.O3clientPoxSrv.prototype.hdHttps.lzrClass_ = LZR.Node.Srv.O3clientPoxSrv;

// 数据代理
LZR.Node.Srv.O3clientPoxSrv.prototype.doDat = function (socket/*as:Object*/, buf/*as:Object*/, strlog/*as:string*/, dat/*as:Object*/) {
	if (buf.b) {
		socket.write(dat);
	} else {
		buf.dat = this.clsBuf.concat([buf.dat, dat]);
		buf.e = buf.dat.indexOf(this.endTag);
		if (buf.e > 0) {
// console.log(buf.dat.slice(0, buf.e).toString());
			buf.b = true;
			socket.write(buf.dat.slice(buf.e + this.endTag.length));
		}
	}
	if (this.showLog) {
		console.log(strlog + " <<---- " + dat.length);
	}
};
LZR.Node.Srv.O3clientPoxSrv.prototype.doDat.lzrClass_ = LZR.Node.Srv.O3clientPoxSrv;
