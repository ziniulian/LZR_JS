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

		var exeGetClosingIds = LZR.bind(this, this.getClosingIds);
		this.ro.hdPost("*");
		this.ro.post("/add/", LZR.bind(this, this.addInit));
		this.ro.post("/add/", LZR.bind(this, this.addSav));
		this.ro.post("/add/", LZR.bind(this, this.addEnd));
		this.ro.post("/qry_mgInfo/update/:id/:init?/", LZR.bind(this, this.updateGetInfo));	// 获取基础数据
		this.ro.post("/qry_mgInfo/update/:id/:init?/", LZR.bind(this, this.updateGetNum));	// 查询股本
		this.ro.post("/qry_mgInfo/update/:id/:init?/", LZR.bind(this, this.updateEnd));	// 结束更新
		this.ro.get("/closing/", exeGetClosingIds);
		this.ro.get("/closing/", LZR.bind(this, this.closing, "closing"));
		this.ro.get("/chart/:id/:y?/", LZR.bind(this, this.qryChartDat));
		this.ro.get("/chart/:id/:y?/", LZR.bind(this, this.crtChart));
		this.ro.get("/calcNt5/", LZR.bind(this, this.qryReport5));
		this.ro.get("/calcNt5/", LZR.bind(this, this.calcNt5));
		this.ro.get("/stockSelecter/:y?/:m?/", this.exeGetAllId);
		this.ro.get("/stockSelecter/:y?/:m?/", LZR.bind(this, this.qrySelecterDat));
		this.ro.get("/stockSelecter/:y?/:m?/", LZR.bind(this, this.hdSelecterDat));
		this.ro.get("/addP/:ec/:pid/:nam/", LZR.bind(this, this.addP));
		this.ro.get("/addP/:ec/:pid/:nam/", LZR.bind(this, this.addHdP));
		this.ro.get("/catcher/:days/", exeGetClosingIds);
		this.ro.get("/catcher/:days/", LZR.bind(this, this.closing, "skCatcher"));
		this.ro.get("/catcher/:days/", LZR.bind(this, this.catcherQryHistary));
		this.ro.get("/catcher/:days/", LZR.bind(this, this.catcherStatistics));
		this.ro.all("/test/", this.exeGetAllId);
		this.ro.all("/test/", LZR.bind(this, this.testHdIds));
		this.ro.post("/test/", LZR.bind(this, this.testGetK));
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
		console.log (req.qpobj.gu.dat.info.nam + " : 5. 资产负债表 - " + req.qpobj.gu.dat.sid[1]);
		if (this.qryRun(r, req, res, next, "balance", "eastBlc", "资产负债表")) {
			req.qpobj.gu.dat.sid[1] = "&a=";
			this.ajax.qry("eastPf", req, res, next, req.qpobj.gu.dat.sid);
		}
	}));

	// 东方财富——利润表
	this.ajax.evt.eastPf.add (LZR.bind(this, function (r, req, res, next) {
		console.log (req.qpobj.gu.dat.info.nam + " : 6. 利润表 - " + req.qpobj.gu.dat.sid[1]);
		if (this.qryRun(r, req, res, next, "profit", "eastPf", "利润表")) {
			req.qpobj.gu.dat.sid[1] = "&a=";
			this.ajax.qry("eastCash", req, res, next, req.qpobj.gu.dat.sid);
		}
	}));

	// 东方财富——现金流量表
	this.ajax.evt.eastCash.add (LZR.bind(this, function (r, req, res, next) {
		console.log (req.qpobj.gu.dat.info.nam + " : 7. 现金流量表 - " + req.qpobj.gu.dat.sid[1]);
		if (this.qryRun(r, req, res, next, "cash", "eastCash", "现金流量表")) {
			req.qpobj.gu.dat.sid[1] = "";
			this.ajax.qry("eastCop", req, res, next, req.qpobj.gu.dat.sid);
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
	switch (req.qpobj.skTyp) {	// 新浪K线回调类型
	case "update":	// 更新数据初始化 —— 获取新加代码的名称
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
		break;
	case "closing":	// 收盘
		r = this.parser.parseClosingK(r, LZR.fillPro(req, "qpobj.comDbSrvReturn"));
		this.closingSav(r);
		res.send(
			"<table width=\"50%\"><tr><td>tim</td><td>" + r.tim +
			"</td></tr><tr><td>ok</td><td>" + r.ok.length +
			"</td></tr><tr><td>miss</td><td>" + r.miss.length +
			"</td></tr><tr><td>stop</td><td>" + r.stop.length +
			"</td></tr><tr><td>err</td><td>" + r.err.length + "</td></tr></table>" +
			"<script>console.log(" + this.utJson.toJson(r.stop) +
			");console.log(" + this.utJson.toJson(r.err) + ");</script>"
		);
		break;
		case "skCatcher":
			req.qpobj.skCatcher = this.parser.parseK(r);
			next();
			break;
	}
};
LZR.Node.Srv.GuSrv.prototype.ajaxHdSinaK.lzrClass_ = LZR.Node.Srv.GuSrv;

// 新浪历史数据的ajax回调处理
LZR.Node.Srv.GuSrv.prototype.ajaxHdSinaH = function (r/*as:string*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	switch (req.qpobj.skTyp) {
	case "guH" :	// 股票历史数据
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
	break;
	case "addHdP" :		// 指数历史数据
		var i, d, a, p, o;
		d = eval(r);
		a = [];
		if (d && d.length) {
			p = d[0].open - 0;
			for (i = 0; i < d.length; i ++) {
				o = {
					pid: req.params.pid,
					tim: this.parser.getVal(d[i].day, 4),
					c: this.parser.getVal(d[i].close, 1),
					o: this.parser.getVal(d[i].open, 1),
					h: this.parser.getVal(d[i].high, 1),
					l: this.parser.getVal(d[i].low, 1),
					v: this.parser.getVal(d[i].volume, 1)
				};
				o.f = (o.c - p) / p * 100;
				o.cc = o.c;
				p = o.c;
				a.push(o);
			}
			this.db.mdb.qry("setGu", null, null, null, [{
				typ:"infoP", pid: req.params.pid
			}, {"$set": {
				days: a[0].tim, daye: o.tim, p: o.c
			}}]);
			this.db.mdb.qry("addK", null, null, null, [a]);
			res.send("OK!");
		} else {
			res.send("历史数据获取失败！");
		}
		break;
	}
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
			req.qpobj.skTyp = "guH";
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
	var i, s, o, ni, nmt, r = [];
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
					d.info.nt = o.profit.np.nt.t;
				}
				if (d.info.nt) {
					o.pe = {
						p: (d.info.nt / o.num),
					};
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
		{"_id": 0, id: 1, nam: 1, ec: 1, abb: 1, p: 1, pe: 1, nt: 1, num: 1, rpTim: 1, daye: 1, wc:1, sim:1, dvd:1},
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
			req.qpobj.skTyp = "update";
			this.ajax.qry("sinaK", req, res, next, req.qpobj.gu.dat.sid);
		} else {
			this.db.get(req, res, next,
				{typ: "info", id: req.params.id},
				{_id:0, nam:1, nt:1, num:1, numA:1, numTim:1, dvdTim:1, rpTim:1, days:1, daye:1},
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
			o.nt = 0;
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
	o.info.dvdTim = k.tim;
	if (k && (k.regTim === 0 || k.regTim > t)) {
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
LZR.Node.Srv.GuSrv.prototype.closing = function (typ/*as:string*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var d = LZR.fillPro(req, "qpobj.comDbSrvReturn");
	if (d.length) {
		var i, t, r, s = "";
		for (i = 0; i < d.length; i ++) {
			s += d[i].ec;
			s += d[i].id || d[i].pid;
			s += ",";
		}
		req.qpobj.skTyp = typ;
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
	for (i = 0; i < r.ok.length; i ++) {
		this.db.mdb.qry("setGu", null, null, null, r.ok[i]);
	}
};
LZR.Node.Srv.GuSrv.prototype.closingSav.lzrClass_ = LZR.Node.Srv.GuSrv;

// 获取图表相关数据
LZR.Node.Srv.GuSrv.prototype.qryChartDat = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var c = {id: req.params.id, typ: "report"};
	if (req.params.y) {
		c.quarter = 4;
	}
	this.db.get (req, res, next, c,
		{"_id": 0, nam: 1, num: 1, tim: 1, year: 1, quarter: 1, pe: 1,
			"profit.inc.otyoy": 1,	// 营业收入同比变化
			"profit.np.nt.yoy": 1,	// 扣非净利润同比变化
			// "profit.gpm": 1,	// 毛利率
			// "balance.dar": 1,	// 资产负债率
			"balance.equity.t": 1,	// 净资产
			"profit.np.t": 1,		// 净利润
			"profit.np.nt.t": 1,	// 扣非净利润
			"profit.inc.ot": 1	// 营业收入
		},
	true);
};
LZR.Node.Srv.GuSrv.prototype.qryChartDat.lzrClass_ = LZR.Node.Srv.GuSrv;

// 生成图表数据
LZR.Node.Srv.GuSrv.prototype.crtChart = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var i, j, o, r = req.qpobj.comDbSrvReturn;
	if (r.length) {
		o = LZR.fillPro(req, "qpobj.chart");
		o.pro = req.params;
		o.dat = {	// 基础数据
			x: [],	// X轴坐标
			k: [],	// K线市盈率
			m: [],	// 平均市盈率
			r: [],	// 安全市盈率
			yoy: {	// 同比信息
				pe: [],	// 市盈率安全边际同比变化
				inc: [],	// 营业收入同比变化
				nt: []	// 扣非净利润同比变化
			},
			t: {	// 总值
				e: [],	// 净资产
				np: [],	// 净利润
				nt: [],	// 扣非净利润
				inc: [],	// 营业收入
			}
		};

		for (i = 0; i < r.length; i ++) {
			o.dat.x[i] = r[i].year + "年" + r[i].quarter + "季";
			if (r[i].pe && r[i].pe.r) {
				o.dat.k[i] = [ r[i].pe.o.toFixed(2), r[i].pe.c.toFixed(2), r[i].pe.l.toFixed(2), r[i].pe.h.toFixed(2) ];
				o.dat.m[i] = r[i].pe.m.toFixed(2);
				o.dat.r[i] = r[i].pe.r.toFixed(2);
				j = r[i].pe.ry;
				o.dat.yoy.pe[i] = j ? j.toFixed(2) : j;
			} else {
				o.dat.k[i] = [];
			}
			j = LZR.fillPro(r[i], "profit.inc.otyoy", true);
			o.dat.yoy.inc[i] = j ? j.toFixed(2) : j;
			j = LZR.fillPro(r[i], "profit.np.nt.yoy", true);
			o.dat.yoy.nt[i] = j ? j.toFixed(2) : j;
			j = LZR.fillPro(r[i], "balance.equity.t", true);
			o.dat.t.e[i] = j ? j.toFixed(0) : j;
			j = LZR.fillPro(r[i], "profit.np.t", true);
			o.dat.t.np[i] = j ? j.toFixed(0) : j;
			j = LZR.fillPro(r[i], "profit.np.nt.t", true);
			o.dat.t.nt[i] = j ? j.toFixed(0) : j;
			j = LZR.fillPro(r[i], "profit.inc.ot", true);
			o.dat.t.inc[i] = j ? j.toFixed(0) : j;
		}

		o.op = this.crtChartOp(o.dat);
		o.op.k.title.text = r[0].nam + (o.pro.y ? "（年报）" : "（季度报）");
	}
	next();
};
LZR.Node.Srv.GuSrv.prototype.crtChart.lzrClass_ = LZR.Node.Srv.GuSrv;

// 生成图表参数
LZR.Node.Srv.GuSrv.prototype.crtChartOp = function (d/*as:Object*/) {
	return {
		k: {	// K线图
			title: {	//标题
				text: "",
				left: 0
			},
			tooltip: {	//提示框
				trigger: "axis",	//触发类型：坐标轴触发
				axisPointer: {	//坐标轴指示器配置项
					type: "cross"	//指示器类型，十字准星
				}
			},
			grid: {	//直角坐标系
				show: true,
				left: "10%",	//grid组件离容器左侧的距离
				right: "10%",
				bottom: "15%",
				//backgroundColor:"#ccc"
			},
			xAxis: {
				type: "category",	//坐标轴类型，类目轴
				data: d.x,
				//scale: true,	//只在数字轴中有效
				boundaryGap : true,	//刻度作为分割线，标签和数据点会在两个刻度上
				axisLine: {onZero: false},
				splitLine: {show: false},	//是否显示坐标轴轴线
				//splitNumber: 20,	//坐标轴的分割段数，预估值，在类目轴中无效
				min: "dataMin",	//特殊值，数轴上的最小值作为最小刻度
				max: "dataMax"	//特殊值，数轴上的最大值作为最大刻度
			},
			yAxis: {
				scale: true,	//坐标刻度不强制包含零刻度
				splitArea: {
					show: true	//显示分割区域
				}
			},
			dataZoom: [	//用于区域缩放
				{
					filterMode:"filter",	//当前数据窗口外的数据被过滤掉来达到数据窗口缩放的效果  默认值filter
					type: "inside",	//内置型数据区域缩放组件
					start: 50,	//数据窗口范围的起始百分比
					end: 100	//数据窗口范围的结束百分比
				},
				{
					show: true,
					type: "slider"	//滑动条型数据区域缩放组件
				}
			],
			legend: {	//图例控件，点击图例控制哪些系列不现实
				data: ["K线", "均线", "安全边际"]
			},
			series: [	//图表类型
				{
					name: "K线",
					type: "candlestick",	//K线图
					data: d.k,	//y轴对应的数据
				},{
					name: "均线",
					type: "line",
					data: d.m,
					smooth: true,	// 平滑曲线
					symbol: "none"	// 取消折线图上的小圆点
				},{
					name: "安全边际",
					type: "line",
					data: d.r,
					smooth: true,
					symbol: "none"
				}
			]
		},
		yoy: {	// 同比图
			tooltip: {
				trigger: "axis"
			},
			xAxis: {
				boundaryGap : true,
				data: d.x
			},
			yAxis: {
				splitArea: {
					show: true
				}
			},
			dataZoom: [
				{
					filterMode:"filter",
					type: "inside",
					start: 50,
					end: 100
				},
				{
					show: false
				}
			],
			legend: {
				data: ["扣非净利润同比变化", "营业收入同比变化", "市盈率同比变化"]
			},
			series: [
				{
					name: "扣非净利润同比变化",
					type: "line",
					smooth: true,
					data: d.yoy.nt
				},
				{
					name: "营业收入同比变化",
					type: "line",
					smooth: true,
					data: d.yoy.inc
				},
				{
					name: "市盈率同比变化",
					type: "line",
					smooth: true,
					data: d.yoy.pe
				}
			]
		},
		t: {	// 总值图
			tooltip: {
				trigger: "axis"
			},
			xAxis: {
				boundaryGap : true,
				data: d.x
			},
			yAxis: {
				splitArea: {
					show: true
				}
			},
			dataZoom: [
				{
					filterMode:"filter",
					type: "inside",
					start: 50,
					end: 100
				},
				{
					show: false
				}
			],
			legend: {
				data: ["营业收入", "净资产", "净利润", "扣非净利润"]
			},
			series: [
				{
					name: "营业收入",
					type: "line",
					smooth: true,
					data: d.t.inc
				},
				{
					name: "净资产",
					type: "line",
					smooth: true,
					data: d.t.e
				},
				{
					name: "净利润",
					type: "line",
					smooth: true,
					data: d.t.np
				},
				{
					name: "扣非净利润",
					type: "line",
					smooth: true,
					data: d.t.nt
				}
			]
		},
		v: {}	// 成交量图
	};
};
LZR.Node.Srv.GuSrv.prototype.crtChartOp.lzrClass_ = LZR.Node.Srv.GuSrv;

// 获取近五年年报
LZR.Node.Srv.GuSrv.prototype.qryReport5 = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	this.db.get (req, res, next,
		{typ: "report", quarter: 4, year: {"$gte": new Date().getFullYear() - 6}},
		{"_id": 0, id: 1, year: 1, "profit.np.nt": 1, "profit.inc.otyoy": 1},
	true);
};
LZR.Node.Srv.GuSrv.prototype.qryReport5.lzrClass_ = LZR.Node.Srv.GuSrv;

// 计算并更新近5年平均净利润
LZR.Node.Srv.GuSrv.prototype.calcNt5 = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var i, o, s, d = {}, a = req.qpobj.comDbSrvReturn;
	for (i = 0; i < a.length; i ++) {
		o = d[a[i].id];
		if (!o) {
			o = {
				nt: [],	// 扣非净利润
				nty: [],		// 扣非净利润同比
				ntymin: 0,	// 扣非净利润同比最小值
				oty: [],	// 营业收入同比
				otymin: 0	// 营业收入同比最小值
			};
			d[a[i].id] = o;
		}

		// 扣非净利润
		s = LZR.fillPro(a[i], "profit.np.nt.t", true);
		if (s) {
			o.nt.push(s);
			if (o.nt.length > 5) {
				o.nt.shift();
			}
		}

		// 扣非净利润同比
		s = LZR.fillPro(a[i], "profit.np.nt.yoy", true);
		if (s) {
			o.nty.push(s);
			if (o.nty.length > 5) {
				o.nty.shift();
			}
			if (!o.ntymin) {
				o.ntymin = s;
			}
		}

		// 营业收入同比
		s = LZR.fillPro(a[i], "profit.inc.otyoy", true);
		if (s) {
			o.oty.push(s);
			if (o.oty.length > 5) {
				o.oty.shift();
			}
			if (!o.otymin) {
				o.otymin = s;
			}
		}
	}
	for (s in d) {
		o = [0, 0, 0];
		for (i = 0; i < d[s].nt.length; i ++) {
			o[0] += d[s].nt[i];
		}
		for (i = 0; i < d[s].nty.length; i ++) {
			a = d[s].nty[i];
			o[1] += a;
			if (a < d[s].ntymin) {
				d[s].ntymin = a;
			}
		}
		for (i = 0; i < d[s].oty.length; i ++) {
			a = d[s].oty[i];
			o[2] += a;
			if (a < d[s].otymin) {
				d[s].otymin = a;
			}
		}
		this.db.mdb.qry("setGu", null, null, null, [{typ:"info", id:s}, {"$set": {
			wc:{
				nt5: o[0] / d[s].nt.length,
				nt5yoy: o[1] / d[s].nty.length,
				nt5yoyMin: d[s].ntymin,
				ot5yoy: o[2] / d[s].oty.length,
				ot5yoyMin: d[s].otymin
			}
		}}]);
	}
	res.send("OK!");
};
LZR.Node.Srv.GuSrv.prototype.calcNt5.lzrClass_ = LZR.Node.Srv.GuSrv;

// 年报查询器数据查询
LZR.Node.Srv.GuSrv.prototype.qrySelecterDat = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var y, m, d, o, i;
	if (req.params.y) {
		y = req.params.y - 0;
		m = req.params.m ? (req.params.m - 0) : 1;
	} else {
		d = new Date();
		y = d.getFullYear();
		m = d.getMonth();
		if (m < 4) {
			y --;
			m = 4;
		} else {
			m = math.floor(m / 3);
		}
	}

	d = LZR.fillPro(req, "qpobj.comDbSrvReturn");
	o = LZR.fillPro(req, "qpobj.ssdat");

	for (i = 0; i < d.length; i ++) {
		o[d[i].id] = {
			id: d[i].id,
			abb: d[i].abb,
			p: d[i].p,	// 当前价
			pe: d[i].pe.nt.toFixed(2),	// 相对上年度年报扣非净利润的市盈率
			pe5: d[i].pe.nt5.toFixed(2),	// 近5年平均扣非净利润的市盈率
			nt5: (d[i].wc.nt5 / d[i].num).toFixed(2),	// 近5年平均扣非每股收益
			nt5yoy: d[i].wc.nt5yoy.toFixed(2),	// 近5年平均扣非净利润同比
			nt5yoyMin: d[i].wc.nt5yoyMin.toFixed(2),	// 近5年扣非净利润同比最小值
			ot5yoy: d[i].wc.ot5yoy.toFixed(2),	// 近5年平均营业收入同比
			ot5yoyMin: d[i].wc.ot5yoyMin.toFixed(2),	// 近5年营业收入同比最小值
			safe: d[i].pe.safe,	// 安全值
			sim: d[i].sim[0],
			dvd: d[i].dvd ? ((d[i].dvd.gift ? "送" + d[i].dvd.gift : "") + (d[i].dvd.transfer ? "转" + d[i].dvd.transfer : "") + (d[i].dvd.dividend ? "派息" + d[i].dvd.dividend : "")) : ""
		};
	}
	o = LZR.fillPro(req, "qpobj.tim");
	o.y = y;
	o.m = m;

	this.db.get (req, res, next, { typ: "report", year: y, quarter: m },
		{_id:0, id:1, nam:1, num:1, "main.per.jbmgsy":1,	// 基本每股收益
			"main.per.mgjzc":1,	// 每股净资产
			"balance.equity.t":1,	// 净资产
			"main.per.mggjj":1,	// 每股公积金
			"balance.equity.parent.CAPITALRESERVE":1,	// 公积金
			"main.per.mgwfply":1,	// 每股未分配利润
			"balance.equity.parent.RETAINEDEARNING":1,	// 未分配利润
			"profit.inc.otyoy":1,	// 营业总收入同比增长
			"main.grop.gsjlrtbzz":1,	// 归属净利润同比增长
			"profit.np.nt":1,	// 扣非净利润同比增长
			"main.profit.jqjzcsyl":1,	// 加权净资产收益率
			"main.profit.tbjzcsyl":1,	// 摊薄净资产收益率
			"profit.gpm":1,	// 毛利率
			"balance.dar":1	// 资产负债率
		},
	true);
};
LZR.Node.Srv.GuSrv.prototype.qrySelecterDat.lzrClass_ = LZR.Node.Srv.GuSrv;

