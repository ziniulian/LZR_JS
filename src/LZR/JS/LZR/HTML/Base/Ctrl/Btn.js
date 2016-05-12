/*************************************************
作者：子牛连
类名：Btn
说明：按钮
创建日期：18-三月-2016 10:57:17
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base.Ctrl",
	"LZR.Base.CallBacks",
	"LZR.Base.Time"
], "LZR.HTML.Base.Ctrl.Btn");
LZR.HTML.Base.Ctrl.Btn = function (obj) /*bases:LZR.HTML.Base.Ctrl*/ {
	LZR.initSuper(this, obj);

	// 点击时间
	this.tim = 0;	/*as:int*/

	// 双击状态
	this.dbStat = 0;	/*as:int*/

	// 延时函数
	this.timout = null;	/*as:fun*/

	// 双击间隔
	this.dbTim = 120;	/*as:int*/

	// 长按间隔
	this.longTim = 500;	/*as:int*/

	// 按钮按下时的样式
	this.css = "";	/*as:string*/

	// 单击
	this.evt.click/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 长按
	this.evt.lclick/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 双击
	this.evt.dbclick/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 按下
	this.evt.down/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 抬起
	this.evt.up/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 时间工具
	this.utTim/*m*/ = LZR.getSingleton(LZR.Base.Time);	/*as:LZR.Base.Time*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ctrl.Btn.prototype = LZR.clone (LZR.HTML.Base.Ctrl.prototype, LZR.HTML.Base.Ctrl.Btn.prototype);
LZR.HTML.Base.Ctrl.Btn.prototype.super_ = [LZR.HTML.Base.Ctrl];
LZR.HTML.Base.Ctrl.Btn.prototype.className_ = "LZR.HTML.Base.Ctrl.Btn";
LZR.HTML.Base.Ctrl.Btn.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ctrl.Btn");

// 构造器
LZR.HTML.Base.Ctrl.Btn.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}

	this.setEventObj (this);
};

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.Btn.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};

// 处理按下事件
LZR.HTML.Base.Ctrl.Btn.prototype.hdDown = function (doeo/*as:LZR.HTML.Base.Doe*/, evt/*as:Object*/) {
	if (this.utEvt.getEvent(evt).button === 0) {	// 判断是左键被按下
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
	}
};

// 处理抬起事件
LZR.HTML.Base.Ctrl.Btn.prototype.hdUp = function (doeo/*as:LZR.HTML.Base.Doe*/, evt/*as:Object*/) {
	switch (this.dbStat) {
		case 3:
			doeo.delCss(this.css);
			break;
		case 1:
			doeo.delCss(this.css);

			// 触发抬起事件
			if (this.onUp(doeo)) {
				var t = this.utTim.getTim() - this.tim;
				if (this.dbTim && t < this.dbTim) {
					this.dbStat = 2;

					// 创建延时单击
					this.timeout = setTimeout(this.utLzr.bind(this, this.onClick, doeo), this.dbTim);
					return;
				} else if (t < this.longTim || !this.longTim) {
					// 触发单击事件
					this.onClick(doeo);
				} else {
					// 触发长按事件
					this.onLclick(doeo);
				}
			}
			break;
	}
	this.dbStat = 0;
};

// 处理移出事件
LZR.HTML.Base.Ctrl.Btn.prototype.hdOut = function (doeo/*as:LZR.HTML.Base.Doe*/, evt/*as:Object*/) {
	doeo.delCss(this.css);
	this.dbStat = 0;
};

// 单击事件
LZR.HTML.Base.Ctrl.Btn.prototype.onClick = function (doeo/*as:LZR.HTML.Base.Doe*/)/*as:boolean*/ {
	return this.evt.click.execute (doeo);
};

// 长按事件
LZR.HTML.Base.Ctrl.Btn.prototype.onLclick = function (doeo/*as:LZR.HTML.Base.Doe*/)/*as:boolean*/ {
	return this.evt.lclick.execute (doeo);
};

// 双击事件
LZR.HTML.Base.Ctrl.Btn.prototype.onDbclick = function (doeo/*as:LZR.HTML.Base.Doe*/)/*as:boolean*/ {
	return this.evt.dbclick.execute (doeo);
};

// 按下事件
LZR.HTML.Base.Ctrl.Btn.prototype.onDown = function (doeo/*as:LZR.HTML.Base.Doe*/)/*as:boolean*/ {
	return this.evt.down.execute (doeo);
};

// 抬起事件
LZR.HTML.Base.Ctrl.Btn.prototype.onUp = function (doeo/*as:LZR.HTML.Base.Doe*/)/*as:boolean*/ {
	return this.evt.up.execute (doeo);
};

// ---- 给元素添加事件集
LZR.HTML.Base.Ctrl.Btn.prototype.addEvt = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	doeo.addEvt ("mousedown", this.utLzr.bind(this, this.hdDown, doeo), this.className_);
	doeo.addEvt ("mouseup",  this.utLzr.bind(this, this.hdUp, doeo), this.className_);
	doeo.addEvt ("mouseout",  this.utLzr.bind(this, this.hdOut, doeo), this.className_);
};

// ---- 移除元素的事件集
LZR.HTML.Base.Ctrl.Btn.prototype.delEvt = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	doeo.delEvt ("mousedown", this.className_);
	doeo.delEvt ("mouseup", this.className_);
	doeo.delEvt ("mouseout", this.className_);
};
