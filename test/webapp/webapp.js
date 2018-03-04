
function buildWebApp(webAppObj) {
	LZR.curPath = "/myLib";
	LZR.ecTxt = {};		// 记录类加载的文本信息
	LZR.load(webAppObj.loads);

	var d = LZR.ecTxt;
	var txt = '(function (root, factory) {\n\tif (typeof exports === "object") {\n\t\tmodule.exports = factory();\n\t} else if (typeof define === "function" && define.amd) {\n\t\tdefine([], factory);\n\t} else {\n\t\t';
	if (webAppObj.publish) {
		txt += "root.LZR_publish_" + webAppObj.nam + " = factory();";
	} else {
		txt += "root.HelloWorld = factory;";
	}
	txt += "\n\t}\n}(this, function () {\n";
	var s;
	for (s in d) {
		if (s.indexOf("/") !== 0) {
// console.log (s);
			if (s === "LZR") {
				txt += d[s].substr( d[s].indexOf("var LZR") );
			} else {
				txt += d[s];
			}
			txt += "\n\n";
		}
	}
	txt += "var r = {root:LZR,obj:{}";
	for (s in webAppObj.tools) {
		txt += ",";
		txt += s;
		txt += ":";
		txt += webAppObj.tools[s];
	}
	txt += "};r.obj.tools=r;";
	// txt += "};r.obj.root=r;"	// 2016-12-9以前的模块，使用root参数

	if (webAppObj.fun) {
		txt += "\nvar fun = ";
		txt += webAppObj.fun.toString();
		txt += ";\nfun.prototype.tools = r;return fun;";
	} else {
		txt += "return r;";
	}
	txt += "\n}));";

	var blob = new Blob([txt], {type:"text/text;charset=utf-8"});
	var u = URL.createObjectURL(blob);
	var a = document.createElement("a");
	a.innerText = webAppObj.alias;
	a.download = webAppObj.nam + ".js";
	a.href = u;
	document.body.appendChild(a);
}

function loadWebApp(webAppObj) {
	LZR.curPath = "/myLib";
	LZR.load(webAppObj.loads);

	var r = {
		root: LZR,
		obj: {}
	};
	r.obj.tools = r;

	for (var s in webAppObj.tools) {
		r[s] = eval(webAppObj.tools[s]);
	}

	if (webAppObj.fun) {
		webAppObj.fun.prototype.tools = r;
		r = webAppObj.fun;
	}
	return r;
}

