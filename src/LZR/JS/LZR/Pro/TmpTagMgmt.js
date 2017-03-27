/*************************************************
作者：子牛连
类名：TmpTagMgmt
说明：温度标签管理系统
创建日期：08-3月-2017 8:33:30
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro",
	"LZR.Base.Json",
	"LZR.Base.InfEvt",
	"LZR.Base.CallBacks",
	"LZR.Base.Time"
], "LZR.Pro.TmpTagMgmt");
LZR.Pro.TmpTagMgmt = function (obj) /*interfaces:LZR.Base.InfEvt*/ {
	LZR.Base.InfEvt.call(this);

	// 数据库
	this.db = null;	/*as:Object*/

	// MySql数据库驱动
	this.msq = LZR.getSingleton (null, null, "mysql");	/*as:Object*/

	// 错误处理自身回调
	this.hdErrExe = null;	/*as:fun*/

	// 查询语句
	this.sql = {
		devs: "SELECT * FROM `dev` WHERE (`nam` LIKE '%<1>%' OR `num` LIKE '%<1>%')",
		devs10: "SELECT * FROM `dev` LIMIT 10",
		devs10odd: "SELECT * FROM `dev` WHERE  `stat` = false LIMIT 10",
		dev: "SELECT * FROM `dev` WHERE `id` = <1>",
		tagAll: "SELECT `id`, `nam`, `cur`, `stat` FROM `tag` WHERE `dev_id` = <1>",
		tag: "SELECT T.`dev_id` AS `devId`, D.`nam` AS `devNam`, T.`id`, T.`cur`, T.`tim`, T.`epc`, T.`tid`, T.`nam`, T.`max`, T.`min`, T.`stat` FROM `tag` T INNER JOIN `dev` D ON T.`dev_id` = D.`id` WHERE T.`id` = <1>",
		logs: "SELECT * FROM `log` WHERE `tag_id` = <1> ORDER BY `tim` DESC LIMIT <2>"
	};	/*as:Object*/

	// 数据库连接配置
	this.conf = {
		host: process.env.OPENSHIFT_MYSQL_DB_HOST || "127.0.0.1",
		user: "TmpTagMgmt",
		password: "TmpTagMgmt",
		database: "TmpTagMgmt",
		port: process.env.OPENSHIFT_MYSQL_DB_PORT || 3306
	};	/*as:Object*/

	// Json转换工具
	this.utJson/*m*/ = LZR.getSingleton(LZR.Base.Json);	/*as:LZR.Base.Json*/

	// 设备集合事件
	this.evt.devs/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 设备详情事件
	this.evt.dev/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 标签详情事件
	this.evt.tag/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 时间工具
	this.utTim/*m*/ = LZR.getSingleton(LZR.Base.Time);	/*as:LZR.Base.Time*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.TmpTagMgmt.prototype = LZR.clone (LZR.Base.InfEvt.prototype, LZR.Pro.TmpTagMgmt.prototype);
LZR.Pro.TmpTagMgmt.prototype.className_ = "LZR.Pro.TmpTagMgmt";
LZR.Pro.TmpTagMgmt.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.TmpTagMgmt");

// 构造器
LZR.Pro.TmpTagMgmt.prototype.init_ = function (obj/*as:Object*/) {
	this.hdErrExe = this.evt.tag.utLzr.bind (this, this.hdConnectErr);
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

// 连接数据库
LZR.Pro.TmpTagMgmt.prototype.connect = function (hard/*as:boolean*/) {
	if (!this.db || hard) {
		if (this.db) {
			this.db.end();
			LZR.del(this, "db");
		}
		this.db = this.msq.createConnection(this.conf);
		this.db.on("error", this.hdErrExe);
	}
	this.db.connect(this.hdErrExe);
};
LZR.Pro.TmpTagMgmt.prototype.connect.lzrClass_ = LZR.Pro.TmpTagMgmt;

// 处理连接错误
LZR.Pro.TmpTagMgmt.prototype.hdConnectErr = function (err/*as:Object*/) {
console.log ("--------- err ----------");
	if (err) {
		// 如果是连接断开，自动重新连接
		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
			this.connect(true);
		} else {
			// console.error(err.stack || err);
		}
	}
};
LZR.Pro.TmpTagMgmt.prototype.hdConnectErr.lzrClass_ = LZR.Pro.TmpTagMgmt;

