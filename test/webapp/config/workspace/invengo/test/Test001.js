function webapp () {
	return {
		alias: "网络访问测试小页面（Invengo）",
		nam: "Test",
		publish: false,
		version: "v1.0",
		loads: [
			"LZR.HTML.Base.Ctrl.TouchBtn",
			"LZR.HTML.Base.Ajax",
		],
		tools: {
			Doe: "LZR.HTML.Base.Doe",
			Btn: "LZR.HTML.Base.Ctrl.TouchBtn",
			ajx: "new LZR.HTML.Base.Ajax()",
			ut: "LZR.getSingleton(LZR.Util)"
		},
		fun: function (obj) {
			/* 参数说明：
				{
					doeNam:"外层容器名",
					txtNam:"输出窗口名",
					hqBtnNam:"股票查询按钮名",
					weatherBtnNam:"天气查询按钮名",
					clrBtnNam:"清空按钮名",
					hqUrl:"股票路径",
					weatherUrl:"天气路径",
					fileNam:"文件路径",
					css:"按钮按下时样式"
				}
			*/
			this.doe = new this.tools.Doe ({
				hd_doe: document.getElementById(obj.doeNam)
			});
			this.btnCtrl = new this.tools.Btn({
				dbTim: 0,		// 屏蔽双击
				longTim: 0,		// 屏蔽长按
				css: obj.css
			});
			this.txt = this.doe.getById(obj.txtNam);
			this.hqBtn = this.doe.getById(obj.hqBtnNam);
			this.weatherBtn = this.doe.getById(obj.weatherBtnNam);
			this.clrBtn = this.doe.getById(obj.clrBtnNam);

			/*------------- 方法 --------------*/

			// 按钮处理
			this.onBtnClick = function (doe) {
				switch (doe.id.get()) {
					case obj.hqBtnNam:
						this.get(obj.hqUrl);
						break;
					case obj.weatherBtnNam:
						this.get(obj.weatherUrl);
						break;
					case obj.clrBtnNam:
						this.txt.doe.innerHTML = "";
						break;
				}
			};

			// ajax调用
			this.get = function (url) {
				this.tools.ajx.get (url, true);
			};

			// ajax回调
			this.getCb = function (text, status) {
				this.txt.doe.innerHTML += text;
				this.txt.doe.innerHTML += "</br></br>";
				this.callAdr (text);
			};

			// 调用安卓函数
			this.callAdr = function (text) {
				if (window.myAdrObj) {
					myAdrObj.appendFile(obj.fileNam, text);
				} else {
					console.log(text);
				}
			};

			/*----------- 事件 -------------*/

			// ajax事件处理
			this.tools.ajx.evt.rsp.obj = this;
			this.tools.ajx.evt.rsp.add(this.getCb);

			// 按钮事件处理
			this.btnCtrl.evt.click.obj = this;
			this.btnCtrl.evt.click.add(this.onBtnClick, "onBtnClick");

			// 按钮添加控制器
			this.btnCtrl.add(this.hqBtn);
			this.btnCtrl.add(this.weatherBtn);
			this.btnCtrl.add(this.clrBtn);
		}
	};
}
