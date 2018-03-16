// ==UserScript==
// @name         必应翻译自动选简中
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.bing.com/translator/?mkt=zh-CN
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var options=document.querySelector('select#t_tl').options;
    for(var i=0;i<options.length;i++){
        let o=options[i];
        if(o.text==='简体中文'){
            o.selected=true
            break;
        }
    }
})();