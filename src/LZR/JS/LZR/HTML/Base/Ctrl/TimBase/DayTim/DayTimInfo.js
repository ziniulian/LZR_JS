/*************************************************
作者：子牛连
类名：DayTimInfo
说明：日刻度时间控制器信息
创建日期：29-八月-2016 14:22:59
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base.Ctrl.TimBase.DayTim",
	"LZR.HTML.Base.Doe",
	"LZR.Base.Val.Tim",
	"LZR.HTML.Base.Ctrl.SglScd"
], "LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo");
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo = function (obj) {
	// 是否正在播放
	this.playing = false;	/*as:boolean*/

	// 播放速度
	this.playSpeed = 300;	/*as:int*/

	// 日刻度选中样式
	this.scdCss = "scd";	/*as:string*/

	// 日模块数
	this.count = 0;	/*as:int*/

	// 最小日模块值
	this.minDay = 0;	/*as:double*/

	// 计算用时间
	this.timCalc/*m*/ = new LZR.Base.Val.Tim();	/*as:LZR.Base.Val.Tim*/

	// 日模版
	this.dayMod/*m*/ = null;	/*as:LZR.HTML.Base.Doe*/

	// 时间
	this.tim/*m*/ = new LZR.Base.Val.Tim();	/*as:LZR.Base.Val.Tim*/

	// 单选控制器
	this.ctrlScd/*m*/ = new LZR.HTML.Base.Ctrl.SglScd();	/*as:LZR.HTML.Base.Ctrl.SglScd*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo.prototype.className_ = "LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo";
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo");

// 构造器
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo.prototype.init_ = function (obj/*as:Object*/) {
	this.ctrlScd.vcCur.evt.change.add(this.tim.utLzr.bind(this, this.hdDayChg));
	this.play_Self = this.tim.utLzr.bind(this, this.play);

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}

	this.ctrlScd.css = this.scdCss;
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo.prototype.init_.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo;

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo.prototype.hdObj_ = function (obj/*as:Object*/) {
	// 最小时间
	if (obj.hd_min) {
		this.tim.dtMin = this.tim.hdTim(obj.hd_min);
	}

	// 最大时间
	if (obj.hd_max) {
		this.tim.dtMax = this.tim.hdTim(obj.hd_max);
	}

	// 当前时间
	if (obj.hd_tim) {
		this.tim.setByDate(obj.hd_tim, false);
	}

	// 填充日模块方法
	if (obj.hd_fillDay) {
		this.fillDay = obj.hd_fillDay;
	}
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo.prototype.hdObj_.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo;

// 设置时间范围
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo.prototype.setTimArea = function (doeo/*as:LZR.HTML.Base.Doe*/, min/*as:Object*/, max/*as:Object*/, cur/*as:Object*/) {
	var c;
	var bc = this.tim.vcBase.get();

	// 计算日模块最小值及个数
	if (min) {
		this.tim.dtMin = this.tim.hdTim(min);
	}
	if (max) {
		this.tim.dtMax = this.tim.hdTim(max);
	}
	this.timCalc.vcBase.set(this.tim.dtMin.valueOf());
	this.timCalc.set(null, null, null, 0, 0, 0, 0);
	this.minDay = this.timCalc.vcBase.get();
	this.count = Math.ceil( (this.tim.dtMax.valueOf() - this.minDay) / (24 * 3600 * 1000) );
	if (this.count < 1) {
		this.count = 1;
	}
// console.log (this.count);

	// 生成日模块
	this.crtDays(doeo);

	// 选项初始化
	if (cur) {
		c = this.tim.hdTim(cur).valueOf();
	} else {
		c = bc;
	}
	if (c === bc) {
		this.hdHourChg(doeo);
		doeo.getById("hct_DayTimDayOut").getById(Math.floor((this.tim.vcBase.get() - this.minDay) / (24 * 3600 * 1000))).dat.hct_scd.set(true);
	} else {
		this.tim.vcBase.set(c);
	}
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo.prototype.setTimArea.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo;

// 生成日模块集合
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo.prototype.crtDays = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	var i, sd;
	var d = doeo.getById("hct_DayTimDayOut");

	d.delAll();
	for (i=0; i<this.count; i++) {
		sd = this.crtDay(i);
		if (sd) {
			d.add(sd, i.toString());
			this.ctrlScd.add(sd);
		}
	}
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo.prototype.crtDays.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo;

// 生成单个日模块
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo.prototype.crtDay = function (index/*as:int*/)/*as:LZR.HTML.Base.Doe*/ {
	var d;
	if (this.dayMod) {
		d = this.dayMod.clone();
		this.timCalc.vcBase.set(this.minDay + index * 24 * 3600 * 1000);
		this.fillDay(d, this.timCalc.doYear(), this.timCalc.doMon(), this.timCalc.doDay(), this.timCalc.dt.getDay(), this.timCalc.dt);
		d.setStyle("width", 100/this.count + "%");
	}
	return d;
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo.prototype.crtDay.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo;

// 填充日模块方法
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo.prototype.fillDay = function (doeo/*as:LZR.HTML.Base.Doe*/, y/*as:int*/, m/*as:int*/, d/*as:int*/, w/*as:int*/, dt/*as:Date*/) {
	var v = doeo.getById("week").doe;
	doeo.getById("day").doe.innerHTML = d;
	switch (w) {
		case 0:
			v.innerHTML = "日";
			break;
		case 1:
			v.innerHTML = "一";
			break;
		case 2:
			v.innerHTML = "二";
			break;
		case 3:
			v.innerHTML = "三";
			break;
		case 4:
			v.innerHTML = "四";
			break;
		case 5:
			v.innerHTML = "五";
			break;
		case 6:
			v.innerHTML = "六";
			break;
	}

};
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo.prototype.fillDay.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo;

// 播放
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo.prototype.play = function () {
	if (!this.playSpeed) {
		this.playing = true;
	}

	if (this.tim.dt < this.tim.dtMax) {
		this.tim.add(3600 * 1000);
	} else {
		this.tim.vcBase.set(this.tim.dtMin.valueOf());
	}

	if (this.playSpeed) {
		this.playing = setTimeout(this.play_Self, this.playSpeed);
	}
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo.prototype.play.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo;

// 停止播放
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo.prototype.stop = function () {
	if (this.playing) {
		clearTimeout(this.playing);
		this.playing = false;
	}
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo.prototype.stop.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo;

// 下一帧
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo.prototype.next = function () {
	this.tim.add(3600 * 1000);
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo.prototype.next.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo;

// 上一帧
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo.prototype.prev = function () {
	this.tim.add(-3600 * 1000);
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo.prototype.prev.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo;

// 处理日模块变化
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo.prototype.hdDayChg = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	this.timCalc.vcBase.set(this.minDay + doeo.id.get() * 24 * 3600 * 1000);
	this.tim.set(this.timCalc.doYear(), this.timCalc.doMon(), this.timCalc.doDay());
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo.prototype.hdDayChg.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo;

// 处理时间变化
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo.prototype.hdTimChg = function (doeo/*as:LZR.HTML.Base.Doe*/, val/*as:double*/) {
	var d = doeo.getById("hct_DayTimDayOut");
	var i = Math.floor((val - this.minDay) / (24 * 3600 * 1000));

// console.log (1);
	// 设置日模块选项
// console.log (new Date(val));
	d.getById(i).dat.hct_scd.set(true);

// console.log (2);
	// 时间同步
	this.tim.base2Dt (val);

// console.log (3);
	// 设置小时选项
	d = doeo.getById("hct_DayTimHourBar");
	d.dat.hct_num.set(this.tim.doHour());

// console.log (4);
	return;
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo.prototype.hdTimChg.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo;

// 处理小时变化
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo.prototype.hdHourChg = function (doeo/*as:LZR.HTML.Base.Doe*/, val/*as:double*/) {
	if (isNaN(val)) {
		val = this.tim.doHour();
	}
	doeo.getById("hct_DayTimHourTxt").doe.innerHTML = val + "时";
	doeo.getById("hct_DayTimHourCover").setStyle("width", doeo.getById("hct_StripNumBtn").getStyle("left"));
	this.tim.doHour(val);
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo.prototype.hdHourChg.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo;
