/*************************************************
作者：子牛连
类名：ParseByEastmoney
说明：东方财富数据解析
创建日期：04-四月-2019 16:03:57
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Gu",
	"LZR.Base.Json",
	"LZR.Base.Time"
], "LZR.Pro.Gu.ParseByEastmoney");
LZR.Pro.Gu.ParseByEastmoney = function (obj) {
	// JSON工具
	this.utJson/*m*/ = LZR.getSingleton(LZR.Base.Json);	/*as:LZR.Base.Json*/

	// 时间工具
	this.utTim/*m*/ = LZR.getSingleton(LZR.Base.Time);	/*as:LZR.Base.Time*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Gu.ParseByEastmoney.prototype.className_ = "LZR.Pro.Gu.ParseByEastmoney";
LZR.Pro.Gu.ParseByEastmoney.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Gu.ParseByEastmoney");

// 构造器
LZR.Pro.Gu.ParseByEastmoney.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Gu.ParseByEastmoney.prototype.init_.lzrClass_ = LZR.Pro.Gu.ParseByEastmoney;

// 对构造参数的特殊处理
LZR.Pro.Gu.ParseByEastmoney.prototype.hdObj_ = function (obj/*as:Object*/) {

};
LZR.Pro.Gu.ParseByEastmoney.prototype.hdObj_.lzrClass_ = LZR.Pro.Gu.ParseByEastmoney;

// 数值转换
LZR.Pro.Gu.ParseByEastmoney.prototype.getVal = function (s/*as:string*/, typ/*as:int*/)/*as:int*/ {
	var r = s;
	switch (typ) {
		case 1:	// 转换为数字
			r = parseFloat(s.replace(/,/g, ""));
			if (isNaN(r)) {
				r = 0;
			}
			break;
		case 2:	// 转换为日时间戳
			r = this.utTim.getDayTimestamp(s);
			break;
		case 3:	// 转换为数字，需注意后边的单位（万、亿 等）
			s = s.replace(/,/g, "");
			r = s.search(/[^\d\.-]/);
			var b = s.substr(r);
			r = parseFloat(s);
			if (isNaN(r)) {
				r = 0;
			} else {
				switch (b) {
					case "万":
						r *= 10000;
						break;
					case "百万":
						r *= 1000000;
						break;
					case "亿":
						r *= 100000000;
						break;
				}
				r = Math.floor(r);
			}
			break;
		case 4:	// 转换为日时间戳，需添加 0:0 后缀
			r = this.utTim.getDayTimestamp(s + " 0:0");
			break;
		case 5:	// 转换为日时间戳，需补齐四位年数，添加 0:0 后缀
			r = parseFloat(s);
			if (r < 90) {
				s = "20" + s;
			} else if (r < 100) {
				s = "19" + s;
			}
			r = this.utTim.getDayTimestamp(s + " 0:0");
			break;
	}
	return r;
};
LZR.Pro.Gu.ParseByEastmoney.prototype.getVal.lzrClass_ = LZR.Pro.Gu.ParseByEastmoney;

// 获取所属交易所
LZR.Pro.Gu.ParseByEastmoney.prototype.getEc = function (id/*as:string*/)/*as:string*/ {
	return id[0] === "6" ? "sh" : "sz";
};
LZR.Pro.Gu.ParseByEastmoney.prototype.getEc.lzrClass_ = LZR.Pro.Gu.ParseByEastmoney;

// 设置值
LZR.Pro.Gu.ParseByEastmoney.prototype.setVal = function (o/*as:Object*/, p/*as:string*/, v/*as:Object*/) {
	var a = p.split(".");
	var n = a.length - 1;
	var i, r = o;
	for (i = 0; i < n; i ++) {
		if (!r[a[i]]) {
			r[a[i]] = {};
		}
		r = r[a[i]];
	}
	r[a[n]] = v;
};
LZR.Pro.Gu.ParseByEastmoney.prototype.setVal.lzrClass_ = LZR.Pro.Gu.ParseByEastmoney;

