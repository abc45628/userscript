// ==UserScript==
// @name         公需课答题
// @namespace    http://tampermonkey.net/
// @version      0.21
// @description  try to take over the world!
// @author       You
// @match        http://ggfw.gdhrss.gov.cn/zxpx/auc/play/player*
// @updateURL    https://gitee.com/abc45628/userscript/raw/master/公需课答题.user.js
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  let timuTextOld = '';
  /**检查题目 */
  function checkQuestion() {
    let timuText = $('#timu').text();
    if (!timuText) {
      console.log("没题目,继续播放");
      play();
      return;
    }
    if (timuTextOld === timuText) {
      console.log("同一题目");
      return;
    }
    console.log("题目" + timuText);
    timuTextOld = timuText;
    $("input[name='panduan'][value='1']").click();
    console.log('提交答案');
    subAnswer();
    checkAnswer();
  }
  /**检查回答情况 */
  function checkAnswer() {
    let answerInterval = setInterval(function () {
      var text = $('.messager-body').text();
      console.log(text);
      if (text.length > 3) {
        clearInterval(answerInterval);
        $(".dialog-button a span span").click();//点击提示答案正确还是错误的弹窗的确认键
        play();
        console.log("再次播放");
      }
    }, 1000);
  }
  /**自动播放下一个 */
  function playNext() {
    let next = $("#contentList a[href^='javaScript:my']")[0];
    if (!next) { console.log('没有未完成或者未开始的视频，专题结束,需要手动跳下一个专题'); return; }
    next.click();
  }
  /**得到播放器的状态 */
  function getStatus() {
    return p.getStatus();
  }
  function play() {
    p.play();
  }
  /**检查播放状态 */
  function checkPlaying() {
    setInterval(function () {
      if ('init' == getStatus()) {
        console.log('初始化，自动播放');
        play();
      } else if ('pause' == getStatus()) {
        console.log('播放暂停了');
        checkQuestion();
      } else if ('ended' == getStatus()) {
        console.log('本视频结束');
        playNext();
      }
    }, 1000);
  }
  function init() {
    checkPlaying();
  }
  init();
})();