// 年报查询器数据整理
LZR.Node.Srv.GuSrv.prototype.hdSelecterDat = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	// 数据整理
	var i, d, o;
	var a = LZR.fillPro(req, "qpobj.ssdat");
	var b = LZR.fillPro(req, "qpobj.comDbSrvReturn");
	var fVal = function (o, pro, f) {
		var r = LZR.fillPro(o, pro, true);
		return isNaN(r) ? 0 : r.toFixed(f);
	};

	req.qpobj.ssdat = [];
	for (i = 0; i < b.length; i ++) {
		d = b[i];
		o = a[d.id];
		o.nam = d.nam;
		o.num = Math.floor(d.num);
		o.epsb = fVal(d, "main.per.jbmgsy", 2);	// 基本每股收益
		o.etp = fVal(d, "main.per.mgjzc", 2);	// 每股净资产
		o.et = fVal(d, "balance.equity.t", 0);	// 净资产
		o.nt = fVal(d, "profit.np.nt.t", 2);	// 扣非净利润同比增长
		o.eps = (o.nt / o.num).toFixed(2);	// 扣非每股收益
		if (!o.etp) {
			o.etp = (o.et / o.num).toFixed(2);
		}
		o.cap = fVal(d, "main.per.mggjj", 2);	// 每股公积金
		o.ca = fVal(d, "balance.equity.parent.CAPITALRESERVE", 0);	// 公积金
		if (!o.cap) {
			o.cap = (o.ca / o.num).toFixed(2);
		}
		o.rtp = fVal(d, "main.per.mgwfply", 2);	// 每股未分配利润
		o.rt = fVal(d, "balance.equity.parent.RETAINEDEARNING", 0);	// 未分配利润
		if (!o.rtp) {
			o.rtp = (o.rt / o.num).toFixed(2);
		}
		o.incyoy = fVal(d, "profit.inc.otyoy", 2);	// 营业总收入同比增长
		o.npyoy = fVal(d, "main.grop.gsjlrtbzz", 2);	// 归属净利润同比增长
		o.ntyoy = fVal(d, "profit.np.nt.yoy", 2);	// 扣非净利润同比增长
		o.roe = fVal(d, "main.profit.jqjzcsyl", 2);	// 加权净资产收益率	ROE
		o.roet = fVal(d, "main.profit.tbjzcsyl", 2);	// 摊薄净资产收益率
		o.gpm = fVal(d, "profit.gpm", 2);	// 毛利率
		o.dar = fVal(d, "balance.dar", 2);	// 资产负债率

		o.safe = fVal(o, "safe", 2);
		o.scd = false;	// 是否选中
		req.qpobj.ssdat.push(o);
	}

	next();
};
LZR.Node.Srv.GuSrv.prototype.hdSelecterDat.lzrClass_ = LZR.Node.Srv.GuSrv;

