/*************************************************
作者：子牛连
类名：Tim
说明：时间
创建日期：27-七月-2016 12:30:04
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base.Val",
	"LZR.Base.Val.Ctrl",
	"LZR.Base.Time",
	"LZR.Util",
	"LZR.Base.Str"
], "LZR.Base.Val.Tim");
LZR.Base.Val.Tim = function (obj) {
	// 时间对象
	this.dt = null;	/*as:Date*/

	// 时间最大界限
	this.dtMax = null;	/*as:Date*/

	// 时间最小界限
	this.dtMin = null;	/*as:Date*/

	// 事件
	this.evt = null;	/*as:Object*/

	// 基础值
	this.vcBase/*m*/ = new LZR.Base.Val.Ctrl();	/*as:LZR.Base.Val.Ctrl*/

	// 时间工具
	this.utTim/*m*/ = LZR.getSingleton(LZR.Base.Time);	/*as:LZR.Base.Time*/

	// 通用工具
	this.utLzr/*m*/ = LZR.getSingleton(LZR.Util);	/*as:LZR.Util*/

	// 字串工具
	this.utStr/*m*/ = LZR.getSingleton(LZR.Base.Str);	/*as:LZR.Base.Str*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Base.Val.Tim.prototype.className_ = "LZR.Base.Val.Tim";
LZR.Base.Val.Tim.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.Val.Tim");

// 设置分钟
LZR.Base.Val.Tim.prototype.doMut = function (mut/*as:int*/, doEvt/*as:boolean*/)/*as:int*/ {
	if (mut || mut === 0) {
		mut = parseInt(mut, 10);
		if (!isNaN(mut) && mut>-1 && mut<60) {
			this.dt.setMinutes(mut);
			this.vcBase.set(this.dt.valueOf(), doEvt);
		}
	} else {
		return this.dt.getMinutes();
	}
};
LZR.Base.Val.Tim.prototype.doMut.lzrClass_ = LZR.Base.Val.Tim;

// 通过日期参数设置
LZR.Base.Val.Tim.prototype.setByDate = function (pro/*as:Date*/, doEvt/*as:boolean*/) {
	this.dt = this.hdTim(pro);
	this.vcBase.set(this.dt.valueOf(), doEvt);
};
LZR.Base.Val.Tim.prototype.setByDate.lzrClass_ = LZR.Base.Val.Tim;

// 设置
LZR.Base.Val.Tim.prototype.set = function (y/*as:int*/, m/*as:int*/, d/*as:int*/, h/*as:int*/, mut/*as:int*/, s/*as:int*/, f/*as:int*/, doEvt/*as:boolean*/) {
	var o = this.vcBase.get();
	this.doYear(y, false);
	this.doMon(m, false);
	this.doDay(d, false);
	this.doHour(h, false);
	this.doMut(mut, false);
	this.doSec(s, false);
	this.doMs(f, false);
	var v = this.vcBase.get();
	this.vcBase.set(o, false);
	this.vcBase.set(v, doEvt);
};
LZR.Base.Val.Tim.prototype.set.lzrClass_ = LZR.Base.Val.Tim;

// 格式化输出
LZR.Base.Val.Tim.prototype.format = function (fom/*as:string*/)/*as:string*/ {
	var key = "";
	var num = 0;
	var r = "";
	var print = function (f, d, k, n) {
		switch (k) {
			case "y":
				return f(d.getFullYear(), n, "0");
			case "M":
				return f( (d.getMonth() + 1), n, "0" );
			case "d":
				return f(d.getDate(), n, "0");
			case "h":
				return f(d.getHours(), n, "0");
			case "m":
				return f(d.getMinutes(), n, "0");
			case "s":
				return f(d.getSeconds(), n, "0");
			case "f":
				return f(d.getMilliseconds(), n, "0");
			default:
				return "";
		}
	};
	for (var i = 0; i<fom.length; i++) {
		switch (fom[i]) {
			case "y":
			case "M":
			case "d":
			case "h":
			case "m":
			case "s":
			case "f":
				if (key === fom[i]) {
					num ++;
				} else if (key === "") {
					key = fom[i];
					num = 1;
				} else {
					r += print(this.utStr.format, this.dt, key, num);
					key = fom[i];
					num = 1;
				}
				break;
			default:
				if (key) {
					r += print(this.utStr.format, this.dt, key, num);
					key = "";
					num = 0;
				}
				r += fom[i];
				break;
		}
	}
	if (key) {
		r += print(this.utStr.format, this.dt, key, num);
	}
	return r;
};
LZR.Base.Val.Tim.prototype.format.lzrClass_ = LZR.Base.Val.Tim;

