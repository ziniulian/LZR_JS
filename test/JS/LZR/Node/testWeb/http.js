var	http = require("http"),
	url = require("url"),
	path = require("path"),
	fs = require("fs");

function loadStaticFile(uri, response) {
	var filename = path.join(process.cwd(), uri);
	fs.exists (filename, function (exists) {
		if (!exists) {
			response.writeHeader (404, {"Content-Type":"text/plain;charset=utf-8"});
			response.write ("404 页面不存在\n", "utf-8");
			response.end();
		} else {
			fs.readFile (filename, "binary", function (err, file) {
				if (err) {
					response.writeHeader (500, {"Content-Type":"text/plain;charset=utf-8"});
					response.write((err + "\n"), "utf-8");
					response.end();
				} else {
					// response.writeHeader (200, {"Content-Type":"text/html;charset=utf-8"});	// 普通文字 或 HTML
					// response.writeHeader (200, {"Content-Type":"x-world/x-vrml"});		// vrml 3D模型
					// response.writeHeader (200, {"Content-Type":"image/jpeg"});			// 图片
					// response.writeHeader (200);
					response.writeHeader (200, {
						"Access-Control-Allow-Origin": "*",		// HTML5 允许跨域访问的范围，* 代表允许任何网域访问
						"Content-Type": parseSuf(getSuf(uri))	// 文件格式； 字符编码
					});
					response.write(file, "binary");
					response.end();
				}
			});
		}
	});
}

// 获取后缀
function getSuf (s) {
	var r = "";
	var i = s.lastIndexOf(".");
	i++;
	if (i > 0) {
		r = s.substr(i);
	}
	return r;
}

// 解析后缀
function parseSuf (s) {
	var r;
	switch (s) {
		case "css":
			r = "text/css";
			break;
		case "jpg":
		case "gif":
		case "png":
			r = "image/jpeg";
			break;
		default:
			r = "text/html; charset=utf-8";
			break;
	}
	return r;
}

http.createServer (function(request, response) {
	var uri = decodeURIComponent ( url.parse(request.url).pathname );

	if (uri === "/") {
		uri = "/index.html";
	}

	loadStaticFile(uri, response);
}).listen(80);

console.log("Server running !!!");