// 获取全部收盘代码
LZR.Node.Srv.GuSrv.prototype.getClosingIds = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	this.db.get(req, res, next,
		{typ: {"$in": ["info", "infoP"]}},
		{"_id": 0, id: 1, pid: 1, nam: 1, num: 1, ec: 1, abb: 1, nt: 1, wc: 1, daye: 1},
	true);
};
LZR.Node.Srv.GuSrv.prototype.getClosingIds.lzrClass_ = LZR.Node.Srv.GuSrv;

// 添加指数
LZR.Node.Srv.GuSrv.prototype.addP = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	this.db.add(req, res, next, {
		typ: "infoP",
		pid: req.params.pid,
	},{
		typ: "infoP",
		pid: req.params.pid,
		nam: req.params.nam,
		ec: req.params.ec
	}, true);
};
LZR.Node.Srv.GuSrv.prototype.addP.lzrClass_ = LZR.Node.Srv.GuSrv;

// 补充指数历史数据
LZR.Node.Srv.GuSrv.prototype.addHdP = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var o = LZR.fillPro(req, "qpobj.comDbSrvReturn");
	if (o.result.ok) {
		req.qpobj.skTyp = "addHdP";
		this.ajax.qry("sinaH", req, res, next, [req.params.ec + req.params.pid, 4799]);
	} else {
		res.send(this.clsR.get(null, "添加失败！"));
	}
};
LZR.Node.Srv.GuSrv.prototype.addHdP.lzrClass_ = LZR.Node.Srv.GuSrv;

