/*************************************************
作者：子牛连
类名：InfScrnshot
说明：截图接口
创建日期：27-四月-2016 15:52:10
版本号：1.0
*************************************************/

LZR.load([
	"LZR.HTML.Base",
	"LZR.Base.InfEvt",
	"LZR.Base.CallBacks"
], "LZR.HTML.Base.InfScrnshot");
LZR.HTML.Base.InfScrnshot = function (obj) /*interfaces:LZR.Base.InfEvt*/ {
	LZR.Base.InfEvt.call(this);

	// 截图完毕
	this.evt.render/*m*/ = new LZR.Base.CallBacks();	/*as:LZR.Base.CallBacks*/
};
LZR.HTML.Base.InfScrnshot.prototype = LZR.clone (LZR.Base.InfEvt.prototype, LZR.HTML.Base.InfScrnshot.prototype);
LZR.HTML.Base.InfScrnshot.prototype.className_ = "LZR.HTML.Base.InfScrnshot";
LZR.HTML.Base.InfScrnshot.prototype.version_ = "1.0";

LZR.load(null, "LZR.HTML.Base.InfScrnshot");

// 截图
LZR.HTML.Base.InfScrnshot.prototype.shot = function (doe/*as:Object*/) {
	
};

// 截图完毕时触发的事件
LZR.HTML.Base.InfScrnshot.prototype.onRender = function (cav/*as:Object*/) {
	return this.evt.render.execute (cav);
};
