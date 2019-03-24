// ==UserScript==
// @name         csdn自动阅读全文
// @namespace    https://github.com/abc45628/userscript
// @version      2019.3.24.1
// @updateURL    https://github.com/abc45628/userscript/raw/master/csdn自动阅读全文/csdn自动阅读全文.user.js
// @match        http*://blog.csdn.net/*/article/details/*
// @match        https://bbs.csdn.net/topics/*
// @match        https://*.iteye.com/blog/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  //正文部分阅读更多
  $(document.querySelector('#btn-readmore')).click()
  //下方登录注册浮层
  $('.btn-close').click();
    $('.btn-close-ad').click();
    //左侧猿学习
    $('.fourth_column').remove();
    //CSDN论坛阅读全文
    $(".js_show_topic").click();
})();