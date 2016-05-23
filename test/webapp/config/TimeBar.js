function webapp () {
	return {
		alias: "时间轴",
		nam: "TimBar",
		publish: false,
		version: "v1.0",
		loads: [
			"LZR.HTML.Base.Ctrl.TimBase.DivScallSt"
		],
		tools: {
			Tb: "LZR.HTML.Base.Ctrl.TimBase.DivScallSt",
			Doe: "LZR.HTML.Base.Doe",
			ut: "LZR.getSingleton(LZR.Util)",
			utTim: "LZR.getSingleton(LZR.Base.Time)"
		},
		fun: function (obj) {
			var pro;
			/*
				参数说明：
					dom: document.getElementById("a"),	// 容器
					// css: "scd",	// 被选中样式名
					// tim: new Date(),	// 当前时间
					// min: new Date(),	// 最小时间
					// max: new Date(),	// 最大时间
					// range: [		// 时间范围
						{min: 72, max: 24},	// 时
						{min: 24*60, max: 24*20},	// 日
						{min: 24*1500, max: 24*300}	// 月
					];
				事件：
					onChg: function (tim) {}
			*/
			// 匹配dojo
			this.tools.Doe.prototype.adaptation = "dojo";

			// 生成元素
			this.doe = new this.tools.Doe ({
				hd_doe: obj.dom
			});

			// 生成控制器
			pro = {};
			if (obj.css) {
				pro.scdCss = obj.css;
			}
			if (obj.range) {
				pro.config = obj.range;
			}
			this.ctrl = new this.tools.Tb (pro);

			// 事件添加
			this.onChg = function (tim) {};
			this.ctrl.evt.chg.add(this.tools.ut.bind(this, function (d, t) {
				if (this.noChg) {
					this.noChg = t;
				} else {
					this.onChg(t);
				}
			}));

			// 元素添加
			pro = {};
			if (obj.min) {
				pro.dtMin = obj.min;
			}
			if (obj.max) {
				pro.dtMax = obj.max;
			}
			if (obj.tim) {
				pro.hd_tim = obj.tim;
			} else {
				pro.hd_tim = this.tools.utTim.normalize();
			}
			this.ctrl.add(this.doe, pro);

			// 调整
			this.resize = function () {
				this.ctrl.resize(this.doe.getById("hct_StDivScall_stripDoe"));
			};

			// 屏蔽拖动时触发事件
			this.noChg = false;
			this.ctrl.numCtrl.btnCtrl.evt.down.add(this.tools.ut.bind(this, function (d) {
				this.noChg = true;
			}));
			this.ctrl.numCtrl.btnCtrl.evt.up.add(this.tools.ut.bind(this, function (d) {
				if (this.noChg !== true) {
					this.onChg(this.noChg);
				}
				this.noChg = false;
			}));
		}
	};
}
