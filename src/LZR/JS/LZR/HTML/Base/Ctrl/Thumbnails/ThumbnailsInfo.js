/*************************************************
作者：子牛连
类名：ThumbnailsInfo
说明：缩略图信息
创建日期：09-八月-2016 17:57:42
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base.Ctrl.Thumbnails",
	"LZR.HTML.Base.Doe",
	"LZR.Base.Val.RangeNum",
	"LZR.Base.CallBacks"
], "LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo");
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo = function (obj) {
	// 显示范围内的图片个数
	this.showNum = 1;	/*as:double*/

	// 图片延伸方向大小
	this.size = 100;	/*as:double*/

	// 无图时数据
	this.noimg = null;	/*as:Object*/

	// 图片总数
	this.count = 1;	/*as:int*/

	// 缓存图片数
	this.catchNum = 0;	/*as:int*/

	// 模版
	this.modDoe = null;	/*as:LZR.HTML.Base.Doe*/

	// 是否竖直放置滚动条
	this.vertical = false;	/*as:boolean*/

	// 图片路径集合
	this.imgs = [];	/*as:Array*/

	// 图片路径起始序号
	this.imgsi = 0;	/*as:int*/

	// 固定大小布局
	this.fixedSize = "";	/*as:string*/

	// 是否滚动时是否带动画效果
	this.scrllAnimat = true;	/*as:boolean*/

	// 被选中时的样式
	this.scdCss = "Lc_hct_ThumbnailsBlockScd";	/*as:string*/

	// 布局位置
	this.position/*m*/ = new LZR.Base.Val.RangeNum();	/*as:LZR.Base.Val.RangeNum*/

	// 显示范围
	this.area/*m*/ = new LZR.Base.Val.RangeNum();	/*as:LZR.Base.Val.RangeNum*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.className_ = "LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo";
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo");

// 构造器
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.init_ = function (obj/*as:Object*/) {
	this.area.inLimit = false;
	this.area.isNorm = false;
	this.position.isNorm = false;
	this.area.vcMin.set(0, false);
	this.area.vcMin.evt.before.add(this.area.utLzr.bind(this, this.hdMinBef), "ThumbnailsInfo_hdMinBef");

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}

	this.catchNum = this.normalzeShowNum();
	this.area.vcMax.set(this.showNum, false);
};
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.init_.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo;

// 对构造参数的特殊处理
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.hdObj_.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo;

// 根据序号获取图片路径
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.getImg = function (index/*as:int*/)/*as:string*/ {
	return this.imgs[index - this.imgsi];
};
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.getImg.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo;

// 圆整显示个数
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.normalzeShowNum = function ()/*as:int*/ {
	return Math.ceil(this.showNum) + 1;
};
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.normalzeShowNum.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo;

// 获取图片延伸方向名
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.getImgDir = function ()/*as:string*/ {
	if (this.vertical) {
		return "height";
	} else {
		return "width";
	}
};
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.getImgDir.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo;

// 获取布局方向名
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.getLayoutDir = function ()/*as:string*/ {
	if (this.vertical) {
		return "top";
	} else {
		return "left";
	}
};
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.getLayoutDir.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo;

// 通过图片大小计算显示个数
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.calcShowNumBySize = function (doeo/*as:LZR.HTML.Base.Doe*/)/*as:double*/ {
	doeo.calcPosition();
	return doeo.position[this.getImgDir()] / this.size;
};
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.calcShowNumBySize.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo;

// 通过图片显示个数计算图片大小
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.calcSizeByShowNum = function (doeo/*as:LZR.HTML.Base.Doe*/)/*as:double*/ {
	doeo.calcPosition();
	return doeo.position[this.getImgDir()] / this.showNum;
};
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.calcSizeByShowNum.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo;

// 位置换算数值
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.position2Num = function (doeo/*as:LZR.HTML.Base.Doe*/, position/*as:double*/, reverse/*as:boolean*/)/*as:double*/ {
	if (reverse) {
		return (position - this.area.vcMin.get()) * this.size;
	} else {
		return this.area.vcMin.get() + position / this.size;
	}
};
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.position2Num.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo;