// 根据关键字获取相关设备集合
LZR.Pro.TmpTagMgmt.prototype.getDevs = function (keyword/*as:string*/, isodd/*as:boolean*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var s;
	if (keyword && keyword !== "undefined") {
		s = this.sql.devs.replace(/<1>/g, keyword);
		if (isodd) {
			s += " AND `stat` = false";
		}
	} else {
		if (isodd) {
			s = this.sql.devs10odd;
		} else  {
			s = this.sql.devs10;
		}
	}
	var f = this.evt.dev.utLzr.bind (this, this.onDevs, keyword, isodd, req, res, next);

	this.connect();
	this.db.query (s, f);
};
LZR.Pro.TmpTagMgmt.prototype.getDevs.lzrClass_ = LZR.Pro.TmpTagMgmt;

// 获取设备详情
LZR.Pro.TmpTagMgmt.prototype.getDevInfo = function (id/*as:string*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var f = this.evt.dev.utLzr.bind (this, this.getTags, req, res, next);
	var s = this.sql.dev.replace(/<1>/g, id);
	this.connect();
	this.db.query (s, f);
};
LZR.Pro.TmpTagMgmt.prototype.getDevInfo.lzrClass_ = LZR.Pro.TmpTagMgmt;

// 获取设备详情之标签
LZR.Pro.TmpTagMgmt.prototype.getTags = function (req/*as:Object*/, res/*as:Object*/, next/*as:fun*/, err/*as:Object*/, rows/*as:Array*/, fields/*as:Object*/) {
	if (err || (rows.length === 0)) {
		this.onDev(undefined, req, res, next);
	} else {
		var r = {
			nam: rows[0].nam,
			num: rows[0].num,
			stat: rows[0].stat,
			tags: {}
		};
		var s = this.sql.tagAll.replace(/<1>/g, rows[0].id);
		var f = this.evt.dev.utLzr.bind (this, this.onDev, r, req, res, next);
		this.db.query (s, f);
	}
};
LZR.Pro.TmpTagMgmt.prototype.getTags.lzrClass_ = LZR.Pro.TmpTagMgmt;

// 获取标签详情
LZR.Pro.TmpTagMgmt.prototype.getTag = function (id/*as:string*/, hour/*as:int*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/) {
	var f = this.evt.dev.utLzr.bind (this, this.getLog, hour, req, res, next);
	var s = this.sql.tag.replace(/<1>/g, id);
	this.connect();
	this.db.query (s, f);
};
LZR.Pro.TmpTagMgmt.prototype.getTag.lzrClass_ = LZR.Pro.TmpTagMgmt;

// 获取标签详情之记录
LZR.Pro.TmpTagMgmt.prototype.getLog = function (hour/*as:int*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/, err/*as:Object*/, rows/*as:Array*/, fields/*as:Object*/) {
	if (err || (rows.length === 0)) {
		this.onTag(undefined, hour, req, res, next);
	} else {
		var r = {
			nam: rows[0].nam,
			max: rows[0].max,
			min: rows[0].min,
			epc: rows[0].epc,
			tid: rows[0].tid,
			devId: rows[0].devId,
			devNam: rows[0].devNam,
			cur: rows[0].cur,
			tim: rows[0].tim,
			stat: rows[0].stat
		};
		var s = this.sql.logs.replace(/<1>/, rows[0].id).replace(/<2>/, hour * 12);
		var f = this.evt.dev.utLzr.bind (this, this.onTag, r, hour, req, res, next);
		this.db.query (s, f);

		// r.sql = s;
		// this.onTag(r, hour, req, res, next);
	}
};
LZR.Pro.TmpTagMgmt.prototype.getLog.lzrClass_ = LZR.Pro.TmpTagMgmt;

// 触发设备集合事件
LZR.Pro.TmpTagMgmt.prototype.onDevs = function (keyword/*as:string*/, isodd/*as:boolean*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/, err/*as:Object*/, rows/*as:Array*/, fields/*as:Object*/)/*as:boolean*/ {
	var r = {
		keyword: keyword,
		isodd: isodd,
		devs: {}
	};
console.log (err);
	if (!err) {
		for (var i = 0; i<rows.length; i++) {
			r.devs[rows[i].id] = {
				nam: rows[i].nam,
				num: rows[i].num,
				stat: rows[i].stat
			};
		}
	}
	this.db.end();
	LZR.del(this, "db");
	return this.evt.devs.execute (keyword, isodd, req, res, next, r);
};
LZR.Pro.TmpTagMgmt.prototype.onDevs.lzrClass_ = LZR.Pro.TmpTagMgmt;

// 触发设备详情事件
LZR.Pro.TmpTagMgmt.prototype.onDev = function (dat/*as:Object*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/, err/*as:Object*/, rows/*as:Array*/, fields/*as:Object*/)/*as:boolean*/ {
	if (dat && !err) {
		for (var i = 0; i < rows.length; i++) {
			dat.tags[rows[i].id] = {
				nam: rows[i].nam,
				cur: rows[i].cur,
				stat: rows[i].stat
			};
		}
	}
	this.db.end();
	LZR.del(this, "db");
	return this.evt.dev.execute (req, res, next, dat);
};
LZR.Pro.TmpTagMgmt.prototype.onDev.lzrClass_ = LZR.Pro.TmpTagMgmt;

// 触发标签详情事件
LZR.Pro.TmpTagMgmt.prototype.onTag = function (dat/*as:Object*/, hour/*as:int*/, req/*as:Object*/, res/*as:Object*/, next/*as:fun*/, err/*as:Object*/, rows/*as:Array*/, fields/*as:Object*/)/*as:boolean*/ {
	if (dat && !err) {
		var i = rows.length;
		if (i) {
			var r = {};
			while (i > 0) {
				i--;
				r[rows[i].tim] = rows[i].tmp;
			}
			dat.logs = this.utJson.toJson(r);
		}
	}
	this.db.end();
	LZR.del(this, "db");
	return this.evt.tag.execute (hour, req, res, next, dat);
};
LZR.Pro.TmpTagMgmt.prototype.onTag.lzrClass_ = LZR.Pro.TmpTagMgmt;
