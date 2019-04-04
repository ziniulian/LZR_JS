/*************************************************
作者：子牛连
类名：GuSrv
说明：股票服务
创建日期：04-4月-2019 20:00:38
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Node.Srv",
	"LZR.Node.Router",
	"LZR.Node.Router.ComTmp",
	"LZR.Base.Json",
	"LZR.Node.Db.NodeAjax",
	"LZR.Base.Time",
	"LZR.Node.Srv.Result",
	"LZR.Node.Srv.ComDbSrv",
	"LZR.Node.Router.QryTmp",
	"LZR.Pro.Gu.ParseByEastmoney"
], "LZR.Node.Srv.GuSrv");
LZR.Node.Srv.GuSrv = function (obj) {
	// 报表模板
	this.tmp = {};	/*as:Object*/

	// 路由器
	this.ro/*m*/ = null;	/*as:LZR.Node.Router*/

	// 模板路由器
	this.tmpRo/*m*/ = null;	/*as:LZR.Node.Router.ComTmp*/

	// JSON工具
	this.utJson/*m*/ = LZR.getSingleton(LZR.Base.Json);	/*as:LZR.Base.Json*/

	// Ajax工具
	this.ajax/*m*/ = new LZR.Node.Db.NodeAjax();	/*as:LZR.Node.Db.NodeAjax*/

	// 时间工具
	this.utTim/*m*/ = LZR.getSingleton(LZR.Base.Time);	/*as:LZR.Base.Time*/

	// 结果类
	this.clsR/*m*/ = (LZR.Node.Srv.Result);	/*as:fun*/

	// 数据库
	this.db/*m*/ = null;	/*as:LZR.Node.Srv.ComDbSrv*/

	// 分页模板路由器
	this.qryRo/*m*/ = null;	/*as:LZR.Node.Router.QryTmp*/

	// 解析器
	this.parser/*m*/ = new LZR.Pro.Gu.ParseByEastmoney();	/*as:LZR.Pro.Gu.ParseByEastmoney*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Node.Srv.GuSrv.prototype.className_ = "LZR.Node.Srv.GuSrv";
LZR.Node.Srv.GuSrv.prototype.version_ = "1.0";

LZR.load(null, "LZR.Node.Srv.GuSrv");

// 构造器
LZR.Node.Srv.GuSrv.prototype.init_ = function (obj/*as:Object*/) {
	this.exeGetAllId = LZR.bind(this, this.getAllId);
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Node.Srv.GuSrv.prototype.init_.lzrClass_ = LZR.Node.Srv.GuSrv;

// 对构造参数的特殊处理
LZR.Node.Srv.GuSrv.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Node.Srv.GuSrv.prototype.hdObj_.lzrClass_ = LZR.Node.Srv.GuSrv;

// 初始化
LZR.Node.Srv.GuSrv.prototype.init = function () {
	if (this.tmpRo) {
		this.ro = this.tmpRo.ro;
		this.initAjax();

		this.ro.hdPost("*");
		this.ro.post("/add/", LZR.bind(this, this.addInit));
		this.ro.post("/add/", LZR.bind(this, this.addSav));
		this.ro.post("/add/", LZR.bind(this, this.addEnd));
		this.ro.post("/qry_mgInfo/update/:id/:init?/", LZR.bind(this, this.updateGetInfo));	// 获取基础数据
		this.ro.post("/qry_mgInfo/update/:id/:init?/", LZR.bind(this, this.updateGetNum));	// 查询股本
		this.ro.post("/qry_mgInfo/update/:id/:init?/", LZR.bind(this, this.updateEnd));	// 结束更新
		this.ro.get("/closing/", this.exeGetAllId);
		this.ro.get("/closing/", LZR.bind(this, this.closing));
	}
};
LZR.Node.Srv.GuSrv.prototype.init.lzrClass_ = LZR.Node.Srv.GuSrv;

// 数据库初始化
LZR.Node.Srv.GuSrv.prototype.initDb = function () {
	if (this.qryRo.db) {
		this.db = this.qryRo.db;
		this.db.mdb.crtEvt({
			getTmp: {	// 获取模板
				tnam: "gub",
				funs: {
					find: [{typ:"tmp", id:"eastmoney"}, {_id:0, id:0, typ:0}],
					toArray: []
				}
			},
			addGu: {	// 添加股票基本信息
				tnam: "gub",
				funs: {
					insertMany: ["<0>"]
				}
			},
			setGu: {	// 修改信息
				tnam: "gub",
				funs: {
					updateMany: ["<0>", "<1>"]
				}
			},
			addK: {	// 添加日线数据
				tnam: "guk",
				funs: {
					insertMany: ["<0>"]
				}
			},
			delK: {		// 删除日线数据
				tnam: "guk",
				funs: {
					deleteMany: ["<0>"]
				}
			}
		});
		this.db.mdb.evt.getTmp.add(LZR.bind(this, function (r) {
			this.tmp = r[0];
		}));
		this.db.mdb.qry("getTmp");
	}
};
LZR.Node.Srv.GuSrv.prototype.initDb.lzrClass_ = LZR.Node.Srv.GuSrv;

// Ajax初始化
LZR.Node.Srv.GuSrv.prototype.initAjax = function () {
	this.ajax.crtEvt({
		sinaK: "gb2312,http://hq.sinajs.cn/list=<0>",	// 新浪实时数据接口
		sinaH: "gb2312,http://money.finance.sina.com.cn/quotes_service/api/json_v2.php/CN_MarketData.getKLineData?symbol=<0>&scale=240&ma=no&datalen=<1>",	// 新浪历史数据接口
		eastNum: "http://f10.eastmoney.com/CapitalStockStructure/CapitalStockStructureAjax?code=<0>",	// 东方财富——股本结构
		eastDvd: "http://f10.eastmoney.com/BonusFinancing/BonusFinancingAjax?code=<0>",	// 东方财富——分红融资
		eastMain: "http://f10.eastmoney.com/NewFinanceAnalysis/MainTargetAjax?type=<1>&code=<0>",	// 东方财富——主要指标
		eastBlc: "http://f10.eastmoney.com/NewFinanceAnalysis/zcfzbAjax?companyType=4&reportDateType=0&reportType=1&endDate=<1>&code=<0>",	// 东方财富——资产负债表
		eastPf: "http://f10.eastmoney.com/NewFinanceAnalysis/lrbAjax?companyType=4&reportDateType=0&reportType=1&endDate=<1>&code=<0>",	// 东方财富——利润表
		eastCash: "http://f10.eastmoney.com/NewFinanceAnalysis/xjllbAjax?companyType=4&reportDateType=0&reportType=1&endDate=<1>&code=<0>",	// 东方财富——现金流量表
		eastCop: "http://f10.eastmoney.com/BusinessAnalysis/BusinessAnalysisAjax?code=<0>",	// 东方财富——收入构成
		sohu: "gb2312,http://q.stock.sohu.com/cn/<0>/<1>.shtml"	// 搜狐基本面
	});

	// 新浪实时数据接口
	this.ajax.evt.sinaK.add (LZR.bind(this, this.ajaxHdSinaK));

	// 新浪历史数据接口
	this.ajax.evt.sinaH.add (LZR.bind(this, this.ajaxHdSinaH));

	// 东方财富——股本结构
	this.ajax.evt.eastNum.add (LZR.bind(this, this.ajaxHdEastNum));

	// 东方财富——分红融资
	this.ajax.evt.eastDvd.add (LZR.bind(this, this.ajaxHdEastDvd));

	// 东方财富——主要指标
	this.ajax.evt.eastMain.add (LZR.bind(this, this.ajaxHdEastMain));

	// 东方财富——资产负债表
	this.ajax.evt.eastBlc.add (LZR.bind(this, function (r, req, res, next) {
		if (this.qryRun(r, req, res, next, "balance", "eastBlc", "资产负债表")) {
			req.qpobj.gu.dat.sid[1] = "&a=";
			this.ajax.qry("eastPf", req, res, next, req.qpobj.gu.dat.sid);
		} else {
			console.log (req.qpobj.gu.dat.info.nam + " : 5. 资产负债表 - " + req.qpobj.gu.dat.sid[1]);
		}
	}));

	// 东方财富——利润表
	this.ajax.evt.eastPf.add (LZR.bind(this, function (r, req, res, next) {
		if (this.qryRun(r, req, res, next, "profit", "eastPf", "利润表")) {
			req.qpobj.gu.dat.sid[1] = "&a=";
			this.ajax.qry("eastCash", req, res, next, req.qpobj.gu.dat.sid);
		} else {
			console.log (req.qpobj.gu.dat.info.nam + " : 6. 利润表 - " + req.qpobj.gu.dat.sid[1]);
		}
	}));

	// 东方财富——现金流量表
	this.ajax.evt.eastCash.add (LZR.bind(this, function (r, req, res, next) {
		if (this.qryRun(r, req, res, next, "cash", "eastCash", "现金流量表")) {
			req.qpobj.gu.dat.sid[1] = "";
			this.ajax.qry("eastCop", req, res, next, req.qpobj.gu.dat.sid);
		} else {
			console.log (req.qpobj.gu.dat.info.nam + " : 7. 现金流量表 - " + req.qpobj.gu.dat.sid[1]);
		}
	}));

	// 东方财富——收入构成
	this.ajax.evt.eastCop.add (LZR.bind(this, this.ajaxHdEastCop));

	// 错误处理
	var exeHdErr = LZR.bind(this, this.hdErr);
	this.ajax.err.sohu.add(exeHdErr);
	this.ajax.err.sinaK.add(exeHdErr);
	this.ajax.err.sinaH.add(exeHdErr);
	this.ajax.err.eastNum.add(exeHdErr);
	this.ajax.err.eastDvd.add(exeHdErr);
	this.ajax.err.eastMain.add(exeHdErr);
	this.ajax.err.eastBlc.add(exeHdErr);
	this.ajax.err.eastPf.add(exeHdErr);
	this.ajax.err.eastCash.add(exeHdErr);
	this.ajax.err.eastCop.add(exeHdErr);
};
LZR.Node.Srv.GuSrv.prototype.initAjax.lzrClass_ = LZR.Node.Srv.GuSrv;

// 新浪实时数据的ajax回调处理
LZR.Node.Srv.GuSrv.prototype.ajaxHdSinaK = function (r/*as:string*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	if (req.qpobj && req.qpobj.gu) {
		// 更新数据初始化 —— 获取新加代码的名称
		var i, j, a, o = LZR.fillPro(req, "qpobj.gu");
		if (r.indexOf("var hq_str_")) {
			o.ok = false;
			o.msg = "ajax_sinaK : 数据格式错误！";
		} else {
			i = r.indexOf("\"") + 1;
			j = r.indexOf("\"", i);
			if (j > i) {
				o.dat.info = {
					nam: r.substring(i, j).split(",")[0]
				};
			} else {
				o.ok = false;
				o.msg = "没有相关代码的信息";
			}
		}
		next();
	} else {
		// 收盘
		r = this.parser.parseK(r, LZR.fillPro(req, "qpobj.comDbSrvReturn"));
		this.closingSav(r);
		res.send(
			"<table width=\"50%\"><tr><td>tim</td><td>" + r.tim +
			"</td></tr><tr><td>ok</td><td>" + r.ok.length +
			"</td></tr><tr><td>miss</td><td>" + r.miss.length +
			"</td></tr><tr><td>stop</td><td>" + r.stop.length +
			"</td></tr><tr><td>nam</td><td>" + r.nam.length +
			"</td></tr><tr><td>err</td><td>" + r.err.length + "</td></tr></table>" +
			"<script>console.log(" + this.utJson.toJson(r) + ");</script>"
		);
	}
};
LZR.Node.Srv.GuSrv.prototype.ajaxHdSinaK.lzrClass_ = LZR.Node.Srv.GuSrv;

// 新浪历史数据的ajax回调处理
LZR.Node.Srv.GuSrv.prototype.ajaxHdSinaH = function (r/*as:string*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var o = LZR.fillPro(req, "qpobj.gu.dat");
	r = this.parser.parseHistoryK(r, o.id, o.sid[2]);

	if (r) {
		o.k = r;
		o.info.days = r[0].tim;
		o.info.daye = r[r.length - 1].tim;

		// 市盈率分析
		console.log (o.info.nam + " : A. 已获取K线数据");
		this.calcEps (o.sid.pop(), r);
		console.log (o.info.nam + " : B. 市盈率分析完毕");
	}

	next();
};
LZR.Node.Srv.GuSrv.prototype.ajaxHdSinaH.lzrClass_ = LZR.Node.Srv.GuSrv;

// 股本结构的ajax回调处理
LZR.Node.Srv.GuSrv.prototype.ajaxHdEastNum = function (r/*as:string*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var d = this.parser.parseNum(r, req.params.id);
	if (d) {
		var o = LZR.fillPro(req, "qpobj.gu.dat");
		o.num = d;
		console.log (o.info.nam + " : 2. 已获取股本");
		this.ajax.qry("eastDvd", req, res, next, o.sid);
	} else {
		req.qpobj.gu.ok = false;
		req.qpobj.gu.msg = "股本结构 : 数据格式错误！";
		next();
	}
};
LZR.Node.Srv.GuSrv.prototype.ajaxHdEastNum.lzrClass_ = LZR.Node.Srv.GuSrv;

// 分红融资的ajax回调处理
LZR.Node.Srv.GuSrv.prototype.ajaxHdEastDvd = function (r/*as:string*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var d = this.parser.parseDvd(r, req.params.id);
	if (d) {
		var o = LZR.fillPro(req, "qpobj.gu.dat");
		o.dvd = d;
		console.log (o.info.nam + " : 3. 已获取分红");
		o.sid[1] = ("0");
		this.ajax.qry("eastMain", req, res, next, o.sid);
	} else {
		req.qpobj.gu.ok = false;
		req.qpobj.gu.msg = "分红融资 : 数据格式错误！";
		next();
	}
};
LZR.Node.Srv.GuSrv.prototype.ajaxHdEastDvd.lzrClass_ = LZR.Node.Srv.GuSrv;

// 主要指标的ajax回调处理
LZR.Node.Srv.GuSrv.prototype.ajaxHdEastMain = function (r/*as:string*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var m, o = LZR.fillPro(req, "qpobj.gu.dat");
	LZR.fillPro(o, "err").main = [];
	m = this.parser.crtByTmp (r, this.tmp.main, LZR.fillPro(o, "report"), o.err.main);

	if (req.params.init) {
		if (o.sid[1] === "0") {
			o.sid[1] = "1";
			this.ajax.qry("eastMain", req, res, next, o.sid);
			return;
		}
	} else if (m[1] <= o.info.rpTim) {
		LZR.del(o, "report");
		next();
		return;
	}

	console.log (o.info.nam + " : 4. 已获取主要指标");
	o.sid[1] = "&a=";
	this.ajax.qry("eastBlc", req, res, next, o.sid);
};
LZR.Node.Srv.GuSrv.prototype.ajaxHdEastMain.lzrClass_ = LZR.Node.Srv.GuSrv;

// 收入构成的ajax回调处理
LZR.Node.Srv.GuSrv.prototype.ajaxHdEastCop = function (r/*as:string*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var t, o = LZR.fillPro(req, "qpobj.gu.dat");
	if (this.parser.parseCop (r, o.report)) {
		console.log (o.info.nam + " : 8. 已获取收入构成");
		t = this.arrange (o);	// 数据整理
		console.log (o.info.nam + " : 9. 数据整理完毕");

		if (req.params.init) {
			o.sid[0] = o.sid[0].toLocaleLowerCase();
			o.sid[1] = 4799;
			o.sid.push(t);
			this.ajax.qry("sinaH", req, res, next, o.sid);
		} else {
			next();
		}
	} else {
		req.qpobj.gu.ok = false;
		req.qpobj.gu.msg = "收入构成 : ";
		if (r && r.message) {
			req.qpobj.gu.msg += r.message;
		} else {
			req.qpobj.gu.msg += "数据格式错误！";
		}
		next();
	}
};
LZR.Node.Srv.GuSrv.prototype.ajaxHdEastCop.lzrClass_ = LZR.Node.Srv.GuSrv;

// 循环查询
LZR.Node.Srv.GuSrv.prototype.qryRun = function (r/*as:string*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/, tmp/*as:string*/, anam/*as:string*/, msg/*as:string*/)/*as:boolean*/ {
	var m, o = LZR.fillPro(req, "qpobj.gu.dat");
	r = this.utJson.toObj(r);
	if (typeof(r) === "string") {
		if (r !== "null") {
			LZR.fillPro(o, "err")[tmp] = [];
			m = this.parser.crtByTmp (r, this.tmp[tmp], o.report, o.err[tmp]);
			if (m[0] > o.info.rpTim) {
				o.sid[1] = this.utTim.formatUTC(m[0], 1, "yyyy%2FMM%2Fdd+0%3A00%3A00");
				this.ajax.qry(anam, req, res, next, o.sid);
				return false;
			}
		}
	} else {
		req.qpobj.gu.ok = false;
		req.qpobj.gu.msg = msg + " : " + (r.message || "数据格式错误！");
		next();
		return false;
	}
	return true;
};
LZR.Node.Srv.GuSrv.prototype.qryRun.lzrClass_ = LZR.Node.Srv.GuSrv;

// 错误处理
LZR.Node.Srv.GuSrv.prototype.hdErr = function (e/*as:Object*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var o = LZR.fillPro(req, "qpobj.gu");
	if (o.dat) {
		o.ok = false;
		o.msg = "连接错误 : " + e;
		next();
	} else {
		res.send("连接错误 : " + e);
	}
};
LZR.Node.Srv.GuSrv.prototype.hdErr.lzrClass_ = LZR.Node.Srv.GuSrv;

// 数据整理
LZR.Node.Srv.GuSrv.prototype.arrange = function (d/*as:Object*/)/*as:Array*/ {
	var i, s, o, ni, nmt, r = [], nt;
	ni = d.num.length - 1;	// 股本指针
	nmt = d.num[ni].tim;	// 最小股本记录日
	for (s in d.report) {
		// 此循环默认报告期是从小到大遍历的
		if (s > d.info.rpTim) {
			o = d.report[s];
			o.typ = "report";
			o.id = d.id;
			o.tim = s - 0;
			o.nam = d.info.nam;

			// 判断股本
			if (o.tim < nmt) {
				if (o.profit && o.profit.np.parent && o.profit.eps) {
					o.num = Math.floor(o.profit.np.parent / o.profit.eps.base);
				}
			} else {
				while (ni && o.tim >= d.num[ni - 1].tim) {
					ni --;
				}
				o.num = d.num[ni].t;
			}

			// 年、季
			i = this.utTim.getDate(this.utTim.parseDayTimestamp(o.tim));
			o.year = i.getFullYear();
			o.quarter = Math.floor( i.getMonth() / 3 ) + 1;

			// 补充资产负债率
			if (o.balance) {
				if (!o.balance.liability) {
					o.balance.liability = {
						t: 0
					};
				}
				if (o.balance.assets) {
					o.balance.dar = o.balance.liability.t / o.balance.assets.t * 100;
				}
			}

			// 补充毛利率
			if (o.profit && o.profit.inc && o.profit.cost) {
				o.profit.gpm = (o.profit.inc.ot - o.profit.cost.ot) / o.profit.inc.ot * 100;
			}

			// 补充年化扣非每股收益
			if (!o.num && r.length) {
				// 股本推算
				o.num = r[r.length - 1].num;
			}
			if (o.num) {
				if (o.quarter === 4 && o.profit && o.profit.np.nt) {
					nt = o.profit.np.nt.t;
				}
				if (nt) {
					o.pe = {p: (nt / o.num)};
					r.push(o);
				}
			}
		} else {
			LZR.del(d.report, s);
		}
	}

	// 补充基本信息-最新报告期
	if (o && d.info.rpTim < o.tim) {
		d.info.rpTim = o.tim;
		d.info.eps = o.pe.p;
	}

	return r;
};
LZR.Node.Srv.GuSrv.prototype.arrange.lzrClass_ = LZR.Node.Srv.GuSrv;

// 市盈率分析
LZR.Node.Srv.GuSrv.prototype.calcEps = function (o/*as:Array*/, d/*as:Array*/) {
	var i, j, k, t, p, a1, a2;
	t = this.utTim.getDayTimestamp();	// 当日时间戳
	p = [];
	i = 0;
	j = 0;

	var getP = function (pi) {
		if (pi < o.length) {
			if (!p[pi] && (o[pi].tim + 150 <= t)) {
				p[pi] = {
					s: o[pi].tim,
					e: o[pi].tim + 150,
					d: []
				};
			}
			return p[pi];
		}
		return null;
	};

	while (i < d.length) {
		a1 = getP(j);
		if (a1) {
			k = d[i].tim;
			if (k < a1.e) {
				if (k >= a1.s) {
					a1.d.push(d[i]);
					a2 = getP(j + 1);
					if (a2 && k >= a2.s) {
						a2.d.push(d[i]);
					}
				}
				i ++;
			} else {
				if (!a1.d.length) {
					p[j] = null;
				}
				j ++;
			}
		} else {
			break;
		}
	}

	for (i = 0; i < p.length; i ++) {
		if (p[i]) {
			k = p[i].d;
			t = o[i].pe;
			if (t.p > 0.003) {
				t.o = k[0].o / t.p;
				t.h = k[0].h;
				t.l = k[0].l;
				t.v = k[0].v;
				t.m = k[0].t;
				for (j = 1; j < k.length; j ++) {
					t.v += k[j].v;
					t.m += k[j].t;
					if (k[j].h > t.h) {
						t.h = k[j].h;
					}
					if (k[j].l < t.l) {
						t.l = k[j].l;
					}
				}
				t.c = k[j - 1].c / t.p;
				t.h /= t.p;
				t.l /= t.p;
				t.m = t.m / t.v / t.p;
				t.f = (t.c - t.o) / t.o * 100;
				t.vf = t.v / k.length / o[i].num * 100;
				t.r = (t.m + t.l) / 2;
				t.rf = (t.h - t.l) / t.r * 100;

				// 计算同比 ry
				k = 1;
				while (k <= i) {
					a1 = o[i].year - o[i - k].year;
					if (a1 > 1) {
						break;
					} else if ((a1 === 1) && (o[i].quarter === o[i - k].quarter) && (o[i - k].pe.r)){
						t.ry = (t.r - o[i - k].pe.r) / o[i - k].pe.r * 100;
						break;
					}
					k ++;
				}
			}
		}
	}
};
LZR.Node.Srv.GuSrv.prototype.calcEps.lzrClass_ = LZR.Node.Srv.GuSrv;

// 获取全部代码
LZR.Node.Srv.GuSrv.prototype.getAllId = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	this.db.get(req, res, next,
		{typ: "info"},
		{"_id": 0, "id": 1, "nam": 1, "ec": 1, "eps": 1, "rpTim": 1, "daye": 1},
	true);
};
LZR.Node.Srv.GuSrv.prototype.getAllId.lzrClass_ = LZR.Node.Srv.GuSrv;

