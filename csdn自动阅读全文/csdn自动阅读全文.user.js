// ==UserScript==
// @name         csdn自动阅读全文
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @updateURL    https://gitee.com/abc45628/userscript/raw/master/csdn自动阅读全文/csdn自动阅读全文.user.js
// @match        http*://blog.csdn.net/*/article/details/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  $('#btn-readmore').click();
})();