// 创建单个图块
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.crtBlock = function (doeo/*as:LZR.HTML.Base.Doe*/)/*as:LZR.HTML.Base.Doe*/ {
	var d;
	if (this.modDoe) {
		d = this.modDoe.clone();
	} else {
		d = {
			hd_typ: "div",
			hd_css: this.vertical?"Lc_hct_ThumbnailsBlockV":"Lc_hct_ThumbnailsBlock"
		};
		d = new doeo.constructor (d);
	}
	d.setStyle(this.getImgDir(), this.size + "px");
	return d;
};
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.crtBlock.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo;

// 创建图块集合
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.crtBlocks = function (doeo/*as:LZR.HTML.Base.Doe*/)/*as:LZR.HTML.Base.Doe*/ {
	var i;
	doeo.delAll();
	// 前段
	for (i=0; i<this.catchNum; i++) {
		doeo.add(this.crtBlock(doeo), "p" + i);
	}

	// 中段
	for (i=0; i<this.catchNum; i++) {
		doeo.add(this.crtBlock(doeo), "c" + i);
	}

	// 后段
	for (i=0; i<this.catchNum; i++) {
		doeo.add(this.crtBlock(doeo), "n" + i);
	}
};
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.crtBlocks.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo;

// 计算布局位置
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.calcPosition = function ()/*as:double*/ {
	var mm = this.area.vcMin.get();
	var min = Math.floor(mm);

	if (min < this.catchNum) {
		this.position.vcMax.set((min - this.catchNum) * this.size, false);
	} else {
		this.position.vcMax.set(0, false);
	}

	if (this.count - min < this.catchNum * 2) {
		if (this.count - min < this.showNum) {
			this.position.vcMin.set(-this.catchNum * this.size, false);
		} else {
			this.position.vcMin.set((this.showNum - this.count + min - this.catchNum) * this.size, false);
		}
	} else {
		this.position.vcMin.set((this.showNum - 3 * this.catchNum) * this.size, false);
	}

	return this.position.set((min - this.catchNum - mm) * this.size, false);
};
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.calcPosition.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo;

// 重置图片显示个数
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.resizeShowNum = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	var d = doeo.getById("hct_ThumbnailsSlider");

	// 确定 size 大小
	var sd;
	if (d.count) {
		sd = d.subs[0];
	} else {
		sd = crtBlock(d);
		d.add(sd, "sd_test");
	}
	sd.setStyle(this.getImgDir(), this.fixedSize);
	sd.calcPosition();
	this.size = sd.position[this.getImgDir()];

	this.showNum = this.calcShowNumBySize(doeo);
	this.catchNum = this.normalzeShowNum();
	if (d.count !== 3*this.catchNum) {
		this.crtBlocks(d);
	}
	d.setStyle(this.getImgDir(), (this.catchNum * 3 * this.size) + "px");
	d.setStyle(this.getLayoutDir(), this.calcPosition() + "px");
};
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.resizeShowNum.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo;

// 重置图片大小
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.resizeSize = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	var d = doeo.getById("hct_ThumbnailsSlider");
	var oldsize = this.size;
	this.size = this.calcSizeByShowNum(doeo);
	if (d.count === 3*this.catchNum) {
		if (this.size !== oldsize) {
			var sd = d.first;
			while (sd) {
				sd.setStyle(this.getImgDir(), this.size + "px");
				sd = sd.next;
			}
		}
	} else {
		this.crtBlocks(d);
	}
	d.setStyle(this.getImgDir(), (this.catchNum * 3 * this.size) + "px");
	d.setStyle(this.getLayoutDir(), this.calcPosition() + "px");
};
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.resizeSize.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo;

// 重置
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.resize = function (doeo/*as:LZR.HTML.Base.Doe*/) {
	if (this.fixedSize) {
		this.resizeShowNum(doeo);
	} else {
		this.resizeSize(doeo);
	}
};
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.resize.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo;