// 添加初始化
LZR.Node.Srv.GuSrv.prototype.addInit = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var s, o, t, a = [];
	o = this.parser.parseAddIds(req.body.ids);
	for (s in o) {
		a.push(s);
	}
	if (a.length) {
		// 验证欲添加的ID是否已经存在
		t = LZR.fillPro(req, "qpobj");
		t.ids = o;
		t.idCount = a.length;
		this.db.get(req, res, next,
			{typ: "info", id: {"$in": a}},
			{"_id": 0, "id": 1}, true);
	} else {
		t = LZR.fillPro(req, "qpobj.tmpo");
		t.msg = "数据无效！";
		this.tmpRo.sendTmp(req, res, next, "add");
	}
};
LZR.Node.Srv.GuSrv.prototype.addInit.lzrClass_ = LZR.Node.Srv.GuSrv;

// 保存添加
LZR.Node.Srv.GuSrv.prototype.addSav = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var t = req.qpobj;
	if (t.comDbSrvReturn.length < t.idCount) {
		for (i = 0; i < t.comDbSrvReturn.length; i ++) {
			LZR.del(t.ids, t.comDbSrvReturn[i].id);
		}
		var s, a = [];
		for (s in t.ids) {
			a.push(t.ids[s]);
		}
		this.db.add(req, res, next, null, a, true);
	} else {
		t = LZR.fillPro(req, "qpobj.tmpo");
		t.msg = "欲添加的数据已存在！无需再次添加。";
		this.tmpRo.sendTmp(req, res, next, "add");
	}
};
LZR.Node.Srv.GuSrv.prototype.addSav.lzrClass_ = LZR.Node.Srv.GuSrv;

