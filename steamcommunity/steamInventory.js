// ==UserScript==

// @name        steam仓库

// @namespace   https://git.oschina.net/abc45628/steam-low-price

// @version     0.1

// @author      abc45628

// @description steam仓库

// @supportURL  https://git.oschina.net/abc45628/steam-low-price/issues

// @include     /^https?:\/\/steamcommunity\.com\/.*\/inventory/

// @license     MIT

// @run-at      document-end

// ==/UserScript==


var $J=unsafeWindow.$J;
var user64=document.URL.match('[0-9]{4,}')[0];//steam 64位id

var cards=[
  //card的模板

  //var	assetid;//每张卡的标识,多个assetid可能对应同一个classid,多个classid对应同一个app

  //var classid;//每张卡的名字

  //var market_hash_name;//查市场价格用到

  //var appid;//游戏的app

];
var items={"cards":cards,"last_assetid":undefined,"total_inventory_count":undefined};
var getInvData_progress=false;
var loadCount=0;//重试加载仓库数据的次数


/**得到仓库数据

*  start_assetid   每张卡都有一个assetid，就算是2张相同的卡，assetid都会不同*/
function getInventoryData(start_assetid){
  if(getInvData_progress){ return; }
  var inv_url='//steamcommunity.com/inventory/'+user64+'/753/6';
  var params = {
    l: 'schinese',
    count: 25//请求的物品数量

  };
  if(start_assetid){
    params.start_assetid=start_assetid;
  }
  getInvData_progress=true;
  setTimeout(function(){
    $J.get( inv_url, params).done(function(data){
      var assets=data.assets;
      var descriptions=data.descriptions;
      var desc_used=0;
      for(var i=0;i<assets.length;i++){
        var asset=assets[i];
        var card={};
        card.assetid=asset.assetid;
        for(;asset.classid !== descriptions[desc_used].classid;){desc_used++;}
        card.market_hash_name=descriptions[desc_used].market_hash_name;
        //宝珠没有appid

        var appid=card.market_hash_name.match('[0-9]{6,}');
        if(appid){card.appid=appid[0];}
        cards.push(card);
      }
      items.last_assetid=data.last_assetid;
      items.total_inventory_count=data.total_inventory_count;
      // console.log("length="+cards.length);

      getInvData_progress=false;
      loadCount=0;
      console.log("仓库数据");
      console.log(data);
      console.log(cards);
    }).error(function(){
      loadCount++;
      getInvData_progress=false;
      getInventoryData(start_assetid);
      console.log("仓库数据加载出错");
    });
  },1000*(loadCount+1));
}

function addUI(){
  // 插入出售按钮

  var sell_btn=document.createElement('div');
  sell_btn.innerHTML='<a id="sce_page" target="_blank" class="item_market_action_button item_market_action_button_green">'
    +'<span class="item_market_action_button_edge item_market_action_button_left"></span>'
    +'<span class="item_market_action_button_contents">steamcardexchange页面</span>'
    +'<span class="item_market_action_button_edge item_market_action_button_right"></span>'+'<span class="item_market_action_button_preload"></span></a>';
  document.querySelector('.inventory_page_right').appendChild(sell_btn);

  document.addEventListener('click',function (ev){
    var evt=ev.target;
    // 点击卡片

    if (evt.className === 'inventory_item_link') {

      console.log("hash"+evt.hash);
      clickCard(evt.hash);
    }
    //点击下一页

    else if(evt.id === 'pagebtn_next'){
      var cur_page=document.querySelector('#pagecontrol_cur').textContent;
      if(cards.length<items.total_inventory_count && cards.length-cur_page*25<=50){
        console.log("cur_page="+cur_page);
        getInventoryData(items.last_assetid);
      }
    }
  });
  console.log("addUI finish");
}

// 点击卡片

function clickCard(url){

  document.querySelector("#sce_page .item_market_action_button_contents").textContent="steamcardexchange页面";
  var asset=url.split('_');
  //卡片、宝珠、表情、背景的context_id=6，礼物context_id=1

  if(asset[1]!=6){ return ;}
  for(var i=0;i<cards.length;i++){
    var _card=cards[i];
    if(asset[2] == _card.assetid){
      if(_card.market_hash_name == "753-Gems"){return;}
      var item_actions=document.querySelectorAll(".item_market_actions");
      Array.prototype.forEach.call(
        item_actions,
        function(e){e.firstChild.firstChild.firstChild.target="_blank";});

        
        
      //steamcardexchange页面

      document.querySelector("#sce_page").href="http://www.steamcardexchange.net/index.php?gamepage-appid-"+_card.appid;
      document.querySelector("#sce_page .item_market_action_button_contents").textContent=_card.market_hash_name;
    }
  }
}

getInventoryData();
addUI();
// console.log("finish");