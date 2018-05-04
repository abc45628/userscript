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
  var TranslatorWebTelemetry, translatorTel;
  (function (n) {
    var i = function () {
      function n() { }
      return n.init = function (i) { i == null || i.isMtr || i.cfg == null || (n.ctx = i, n.enabled = !0, n.enabled && !n.initialized && (n.initialized = !0, n.ariaLogger = AriaTelemetry.getLogger(i.cfg.AriaTenantToken)), n.log(t.Diag_Event, "Diag_Events", { EdgeRef: i.eref })) }, n.logClicked = function (t, i, r, u) { i != null && (u = u || {}, u.T = i, r != null && (u.S = r)); n.log(t, "Clicked_Events", u) }, n.logValue = function (t, i, r, u) { u = u || {}; u.N = i; u.V = r; n.log(t, "Value_Events", u) }, n.logDiag = function (i, r) { r = r || {}; r.MSG = i; n.log(t.Diag_Event, t[t.Diag_Event], r) }, n.logPageView = function (i, r) { r = r || {}; r.MSG = i; r.IG = n.ctx.ig; n.log(t.PageView_Event, t[t.PageView_Event], r) }, n.logEvent = function (i, r, u) { u = u || {}; u.MSG = r; n.log(i, t[i], u) }, n.log = function (i, r, u) { if (n.enabled && n.ariaLogger != null) { var f = n.ctx, o = f.cfg, s = f.ig, h = f.sid, c = f.tid, l = f.muid, a = f.f, v = f.mkt, y = f.b, p = f.vs, w = f.exFdHeaders, e = { eventType: "Client_Events", name: r || "", properties: { ENV: { value: o.Environment || "" }, SC: { value: r }, IG: { value: s || "" }, SID: { value: h || "" }, TID: { value: c || "" }, MUID: { value: l || "" }, F: { value: a || "" }, MKT: { value: v || "" }, B: { value: y || "" } } }; n.addValuesToDictionary(e, u); n.addValuesToDictionary(e, p); n.addValuesToDictionary(e, w); n.ariaLogger.logEvent(e) } }, n.addValuesToDictionary = function (n, t) { var i, r, u, f; if (t != null) for (i = 0, r = Object.getOwnPropertyNames(t); i < r.length; i++)u = r[i], f = t[u], n.properties[u] = { value: f != null ? f : "" } }, n.translatorSourceName = "Translator", n.ariaLogger = null, n.enabled = !1, n.initialized = !1, n
    }(), t; n.WebTelemetry = i, function (n) { n[n.Error_Event = -1] = "Error_Event"; n[n.PageView_Event = 0] = "PageView_Event"; n[n.Translation_Event = 1] = "Translation_Event"; n[n.Audio_Event = 2] = "Audio_Event"; n[n.Captcha_Event = 3] = "Captcha_Event"; n[n.Dictionary_Event = 4] = "Dictionary_Event"; n[n.Language_Event = 5] = "Language_Event"; n[n.UXEngagement_Event = 6] = "UXEngagement_Event"; n[n.Diag_Event = 999] = "Diag_Event" }(t = n.EventScope || (n.EventScope = {}))
  })(TranslatorWebTelemetry || (TranslatorWebTelemetry = {}));

  translatorTel = TranslatorWebTelemetry.WebTelemetry;
  var TranslatorHistory;

  (function (n) {
    function f(n) {
      for (var u, e, f, r = sj_et(n), o = t[1].options, s = r.getAttribute("placeholder").toString(), i = 0; i < o.length; i++)
        if (u = t[1][i].value, u === s) {
          e = t[1][t[1].selectedIndex].text; f = t[1][t[1].selectedIndex].value; t[1].selectedIndex = i;
          TranslatorCookies.swapLanguageHistory(f, u, 1); r.setAttribute("value", e); r.setAttribute("placeholder", f); Translator.lastTargetLangIndex = i;
          Translator.langChanged(1); translatorTel.logEvent(TranslatorWebTelemetry.EventScope.UXEngagement_Event, "input history clicked", { ux_action: "InputHistoryButtonClicked" }); break
        }
    } function e(n) { for (var r, e, u, f = sj_et(n), s = t[0].options, h = f.getAttribute("placeholder").toString(), i = 0; i < s.length; i++)if (r = t[0][i].value, r === h) { e = t[0][t[0].selectedIndex].text; u = t[0][t[0].selectedIndex].value; t[0].selectedIndex = i; u == "auto-detect" ? (TranslatorCookies.removeLanguagefromHistory(r, 0), o(r, 0)) : (TranslatorCookies.swapLanguageHistory(u, r, 0), f.setAttribute("value", e), f.setAttribute("placeholder", u)); Translator.lastSourceLangIndex = i; Translator.langChanged(0); translatorTel.logEvent(TranslatorWebTelemetry.EventScope.UXEngagement_Event, "output history clicked", { ux_action: "OutputtHistoryButtonClicked" }); break } } function u(n, t, i, r) { var u = sj_ce("input"), f; u.className = "ttl_histbtn"; u.setAttribute("value", n); u.setAttribute("type", "button"); u.placeholder = t; sj_be(u, "click", r); f = _ge(i); f && f.insertBefore(u, f.firstChild) } function o(n, t) { for (var i, e = r[t], f = _ge(e).querySelectorAll(".ttl_histbtn"), u = 0; u < f.length; u++)i = f[u], i.placeholder === n && i.parentNode.removeChild(i) } function s(n, i) { var c = n === 0 ? TranslatorCookies.inputLangList : TranslatorCookies.outputLangList, l = n === 0 ? e : f, a = t[n][i].text, s = t[n][i].value, h = t[n][t[n].selectedIndex].value; (c.indexOf(h) > -1 && (TranslatorCookies.removeLanguagefromHistory(h, n), o(h, n)), s != "auto-detect") && (TranslatorCookies.addLanguagetoHistory(s, n), u(a, s, r[n], l)) } function i(n, i) { for (var u = t[i], f = u.length, r = 0; r < f; r++)if (u[r].value == n) return u[r].text } function h() { var s = 0, h, n, o, c; if (TranslatorCookies.inputLangList && TranslatorCookies.inputLangList.length > 0) for (s = TranslatorCookies.inputLangList.length, h = TranslatorCookies.inputLangList.slice(), o = 0; o < s; o++) { if (n = h[o], n === "auto-detect" || n === t[0].value || i(n, 0) === undefined) { TranslatorCookies.removeLanguagefromHistory(n, 0); continue } c = i(n, 0); u(c, n, r[0], e) } if (TranslatorCookies.outputLangList && TranslatorCookies.outputLangList.length > 0) for (s = TranslatorCookies.outputLangList.length, h = TranslatorCookies.outputLangList.slice(), o = 0; o < s; o++) { if (n = h[o], n === t[1].value || i(n, 0) === undefined) { TranslatorCookies.removeLanguagefromHistory(n, 1); continue } c = i(n, 1); u(c, n, r[1], f) } } var t = [_ge("t_sl"), _ge("t_tl")], r = ["t_topselinput", "t_topseloutput"]; n.toggleOutputSelection = f; n.toggleInputSelection = e; n.getNewButton = u; n.removeButton = o; n.updateHistory = s; n.getLanguageFromCode = i; n.initializeHistory = h
  })(TranslatorHistory || (TranslatorHistory = {}));

  var TranslatorCookies;
  (function (n) {
    function t(n) { return !(n && typeof n == "string" && n.length > 0) } function f(n, i) {
      var r; return t(n) ? !1 : (o() ? (sj_cook.set(n, e, i, !0, "/"), r = !0) : r = !1, r)
    } function h(n) { return t(n) ? null : u ? sj_cook.get(n, e) : null } function l(n) { var i; return t(n) ? !1 : (o() ? (sj_cook.clear(n, "/"), i = !0) : i = !1, i) } function o() { return typeof u == "undefined" && (u = typeof sj_cook != "undefined" && "areCookiesAccessible" in sj_cook && sj_cook.areCookiesAccessible()), u } function c(n) { var i = h(n); if (t(i)) return []; try { return JSON.parse(i) } catch (r) { } return [] } function a(t, u) { var e = u === 0 ? n.inputLangList : n.outputLangList, l = u === 0 ? i : r, o, h, c; o = e.indexOf(t, -1); o == -1 ? (e.length >= s && (h = e.shift(), TranslatorHistory.removeButton(h, u)), e.push(t)) : (c = e.splice(o, 1), TranslatorHistory.removeButton(c[0], u), e.push(t)); f(l, JSON.stringify(e)) } function v(t, u) { var e = u === 0 ? n.inputLangList : n.outputLangList, s = u === 0 ? i : r, o = e.indexOf(t), h; o !== -1 && (h = e.splice(o, 1), f(s, JSON.stringify(e))) } function y(t, u, e) { var o = e === 0 ? n.inputLangList : n.outputLangList, h = e === 0 ? i : r, s = o.indexOf(u), c; s === -1 ? o.push(t) : (c = o.splice(s, 1), o.push(t)); f(h, JSON.stringify(o)) } function p(f, e, o) { return t(f) || t(e) ? (u = !1, !1) : (i = f, r = e, s = o, n.inputLangList = c(i), n.outputLangList = c(r), !0) } var i, r, s = 2, u, e; n.inputLangList = []; n.outputLangList = []; e = "hist"; n.setItem = f; n.getItem = h; n.removeItem = l; n.isSupported = o; n.addLanguagetoHistory = a; n.removeLanguagefromHistory = v; n.swapLanguageHistory = y; n.initStorage = p
  })(TranslatorCookies || (TranslatorCookies = {}));

  Translator.init("(已检测)", "抱歉，出错了。", "自动检测", "ltr", "ar,bg,ca,cs,da,de,el,en,es,fi,fr,he,hi,hr,hu,id,it,ja,ko,ms,nl,no,pl,pt,ro,ru,sk,sl,sv,ta,th,vi,yue,zh-CHS,zh-CHT,zh-Hans,zh-Hant", 5000, "false", "true", "false", "false", true, false, ["b_focusTextMedium", "b_focusTextSmall", "b_secondaryFocus"], true, "_TTSS_IN", "_TTSS_OUT", "/ttranslate?", "/tdetect?", "/tspeak?", "/ttransliterate?", "/translator/?ref=TThis", "/taddtranslation?", "/ttranslationlookup?", "/tdialectInfo?", 2, false, "男", "女", "语言选项", "选择语言", "translator.5035", "“{0}”的译文", "复制", "已复制!", "无法复制到剪贴板!", "翻译文本", "已复制翻译文本",
    {
      "mww": { "Item1": "https://www.microsoft.com/translator/community.aspx#Hmong", "Item2": "与 苗语语言合作伙伴 合作" },
      "ur": { "Item1": "https://www.microsoft.com/translator/community.aspx#JNU", "Item2": "与 JNU 合作" },
      "tlh-Qaak": { "Item1": "https://www.microsoft.com/translator/community.aspx#Klingon", "Item2": "与 CBS、Paramount 和 KLI 合作" }, "tlh": { "Item1": "https://www.microsoft.com/translator/community.aspx#Klingon", "Item2": "与 CBS、Paramount 和 KLI 合作" }, "lv": { "Item1": "https://www.microsoft.com/translator/community.aspx#Tilde", "Item2": "与 Tilde 合作" }, "yua": { "Item1": "https://www.microsoft.com/translator/community.aspx#Maya", "Item2": "与 金塔纳罗奥州玛雅文化大学 合作" }, "otq": { "Item1": "https://www.microsoft.com/translator/community.aspx#Otomi", "Item2": "与 克雷塔罗州政府 合作" }, "cy": { "Item1": "https://www.microsoft.com/translator/community.aspx#NationalAssembly", "Item2": "与 威尔士国民议会 合作" }, "sw": { "Item1": "https://www.microsoft.com/translator/community.aspx#Kiswahili", "Item2": "与 没有限制的翻译 合作" }, "sw-TZ": { "Item1": "https://www.microsoft.com/translator/community.aspx#Kiswahili", "Item2": "与 没有限制的翻译 合作" }
    }, "https://ssl.microsofttranslator.com/bv.aspx?from={0}\u0026to={1}\u0026a={2}", true, true, "/tfetchcaptcha?", {}, "试一下", "不是{0}? 试试", true, "", false); TranslatorWebTelemetry.WebTelemetry.init({ "cfg": { "Environment": "PROD", "AriaTenantToken": "d879874b8af64ade870a511d929143a4-fd189480-f4c0-433e-b476-4e3d8a1f5591-7085", "LogVariantsExactly": ["browser", "client", "column", "ms", "uilang"] }, "ig": "F5FCF750CDDD49638D84AD8713F10181", "sid": "19F52BF0A48C6624300C2015A5A26701", "tid": "D9522CA74F9F47DC8999222A72D5D730", "muid": "0742D5488DA060122A11DE1289A063E3", "f": null, "isMtr": false, "mkt": "zh-cn", "b": "chrome", "eref": "Ref A: D9522CA74F9F47DC8999222A72D5D730 Ref B: BJ1EDGE0311 Ref C: 2018-05-04T13:30:57Z", "vs": { "BROWSER": "CHROME", "MS": "0", "UILANG": "ZH" }, "exFdHeaders": { "TrafficType": "Untagged", "FlightId": "0", "IsMobile": "False", "Referrer": "" } });; var Identity = Identity || {}; (function (i) { i.wlImgSm = "https://storage.live.com/users/0x{0}/myprofile/expressionprofile/profilephoto:UserTileStatic/p?ck=1\u0026ex=720\u0026fofoff=1\u0026sid=19F52BF0A48C6624300C2015A5A26701"; i.wlImgLg = "https://storage.live.com/users/0x{0}/myprofile/expressionprofile/profilephoto:UserTileMedium/p?ck=1\u0026ex=720\u0026fofoff=1\u0026sid=19F52BF0A48C6624300C2015A5A26701"; i.popupLoginUrls = { "WindowsLiveId": "https://login.live.com/login.srf?wa=wsignin1.0\u0026rpsnv=11\u0026ct=1525440658\u0026rver=6.0.5286.0\u0026wp=MBI\u0026wreply=https:%2F%2fcn.bing.com%2Fsecure%2FPassport.aspx%3Fpopup%3D1%26ssl%3D1\u0026lc=2052\u0026id=264960" }; })(Identity);;

  var sch = sch || {};

  (function () {
    function u() {
      window._H && window._H.feature === "cnt" && window._H.cntqs && window.localStorage && !localStorage.getItem(i) && (n.click(), localStorage.setItem(i, "1"))
    } var t = _ge("id_h"), n = _ge("id_sc"), i = "IsUu1stCnt", r = "click"; sj_evt.bind("onP1", function () { setTimeout(function () { t && n && (sj_jb("Blue/HamburgerServicesHeaderFlyout_c", 0, t, "mouseover", n, r, n, "focus"), sj_be(n, r, function (n) { sch.clk = n })); u() }, 50) }, 1)
  })();

  var CookieBanner;

  (function () {
    function n(r) {
      var f = r ? r : _w.event, u = sj_et(f);
      u != _ge("t_knowmore") && u != _ge("t_cookieInfo") && u != _d.body && (sj_cook.setNoCrumbs("MSCC", "1", !0, "/", i), t(!1), _w.Log && Log.Log && Log.Log("ClientCookieConsent", "CI", "compliance", !0, "successful consent"), sj_ue(_d, "click", n, !0), sj_ue(_d, "keypress", n, !0), sj_evt.fire("onCookieNotificationComplete"))
    } function t(n) { n ? sa_cl(_ge("t_cookieInfo"), "b_hide", !1) : sa_cl(_ge("t_cookieInfo"), "b_hide", !0) } function r() { sj_cook.get("MSCC") == null ? (t(!0), sb_st(function () { sj_be(_d, "click", n, !0); sj_be(_d, "keypress", n, !0) }, 0)) : sj_evt.fire("onCookieNotificationComplete") } var i = 561600; sj_evt.bind("onP1", function () { r() }, !0)
  })(CookieBanner || (CookieBanner = {}));

}