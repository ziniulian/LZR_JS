/*************************************************
作者：子牛连
类名：Mouse
说明：鼠标控制器
创建日期：27-七月-2016 12:30:03
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base.Ctrl",
	"LZR.HTML.Base.Doe",
	"LZR.Base.CallBacks",
	"LZR.HTML.Base.Ctrl.Mouse.MouseInfo",
	"LZR.Base.Time"
], "LZR.HTML.Base.Ctrl.Mouse");
LZR.HTML.Base.Ctrl.Mouse = function (obj) /*bases:LZR.HTML.Base.Ctrl*/ {
	LZR.initSuper(this, obj);

	// 双击间隔
	this.dbTim = 0;	/*as:int*/

	// 长按间隔
	this.longTim = 0;	/*as:int*/

	// 滚轮是否可用
	this.enableWheel = false;	/*as:boolean*/

	// 鼠标经过是否可用
	this.enableMove = false;	/*as:boolean*/

	// 事件
	this.evt = {lk:{}, mid:{}, rk:{}};	/*as:Object*/

	// 右长
	this.evt.rk.lclick/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 按下
	this.evt.down/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 中双
	this.evt.mid.dbclick/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 中单
	this.evt.mid.click/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 中拖
	this.evt.mid.drop/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 右拖
	this.evt.rk.drop/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 右单
	this.evt.rk.click/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 右双
	this.evt.rk.dbclick/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 中长
	this.evt.mid.lclick/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 中滚
	this.evt.mid.wheel/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 中硬滚
	this.evt.mid.dw/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 左双
	this.evt.lk.dbclick/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 左单
	this.evt.lk.click/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 左拖
	this.evt.lk.drop/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 鼠标信息类
	this.clsMof/*m*/ = (LZR.HTML.Base.Ctrl.Mouse.MouseInfo);	/*as:fun*/

	// 时间工具
	this.utTim/*m*/ = new LZR.Base.Time();	/*as:LZR.Base.Time*/

	// 左长
	this.evt.lk.lclick/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 经过
	this.evt.move/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 抬起
	this.evt.up/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ctrl.Mouse.prototype = LZR.clone (LZR.HTML.Base.Ctrl.prototype, LZR.HTML.Base.Ctrl.Mouse.prototype);
LZR.HTML.Base.Ctrl.Mouse.prototype.super_ = [LZR.HTML.Base.Ctrl];
LZR.HTML.Base.Ctrl.Mouse.prototype.className_ = "LZR.HTML.Base.Ctrl.Mouse";
LZR.HTML.Base.Ctrl.Mouse.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ctrl.Mouse");

// 构造器
LZR.HTML.Base.Ctrl.Mouse.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.HTML.Base.Ctrl.Mouse.prototype.init_.lzrClass_ = LZR.HTML.Base.Ctrl.Mouse;

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.Mouse.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.HTML.Base.Ctrl.Mouse.prototype.hdObj_.lzrClass_ = LZR.HTML.Base.Ctrl.Mouse;

// 处理按下事件
LZR.HTML.Base.Ctrl.Mouse.prototype.hdDown = function (doeo/*as:LZR.HTML.Base.Doe*/, evt/*as:Object*/) {
	this.utEvt.stopDefault(evt);
	this.utEvt.stopBubble(evt);

	if (this.onDown(doeo, evt)) {
		var k = this.utEvt.parseMouseKey(evt);
		var v = doeo.dat.hct_mof;
		var dm = doeo.getDocument();
		// 检查按键是否可用
		if (v.enableStat & v.STAT[k]) {
			// 添加事件
			if (v.stat === 0) {
				// doeo.delEvt ("mousemove", this.className_);
				this.utEvt.addEvt (dm, "mousemove", v.docMoveFun, false);
				this.utEvt.addEvt (dm, "mouseup", v.docUpFun, false);
				this.utEvt.addEvt (dm, "contextmenu", this.utEvt.stopDefault, false);
			}
			v.stat += v.STAT[k];

			// 判断是否双击
			var p = this.utEvt.getMousePosition(evt);
			if (this.dbTim && v[k].dbStat === 2 && ((this.utTim.getTim() - v[k].tim) < this.dbTim)) {
				v[k].dbStat = 3;

				// 删除延时单击
				clearTimeout(v[k].timeout);

				// 触发双击事件
				var x = p.x - doeo.position.left;
				var y = p.y - doeo.position.top;
				switch (k) {
					case "lk":
						this.onLeftDouble(doeo, x, y, p.x, p.y);
						break;
					case "rk":
						this.onRightDouble(doeo, x, y, p.x, p.y);
						break;
					case "mid":
						this.onMidDouble(doeo, x, y, p.x, p.y);
						break;
				}
			} else {
				v[k].dbStat = 1;
				v[k].sx = p.x;
				v[k].sy = p.y;
				v[k].ex = p.x;
				v[k].ey = p.y;
				v[k].tim = this.utTim.getTim();
			}
		}
	}
};
LZR.HTML.Base.Ctrl.Mouse.prototype.hdDown.lzrClass_ = LZR.HTML.Base.Ctrl.Mouse;

// 处理全文档抬起事件
LZR.HTML.Base.Ctrl.Mouse.prototype.hdDocumentUp = function (doeo/*as:LZR.HTML.Base.Doe*/, evt/*as:Object*/) {
	this.utEvt.stopDefault(evt);
	this.utEvt.stopBubble(evt);

	var k = this.utEvt.parseMouseKey(evt);
	var v = doeo.dat.hct_mof;
	var dm = doeo.getDocument();
	// 检查按键是否可用
	if (v.stat & v.STAT[k]) {
		v.stat -= v.STAT[k];
		if (v.stat === 0) {
			this.utEvt.delEvt (dm, "mousemove", v.docMoveFun, false);
			this.utEvt.delEvt (dm, "mouseup", v.docUpFun, false);
/*
			if (this.enableMove) {
				doeo.addEvt ("mousemove", v.selfMoveFun, this.className_);
			}
*/
			// this.utEvt.delEvt (dm, "contextmenu", this.utEvt.stopDefault, false);	// 直接移除该事件，会导致右键菜单弹出。需要延时删除
			setTimeout(this.utLzr.bind(this, this.utEvt.delEvt, dm, "contextmenu", this.utEvt.stopDefault, false), 1);
		}

		if (this.onUp(doeo, evt, v[k])) {
			if (v[k].dbStat === 1) {
				var t = this.utTim.getTim() - v[k].tim;
				var p = this.utEvt.getMousePosition(evt);
				var x = p.x - doeo.position.left;
				var y = p.y - doeo.position.top;
				if (this.dbTim && t < this.dbTim) {
					// 双击状态
					v[k].dbStat = 2;

					// 创建延时单击
					switch (k) {
						case "lk":
							v[k].timeout = setTimeout(this.utLzr.bind(this, this.onLeftClick, doeo, x, y, p.x, p.y), this.dbTim);
							break;
						case "rk":
							v[k].timeout = setTimeout(this.utLzr.bind(this, this.onRightClick, doeo, x, y, p.x, p.y), this.dbTim);
							break;
						case "mid":
							v[k].timeout = setTimeout(this.utLzr.bind(this, this.onMidClick, doeo, x, y, p.x, p.y), this.dbTim);
							break;
					}

					v[k].tim += t;
				} else if (t < this.longTim || !this.longTim) {
					// 触发单击事件
					switch (k) {
						case "lk":
							this.onLeftClick(doeo, x, y, p.x, p.y);
							break;
						case "rk":
							this.onRightClick(doeo, x, y, p.x, p.y);
							break;
						case "mid":
							this.onMidClick(doeo, x, y, p.x, p.y);
							break;
					}
				} else {
					// 触发长按事件
					switch (k) {
						case "lk":
							this.onLeftLong(doeo, x, y, p.x, p.y);
							break;
						case "rk":
							this.onRightLong(doeo, x, y, p.x, p.y);
							break;
						case "mid":
							this.onMidLong(doeo, x, y, p.x, p.y);
							break;
					}
				}
			}
		}
	}
};
LZR.HTML.Base.Ctrl.Mouse.prototype.hdDocumentUp.lzrClass_ = LZR.HTML.Base.Ctrl.Mouse;

// 处理全文档移动事件
LZR.HTML.Base.Ctrl.Mouse.prototype.hdDocumentMove = function (doeo/*as:LZR.HTML.Base.Doe*/, evt/*as:Object*/) {
	this.utEvt.stopDefault(evt);
	this.utEvt.stopBubble(evt);

	var p = this.utEvt.getMousePosition(evt);
	var x = p.x - doeo.position.left;
	var y = p.y - doeo.position.top;
	var v = doeo.dat.hct_mof;
	var k;

	k = "lk";
	if (v.stat & v.STAT[k]) {
		if (!(v[k].dbStat && (v[k].sx === p.x) && (v[k].sy === p.y))) {
			v[k].dbStat = 0;
			v[k].ex = p.x;
			v[k].ey = p.y;
			this.onLeftDrop(doeo, x, y, p.x, p.y);
		}
	}

	k = "rk";
	if (v.stat & v.STAT[k]) {
		if (!(v[k].dbStat && (v[k].sx === p.x) && (v[k].sy === p.y))) {
			v[k].dbStat = 0;
			v[k].ex = p.x;
			v[k].ey = p.y;
			this.onRightDrop(doeo, x, y, p.x, p.y);
		}
	}

	k = "mid";
	if (v.stat & v.STAT[k]) {
		if (!(v[k].dbStat && (v[k].sx === p.x) && (v[k].sy === p.y))) {
			v[k].dbStat = 0;
			v[k].ex = p.x;
			v[k].ey = p.y;
			this.onMidDrop(doeo, x, y, p.x, p.y);
		}
	}
};
LZR.HTML.Base.Ctrl.Mouse.prototype.hdDocumentMove.lzrClass_ = LZR.HTML.Base.Ctrl.Mouse;

// 处理移动事件
LZR.HTML.Base.Ctrl.Mouse.prototype.hdMove = function (doeo/*as:LZR.HTML.Base.Doe*/, evt/*as:Object*/) {
	var v = doeo.dat.hct_mof;
	// this.utEvt.stopDefault(evt);
	// this.utEvt.stopBubble(evt);

	var p = this.utEvt.getMousePosition(evt);
	var x = p.x - doeo.position.left;
	var y = p.y - doeo.position.top;

	this.onMove(doeo, x, y, p.x, p.y);
};
LZR.HTML.Base.Ctrl.Mouse.prototype.hdMove.lzrClass_ = LZR.HTML.Base.Ctrl.Mouse;

// 处理滚轮事件
LZR.HTML.Base.Ctrl.Mouse.prototype.hdWheel = function (doeo/*as:LZR.HTML.Base.Doe*/, evt/*as:Object*/) {
	this.utEvt.stopDefault(evt);
	this.utEvt.stopBubble(evt);

	var p = this.utEvt.getMousePosition(evt);
	var x = p.x - doeo.position.left;
	var y = p.y - doeo.position.top;
	var v = doeo.dat.hct_mof;

	if (v.stat & v.STAT.mid) {
		// 硬滚动
		doeo.dat.hct_mof.dwVal += evt.delta;
		this.onDownWheel(doeo, evt.delta, x, y, p.x, p.y);
	} else {
		// 普通滚动
		doeo.dat.hct_mof.wheelVal += evt.delta;
		this.onWheel(doeo, evt.delta, x, y, p.x, p.y);
	}
};
LZR.HTML.Base.Ctrl.Mouse.prototype.hdWheel.lzrClass_ = LZR.HTML.Base.Ctrl.Mouse;

// 按下事件
LZR.HTML.Base.Ctrl.Mouse.prototype.onDown = function (doeo/*as:LZR.HTML.Base.Doe*/, evt/*as:Object*/)/*as:boolean*/ {
	return this.evt.down.execute (doeo, evt);
};
LZR.HTML.Base.Ctrl.Mouse.prototype.onDown.lzrClass_ = LZR.HTML.Base.Ctrl.Mouse;

// 抬起事件
LZR.HTML.Base.Ctrl.Mouse.prototype.onUp = function (doeo/*as:LZR.HTML.Base.Doe*/, evt/*as:Object*/, key/*as:Object*/)/*as:boolean*/ {
	return this.evt.up.execute (doeo, evt, key);
};
LZR.HTML.Base.Ctrl.Mouse.prototype.onUp.lzrClass_ = LZR.HTML.Base.Ctrl.Mouse;

// 左键单击事件
LZR.HTML.Base.Ctrl.Mouse.prototype.onLeftClick = function (doeo/*as:LZR.HTML.Base.Doe*/, x/*as:double*/, y/*as:double*/, bx/*as:double*/, by/*as:double*/) {
	this.evt.lk.click.execute (doeo, x, y, bx, by);
};
LZR.HTML.Base.Ctrl.Mouse.prototype.onLeftClick.lzrClass_ = LZR.HTML.Base.Ctrl.Mouse;

// 滚轮事件
LZR.HTML.Base.Ctrl.Mouse.prototype.onWheel = function (doeo/*as:LZR.HTML.Base.Doe*/, v/*as:int*/, x/*as:double*/, y/*as:double*/, bx/*as:double*/, by/*as:double*/) {
	this.evt.mid.wheel.execute (doeo, v, x, y, bx, by);
};
LZR.HTML.Base.Ctrl.Mouse.prototype.onWheel.lzrClass_ = LZR.HTML.Base.Ctrl.Mouse;

// 左键双击事件
LZR.HTML.Base.Ctrl.Mouse.prototype.onLeftDouble = function (doeo/*as:LZR.HTML.Base.Doe*/, x/*as:double*/, y/*as:double*/, bx/*as:double*/, by/*as:double*/) {
	this.evt.lk.dbclick.execute (doeo, x, y, bx, by);
};
LZR.HTML.Base.Ctrl.Mouse.prototype.onLeftDouble.lzrClass_ = LZR.HTML.Base.Ctrl.Mouse;

// 左键长按事件
LZR.HTML.Base.Ctrl.Mouse.prototype.onLeftLong = function (doeo/*as:LZR.HTML.Base.Doe*/, x/*as:double*/, y/*as:double*/, bx/*as:double*/, by/*as:double*/) {
	this.evt.lk.lclick.execute (doeo, x, y, bx, by);
};
LZR.HTML.Base.Ctrl.Mouse.prototype.onLeftLong.lzrClass_ = LZR.HTML.Base.Ctrl.Mouse;

// 经过事件
LZR.HTML.Base.Ctrl.Mouse.prototype.onMove = function (doeo/*as:LZR.HTML.Base.Doe*/, x/*as:double*/, y/*as:double*/, bx/*as:double*/, by/*as:double*/) {
	this.evt.move.execute (doeo, x, y, bx, by);
};
LZR.HTML.Base.Ctrl.Mouse.prototype.onMove.lzrClass_ = LZR.HTML.Base.Ctrl.Mouse;

// 中键长按事件
LZR.HTML.Base.Ctrl.Mouse.prototype.onMidLong = function (doeo/*as:LZR.HTML.Base.Doe*/, x/*as:double*/, y/*as:double*/, bx/*as:double*/, by/*as:double*/) {
	this.evt.mid.lclick.execute (doeo, x, y, bx, by);
};
LZR.HTML.Base.Ctrl.Mouse.prototype.onMidLong.lzrClass_ = LZR.HTML.Base.Ctrl.Mouse;

// 中键拖动事件
LZR.HTML.Base.Ctrl.Mouse.prototype.onMidDrop = function (doeo/*as:LZR.HTML.Base.Doe*/, x/*as:double*/, y/*as:double*/, bx/*as:double*/, by/*as:double*/) {
	this.evt.mid.drop.execute (doeo, x, y, bx, by);
};
LZR.HTML.Base.Ctrl.Mouse.prototype.onMidDrop.lzrClass_ = LZR.HTML.Base.Ctrl.Mouse;

// 中键双击事件
LZR.HTML.Base.Ctrl.Mouse.prototype.onMidDouble = function (doeo/*as:LZR.HTML.Base.Doe*/, x/*as:double*/, y/*as:double*/, bx/*as:double*/, by/*as:double*/) {
	this.evt.mid.dbclick.execute (doeo, x, y, bx, by);
};
LZR.HTML.Base.Ctrl.Mouse.prototype.onMidDouble.lzrClass_ = LZR.HTML.Base.Ctrl.Mouse;

// 中键单击事件
LZR.HTML.Base.Ctrl.Mouse.prototype.onMidClick = function (doeo/*as:LZR.HTML.Base.Doe*/, x/*as:double*/, y/*as:double*/, bx/*as:double*/, by/*as:double*/) {
	this.evt.mid.click.execute (doeo, x, y, bx, by);
};
LZR.HTML.Base.Ctrl.Mouse.prototype.onMidClick.lzrClass_ = LZR.HTML.Base.Ctrl.Mouse;

// 右键长按事件
LZR.HTML.Base.Ctrl.Mouse.prototype.onRightLong = function (doeo/*as:LZR.HTML.Base.Doe*/, x/*as:double*/, y/*as:double*/, bx/*as:double*/, by/*as:double*/) {
	this.evt.rk.lclick.execute (doeo, x, y, bx, by);
};
LZR.HTML.Base.Ctrl.Mouse.prototype.onRightLong.lzrClass_ = LZR.HTML.Base.Ctrl.Mouse;

// 右键拖动事件
LZR.HTML.Base.Ctrl.Mouse.prototype.onRightDrop = function (doeo/*as:LZR.HTML.Base.Doe*/, x/*as:double*/, y/*as:double*/, bx/*as:double*/, by/*as:double*/) {
	this.evt.rk.drop.execute (doeo, x, y, bx, by);
};
LZR.HTML.Base.Ctrl.Mouse.prototype.onRightDrop.lzrClass_ = LZR.HTML.Base.Ctrl.Mouse;

// 右键双击事件
LZR.HTML.Base.Ctrl.Mouse.prototype.onRightDouble = function (doeo/*as:LZR.HTML.Base.Doe*/, x/*as:double*/, y/*as:double*/, bx/*as:double*/, by/*as:double*/) {
	this.evt.rk.dbclick.execute (doeo, x, y, bx, by);
};
LZR.HTML.Base.Ctrl.Mouse.prototype.onRightDouble.lzrClass_ = LZR.HTML.Base.Ctrl.Mouse;

// 右键单击事件
LZR.HTML.Base.Ctrl.Mouse.prototype.onRightClick = function (doeo/*as:LZR.HTML.Base.Doe*/, x/*as:double*/, y/*as:double*/, bx/*as:double*/, by/*as:double*/) {
	this.evt.rk.click.execute (doeo, x, y, bx, by);
};
LZR.HTML.Base.Ctrl.Mouse.prototype.onRightClick.lzrClass_ = LZR.HTML.Base.Ctrl.Mouse;

// 左键拖动事件
LZR.HTML.Base.Ctrl.Mouse.prototype.onLeftDrop = function (doeo/*as:LZR.HTML.Base.Doe*/, x/*as:double*/, y/*as:double*/, bx/*as:double*/, by/*as:double*/) {
	this.evt.lk.drop.execute (doeo, x, y, bx, by);
};
LZR.HTML.Base.Ctrl.Mouse.prototype.onLeftDrop.lzrClass_ = LZR.HTML.Base.Ctrl.Mouse;

// 按下并滚动事件
LZR.HTML.Base.Ctrl.Mouse.prototype.onDownWheel = function (doeo/*as:LZR.HTML.Base.Doe*/, v/*as:int*/, x/*as:double*/, y/*as:double*/, bx/*as:double*/, by/*as:double*/) {
	this.evt.mid.dw.execute (doeo, v, x, y, bx, by);
};
LZR.HTML.Base.Ctrl.Mouse.prototype.onDownWheel.lzrClass_ = LZR.HTML.Base.Ctrl.Mouse;

// ---- 给元素添加事件集
LZR.HTML.Base.Ctrl.Mouse.prototype.addEvt = function (doeo/*as:LZR.HTML.Base.Doe*/, pro/*as:Object*/, obj/*as:Object*/) {
	var v;

	// 创建数据
	if (obj) {
		v = this.crtDat(doeo, "hct_mof", obj);
	} else {
		v = this.crtDat(doeo, "hct_mof", new this.clsMof(pro));
	}
	doeo.calcPosition();
	v.STAT = this.utEvt.MouseStat;
	v.docMoveFun = this.utLzr.bind(this, this.hdDocumentMove, doeo);
	v.docUpFun = this.utLzr.bind(this, this.hdDocumentUp, doeo);
	v.selfMoveFun = this.utLzr.bind(this, this.hdMove, doeo);

	if (this.enableMove) {
		doeo.addEvt ("mousemove", v.selfMoveFun, this.className_);
	}
	if (this.enableWheel) {
		doeo.addEvt ("wheel", this.utLzr.bind(this, this.hdWheel, doeo), this.className_);
	}
	doeo.addEvt ("mousedown", this.utLzr.bind(this, this.hdDown, doeo), this.className_);
};
LZR.HTML.Base.Ctrl.Mouse.prototype.addEvt.lzrClass_ = LZR.HTML.Base.Ctrl.Mouse;

// ---- 移除元素的事件集
LZR.HTML.Base.Ctrl.Mouse.prototype.delEvt = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	doeo.delEvt ("mousemove", this.className_);
	doeo.delEvt ("wheel", this.className_);
	doeo.delEvt ("mousedown", this.className_);

	// 删除数据
	this.delDat(doeo, "hct_mof");
};
LZR.HTML.Base.Ctrl.Mouse.prototype.delEvt.lzrClass_ = LZR.HTML.Base.Ctrl.Mouse;
