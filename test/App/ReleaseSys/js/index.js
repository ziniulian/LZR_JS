
function init() {
	LZR.curPath = "../../../src/LZR/JS";
	LZR.load([
		"/Lib/ol3/ol.js",
		"LZR.HTML.Base.Ctrl.SglScd",
		"LZR.Pro.Green.Airq.App.ReleaseSys.DatMod",
		"LZR.Base.Time"
	]);
	var s, v, t;
	var hw = {
		root: LZR,
		Ol: ol,
		Dm: LZR.Pro.Green.Airq.App.ReleaseSys.DatMod,
		Aqi: LZR.Pro.Green.Airq.Fom.Aqi,
		Doe: LZR.HTML.Base.Doe,
		Scd: LZR.HTML.Base.Ctrl.SglScd,
		Eal: LZR.Pro.Green.Airq.Alarm.EmAlarmLevel,
		Efl: LZR.Pro.Green.Airq.Fom.EmFomLevel,
		utTim: LZR.getSingleton(LZR.Base.Time)
	};
	var hwo = {
		root: hw
	};

	// 配置污染物级别信息
	hw.Efl.emnull.imgUrl = "images/good0.png";
	hw.Efl.v1.imgUrl = "images/good.png";
	hw.Efl.v2.imgUrl = "images/good2.png";
	hw.Efl.v3.imgUrl = "images/good3.png";
	hw.Efl.v4.imgUrl = "images/good4.png";
	hw.Efl.v5.imgUrl = "images/good5.png";
	hw.Efl.v6.imgUrl = "images/good6.png";
	hw.Efl.emnull.numCss = "number-0";
	hw.Efl.v1.numCss = "number-a";
	hw.Efl.v2.numCss = "number-b";
	hw.Efl.v3.numCss = "number-c";
	hw.Efl.v4.numCss = "number-d";
	hw.Efl.v5.numCss = "number-e";
	hw.Efl.v6.numCss = "number-f";
	hw.Efl.v3.name = "轻度";
	hw.Efl.v4.name = "中度";
	hw.Efl.v5.name = "重度";
	hw.Efl.v6.name = "严重";
	hw.Eal.emnull.css = "...";
	hw.Eal.v1.css = "city_r_f3";
	hw.Eal.v2.css = "city_r_f4";
	hw.Eal.v3.css = "city_r_f5";

	// OpenLayers 的 地图
	hwo.map = new hw.Ol.Map({
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM()
			})
		],
		target: "map",
		view: new ol.View({
			projection: "EPSG:3857",
			zoom: 7,
			center: ol.proj.fromLonLat([116, 38.5])
		})
	});

	// 城市数据
	hwo.list = new hw.Dm({
		id: "p001",
		name: "河北省",
		level: "prvn",
		root: hwo,
		chd_: {
			"c001": {
				name: "石家庄市",
				geoJson: [114.52, 38.05],
				level: "city",
				hd_aqis: {
					"24": {
						hd_min: 150,
						hd_max: 305,
						alarmLevel: "v1",
						mainFom: ["pm25"]
					},
					"48": {
						hd_min: 253,
						hd_max: 405,
						alarmLevel: "v2",
						mainFom: ["pm25"]
					},
					"72": {
						hd_min: 15,
						hd_max: 73,
						alarmLevel: "v3",
						mainFom: ["pm25"]
					},
				}
			},
			"c002": {
				name: "承德市",
				geoJson: [110, 38],
				level: "city",
				hd_aqis: {
					"72": {
						hd_min: 150,
						hd_max: 305,
						alarmLevel: "v1",
						mainFom: ["pm25"]
					}
				}
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
		v.view.getById("name").doe.innerHTML = v.name;
		v.view.getById("midFom").doe.innerHTML = " - ";
	}

	// 刷新城市列表数据
	hwo.flush = function () {
		var s, v, n, f;
		n = this.timScd.vcCur.get().dat.tim;
		for (s in this.list.subs) {
			v = this.list.subs[s].view;
			f = v.dat.aqis[n];

			v.getById("mainFom").doe.innerHTML = f.emMainFom[0].get().htm;
			v.getById("levelImg").doe.src = f.min.emLevel.get().imgUrl;
			v.getById("levelName").doe.innerHTML = f.min.emLevel.get().name;
			v.getById("minFom").chgCss (f.min.emLevel.get().numCss);
			v.getById("minFom").doe.innerHTML = f.min.vcAqi.get();
			v.getById("maxFom").chgCss (f.max.emLevel.get().numCss);
			v.getById("maxFom").doe.innerHTML = f.max.vcAqi.get();
			v.getById("alarm").chgCss (f.emAlarmLevel.get().css);
			v.getById("alarm").doe.innerHTML = f.emAlarmLevel.get().name;
		}
	};

	// 时间控制
	hwo.tim = new hw.Doe ({ doe: tim });
	hwo.timChange = function (doeo) {
		this.curTim.dat.tim = this.root.utTim.addHour (doeo.dat.tim, this.baseTim.dat.tim, true);
		this.curTim.doe.innerHTML = this.root.utTim.format (this.curTim.dat.tim, "mdChn") + "环境空气质量预报";
		// 刷新城市列表数据
		this.flush();
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
	hwo.timScd.add (hwo.tim.getById("tim24"));
	hwo.timScd.add (hwo.tim.getById("tim48"));
	hwo.timScd.add (hwo.tim.getById("tim72"));
	hwo.tim.getById("tim24").dat.tim = 24;
	hwo.tim.getById("tim48").dat.tim = 48;
	hwo.tim.getById("tim72").dat.tim = 72;
	hwo.tim.getById("tim24").dat.vcScd.set(true);

	// 提示框
	hwo.titl = new hw.Doe ({ doe: middle_div });
	t = hw.utTim.addHour (hwo.tim.getById("tim24").dat.tim, hwo.baseTim.dat.tim, true);
	v = hwo.titl.getById("titl24");
	v.getById("date").doe.innerHTML = hw.utTim.format (t, "mdChn");
	v.getById("week").doe.innerHTML = hw.utTim.format (t, "weekChn");
	t = hw.utTim.addHour (hwo.tim.getById("tim48").dat.tim, hwo.baseTim.dat.tim, true);
	v = hwo.titl.getById("titl48");
	v.getById("date").doe.innerHTML = hw.utTim.format (t, "mdChn");
	v.getById("week").doe.innerHTML = hw.utTim.format (t, "weekChn");
	t = hw.utTim.addHour (hwo.tim.getById("tim72").dat.tim, hwo.baseTim.dat.tim, true);
	v = hwo.titl.getById("titl72");
	v.getById("date").doe.innerHTML = hw.utTim.format (t, "mdChn");
	v.getById("week").doe.innerHTML = hw.utTim.format (t, "weekChn");
	hwo.flushTitl = function (doeo) {
		var s, v, f, d;
		if (doeo) {
			hwo.titl.delCss("nosee");
			d = doeo.dat;

			this.titl.getById ("broadcast").doe.innerHTML = d.broadcast;
			this.titl.getById ("name").doe.innerHTML = d.name;
			for (s in d.aqis) {
				v = this.titl.getById("titl" + s);
				f = d.aqis[s];
				v.getById("levelImg").doe.src = f.min.emLevel.get().imgUrl;
				v.getById("fom").doe.innerHTML = f.min.vcAqi.get() + "~" + f.max.vcAqi.get();
				v.getById("levelName").doe.innerHTML = f.min.emLevel.get().name;
				v.getById("mainFom").doe.innerHTML = f.emMainFom[0].get().htm;
			}
		} else {
			hwo.titl.addCss("nosee");
		}
	};

	// 提示框的事件测试
	hwo.list.ctrl.vcCur.setEventObj (hwo);
	hwo.list.ctrl.vcCur.evt.change.add (hwo.flushTitl);

}