// 预处理最小值
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.hdMinBef = function (val/*as:Object*/, self/*as:Object*/, old/*as:Object*/, tmpVal/*as:Object*/) {
	if (val > this.count - this.showNum) {
		tmpVal.tmpVal = this.count - this.showNum;
	}
	if (val < 0 || tmpVal.tmpVal < 0) {
		tmpVal.tmpVal = 0;
	}
};
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.hdMinBef.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo;

// 处理最小值变化
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.hdMinChg = function (doeo/*as:LZR.HTML.Base.Doe*/, draw/*as:fun*/, v/*as:Object*/, self/*as:Object*/, old/*as:Object*/) {
	var d = doeo.getById("hct_ThumbnailsSlider");
	if (isNaN(v)) {
		v = this.area.vcMin.get();
	}

	// 动画
	if (this.scrllAnimat && !isNaN(old)) {
		d.setStyle("transition", this.getLayoutDir() + " 0.3s");
		d.setStyle(this.getLayoutDir(), this.position.set((old - v) * this.size + this.position.get()) + "px");
		setTimeout(this.area.utLzr.bind(this, this.hdMinChgDraw, doeo, draw, v, d), 200);
	} else {
		this.hdMinChgDraw(doeo, draw, v, d);
	}
};
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.hdMinChg.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo;

// 处理最小值变化 之 放图片
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.hdMinChgDraw = function (doeo/*as:LZR.HTML.Base.Doe*/, draw/*as:fun*/, v/*as:Object*/, d/*as:LZR.HTML.Base.Doe*/) {
	var dat;
	var i = Math.floor(v) - this.catchNum;
	var cur = this.area.get();

	this.scrllAnimat = true;
	d.setStyle("transition", "");

	// 同步最大值
	this.area.vcMax.set(v + this.showNum, false);

	// 布局调整
	d.setStyle(this.getLayoutDir(), this.calcPosition() + "px");

	// 放图片
	d = d.first;
	while (d) {
		if (i === cur) {
			d.addCss(this.scdCss);
		} else {
			d.delCss(this.scdCss);
		}
		dat = this.getImg(i);
		if (dat) {
			draw(doeo, dat, d, i);
		} else if (this.noimg) {
			draw(doeo, this.noimg, d, i);
		}
		d = d.next;
		i++;
	}
};
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.hdMinChgDraw.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo;

// 处理选中值变化
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.hdScdChg = function (doeo/*as:LZR.HTML.Base.Doe*/, cb/*as:fun*/, v/*as:Object*/, self/*as:Object*/, old/*as:Object*/) {
	var i = Math.floor(this.area.vcMin.get());
	var o;

	// 删除原来的被选中样式
	o = old - i;
	if (o >= -this.catchNum) {
		if (o<0) {
			o = "p" + (o + this.catchNum);
		} else if (o<this.catchNum) {
			o = "c" + o;
		} else if (o<2*this.catchNum) {
			o = "n" + (o - this.catchNum);
		} else {
			o = false;
		}
		if (o) {
			doeo.getById(o).delCss(this.scdCss);
		}
	}

	// 添加新的被选中样式
	o = v - i;
	if (o >= -this.catchNum) {
		if (o<0) {
			o = "p" + (o + this.catchNum);
		} else if (o<this.catchNum) {
			o = "c" + o;
		} else if (o<2*this.catchNum) {
			o = "n" + (o - this.catchNum);
		} else {
			o = false;
		}
		if (o) {
			doeo.getById(o).addCss(this.scdCss);
		}
	}

	// 重设 min 位置
/*
		// 解决 showNum 小于 1  的问题 （showNum 小于 1 本身就有问题）
		if (this.showNum > 2) {
			o = v - Math.floor((this.showNum - 1)/2);
		} else {
			o = v;
		}
*/
	o = v - Math.floor((this.showNum - 1)/2);
	this.area.vcMin.set(o);

	// 触发回调函数
	cb (doeo, this.getImg(i), doeo.getById("c" + (v-o)), v, old);
};
LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo.prototype.hdScdChg.lzrClass_ = LZR.HTML.Base.Ctrl.Thumbnails.ThumbnailsInfo;
