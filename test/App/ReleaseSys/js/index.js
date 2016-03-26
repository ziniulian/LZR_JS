
function init() {
	LZR.curPath = "../../../src/LZR/JS";
	LZR.load([
		"LZR.HTML.Base.Ctrl.SglScd",
		"LZR.Pro.Green.Airq.App.ReleaseSys.DatMod",
		"LZR.Base.Time"
	]);
	var i, j, k, s, v, n;
	var hw = {
		root: LZR,
		Dm: LZR.Pro.Green.Airq.App.ReleaseSys.DatMod,
		Doe: LZR.HTML.Base.Doe,
		Scd: LZR.HTML.Base.Ctrl.SglScd,
		Eal: LZR.Pro.Green.Airq.Alarm.EmAlarmLevel,
		Efl: LZR.Pro.Green.Airq.Fom.EmFomLevel,
		utTim: LZR.getSingleton(LZR.Base.Time)
	};
	var hwo = {
		root: hw
	};

	// 时间控制
	hwo.tim = new hw.Doe ({ doe: tim });
	hwo.timChange = function (doeo) {
		this.curTim.dat.tim = this.root.utTim.addHour (doeo.dat.tim, this.baseTim.dat.tim, true);
		this.curTim.doe.innerHTML = this.root.utTim.format (this.curTim.dat.tim, "mdChn") + "环境空气质量预报";
		// 刷新城市列表数据
	};
	hwo.curTim = hwo.tim.getById("curTim");
	hwo.curTim.dat = {};
	hwo.baseTim = hwo.tim.getById("baseTim");
	hwo.baseTim.dat = { tim: hw.utTim.normalize (null, 17) };
	hwo.baseTim.doe.innerHTML = hw.utTim.format (hwo.baseTim.dat.tim, "hourChn") + "发布";
	hwo.timScd = new hw.Scd ();
	hwo.timScd.css = "main_middle_top_M";
	hwo.timScd.vcCur.setEventObj (hwo);
	hwo.timScd.vcCur.evt.change.add (hwo.timChange);
	hwo.timScd.add (hwo.tim.getById("tim1"));
	hwo.timScd.add (hwo.tim.getById("tim2"));
	hwo.timScd.add (hwo.tim.getById("tim3"));
	hwo.tim.getById("tim1").dat.tim = 24;
	hwo.tim.getById("tim2").dat.tim = 48;
	hwo.tim.getById("tim3").dat.tim = 72;
	hwo.tim.getById("tim1").dat.vcScd.set(true);

	// 配置污染物级别信息
	hw.Efl.no.imgUrl = "images/good0.png";
	hw.Efl.v1.imgUrl = "images/good.png";
	hw.Efl.v2.imgUrl = "images/good2.png";
	hw.Efl.v3.imgUrl = "images/good3.png";
	hw.Efl.v4.imgUrl = "images/good4.png";
	hw.Efl.v5.imgUrl = "images/good5.png";
	hw.Efl.v6.imgUrl = "images/good6.png";
	hw.Efl.no.numCss = "number-0";
	hw.Efl.v1.numCss = "number-a";
	hw.Efl.v2.numCss = "number-b";
	hw.Efl.v3.numCss = "number-c";
	hw.Efl.v4.numCss = "number-d";
	hw.Efl.v5.numCss = "number-e";
	hw.Efl.v6.numCss = "number-f";
	hw.Eal.v1.css = "city_r_f3";
	hw.Eal.v2.css = "city_r_f4";
	hw.Eal.v3.css = "city_r_f5";

	// 城市数据
	hwo.list = new hw.Dm({
		id: "p001",
		name: "河北省",
		level: "prvn",
		chd_: {
			"c001": {
				name: "石家庄市",
				geoJson: [114.52, 38.05],
				level: "city"
			},
			"c002": {
				name: "承德市",
				geoJson: [110, 38],
				level: "city"
			},
			"c003": {
				name: "张家口市",
				geoJson: [111, 38],
				level: "city"
			},
			"c004": {
				name: "秦皇岛市",
				geoJson: [112, 38],
				level: "city"
			},
			"c005": {
				name: "唐山市",
				geoJson: [113, 38],
				level: "city"
			},
			"c006": {
				name: "廊坊市",
				geoJson: [114, 38],
				level: "city"
			},
			"c007": {
				name: "保定市",
				geoJson: [115.47, 38.89],
				level: "city"
			},
			"c008": {
				name: "沧州市",
				geoJson: [115, 38],
				level: "city"
			},
			"c009": {
				name: "衡水市",
				geoJson: [116, 38],
				level: "city"
			},
			"c010": {
				name: "邢台市",
				geoJson: [117, 38],
				level: "city"
			},
			"c011": {
				name: "邯郸市",
				geoJson: [118, 38],
				level: "city"
			},
			"c012": {
				name: "定州市",
				geoJson: [119, 38],
				level: "city"
			},
			"c013": {
				name: "辛集市",
				geoJson: [120, 38],
				level: "city"
			}
		}
	});

	// 城市列表
	hwo.list.view = new hw.Doe ({ doe: list, dat: hwo.list });
	hwo.list.ctrl = new hw.Scd ();
	hwo.list.ctrl.css = "city_M";
	hwo.list.ctrl.only = false;
	hwo.cityModel = hwo.list.view.del("city");
	for (s in hwo.list.subs) {
		v = hwo.list.subs[s];
		v.view = hwo.cityModel.clone();
		v.view.dat = v;
		hwo.list.view.add (v.view, s);
		hwo.list.ctrl.add (v.view);
	}

	// 刷新城市列表数据

}
