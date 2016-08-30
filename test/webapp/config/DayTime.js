function webapp () {
	return {
		alias: "日期时间轴",
		nam: "DayTime",
		publish: false,
		version: "v1.0",
		loads: [
			"LZR.HTML.Base.Ctrl.TimBase.DayTim"
		],
		tools: {
			Tb: "LZR.HTML.Base.Ctrl.TimBase.DayTim",
			Doe: "LZR.HTML.Base.Doe",
			ut: "LZR.getSingleton(LZR.Util)",
			utTim: "LZR.getSingleton(LZR.Base.Time)"
		},
		fun: function (obj) {
			var pro;
			/*
				参数说明：
					dom: document.getElementById("a"),	// 容器
					// noChg: false,		// 拖动时不触发事件
					// tim: new Date(),	// 当前时间
					// min: new Date(),	// 最小时间
					// max: new Date(),	// 最大时间
					// speed: 300,		// 播放速度
				事件：
					onChg: function (tim, this) {}
			*/
			// 匹配dojo
			this.tools.Doe.prototype.adaptation = "dojo";

			// 生成元素
			this.doe = new this.tools.Doe ({
				hd_doe: obj.dom
			});

			// 生成控制器
			this.ctrl = new this.tools.Tb ();

			// 拖动时不触发事件
			this.noChg = false;

			// 事件添加
			this.onChg = function (tim) {};
			this.ctrl.evt.chg.add(this.tools.ut.bind(this, function (d, t) {
				if (this.noChg) {
					this.noChg = t;
				} else {
					this.onChg(t, this);
				}
			}));

			// 元素添加
			pro = {};
			if (obj.tim) {
				pro.hd_tim = obj.tim;
			}
			if (obj.min) {
				pro.hd_min = obj.min;
			}
			if (obj.max) {
				pro.hd_max = obj.max;
			}
			if (obj.speed || obj.speed === null) {
				pro.playSpeed = obj.speed;
			}
			this.ctrl.add(this.doe, pro);

			// 屏蔽拖动时触发事件
			if (obj.noChg === true) {
				this.ctrl.ctrlStrip.btnCtrl.evt.down.add(this.tools.ut.bind(this, function (d) {
					this.noChg = true;
				}));
				this.ctrl.ctrlStrip.btnCtrl.evt.up.add(this.tools.ut.bind(this, function (d) {
					if (this.noChg !== true) {
						this.onChg(this.noChg, this);
					}
					this.noChg = false;
				}));
			}

			// 数据
			this.dat = this.doe.dat.hct_tim;



			/* ************* 函数 ************* */
			// 播放
			this.play = function() {
				this.doe.getById("hct_DayTimPlayBtn").dat.hct_scd.set(true);
			};

			// 停止
			this.stop = function() {
				this.doe.getById("hct_DayTimPlayBtn").dat.hct_scd.set(false);
			};

			// 播放控制
			this.playNext = function() {
				if (this.dat.playing === true) {
					this.dat.next();
				}
			};
			this.playNext_Self = this.tools.ut.bind(this, this.playNext);

			// 获取播放状态
			this.getPlay = function() {
				return this.dat.playing;
			};

			// 重置
			this.resize = function() {
				this.ctrl.resize(this.doe);
			};

		}
	};
}
