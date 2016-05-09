/*************************************************
作者：子牛连
类名：Txt
说明：文本控制器
创建日期：09-五月-2016 12:54:28
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base.Ctrl",
	"LZR.HTML.Base.Doe",
	"LZR.Base.CallBacks"
], "LZR.HTML.Base.Ctrl.Txt");
LZR.HTML.Base.Ctrl.Txt = function (obj) /*bases:LZR.HTML.Base.Ctrl*/ {
	LZR.initSuper(this, obj);

	// 是否可换行
	this.single = true;	/*as:boolean*/

					// 内容改变
					this.evt.chg/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 内容改变
	this.evt.chg/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

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

// 文本处理
LZR.HTML.Base.Ctrl.Txt.prototype.hdTxt = function (html/*as:string*/)/*as:string*/ {
	var r;
// console.log (html);
	r = html.replace(/^<(div|p)>|<(br|\/p|\/div)>/g, "");
	r = r.replace(/<(div|p)>/g, "\n");
	return r;
};

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

// 处理失去焦点事件
LZR.HTML.Base.Ctrl.Txt.prototype.hdBlur = function (doeo/*as:LZR.HTML.Base.Doe*/, e/*as:Object*/) {
	var t = this.hdTxt(doeo.doe.innerHTML);
	if (this.single) {
		// 获取出现回车符之前部分的文字
		t = t.match(/.*/)[0];
		doeo.doe.innerHTML = t;
	} else{
		var s = "<div>" + t.replace(/\n/g, "</div><div>") + "</div>";
		doeo.doe.innerHTML = s.replace(/<div><\/div>/g, "<div><br></div>");
	}

	if (doeo.dat.hct_txt !== t) {
		doeo.dat.hct_txt = t;
		this.onChg(doeo, t);
	}
};

// 内容变化时的触发事件
LZR.HTML.Base.Ctrl.Txt.prototype.onChg = function (doeo/*as:LZR.HTML.Base.Doe*/, txt/*as:string*/) {
	this.evt.chg.execute (doeo, txt);
};

// 给元素添加事件集
LZR.HTML.Base.Ctrl.Txt.prototype.addEvt = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	// 添加数据 历史文本内容 hct_txt
	if (!doeo.dat) {
		doeo.dat = {};
	}
	doeo.dat.hct_txt = "";
	doeo.doe.innerHTML = "";

	doeo.setAtt("contenteditable", "true");
	doeo.addEvt ("keyup", this.utLzr.bind(this, this.hdKeyUp, doeo), this.className_);
	doeo.addEvt ("blur", this.utLzr.bind(this, this.hdBlur, doeo), this.className_);
};

// 移除元素的事件集
LZR.HTML.Base.Ctrl.Txt.prototype.delEvt = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	// 删除数据 历史文本内容 hct_txt
	LZR.del (doeo.dat, "hct_txt");

	doeo.setAtt("contenteditable", "");
	doeo.delEvt ("keyup", this.className_);
	doeo.delEvt ("blur", this.className_);
};
