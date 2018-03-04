function webapp () {
	return {
		alias: "AT911n手持机测试（Invengo）",
		nam: "TestRfid",
		publish: false,
		version: "v1.0",
		loads: [
			"LZR.Pro.Rfid.At911n.At911nCtrl",
		],
		tools: {
			At911n: "LZR.Pro.Rfid.At911n.At911nCtrl"
		}
	};
}
