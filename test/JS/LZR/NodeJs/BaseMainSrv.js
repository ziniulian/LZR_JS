// 测试 LZR 模块加载
require("LZR");
// console.log ("\n======= 测试 LZR 模块加载 =======");
// console.log (LZR);
// console.log ("======= 测试 LZR 模块加载 END ======= \n");

// 测试 LZR 子模块加载
LZR.load([
	"LZR.NodeJs.BaseMainSrv"
]);
// console.log ("\n======= 测试 LZR 子模块加载 =======");
// console.log (LZR);
// console.log ("======= 测试 LZR 子模块加载 END ======= \n");

// 测试服务的实例化
var srv = new LZR.NodeJs.BaseMainSrv ({
	port: 8080
});
// console.log ("\n======= 测试服务的实例化 =======");
// console.log (srv);
// console.log ("======= 测试服务的实例化 END ======= \n");

// 测试服务启动
srv.start({
	// 基础文件服务
	web: {
		srv: "wfs",
		obj: {
			name: "/",
			ajaxAllow: "*"
		}
	}
});
// console.log ("\n======= 测试服务启动 =======");
// console.log (srv);
// console.log ("======= 测试服务启动 END ======= \n");
