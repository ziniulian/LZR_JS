/*************************************************
作者：子牛连
类名：ParseBySohu
说明：搜狐网数据解析
创建日期：20-三月-2019 11:49:54
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Gu",
	"LZR.Base.Time"
], "LZR.Pro.Gu.ParseBySohu");
LZR.Pro.Gu.ParseBySohu = function (obj) {
	// 主要指标模板
	this.tmpMain = null;	/*as:Array*/

	// 利润表模板
	this.tmpPf = null;	/*as:Array*/

	// 资产负债表模板
	this.tmpBlc = null;	/*as:Array*/

	// 现金流量表模板
	this.tmpCash = null;	/*as:Array*/

	// 股本结构模板
	this.tmpNum = null;	/*as:Array*/

	// 时间工具
	this.utTim/*m*/ = LZR.getSingleton(LZR.Base.Time);	/*as:LZR.Base.Time*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Gu.ParseBySohu.prototype.className_ = "LZR.Pro.Gu.ParseBySohu";
LZR.Pro.Gu.ParseBySohu.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Gu.ParseBySohu");

// 构造器
LZR.Pro.Gu.ParseBySohu.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		/*
			错误代码说明：
				301 : 解析失败
				302 : 模板不匹配
				303 : 连接失败
		*/
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Gu.ParseBySohu.prototype.init_.lzrClass_ = LZR.Pro.Gu.ParseBySohu;

// 对构造参数的特殊处理
LZR.Pro.Gu.ParseBySohu.prototype.hdObj_ = function (obj/*as:Object*/) {

};
LZR.Pro.Gu.ParseBySohu.prototype.hdObj_.lzrClass_ = LZR.Pro.Gu.ParseBySohu;

// 页面解析
LZR.Pro.Gu.ParseBySohu.prototype.parseHTML = function (htm/*as:string*/, cssnam/*as:string*/)/*as:Object*/ {
	var s = htm.lastIndexOf("<table class=\"" + cssnam + "\">");
	var e = htm.lastIndexOf("</table>") + 8;
	if (s === -1 || e === -1) {
		return null;
	} else {
		return htm.substring(s, e);
	}
};
LZR.Pro.Gu.ParseBySohu.prototype.parseHTML.lzrClass_ = LZR.Pro.Gu.ParseBySohu;

// 获取数值
LZR.Pro.Gu.ParseBySohu.prototype.getVal = function (txt/*as:string*/)/*as:int*/ {
	var r = parseFloat(txt);
	return isNaN(r) ? 0 : r;
};
LZR.Pro.Gu.ParseBySohu.prototype.getVal.lzrClass_ = LZR.Pro.Gu.ParseBySohu;

// 表格解析
LZR.Pro.Gu.ParseBySohu.prototype.parseTab = function (tab/*as:string*/)/*as:Array*/ {
	var s, i, n, r = [];
	var a = tab.replace(/\s/g, "").split("<th");
	for (i = 1; i < a.length; i ++) {
		s = a[i].replace(/(^.*(?=>.*<\/th>)>)|(<\/t[hd]><\/tr>.*$)/g, "");
		s = s.replace(/<\/t[hd]>/g, "|,|").replace(/<[^>]+>/g,"");
		r.push(s.split("|,|"));
	}
	return r;
};
LZR.Pro.Gu.ParseBySohu.prototype.parseTab.lzrClass_ = LZR.Pro.Gu.ParseBySohu;

// 解析主要指标
LZR.Pro.Gu.ParseBySohu.prototype.parseMain = function (htm/*as:string*/, tmp/*as:Array*/)/*as:Array*/ {
	var i, j, k, n, a, r = 301;
	// http://q.stock.sohu.com/cn/600519/cwzb.shtml
	i = htm.indexOf("<title>");
	j = htm.indexOf("(", i);
	n = htm.substring(i + 7 , j);
	a = this.parseHTML(htm, "reportA");
	if (a) {
		a = this.parseTab(a);
		r = {
			nam: n,
			dat: a
		};
	}
	return r;
};
LZR.Pro.Gu.ParseBySohu.prototype.parseMain.lzrClass_ = LZR.Pro.Gu.ParseBySohu;

