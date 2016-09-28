/*************************************************
作者：子牛连
类名：DayTimLongAxisInfo
说明：日刻度长轴时间控制器信息
创建日期：26-九月-2016 17:28:28
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base.Ctrl.TimBase.DayTim",
	"LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo"
], "LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo");
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo = function (obj) /*bases:LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo*/ {
	LZR.initSuper(this, obj);

	// 最大日模块值
	this.maxDay = 0;	/*as:double*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo.prototype = LZR.clone (LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo.prototype, LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo.prototype);
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo.prototype.super_ = [LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimInfo];
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo.prototype.className_ = "LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo";
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo");

// 构造器
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}

	this.ctrlScd.css = this.scdCss;
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo.prototype.init_.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo;

// ---- 计算日模块最小值及个数
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo.prototype.calcCount = function () {
	// 调用父类方法
	this.ctrlScd.utLzr.supCall(this, 0, "calcCount");
	this.maxDay = this.minDay + (24 * 3600 * 1000) * this.count;
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo.prototype.calcCount.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo;

// ---- 设置时间范围
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo.prototype.setTimArea = function (doeo/*as:LZR.HTML.Base.Doe*/, min/*as:Object*/, max/*as:Object*/, cur/*as:Object*/) {
	var c;
	var bc = this.tim.vcBase.get();

	if (min) {
		this.tim.dtMin = this.tim.hdTim(min);
	}
	if (max) {
		this.tim.dtMax = this.tim.hdTim(max);
	}

	// 计算日模块最小值及个数
	this.calcCount ();

	// 生成日模块
	this.crtDays(doeo);

	// 修改滚动轴的范围
	c = doeo.getById("hct_DayTimHourBar");
	c.dat.hct_num.vcMin.set(this.minDay);
	c.dat.hct_num.vcMax.set(this.maxDay);

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
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo.prototype.setTimArea.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo;

// ---- 填充日模块方法
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo.prototype.fillDay = function (doeo/*as:LZR.HTML.Base.Doe*/, y/*as:int*/, m/*as:int*/, d/*as:int*/, w/*as:int*/, dt/*as:Date*/) {
	var v = doeo.getById("week");
	v.doe.innerHTML = d + " 周";
	switch (w) {
		case 0:
			v.doe.innerHTML += "日";
			v.addCss("weekend");
			break;
		case 1:
			v.doe.innerHTML += "一";
			v.delCss("weekend");
			break;
		case 2:
			v.doe.innerHTML += "二";
			v.delCss("weekend");
			break;
		case 3:
			v.doe.innerHTML += "三";
			v.delCss("weekend");
			break;
		case 4:
			v.doe.innerHTML += "四";
			v.delCss("weekend");
			break;
		case 5:
			v.doe.innerHTML += "五";
			v.delCss("weekend");
			break;
		case 6:
			v.doe.innerHTML += "六";
			v.addCss("weekend");
			break;
	}

};
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo.prototype.fillDay.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo;

// ---- 处理时间变化
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo.prototype.hdTimChg = function (doeo/*as:LZR.HTML.Base.Doe*/, val/*as:double*/) {
	var d = doeo.getById("hct_DayTimHourBar");
	var i = Math.floor((val - this.minDay) / (24 * 3600 * 1000));

	// 时间同步
	this.tim.base2Dt (val);

	// 设置小时选项
	d.dat.hct_num.set(this.tim.vcBase.get());

	// 设置日模块选项
	d = doeo.getById("hct_DayTimDayOut");
	d.getById(i).dat.hct_scd.set(true);

	return;
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo.prototype.hdTimChg.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo;

// ---- 处理小时变化
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo.prototype.hdHourChg = function (doeo/*as:LZR.HTML.Base.Doe*/, val/*as:double*/) {
	if (isNaN(val)) {
		val = this.tim.vcBase.get();
	}
	doeo.getById("hct_DayTimHourCover").setStyle("width", doeo.getById("hct_StripNumBtn").getStyle("left"));
	this.tim.vcBase.set(val);
	if (this.tim.vcBase.get() !== val) {
		doeo.dat.hct_num.set(this.tim.vcBase.get());
	}
	doeo.getById("hct_DayTimHourTxt").doe.innerHTML = this.tim.doHour() + "时";
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo.prototype.hdHourChg.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo;

// ---- 处理播放间距变化
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo.prototype.hdStepChg = function (doeo/*as:LZR.HTML.Base.Doe*/, val/*as:double*/) {
	// 调用父类方法
	this.ctrlScd.utLzr.supCall(this, 0, "hdStepChg", doeo, val/3600/1000);
};
LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo.prototype.hdStepChg.lzrClass_ = LZR.HTML.Base.Ctrl.TimBase.DayTim.DayTimLongAxisInfo;
