// ==UserScript==
// @name         新浪博客flash提示
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       You
// @match        http://blog.sina.com.cn/s/*.html
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log(window);

    var timeAll=0;
    var timeGap=300;
    var time=setInterval(function(timeAll){
        if(timeAll>60000){
            clearInterval(time);
        }
        var btn=document.querySelector('p.CP_w_btns_Mid cite');
        if(btn){
            btn.click();
            clearInterval(time);
        }
        timeAll+=timeGap;
    },timeGap);


})();