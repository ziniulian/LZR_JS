/*************************************************
作者：子牛连
类名：SortQry
说明：聚合排序分页
创建日期：11-四月-2019 11:37:31
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Srv"
], "LZR.HTML.Srv.SortQry");
LZR.HTML.Srv.SortQry = function (obj) {
	// 原数据
	this.sr = [];	/*as:Array*/

	// 字段顺序
	this.cs = [];	/*as:Array*/

	// 每页显示个数
	this.size = 20;	/*as:int*/

	// 页数
	this.pag = 0;	/*as:int*/

	// 排序
	this.f = false;	/*as:boolean*/

	// 显示模式
	this.vis = 1;	/*as:int*/

	// 缓存
	this.tmp = [];	/*as:Array*/

	// 表格容器
	this.doe = null;	/*as:Object*/

	// 列表容器
	this.listDoe = null;	/*as:Object*/

	// 搜索框容器
	this.qryDoe = null;	/*as:Object*/

	// 上部页码容器
	this.pagNumTopDoe = null;	/*as:Object*/

	// 下部页码容器
	this.pagNumBotDoe = null;	/*as:Object*/

	// 选中的样式
	this.scdCss = "scd";	/*as:string*/

	// 页码容器的样式
	this.pagCss = "pag";	/*as:string*/

	// 本名
	this.selfNam = "";	/*as:string*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Srv.SortQry.prototype.className_ = "LZR.HTML.Srv.SortQry";
LZR.HTML.Srv.SortQry.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Srv.SortQry");

// 构造器
LZR.HTML.Srv.SortQry.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.HTML.Srv.SortQry.prototype.init_.lzrClass_ = LZR.HTML.Srv.SortQry;

// 对构造参数的特殊处理
LZR.HTML.Srv.SortQry.prototype.hdObj_ = function (obj/*as:Object*/) {
	if (obj.qryDoe) {
		obj.qryDoe.onchange = LZR.bind(this, this.qry);
	}
};
LZR.HTML.Srv.SortQry.prototype.hdObj_.lzrClass_ = LZR.HTML.Srv.SortQry;

// 创建表头
LZR.HTML.Srv.SortQry.prototype.crtHead = function () {
	var i, r, d, a;
	r = document.createElement("tr");
	d = document.createElement("th");
	d.innerHTML = "排名";
	r.appendChild(d);

	this.addHead(r);

	d = document.createElement("th");
	a = document.createElement("a");
	a.href = "javascript: " + this.selfNam + ".setVis();";
	switch (this.vis) {
		case 1:
			a.innerHTML = "&nbsp&nbsp遮&nbsp罩&nbsp&nbsp";
			break;
		case 2:
			a.innerHTML = "&nbsp&nbsp全&nbsp部&nbsp&nbsp";
			break;
	}
	d.appendChild(a);
	r.appendChild(d);

	for (i = 0; i < this.cs.length; i ++) {
		d = document.createElement("th");
		a = document.createElement("a");
		a.innerHTML = this.cs[i][1];
		if (i === 0) {
			a.className = this.scdCss;
			a.href = "javascript: " + this.selfNam + ".sort(" + i + ", 1);";
		} else {
			a.href = "javascript: " + this.selfNam + ".sort(" + i + ");";
		}
		d.appendChild(a);
		r.appendChild(d);
	}

	this.doe.appendChild(r);
};
LZR.HTML.Srv.SortQry.prototype.crtHead.lzrClass_ = LZR.HTML.Srv.SortQry;

// 表头补充
LZR.HTML.Srv.SortQry.prototype.addHead = function (doe/*as:Object*/) {
	var d = document.createElement("th");
	d.innerHTML = "&nbsp;&nbsp;代&nbsp;&nbsp;&nbsp;码&nbsp;&nbsp;";
	doe.appendChild(d);
};
LZR.HTML.Srv.SortQry.prototype.addHead.lzrClass_ = LZR.HTML.Srv.SortQry;

