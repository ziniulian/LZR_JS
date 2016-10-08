/*************************************************
作者：子牛连
类名：EmWindPower
说明：风力枚举
创建日期：01-八月-2016 17:31:30
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Green.WindInfo",
	"LZR.Base.Val.Enum",
	"LZR.Pro.Green.WindInfo.WindPower"
], "LZR.Pro.Green.WindInfo.EmWindPower");
LZR.Pro.Green.WindInfo.EmWindPower = function (obj) /*bases:LZR.Base.Val.Enum*/ {
	LZR.initSuper(this, obj);

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Green.WindInfo.EmWindPower.prototype = LZR.clone (LZR.Base.Val.Enum.prototype, LZR.Pro.Green.WindInfo.EmWindPower.prototype);
LZR.Pro.Green.WindInfo.EmWindPower.prototype.super_ = [LZR.Base.Val.Enum];
LZR.Pro.Green.WindInfo.EmWindPower.prototype.className_ = "LZR.Pro.Green.WindInfo.EmWindPower";
LZR.Pro.Green.WindInfo.EmWindPower.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Green.WindInfo.EmWindPower");

// 空
LZR.Pro.Green.WindInfo.EmWindPower.emnull/*m*/ = new LZR.Pro.Green.WindInfo.WindPower({
	id: "emnull",
	name: "",
	minSpeed: 0,
	maxSpeed: 0,
	phenomenon: "",
	sea: "",
	wave: 0
});	/*as:LZR.Pro.Green.WindInfo.WindPower*/

// 无
LZR.Pro.Green.WindInfo.EmWindPower.v0/*m*/ = new LZR.Pro.Green.WindInfo.WindPower({
	id: 0,
	name: "无风",
	minSpeed: 0.0,
	maxSpeed: 0.2,
	phenomenon: "烟直上",
	sea: "平静",
	wave: 0.0
});	/*as:LZR.Pro.Green.WindInfo.WindPower*/

// 软
LZR.Pro.Green.WindInfo.EmWindPower.v1/*m*/ = new LZR.Pro.Green.WindInfo.WindPower({
	id: 1,
	name: "软风",
	minSpeed: 0.3,
	maxSpeed: 1.5,
	phenomenon: "烟示风向",
	sea: "微波峰无飞沫",
	wave: 0.1
});	/*as:LZR.Pro.Green.WindInfo.WindPower*/

// 轻
LZR.Pro.Green.WindInfo.EmWindPower.v2/*m*/ = new LZR.Pro.Green.WindInfo.WindPower({
	id: 2,
	name: "轻风",
	minSpeed: 1.6,
	maxSpeed: 3.3,
	phenomenon: "感觉有风",
	sea: "小波峰未破碎",
	wave: 0.2
});	/*as:LZR.Pro.Green.WindInfo.WindPower*/

// 微
LZR.Pro.Green.WindInfo.EmWindPower.v3/*m*/ = new LZR.Pro.Green.WindInfo.WindPower({
	id: 3,
	name: "微风",
	minSpeed: 3.4,
	maxSpeed: 5.4,
	phenomenon: "旌旗展开",
	sea: "小波峰顶破裂",
	wave: 0.6
});	/*as:LZR.Pro.Green.WindInfo.WindPower*/

// 和
LZR.Pro.Green.WindInfo.EmWindPower.v4/*m*/ = new LZR.Pro.Green.WindInfo.WindPower({
	id: 4,
	name: "和风",
	minSpeed: 5.5,
	maxSpeed: 7.9,
	phenomenon: "吹起尘土",
	sea: "小浪白沫波峰",
	wave: 1.0
});	/*as:LZR.Pro.Green.WindInfo.WindPower*/

// 劲
LZR.Pro.Green.WindInfo.EmWindPower.v5/*m*/ = new LZR.Pro.Green.WindInfo.WindPower({
	id: 5,
	name: "劲风",
	minSpeed: 8.0,
	maxSpeed: 10.7,
	phenomenon: "小树摇摆",
	sea: "中浪折沫峰群",
	wave: 2.0
});	/*as:LZR.Pro.Green.WindInfo.WindPower*/

// 强
LZR.Pro.Green.WindInfo.EmWindPower.v6/*m*/ = new LZR.Pro.Green.WindInfo.WindPower({
	id: 6,
	name: "强风",
	minSpeed: 10.8,
	maxSpeed: 13.8,
	phenomenon: "电线有声",
	sea: "大浪到个飞沫",
	wave: 3.0
});	/*as:LZR.Pro.Green.WindInfo.WindPower*/

// 疾
LZR.Pro.Green.WindInfo.EmWindPower.v7/*m*/ = new LZR.Pro.Green.WindInfo.WindPower({
	id: 7,
	name: "疾风",
	minSpeed: 13.9,
	maxSpeed: 17.1,
	phenomenon: "步行困难",
	sea: "破峰白沫成条",
	wave: 4.0
});	/*as:LZR.Pro.Green.WindInfo.WindPower*/

// 大
LZR.Pro.Green.WindInfo.EmWindPower.v8/*m*/ = new LZR.Pro.Green.WindInfo.WindPower({
	id: 8,
	name: "大风",
	minSpeed: 17.2,
	maxSpeed: 20.7,
	phenomenon: "折毁树枝",
	sea: "浪长高有浪花",
	wave: 5.5
});	/*as:LZR.Pro.Green.WindInfo.WindPower*/

// 烈
LZR.Pro.Green.WindInfo.EmWindPower.v9/*m*/ = new LZR.Pro.Green.WindInfo.WindPower({
	id: 9,
	name: "烈风",
	minSpeed: 20.8,
	maxSpeed: 24.4,
	phenomenon: "小损房屋",
	sea: "浪峰倒卷",
	wave: 7.0
});	/*as:LZR.Pro.Green.WindInfo.WindPower*/

// 狂
LZR.Pro.Green.WindInfo.EmWindPower.v10/*m*/ = new LZR.Pro.Green.WindInfo.WindPower({
	id: 10,
	name: "狂风",
	minSpeed: 24.5,
	maxSpeed: 28.4,
	phenomenon: "拔起树木",
	sea: "海浪翻滚咆哮",
	wave: 9.0
});	/*as:LZR.Pro.Green.WindInfo.WindPower*/

// 暴
LZR.Pro.Green.WindInfo.EmWindPower.v11/*m*/ = new LZR.Pro.Green.WindInfo.WindPower({
	id: 11,
	name: "暴风",
	minSpeed: 28.5,
	maxSpeed: 32.6,
	phenomenon: "损毁普遍",
	sea: "波峰全呈飞沫",
	wave: 11.5
});	/*as:LZR.Pro.Green.WindInfo.WindPower*/

// 台
LZR.Pro.Green.WindInfo.EmWindPower.v12/*m*/ = new LZR.Pro.Green.WindInfo.WindPower({
	id: 12,
	name: "台风",
	minSpeed: 32.7,
	maxSpeed: -1,
	phenomenon: "摧毁巨大",
	sea: "海浪滔天",
	wave: 14.0
});	/*as:LZR.Pro.Green.WindInfo.WindPower*/

// 对构造参数的特殊处理
LZR.Pro.Green.WindInfo.EmWindPower.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Pro.Green.WindInfo.EmWindPower.prototype.hdObj_.lzrClass_ = LZR.Pro.Green.WindInfo.EmWindPower;