// 结束添加
LZR.Node.Srv.GuSrv.prototype.addEnd = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	if (req.qpobj.comDbSrvReturn.result.n) {
		res.redirect(req.baseUrl + "/qry_mgInfo/");
	} else {
		t = LZR.fillPro(req, "qpobj.tmpo");
		t.msg = "添加失败！";
		req.qpobj.cont = req.body.ids;
		next();
	}
};
LZR.Node.Srv.GuSrv.prototype.addEnd.lzrClass_ = LZR.Node.Srv.GuSrv;

// 更新获取基础数据
LZR.Node.Srv.GuSrv.prototype.updateGetInfo = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	LZR.fillPro(req, "qpobj").gu = this.clsR.get({
		id: req.params.id,
		sid: [this.parser.getEc(req.params.id) + req.params.id]
	});
	if (this.tmp) {
		if (req.params.init) {
			this.ajax.qry("sinaK", req, res, next, req.qpobj.gu.dat.sid);
		} else {
			this.db.get(req, res, next,
				{typ: "info", id: req.params.id},
				{_id:0, nam:1, eps:1, num:1, numA:1, numTim:1, dvdTim:1, rpTim:1, days:1, daye:1},
			true);
		}
	} else {
		req.qpobj.gu.ok = false;
		req.qpobj.gu.msg = "缺少模板！";
		next();
	}
};
LZR.Node.Srv.GuSrv.prototype.updateGetInfo.lzrClass_ = LZR.Node.Srv.GuSrv;

