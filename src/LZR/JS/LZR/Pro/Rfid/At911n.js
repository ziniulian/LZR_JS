/*************************************************
作者：子牛连
类名：At911n
说明：手持机设备
创建日期：21-12月-2016 17:24:04
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Rfid",
	"LZR.Base.InfEvt",
	"LZR.Base.CallBacks"
], "LZR.Pro.Rfid.At911n");
LZR.Pro.Rfid.At911n = function (obj) /*interfaces:LZR.Base.InfEvt*/ {
	LZR.Base.InfEvt.call(this);

	// 安卓对象
	this.adrObj = null;	/*as:Object*/

	// 状态
	this.stat = 0;	/*as:int*/

	// 正在操作的存储块名
	this.bankNam = "";	/*as:string*/

	// 准备写入的存储信息
	this.wrMsg = "";	/*as:string*/

	// 通用工具
	this.utLzr/*m*/ = LZR.getSingleton(LZR.Util);	/*as:LZR.Util*/

	// 扫描事件
	this.evt.scan/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 读码事件
	this.evt.read/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 写码事件
	this.evt.write/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Rfid.At911n.prototype = LZR.clone (LZR.Base.InfEvt.prototype, LZR.Pro.Rfid.At911n.prototype);
LZR.Pro.Rfid.At911n.prototype.className_ = "LZR.Pro.Rfid.At911n";
LZR.Pro.Rfid.At911n.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Rfid.At911n");

// 构造器
LZR.Pro.Rfid.At911n.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Rfid.At911n.prototype.init_.lzrClass_ = LZR.Pro.Rfid.At911n;

// 对构造参数的特殊处理
LZR.Pro.Rfid.At911n.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Pro.Rfid.At911n.prototype.hdObj_.lzrClass_ = LZR.Pro.Rfid.At911n;

// 扫描
LZR.Pro.Rfid.At911n.prototype.scanning = function () {
	if (this.adrObj) {
		this.adrObj.scanning();

		// 循环读数
		if (!this.exeScanning) {
			this.exeScanning = this.utLzr.bind(this, this.getScanning);
		}
		setTimeout(this.exeScanning, 100);
	} else if (this.stat === 1) {
		// 模拟循环扫描操作
		if (!this.exeScanning) {
			this.exeScanning = this.utLzr.bind(this, this.scanning);
		}
		this.onScanning ("300048656c6c6f20576f726c6421");
		setTimeout(this.exeScanning, 200);
	}
};
LZR.Pro.Rfid.At911n.prototype.scanning.lzrClass_ = LZR.Pro.Rfid.At911n;

// 获取扫描信息
LZR.Pro.Rfid.At911n.prototype.getScanning = function () {
	var s, i, n;
	if (this.adrObj) {
		s = this.adrObj.getScanning().split(",");
		n = s.length;
		for (i=1; i<n; i++) {
			this.hdScanning(s[i]);
		}
	}
	if (this.stat === 1) {
		setTimeout(this.exeScanning, 200);
	}
};
LZR.Pro.Rfid.At911n.prototype.scanning.lzrClass_ = LZR.Pro.Rfid.At911n;

// 停止
LZR.Pro.Rfid.At911n.prototype.stop = function () {
	if (this.adrObj) {
		this.adrObj.stop();
	}
};
LZR.Pro.Rfid.At911n.prototype.stop.lzrClass_ = LZR.Pro.Rfid.At911n;

// 写码
LZR.Pro.Rfid.At911n.prototype.write = function (bankNam/*as:string*/, offset/*as:int*/, msg/*as:string*/) {
	this.bankNam = bankNam;
	if (bankNam === "ecp") {
		this.wrMsg = "3000" + msg;
	} else {
		this.wrMsg = msg;
	}

	if (this.adrObj) {
		this.adrObj.write(bankNam, offset, msg);
	} else if (this.stat === 2) {
		// 模拟写操作
		if (bankNam !== "ecp") {
			this.onWrite("300048656c6c6f20576f726c6421", bankNam, msg);
		}
	}
};
LZR.Pro.Rfid.At911n.prototype.write.lzrClass_ = LZR.Pro.Rfid.At911n;

// 读码
LZR.Pro.Rfid.At911n.prototype.read = function (bankNam/*as:string*/, offset/*as:int*/, len/*as:int*/) {
	this.bankNam = bankNam;

	if (this.adrObj) {
		this.adrObj.read(bankNam, offset, len);
	} else if (this.stat === 3) {
		// 模拟读操作
		var msg;
		switch (bankNam) {
			case "ecp":
				msg = "48656c6c6f20576f726c6421";
				break;
			case "tid":
				msg = "5449447878782e2e2e000000000000000000000000000000";
				break;
			case "usr":
				msg = "54657374000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
				break;
			case "tid":
				msg = "5907752830020000";
				break;
			default:
				msg = "00000000";
				break;
		}
		this.onRead("300048656c6c6f20576f726c6421", bankNam, msg);
	}
};
LZR.Pro.Rfid.At911n.prototype.read.lzrClass_ = LZR.Pro.Rfid.At911n;

// 处理扫描回调
LZR.Pro.Rfid.At911n.prototype.hdScanning = function (ecpId/*as:string*/) {
	this.onScanning (ecpId);
};
LZR.Pro.Rfid.At911n.prototype.hdScanning.lzrClass_ = LZR.Pro.Rfid.At911n;

// 处理读写码回调
LZR.Pro.Rfid.At911n.prototype.hdWr = function (ecpId/*as:string*/, msg/*as:string*/) {
	switch (this.stat) {
		case 2:
			this.onWrite(ecpId, this.bankNam, this.wrMsg);
			break;
		case 3:
			this.onRead(ecpId, this.bankNam, msg);
			break;
	}
	this.stat = 0;
};
LZR.Pro.Rfid.At911n.prototype.hdWr.lzrClass_ = LZR.Pro.Rfid.At911n;

// 触发扫描事件
LZR.Pro.Rfid.At911n.prototype.onScanning = function (ecpId/*as:string*/) {
	this.evt.scan.execute(ecpId);
};
LZR.Pro.Rfid.At911n.prototype.onScanning.lzrClass_ = LZR.Pro.Rfid.At911n;

// 触发写码事件
LZR.Pro.Rfid.At911n.prototype.onWrite = function (ecpId/*as:string*/, bankNam/*as:string*/, msg/*as:string*/) {
	this.evt.write.execute(ecpId, bankNam, msg);
};
LZR.Pro.Rfid.At911n.prototype.onWrite.lzrClass_ = LZR.Pro.Rfid.At911n;

// 触发读码事件
LZR.Pro.Rfid.At911n.prototype.onRead = function (ecpId/*as:string*/, bankNam/*as:string*/, msg/*as:string*/) {
	this.evt.read.execute(ecpId, bankNam, msg);
};
LZR.Pro.Rfid.At911n.prototype.onRead.lzrClass_ = LZR.Pro.Rfid.At911n;
