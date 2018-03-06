// ==UserScript==
// @name         csdn自动阅读全文
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://blog.csdn.net/*/article/details/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  var btn = document.getElementsByClassName("btn btn-large btn-gray-fred read_more_btn");
  if (btn && btn.length == 1) {
    btn[0].click();
  }
})();