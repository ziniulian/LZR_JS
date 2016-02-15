var getCurPath = function () {
	var fileName = "initLZRbyNode.js";
	var p = require.resolve("./" + fileName);
	var i = p.indexOf(fileName);
	if (i>0) {
		return (p.substr(0, i) + "JS");
	} else {
		return "";
	}
};

require("./JS/LZR.js");
LZR.loadTyp = 1;
LZR.separator = "\\";	// Windows系统
LZR.curPath = getCurPath ();
