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
        console.log(1);
        o.selected = true;
        document.getElementById('t_sv').focus();

        Translator.init(
          "(已检测)", "抱歉，出错了。", "自动检测", "ltr",
          "ar,bg,ca,cs,da,de,el,en,es,fi,fr,he,hi,hr,hu,id,it,ja,ko,ms,nl,no,pl,pt,ro,ru,sk,sl,sv,ta,th,vi,yue,zh-CHS,zh-CHT,zh-Hans,zh-Hant", 5000, "false", "true", "false", "false", true, false, ["b_focusTextMedium", "b_focusTextSmall", "b_secondaryFocus"], true, "_TTSS_IN", "_TTSS_OUT", "/ttranslate?", "/tdetect?", "/tspeak?", "/ttransliterate?", "/translator/?ref=TThis", "/taddtranslation?", "/ttranslationlookup?", "/tdialectInfo?", 2, false, "男", "女", "语言选项", "选择语言", "translator.5034", "“{0}”的译文", "复制", "已复制!", "无法复制到剪贴板!", "翻译文本", "已复制翻译文本", {
            "mww": {
              "Item1": "https://www.microsoft.com/translator/community.aspx#Hmong",
              "Item2": "与 苗语语言合作伙伴 合作"
            },
            "ur": {
              "Item1": "https://www.microsoft.com/translator/community.aspx#JNU",
              "Item2": "与 JNU 合作"
            },
            "tlh-Qaak": {
              "Item1": "https://www.microsoft.com/translator/community.aspx#Klingon",
              "Item2": "与 CBS、Paramount 和 KLI 合作"
            },
            "tlh": {
              "Item1": "https://www.microsoft.com/translator/community.aspx#Klingon",
              "Item2": "与 CBS、Paramount 和 KLI 合作"
            },
            "lv": {
              "Item1": "https://www.microsoft.com/translator/community.aspx#Tilde",
              "Item2": "与 Tilde 合作"
            },
            "yua": {
              "Item1": "https://www.microsoft.com/translator/community.aspx#Maya",
              "Item2": "与 金塔纳罗奥州玛雅文化大学 合作"
            },
            "otq": {
              "Item1": "https://www.microsoft.com/translator/community.aspx#Otomi",
              "Item2": "与 克雷塔罗州政府 合作"
            },
            "cy": {
              "Item1": "https://www.microsoft.com/translator/community.aspx#NationalAssembly",
              "Item2": "与 威尔士国民议会 合作"
            },
            "sw": {
              "Item1": "https://www.microsoft.com/translator/community.aspx#Kiswahili",
              "Item2": "与 没有限制的翻译 合作"
            },
            "sw-TZ": {
              "Item1": "https://www.microsoft.com/translator/community.aspx#Kiswahili",
              "Item2": "与 没有限制的翻译 合作"
            }
          },
          "https://ssl.microsofttranslator.com/bv.aspx?from={0}\u0026to={1}\u0026a={2}", true, true, "/tfetchcaptcha?", {}, "试一下", "不是{0}? 试试", true, false);
        break;
      }
    }
  });
})();