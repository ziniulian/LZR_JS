/*************************************************
作者：子牛连
类名：At911nCtrl
说明：控制器
创建日期：22-12月-2016 9:10:31
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base.Str",
	"LZR.Pro.Rfid.At911n",
	"LZR.Pro.Rfid.At911n.ScanTag",
	"LZR.Pro.Rfid.At911n.At911nView"
], "LZR.Pro.Rfid.At911n.At911nCtrl");
LZR.Pro.Rfid.At911n.At911nCtrl = function (obj) {
	// 一个字的单位大小
	this.wordUnit = 2;	/*as:int*/

	// 标签类型
	this.tagTyp = "t6c";	/*as:string*/

	// 标签集合的数量
	this.tagsCount = 0;	/*as:int*/

	// 写入区块
	this.writeBank = null;	/*as:Object*/

	// 标签类
	this.clsTag/*m*/ = (LZR.Pro.Rfid.At911n.ScanTag);	/*as:fun*/

	// 安卓对象
	this.adr/*m*/ = new LZR.Pro.Rfid.At911n();	/*as:LZR.Pro.Rfid.At911n*/

	// 标签集合
	this.tags/*m*/ = {};	/*as:LZR.Pro.Rfid.At911n.ScanTag*/

	// 字符串工具
	this.utStr/*m*/ = LZR.getSingleton(LZR.Base.Str);	/*as:LZR.Base.Str*/

	// 视图
	this.view/*m*/ = new LZR.Pro.Rfid.At911n.At911nView();	/*as:LZR.Pro.Rfid.At911n.At911nView*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.className_ = "LZR.Pro.Rfid.At911n.At911nCtrl";
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Rfid.At911n.At911nCtrl");

// 构造器
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.init_ = function (obj/*as:Object*/) {
	this.bindView();

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.init_.lzrClass_ = LZR.Pro.Rfid.At911n.At911nCtrl;

// 对构造参数的特殊处理
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.hdObj_ = function (obj/*as:Object*/) {
	if (obj.hd_adr) {
		this.adr.adrObj = obj.hd_adr;
	}
};
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.hdObj_.lzrClass_ = LZR.Pro.Rfid.At911n.At911nCtrl;

// 字节与字的转换
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.byte2Word = function (num/*as:int*/)/*as:int*/ {
	return Math.floor(num/this.wordUnit);
};
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.byte2Word.lzrClass_ = LZR.Pro.Rfid.At911n.At911nCtrl;

// 创建一个标签
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.crtTag = function (msg/*as:Object*/)/*as:Object*/ {
	var t;
	var pro = {
		id: this.tagsCount,
		hd_emTyp: this.tagTyp
	}
	if (msg) {
		pro.hd_msg = msg;
		if (msg.id) {
			pro.id = msg.id;
		}
	}

	if (this.tags[pro.id]) {
		// 处理 id 重名问题
		if (msg.ecp && msg.ecp !== pro.id) {
			// 处理 ecp 更名
			t = this.tags[pro.id];
			LZR.del(this.tags, pro.id);
			pro.id = msg.ecp;
			t.id = pro.id;
			this.tags[pro.id] = t;

			// 修改列表元素
			t.doeo.id.set(t.id);
			t.doeo.getById(this.view.btnNams.hx).doe.innerHTML = t.id;
			t.doeo.getById(this.view.btnNams.txt).doe.innerHTML = this.utStr.passUtf8Str(t.id);
		}

		t = this.tags[pro.id];
		t.hdMsg(msg);

		if (msg.scanNum) {
			t.scanNum += msg.scanNum;
			t.doeo.getById(this.view.btnNams.tim).doe.innerHTML = t.scanNum;
		}
	} else {
		if (msg.scanNum) {
			pro.scanNum = msg.scanNum;
		}
		t = new this.clsTag(pro);
		this.tags[pro.id] = t;
		this.tagsCount ++;

		// 创建列表元素
		t.doeo = this.view.listMod.clone();
		t.doeo.getById(this.view.btnNams.tim).doe.innerHTML = t.scanNum;
		t.doeo.getById(this.view.btnNams.hx).doe.innerHTML = t.id;
		t.doeo.getById(this.view.btnNams.txt).doe.innerHTML = this.utStr.passUtf8Str(t.id);
		this.view.listDoeo.add(t.doeo, t.id);
		t.doeo.matchParent("b", "l");
	}

	return this.tags[pro.id];
};
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.crtTag.lzrClass_ = LZR.Pro.Rfid.At911n.At911nCtrl;

// 清空标签
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.clean = function () {
	this.tags = {};
	this.view.listDoeo.delAll();
};
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.clean.lzrClass_ = LZR.Pro.Rfid.At911n.At911nCtrl;

// 扫描
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.scanning = function () {
	this.adr.stat = 1;

	this.view.setListCtrl(false);
	this.adr.scanning();
};
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.scanning.lzrClass_ = LZR.Pro.Rfid.At911n.At911nCtrl;

// 停止
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.stop = function (isTagStop/*as:boolean*/) {
	this.adr.stat = 0;

	this.adr.stop();

	if (isTagStop) {
		this.view.setStopDoeo(false);
	} else {
		this.view.setListCtrl(true);
	}
};
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.stop.lzrClass_ = LZR.Pro.Rfid.At911n.At911nCtrl;

// 读码
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.read = function (bank/*as:Object*/, msg/*as:string*/) {
	this.adr.stat = 3;

	this.view.setStopDoeo(true);

	var l = bank.getLength();
	this.adr.read(bank.emNam.getKey(), this.byte2Word(bank.rs), this.byte2Word(l));
};
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.read.lzrClass_ = LZR.Pro.Rfid.At911n.At911nCtrl;

// 写码准备
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.writeBefore = function (bank/*as:Object*/) {
	this.writeBank = bank;
	this.view.setWriteDoeo(true, bank.emNam.get().nam, this.view[bank.emNam.getKey() + "Doeo"].getById(this.view.btnNams.txt).doe.innerHTML);
};
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.writeBefore.lzrClass_ = LZR.Pro.Rfid.At911n.At911nCtrl;

// 写码
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.write = function (bank/*as:Object*/, msg/*as:string*/) {
	this.adr.stat = 2;

	this.view.setWriteDoeo(false);
	this.view.setStopDoeo(true);

	var l = bank.getLength(true);
	var s = this.utStr.toUtf8Str(msg, l).toUpperCase();
	this.adr.write(bank.emNam.getKey(), this.byte2Word(bank.ws), s);
};
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.write.lzrClass_ = LZR.Pro.Rfid.At911n.At911nCtrl;

// 处理扫码
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.hdScan = function (ecpId/*as:string*/) {
	var t = this.crtTag({
		id: ecpId,
		ecp: ecpId,
		scanNum: 1
	});
};
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.hdScan.lzrClass_ = LZR.Pro.Rfid.At911n.At911nCtrl;

// 处理写码
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.hdWrite = function (ecpId/*as:string*/, bankNam/*as:string*/, msg/*as:string*/) {
	var pro = {
		id: ecpId
	};
	pro[bankNam] = msg;

	var t = this.crtTag(pro);

	this.view.flushTag(t);
	this.view.setStopDoeo(false);
};
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.hdWrite.lzrClass_ = LZR.Pro.Rfid.At911n.At911nCtrl;

// 处理读码
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.hdRead = function (ecpId/*as:string*/, bankNam/*as:string*/, msg/*as:string*/) {
	this.hdWrite(ecpId, bankNam, msg);
};
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.hdRead.lzrClass_ = LZR.Pro.Rfid.At911n.At911nCtrl;

// 绑定视图
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.bindView = function (view/*as:Object*/) {
	this.adr.setEventObj(this);
	this.adr.evt.scan.add(this.hdScan);
	this.adr.evt.write.add(this.hdWrite);
	this.adr.evt.read.add(this.hdRead);

	this.view.btnCtrl.evt.click.add(this.adr.utLzr.bind(this, this.hdClick));
};
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.bindView.lzrClass_ = LZR.Pro.Rfid.At911n.At911nCtrl;

// 处理按钮点击
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.hdClick = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	var t = this.tags[0];
	if (!t) {
		t = new this.clsTag({hd_emTyp: this.tagTyp});
	}
	switch (doeo.id.get()) {
		case this.view.btnNams.scan:
			this.scanning();
			break;
		case this.view.btnNams.clean:
			this.clean();
			break;
		case this.view.btnNams.listStop:
			this.stop(false);
			break;
		case this.view.btnNams.ecpReadBtn:
			this.read(t.banks.ecp);
			break;
		case this.view.btnNams.tidReadBtn:
			this.read(t.banks.tid);
			break;
		case this.view.btnNams.usrReadBtn:
			this.read(t.banks.usr);
			break;
		case this.view.btnNams.bckReadBtn:
			this.read(t.banks.bck);
			break;
		case this.view.btnNams.stopBtn:
			this.stop(true);
			break;
		case this.view.btnNams.ecpWriteBtn:
			this.writeBefore(t.banks.ecp);
			break;
		case this.view.btnNams.usrWriteBtn:
			this.writeBefore(t.banks.usr);
			break;
		case this.view.btnNams.bckWriteBtn:
			this.writeBefore(t.banks.bck);
			break;
		case this.view.btnNams.writeCancleBtn:
			this.view.setWriteDoeo(false);
			break;
		case this.view.btnNams.writeOkBtn:
			this.write(this.writeBank, this.view.getWriteTxt());
			break;
	}
};
LZR.Pro.Rfid.At911n.At911nCtrl.prototype.hdClick.lzrClass_ = LZR.Pro.Rfid.At911n.At911nCtrl;