// 收入构成赋值
LZR.Pro.Gu.ParseByEastmoney.prototype.setCop = function (o/*as:Array*/, d/*as:Object*/) {
	for (var i = 0; i < d.length; i ++) {
		o.push({
			item: d[i].zygc,
			inc: this.getVal(d[i].zysr, 3),
			cost: this.getVal(d[i].zycb, 3),
			scl: this.getVal(d[i].lrbl, 1),
			incScl: this.getVal(d[i].srbl, 1),
			costScl: this.getVal(d[i].cbbl, 1),
			gpm: this.getVal(d[i].mll, 1)
		});
	}
};
LZR.Pro.Gu.ParseByEastmoney.prototype.setCop.lzrClass_ = LZR.Pro.Gu.ParseByEastmoney;

// 解析新浪实时日线
LZR.Pro.Gu.ParseByEastmoney.prototype.parseK = function (a/*as:string*/, sr/*as:Array*/)/*as:Object*/ {
	var i, j, r, d, t;
	a = a.split(";");
	a.pop();
	t = this.utTim.getDayTimestamp();
	r = {
		tim: t,
		ok: [],	// 需要更新的ID
		nam: [],	// 需要变动名称的
		stop: [],	// 停牌的
		err: [],	// 错误的
		miss: [],	// 已更新过无需再次提交的
		adds: []	// 需要更新的具体数据
	};

	for (i = 0; i < a.length; i ++) {
		d = a[i].split(",");
		if (d.length < 10) {
			r.err.push(sr[i]);
		} else {
			// 名称检查
			j = d[0].indexOf("\"") + 1;
			j = d[0].substring(j, d[0].length);
			if (sr[i].nam !== j) {
				r.nam.push([
					{typ: "info", id: sr[i].id},
					{"$set": {nam: j}}
				]);
			}

			if (sr[i].daye < t) {
				if (this.getVal(d[1], 1)) {
					j = sr[i].eps;
					r.adds.push({
						id: sr[i].id,
						tim: t,
						c: this.getVal(d[3], 1),
						o: this.getVal(d[1], 1),
						h: this.getVal(d[4], 1),
						l: this.getVal(d[5], 1),
						f: (d[3] - d[2]) / d[2] * 100,
						v: this.getVal(d[8], 1),
						t: this.getVal(d[9], 1),
						cc: d[9] / d[8],
						p: (j && j > 0.003) ? (d[9] / d[8] / j) : 0,
					});
					r.ok.push(sr[i].id);
				} else {
					r.stop.push(sr[i]);
				}
			} else {
				r.miss.push(sr[i].id);
			}
		}
	}

	return r;
};
LZR.Pro.Gu.ParseByEastmoney.prototype.parseK.lzrClass_ = LZR.Pro.Gu.ParseByEastmoney;

// 解析新浪历史日线
LZR.Pro.Gu.ParseByEastmoney.prototype.parseHistoryK = function (d/*as:string*/, id/*as:string*/, sr/*as:Array*/)/*as:Array*/ {
	var i, j, p, e, r, o;
	// r = this.utJson.toObj(d);
	r = eval(d);
	if (r && r.length) {
		o = [];
		j = 1;
		p = r[0].open;
		e = sr[0].pe.p;
		for (i = 0; i < r.length; i ++) {
			d = {
				id: id,
				tim: this.getVal(r[i].day, 4),
				c: this.getVal(r[i].close, 1),
				o: this.getVal(r[i].open, 1),
				h: this.getVal(r[i].high, 1),
				l: this.getVal(r[i].low, 1),
				v: this.getVal(r[i].volume, 1),
				p: 0
			};
			d.f = (d.c - p) / p * 100;	// 涨幅
			d.cc = d.c;	// 假设均价等于收盘价
			d.t = d.v * d.cc;	// 推算成交额
			p = d.c;

			// 计算扣非市盈率
			if (d.tim >= sr[0].tim) {
				if (j && d.tim >= sr[j].tim) {
					j ++;
					if (j < sr.length) {
						e = sr[j].pe.p;
					} else {
						j = 0;
					}
				}
				if (e > 0.003) {
					d.p = d.cc / e;
				}
			}

			o.push(d);
		}
	}

	return o;
};
LZR.Pro.Gu.ParseByEastmoney.prototype.parseHistoryK.lzrClass_ = LZR.Pro.Gu.ParseByEastmoney;

