// 测试 LZR 模块加载
require("LZR");
// console.log ("\n======= 测试 LZR 模块加载 =======");
// console.log (LZR);
// console.log ("======= 测试 LZR 模块加载 END ======= \n");

// 测试 LZR 子模块加载
LZR.load([
	"LZR.Node.Srv"
]);
// console.log ("\n======= 测试 LZR 子模块加载 =======");
// console.log (LZR);
// console.log ("======= 测试 LZR 子模块加载 END ======= \n");

// 测试服务的实例化
var srv = new LZR.Node.Srv ({
	ip: "127.0.0.1",
	port: 80
});
// console.log ("\n======= 测试服务的实例化 =======");
// console.log (srv);
// console.log ("======= 测试服务的实例化 END ======= \n");

// 路由设置
srv.ro.setStaticDir("/", "./");
srv.use("*", function (req, res) {
	res.send("404!");
});

// 测试服务启动
srv.start();
console.log ("http://127.0.0.1/");
// console.log ("\n======= 测试服务启动 =======");
// console.log (srv);
// console.log ("======= 测试服务启动 END ======= \n");
