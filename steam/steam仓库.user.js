// ==UserScript==
// @name				steam仓库
// @namespace		https://git.oschina.net/abc45628/userscript
// @version			2017.5.5
// @author			abc45628
// @description	steam仓库
// @supportURL	https://git.oschina.net/abc45628/userscript/issues
// @updateURL		https://gitee.com/abc45628/userscript/raw/master/steam/steam仓库.user.js
// @include			/^https?:\/\/steamcommunity\.com\/.*\/inventory/
// @license			MIT
// @run-at			document-end
// ==/UserScript==
(function () {
	"use strict";
	const $J = unsafeWindow.$J;//jquery
	const user64 = document.URL.match("[0-9]+")[0];//steam 64位id
	// console.log(user64);
	let getInvData_progress = false;//向服务器查询库存中
	let loadCount = 0;//重试加载仓库数据的次数
	let assets = [//库存数据
		//assetid这张卡的具体编号,就算是2张相同的卡,assetid都会不同
		//classid该库存属于哪一种资产,相同的卡有相同的classid
	];
	let descriptions = [
		//classid该库存属于哪一种资产,相同的卡有相同的classid
		//tradable不可交易0,可交易1
		//market_hash_name查价格用
		//market_fee_app对应游戏appid
	];
	let has_more_item = true;//如果请求的数量多于可读取到的卡片,不会返回more_items和last_assetid
	let start_assetid;

	/**得到仓库数据
	*  start_assetid   每张卡都有一个assetid，就算是2张相同的卡，assetid都会不同*/
	function getInventoryData(start_assetid) {
		if (getInvData_progress) { return; }
		if (!has_more_item) { console.log("没有更多卡片"); return; }
		let inv_url = "//steamcommunity.com/inventory/" + user64 + "/753/6";
		let params = {
			l: "schinese",//钱包区域
			count: 75//请求的库存数量
		};
		if (start_assetid) {
			params.start_assetid = start_assetid;
		}

		//开始查数据
		getInvData_progress = true;
		setTimeout(function () {
			$J.get(inv_url, params).done(function (data) {
				console.log("仓库数据");
				console.log(data);
				for (let i = 0; i < data.assets.length; i++) {
					let ass = data.assets[i];
					let asset = {};
					asset.assetid = ass.assetid;
					asset.classid = ass.classid;
					assets.push(asset);
				}
				console.log("assets");
				console.log(assets);
				for (let j = 0; j < data.descriptions.length; j++) {
					let de = data.descriptions[j];
					let desc = {};
					desc.classid = de.classid;
					desc.tradable = de.tradable;
					desc.market_hash_name = de.market_hash_name;
					desc.market_fee_app = de.market_fee_app;
					descriptions.push(desc);
				}
				console.log("descriptions");
				console.log(descriptions);
				has_more_item = false;
				if (data.more_items) {
					has_more_item = true;
					start_assetid = data.last_assetid;
				}
				getInvData_progress = false;
			}).error(function () {
				console.error("仓库数据加载出错,开始id=" + start_assetid);
				loadCount++;
				getInvData_progress = false;
				getInventoryData(start_assetid);
			});
		}, 1000 * (loadCount + 1));
	}

	function build_UI() {
		//steamcardexchange
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

	/**点击下一页 */
	function click_next() {
		let cur_page = document.querySelector('#pagecontrol_cur').textContent;
		console.log("cur_page " + cur_page);
		//剩余2页的时候再查后面的卡片
		if (assets.length - cur_page * 25 <= 50) {
			getInventoryData(start_assetid);
		}
	}

	/**点击卡片 */
	function click_card(url) {
		console.log('url ' + url);
		document.querySelector("#sce_page .item_market_action_button_contents").textContent = "steamcardexchange页面";
		//礼物context_id=1,优惠券context_id=3,卡片、宝珠、表情、背景的context_id=6
		//753库存页面的调用id
		let wanted_asset = url.match(/^#753_6_(.*)$/)[1];
		if (!wanted_asset) { return; }
		// console.log('wanted_asset ' + wanted_asset);

		//在社区市场查看  新窗口打开
		let item_actions = document.querySelectorAll('.item_market_actions');
		Array.prototype.forEach.call(item_actions, function (e) {
			try {
				e.firstChild.firstChild.firstChild.target = '_blank';
			} catch (error) {
				('第一次点击必然报错,什么都不需要做');
			}
		});

		//准备数据
		let asset;
		let desc;
		for (let i = 0; i < assets.length; i++) {
			if (wanted_asset != assets[i].assetid) { continue; }
			asset = assets[i];

			for (let j = 0; j < descriptions.length; j++) {
				if (asset.classid != descriptions[j].classid) { continue; }
				desc = descriptions[j];
				break;
			}
			break;
		}
		console.log('asset'); console.log(asset);
		console.log('desc'); console.log(desc);

		//steamcardexchange页面
		if (asset && desc) {
			document.querySelector("#sce_page").href = "http://www.steamcardexchange.net/index.php?gamepage-appid-" + desc.market_fee_app;
			document.querySelector("#sce_page .item_market_action_button_contents").textContent = desc.market_hash_name;
		}

		//查市场价格
		get_market_price(desc.market_hash_name);
	}

	/**查市场价格 */
	function get_market_price(market_hash_name) {
		$J.get('//steamcommunity.com/market/listings/753/' + market_hash_name, function (data) {
			let item_nameid = data.match(/Market_LoadOrderSpread\( (\d+)/)[1];

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
					console.error("价格数据加载出错,物品id=" + start_assetid);
					loadCount++;
					getInvData_progress = false;
					getInventoryData(start_assetid);
				}
			});
		});
		//查本游戏最贵的物品
		let card = { price: 0 };
		let flash_card = { price: 0 };
		let booster_pack = { price: 0 };
		let emoticon = { price: 0 };
		let background = { price: 0 };
		$J.ajax({
			type: "GET",
			url: "//steamcommunity.com/market/search/render/",
			data: {
				appid: 753,
				count: 100,
				'category_753_Game[]': 'tag_app_' + market_hash_name.match(/^\d*/)[0]
			},
			success: function (data) {
				let parser = new DOMParser();
				let html = parser.parseFromString(data.results_html, 'text/html');
				let one_item = html.getElementsByClassName('market_listing_row');
				for (let i = 0; i < one_item.length; i++) {
					let sale_price = one_item[i].getElementsByClassName('sale_price')[0];
					//出价
					let item_price = sale_price.previousElementSibling.textContent.match(/\d+\.\d+/)[0];
					console.log(item_price);
					//名字
					let market_listing_item_name = one_item[i].getElementsByClassName("market_listing_item_name")[0];
					let item_name = market_listing_item_name.textContent;
					console.log(item_name);
					//类型
					let market_listing_game_name = one_item[i].getElementsByClassName('market_listing_game_name')[0];
					let item_class = market_listing_game_name.textContent;
					console.log(item_class);
					if (item_class.includes('闪亮') && item_price > flash_card.price) {//闪卡
						flash_card.price = item_price;
						flash_card.name = item_name;
					} else if (item_class.includes('卡牌') && item_price > card.price) {//卡牌
						card.price = item_price;
						card.name = item_name;
					} else if (item_class.includes('表情') && item_price > emoticon.price) {//表情
						emoticon.price = item_price;
						emoticon.name = item_name;
					} else if (item_class.includes('背景') && item_price > background.price) {//背景
						background.price = item_price;
						background.name = item_name;
					} else if (item_class.includes('补充包') && item_price > booster_pack.price) {//补充包
						booster_pack.price = item_price;
						booster_pack.name = item_name;
					}
				}

			}
		});
	}




	getInventoryData(start_assetid);
	build_UI();
	console.log("finish");
})();