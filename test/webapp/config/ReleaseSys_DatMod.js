function webapp () {
	return {
		alias: "数据模型",
		nam: "ReleaseSys_DatMod",
		publish: false,		// 以nam命名函数
		version: "v1.0",	// 版本
		loads: [
			"LZR.HTML.Base.Ctrl.SglScd",
			"LZR.Pro.Green.Airq.App.ReleaseSys.DatMod",
			"LZR.Base.Time",
			"LZR.HTML.Base.Ajax"
		],
		tools: {
			Dm: "LZR.Pro.Green.Airq.App.ReleaseSys.DatMod",
			// Aqi: "LZR.Pro.Green.Airq.Fom.Aqi",
			Doe: "LZR.HTML.Base.Doe",
			Scd: "LZR.HTML.Base.Ctrl.SglScd",
			Eal: "LZR.Pro.Green.Airq.Alarm.EmAlarmLevel",
			Efl: "LZR.Pro.Green.Airq.Fom.EmFomLevel",
			bind: "LZR.getSingleton(LZR.Util).bind",
			ajx: "new LZR.HTML.Base.Ajax()",
			utJson: "LZR.getSingleton(LZR.Base.Json)",
			utTim: "LZR.getSingleton(LZR.Base.Time)"
		}
	};
}
