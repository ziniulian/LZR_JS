/*************************************************
作者：子牛连
类名：At911nView
说明：视图
创建日期：26-12月-2016 16:05:07
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base.Str",
	"LZR.Pro.Rfid.At911n",
	"LZR.HTML.Base.Doe",
	"LZR.HTML.Base.Ctrl.SglScd",
	"LZR.HTML.Base.Ctrl.Btn"
], "LZR.Pro.Rfid.At911n.At911nView");
LZR.Pro.Rfid.At911n.At911nView = function (obj) {
	// 按钮名
	this.btnNams = null;	/*as:Object*/

	// 列表框
	this.listDoeo/*m*/ = null;	/*as:LZR.HTML.Base.Doe*/

	// 标签列表切换控制器
	this.chgCtrl/*m*/ = new LZR.HTML.Base.Ctrl.SglScd({
		mouseAble: false,
		only: false
	});	/*as:LZR.HTML.Base.Ctrl.SglScd*/

	// 按钮控制器
	this.btnCtrl/*m*/ = new LZR.HTML.Base.Ctrl.Btn({
		mouseAble: false,
		dbTim: 0,
		longTim: 0
	});	/*as:LZR.HTML.Base.Ctrl.Btn*/

	// 元素类
	this.clsDoe/*m*/ = (LZR.HTML.Base.Doe);	/*as:fun*/

	// 列表模型
	this.listMod/*m*/ = null;	/*as:LZR.HTML.Base.Doe*/

	// 列表控制栏
	this.listCtrlBar/*m*/ = null;	/*as:LZR.HTML.Base.Doe*/

	// 列表停止栏
	this.listStopBar/*m*/ = null;	/*as:LZR.HTML.Base.Doe*/

	// ECP栏
	this.ecpDoeo/*m*/ = null;	/*as:LZR.HTML.Base.Doe*/

	// TID栏
	this.tidDoeo/*m*/ = null;	/*as:LZR.HTML.Base.Doe*/

	// USR栏
	this.usrDoeo/*m*/ = null;	/*as:LZR.HTML.Base.Doe*/

	// BCK栏
	this.bckDoeo/*m*/ = null;	/*as:LZR.HTML.Base.Doe*/

	// 浮动停止窗
	this.stopDoeo/*m*/ = null;	/*as:LZR.HTML.Base.Doe*/

	// 列表页
	this.listOut/*m*/ = null;	/*as:LZR.HTML.Base.Doe*/

	// 标签页
	this.tagOut/*m*/ = null;	/*as:LZR.HTML.Base.Doe*/

	// 切换按钮
	this.chgScd/*m*/ = null;	/*as:LZR.HTML.Base.Doe*/

	// 写入窗
	this.writeDoeo/*m*/ = null;	/*as:LZR.HTML.Base.Doe*/

	// 字符串工具
	this.utStr/*m*/ = LZR.getSingleton(LZR.Base.Str);	/*as:LZR.Base.Str*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Pro.Rfid.At911n.At911nView.prototype.className_ = "LZR.Pro.Rfid.At911n.At911nView";
LZR.Pro.Rfid.At911n.At911nView.prototype.version_ = "1.0";

LZR.load(null, "LZR.Pro.Rfid.At911n.At911nView");

// 构造器
LZR.Pro.Rfid.At911n.At911nView.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Pro.Rfid.At911n.At911nView.prototype.init_.lzrClass_ = LZR.Pro.Rfid.At911n.At911nView;

// 对构造参数的特殊处理
LZR.Pro.Rfid.At911n.At911nView.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.Pro.Rfid.At911n.At911nView.prototype.hdObj_.lzrClass_ = LZR.Pro.Rfid.At911n.At911nView;

// 初始化视图
LZR.Pro.Rfid.At911n.At911nView.prototype.initView = function (doe/*as:Object*/, domNams/*as:Object*/, btnNams/*as:Object*/) {
	var s;
	var doeo = new this.clsDoe({
		hd_doe: doe
	});

	if (!this.listOut) {
		if (domNams.listOut) {
			this.listOut = doeo.getById(domNams.listOut);
		} else {
			return;
		}
	}

	if (!this.tagOut) {
		if (domNams.tagOut) {
			this.tagOut = doeo.getById(domNams.tagOut);
		} else {
			return;
		}
	}

	if (btnNams) {
		this.btnNams = btnNams;
	}

	for (s in domNams) {
		switch (s) {
			case "chgScd":
				this.chgScd = doeo.getById(domNams.chgScd);
				break;
			case "listDoeo":
				this.listDoeo = this.listOut.getById(domNams.listDoeo);
				break;
			case "listMod":
				this.listMod = this.listDoeo.getById(domNams.listMod);
				this.listMod.remove();
				break;
			case "listCtrlBar":
				this.listCtrlBar = this.listOut.getById(domNams.listCtrlBar);
				break;
			case "listStopBar":
				this.listStopBar = this.listOut.getById(domNams.listStopBar);
				break;
			case "btnCtrlCss":
				this.btnCtrl.css = domNams.btnCtrlCss;
				break;
			case "chgCtrlCss":
				this.chgCtrl.css = domNams.chgCtrlCss;
				break;
			case "ecp":
				this.ecpDoeo = this.tagOut.getById(domNams.ecp);
				break;
			case "tid":
				this.tidDoeo = this.tagOut.getById(domNams.tid);
				break;
			case "usr":
				this.usrDoeo = this.tagOut.getById(domNams.usr);
				break;
			case "bck":
				this.bckDoeo = this.tagOut.getById(domNams.bck);
				break;
			case "stopDoeo":
				this.stopDoeo = doeo.getById(domNams.stopDoeo);
			case "writeDoeo":
				this.writeDoeo = doeo.getById(domNams.writeDoeo);
		}
	}

	this.btnCtrl.add(this.listCtrlBar.getById(this.btnNams.scan));
	this.btnCtrl.add(this.listCtrlBar.getById(this.btnNams.clean));
	this.btnCtrl.add(this.listStopBar);
	this.btnCtrl.add(this.ecpDoeo.getById(this.btnNams.ecpReadBtn));
	this.btnCtrl.add(this.ecpDoeo.getById(this.btnNams.ecpWriteBtn));
	this.btnCtrl.add(this.tidDoeo.getById(this.btnNams.tidReadBtn));
	this.btnCtrl.add(this.usrDoeo.getById(this.btnNams.usrReadBtn));
	this.btnCtrl.add(this.usrDoeo.getById(this.btnNams.usrWriteBtn));
	this.btnCtrl.add(this.bckDoeo.getById(this.btnNams.bckReadBtn));
	this.btnCtrl.add(this.bckDoeo.getById(this.btnNams.bckWriteBtn));
	this.btnCtrl.add(this.stopDoeo.getById(this.btnNams.stopBtn));
	this.btnCtrl.add(this.writeDoeo.getById(this.btnNams.writeOkBtn));
	this.btnCtrl.add(this.writeDoeo.getById(this.btnNams.writeCancleBtn));
	this.chgCtrl.add(this.chgScd);
	this.chgScd.dat.hct_scd.setEventObj(this);
	this.chgScd.dat.hct_scd.evt.change.add(this.showTag);
};
LZR.Pro.Rfid.At911n.At911nView.prototype.initView.lzrClass_ = LZR.Pro.Rfid.At911n.At911nView;

