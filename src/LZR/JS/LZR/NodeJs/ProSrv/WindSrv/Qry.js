/*************************************************
作者：子牛连
类名：Qry
说明：查询
创建日期：05-五月-2016 10:19:19
版本号：1.0
*************************************************/

LZR.load([
	"LZR.NodeJs.ProSrv.WindSrv",
	"LZR.NodeJs.ProSrv.WindSrv.SrcDat",
	"LZR.Base.Json",
	"LZR.Util",
	"LZR.Base.CallBacks",
	"LZR.Base.InfEvt"
], "LZR.NodeJs.ProSrv.WindSrv.Qry");
LZR.NodeJs.ProSrv.WindSrv.Qry = function (obj) /*bases:LZR.NodeJs.ProSrv.WindSrv.SrcDat*/ /*interfaces:LZR.Base.InfEvt*/ {
	LZR.initSuper(this, obj);

	LZR.Base.InfEvt.call(this);

	// 产品时间
	this.pTim = "";	/*as:string*/

	// 当前时间
	this.cTim = "";	/*as:string*/

	// 源数据路径
	this.url = "http://ziniulian.github.io/LX_JS/json/wind/";	/*as:string*/

	// nodejs的HTTP模块
	this.http = LZR.getSingleton(null, null, "http");	/*as:Object*/

	// 源数据
	this.dat/*m*/ = new LZR.NodeJs.ProSrv.WindSrv.SrcDat();	/*as:LZR.NodeJs.ProSrv.WindSrv.SrcDat*/

	// JSON工具
	this.utJson/*m*/ = LZR.getSingleton(LZR.Base.Json);	/*as:LZR.Base.Json*/

	// 通用工具
	this.utLzr/*m*/ = LZR.getSingleton(LZR.Util);	/*as:LZR.Util*/

	// 获取数据
	this.evt.msg/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.NodeJs.ProSrv.WindSrv.Qry.prototype = LZR.clone (LZR.Base.InfEvt.prototype, LZR.NodeJs.ProSrv.WindSrv.Qry.prototype);
LZR.NodeJs.ProSrv.WindSrv.Qry.prototype = LZR.clone (LZR.NodeJs.ProSrv.WindSrv.SrcDat.prototype, LZR.NodeJs.ProSrv.WindSrv.Qry.prototype);
LZR.NodeJs.ProSrv.WindSrv.Qry.prototype.super_ = [LZR.NodeJs.ProSrv.WindSrv.SrcDat];
LZR.NodeJs.ProSrv.WindSrv.Qry.prototype.className_ = "LZR.NodeJs.ProSrv.WindSrv.Qry";
LZR.NodeJs.ProSrv.WindSrv.Qry.prototype.version_ = "1.0";

LZR.load(null, "LZR.NodeJs.ProSrv.WindSrv.Qry");

// 获取数据
LZR.NodeJs.ProSrv.WindSrv.Qry.prototype.getDat = function (arg/*as:Object*/) {
	if (arg.cTim) {
		if (arg.lonmin) {
			this.lonmin = parseInt(arg.lonmin, 10);
		}
		if (arg.lonmax) {
			this.lonmax = parseInt(arg.lonmax, 10);
		}
		if (arg.latmin) {
			this.latmin = parseInt(arg.latmin, 10);
		}
		if (arg.latmax) {
			this.latmax = parseInt(arg.latmax, 10);
		}
		if (arg.rowNo) {
			this.rows = parseInt(arg.rowNo, 10);
		}
		if (arg.columnNo) {
			this.cols = parseInt(arg.columnNo, 10);
		}
		if (arg.pTim) {
			this.pTim = arg.pTim;
		}
		this.calcStep();
		if (this.cTim === arg.cTim) {
			this.onMsg(this.calcByBilinear());
			return;
		} else {
			this.cTim = arg.cTim;
		}
// console.log (this.url + this.cTim + ".js");
		var req = this.http.get(this.url + this.cTim + ".js", this.utLzr.bind(this, function (rsp) {
// console.log (rsp.statusCode);
			if (rsp.statusCode === 200) {
				var json = "";
				rsp.setEncoding("utf-8");

				rsp.on("data", function (d) {
					json += d;
// console.log (json.length + " <--- " + d.length);
				});

				rsp.on("end", this.utLzr.bind(this, function () {
					this.dat.val = this.utJson.toObj (json);
					this.onMsg(this.calcByBilinear());
				}));
			} else {
				this.onMsg("[]");
			}
		}));
/*
		req.on ("error", function (e) {
			console.log (e.message);
		});
*/
	} else {
		this.onMsg("[]");
	}
};

// 双线性插值计算出新数据
LZR.NodeJs.ProSrv.WindSrv.Qry.prototype.calcByBilinear = function ()/*as:string*/ {
	this.val = [];
	if ( !(
		(this.lonmin > this.dat.lonmax) ||
		(this.lonmax < this.dat.lonmin) ||
		(this.latmin > this.dat.latmax) ||
		(this.latmax < this.dat.latmin)
	) ) {
		for (var j=0; j<this.rows; j++) {
			for (var i=0; i<this.cols; i++) {
				var lon = this.lonmin + i*this.lonstep;
				var lat = this.latmin + j*this.latstep;
				if (
					(lon > this.dat.lonmax) ||
					(lon < this.dat.lonmin) ||
					(lat > this.dat.latmax) ||
					(lat < this.dat.latmin)
				) {
					// this.val.push( [lon, lat, 0, 0] );
				} else {
					var x = (lon - this.dat.lonmin)/this.dat.lonstep;
					var y = (lat - this.dat.latmin)/this.dat.latstep;
					var px = Math.floor(x);
					var py = Math.floor(y);
					var n = 2*(py * this.dat.cols + px);

					var d = x - px;
					var pu = this.dat.val[n];
					var pv = this.dat.val[n+1];
					if (d>0) {
						pu += (this.dat.val[n+2] - pu) * d;
						pv += (this.dat.val[n+3] - pv) * d;
					}
					if (y>py) {
						n += this.dat.cols * 2;
						var u = this.dat.val[n];
						var v = this.dat.val[n+1];
						u += (this.dat.val[n+2] - u) * d;
						v += (this.dat.val[n+3] - v) * d;

						d = y - py;
						pu += (u - pu) * d;
						pv += (v - pv) * d;
					}
					if (pu || pv) {
						this.val.push( [lon, lat, pu, pv] );
					}
				}
			}
		}
	}
	return this.utJson.toJson (this.val);
};

// 获取数据触发的事件
LZR.NodeJs.ProSrv.WindSrv.Qry.prototype.onMsg = function (dat/*as:string*/) {
	this.evt.msg.execute (dat);
};
