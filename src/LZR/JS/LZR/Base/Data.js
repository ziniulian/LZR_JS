/*************************************************
作者：子牛连
类名：Data
说明：数据
创建日期：27-七月-2016 12:30:02
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base",
	"LZR.Base.Data",
	"LZR.Base.Val.Ctrl"
], "LZR.Base.Data");
LZR.Base.Data = function (obj) {
	// 视图元素
	this.view = null;	/*as:Object*/

	// 控制元素
	this.ctrl = null;	/*as:Object*/

	// 子元素个数
	this.count = 0;	/*as:int*/

	// 前一个同级元素
	this.prev = null;	/*as:Object*/

	// 后一个同级元素
	this.next = null;	/*as:Object*/

	// 第一个子元素
	this.first = null;	/*as:Object*/

	// 最后一个子元素
	this.last = null;	/*as:Object*/

	// 数据之名
	this.id/*m*/ = new LZR.Base.Val.Ctrl();	/*as:LZR.Base.Val.Ctrl*/

	// 数据之根
	this.root/*m*/ = new LZR.Base.Val.Ctrl();	/*as:LZR.Base.Val.Ctrl*/

	// 数据之父
	this.parent/*m*/ = new LZR.Base.Val.Ctrl();	/*as:LZR.Base.Val.Ctrl*/

	// 数据之子
	this.subs/*m*/ = {};	/*as:LZR.Base.Data*/

	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Base.Data.prototype.className_ = "LZR.Base.Data";
LZR.Base.Data.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.Data");

// 添加子数据
LZR.Base.Data.prototype.add = function (sub/*as:Data*/, id/*as:string*/)/*as:boolean*/ {
	if (!id) {
		id = sub.id.get();

		// id 不正常，则不能添加
		if (!id) {
			return false;
		}
	}

	// 已存在相同 id 的子元素 且 与sub不相同时，不能添加
	var p = this.subs[id];
	if (p === undefined) {
		this.count ++;
	} else if (p !== sub) {
		return false;
	} else {
		return true;
	}

	// 删除子元素在原父类中的关系
	p = sub.parent.get();
	if (p) {
		p.del (sub.id.get());
	}

	// 维护链表关系
	if (this.last === null) {
		this.first = sub;
		this.last = sub;
	} else {
		this.last.next = sub;
		sub.prev = this.last;
		this.last = sub;
	}

	// 添加子元素
	this.subs[id] = sub;
	sub.root.set (this.root.get());	// 会触发root的change事件
	sub.id.set(id, false);
	sub.parent.set(this, false);
	return true;
};
LZR.Base.Data.prototype.add.lzrClass_ = LZR.Base.Data;

