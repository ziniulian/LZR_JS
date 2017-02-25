/*************************************************
作者：子牛连
类名：TmpTagMgmt
说明：温度标签管理系统
创建日期：22-2月-2017 14:44:31
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro",
	"LZR.Base.Json"
], "LZR.Pro.TmpTagMgmt");
LZR.Pro.TmpTagMgmt = function (obj) {
	// Json转换工具
	this.utJson/*m*/ = LZR.getSingleton(LZR.Base.Json);	/*as:LZR.Base.Json*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.TmpTagMgmt.prototype.className_ = "LZR.Pro.TmpTagMgmt";
LZR.Pro.TmpTagMgmt.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.TmpTagMgmt");

// 构造器
LZR.Pro.TmpTagMgmt.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.TmpTagMgmt.prototype.init_.lzrClass_ = LZR.Pro.TmpTagMgmt;

// 对构造参数的特殊处理
LZR.Pro.TmpTagMgmt.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Pro.TmpTagMgmt.prototype.hdObj_.lzrClass_ = LZR.Pro.TmpTagMgmt;

// 根据关键字获取相关设备集合
LZR.Pro.TmpTagMgmt.prototype.getDevs = function (keyword/*as:string*/, isodd/*as:boolean*/)/*as:Object*/ {
	var r = {
		keyword: keyword,
		isodd: isodd,
		devs: this.getDevsTest(keyword, isodd)
	};
	if (keyword && keyword !== "undefined") {
		// 查询数据
	} else {
		// top10数据
	}
	return r;
};
LZR.Pro.TmpTagMgmt.prototype.getDevs.lzrClass_ = LZR.Pro.TmpTagMgmt;

// 获取设备详情
LZR.Pro.TmpTagMgmt.prototype.getDevInfo = function (id/*as:string*/)/*as:Object*/ {
	if (id) {
		return this.getDevInfoTest(id);
	} else {
		return null;
	}
};
LZR.Pro.TmpTagMgmt.prototype.getDevInfo.lzrClass_ = LZR.Pro.TmpTagMgmt;

// 获取标签详情
LZR.Pro.TmpTagMgmt.prototype.getTag = function (id/*as:string*/, startTim/*as:Date*/, endTim/*as:Date*/)/*as:Object*/ {
	if (id) {
		return this.getTagTest(id, startTim, endTim);
	} else {
		return null;
	}
};
LZR.Pro.TmpTagMgmt.prototype.getTag.lzrClass_ = LZR.Pro.TmpTagMgmt;

// ------------- Test 测试数据 --------

// Test根据关键字获取相关设备集合
LZR.Pro.TmpTagMgmt.prototype.getDevsTest = function (keyword/*as:string*/, isodd/*as:boolean*/)/*as:Object*/ {
	var r = {};
	// 测试数据：
	if (!isodd) {
		r.a01 = {
			nam: "大型设备",
			num: "EXP_C_001",
			stat: true
		};
		r.a02 = {
			nam: "中型设备",
			num: "EXP_B_001",
			stat: true
		};
		r.a03 = {
			nam: "小型设备",
			num: "EXP_A_001",
			stat: true
		};
	}
	r.a04 = {
		nam: "大型设备",
		num: "EXP_C_002",
		stat: false
	};
	if (!isodd) {
		r.a05 = {
			nam: "大型设备",
			num: "EXP_C_003",
			stat: true
		};
		r.a06 = {
			nam: "小设备",
			num: "EXP_AA_001",
			stat: true
		};
	}
	r.a07 = {
		nam: "中型设备",
		num: "EXP_B_007",
		stat: false
	};
	if (!isodd) {
		r.a08 = {
			nam: "中型设备",
			num: "EXP_B_003",
			stat: true
		};
		r.a13 = {
			nam: "小型设备",
			num: "EXP_A_011",
			stat: true
		};
	}
	return r;
};
LZR.Pro.TmpTagMgmt.prototype.getDevsTest.lzrClass_ = LZR.Pro.TmpTagMgmt;

// Test获取设备详情
LZR.Pro.TmpTagMgmt.prototype.getDevInfoTest = function (id/*as:string*/)/*as:Object*/ {
	return {
		nam: "中型设备",
		num: "EXP_B_007",
		stat: false,
		tags: {
			t001: {
				nam: "TAG_B1",
				cur: 35.7,
				stat: true
			},
			t002: {
				nam: "TAG_A",
				cur: 68,
				stat: true
			},
			t003: {
				nam: "TAG_B",
				cur: 37.3,
				stat: true
			},
			t004: {
				nam: "TAG_AB",
				cur: 85.7,
				stat: false
			},
			t008: {
				nam: "TAG_C",
				cur: 66.6,
				stat: true
			}
		}
	};
};
LZR.Pro.TmpTagMgmt.prototype.getDevInfoTest.lzrClass_ = LZR.Pro.TmpTagMgmt;

// Test获取标签详情
LZR.Pro.TmpTagMgmt.prototype.getTagTest = function (id/*as:string*/, startTim/*as:Date*/, endTim/*as:Date*/)/*as:Object*/ {
	var r = {
		nam: "TAG_A",
		max: 60,
		min: 20,
		epc: "XXXXX-XXX",
		tid: "XXX XXX XXX",
		devId: "a13",
		devNam: "小设备"
		// cur: 35.7,
		// tim: 1486539000,	// 时间戳 "2017-2-8 15:30:00"
		// stat: true,
		// logs: {}
	};

	// 生成随机温度值
	var t = Math.floor(startTim.valueOf()/1000);
	var et = Math.floor(endTim.valueOf()/1000);
	var lg = {};
	for (; t <= et; t += 300) {
		lg[t] = Math.floor(Math.random() * 700)/10 + 10;
	}
	t -= 300;
	r.logs = this.utJson.toJson(lg);
	r.tim = t;
	r.cur = lg[t];
	r.stat = (r.cur >= r.min && r.cur <= r.max);

	return r;
};
LZR.Pro.TmpTagMgmt.prototype.getTagTest.lzrClass_ = LZR.Pro.TmpTagMgmt;
