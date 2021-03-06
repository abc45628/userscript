// ==UserScript==
// @name        steam仓库
// @namespace   https://gitee.com/abc45628/userscript
// @version     2019.1.19.0
// @author      abc45628
// @description steam仓库
// @supportURL  https://gitee.com/abc45628/userscript/issues
// @updateURL   https://gitee.com/abc45628/userscript/raw/master/steam/steam仓库.user.js
// @include     /^https?:\/\/steamcommunity\.com\/.*\/inventory/
// @license     MIT
// @run-at      document-end
// ==/UserScript==
(function () {
	"use strict";
	let $J = unsafeWindow.$J;//jquery
	/**steam 64位id */
	let user64 = document.URL.match("[0-9]+")[0];
	console.log('user64=' + user64);
	/**仓库查询地址 */
	let inv_url = "//steamcommunity.com/inventory/" + user64 + "/753/6";
	/** 向服务器查询库存中*/
	let getInvData_progress = false;
	/** 如果请求的数量多于可读取到的卡片,不会返回more_items和last_assetid*/
	let no_more_item = false;
	/**重试加载仓库数据的前等待秒数 */
	let loadWait = 3;
	/**库存数据 */
	let asset_list = [
		//classid该库存属于哪一种资产,相同的卡有相同的classid
		//tradable不可交易0,可交易1
		//market_fee_app
	];
	function asset() {
		/**用于打开对应卡片的市场页面 */
		this.market_hash_name = undefined;
		/**打开市场页面后获取到的,用于查卡片最近价格情况 */
		this.item_nameid = undefined;
		/**这张卡的具体编号,就算是2张相同的卡,assetid都会不同 */
		this.assetid = undefined;
		/**对应游戏appid */
		this.appid = undefined;
		return this;
	}
	/**查询时的资产起始id */
	let start_assetid;
	init();

	function init() {
		getInvData();
		build_UI();
	}

	/**查仓库数据 */
	function getInvData() {
		if (getInvData_progress) { console.log('查询过程中,新请求被取消'); return; }
		if (no_more_item) { console.log('没有更多卡片'); return; }
		let data = {
			l: "schinese",//钱包区域
			count: 500,//请求的库存数量
			start_assetid: start_assetid,
		};
		//开始查数据
		getInvData_progress = true;
		$J.ajax({
			type: 'get',
			url: inv_url,
			data: data,
			dataType: 'json',
			success: function (resp) {
				console.log("仓库数据:");
				console.log(resp);
				let assets = resp.assets;
				let descriptions = resp.descriptions;
				let last_assetid = resp.last_assetid;

				if (!last_assetid) { no_more_item = true; }
				start_assetid = last_assetid;


				for (let i = 0; i < assets.length; i++) {
					const a = assets[i];
					for (let j = 0; j < descriptions.length; j++) {
						const d = descriptions[j];
						if (a.classid === d.classid) {
							let at = new asset();
							at.market_hash_name = d.market_hash_name;
							at.assetid = a.assetid;
							at.appid = d.market_fee_app;
							asset_list.push(at);
							break;
						}
					}
				}
				console.log('现有的资产：');
				console.log(asset_list);
				//step2 描述


				//step3 资产


				getInvData_progress = false;
				document.querySelector("#sce_page .item_market_action_button_contents").textContent ='数据初始化完成';
			},
			error: function () {
				loadWait++;
				console.error("仓库数据加载出错,请求参数为:");
				console.error(data);
				console.error("等待下一次请求。" + loadWait + '秒后。');
				getInvData_progress = false;
				setTimeout(getInvData, 1000 * loadWait);
			}
		});
	}

	/**点击卡片 */
	function click_card(url) {
		// console.log('url=' + url);
		$J("#sce_page .item_market_action_button_contents").text("steamcardexchange页面");
		$J('#market_commodity_forsale').html('');
		$J('#market_commodity_forsale_table').html('');
		$J('#market_commodity_buyrequests').html('');
		$J('#market_commodity_buyreqeusts_table').html('');
		//礼物context_id=1,优惠券context_id=3,卡片、宝珠、表情、背景的context_id=6
		//753库存页面的调用id
		let clicked_asset_id = url.match(/^#753_6_(.*)$/)[1];
		if (!clicked_asset_id) { console.error('没有assetid'); return; }
		console.log('被点击的资产=' + clicked_asset_id);

		//在社区市场查看  新窗口打开
		// let item_actions = document.querySelectorAll('.item_market_actions');
		// Array.prototype.forEach.call(item_actions, function (e) {
		// 	try {
		// 		e.firstChild.firstChild.firstChild.target = '_blank';
		// 	} catch (error) {
		// 		('第一次点击必然报错,什么都不需要做');
		// 	}
		// });

		//准备数据
		let choosen;
		for (let i = 0; i < asset_list.length; i++) {
			const asset = asset_list[i];
			if (asset.assetid !== clicked_asset_id) {
				continue;
			}
			choosen = asset;
		}
		if (!choosen) {
			console.error('点击卡片后找不到资产数据');
		}
		console.log('选中资产数据');
		console.log(choosen);

		//steamcardexchange页面
		document.querySelector("#sce_page").href = "http://www.steamcardexchange.net/index.php?gamepage-appid-" + choosen.appid;
		document.querySelector("#sce_page .item_market_action_button_contents").textContent = choosen.market_hash_name;

		//查市场价格
		open_market_page(choosen);
	}

	/**打开市场页面 */
	function open_market_page(choosen) {
		let market_hash_name = choosen.market_hash_name;
		if (choosen.item_nameid) {
			get_market_price(choosen.item_nameid);
		} else {
			$J.get('//steamcommunity.com/market/listings/753/' + encodeURIComponent(market_hash_name), function (data) {
				let item_nameid = data.match(/Market_LoadOrderSpread\( (\d+)/)[1];
				choosen.item_nameid = item_nameid;
				get_market_price(choosen.item_nameid);
			});
		}
	}

	/**查单张卡牌的最近市场价 */
	function get_market_price(item_nameid) {
		//查单张卡牌的最近市场价
		$J.ajax({
			type: "GET",
			url: "//steamcommunity.com/market/itemordershistogram",
			data: {
				country: 'CN',
				language: 'schinese',
				currency: 23,//货币，RMB代码23
				item_nameid: item_nameid,
				two_factor: 0
			},
			success: function (data) {
				console.log(data);
				if (data.success == 1) {
					$J('#market_commodity_forsale').html(data.sell_order_summary);
					$J('#market_commodity_forsale_table').html(data.sell_order_table);
					$J('#market_commodity_buyrequests').html(data.buy_order_summary);
					$J('#market_commodity_buyreqeusts_table').html(data.buy_order_table);
				}
			},
			error: function () {
				console.error("价格数据加载出错");
			}
		});
	}

	/**点击下一页 */
	function click_next() {
		let cur_page = $J('#pagecontrol_cur').text();
		console.log("cur_page=" + cur_page);
		/**剩余n页的时候再查后面的卡片 */
		let n = 2;
		if (asset_list.length - cur_page * 25 <= 25 * n) {
			getInvData();
		}
	}

	function build_UI() {
		//跳转steamcardexchange的按钮
		let card_exchange_btn = document.createElement("div");
		card_exchange_btn.innerHTML =
			"<a id='sce_page' target='_blank' class='item_market_action_button item_market_action_button_green'>" +
			"<span class='item_market_action_button_edge item_market_action_button_left'></span>" +
			"<span class='item_market_action_button_contents'>steamcardexchange页面</span>" +
			"<span class='item_market_action_button_edge item_market_action_button_right'></span>" +
			"<span class='item_market_action_button_preload'></span></a>";
		document.querySelector('.inventory_page_right').appendChild(card_exchange_btn);
		//价位表
		let price_list = document.createElement("div");
		price_list.id = 'price_list';
		price_list.style.marginTop = "46px";
		price_list.innerHTML =
			'<div style="float:left"><div id="market_commodity_forsale"></div>' +
			'<div id="market_commodity_forsale_table"></div></div>' +
			'<div style="float:left;margin-left: 30px;"><div id="market_commodity_buyrequests"></div>' +
			'<div id="market_commodity_buyreqeusts_table"></div></div>';
		document.querySelector('#inventory_pagecontrols').after(price_list);
		//有价值的物品
		let rich_item = document.createElement('div');
		rich_item.id = 'rich_item';
		document.getElementById("price_list").after(rich_item);

		document.addEventListener('click', function (ev) {
			let evt = ev.target;
			// 点击卡片
			if (evt.className == 'inventory_item_link') {
				click_card(evt.hash);
			}
			//点击下一页
			else if (evt.id === 'pagebtn_next') {
				click_next();
			}
		});
	}
})();
/*eslint-env greasemonkey */