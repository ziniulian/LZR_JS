/*************************************************
作者：子牛连
类名：Txt
说明：文本控制器
创建日期：27-七月-2016 12:30:04
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base.Ctrl",
	"LZR.HTML.Base.Doe",
	"LZR.Base.CallBacks",
	"LZR.Base.Val.Ctrl"
], "LZR.HTML.Base.Ctrl.Txt");
LZR.HTML.Base.Ctrl.Txt = function (obj) /*bases:LZR.HTML.Base.Ctrl*/ {
	LZR.initSuper(this, obj);

	// 是否为单行
	this.single = true;	/*as:boolean*/

	// 内容改变
	this.evt.chg/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 值控制器类
	this.clsVc/*m*/ = (LZR.Base.Val.Ctrl);	/*as:fun*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ctrl.Txt.prototype = LZR.clone (LZR.HTML.Base.Ctrl.prototype, LZR.HTML.Base.Ctrl.Txt.prototype);
LZR.HTML.Base.Ctrl.Txt.prototype.super_ = [LZR.HTML.Base.Ctrl];
LZR.HTML.Base.Ctrl.Txt.prototype.className_ = "LZR.HTML.Base.Ctrl.Txt";
LZR.HTML.Base.Ctrl.Txt.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ctrl.Txt");

// 文本转HTML
LZR.HTML.Base.Ctrl.Txt.prototype.txt2Html = function (txt/*as:string*/)/*as:string*/ {
	if (this.single) {
		return txt;
	} else {
		var s = "<div>" + txt.replace(/\n/g, "</div><div>") + "</div>";
		return s.replace(/<div><\/div>/g, "<div><br></div>");
	}
};
LZR.HTML.Base.Ctrl.Txt.prototype.txt2Html.lzrClass_ = LZR.HTML.Base.Ctrl.Txt;

// ---- 给元素添加事件集
LZR.HTML.Base.Ctrl.Txt.prototype.addEvt = function (doeo/*as:LZR.HTML.Base.Doe*/, pro/*as:Object*/, obj/*as:Object*/) {
	var v;
	// 创建数据
	if (obj) {
		v = this.crtDat(doeo, "hct_txt", obj);
	} else {
		if (!pro) {
			pro = "";
		}
		v = this.crtDat(doeo, "hct_txt", new this.clsVc(pro));
	}

	// 初始化网页内容
	doeo.setAtt("contenteditable", "true");
	doeo.doe.innerHTML = this.txt2Html(v.get());

	// 添加事件
	doeo.addEvt ("keyup", this.utLzr.bind(this, this.hdKeyUp, doeo), this.className_);
	doeo.addEvt ("blur", this.utLzr.bind(this, this.hdBlur, doeo), this.className_);
	this.crtCb2Dat(doeo, doeo.dat.hct_txt.evt.change, "hdChg");
	this.crtCb2Dat(doeo, doeo.dat.hct_txt.evt.change, "onChg");
};
LZR.HTML.Base.Ctrl.Txt.prototype.addEvt.lzrClass_ = LZR.HTML.Base.Ctrl.Txt;

// 构造器
LZR.HTML.Base.Ctrl.Txt.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.HTML.Base.Ctrl.Txt.prototype.init_.lzrClass_ = LZR.HTML.Base.Ctrl.Txt;

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.Txt.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.HTML.Base.Ctrl.Txt.prototype.hdObj_.lzrClass_ = LZR.HTML.Base.Ctrl.Txt;

// HTML转文本
LZR.HTML.Base.Ctrl.Txt.prototype.html2Txt = function (html/*as:string*/)/*as:string*/ {
	var r;
// console.log (html);
	r = html.replace(/^<(div|p)>|<(br|\/p|\/div)>/g, "");
	r = r.replace(/<(div|p)>/g, "\n");
	if (this.single) {
		r = r.match(/.*/)[0];
	}
	return r;
};
LZR.HTML.Base.Ctrl.Txt.prototype.html2Txt.lzrClass_ = LZR.HTML.Base.Ctrl.Txt;

// 处理按键抬起事件
LZR.HTML.Base.Ctrl.Txt.prototype.hdKeyUp = function (doeo/*as:LZR.HTML.Base.Doe*/, e/*as:Object*/) {
	switch (e.keyCode) {
		case 9:		// tab 键
			break;
		case 13:	// 回车键
			if (this.single) {
				doeo.doe.blur();
			}
			break;
	}
};
LZR.HTML.Base.Ctrl.Txt.prototype.hdKeyUp.lzrClass_ = LZR.HTML.Base.Ctrl.Txt;

// 处理失去焦点事件
LZR.HTML.Base.Ctrl.Txt.prototype.hdBlur = function (doeo/*as:LZR.HTML.Base.Doe*/, e/*as:Object*/) {
	var t = this.html2Txt(doeo.doe.innerHTML);
	var f = this.getCb2Dat(doeo, doeo.dat.hct_txt.evt.change, "hdChg");
	// f.enableEvent = false;
	doeo.dat.hct_txt.set(t);
	// f.enableEvent = f.autoEvent;
	// doeo.doe.innerHTML = this.txt2Html(doeo.dat.hct_txt.get());	// 值不变时若需整理 innerHTML 内容，则需使用此方式。目前暂未遇到问题，故不采纳。
	return;
};
LZR.HTML.Base.Ctrl.Txt.prototype.hdBlur.lzrClass_ = LZR.HTML.Base.Ctrl.Txt;

// 内容变化时的触发事件
LZR.HTML.Base.Ctrl.Txt.prototype.onChg = function (doeo/*as:LZR.HTML.Base.Doe*/, txt/*as:string*/) {
	this.evt.chg.execute (doeo, txt);
};
LZR.HTML.Base.Ctrl.Txt.prototype.onChg.lzrClass_ = LZR.HTML.Base.Ctrl.Txt;

// ---- 移除元素的事件集
LZR.HTML.Base.Ctrl.Txt.prototype.delEvt = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	doeo.delAtt("contenteditable");

	// 删除事件
	doeo.delEvt ("keyup", this.className_);
	doeo.delEvt ("blur", this.className_);
	this.delCb2Dat(doeo, doeo.dat.hct_txt.evt.change, "hdChg");
	this.delCb2Dat(doeo, doeo.dat.hct_txt.evt.change, "onChg");

	// 删除数据
	this.delDat(doeo, "hct_txt");
};
LZR.HTML.Base.Ctrl.Txt.prototype.delEvt.lzrClass_ = LZR.HTML.Base.Ctrl.Txt;

// 处理内容变化事件
LZR.HTML.Base.Ctrl.Txt.prototype.hdChg = function (doeo/*as:LZR.HTML.Base.Doe*/, txt/*as:string*/) {
	doeo.doe.innerHTML = this.txt2Html(txt);
};
LZR.HTML.Base.Ctrl.Txt.prototype.hdChg.lzrClass_ = LZR.HTML.Base.Ctrl.Txt;