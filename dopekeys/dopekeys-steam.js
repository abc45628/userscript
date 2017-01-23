// ==UserScript==
// @name         dopekeys-steam
// @namespace    https://git.oschina.net/abc45628/userscript/dopekeys/dopekeys-steam
// @version      0.1
// @author       abc45628
// @description  dopekeys的steam组验证任务自动重试
// @match        dopekeys.com/giveaway/*
// @supportURL   https://git.oschina.net/abc45628/userscript/issues
// @run-at       document-end
// ==/UserScript==
var task_not_finish=[];

function addUI(){
  console.log("start");

  var not_finish_btn=$(".btn-verify.steam:not(.disabled)");
  for(var i=0;i<not_finish_btn.length;i++){
    var task={};
    task.action = not_finish_btn.get(i).getAttribute("data-action");
    task.target = not_finish_btn.get(i).getAttribute('data-target');
    task.tid    = not_finish_btn.get(i).getAttribute('data-id');
    task.pid    = not_finish_btn.get(i).getAttribute('data-event');
    task.try_time=0;
    task.interval=-1;
    task_not_finish.push(task);

    var mytaskbutton=document.createElement("button");
    mytaskbutton.id="mytaskbutton"+i;
    mytaskbutton.textContent="任务"+i;
    mytaskbutton.addEventListener("click",function(){
      var _this=this;
      var id=_this.id.substring(12);
      var task=task_not_finish[id];
      click_and_click(task,_this);
      task.interval=setInterval(function(){
        click_and_click(task,_this);
      },5000);

    });

    not_finish_btn.get(i).after(mytaskbutton);
  }
  console.log("end");
}

function click_and_click(task,_this,interval){
  $.ajax({
    url: "http://dopekeys.com/wp-content/themes/zerif-lite-child/steam-api.php",
    type: 'POST',
    timeout: 4500,
    data: {
      action: task.action,
      target: task.target,
      tid :   task.tid,
      pid :   task.pid
    },
    error: function() {
      _this.textContent="失败次数" + (++task.try_time);
      if(task.try_time==50){clearInterval(task.interval);}
    },
    success: function(respond) {
      if(respond.data.q_result){
        clearInterval(task.interval);
        $(_this).parents('.panel').find(".panel-heading a").addClass('done');
        $(_this).addClass('disabled');
        _this.textContent=(++task.try_time)+"次成功";
      }else if(respond.MsgCode == '-1'){
        clearInterval(task.interval);
        alert("还没有登录steam");
      }else{
        _this.textContent="失败次数" + (++task.try_time);
        if(task.try_time==50){clearInterval(task.interval);}
      }
    }
  });
}

addUI();