/*************************************************
作者：子牛连
类名：DomTool
说明：元素工具
创建日期：27-七月-2016 12:30:03
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Util",
	"LZR.HTML.Util.DomPosition"
], "LZR.HTML.Util.DomTool");
LZR.HTML.Util.DomTool = function (obj) {
	// 元素位置类
	this.clsDoePosition/*m*/ = (LZR.HTML.Util.DomPosition);	/*as:fun*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Util.DomTool.prototype.className_ = "LZR.HTML.Util.DomTool";
LZR.HTML.Util.DomTool.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Util.DomTool");

// 构造器
LZR.HTML.Util.DomTool.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.HTML.Util.DomTool.prototype.init_.lzrClass_ = LZR.HTML.Util.DomTool;

// 对构造参数的特殊处理
LZR.HTML.Util.DomTool.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.HTML.Util.DomTool.prototype.hdObj_.lzrClass_ = LZR.HTML.Util.DomTool;

// 设置DOM元素属性
LZR.HTML.Util.DomTool.prototype.setAtt = function (key/*as:string*/, val/*as:string*/, doe/*as:Object*/) {
	doe.setAttribute(key, val);
};
LZR.HTML.Util.DomTool.prototype.setAtt.lzrClass_ = LZR.HTML.Util.DomTool;

// 获取DOM元素属性
LZR.HTML.Util.DomTool.prototype.getAtt = function (key/*as:string*/, doe/*as:Object*/)/*as:string*/ {
	return doe.getAttribute(key);
};
LZR.HTML.Util.DomTool.prototype.getAtt.lzrClass_ = LZR.HTML.Util.DomTool;

// 删除DOM元素属性
LZR.HTML.Util.DomTool.prototype.delAtt = function (key/*as:string*/, doe/*as:Object*/) {
	doe.removeAttribute(key);
};
LZR.HTML.Util.DomTool.prototype.delAtt.lzrClass_ = LZR.HTML.Util.DomTool;

// 处理样式名
LZR.HTML.Util.DomTool.prototype.calcStyleNam = function (key/*as:int*/, lower/*as:boolean*/)/*as:string*/ {
	if (lower) {
		return key.replace(/[A-Z]/g, function(all, letter){
			// console.log ("all : " + all);
			// console.log ("leter : " + letter);
			return "-" + all.toLowerCase();
		});
	} else {
		return key.replace(/\-(\w)/g, function(all, letter){
			// console.log ("all : " + all);
			// console.log ("leter : " + letter);
			return letter.toUpperCase();
		});
	}
};
LZR.HTML.Util.DomTool.prototype.calcStyleNam.lzrClass_ = LZR.HTML.Util.DomTool;

// 设置DOM元素的Styley样式
LZR.HTML.Util.DomTool.prototype.setStyle = function (key/*as:string*/, val/*as:string*/, doe/*as:Object*/) {
	doe.style[this.calcStyleNam(key)] = val;
};
LZR.HTML.Util.DomTool.prototype.setStyle.lzrClass_ = LZR.HTML.Util.DomTool;

// 获取DOM元素的Styley样式
LZR.HTML.Util.DomTool.prototype.getStyle = function (key/*as:string*/, doe/*as:Object*/)/*as:string*/ {
	if ("\v" == "v") {
		//简单判断ie6~8
		key = this.calcStyleNam(key);
		if(key === "backgroundPosition"){
			//IE6~8不兼容backgroundPosition写法，识别backgroundPositionX/Y
			return doe.currentStyle.backgroundPositionX + " " + doe.currentStyle.backgroundPositionY;
		}
		return doe.currentStyle[key];
	}else{
		return this.getDocument(doe).defaultView.getComputedStyle(doe, null).getPropertyValue(this.calcStyleNam(key, true));
	}
};
LZR.HTML.Util.DomTool.prototype.getStyle.lzrClass_ = LZR.HTML.Util.DomTool;

// 计算位置
LZR.HTML.Util.DomTool.prototype.calcPosition = function (doe/*as:Object*/)/*as:Object*/ {
	var d, dm, box;
	var r = new this.clsDoePosition();

	if (doe === document) {
		r.left = 0;
		r.top = 0;
		r.width = window.innerWidth;
		r.height = window.innerHeight;
	} else {
		dm = this.getDocument(doe);
		box = doe.getBoundingClientRect();
		r.width = box.right - box.left;
		r.height = box.bottom - box.top;
		if (window.pageXOffset !== undefined) {
			d = dm.documentElement;
			r.left = box.left - d.clientLeft + window.pageXOffset;
			r.top = box.top - d.clientTop + window.pageYOffset;
		} else {
			// IE 浏览器
			d = dm.body;
			r.left = box.left - d.clientLeft + (d.scrollLeft || dm.documentElement.scrollLeft);
			r.top = box.top - d.clientTop + (d.scrollTop || dm.documentElement.scrollTop);
		}
	}

	return r;
};
LZR.HTML.Util.DomTool.prototype.calcPosition.lzrClass_ = LZR.HTML.Util.DomTool;

// 在父元素中滚动条定位
LZR.HTML.Util.DomTool.prototype.matchParent = function (vertical/*as:string*/, horizontal/*as:string*/, padding/*as:int*/, doe/*as:Object*/) {
	var p, t, c, d, s;
	if (!padding) {
		padding = 0;
	}
	p = doe.parentNode;	// 父元素

	if (p) {
		t = this.getStyle("position", p);		// 定位类型

		// 垂直调整
		if (vertical) {
			c = p.clientHeight;		// 父元素当前长度
			d = doe.offsetHeight;		// 子元素当前长度
			s = doe.offsetTop;		// 子元素相对于父元素的位置
			if (t === "static") {
				s -= p.offsetTop + p.clientTop;
			}
			switch (vertical) {
				case "T":	// 靠上
				case "t":
					p.scrollTop = s - padding;
					break;
				case "C":	// 居中
				case "c":
					p.scrollTop = s + d/2 - c/2;
					break;
				case "B":	// 靠下
				case "b":
					p.scrollTop = s + d + padding - c;
					break;
			}
		}

		// 横向调整
		if (horizontal) {
			c = p.clientWidth;		// 父元素当前长度
			d = doe.offsetWidth;		// 子元素当前长度
			s = doe.offsetLeft;		// 子元素相对于父元素的位置
			if (t === "static") {
				s -= p.offsetLeft + p.clientLeft;
			}
			switch (horizontal) {
				case "L":	// 靠左
				case "l":
					p.scrollLeft = s - padding;
					break;
				case "C":	// 居中
				case "c":
					p.scrollLeft = s + d/2 - c/2;
					break;
				case "R":	// 靠右
				case "r":
					p.scrollLeft = s + d + padding - c;
					break;
			}
		}
	}
};
LZR.HTML.Util.DomTool.prototype.matchParent.lzrClass_ = LZR.HTML.Util.DomTool;

// 获取文档
LZR.HTML.Util.DomTool.prototype.getDocument = function (doe/*as:Object*/)/*as:Object*/ {
	return doe.ownerDocument || document;
};
LZR.HTML.Util.DomTool.prototype.getDocument.lzrClass_ = LZR.HTML.Util.DomTool;