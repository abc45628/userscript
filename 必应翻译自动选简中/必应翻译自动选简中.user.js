// ==UserScript==
// @name         必应翻译自动选简中
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://cn.bing.com/translator/?mkt=zh-CN
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  //选简中
  sel_right_text('简体中文');

  //右侧英文按钮
  var sel = document.querySelectorAll('.t_select')[1];
  var eng_right = document.createElement('input');
  eng_right.classList = ['ttl_histbtn'];
  eng_right.value = '英语';
  eng_right.type = 'button';
  eng_right.placeholder = 'en';
  eng_right.onclick = function () { sel_right_text('英语'); 重新翻译() };
  sel.appendChild(eng_right);
  //右侧中文按钮
  var cn_right = document.createElement('input');
  cn_right.classList = ['ttl_histbtn'];
  cn_right.value = '简体中文';
  cn_right.type = 'button';
  cn_right.placeholder = 'en';
  cn_right.onclick = function () { sel_right_text('简体中文'); 重新翻译() };
  sel.appendChild(cn_right);
})();

function sel_right_text(text) {
  var options_right = document.querySelector('select#t_tl').options;
  for (var i = 0; i < options_right.length; i++) {
    let o = options_right[i];
    if (o.text === text) {
      o.selected = true;
      break;
    }
  }
}

function 重新翻译() { 
  var TranslatorWebTelemetry;
  (function (n) {
    var i = function () {
      function n() { }
      return n.init = function (i) {
        i == null || i.isMtr || i.cfg == null || (n.ctx = i, n.enabled = !0, n.enabled && !n.initialized && (n.initialized = !0, n.ariaLogger = AriaTelemetry.getLogger(i.cfg.AriaTenantToken)), n.log(t.Diag_Event, "Diag_Events", { EdgeRef: i.eref }))
      },
        n.logClicked = function (t, i, r, u) {
          i != null && (u = u || {}, u.T = i, r != null && (u.S = r)); n.log(t, "Clicked_Events", u)
        },
        n.logValue = function (t, i, r, u) {
          u = u || {}; u.N = i; u.V = r; n.log(t, "Value_Events", u)
        },
        n.logDiag = function (i, r) {
          r = r || {}; r.MSG = i; n.log(t.Diag_Event, t[t.Diag_Event], r)
        },
        n.logPageView = function (i, r) {
          r = r || {}; r.MSG = i; r.IG = n.ctx.ig; n.log(t.PageView_Event, t[t.PageView_Event], r)
        },
        n.logEvent = function (i, r, u) {
          u = u || {}; u.MSG = r; n.log(i, t[i], u)
        },
        n.log = function (i, r, u) {
          if (n.enabled && n.ariaLogger != null) {
            var f = n.ctx, o = f.cfg, s = f.ig, h = f.sid, c = f.tid, l = f.muid, a = f.f, v = f.mkt, y = f.b, p = f.vs, w = f.exFdHeaders,
              e = {
                eventType: "Client_Events", name: r || "", properties: {
                  ENV: { value: o.Environment || "" },
                  SC: { value: r }, IG: { value: s || "" }, SID: { value: h || "" }, TID: { value: c || "" }, MUID: { value: l || "" }, F: { value: a || "" }, MKT: { value: v || "" }, B: { value: y || "" }
                }
              }; n.addValuesToDictionary(e, u); n.addValuesToDictionary(e, p); n.addValuesToDictionary(e, w); n.ariaLogger.logEvent(e)
          }
        },
        n.addValuesToDictionary = function (n, t) {
          var i, r, u, f; if (t != null) for (i = 0, r = Object.getOwnPropertyNames(t); i < r.length; i++)u = r[i], f = t[u], n.properties[u] = { value: f != null ? f : "" }
        },
        n.translatorSourceName = "Translator", n.ariaLogger = null, n.enabled = !1, n.initialized = !1, n
    }(), t;
    n.WebTelemetry = i,
      function (n) {
        n[n.Error_Event = -1] = "Error_Event"; n[n.PageView_Event = 0] = "PageView_Event"; n[n.Translation_Event = 1] = "Translation_Event";
        n[n.Audio_Event = 2] = "Audio_Event"; n[n.Captcha_Event = 3] = "Captcha_Event"; n[n.Dictionary_Event = 4] = "Dictionary_Event";
        n[n.Language_Event = 5] = "Language_Event"; n[n.UXEngagement_Event = 6] = "UXEngagement_Event"; n[n.Diag_Event = 999] = "Diag_Event"
      }(t = n.EventScope || (n.EventScope = {}))
  })(TranslatorWebTelemetry || (TranslatorWebTelemetry = {}));

  Translator.init("(已检测)", "抱歉，出错了。", "自动检测", "ltr",
    "ar,bg,ca,cs,da,de,el,en,es,fi,fr,he,hi,hr,hu,id,it,ja,ko,ms,nl,no,pl,pt,ro,ru,sk,sl,sv,ta,th,vi,yue,zh-CHS,zh-CHT,zh-Hans,zh-Hant",
    5000, "false", "true", "false", "false", true, false, ["b_focusTextMedium", "b_focusTextSmall", "b_secondaryFocus"], true, "_TTSS_IN", "_TTSS_OUT",
    "/ttranslate?", "/tdetect?", "/tspeak?", "/ttransliterate?", "/translator/?ref=TThis", "/taddtranslation?", "/ttranslationlookup?", "/tdialectInfo?",
    2, false, "男", "女", "语言选项", "选择语言", "translator.5035", "“{0}”的译文", "复制", "已复制!", "无法复制到剪贴板!", "翻译文本", "已复制翻译文本",
    {
    }, "https://ssl.microsofttranslator.com/bv.aspx?from={0}\u0026to={1}\u0026a={2}", true, true, "/tfetchcaptcha?", {}, "试一下", "不是{0}? 试试", true, "", false);

}