/*************************************************
作者：子牛连
类名：ComDbQry
说明：通用数据库分页
创建日期：27-二月-2018 10:59:11
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Srv",
	"LZR.HTML.Base.Ajax",
	"LZR.Base.InfEvt",
	"LZR.Base.CallBacks",
	"LZR.HTML.Util.DomTool",
	"LZR.Base.Json"
], "LZR.HTML.Srv.ComDbQry");
LZR.HTML.Srv.ComDbQry = function (obj) /*interfaces:LZR.Base.InfEvt*/ {
	LZR.Base.InfEvt.call(this);

	// 状态
	this.busy = false;	/*as:string*/

	// 是否前翻
	this.prePg = false;	/*as:boolean*/

	// 是否自定义执行
	this.custExe = false;	/*as:boolean*/

	// 当前位置
	this.pgd = null;	/*as:Object*/

	// 下页位置
	this.pgn = null;	/*as:Object*/

	// 分页个数
	this.pgs = 10;	/*as:int*/

	// 属性名
	this.keyNam = "";	/*as:string*/

	// 缓冲页
	this.mark = {
			doe: null,
			showCss: "mark",
			hidCss: "Lc_nosee"
		};	/*as:Object*/

	// 按钮
	this.btn = {
			preNam: "preDom",
			nextNam: "nextDom",
			showCss: "",
			hidCss: "Lc_hid"
		};	/*as:Object*/

	// 排序
	this.sort = 1;	/*as:int*/

	// 服务地址
	this.url = {
			add: "",
			del: "",
			set: "",
			meg: "",
			qry: ""
		};	/*as:Object*/

	// 添加成功后的刷新位置
	this.addTmp = null;	/*as:Object*/

	// 查询条件
	this.cond = null;	/*as:Object*/

	// 查询工具
	this.qryajx/*m*/ = new LZR.HTML.Base.Ajax();	/*as:LZR.HTML.Base.Ajax*/

	// 查询应答
	this.evt.qryr/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 查询预处理
	this.evt.qryb/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// 元素工具
	this.utDomTool/*m*/ = LZR.getSingleton(LZR.HTML.Util.DomTool);	/*as:LZR.HTML.Util.DomTool*/

	// 执行工具
	this.exeajx/*m*/ = new LZR.HTML.Base.Ajax();	/*as:LZR.HTML.Base.Ajax*/

	// 执行应答
	this.evt.exer/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/

	// Json工具
	this.utJson/*m*/ = LZR.getSingleton(LZR.Base.Json);	/*as:LZR.Base.Json*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.HTML.Srv.ComDbQry.prototype = LZR.clone (LZR.Base.InfEvt.prototype, LZR.HTML.Srv.ComDbQry.prototype);
LZR.HTML.Srv.ComDbQry.prototype.className_ = "LZR.HTML.Srv.ComDbQry";
LZR.HTML.Srv.ComDbQry.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Srv.ComDbQry");

// 构造器
LZR.HTML.Srv.ComDbQry.prototype.init_ = function (obj/*as:Object*/) {
	this.qryajx.evt.rsp.add(LZR.bind(this, this.hdqry));
	this.exeajx.evt.rsp.add(LZR.bind(this, this.hdexe));

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.HTML.Srv.ComDbQry.prototype.init_.lzrClass_ = LZR.HTML.Srv.ComDbQry;

// 对构造参数的特殊处理
LZR.HTML.Srv.ComDbQry.prototype.hdObj_ = function (obj/*as:Object*/) {

};
LZR.HTML.Srv.ComDbQry.prototype.hdObj_.lzrClass_ = LZR.HTML.Srv.ComDbQry;

// 显示缓冲页
LZR.HTML.Srv.ComDbQry.prototype.showMark = function (show/*as:string*/) {
	if (show) {
		this.mark.doe.className = this.mark.showCss;
	} else {
		if (this.busy) {
			this.qryajx.abort();
			this.exeajx.abort();
		}
		this.mark.doe.className = this.mark.hidCss;
	}
	this.busy = show;
};
LZR.HTML.Srv.ComDbQry.prototype.showMark.lzrClass_ = LZR.HTML.Srv.ComDbQry;

// 查询
LZR.HTML.Srv.ComDbQry.prototype.qry = function () {
	if (!this.busy) {
		this.showMark("qry");
		this.cond = {
			size: this.prePg ? (this.pgs + 1) : this.pgs,
			sort: this.prePg ? -this.sort : this.sort
		};
		if (this.pgd !== null) {
			this.cond[this.keyNam] = this.pgd;
		}
		this.onQryb(this.cond);
		this.qryajx.post(this.url.qry, this.cond, null, true);
	}
};
LZR.HTML.Srv.ComDbQry.prototype.qry.lzrClass_ = LZR.HTML.Srv.ComDbQry;

// 查询回调
LZR.HTML.Srv.ComDbQry.prototype.hdqry = function (txt/*as:string*/, sta/*as:int*/) {
	var d, o;
	if (sta === 200) {
		d = this.utJson.toObj(txt);
		if (d.ok) {
			o = d.dat;
			if (this.prePg) {
				if (o.length > this.pgs) {
					this.prePg = false;
					if (o.length === this.pgs + 1) {
						this.pgd = null;
					} else {
						o.pop();
						this.pgd = o[this.pgs][this.keyNam];
					}
					o.reverse();
					this.pgn = o[this.pgs][this.keyNam];
					o.pop();
				} else {
					this.busy = false;
					this.first();
					return;
				}
			} else {
				if (o.length > this.pgs) {
					this.pgn = o[this.pgs][this.keyNam];
					o.pop();
				} else {
					this.pgn = null;
				}
			}
			this.onQryr(o);
		} else if (this.pgd) {
			this.busy = false;
			if (this.prePg) {
				this.first();
			} else {
				this.pre();
			}
			return;
		}
	}

	this.showBtn ("preNam", this.pgd);
	this.showBtn ("nextNam", this.pgn);

	this.showMark(false);
};
LZR.HTML.Srv.ComDbQry.prototype.hdqry.lzrClass_ = LZR.HTML.Srv.ComDbQry;

// 设置按钮
LZR.HTML.Srv.ComDbQry.prototype.showBtn = function (nam/*as:string*/, b/*as:boolean*/) {
	var o = this.btn[nam];
	if (o) {
		if (b) {
			this.utDomTool.setProByNam(this.btn[nam], "className", this.btn.showCss);
		} else {
			this.utDomTool.setProByNam(this.btn[nam], "className", this.btn.hidCss);
		}
	}
};
LZR.HTML.Srv.ComDbQry.prototype.showBtn.lzrClass_ = LZR.HTML.Srv.ComDbQry;

// 第一页
LZR.HTML.Srv.ComDbQry.prototype.first = function (v/*as:Object*/) {
	this.prePg = false;
	if (v !== undefined) {
		this.pgd = v;
	} else {
		this.pgd = null;
	}
	this.pgn = null;
	this.qry();
};
LZR.HTML.Srv.ComDbQry.prototype.first.lzrClass_ = LZR.HTML.Srv.ComDbQry;

// 下一页
LZR.HTML.Srv.ComDbQry.prototype.next = function () {
	if (this.pgn !== null) {
		this.prePg = false;
		this.pgd = this.pgn;
		this.pgn = null;
		this.qry();
	}
};
LZR.HTML.Srv.ComDbQry.prototype.next.lzrClass_ = LZR.HTML.Srv.ComDbQry;

// 上一页
LZR.HTML.Srv.ComDbQry.prototype.pre = function () {
	if (this.pgd !== null) {
		this.prePg = true;
		this.pgn = null;
		this.qry();
	}
};
LZR.HTML.Srv.ComDbQry.prototype.pre.lzrClass_ = LZR.HTML.Srv.ComDbQry;

// 执行回调
LZR.HTML.Srv.ComDbQry.prototype.hdexe = function (txt/*as:string*/, sta/*as:int*/) {
	var d;
	if (sta === 200) {
		d = this.utJson.toObj(txt);
		this.onExer(this.busy, d);
		if (this.custExe === false && d.ok && this.busy !== "count") {
			// if (this.addTmp !== null && this.busy === "add") {
			if (this.addTmp !== null && d.msg === "add") {
				this.pgd = this.addTmp;
				this.addTmp = null;
			}
			this.busy = false;
			this.qry();
			return;
		}
	}

	this.addTmp = null;
	if (!d || this.custExe === false) {
		this.showMark(false);
	}
};
LZR.HTML.Srv.ComDbQry.prototype.hdexe.lzrClass_ = LZR.HTML.Srv.ComDbQry;

// 新增
LZR.HTML.Srv.ComDbQry.prototype.add = function (co/*as:Object*/, d/*as:Object*/) {
	if (!this.busy) {
		this.showMark("add");
		if (d !== undefined) {
			this.addTmp = d;
		}
		this.exeajx.post(this.url.add, co, null, true);
	}
};
LZR.HTML.Srv.ComDbQry.prototype.add.lzrClass_ = LZR.HTML.Srv.ComDbQry;

// 合并
LZR.HTML.Srv.ComDbQry.prototype.meg = function (co/*as:Object*/, d/*as:Object*/) {
	if (!this.busy) {
		this.showMark("meg");
		if (d !== undefined) {
			this.addTmp = d;
		}
		this.exeajx.post(this.url.meg, co, null, true);
	}
};
LZR.HTML.Srv.ComDbQry.prototype.meg.lzrClass_ = LZR.HTML.Srv.ComDbQry;

// 修改
LZR.HTML.Srv.ComDbQry.prototype.set = function (co/*as:Object*/) {
	if (!this.busy) {
		this.showMark("set");
		this.exeajx.post(this.url.set, co, null, true);
	}
};
LZR.HTML.Srv.ComDbQry.prototype.set.lzrClass_ = LZR.HTML.Srv.ComDbQry;

// 删除
LZR.HTML.Srv.ComDbQry.prototype.del = function (co/*as:Object*/) {
	if (!this.busy) {
		this.showMark("del");
		this.exeajx.post(this.url.del, co, null, true);
	}
};
LZR.HTML.Srv.ComDbQry.prototype.del.lzrClass_ = LZR.HTML.Srv.ComDbQry;

// 查询总数
LZR.HTML.Srv.ComDbQry.prototype.count = function () {
	if (!this.busy) {
		this.showMark("count");
		this.cond = { size: -1 };
		this.onQryb(this.cond);
		this.exeajx.post(this.url.qry, this.cond, null, true);
	}
};
LZR.HTML.Srv.ComDbQry.prototype.count.lzrClass_ = LZR.HTML.Srv.ComDbQry;

// 查询式删除
LZR.HTML.Srv.ComDbQry.prototype.qrydel = function () {
	if (!this.busy) {
		this.showMark("qrydel");
		this.cond = { size: -2 };
		this.onQryb(this.cond);
		this.exeajx.post(this.url.qry, this.cond, null, true);
	}
};
LZR.HTML.Srv.ComDbQry.prototype.qrydel.lzrClass_ = LZR.HTML.Srv.ComDbQry;

// 查询应答触发的事件
LZR.HTML.Srv.ComDbQry.prototype.onQryr = function (obj/*as:Object*/) {
	this.evt.qryr.execute (obj);
};
LZR.HTML.Srv.ComDbQry.prototype.onQryr.lzrClass_ = LZR.HTML.Srv.ComDbQry;

// 预处理触发的事件
LZR.HTML.Srv.ComDbQry.prototype.onQryb = function (cond/*as:Object*/) {
	this.evt.qryb.execute (cond);
};
LZR.HTML.Srv.ComDbQry.prototype.onQryb.lzrClass_ = LZR.HTML.Srv.ComDbQry;

// 执行应答触发的事件
LZR.HTML.Srv.ComDbQry.prototype.onExer = function (sta/*as:int*/, obj/*as:Object*/) {
	this.evt.exer.execute (obj);
};
LZR.HTML.Srv.ComDbQry.prototype.onExer.lzrClass_ = LZR.HTML.Srv.ComDbQry;