// 解析利润表
LZR.Pro.Gu.ParseBySohu.prototype.parsePf = function (htm/*as:string*/, tmp/*as:Array*/)/*as:Array*/ {
	var a = this.parseHTML(htm, "tableP"), r = 301;
	// http://q.stock.sohu.com/cn/600519/lr.shtml
	if (!tmp) {
		tmp = this.tmpPf;
	}
	if (a) {
		r = [];
		a = this.parseTab(a);
		r = a;
	}
	return r;
};
LZR.Pro.Gu.ParseBySohu.prototype.parsePf.lzrClass_ = LZR.Pro.Gu.ParseBySohu;

// 解析资产负债表
LZR.Pro.Gu.ParseBySohu.prototype.parseBlc = function (htm/*as:string*/, tmp/*as:Array*/)/*as:Array*/ {
	var a = this.parseHTML(htm, "tableP"), r = 301;
	// http://q.stock.sohu.com/cn/600519/zcfz.shtml
	if (!tmp) {
		tmp = this.tmpBlc;
	}
	if (a) {
		r = [];
		a = this.parseTab(a);
		r = a;
	}
	return r;
};
LZR.Pro.Gu.ParseBySohu.prototype.parseBlc.lzrClass_ = LZR.Pro.Gu.ParseBySohu;

// 解析现金流量表
LZR.Pro.Gu.ParseBySohu.prototype.parseCash = function (htm/*as:string*/, tmp/*as:Array*/)/*as:Array*/ {
	var a = this.parseHTML(htm, "tableP"), r = 301;
	// http://q.stock.sohu.com/cn/600519/xjll.shtml
	if (!tmp) {
		tmp = this.tmpCash;
	}
	if (a) {
		r = [];
		a = this.parseTab(a);
		r = a;
	}
	return r;
};
LZR.Pro.Gu.ParseBySohu.prototype.parseCash.lzrClass_ = LZR.Pro.Gu.ParseBySohu;

// 解析股本
LZR.Pro.Gu.ParseBySohu.prototype.parseNum = function (htm/*as:string*/, tmp/*as:Array*/)/*as:Array*/ {
	var a = this.parseHTML(htm, "tableC"), r = 301;
	// http://q.stock.sohu.com/cn/600519/gbjg.shtml
	if (!tmp) {
		tmp = this.tmpNum;
	}
	if (a) {
		r = [];
		a = this.parseTab(a);
		r = a;
	}
	return r;
};
LZR.Pro.Gu.ParseBySohu.prototype.parseNum.lzrClass_ = LZR.Pro.Gu.ParseBySohu;

// 解析收入构成
LZR.Pro.Gu.ParseBySohu.prototype.parseInc = function (htm/*as:string*/)/*as:Object*/ {
	var a, i, j, r = 301;
	// http://q.stock.sohu.com/cn/600519/srgc.shtml
	i = htm.indexOf("：</s");	// 获取时间
	if (i > 0) {
		j = this.utTim.getDayTimestamp(htm.substr(i + 8, 10) + " 0:0");
		a = this.parseHTML(htm, "tableF");
		if (a) {
			a = this.parseTab(a);
			r = {
				tim: j,
				inccop:[]
			};
			j = 1;
			for (i = 0; i < a.length; i ++) {
				if (a[i].length > 3) {
					r.inccop.push ({
						typ: j,
						item: a[i][0],
						scale: this.getVal(a[i][1]),
						income: this.getVal(a[i][2])*1000000,
						incyoy: this.getVal(a[i][3]),
						cost: this.getVal(a[i][4])*1000000,
						gp: this.getVal(a[i][5]),
						gpyoy: this.getVal(a[i][6])
					});
				} else if (a[i][0].indexOf("总计") > -1) {
					j ++;
				}
			}
		}
	}
	return r;
};
LZR.Pro.Gu.ParseBySohu.prototype.parseInc.lzrClass_ = LZR.Pro.Gu.ParseBySohu;

