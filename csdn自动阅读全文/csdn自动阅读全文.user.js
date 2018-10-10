// ==UserScript==
// @name         csdn自动阅读全文
// @namespace    https://gitee.com/abc45628/userscript
// @version      2018.10.11.1
// @updateURL    https://gitee.com/abc45628/userscript/raw/master/csdn自动阅读全文/csdn自动阅读全文.user.js
// @match        http*://blog.csdn.net/*/article/details/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  //正文部分阅读更多
  $('#btn-readmore').click();
  //下方登录注册浮层
  $('.btn-close').click();
})();