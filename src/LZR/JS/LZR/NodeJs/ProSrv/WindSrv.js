/*************************************************
作者：子牛连
类名：WindSrv
说明：风场服务
创建日期：05-五月-2016 18:15:29
版本号：1.0
*************************************************/

LZR.load([
	"LZR.NodeJs.ProSrv",
	"LZR.NodeJs.ProSrv.WindSrv.SrcDat",
	"LZR.Base.Json",
	"LZR.Base.InfEvt",
	"LZR.NodeJs.InfHttpSrv",
	"LZR.NodeJs.Util.Url",
	"LZR.Base.CallBacks",
	"LZR.Util"
], "LZR.NodeJs.ProSrv.WindSrv");
LZR.NodeJs.ProSrv.WindSrv = function (obj) /*interfaces:LZR.Base.InfEvt,LZR.NodeJs.InfHttpSrv*/ {
	LZR.Base.InfEvt.call(this);
	LZR.NodeJs.InfHttpSrv.call(this);

	// 数据缓存
	this.catch = {};	/*as:Object*/

	// 源数据路径
	this.url = "http://ziniulian.github.io/LX_JS/json/wind/";	/*as:string*/

	// nodejs的HTTP模块
	this.http = LZR.getSingleton(null, null, "http");	/*as:Object*/

	// 源数据类
	this.clsSrcDat/*m*/ = (LZR.NodeJs.ProSrv.WindSrv.SrcDat);	/*as:fun*/

	// JSON工具
	this.utJson/*m*/ = LZR.getSingleton(LZR.Base.Json);	/*as:LZR.Base.Json*/

	// URL工具
	this.utUrl/*m*/ = LZR.getSingleton(LZR.NodeJs.Util.Url);	/*as:LZR.NodeJs.Util.Url*/

	// 获取源数据
	this.evt.src/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 通用工具
	this.utLzr/*m*/ = LZR.getSingleton(LZR.Util);	/*as:LZR.Util*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.NodeJs.ProSrv.WindSrv.prototype = LZR.clone (LZR.Base.InfEvt.prototype, LZR.NodeJs.ProSrv.WindSrv.prototype);
LZR.NodeJs.ProSrv.WindSrv.prototype = LZR.clone (LZR.NodeJs.InfHttpSrv.prototype, LZR.NodeJs.ProSrv.WindSrv.prototype);
LZR.NodeJs.ProSrv.WindSrv.prototype.className_ = "LZR.NodeJs.ProSrv.WindSrv";
LZR.NodeJs.ProSrv.WindSrv.prototype.version_ = "1.0";

LZR.load(null, "LZR.NodeJs.ProSrv.WindSrv");

// 构造器
LZR.NodeJs.ProSrv.WindSrv.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.NodeJs.ProSrv.WindSrv.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};

// 双线性插值计算出新数据
LZR.NodeJs.ProSrv.WindSrv.prototype.calcByBilinear = function (obj/*as:Object*/)/*as:string*/ {
	var dat = this.catch[obj.cTim];
	var r = [];
	if ( !(
		(obj.lonmin > dat.lonmax) ||
		(obj.lonmax < dat.lonmin) ||
		(obj.latmin > dat.latmax) ||
		(obj.latmax < dat.latmin)
	) ) {
		for (var j=0; j<obj.rows; j++) {
			for (var i=0; i<obj.cols; i++) {
				var lon = obj.lonmin + i*obj.lonstep;
				var lat = obj.latmin + j*obj.latstep;
				if (
					(lon > dat.lonmax) ||
					(lon < dat.lonmin) ||
					(lat > dat.latmax) ||
					(lat < dat.latmin)
				) {
					// r.push( [lon, lat, 0, 0] );
				} else {
					var x = (lon - dat.lonmin)/dat.lonstep;
					var y = (lat - dat.latmin)/dat.latstep;
					var px = Math.floor(x);
					var py = Math.floor(y);
					var n = 2*(py * dat.cols + px);

					var d = x - px;
					var pu = dat.val[n];
					var pv = dat.val[n+1];
					if (d>0) {
						pu += (dat.val[n+2] - pu) * d;
						pv += (dat.val[n+3] - pv) * d;
					}
					if (y>py) {
						n += dat.cols * 2;
						var u = dat.val[n];
						var v = dat.val[n+1];
						u += (dat.val[n+2] - u) * d;
						v += (dat.val[n+3] - v) * d;

						d = y - py;
						pu += (u - pu) * d;
						pv += (v - pv) * d;
					}
					if (pu || pv) {
						r.push( [lon, lat, pu, pv] );
					}
				}
			}
		}
	}
	return this.utJson.toJson (r);
};

