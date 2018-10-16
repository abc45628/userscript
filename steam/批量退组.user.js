// ==UserScript==
// @name        Leave Steam Group
// @description 可批量退出Steam组，可方便退出封禁的组。
// @author      abc45628,mouse040429
// @version     2018.10.16.0
// @namespace   https://gitee.com/abc45628/userscript
// @supportURL  https://gitee.com/abc45628/userscript/issues
// @updateURL   https://gitee.com/abc45628/userscript/raw/master/steam/批量退组.user.js
// @include     https://steamcommunity.com/id/*/groups/
// @include     https://steamcommunity.com/profiles/*/groups/
// ==/UserScript==
(function () {
	"use strict";
	/**jquery */
	let $J = unsafeWindow.$J;
	let loc = window.location.href;
	const url_post = loc.replace("/groups/", "/friends/action");
	let whiteList = [
		'103582791429777370',//STCN
		'103582791431747328',//嗶哩嗶哩 - ( ゜- ゜)つロ 乾杯~
		'103582791440763345',//愛PG愛STCN愛生活
		'103582791458603871',//西九龍重䅁組
		'103582791457392415',//ASF组
		'103582791429777370',//STCN
		'103582791429777370',//STCN
		'103582791429777370',//STCN
		'103582791429777370',//STCN
	];
	buildUI();
	eventBinding();

	/**退出所有组 */
	function leaveAllClick() {
		$J(".group_block").addClass("group-selected");
		leaveSelectedClick();
	}

	/**退出所选组 */
	function leaveSelectedClick() {
		let group_steamids_array = [];
		let group_name_array = [];
		let group_id_array = [];
		let status_groups_leaved = [];
		const leave_selected_groups = leaveGroups();
		$J(".group_block.group-selected").each(function () {
			//ConfirmLeaveGroup( '103582791461895448', &quot;Oy-Vey-Keys.com&quot;, '#group_32374040'  )
			//有管理权限的组如果选上会报错
			const group_actions = $J(this).find(".actions > .linkStandard[onclick]").attr("onclick").match(/^ConfirmLeaveGroup\(\s'(\d{18})',\s"(.*)",\s'(#group_\d+)'\s+\)$/);
			const group_steamids = group_actions[1];
			if (whiteList.includes(group_steamids)) { return; }
			$J(this).attr("data-group-id", group_steamids);
			const group_name = unescape(group_actions[2]['replace'](/\\u/gi, '%u'));
			const group_id = group_actions[3];
			group_steamids_array.push(group_steamids);
			group_name_array.push(group_name);
			group_id_array.push(group_id);
		});

		if (window.confirm('您即将离开所选的组：\n' + group_name_array.join("\n") + '\n\n是否确定？')) {
			leave_selected_groups.next();
		}

		function* leaveGroups() {
			for (let i = 0; i < group_steamids_array.length; i++) {
				yield leaveGroupPost(group_steamids_array[i], group_id_array[i]);
			}
		}

		function leaveGroupPost(steamids, group_id) {
			$J.post(url_post, {
				action: "leave_group",
				ajax: "1",
				sessionid: g_sessionID,
				steamid: g_steamID,
				"steamids[]": steamids,
			}, function (response) {
				if (response.success === true) {
					$J(group_id).addClass("group-leaved").removeClass("group-selected");
				} else if (response.success === false) {
					$J(group_id).addClass("group-error").removeClass("group-selected");
				} else {
					alert("超时或脚本地址失效");
				}
				leave_selected_groups.next();
			});
		}
	}

	/**退出此组 */
	function leaveGidClick() {
		const input_value = $J("#group-gid").val();
		let g_id;
		let g_name;
		let g_xml;
		if (input_value.match(/\d{18}/)) {
			g_id = input_value.match(/\d{18}/);
			g_xml = "https://steamcommunity.com/gid/" + g_id[0] + "/memberslistxml/?xml=1";
		} else if (input_value.match(/groups\/([\w-]+)/)) {
			g_name = input_value.match(/groups\/([\w-]+)/);
			g_xml = "https://steamcommunity.com/groups/" + g_name[1] + "/memberslistxml/?xml=1";
		} else {
			g_name = input_value.match(/[\w-]+/);
			g_xml = "https://steamcommunity.com/groups/" + g_name[0] + "/memberslistxml/?xml=1";
		}
		$J.get(g_xml, function (response) {
			g_id = $J(response).find("groupID64")[0].textContent;
			g_name = $J(response).find("groupName")[0].firstChild.textContent.replace(/\[CDATA\[(.+)\]\]/, "$1");
			if (window.confirm('您即将离开此组：\n' + g_name + '\n是否确定？')) {
				$J.post(url_post, {
					action: "leave_group",
					ajax: "1",
					sessionid: g_sessionID,
					steamid: g_steamID,
					"steamids[]": g_id,
				}, function (response) {
					if (response.success === true) {
						$J("#group-gid").val("已退出 " + $J("#group-gid").val());
					} else if (response.success === false) {
						$J("#group-gid").val("退出失败 " + $J("#group-gid").val());
					} else {
						$J("#group-gid").val("超时或脚本地址失效 " + $J("#group-gid").val());
					}
				});
			}
		});
	}

	/**事件绑定 */
	function eventBinding() {
		$J(".group_block").click(function () {
			$J(this).toggleClass("group-selected");
		});
		$J("#leave-gid").click(leaveGidClick);
		$J("#leave-selected").click(leaveSelectedClick);
		$J("#leave-all").click(leaveAllClick);
	}

	/**生成CSS */
	function buildUI() {
		$J('head').append(`
<style>
	#group-gid {
		border-radius: 3px;
		border: 1px solid rgba(0, 0, 0, 0.3);
		box-shadow: 1px 1px 0px rgba(255, 255, 255, 0.2);
		color: #fff;
		outline: none;
		height: 24px;
		width: 250px;
		padding: 0px 6px;
		margin: 5px;
		background-color: #274e68;
	}

	.lsg-btn {
		margin-right: 20px;
	}

	.group_block:hover {
		background-color: rgba(255, 255, 255, 0.4);
	}

	.group-selected {
		background-color: rgba(255, 255, 255, 0.4);
	}

	.group-leaved {
		background-color: rgba(0, 255, 0, 0.2);
	}

	.group-error {
		background-color: rgba(255, 0, 0, 0.4);
	}
</style>`
		);

		$J(".title_bar").after(`
<div style="margin-top:10px">
	<input id="group-gid" type="text" placeholder="输入组地址名或组gid">
	<a id="leave-gid" class="btnv6_blue_hoverfade btn_small lsg-btn"><span>退出此组</span></a>
	<a id="leave-selected" class="btnv6_blue_hoverfade btn_small lsg-btn"><span>退出所选组</span></a>
	<a id="leave-all" class="btnv6_blue_hoverfade btn_small lsg-btn"><span>退出所有组</span></a>
	<a id="feedback" class="btnv6_blue_hoverfade btn_small lsg-btn" href="https://steamcn.com/t215640-1-1" target="_blank"><span>反馈</span></a>
</div>
		`);
	}
})();
/*eslint-env greasemonkey */
/*global g_sessionID,g_steamID */