// 更新获取股本
LZR.Node.Srv.GuSrv.prototype.updateGetNum = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var o = LZR.fillPro(req, "qpobj.gu");
	if (o.ok) {
		// 整理好基本信息
		if (req.params.init) {
			o.dat.info.ec = o.dat.sid[0].substr(0, 2);
			o = o.dat.info;
			o.eps = 0;
			o.num = 0;
			o.numA = 0;
			o.numTim = 0;
			o.dvdTim = 0;
			o.rpTim = 0;
			o.days = 0;
			o.daye = 0;
		} else {
			if (req.qpobj.comDbSrvReturn.length) {
				o.dat.info = req.qpobj.comDbSrvReturn[0];
			} else {
				o.ok = false;
				o.msg = "代码不存在！";
				next();
				return;
			}
		}

		o = req.qpobj.gu.dat;
		console.log (o.info.nam + " : 1. 已获取基础数据");
		o.sid[0] = o.sid[0].toLocaleUpperCase();
		this.ajax.qry("eastNum", req, res, next, o.sid);
	} else {
		next();
	}
};
LZR.Node.Srv.GuSrv.prototype.updateGetNum.lzrClass_ = LZR.Node.Srv.GuSrv;

// 保存更新
LZR.Node.Srv.GuSrv.prototype.updateSav = function (o/*as:Object*/) {
	var i, j, k, t, addo = [];
	t = this.utTim.getDayTimestamp();	// 当日时间戳

	// 记录错误信息
	for (i in o.err) {
		if (o.err[i].length) {
			addo.push({
				typ: "error",
				id: o.id,
				tim: t,
				msg: o.err
			});
			break;
		}
	}

	// 股本
	for (i = o.num.length - 1; i >= 0; i --) {
		if (o.num[i].tim > o.info.numTim) {
			addo.push(o.num[i]);
		}
	}
	k = o.num[0];
	if (o.info.numTim < k.tim) {
		o.info.numTim = k.tim;
		o.info.num = k.t;
		o.info.numA = k.a;
	}

	// 分红
	for (i = o.dvd.length - 1; i >= 0; i --) {
		if (o.dvd[i].tim > o.info.dvdTim) {
			addo.push(o.dvd[i]);
		}
	}
	k = o.dvd[0];
	if (k && (k.tim > o.info.dvdTim) && (k.regTim === 0 || k.regTim > t)) {
		o.info.dvdTim = k.tim;
		o.info.dvd = {
			cn: k.cn
		};
		if (k.gift) {
			o.info.dvd.gift = k.gift;
		}
		if (k.transfer) {
			o.info.dvd.transfer = k.transfer;
		}
		if (k.dividend) {
			o.info.dvd.dividend = k.dividend;
		}
		if (k.dt) {
			o.info.dvd.dt = k.dt;
		}
	} else {
		o.info.dvd = null;
		o.info.dvdTim = 0;
	}

	// 年报
	if (o.report) {
		for (i in o.report) {
			addo.push(o.report[i]);
		}
	}

	if (addo.length) {
		this.db.mdb.qry("addGu", null, null, null, [addo]);
		this.db.mdb.qry("setGu", null, null, null, [{typ:"info", id:o.id}, {"$set": o.info}]);
	}

	// 日线
	if (o.k) {
		this.db.mdb.qry("addK", null, null, null, [o.k]);
	}
};
LZR.Node.Srv.GuSrv.prototype.updateSav.lzrClass_ = LZR.Node.Srv.GuSrv;