// 解析股本
LZR.Pro.Gu.ParseByEastmoney.prototype.parseNum = function (d/*as:string*/, id/*as:string*/)/*as:Array*/ {
	d = this.utJson.toObj(d);
	if (!d || !d.ShareChangeList) {
		return null;
	}
	var i, j, k, n, o = [];
	d = d.ShareChangeList;
	n = d[0].changeList.length - 1;
	for (i = 0; i <= n; i ++) {
		k = {
			typ: "num",
			id: id,
			tim: this.getVal(d[0].changeList[i], 4),
			t: Math.floor(this.getVal(d[1].changeList[i], 1) * 10000),
			o: {}
		};
		for (j = 2; j < d.length; j ++) {
			switch (d[j].des) {
				case "已上市流通A股":
					k.a = Math.floor(this.getVal(d[j].changeList[i], 1) * 10000);
					break;
				case "变动原因":
					k.msg = d[j].changeList[i];
					break;
				default:
					k.o[d[j].des] = Math.floor(this.getVal(d[j].changeList[i], 1) * 10000);
					break;
			}
		}
		if ((i === 0) || (i === n) || (k.msg !== "定期报告")) {
			o.push (k);
		}
	}
	if (o.length > 1 && o[0].msg === "定期报告" && o[0].a === o[1].a && o[0].t === o[1].t) {
		o.shift();
	}

	return o;
};
LZR.Pro.Gu.ParseByEastmoney.prototype.parseNum.lzrClass_ = LZR.Pro.Gu.ParseByEastmoney;

// 解析分红
LZR.Pro.Gu.ParseByEastmoney.prototype.parseDvd = function (d/*as:string*/, id/*as:string*/)/*as:Array*/ {
	d = this.utJson.toObj(d);
	if (!d || !d.fhyx || !d.pgmx || !d.zfmx) {
		return null;
	}
	var i, j, k, a, o = [];

	// 分红
	for (i = 0; i < d.fhyx.length; i ++) {
		a = d.fhyx[i].fhfa;
		if (a[0] !== "不") {
			k = {
				typ: "dvd",
				id: id,
				tim: this.getVal(d.fhyx[i].ggrq, 4),
				regTim: this.getVal(d.fhyx[i].gqdjr, 4) || 0,
				exdTim: this.getVal(d.fhyx[i].cqcxr, 4) || 0,
				cn: this.getVal(a, 1)
			};
			a = a.match(/[送转派后][\d\.]+/g);
			for (j = 0; j < a.length; j ++) {
				switch (a[j][0]) {
					case "送":
						k.gift = this.getVal(a[j].substr(1), 1);
						break;
					case "转":
						k.transfer = this.getVal(a[j].substr(1), 1);
						break;
					case "派":
						k.dividend = this.getVal(a[j].substr(1), 1);
						break;
					case "后":
						k.dt = this.getVal(a[j].substr(1), 1);
						break;
				}
			}
			o.push(k);
		}
	}

	// 配股
	for (i = 0; i < d.pgmx.length; i ++) {
		o.push({
			typ: "dvd",
			id: id,
			tim: this.getVal(d.pgmx[i].pgggr, 5),
			regTim: this.getVal(d.pgmx[i].gqdjr, 5),
			exdTim: this.getVal(d.pgmx[i].cqjzr, 5),
			allotment: {
				p: this.getVal(d.pgmx[i].pgjg, 1),
				n: this.getVal(d.pgmx[i].pgfa, 1),
				num: Math.floor( this.getVal(d.pgmx[i].sjpgsl, 1) * 10000 )
			}
		});
	}

	// 增发
	for (i = 0; i < d.zfmx.length; i ++) {
		o.push({
			typ: "dvd",
			id: id,
			tim: this.getVal(d.zfmx[i].zfsj, 5),
			regTim: this.getVal(d.zfmx[i].gqdjr, 5),
			exdTim: this.getVal(d.zfmx[i].zfssr, 5),
			addIss: {
				p: this.getVal(d.zfmx[i].zfjg, 1),
				num: Math.floor( this.getVal(d.zfmx[i].sjzfsl, 1) * 10000 ),
				net: Math.floor( this.getVal(d.zfmx[i].sjmjje, 1) * 10000 ),
				msg: d.zfmx[i].fxfs
			}
		});
	}

	return o;
};
LZR.Pro.Gu.ParseByEastmoney.prototype.parseDvd.lzrClass_ = LZR.Pro.Gu.ParseByEastmoney;

