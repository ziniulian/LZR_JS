/*************************************************
作者：子牛连
类名：Css
说明：样式
创建日期：11-三月-2016 17:39:23
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base.Doe",
	"LZR.HTML.Base.Doe.Css",
	"LZR.Base.Data"
], "LZR.HTML.Base.Doe.Css");
LZR.HTML.Base.Doe.Css = function (obj) /*bases:LZR.Base.Data*/ {
	LZR.initSuper(this);

	// CSS样式名
	this.name = "";	/*as:string*/

	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Base.Doe.Css.prototype = LZR.clone (LZR.Base.Data.prototype, LZR.HTML.Base.Doe.Css.prototype);
LZR.HTML.Base.Doe.Css.prototype.super_ = [LZR.Base.Data];
LZR.HTML.Base.Doe.Css.prototype.className_ = "LZR.HTML.Base.Doe.Css";
LZR.HTML.Base.Doe.Css.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.Doe.Css");

// 构造器
LZR.HTML.Base.Doe.Css.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
		// 不对 chd_ 做递归创建
	}
};

// 对构造参数的特殊处理
LZR.HTML.Base.Doe.Css.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};

// 解析样式
LZR.HTML.Base.Doe.Css.parse = function (doe/*as:Object*/)/*as:LZR.HTML.Base.Doe.Css*/ {
	var r = new this();
	var s = doe.className;
	if (!s && (typeof(doe) === "string")) {
		s = doe;
	}
	if (s) {
		s = s.split(" ");
		for (var i=0; i<s.length; i++) {
			if (s[i]) {
				r.add(s[i]);
			}
		}
	}
	return r;
};

// 添加样式
LZR.HTML.Base.Doe.Css.addCss = function (doe/*as:Object*/, name/*as:string*/) {
	var r = this.parse(doe);
	r.add(name);
	r.flush(doe);
};

// 删除样式
LZR.HTML.Base.Doe.Css.delCss = function (doe/*as:Object*/, name/*as:string*/) {
	var r = this.parse(doe);
	r.del(name);
	r.flush(doe);
};

// 刷新样式
LZR.HTML.Base.Doe.Css.prototype.flush = function (doe/*as:Object*/) {
	doe.className = this.print();
};

// ---- 添加
LZR.HTML.Base.Doe.Css.prototype.add = function (name/*as:string*/)/*as:boolean*/ {
	var css;
	switch (LZR.getClassName(name)) {
		case "string":
			css = new this.constructor({
				id: name,
				name: name
			});
			break;
		case this.className_:
			css = name;
			break;
		default:
			css = new this.constructor(name);
			break;
	}
	return this.super_[0].prototype.add.call(this, css);
};

// ---- 输出
LZR.HTML.Base.Doe.Css.prototype.print = function ()/*as:string*/ {
	var r = this.name;
	for (var s in this.subs) {
		if (r) {
			r += " ";
		}
		r += this.subs[s].print();
	}
	return r;
};