// 月增减
LZR.Base.Val.Tim.prototype.addMon = function (mon/*as:int*/) {
	var d = this.dt.getDate();
	this.dt.setMonth(this.dt.getMonth() + mon);
	if (this.dt.getDate() !== d) {
		this.dt.setDate(0);
	}
	this.vcBase.set(this.dt.valueOf());
};
LZR.Base.Val.Tim.prototype.addMon.lzrClass_ = LZR.Base.Val.Tim;

// 时间增减
LZR.Base.Val.Tim.prototype.add = function (ms/*as:int*/) {
	this.vcBase.set( (this.vcBase.get() + ms) );
};
LZR.Base.Val.Tim.prototype.add.lzrClass_ = LZR.Base.Val.Tim;

// 处理基础值与时间对象的同步
LZR.Base.Val.Tim.prototype.base2Dt = function (v/*as:int*/) {
	if (this.dt.valueOf() !== v) {
		this.dt.setTime(v);
	}
};
LZR.Base.Val.Tim.prototype.base2Dt.lzrClass_ = LZR.Base.Val.Tim;

// 时间的界限检查
LZR.Base.Val.Tim.prototype.checkLimit = function (v/*as:int*/, s/*as:Object*/, o/*as:int*/, tmp/*as:Object*/) {
	if (this.dtMin && v < this.dtMin.valueOf()) {
		tmp.tmpVal = this.dtMin.valueOf();
	} else if (this.dtMax && v > this.dtMax.valueOf()) {
		tmp.tmpVal = this.dtMax.valueOf();
	}
};
LZR.Base.Val.Tim.prototype.checkLimit.lzrClass_ = LZR.Base.Val.Tim;

// 设置秒
LZR.Base.Val.Tim.prototype.doSec = function (sec/*as:int*/, doEvt/*as:boolean*/)/*as:int*/ {
	if (sec || sec === 0) {
		sec = parseInt(sec, 10);
		if (!isNaN(sec) && sec>-1 && sec<60) {
			this.dt.setSeconds(sec);
			this.vcBase.set(this.dt.valueOf(), doEvt);
		}
	} else {
		return this.dt.getSeconds();
	}
};
LZR.Base.Val.Tim.prototype.doSec.lzrClass_ = LZR.Base.Val.Tim;

// 构造器
LZR.Base.Val.Tim.prototype.init_ = function (obj/*as:Object*/) {
	this.evt = this.vcBase.evt;
	this.evt.before.add(this.utLzr.bind(this, this.checkLimit), "Tim_checkLimit");
	this.evt.set.add(this.utLzr.bind(this, this.base2Dt), "Tim_base2Dt");

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}

	if (typeof(this.vcBase.get()) !== "number") {
		if (!this.dt || isNaN(this.dt.valueOf())) {
			this.dt = new Date();
		}
		this.vcBase.set(this.dt.valueOf(), false);
	} else if (!this.dt || this.dt.valueOf() !== this.vcBase.get()) {
		this.dt = new Date(this.vcBase.get());
	}
};
LZR.Base.Val.Tim.prototype.init_.lzrClass_ = LZR.Base.Val.Tim;

