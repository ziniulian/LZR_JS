// 测试 LZR 模块加载
require("LZR");
// console.log ("\n======= 测试 LZR 模块加载 =======");
// console.log (LZR);
// console.log ("======= 测试 LZR 模块加载 END ======= \n");

// 测试 LZR 子模块加载
LZR.load([
	"LZR.NodeJs.BaseMainSrv",
	"LZR.NodeJs.SampleProxySrv",
	"LZR.NodeJs.SampleWebFileSrv"
]);
// console.log ("\n======= 测试 LZR 子模块加载 =======");
// console.log (LZR);
// console.log ("======= 测试 LZR 子模块加载 END ======= \n");

// 测试服务的实例化
var srv = new LZR.NodeJs.BaseMainSrv ({
	ip: "192.168.1.236",
	port: 8080
});
// console.log ("\n======= 测试服务的实例化 =======");
// console.log (srv);
// console.log ("======= 测试服务的实例化 END ======= \n");

// 测试服务启动
srv.start({
	// 简单的代理服务
	proxy: {
		cls_: LZR.NodeJs.SampleProxySrv,
		name: "/proxy"
	},

	// 基础文件服务
	web: {
		cls_: LZR.NodeJs.SampleWebFileSrv,
		name: "/",
		ajaxAllow: "*"
	}
});
// console.log ("\n======= 测试服务启动 =======");
// console.log (srv);
// console.log ("======= 测试服务启动 END ======= \n");
