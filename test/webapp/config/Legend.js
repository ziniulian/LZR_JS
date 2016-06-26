function webapp () {
	return {
		alias: "图例",
		nam: "Legend",
		publish: false,		// 以nam命名函数
		version: "v1.0",	// 版本
		loads: [
			"LZR.HTML.Widget.Legend.LegendMgr"
		],
		tools: {
			ut: "LZR.getSingleton(LZR.Util)",
			Lm: "LZR.HTML.Widget.Legend.LegendMgr"
		},
		fun: function (obj) {	// 类构造函数
			var pro;
			/*
				参数说明：
					// 图例初始化参数（图例值以百分比表示）
					image: "",
					scd: "AQI_Block",	// 初始被选中的图例
					preCss: "",		// 预览图样式
					scdCss: "",		// 被选中时样式
					hd_legend: {
						min: 0,		// 最小值
						max: 500,	// 最大值
						digit: 1,		// 数值显示位数（忽略则不圆整）
						unit: "ug/m<sub>3<sub>",	// 单位
						subs: {
							AQI_Block: {
								// cfCss: "",	// 刻度字体样式
								// cbCss: "",	// 刻度边框样式
								// fcfCss: "",	// 首刻度字体样式
								// fcbCss: "",	// 首刻度边框样式
								// unitCss: "",	// 单位样式
								// outCss: "",	// 外框样式
								color: {		// 色块为 <= 关系
									"0": [255,255,255],
									"10": [0,255,0],
									"20": [255,255,0],
									"30": [255,100,0],
									"40": [255,0,0],
									"50": 0,	// 此色值表示无效范围
									"60": [255,0,255],
									"100": [0,0,255]
								},
								chart: {		// 文字匹配表（可省略）
									"0": "无",
									"10": "优",
									"20": "良",
									"30": "轻度",
									"40": "中度",
									"60": "重度",
									"100": "严重"
								},
								typ: 1	// 0：渐变，1：色块
							},
							AQI_Bar: {
								color: {
									"0": [255,255,255],
									"10": [0,255,0],
									"20": [255,255,0],
									"30": [255,100,0],
									"40": [255,0,0],
									"60": [255,0,255],
									"100": [0,0,255]
								},
								typ: 0	// 0：渐变，1：色块
							}
						}
					}

				事件：
					onChg: function (dom, dat) {}

				事件返回参数：
					dom = 图例对象
					dat = {
						min: 20,	// 最小值
						max: 50,	// 最大值
						color: "20, 255, 255, 255; 30, 255, 0, 0; 40, -1, -1, -1; 50, 0, 0, 255",	// （色值-1表示无效范围）
						typ: 0,	// 0：渐变，1：色块
					};

			*/

			// 生成管理器
			this.mgr = new this.tools.Lm (obj);

			// 事件添加
			this.onChg = function (dom, dat) {};
			this.mgr.evt.chg.add(this.tools.ut.bind(this, function (dom, dat) {
				this.onChg (dom, dat);
			}));

		}
	};
}
