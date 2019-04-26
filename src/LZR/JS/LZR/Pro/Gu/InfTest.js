/*************************************************
作者：子牛连
类名：InfTest
说明：模拟测试统一接口
创建日期：22-四月-2019 15:08:47
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Gu",
	"LZR.Base.Time"
], "LZR.Pro.Gu.InfTest");
LZR.Pro.Gu.InfTest = function (obj) {
	// 历史日K线数据
	this.sr = null;	/*as:Array*/

	// 表格容器
	this.tabDoe = null;	/*as:Object*/

	// 结果容器
	this.resultDoe = null;	/*as:Object*/

	// 当前参数
	this.cp = {};	/*as:Object*/

	// 时间工具
	this.utTim/*m*/ = LZR.getSingleton(LZR.Base.Time);	/*as:LZR.Base.Time*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Gu.InfTest.prototype.className_ = "LZR.Pro.Gu.InfTest";
LZR.Pro.Gu.InfTest.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Gu.InfTest");

// 构造器
LZR.Pro.Gu.InfTest.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Gu.InfTest.prototype.init_.lzrClass_ = LZR.Pro.Gu.InfTest;

// 对构造参数的特殊处理
LZR.Pro.Gu.InfTest.prototype.hdObj_ = function (obj/*as:Object*/) {

};
LZR.Pro.Gu.InfTest.prototype.hdObj_.lzrClass_ = LZR.Pro.Gu.InfTest;

// 数据处理
LZR.Pro.Gu.InfTest.prototype.hdDat = function ()/*as:Array*/ {
	var i, o, r = [];
	this.getPro();
	for (i = this.cp.p > this.cp.v ? this.cp.p : this.cp.v; i < this.sr.length; i ++) {
		if (!((this.cp.days && this.sr[i].tim < this.cp.days) || (this.cp.daye && this.sr[i].tim > this.cp.daye))) {	// 挑出处在时间范围内的数据
			o = { s: this.sr[i] };
			if (this.cp.p) {
				this.calcP(i, this.cp.p, o);
			}
			if (this.cp.v) {
				this.calcV(i, this.cp.v, o);
			}
			if (this.match(o, i)) {
				r.push(this.calcResult(i, o));
			}
		}
	}
	return r;
};
LZR.Pro.Gu.InfTest.prototype.hdDat.lzrClass_ = LZR.Pro.Gu.InfTest;

// 刷新页面
LZR.Pro.Gu.InfTest.prototype.flush = function (dat/*as:Array*/, r/*as:Object*/) {
	var i, d, m = 0, n = 0;
	if (this.tabDoe) {
		this.tabDoe.innerHTML = "";
	}
	if (!r) {
		r = this.resultDoe;
		r.innerHTML = "";
	}
	for (i = 0; i < dat.length; i ++) {
		if (this.tabDoe) {
			this.crtR(dat[i]);
		}
		switch (dat[i].r) {
			case 1:	// 赢
				n ++;
				break;
			case 0:	// 输
				m ++;
				break;
		}
	}

	// 结果统计输出
	// 成功率
	d = document.createElement("td");
	d.innerHTML = n;
	if (dat.length) {
		d.innerHTML += " (" + (n / dat.length * 100).toFixed(2) + "%)";
	}
	r.appendChild(d);

	// 失败率
	d = document.createElement("td");
	d.innerHTML = m;
	if (dat.length) {
		d.innerHTML += " (" + (m / dat.length * 100).toFixed(2) + "%)";
	}
	r.appendChild(d);

	// 超时率
	d = document.createElement("td");
	d.innerHTML = dat.length - m - n;
	if (dat.length) {
		d.innerHTML += " (" + ((dat.length - m - n) / dat.length * 100).toFixed(2) + "%)";
	}
	r.appendChild(d);

	// 频率
	d = document.createElement("td");
	d.innerHTML = dat.length;
	if (this.sr.length) {
		d.innerHTML += " (" + (dat.length / this.sr.length * 100).toFixed(2) + "%)";
	}
	r.appendChild(d);
};
LZR.Pro.Gu.InfTest.prototype.flush.lzrClass_ = LZR.Pro.Gu.InfTest;

// 创建表格行
LZR.Pro.Gu.InfTest.prototype.crtR = function (o/*as:Object*/) {
	var r, d;
	r = document.createElement("tr");
	d = document.createElement("td");
	d.innerHTML = this.utTim.formatUTC(o.s.tim, 1, "date2");
	r.appendChild(d);
	d = document.createElement("td");
	d.innerHTML = o.t;
	r.appendChild(d);
	d = document.createElement("td");
	d.innerHTML = o.r ? (o.r === 1 ? "赢" : "") : "<span class='loss'>输</span>";
	r.appendChild(d);
	this.tabDoe.appendChild(r);
};
LZR.Pro.Gu.InfTest.prototype.crtR.lzrClass_ = LZR.Pro.Gu.InfTest;

