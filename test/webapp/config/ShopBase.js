function webapp () {
	return {
		alias: "店铺基础方法",
		nam: "ShopBase",
		publish: false,		// 以nam命名函数
		version: "v1.0",	// 版本
		loads: [
			"LZR.HTML.Base.Ajax"
		],
		tools: {
			bind: "LZR.getSingleton(LZR.Util).bind",
			ajx: "new LZR.HTML.Base.Ajax()",
			utJson: "LZR.getSingleton(LZR.Base.Json)"
		},
		fun: function (obj) {
			// 添加到购物车
			this.addToCart = function (goodsId, num, sn, tn) {
				if (num) {
					var goods = this.tools.utJson.toJson ({
						quick: 0,
						spec: [],
						goods_id: goodsId,
						number: num,
						parent: 0
					});

					var r = this.tools.ajx.post("flow.php?step=add_to_cart", "goods=" + goods);
					// 异常处理 （未完成） ..........

					if (tn) {
						var trees = this.tools.utJson.toJson ({
							quick: 0,
							spec: [],
							goods_id: 194,
							number: tn,
							parent: 0
						});
						this.tools.ajx.post("flow.php?step=add_to_cart", "goods=" + trees);
					}

					if (sn) {
						var seeds = this.tools.utJson.toJson ({
							quick: 0,
							spec: [],
							goods_id: 195,
							number: sn,
							parent: 0
						});
						this.tools.ajx.post("flow.php?step=add_to_cart", "goods=" + seeds);
					}

					location.href = "flow.php?step=cart";
				}
			};

			// 从收藏夹删除商品
			this.dropFromCollection = function (title, goodsRecId) {
				if (confirm(title)) {
					location.href="user.php?act=delete_collection&collection_id=" + goodsRecId;
				}
			};
		}
	};
}