// 创建行
LZR.HTML.Srv.SortQry.prototype.crtRow = function (o/*as:Object*/) {
	var i, r, d, a;
	r = document.createElement("tr");
	d = document.createElement("td");
	d.innerHTML = o.i;
	r.appendChild(d);

	this.addRow(o, r);

	d = document.createElement("td");
	a = document.createElement("a");
	a.href = "javascript: " + this.selfNam + ".setScd(" + (o.i - 1) + ");";
	a.innerHTML = o.nam;
	a.className = o.scd ? this.scdCss : "";
	d.appendChild(a);
	r.appendChild(d);

	for (i = 0; i < this.cs.length; i ++) {
		d = document.createElement("td");
		d.innerHTML = o[this.cs[i][0]];
		r.appendChild(d);
	}
	this.doe.appendChild(r);
};
LZR.HTML.Srv.SortQry.prototype.crtRow.lzrClass_ = LZR.HTML.Srv.SortQry;

// 行补充
LZR.HTML.Srv.SortQry.prototype.addRow = function (o/*as:Object*/, doe/*as:Object*/) {
	var d = document.createElement("td");
	d.innerHTML = o.id;
	doe.appendChild(d);
};
LZR.HTML.Srv.SortQry.prototype.addRow.lzrClass_ = LZR.HTML.Srv.SortQry;

// 创建页码
LZR.HTML.Srv.SortQry.prototype.crtPagNum = function (doe/*as:Object*/, hasPre/*as:boolean*/, hasNext/*as:boolean*/) {
	var r, d, a;
	doe.innerHTML = "";
	d = document.createElement("div");
	d.className = this.pagCss;
	if (hasPre) {
		a = document.createElement("a");
		a.href = "javascript: " + this.selfNam + ".firstPag();";
		a.innerHTML = "第一页";
		d.appendChild(a);
	}
	doe.appendChild(d);

	d = document.createElement("div");
	d.className = this.pagCss;
	if (hasPre) {
		a = document.createElement("a");
		a.href = "javascript: " + this.selfNam + ".prePag();";
		a.innerHTML = "上一页";
		d.appendChild(a);
	}
	doe.appendChild(d);

	d = document.createElement("div");
	d.className = this.pagCss;
	d.innerHTML = (this.pag + 1) + " / " + Math.ceil(this.tmp.length / this.size) + " (" + this.tmp.length + ")";
	doe.appendChild(d);

	d = document.createElement("div");
	d.className = this.pagCss;
	if (hasNext) {
		a = document.createElement("a");
		a.href = "javascript: " + this.selfNam + ".nextPag();";
		a.innerHTML = "下一页";
		d.appendChild(a);
	}
	doe.appendChild(d);
};
LZR.HTML.Srv.SortQry.prototype.crtPagNum.lzrClass_ = LZR.HTML.Srv.SortQry;

// 刷新页面
LZR.HTML.Srv.SortQry.prototype.flush = function () {
	var i, j, n, p;
	i = this.size * this.pag;
	n = this.size + i;
	this.doe.innerHTML = "";
	this.crtHead();		/* 创建表头 */

	if (i < this.tmp.length) {
		p = i;
		this.crtPagNum(this.pagNumTopDoe, p, (n < this.tmp.length));	/* 生成页码 */
		for (; (i < n) && (i < this.tmp.length); i ++) {
			this.crtRow(this.tmp[i]);
		}
		this.crtPagNum(this.pagNumBotDoe, p, (n < this.tmp.length));	/* 生成页码 */
	}
};
LZR.HTML.Srv.SortQry.prototype.flush.lzrClass_ = LZR.HTML.Srv.SortQry;

