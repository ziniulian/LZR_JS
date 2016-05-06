/*************************************************
作者：子牛连
类名：Tim
说明：时间
创建日期：06-五月-2016 15:35:07
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base",
	"LZR.Base.Val.Ctrl",
	"LZR.Base.Time"
], "LZR.Base.Tim");
LZR.Base.Tim = function (obj) {
	// 时间对象
	this.dt = null;	/*as:Date*/

	// 事件
	this.evt = null;	/*as:Object*/

	// 基础值
	this.base/*m*/ = new LZR.Base.Val.Ctrl();	/*as:LZR.Base.Val.Ctrl*/

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
LZR.Base.Tim.prototype.className_ = "LZR.Base.Tim";
LZR.Base.Tim.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.Tim");

// 构造器
LZR.Base.Tim.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}

	if (isNaN(this.base.get())) {
		if (!this.dt || isNaN(this.dt.valueOf())) {
			this.dt = new Date();
		}
		this.base.set(this.dat.valueOf(), false);
	} else if (!this.dt || this.dt.valueOf() !== this.base.get()) {
		this.dt = new Date(this.base.get());
	}

	this.evt = this.base.evt;
	this.evt.change.add(this.utLzr.bind(this, this.baseToDt));
};

// 对构造参数的特殊处理
LZR.Base.Tim.prototype.hdObj_ = function (obj/*as:Object*/) {
	if (obj.hd_tim) {
		this.hdTim(obj.hd_tim);
	}
};

// 处理日期参数
LZR.Base.Tim.prototype.hdTim = function (pro/*as:Object*/) {
	switch(LZR.getClassName(pro)) {
		case "string":
			this.dt = this.utTim.stringToDate(pro);
			break;
		case "Date":
			this.dt = pro;
			break;
		default:
			this.dt = new Date(pro);
			break;
	}
};

// 处理基础值与时间对象的同步
LZR.Base.Tim.prototype.baseToDt = function (v/*as:int*/) {
	if (this.dt.valueOf() !== v) {
		this.dt.setTime(v);
	}
};

// 时间增减
LZR.Base.Tim.prototype.add = function (ms/*as:int*/) {
	this.base.set( (this.base.get() + ms) );
};

// 月增减
LZR.Base.Tim.prototype.addMon = function (mon/*as:int*/) {
	var d = this.dt.getDate();
	this.dt.setMonth(this.dt.getMonth() + mon);
	if (this.dt.getDate() !== d) {
		this.dt.setDate(0);
	}
	this.base.set(this.dt.valueOf());
};

// 格式化输出
LZR.Base.Tim.prototype.format = function (fom/*as:string*/)/*as:string*/ {
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
					r += print(this.utStr.format, this.dat, key, num);
					key = fom[i];
					num = 1;
				}
				break;
			default:
				if (key) {
					r += print(this.utStr.format, this.dat, key, num);
					key = "";
					num = 0;
				}
				r += fom[i];
				break;
		}
	}
	if (key) {
		r += print(this.utStr.format, this.dat, key, num);
	}
	return r;
};

// 设置年
LZR.Base.Tim.prototype.doYear = function (year/*as:int*/)/*as:int*/ {
	if (year) {
		year = parseInt(year, 10);
		if (!isNaN(year)) {
			var m = this.dt.getMonth();
			this.dt.setFullYear(year);
			if (this.dt.getMonth() !== m) {
				this.dt.setDate(0);
			}
			this.base.set(this.dt.valueOf());
		}
	} else {
		return this.dt.getFullYear();
	}
};

// 设置月
LZR.Base.Tim.prototype.doMon = function (mon/*as:int*/)/*as:int*/ {
	if (mon) {
		mon = parseInt(mon, 10);
		if (!isNaN(mon) && mon>0 && mon<13) {
			mon --;
			this.dt.setMonth(mon);
			if (this.dt.getMonth() !== mon) {
				this.dt.setDate(0);
			}
			this.base.set(this.dt.valueOf());
		}
	} else {
		return (this.dt.getMonth() + 1);
	}
};

// 设置日
LZR.Base.Tim.prototype.doDay = function (day/*as:int*/)/*as:int*/ {
	if (day) {
		day = parseInt(day, 10);
		if (!isNaN(day) && day>0 && day<32) {
			this.dt.setDate(day);
			if (this.dt.getDate() !== day) {
				this.dt.setDate(0);
			}
			this.base.set(this.dt.valueOf());
		}
	} else {
		return this.dt.getDate();
	}
};

// 设置小时
LZR.Base.Tim.prototype.doHour = function (hour/*as:int*/)/*as:int*/ {
	if (hour) {
		hour = parseInt(hour, 10);
		if (!isNaN(hour) && hour>-1 && hour<24) {
			this.dt.setHours(hour);
			this.base.set(this.dt.valueOf());
		}
	} else {
		return this.dt.getHours();
	}
};

// 设置分钟
LZR.Base.Tim.prototype.doMut = function (mut/*as:int*/)/*as:int*/ {
	if (mut) {
		mut = parseInt(mut, 10);
		if (!isNaN(mut) && mut>-1 && mut<60) {
			this.dt.setMinutes(mut);
			this.base.set(this.dt.valueOf());
		}
	} else {
		return this.dt.getMinutes();
	}
};

// 设置秒
LZR.Base.Tim.prototype.doSec = function (sec/*as:int*/)/*as:int*/ {
	if (sec) {
		sec = parseInt(sec, 10);
		if (!isNaN(sec) && sec>-1 && sec<60) {
			this.dt.setSeconds(sec);
			this.base.set(this.dt.valueOf());
		}
	} else {
		return this.dt.getSeconds();
	}
};

// 设置毫秒
LZR.Base.Tim.prototype.doMs = function (ms/*as:int*/)/*as:int*/ {
	if (ms) {
		ms = parseInt(ms, 10);
		if (!isNaN(ms) && ms>-1 && ms<999) {
			this.dt.setMilliseconds(ms);
			this.base.set(this.dt.valueOf());
		}
	} else {
		return this.dt.getMilliseconds();
	}
};