// 趋势判断
LZR.Node.Srv.GuSrv.prototype.calcTrend = function (v/*as:double*/, h/*as:double*/, l/*as:double*/, k/*as:double*/)/*as:string*/ {
	if (!k) {
		k = 3;
	}
	var d = (h - l) / k;
	h -= d;
	l += d;
	if (v > h) {
		return "升";
	} else if (v < l) {
		return "降";
	} else {
		return "平";
	}
};
LZR.Node.Srv.GuSrv.prototype.calcTrend.lzrClass_ = LZR.Node.Srv.GuSrv;

// 量能抓取器查询历史数据
LZR.Node.Srv.GuSrv.prototype.catcherQryHistary = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var r = LZR.fillPro(req, "qpobj.comDbSrvReturn");
	var d = LZR.fillPro(req, "qpobj.skCatcher");
	req.qpobj.days = req.params.days - 0;
	var i, o, s, t, id;

	// 数据整理
	o = {p:{}, g:{}};
	for (i = 0; i < r.length; i ++) {
		if (r[i].id) {
			t = o.g;
			id = r[i].id;
		} else if (r[i].pid) {
			t = o.p;
			id = r[i].pid;
		}
		s = r[i].ec + id;
		t[id] = {
			ec: r[i].ec,
			id: id,
			nam: r[i].nam,
			abb: r[i].abb,
			num: r[i].num,
			vMax: 0,	// 最高量
			vMin: 0,	// 最低量
			pMax: 0,	// 最高价
			pMin: 0,	// 最低价
			vp: 0,	// 平均量
			vh: 0,	// 高倍率
			vl: 0,	// 低倍率
			vc: d[s].v,	// 当前量
			vf: r[i].num ? (d[s].v / r[i].num * 100).toFixed(2) : 0,	// 换手率
			c: d[s].c,	// 当前价
			f: d[s].f.toFixed(2),	// 涨幅
			tc: "平",	// 当前趋势
			t: "平",	// 总趋势
			dat: []
		};
	}

	// 历史查询
	LZR.fillPro(req, "qpobj.tmpo.qry");
	req.qpobj.skCatcher = o;
	req.qpobj.tmpo.qry.tn = "guk";
	this.db.get(req, res, next, {tim: {"$gte": (d.tim - req.params.days)}}, {"_id":0}, true);
};
LZR.Node.Srv.GuSrv.prototype.catcherQryHistary.lzrClass_ = LZR.Node.Srv.GuSrv;