// 构造器
LZR.Base.Data.prototype.init_ = function (obj/*as:Object*/) {
	this.root.set (this, false);
	this.root.setEventObj (this);
	this.root.evt.change.add(this.changeRoot);

	this.id.setEventObj (this);
	this.id.evt.change.add(this.changeId);

	this.parent.setEventObj (this);
	this.parent.evt.change.add(this.changeParent);

	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Base.Data.prototype.init_.lzrClass_ = LZR.Base.Data;

// 父类变化时触发的事件
LZR.Base.Data.prototype.changeParent = function (obj/*as:Object*/, self/*as:LZR.Base.Val.Ctrl*/, old/*as:Object*/) {
	if (obj) {
		self.set(old, false);
		return obj.add (this);
	} else if (old) {
		// 新父类不正确时，将其从原父类中移除。
		old.del(this);
	}
};
LZR.Base.Data.prototype.changeParent.lzrClass_ = LZR.Base.Data;

// 名称变化时触发的事件
LZR.Base.Data.prototype.changeId = function (obj/*as:Object*/, self/*as:LZR.Base.Val.Ctrl*/, old/*as:Object*/) {
	var p = this.parent.get();
	if (p) {
		if (!obj) {
			// id 不正确时，将其从父类中移除。
			p.del(old);
		} else {
			self.set(old, false);
			return p.add (this, obj);
		}
	}
};
LZR.Base.Data.prototype.changeId.lzrClass_ = LZR.Base.Data;

// 递归查询匹配ID的数据
LZR.Base.Data.prototype.getById = function (id/*as:string*/)/*as:Object*/ {
	if (id === this.id.get()) {
		return this;
	} else if (this.subs[id]) {
		return this.subs[id];
	} else {
		for (var s in this.subs) {
			var v = this.subs[s].getById(id);
			if (v) {
				return v;
			}
		}
	}
	return undefined;
};
LZR.Base.Data.prototype.getById.lzrClass_ = LZR.Base.Data;

// 删除子数据
LZR.Base.Data.prototype.del = function (id/*as:string*/)/*as:Object*/ {
	if (id) {	// 检查 id 是否正常

		// id 可以是数据对象
		if (id.className_) {
			id = id.id.get();
		}

		// 如果存在对应 id 的子元素，则删除它
		var sub = this.subs[id];
		if (sub !== undefined) {

			// 维护链表关系
			if (sub.prev === null) {
				if (sub.next === null) {
					this.last = null;
					this.first = null;
				} else {
					this.first = sub.next;
					sub.next.prev = null;
				}
			} else {
				if (sub.next === null) {
					sub.prev.next = null;
					this.last = sub.prev;
				} else {
					sub.prev.next = sub.next;
					sub.next.prev = sub.prev;
				}
			}
			sub.prev = null;
			sub.next = null;

			LZR.del(this.subs, id);
			this.count --;
			sub.root.set (sub);	// 会触发root的change事件
			sub.parent.set(null, false);
		}
		return sub;
	} else {
		return undefined;
	}
};
LZR.Base.Data.prototype.del.lzrClass_ = LZR.Base.Data;

// 递归创建子数组
LZR.Base.Data.prototype.initSubs = function (config/*as:Object*/) {
	for (var s in config) {
		var o = config[s];
		var c = o.cls_;
		if (!c) {
			// 获取对象的构造函数
			c = this.constructor;
		}
		this.add( new c(o), s );
	}
};
LZR.Base.Data.prototype.initSubs.lzrClass_ = LZR.Base.Data;

// 根变化时触发的事件
LZR.Base.Data.prototype.changeRoot = function (obj/*as:Object*/, self/*as:LZR.Base.Val.Ctrl*/, old/*as:Object*/) {
	for (var s in this.subs) {
		this.subs[s].root.set (obj);
	}
};
LZR.Base.Data.prototype.changeRoot.lzrClass_ = LZR.Base.Data;

// 结构输出
LZR.Base.Data.prototype.print = function (indent/*as:string*/)/*as:string*/ {
	if (!indent) {
		indent = "";
	}
	var r = indent;
	r += this.id.get();
	r += "\n";
	indent += "\t";
	for (var s in this.subs) {
		r += this.subs[s].print(indent);
	}
	return r;
};
LZR.Base.Data.prototype.print.lzrClass_ = LZR.Base.Data;

// 对构造参数的特殊处理
LZR.Base.Data.prototype.hdObj_ = function (obj/*as:Object*/) {
	var note;	/*
				参数说明： obj 里有两个不能属于该类属性的特殊字段 chd_ 和 cls_
				chd_: {		// 该字段用于递归创建子数据
					a: {
						id: "a",
						cls_: LZR.Base.Data		// 用于明确数据类型，若为空，则使用对象自己的构造函数。
					}
				}
			*/
	if (obj.chd_) {
		// 子数据的递归创建
		this.initSubs(obj.chd_);
	}
};
LZR.Base.Data.prototype.hdObj_.lzrClass_ = LZR.Base.Data;

// 克隆
LZR.Base.Data.prototype.clone = function (dep/*as:boolean*/)/*as:Object*/ {
	var s;
	var r = {};
	var p = this.constructor.prototype;
	for (s in this) {
		if (p[s] === undefined) {
			switch (s) {
				case "root":
				case "parent":
				case "count":
				case "subs":
				case "prev":
				case "next":
				case "first":
				case "last":
					break;
				case "id":
					r.id = this.id.get();
					break;
				default:
					this.hdClonePro (s, r, dep);
			}
		}
	}
// console.log (r);
	r = new this.constructor(r);

	for (s in this.subs) {
		r.add (this.subs[s].clone(dep));
	}
	return r;
};
LZR.Base.Data.prototype.clone.lzrClass_ = LZR.Base.Data;

// 处理克隆参数
LZR.Base.Data.prototype.hdClonePro = function (name/*as:string*/, rt/*as:Object*/, dep/*as:boolean*/)/*as:Object*/ {
	if (dep) {
		rt[name] = LZR.clone(this[name], dep);
	} else {
		rt[name] = this[name];
	}
	return rt;
};
LZR.Base.Data.prototype.hdClonePro.lzrClass_ = LZR.Base.Data;

// 删除所有子元素
LZR.Base.Data.prototype.delAll = function ()/*as:Array*/ {
	var r = [];
	for (var s in this.subs) {
		r.push(this.del(s));
	}
	return r;
};
LZR.Base.Data.prototype.delAll.lzrClass_ = LZR.Base.Data;

// 获取子元素的总数
LZR.Base.Data.prototype.subCount = function ()/*as:Array*/ {
	var r = 0;
	if (this.count) {
		for (var s in this.subs) {
			r += this.subs[s].subCount();
		}
	} else {
		r = 1;
	}
	return r;
};
LZR.Base.Data.prototype.subCount.lzrClass_ = LZR.Base.Data;
