/*************************************************
作者：子牛连
类名：Position
说明：位置
创建日期：11-三月-2016 14:03:18
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Util"
], "LZR.HTML.Util.Position");
LZR.HTML.Util.Position = function (obj) {
	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Util.Position.prototype.className_ = "LZR.HTML.Util.Position";
LZR.HTML.Util.Position.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Util.Position");

// 构造器
LZR.HTML.Util.Position.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.HTML.Util.Position.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};

// 获取DOM元素在document中的位置
LZR.HTML.Util.Position.prototype.getPositionInDocument = function (doe/*as:Object*/)/*as:Object*/ {
	if (!dom) {
		dom = this.dom;
	}

	var p = {
		left:0,
		top:0,
		width:0,
		height:0
	};

	if (obj === document) {
		p.left = 0;
		p.top = 0;
		p.width = window.innerWidth;
		p.height = window.innerHeight;
	} else {
		var d, box = obj.getBoundingClientRect();
		p.width = box.right - box.left;
		p.height = box.bottom - box.top;
		if (window.pageXOffset !== undefined) {
			d = obj.ownerDocument.documentElement;
			p.left = box.left - d.clientLeft + window.pageXOffset;
			p.top = box.top - d.clientTop + window.pageYOffset;
		} else {
			// IE 濞村繗顫嶉崳?
			d = obj.ownerDocument.body;
			p.left = box.left - d.clientLeft + (d.scrollLeft || obj.ownerDocument.documentElement.scrollLeft);
			p.top = box.top - d.clientTop + (d.scrollTop || obj.ownerDocument.documentElement.scrollTop);
		}
	}

	return p;
};