// 结束更新
LZR.Node.Srv.GuSrv.prototype.updateEnd = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var o = LZR.fillPro(req, "qpobj.gu");
	if (o.ok) {
		// res.json(o);
		// return;
		this.updateSav(o.dat);
	}
	if (req.body.mt) {
		if (o.ok) {
			LZR.fillPro(req, "qpobj.tmpo").msg = "完成";
		} else {
			LZR.fillPro(req, "qpobj.tmpo").msg = o.msg;
		}
		this.qryRo.qry(req, res, next);
	} else {
		res.json(o);
	}
};
LZR.Node.Srv.GuSrv.prototype.updateEnd.lzrClass_ = LZR.Node.Srv.GuSrv;

// 收盘
LZR.Node.Srv.GuSrv.prototype.closing = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var d = LZR.fillPro(req, "qpobj.comDbSrvReturn");
	if (d.length) {
		var i, t, r, s = "";
		for (i = 0; i < d.length; i ++) {
			s += d[i].ec;
			s += d[i].id;
			s += ",";
		}
		this.ajax.qry("sinaK", req, res, next, [s]);
	} else {
		res.json(this.clsR.get(null, "缺少代码！"));
	}
};
LZR.Node.Srv.GuSrv.prototype.closing.lzrClass_ = LZR.Node.Srv.GuSrv;

// 收盘保存
LZR.Node.Srv.GuSrv.prototype.closingSav = function (r/*as:Object*/) {
	if (r.adds.length) {
		this.db.mdb.qry("addK", null, null, null, [r.adds]);
	}
	if (r.ok.length) {
		this.db.mdb.qry("setGu", null, null, null, [
			{typ:"info", id: {"$in": r.ok}},
			{"$set": {daye: r.tim}}
		]);
	}
	if (r.nam.length) {
		for (i = 0; i < r.nam.length; i ++) {
			this.db.mdb.qry("setGu", null, null, null, r.nam[i]);
		}
	}
};
LZR.Node.Srv.GuSrv.prototype.closingSav.lzrClass_ = LZR.Node.Srv.GuSrv;