// 查询
LZR.NodeJs.ProSrv.WindSrv.prototype.qry = function (arg/*as:Object*/, rsp/*as:Object*/) {
	if (arg.cTime) {
		var obj = {
			cTim: arg.cTime
		};
		if (arg.lonmin) {
			obj.lonmin = parseInt(arg.lonmin, 10);
		}
		if (arg.lonmax) {
			obj.lonmax = parseInt(arg.lonmax, 10);
		}
		if (arg.latmin) {
			obj.latmin = parseInt(arg.latmin, 10);
		}
		if (arg.latmax) {
			obj.latmax = parseInt(arg.latmax, 10);
		}
		if (arg.rowNo) {
			obj.rows = parseInt(arg.rowNo, 10);
		}
		if (arg.columnNo) {
			obj.cols = parseInt(arg.columnNo, 10);
		}
		if (arg.pTime) {
			obj.pTim = arg.pTime;
		}
		this.clsSrcDat.prototype.calcStep(obj);

		if (this.catch[obj.cTim]) {
			if (this.catch[obj.cTim] === true) {
				this.addSrcEvt(obj, rsp);
			} else {
				this.response(this.calcByBilinear(obj), rsp);
			}
		} else {
// console.log (this.url + obj.cTim + ".js");
			this.catch[obj.cTim] = true;
			this.addSrcEvt(obj, rsp);
			var reqR = this.http.get(this.url + obj.cTim + ".js", this.utLzr.bind(this, function (obj, rspR) {
// console.log (rspR.statusCode);
				if (rspR.statusCode === 200) {
					var json = "";
					rspR.setEncoding("utf-8");

					rspR.on("data", function (d) {
						json += d;
// console.log (json.length + " <--- " + d.length);
					});

					rspR.on("end", this.utLzr.bind(this, function (obj) {
						this.catch[obj.cTim] = new this.clsSrcDat ({
							val: this.utJson.toObj (json)
						});
						this.onSrc(obj, true);
					}, obj));
				} else {
					delete this.catch[obj.cTim];
					this.onSrc(obj, false);
				}
			}, obj));

			reqR.on ("error", this.utLzr.bind(this, function (e) {
				delete this.catch[obj.cTim];
				this.onSrc(obj, false);
			}));
		}
	} else {
		this.response("[]", rsp);
	}
};

// 回传数据
LZR.NodeJs.ProSrv.WindSrv.prototype.response = function (dat/*as:string*/, rsp/*as:Object*/) {
	rsp.writeHeader (200, {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "text/html; charset=utf-8"
	});
	rsp.write(dat, "utf-8");
	rsp.end();
};

// 添加源数据事件处理
LZR.NodeJs.ProSrv.WindSrv.prototype.addSrcEvt = function (obj/*as:Object*/, rsp/*as:Object*/) {
	this.evt.src.add(this.utLzr.bind(this, this.hdSrc, obj, rsp), null, true);
// console.log (this.evt.src.count);
};

// 源数据获取时的触发事件
LZR.NodeJs.ProSrv.WindSrv.prototype.onSrc = function (obj/*as:Object*/, success/*as:boolean*/) {
	this.evt.src.execute (obj, success);
};

// 处理源数据事件
LZR.NodeJs.ProSrv.WindSrv.prototype.hdSrc = function (obj/*as:Object*/, rsp/*as:Object*/, src/*as:Object*/, success/*as:boolean*/, selfInfo/*as:Object*/) {
	if (obj.cTim === src.cTim) {
		selfInfo.root.del(selfInfo.nam);
// console.log (this.evt.src.count);
		if (success) {
			this.response(this.calcByBilinear(obj), rsp);
		} else {
			this.response("[]", rsp);
		}
	}
};

// ---- 执行服务
LZR.NodeJs.ProSrv.WindSrv.prototype.execute = function (req/*as:Object*/, rsp/*as:Object*/, url/*as:string*/) {
	this.qry(this.utUrl.getParamGet (req), rsp);
};
