// ==UserScript==
// @name         必应翻译自动选简中
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.bing.com/translator/?mkt=zh-CN
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  var options = document.querySelector('select#t_tl').options;
  for (var i = 0; i < options.length; i++) {
    let o = options[i];
    if (o.text === '简体中文') {
      o.selected = true;
      break;
    }
  }
  var parent = document.querySelector('select#t_tl').parentElement;

  var div = document.createElement('div');
  div.innerHTML = '<input class="ttl_histbtn" value="英语" type="button" placeholder="en" data-bm="11">';
  div.style.display = 'inline';
  parent.appendChild(div);
  div.addEventListener('click', function (event) {
    var options = document.querySelector('select#t_tl').options;
    for (var i = 0; i < options.length; i++) {
      let o = options[i];
      if (o.text === '英语') {
        o.selected = true;
        break;
      }
    }
  });
})();