// 刷新列表页
LZR.Pro.Rfid.At911n.At911nView.prototype.flushList = function (tags/*as:Object*/) {
	var s, d, t;
	this.listDoeo.delAll();
	for (s in tags) {
		this.listDoeo.add(tags[s].doeo);
	}
};
LZR.Pro.Rfid.At911n.At911nView.prototype.flushList.lzrClass_ = LZR.Pro.Rfid.At911n.At911nView;

// 设置列表控制栏可见性
LZR.Pro.Rfid.At911n.At911nView.prototype.setListCtrl = function (visiable/*as:boolean*/) {
	if (visiable) {
		this.listCtrlBar.delCss("Lc_nosee");
		this.listStopBar.addCss("Lc_nosee");
	} else {
		this.listCtrlBar.addCss("Lc_nosee");
		this.listStopBar.delCss("Lc_nosee");
	}
};
LZR.Pro.Rfid.At911n.At911nView.prototype.setListCtrl.lzrClass_ = LZR.Pro.Rfid.At911n.At911nView;

// 刷新标签页
LZR.Pro.Rfid.At911n.At911nView.prototype.flushTag = function (tag/*as:Object*/) {
	var v;
	v = this.ecpDoeo.getById(this.btnNams.hx).doe;
	v.innerHTML = tag.banks.ecp.msg;
	v = this.ecpDoeo.getById(this.btnNams.txt).doe;
	v.innerHTML = this.utStr.passUtf8Str(tag.banks.ecp.msg);
	v = this.usrDoeo.getById(this.btnNams.hx).doe;
	v.innerHTML = tag.banks.usr.msg;
	v = this.usrDoeo.getById(this.btnNams.txt).doe;
	v.innerHTML = this.utStr.passUtf8Str(tag.banks.usr.msg);
	v = this.bckDoeo.getById(this.btnNams.hx).doe;
	v.innerHTML = tag.banks.bck.msg;
	v = this.bckDoeo.getById(this.btnNams.txt).doe;
	v.innerHTML = this.utStr.passUtf8Str(tag.banks.bck.msg);
	v = this.tidDoeo.getById(this.btnNams.hx).doe;
	v.innerHTML = tag.banks.tid.msg;
};
LZR.Pro.Rfid.At911n.At911nView.prototype.flushTag.lzrClass_ = LZR.Pro.Rfid.At911n.At911nView;