// 设置小时
LZR.Base.Val.Tim.prototype.doHour = function (hour/*as:int*/, doEvt/*as:boolean*/)/*as:int*/ {
	if (hour || hour === 0) {
		hour = parseInt(hour, 10);
		if (!isNaN(hour) && hour>-1 && hour<24) {
			this.dt.setHours(hour);
			this.vcBase.set(this.dt.valueOf(), doEvt);
		}
	} else {
		return this.dt.getHours();
	}
};
LZR.Base.Val.Tim.prototype.doHour.lzrClass_ = LZR.Base.Val.Tim;

// 设置日
LZR.Base.Val.Tim.prototype.doDay = function (day/*as:int*/, doEvt/*as:boolean*/)/*as:int*/ {
	if (day) {
		day = parseInt(day, 10);
		if (!isNaN(day) && day>0 && day<32) {
			this.dt.setDate(day);
			if (this.dt.getDate() !== day) {
				this.dt.setDate(0);
			}
			this.vcBase.set(this.dt.valueOf(), doEvt);
		}
	} else {
		return this.dt.getDate();
	}
};
LZR.Base.Val.Tim.prototype.doDay.lzrClass_ = LZR.Base.Val.Tim;

// 设置月
LZR.Base.Val.Tim.prototype.doMon = function (mon/*as:int*/, doEvt/*as:boolean*/)/*as:int*/ {
	if (mon) {
		mon = parseInt(mon, 10);
		if (!isNaN(mon) && mon>0 && mon<13) {
			mon --;
			this.dt.setMonth(mon);
			if (this.dt.getMonth() !== mon) {
				this.dt.setDate(0);
			}
			this.vcBase.set(this.dt.valueOf(), doEvt);
		}
	} else {
		return (this.dt.getMonth() + 1);
	}
};
LZR.Base.Val.Tim.prototype.doMon.lzrClass_ = LZR.Base.Val.Tim;

// 设置年
LZR.Base.Val.Tim.prototype.doYear = function (year/*as:int*/, doEvt/*as:boolean*/)/*as:int*/ {
	if (year) {
		year = parseInt(year, 10);
		if (!isNaN(year)) {
			var m = this.dt.getMonth();
			this.dt.setFullYear(year);
			if (this.dt.getMonth() !== m) {
				this.dt.setDate(0);
			}
			this.vcBase.set(this.dt.valueOf(), doEvt);
		}
	} else {
		return this.dt.getFullYear();
	}
};
LZR.Base.Val.Tim.prototype.doYear.lzrClass_ = LZR.Base.Val.Tim;

// 处理日期参数
LZR.Base.Val.Tim.prototype.hdTim = function (pro/*as:Object*/)/*as:Date*/ {
	var r;
	switch(LZR.getClassName(pro)) {
		case "string":
			r = this.utTim.stringToDate(pro);
			break;
		case "Date":
			r = pro;
			break;
		default:
			r = new Date(pro);
			break;
	}
	return r;
};
LZR.Base.Val.Tim.prototype.hdTim.lzrClass_ = LZR.Base.Val.Tim;

// 对构造参数的特殊处理
LZR.Base.Val.Tim.prototype.hdObj_ = function (obj/*as:Object*/) {
	if (obj.hd_tim) {
		this.dt = this.hdTim(obj.hd_tim);
	}
};
LZR.Base.Val.Tim.prototype.hdObj_.lzrClass_ = LZR.Base.Val.Tim;

// 设置毫秒
LZR.Base.Val.Tim.prototype.doMs = function (ms/*as:int*/, doEvt/*as:boolean*/)/*as:int*/ {
	if (ms || ms === 0) {
		ms = parseInt(ms, 10);
		if (!isNaN(ms) && ms>-1 && ms<1000) {
			this.dt.setMilliseconds(ms);
			this.vcBase.set(this.dt.valueOf(), doEvt);
		}
	} else {
		return this.dt.getMilliseconds();
	}
};
LZR.Base.Val.Tim.prototype.doMs.lzrClass_ = LZR.Base.Val.Tim;