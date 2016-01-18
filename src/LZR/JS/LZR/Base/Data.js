/*************************************************
作者：子牛连
类名：Data
说明：数据
创建日期：14-一月-2016 11:02:49
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base",
	"LZR.Base.ValCtrl"
], "LZR.Base.Data");
LZR.Base.Data = function (obj) {
	// 数据之名
	this.id = new LZR.Base.ValCtrl("");	/*as:LZR.Base.ValCtrl*/

	// 数据之根
	this.root = new LZR.Base.ValCtrl(null);	/*as:LZR.Base.ValCtrl*/

	// 数据之父
	this.parent = new LZR.Base.ValCtrl(null);	/*as:LZR.Base.ValCtrl*/

	// 数据之子
	this.children = {};	/*as:Object*/

	// 视图元素
	this.view = null;	/*as:Object*/

	// 控制元素
	this.ctrl = null;	/*as:Object*/

	// 子元素个数
	this.childrenCount = 0;	/*as:int*/

	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Base.Data.prototype.className_ = "LZR.Base.Data";
LZR.Base.Data.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.Data");

// 添加子数据
LZR.Base.Data.prototype.append = function (sub/*as:Data*/, id/*as:string*/) {
	if (!id) {
		id = sub.id.val;
		if (!id) {
			id = this.childrenCount.toString();
		}
	}
	if (sub.parent.val) {
		sub.parent.val.del (sub.id.val);
	}
	if (this.children[id] === undefined) {
		this.childrenCount ++;
	}
	this.children[id] = sub;
	sub.id.set(id, false);
	sub.parent.set(this, false);
	sub.root = this.root;
};

// 构造器
LZR.Base.Data.prototype.init_ = function (obj/*as:Object*/) {
	this.root.setEventObj (this);
	
	this.id.setEventObj (this);
	this.id.event.change.append(this.changeId);

	this.parent.setEventObj (this);
	this.parent.event.change.append(this.changeParent);

	if (obj) {
		LZR.setObj (this, obj);
	}
};

// 父类变化时触发的事件
LZR.Base.Data.prototype.changeParent = function (obj/*as:Object*/, self/*as:LZR.Base.ValCtrl*/, old/*as:Object*/) {
	if (obj) {
		obj.append (this);
	}
};

// 名称变化时触发的事件
LZR.Base.Data.prototype.changeId = function (obj/*as:Object*/, self/*as:LZR.Base.ValCtrl*/, old/*as:Object*/) {
	if (this.parent.val) {
		this.parent.val.children[old] = undefined;
		this.parent.val.children[obj] = this;
	}
};

// 递归查询匹配ID的数据
LZR.Base.Data.prototype.getById = function (id/*as:string*/)/*as:Data*/ {
	if (id == this.id.val) {
		return this;
	} else if (this.children[id]) {
		return this.children[id];
	} else {
		for (var s in this.children) {
			var v = this.children[s].getById(id);
			if (v) {
				return v;
			}
		}
	}
	return null;
};

// 删除子数据
LZR.Base.Data.prototype.del = function (id/*as:string*/)/*as:Object*/ {
	var sub = this.children[id];
	if (sub !== undefined) {
		this.children[id] = undefined;
		sub.parent.set(null, false);
		sub.root = new LZR.Base.ValCtrl(null);
		this.childrenCount --;
	}
	return sub;
};