// 计算平均价
LZR.Pro.Gu.InfTest.prototype.calcP = function (i/*as:int*/, day/*as:int*/, r/*as:Object*/)/*as:Object*/ {
	var j, t, n;
	if (!r) {
		r = {};
	}
	r.p = 0;
	for (j = i - day; j < i; j ++) {
		t = this.sr[j];
		if (r.p) {
			r.pc += t.t;
			n += t.v;
			if (r.ph < t.h) {
				r.ph = t.h;
			}
			if (r.pl > t.l) {
				r.pl = t.l;
			}
		} else {
			r.p = r.s.c;	// 当前价
			r.pc = t.t;		// 周期内平均价
			r.ph = t.h;		// 周期内最高价
			r.pl = t.l;		// 周期内最低价
			n = t.v;	// 周期内总量
		}
	}
	r.pc /= n;
	return r;
};
LZR.Pro.Gu.InfTest.prototype.calcP.lzrClass_ = LZR.Pro.Gu.InfTest;

// 计算平均量
LZR.Pro.Gu.InfTest.prototype.calcV = function (i/*as:int*/, day/*as:int*/, r/*as:Object*/)/*as:Object*/ {
	var j, t;
	if (!r) {
		r = {};
	}
	r.v = 0;
	for (j = i - day; j < i; j ++) {
		t = this.sr[j];
		if (r.v) {
			r.vc += t.v;
			if (r.vh < t.v) {
				r.vh = t.v;
			} else if (r.vl > t.v) {
				r.vl = t.v;
			}
		} else {
			r.v = r.s.v;	// 当前量
			r.vc = t.v;		// 周期内平均量
			r.vh = t.v;		// 周期内最高量
			r.vl = t.v;		// 周期内最低量
		}
	}
	r.vc /= day;
	return r;
};
LZR.Pro.Gu.InfTest.prototype.calcV.lzrClass_ = LZR.Pro.Gu.InfTest;

// 初始化参数
LZR.Pro.Gu.InfTest.prototype.initPro = function (doe/*as:Object*/, ip/*as:boolean*/) {
	var i, a, d, p, s;
	a = doe.childNodes;
	p = this.getProInit();
	for (i = 0; i < a.length; i ++) {
		d = a[i];
		if (d.nodeName === "SPAN") {
			s = d.childNodes[2];
			if (p[s.name] === undefined) {
				d.className = "Lc_nosee";
			} else {
				d.className = "";
				if (ip) {
					s.value = p[s.name];
				}
			}
		}
	}
};
LZR.Pro.Gu.InfTest.prototype.initPro.lzrClass_ = LZR.Pro.Gu.InfTest;

// 计算结果
LZR.Pro.Gu.InfTest.prototype.calcResult = function (i/*as:int*/, r/*as:Object*/) {
	if (!r.h) {	// 止盈
		r.h = r.p * this.cp.h;
	}
	if (!r.l) {	// 止损
		r.l = r.p * this.cp.l;
	}
	for (j = 1; j <= this.cp.d; j ++) {
		t = this.sr[i + j];
		if (t) {
			if (t.l < r.l) {
				r.t = j;
				r.r = 0;
				break;
			}
			if (t.h > r.h) {
				r.t = j;
				r.r = 1;
				break;
			}
		} else {
			break;
		}
	}
	if (!r.t) {
		r.t = j;	// 持仓天数
		r.r = 2;	// 测试结果 ： 1，成功；0，失败；2，超时
	}
	return r;
};
LZR.Pro.Gu.InfTest.prototype.calcResult.lzrClass_ = LZR.Pro.Gu.InfTest;

// 获取参数初始值
LZR.Pro.Gu.InfTest.prototype.getProInit = function ()/*as:Object*/ {
	return {
		zsy: 30,	// 止盈
		zss: 10,	// 止损
		dayd: 90,	// 天数周期
		dayp: 20,	// 价周期
		dayv: 5,	// 量周期
		// days: "1985-06-17",	// 起始时间
		// daye: this.utTim.format(new Date(), "date2"),	// 结束时间
		days: "",	// 起始时间
		daye: ""	// 结束时间
	};
};
LZR.Pro.Gu.InfTest.prototype.getProInit.lzrClass_ = LZR.Pro.Gu.InfTest;

// 获取参数
LZR.Pro.Gu.InfTest.prototype.getPro = function () {
	this.cp.h = zsy.value / 100 + 1;	// 止盈
	this.cp.l = zss.value / -100 + 1;	// 止损
	this.cp.d = dayd.value - 0;	// 天数周期
	this.cp.p = dayp.value - 0;	// 价周期
	this.cp.v = dayv.value - 0;	// 量周期
	this.cp.days = this.utTim.getDayTimestamp(days.value + " 0 =0");	// 起始时间
	this.cp.daye = this.utTim.getDayTimestamp(daye.value + " 0:0");	// 结束时间
};
LZR.Pro.Gu.InfTest.prototype.getPro.lzrClass_ = LZR.Pro.Gu.InfTest;

// 条件匹配
LZR.Pro.Gu.InfTest.prototype.match = function (o/*as:Object*/, i/*as:int*/)/*as:boolean*/ {
	if (
		o.v > o.vh	// 演示放量
	) {
		return true;
	}
	return false;
};
LZR.Pro.Gu.InfTest.prototype.match.lzrClass_ = LZR.Pro.Gu.InfTest;