// 设置悬浮停止窗可见性
LZR.Pro.Rfid.At911n.At911nView.prototype.setStopDoeo = function (visiable/*as:boolean*/) {
	if (visiable) {
		this.stopDoeo.delCss("Lc_nosee");
	} else {
		this.stopDoeo.addCss("Lc_nosee");
	}
};
LZR.Pro.Rfid.At911n.At911nView.prototype.setStopDoeo.lzrClass_ = LZR.Pro.Rfid.At911n.At911nView;

// 设置写入窗可见性
LZR.Pro.Rfid.At911n.At911nView.prototype.setWriteDoeo = function (visiable/*as:boolean*/, title/*as:string*/, msg/*as:string*/) {
	if (visiable) {
		this.writeDoeo.getById(this.btnNams.writeTitle).doe.innerHTML = title;
		this.writeDoeo.getById(this.btnNams.txt).doe.value = msg;
		this.writeDoeo.delCss("Lc_nosee");
	} else {
		this.writeDoeo.addCss("Lc_nosee");
	}
};
LZR.Pro.Rfid.At911n.At911nView.prototype.setStopDoeo.lzrClass_ = LZR.Pro.Rfid.At911n.At911nView;

// 获取写入信息
LZR.Pro.Rfid.At911n.At911nView.prototype.getWriteTxt = function ()/*as:string*/ {
	return this.writeDoeo.getById(this.btnNams.txt).doe.value;
};
LZR.Pro.Rfid.At911n.At911nView.prototype.getWriteTxt.lzrClass_ = LZR.Pro.Rfid.At911n.At911nView;

// 设置标签可见性
LZR.Pro.Rfid.At911n.At911nView.prototype.showTag = function (v/*as:boolean*/, self/*as:Object*/, old/*as:Object*/, tmpVal/*as:Object*/) {
	if (v) {
		if (this.listStopBar.doe.className.indexOf("Lc_nosee") >= 0) {
			this.listOut.addCss("Lc_nosee");
			this.tagOut.delCss("Lc_nosee");
		} else {
			tmpVal.tmpVal = false;
			this.chgCtrl.vcCur.set(null);
			return false;
		};
	} else {
		this.tagOut.addCss("Lc_nosee");
		this.listOut.delCss("Lc_nosee");
	}
};
LZR.Pro.Rfid.At911n.At911nView.prototype.showTag.lzrClass_ = LZR.Pro.Rfid.At911n.At911nView;
