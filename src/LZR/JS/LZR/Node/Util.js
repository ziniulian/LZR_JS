/*************************************************
作者：子牛连
类名：Util
说明：工具包
创建日期：19-九月-2016 13:01:48
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Node"
], "LZR.Node.Util");
LZR.Node.Util = function (obj) {
	// 数据缓存
	this.buf = global.Buffer || LZR.getSingleton(null, null, "buffer").Buffer;	/*as:Object*/

	// 网络模块
	this.net = LZR.getSingleton(null, null, "net");	/*as:Object*/

	// 数据盐值
	this.stres = "HTTP/1.1 200 OK\r\nAccept-Ranges: bytes\r\nContent-Length: ";

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Node.Util.prototype.className_ = "LZR.Node.Util";
LZR.Node.Util.prototype.version_ = "1.0";

LZR.load(null, "LZR.Node.Util");

// 构造器
LZR.Node.Util.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Node.Util.prototype.init_.lzrClass_ = LZR.Node.Util;

// 对构造参数的特殊处理
LZR.Node.Util.prototype.hdObj_ = function (obj/*as:Object*/) {

};
LZR.Node.Util.prototype.hdObj_.lzrClass_ = LZR.Node.Util;

// 获取客户端IP
LZR.Node.Util.prototype.getClientIp = function (req/*as:Object*/)/*as:string*/ {
	return req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
};
LZR.Node.Util.prototype.getClientIp.lzrClass_ = LZR.Node.Util;

// 两个Buffer对象加起来
LZR.Node.Util.prototype.addBuffer = function (buf1/*as:Object*/, buf2/*as:Object*/) {
	return this.buf.concat([buf1, buf2], buf1.length + buf2.length);
};
LZR.Node.Util.prototype.addBuffer.lzrClass_ = LZR.Node.Util;

// 数据解包
LZR.Node.Util.prototype.unpckBuffer = function (d/*as:Object*/, st/*as:Object*/, tag/*as:Object*/) {
	for (var i = 0; i < d.length; i ++) {
		switch (d[i]) {
			case 0x0d:		// \r
				if (st.ts === null) {
					if (st.t === 0 || st.t === 2) {
						st.t ++;
					} else {
						st.t = 0;
					}
				}
				break;
			case 0x0a:		// \n
				if (st.ts === null) {
					if (st.t === 1 || st.t === 3) {
						st.t ++;
					} else {
						st.t = 0;
					}
				}
				break;
			case 0x7B:		// {
				if (st.ts === null) {
					if (st.t === 4) {
						st.ts = "{";
						st.t = 1;
console.log("S ： " + i + " , " + d.slice(0, i).toString("utf8"));
					} else {
						st.t = 0;
					}
				} else {
					st.t ++;
					st.ts += "{";
				}
				break;
			case 0x7D:		// }
				if (st.ts) {
					st.t --;
					st.ts += "}";
					if (st.t === 0) {
// console.log("unpck : " + st.ts.length);
						var tt = new this.buf (JSON.parse(st.ts).data);
						tag.write(tt);
console.log(tt.length + " , " + i + " , " + d.length);
						st.ts = null;
					}
				}
				break;
			default:
				if (st.ts === null) {
					st.t = 0;
				} else {
					st.ts += String.fromCharCode(d[i]);
				}
				break;
		}
	}
};
LZR.Node.Util.prototype.unpckBuffer.lzrClass_ = LZR.Node.Util;

// 数据封包
LZR.Node.Util.prototype.pckBuffer = function (d/*as:Object*/, salt/*as:Object*/, tag/*as:Object*/) {
	var t = JSON.stringify(d);
// console.log("pck : " + t.length);
	tag.write(new this.buf(salt + (t.length) + "\r\n\r\n" + t));
};
LZR.Node.Util.prototype.pckBuffer.lzrClass_ = LZR.Node.Util;

// 逆 HTTP
LZR.Node.Util.prototype.ptth = function (req/*as:Object*/)/*as:boolean*/ {
	if (req.body.dat) {
		var c = req.socket;
		var st = { t: 0, ts: null };
		var s, o, pbuf, ubuf;
		try {
			o = JSON.parse(req.body.dat);
			o.host = decodeURIComponent(o.host);
		} catch (e) {
			return false;
		}
		if (o && o.host && o.port) {
			c.removeAllListeners("data");
			s = this.net.createConnection(o.port, o.host);

			pbuf = LZR.bind(this, function(d) {
				this.pckBuffer(d, this.stres, c);
console.log(o.host + ":" + o.port + " <<---- " + d.length);
			});
			ubuf = LZR.bind(this, function(d) {
				this.unpckBuffer(d, st, s);
console.log(o.host + ":" + o.port + " >> " + d.length);
			});
			s.on("data", pbuf);
			c.on("data", ubuf);
			s.on("end", function() {
				c.end();
console.log(o.host + ":" + o.port + " s - end");
			});
			c.on("end", function() {
				s.end();
console.log(o.host + ":" + o.port + " c - end");
			});
			s.on("error", function () {});

			if (o.buf) {
				s.write(new this.buf(o.buf.data));
			} else if (o.rok) {
				this.pckBuffer(new this.buf(o.rok), this.stres, c);
			} else {
				return false;
			}
			return true;
		}
	}
	return false;
};
LZR.Node.Util.prototype.ptth.lzrClass_ = LZR.Node.Util;