// 排序
LZR.HTML.Srv.SortQry.prototype.sort = function (k/*as:string*/, f/*as:boolean*/, noflush/*as:boolean*/) {
	var i, j;
	if (k) {
		this.cs.unshift(this.cs.splice(k, 1)[0]);
		this.f = this.cs[0][2];
	} else if (f) {
		this.f = !this.f;
	}
	k = this.cs[0][0];

	this.tmp.length = 0;
	this.listDoe.innerHTML = "";
	for (i = this.sr.length - 1; i > 0; i --) {
		for (j = i - 1; j >= 0; j --) {
			if (this.f === ((this.sr[i][k] - this.sr[j][k]) ? (this.sr[i][k] - this.sr[j][k] > 0) : (this.sr[i][k] > this.sr[j][k]))) {
				t = this.sr[i];
				this.sr[i] = this.sr[j];
				this.sr[j] = t;
			}
		}
		this.add(i);
	}
	this.add(i);

	if (!noflush) {
		this.firstPag();
	}
};
LZR.HTML.Srv.SortQry.prototype.sort.lzrClass_ = LZR.HTML.Srv.SortQry;

// 加入缓存
LZR.HTML.Srv.SortQry.prototype.add = function (i/*as:int*/) {
	var d;
	this.sr[i].i = i + 1;
	if ((this.vis === 1) || (this.vis === 2 && this.sr[i].scd) || (this.vis === 3 && !this.sr[i].scd)) {
		this.tmp.unshift(this.sr[i]);
		d = document.createElement("option");
		d.value = this.crtKey(i);
		this.listDoe.appendChild(d);
	}
};
LZR.HTML.Srv.SortQry.prototype.add.lzrClass_ = LZR.HTML.Srv.SortQry;

// 创建关键字
LZR.HTML.Srv.SortQry.prototype.crtKey = function (i/*as:int*/)/*as:string*/ {
	var o = this.sr[i];
	var r = o.id + "," + o.nam + "," + (i + 1);
	if (o.abb) {
		r += "," + o.abb;
	}
	return r;
};
LZR.HTML.Srv.SortQry.prototype.crtKey.lzrClass_ = LZR.HTML.Srv.SortQry;

// 切换显示模式
LZR.HTML.Srv.SortQry.prototype.setVis = function () {
	this.vis ++;
	if (this.vis > 2) {
		this.vis = 1;
	}
	this.sort(0);
};
LZR.HTML.Srv.SortQry.prototype.setVis.lzrClass_ = LZR.HTML.Srv.SortQry;

// 选项选择
LZR.HTML.Srv.SortQry.prototype.setScd = function (i/*as:int*/) {
	this.sr[i].scd = !this.sr[i].scd;
	this.flush();
};
LZR.HTML.Srv.SortQry.prototype.setScd.lzrClass_ = LZR.HTML.Srv.SortQry;

// 第一页
LZR.HTML.Srv.SortQry.prototype.firstPag = function () {
	this.pag = 0;
	this.flush();
};
LZR.HTML.Srv.SortQry.prototype.firstPag.lzrClass_ = LZR.HTML.Srv.SortQry;

// 下一页
LZR.HTML.Srv.SortQry.prototype.nextPag = function () {
	this.pag ++;
	this.flush();
};
LZR.HTML.Srv.SortQry.prototype.nextPag.lzrClass_ = LZR.HTML.Srv.SortQry;

// 上一页
LZR.HTML.Srv.SortQry.prototype.prePag = function () {
	this.pag --;
	this.flush();
};
LZR.HTML.Srv.SortQry.prototype.prePag.lzrClass_ = LZR.HTML.Srv.SortQry;

// 查询
LZR.HTML.Srv.SortQry.prototype.qry = function () {
	var p = Math.ceil(this.qryDoe.value.split(",")[2] / this.size) - 1;
	this.qryDoe.value = "";
	if (p) {
		this.pag = p;
		this.flush();
	}
};
LZR.HTML.Srv.SortQry.prototype.qry.lzrClass_ = LZR.HTML.Srv.SortQry;
