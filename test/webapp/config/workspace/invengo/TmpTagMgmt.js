function webapp () {
	return {
		alias: "温度标签管理系统服务端（Invengo）",
		nam: "TtmSrv",
		publish: false,
		version: "v1.0",
		loads: [
			"LZR.Node.Srv",
			"LZR.Pro.TmpTagMgmt",
			"LZR.HTML.Base.Ctrl.Txt"
		],
		tools: {
			Srv: "LZR.Node.Srv"
		}
	};
}
