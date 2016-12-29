/*************************************************
作者：子牛连
类名：At911nView
说明：视图
创建日期：26-12月-2016 16:05:07
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Pro.Rfid.At911n",
	"LZR.HTML.Base.Doe",
	"LZR.HTML.Base.Ctrl.SglScd",
	"LZR.HTML.Base.Ctrl.Btn"
], "LZR.Pro.Rfid.At911n.At911nView");
LZR.Pro.Rfid.At911n.At911nView = function (obj) {
	// 列表框
	this.listDoeo = null;	/*as:LZR.HTML.Base.Doe*/

	// 列表模型
	this.listMod = null;	/*as:LZR.HTML.Base.Doe*/

	// 列表控制栏
	this.listCtrlBar = null;	/*as:LZR.HTML.Base.Doe*/

	// 列表停止栏
	this.listStopBar = null;	/*as:LZR.HTML.Base.Doe*/

	// ECP栏
	this.ecpDoeo = null;	/*as:LZR.HTML.Base.Doe*/

	// TID栏
	this.tidDoeo = null;	/*as:LZR.HTML.Base.Doe*/

	// USR栏
	this.usrDoeo = null;	/*as:LZR.HTML.Base.Doe*/

	// BCK栏
	this.bckDoeo = null;	/*as:LZR.HTML.Base.Doe*/

	// 浮动停止窗
	this.stopDoeo = null;	/*as:LZR.HTML.Base.Doe*/

	// 列表页
	this.listOut = null;	/*as:LZR.HTML.Base.Doe*/

	// 标签页
	this.tagOut = null;	/*as:LZR.HTML.Base.Doe*/

	// 按钮名
	this.btnNams = null;	/*as:Object*/

	// 标签列表切换控制器
	this.chgCtrl/*m*/ = new LZR.HTML.Base.Ctrl.SglScd();	/*as:LZR.HTML.Base.Ctrl.SglScd*/

	// 按钮控制器
	this.btnCtrl/*m*/ = new LZR.HTML.Base.Ctrl.Btn({
		mouseAble: false,
		dbTim: 0,
		longTim: 0
	});	/*as:LZR.HTML.Base.Ctrl.Btn*/

	// 元素类
	this.clsDoe/*m*/ = (LZR.HTML.Base.Doe);	/*as:fun*/

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
			case "":
				break;
			case "":
				break;
			case "":
				break;
			case "":
				break;
			case "":
				break;
			case "":
				break;
			case "":
				break;
			case "":
				break;
		}
	}

	this.btnCtrl.add(this.listCtrlBar.getById(this.btnNams.scan));
	this.btnCtrl.add(this.listCtrlBar.getById(this.btnNams.clean));
	this.btnCtrl.add(this.listStopBar);
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
	
};
LZR.Pro.Rfid.At911n.At911nView.prototype.flushTag.lzrClass_ = LZR.Pro.Rfid.At911n.At911nView;

// 设置悬浮停止窗可见性
LZR.Pro.Rfid.At911n.At911nView.prototype.setStopDoeo = function (visiable/*as:boolean*/) {
	
};
LZR.Pro.Rfid.At911n.At911nView.prototype.setStopDoeo.lzrClass_ = LZR.Pro.Rfid.At911n.At911nView;

// 标签列表模块切换
LZR.Pro.Rfid.At911n.At911nView.prototype.tag2List = function (nam/*as:string*/) {
	
};
LZR.Pro.Rfid.At911n.At911nView.prototype.tag2List.lzrClass_ = LZR.Pro.Rfid.At911n.At911nView;
