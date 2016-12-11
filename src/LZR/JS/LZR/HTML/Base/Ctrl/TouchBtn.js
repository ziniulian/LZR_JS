/*************************************************
作者：子牛连
类名：TouchBtn
说明：触控按钮
创建日期：10-12月-2016 12:52:26
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base.Ctrl",
	"LZR.HTML.Base.Doe",
	"LZR.HTML.Base.Ctrl.Btn"
], "LZR.HTML.Base.Ctrl.TouchBtn");
LZR.HTML.Base.Ctrl.TouchBtn = function (obj) /*bases:LZR.HTML.Base.Ctrl.Btn*/ {
	LZR.initSuper(this, obj);

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ctrl.TouchBtn.prototype = LZR.clone (LZR.HTML.Base.Ctrl.Btn.prototype, LZR.HTML.Base.Ctrl.TouchBtn.prototype);
LZR.HTML.Base.Ctrl.TouchBtn.prototype.super_ = [LZR.HTML.Base.Ctrl.Btn];
LZR.HTML.Base.Ctrl.TouchBtn.prototype.className_ = "LZR.HTML.Base.Ctrl.TouchBtn";
LZR.HTML.Base.Ctrl.TouchBtn.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ctrl.TouchBtn");

// 构造器
LZR.HTML.Base.Ctrl.TouchBtn.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.HTML.Base.Ctrl.TouchBtn.prototype.init_.lzrClass_ = LZR.HTML.Base.Ctrl.TouchBtn;

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.TouchBtn.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.HTML.Base.Ctrl.TouchBtn.prototype.hdObj_.lzrClass_ = LZR.HTML.Base.Ctrl.TouchBtn;

// ---- 处理按下事件
LZR.HTML.Base.Ctrl.TouchBtn.prototype.hdDown = function (doeo/*as:LZR.HTML.Base.Doe*/, evt/*as:Object*/) {
	doeo.addCss(this.css);

		// 触发按下事件
		if (this.onDown(doeo)) {
			if ((this.dbStat === 2) && ((this.utTim.getTim() - this.tim) < 2*this.dbTim)) {
				this.dbStat = 3;

				// 删除延时单击
				clearTimeout(this.timeout);

				// 触发双击事件
				this.onDbclick(doeo);
				return;
			} else {
				this.tim = this.utTim.getTim();
			}
		}
		this.dbStat = 1;
};
LZR.HTML.Base.Ctrl.TouchBtn.prototype.hdDown.lzrClass_ = LZR.HTML.Base.Ctrl.TouchBtn;

// ---- 给元素添加事件集
LZR.HTML.Base.Ctrl.TouchBtn.prototype.addEvt = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	doeo.addEvt ("touchstart", this.utLzr.bind(this, this.hdDown, doeo), this.className_);
	doeo.addEvt ("touchend",  this.utLzr.bind(this, this.hdUp, doeo), this.className_);
	doeo.addEvt ("touchcancel",  this.utLzr.bind(this, this.hdOut, doeo), this.className_);
};
LZR.HTML.Base.Ctrl.TouchBtn.prototype.addEvt.lzrClass_ = LZR.HTML.Base.Ctrl.TouchBtn;

// ---- 移除元素的事件集
LZR.HTML.Base.Ctrl.TouchBtn.prototype.delEvt = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	doeo.delEvt ("touchstart", this.className_);
	doeo.delEvt ("touchend", this.className_);
	doeo.delEvt ("touchcancel", this.className_);
};
LZR.HTML.Base.Ctrl.TouchBtn.prototype.delEvt.lzrClass_ = LZR.HTML.Base.Ctrl.TouchBtn;