// 解析分红
LZR.Pro.Gu.ParseBySohu.prototype.parseDvd = function (htm/*as:string*/)/*as:Array*/ {
	var s, e, i, j, k, a = "", r = 301;
	// http://q.stock.sohu.com/cn/600519/fhsp.shtml
	s = htm.indexOf("<table class=\"tableO\">");
	while (s > 0) {
		e = htm.indexOf("</table>", s) + 8;
		a += htm.substring(s, e).replace(/\s/g, "");
		s = htm.indexOf("<table class=\"tableO\">", e);
	}
	if (a) {
		a = a.match(/(\d{4}-\d{2}-\d{2})|(<tdrowspan[^<]+)/g);
		r = [];
		for (i = 0; i < a.length; i ++) {
			s = a[i];
			i++;
			if (a[i].length > 15) {	// 避开 <tdrowspan="2"> 字段
				s = {
					exdTim: this.utTim.getDayTimestamp(s + " 0:0")
				};
				e = a[i].split("；");
				for (j = 0; j < e.length; j ++) {
					if ((k = e[j].indexOf("派息")) > -1) {
						k += 2;
						s.dividend = this.getVal(e[j].substr(k));
					} else if ((k = e[j].indexOf("送")) > -1) {
						k ++;
						s.gift = this.getVal(e[j].substr(k));
					} else if ((k = e[j].indexOf("增")) > -1) {
						k ++;
						s.transfer = this.getVal(e[j].substr(k));
					} else if ((k = e[j].indexOf("配股价")) > -1) {
						k += 3;
						s.ap = this.getVal(e[j].substr(k));
					} else if ((k = e[j].indexOf("配")) > -1) {
						k ++;
						s.allotment = this.getVal(e[j].substr(k));
					} else if (e[j]) {
						s.msg = a[i];
					}
				}
				i ++;
				s.tim = this.utTim.getDayTimestamp(a[i] + " 0:0");
				r.push(s);
			}
		}
	}
	return r;
};
LZR.Pro.Gu.ParseBySohu.prototype.parseDvd.lzrClass_ = LZR.Pro.Gu.ParseBySohu;

// 解析业绩预告
LZR.Pro.Gu.ParseBySohu.prototype.parseAnt = function (htm/*as:string*/)/*as:Array*/ {
	var i, j, t, f, s, r = 301;
	// http://q.stock.sohu.com/cn/600519/yjyg.shtml
	i = htm.indexOf("BIZ_itemB_header");
	if (i > 0) {
		r = [];
		while (i > -1) {
			i += 20;
			i = htm.indexOf("预计<strong>", i) + 10;
			t = this.utTim.getDayTimestamp(htm.substr(i, 10) + " 0:0");
			i += 20;
			i = htm.indexOf("增长", i) + 2;
			j = htm.indexOf("%", i);
			f = this.getVal(htm.substring(i, j));
			i = htm.indexOf("BIZ_itemB_content", i) + 20;
			i = htm.indexOf("<p>", i) + 3;
			j = htm.indexOf("</p>", i);
			s = htm.substring(i, j);
			r.push({
				tim: t,
				f: f,
				msg: s,
				typ:"anticipation"
			});
			i = htm.indexOf("BIZ_itemB_header", i);
		}
	}
	return r;
};
LZR.Pro.Gu.ParseBySohu.prototype.parseAnt.lzrClass_ = LZR.Pro.Gu.ParseBySohu;

// 设置模板
LZR.Pro.Gu.ParseBySohu.prototype.setTmp = function (tmp/*as:Object*/) {
	this.tmpMain = tmp.main;
	this.tmpPf = tmp.profit;
	this.tmpBlc = tmp.balance;
	this.tmpCash = tmp.cash;
	this.tmpNum = tmp.num;
};
LZR.Pro.Gu.ParseBySohu.prototype.setTmp.lzrClass_ = LZR.Pro.Gu.ParseBySohu;

// 创建模板
LZR.Pro.Gu.ParseBySohu.prototype.crtTmp = function (htm/*as:string*/, cssnam/*as:string*/)/*as:Array*/ {
	var i, j, a = this.parseHTML(htm, cssnam), r = false;
	if (a) {
		a = this.parseTab(a);
		r = [];
		j = 0;
		for (i = 0; i < a.length; i ++) {
			if (a[i].length > 2) {
				r.push([a[i][0], j]);
				j ++;
			} else {
				r.push(a[i][0]);
			}
		}
	}
	return r;
};
LZR.Pro.Gu.ParseBySohu.prototype.crtTmp.lzrClass_ = LZR.Pro.Gu.ParseBySohu;