// 量能抓取器数据统计
LZR.Node.Srv.GuSrv.prototype.catcherStatistics = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var r = LZR.fillPro(req, "qpobj.comDbSrvReturn");
	var d = LZR.fillPro(req, "qpobj.skCatcher");
	var i, j, k, o, t;

	for (i = 0; i < r.length; i ++) {
		o = r[i];
		if (o.id) {
			t = d.g[o.id];
		} else if (o.pid) {
			t = d.p[o.pid];
		}
		if (!t.vMax) {
			t.vMax = o.v;
			t.vMin = o.v;
			t.pMax = o.h;
			t.pMin = o.l;
		} else {
			if (o.v > t.vMax) {
				t.vMax = o.v;
			} else if (o.v < t.vMin) {
				t.vMin = o.v;
			}
			if (o.h > t.pMax) {
				t.pMax = o.h;
			} else if (o.l < t.pMin) {
				t.pMin = o.l;
			}
		}
		t.vp += o.v;
		t.dat.push(o);
	}

	o = [];
	r = {
		sh: d.p["000001"].f,
		sz: d.p["399001"].f
	};
	for (i in d) {
		for (j in d[i]) {
			t = d[i][j];
			t.vh = t.vMax ? (t.vc / t.vMax).toFixed(2) : 0;
			t.vl = t.vMin ? (t.vc / t.vMin).toFixed(2) : 0;
			t.vp = t.dat.length ? (t.vp / t.dat.length).toFixed(0) : 0;
			t.t = this.calcTrend(t.c, t.pMax, t.pMin, 5);

			// 判断当前趋势
			k = t.f - r[t.ec];
			if (k > 2.5) {
				t.tc = "升";
			} else if (k < -2.5) {
				t.tc = "降";
			}
			o.push(t);
		}
	}

	// res.json(o);
	req.qpobj.skCatcher = o;
	next();
};
LZR.Node.Srv.GuSrv.prototype.catcherStatistics.lzrClass_ = LZR.Node.Srv.GuSrv;

// 整理代码列表
LZR.Node.Srv.GuSrv.prototype.testHdIds = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var o = LZR.fillPro(req, "qpobj");
	o.ids = LZR.fillPro(req, "qpobj.comDbSrvReturn");
	next();
};
LZR.Node.Srv.GuSrv.prototype.testHdIds.lzrClass_ = LZR.Node.Srv.GuSrv;

// 获取个股的历史K线数据
LZR.Node.Srv.GuSrv.prototype.testGetK = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	if (!req.body.id) {
		next();
		return;
	}

	var d, t, o = LZR.fillPro(req, "qpobj.tmpo.qry");
	o.tn = "guk";
	d = {id: req.body.id};

	t = this.utTim.getDayTimestamp(req.body.days + " 0:0");
	if (t) {
		d.tim = {"$gte": t};
	}
	t = this.utTim.getDayTimestamp(req.body.daye + " 0:0");
	if (t) {
		LZR.fillPro(d, "tim")["$lte"] = t;
	}

	req.qpobj.pop = req.body;
	this.db.get(req, res, next, d, {"_id":0, id:0}, true);
};
LZR.Node.Srv.GuSrv.prototype.testGetK.lzrClass_ = LZR.Node.Srv.GuSrv;