// 解析收入构成
LZR.Pro.Gu.ParseByEastmoney.prototype.parseCop = function (r/*as:string*/, o/*as:Object*/)/*as:Object*/ {
	r = this.utJson.toObj(r);
	if (!r || !r.zygcfx) {
		return null;
	}

	var i, d, t;
	if (!o) {
		o = {};
	}
	r = r.zygcfx;
	for (i = 0; i < r.length; i ++) {
		t = this.getVal(r[i].rq, 2);
		d = LZR.fillPro(o, t + ".profit.cop");
		if (r[i].cp) {
			d.goods = [];
			this.setCop(d.goods, r[i].cp);
		}
		if (r[i].qy) {
			d.area = [];
			this.setCop(d.area, r[i].qy);
		}
		if (r[i].hy) {
			d.industry = [];
			this.setCop(d.industry, r[i].hy);
		}
	}
	return o;
};
LZR.Pro.Gu.ParseByEastmoney.prototype.parseCop.lzrClass_ = LZR.Pro.Gu.ParseByEastmoney;

// 依模板解析
LZR.Pro.Gu.ParseByEastmoney.prototype.crtByTmp = function (d/*as:string*/, t/*as:Object*/, r/*as:Object*/, e/*as:Array*/)/*as:Array*/ {
	var i, s, o, v, m = [0, 0];	// 最小时间, 最大时间
	d = this.utJson.toObj(d);
	for (i = 0; i < d.length; i ++) {
		o = {};
		for (s in d[i]) {
			if (t[s]) {
				if (t[s][1]) {
					v = this.getVal(d[i][s], t[s][1]);
					if (v) {
						this.setVal (o, t[s][0], v);
					}
				}
			} else {
				e.push(s);	// 错误记录
			}
		}

		// 记录最大最小时间
		if (o.tim > m[1]) {
			m[1] = o.tim;
		}
		if (!m[0] || o.tim < m[0]) {
			m[0] = o.tim;
		}

		// 数据存储
		if (!r[o.tim]) {
			r[o.tim] = {};
		}
		for (s in o) {
			if (s !== "tim") {
				r[o.tim][s] = o[s];
			}
		}
	}
	return m;
};
LZR.Pro.Gu.ParseByEastmoney.prototype.crtByTmp.lzrClass_ = LZR.Pro.Gu.ParseByEastmoney;

// 解析ID信息
LZR.Pro.Gu.ParseByEastmoney.prototype.parseAddIds = function (ids/*as:string*/)/*as:Object*/ {
	var a, b, c, r, i;
	a = ids.replace(/\r?\n/g, ";").replace(/\n/g, ";").split(";");
	r = {};
	for (i = 0; i < a.length; i ++) {
		b = a[i].split(",");
		c = b.shift();
		if (c.search(/^\d{6}$/) === 0) {
			r[c] = {
				typ: "info",
				id: c,
				sim: b
			};
		}
	}
	return r;
};
LZR.Pro.Gu.ParseByEastmoney.prototype.parseAddIds.lzrClass_ = LZR.Pro.Gu.ParseByEastmoney;
