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

  var SvgIcon;

  (function (n) {
    function t(n, t) {
      for (var i, r, f = "data-loaded", o = ".actIconSvg." + n + ":not([" + f + "])", e = document.querySelectorAll(o), u = 0; u < e.length; u++)i = e[u], i.innerHTML = t, i.setAttribute(f, "1"), r = i.querySelector("svg"), r && (r.setAttribute("role", "presentation"), r.setAttribute("focusable", "false"))
    } n.load = t
  })(SvgIcon || (SvgIcon = {}));

  var SvgIcon;

  (function (n) {
    n.load("actShareSvgIcon", '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M12.391 17.57c1.187-0.516 2.419-0.906 3.695-1.172C17.361 16.133 18.666 16 20 16v6l11-11L20 0v6 c-1.292 0-2.534 0.167-3.726 0.499c-1.194 0.334-2.308 0.805-3.344 1.414c-1.037 0.61-1.979 1.339-2.828 2.188 c-0.85 0.849-1.579 1.792-2.188 2.828c-0.609 1.037-1.081 2.152-1.414 3.344C6.166 17.467 6 18.709 6 20v2 c0.916-0.947 1.914-1.794 2.993-2.539C10.071 18.716 11.204 18.086 12.391 17.57z M9.18 14.789 c0.422-0.869 0.938-1.677 1.547-2.422c0.609-0.744 1.302-1.408 2.078-1.992c0.775-0.584 1.617-1.063 2.523-1.438 c0.594-0.25 1.157-0.439 1.688-0.57c0.531-0.129 1.06-0.22 1.586-0.273c0.525-0.052 1.064-0.08 1.617-0.086 C20.771 8.003 21.364 8 22 8V4.828L28.172 11L22 17.172V14h-2c-2.104 0-4.151 0.297-6.141 0.89 c-1.99 0.594-3.859 1.475-5.609 2.641C8.448 16.573 8.758 15.659 9.18 14.789z M22 26H2V8H0v20h24v-6l-2 2V26z"/><\/svg>')
  })(SvgIcon || (SvgIcon = {}));

  var Lib;

  (function (n) {
    var t;

    (function (n) {

      function r(n, t) {
        var r, i; if (t == null || n == null) throw new TypeError("Null element passed to Lib.CssClass"); if (n.indexOf) return n.indexOf(t); for (r = n.length, i = 0; i < r; i++)if (n[i] === t) return i; return -1
      }
      function u(n, r) {
        if (n == null) throw new TypeError("Null element passed to Lib.CssClass"); i(n, r) || (t && n.classList ? n.classList.add(r) : n.className += " " + r)
      }
      function f(n, u) {
        if (n == null) throw new TypeError("Null element passed to Lib.CssClass"); if (i(n, u)) if (t && n.classList) n.classList.remove(u); else { var f = n.className.split(" "), e = r(f, u); e >= 0 && f.splice(e, 1); n.className = f.join(" ") }
      }
      function e(n, r) {
        if (n == null) throw new TypeError("Null element passed to Lib.CssClass"); t && n.classList ? n.classList.toggle(r) : i(n, r) ? f(n, r) : u(n, r)
      }
      function i(n, i) {
        if (n == null) throw new TypeError("Null element passed to Lib.CssClass"); if (t && n.classList) return n.classList.contains(i); if (n.className) { var u = n.className.split(" "); return r(u, i) >= 0 } return !1
      }
      function o(n, t) {
        var u, f, r, i; if (n.getElementsByClassName) return n.getElementsByClassName(t); for (u = n.getElementsByTagName("*"), f = [], r = 0; r < u.length; r++)i = u[r], i && i.className && i.className.indexOf(t) !== -1 && f.push(i); return f
      }
      var t = typeof document.body.classList != "undefined";
      n.add = u;
      n.remove = f;
      n.toggle = e;
      n.contains = i;
      n.getElementByClassName = o
    })(t = n.CssClass || (n.CssClass = {}))
  })(Lib || (Lib = {}));

  var SelectorHelper;
  (function (n) {
    function t(n, t) {
      var i, r; if (n.matches) return n.matches(t); if (n.webkitMatchesSelector) return n.webkitMatchesSelector(t);
      if (n.mozMatchesSelector) return n.mozMatchesSelector(t); if (n.msMatchesSelector) return n.msMatchesSelector(t); if (i = _d.querySelectorAll(t), i) for (r = 0; r < i.length; r++)if (i[r] === n) return !0; return !1
    }
    function i(n, i) { var r = n; do r = r.parentElement; while (r != null && !t(r, i)); return r }
    n.selectorMatches = t;
    n.findFirstAncestorWithSelector = i
  })(SelectorHelper || (SelectorHelper = {}));

  var AccessibilityHelpers;
  (function (n) {
    function u(n) {
      var r = i(n, t); r != null && r.focus()
    }
    function i(n, t) {
      var e = null, u, r, i, f; if (n && n.querySelectorAll) for (u = n.querySelectorAll(t), r = 0; r < u.length; r++)if (i = u.item(r), i && i.tabIndex != -1 && (f = window.getComputedStyle(i), f.display != "none" && f.visibility != "hidden")) { e = i; break } return e
    }
    function f(n) {
      var i = r(n, t); i != null && i.focus()
    }
    function r(n, t) {
      var h = null, e, r, u, f, i, o, s; if (_d.querySelectorAll && n) { for (e = _d.querySelectorAll(t), r = [], i = 0; i < e.length; i++)u = e.item(i), u && u.tabIndex != -1 && r.push(u); if (f = r.indexOf(n), typeof sj_log != "undefined" && sj_log("CI.MoveFocus", "Next", _d.activeElement.tagName + " " + f.toString()), f != -1) for (i = 0; i < r.length; i++)if (o = r[(f + i + 1) % r.length], s = window.getComputedStyle(o), s.display != "none" && s.visibility != "hidden") { h = o; break } } return h
    }
    function e(n, t, i) {
      n && t && typeof t.length == "number" && i && typeof i == "function" && (sj_be(n, "keydown", function (n) { for (var r = n.keyCode ? n.keyCode : n.charCode, i = 0; i < t.length; i++)if (r === t[i]) { sj_pd(n); break } }), sj_be(n, "keyup", function (n) { for (var u = n.keyCode ? n.keyCode : n.charCode, r = 0; r < t.length; r++)if (u === t[r]) { i(); sj_pd(n); break } }))
    }
    var t = "a[href], body, input, select, [tabindex]";
    n.focusFirstFocusableElementWithin = u;
    n.getFirstFocusableElementWithin = i;
    n.focusNextFocusableElement = f;
    n.getNextFocusableElement = r;
    n.activateButtonByKey = e
  })(AccessibilityHelpers || (AccessibilityHelpers = {}));
  BM.trigger();
  sj_evt.bind("ajax.feedback.initialized", function (args) {
    args[1].debugCollector.setContextValue("FederationDebugInfo", "QueryID : 861146c0b2ba4b0eab5c39bade69e5c1");
  });;

  var fbpkgiid = fbpkgiid || {};
  fbpkgiid.page = 'translator.5063';;
  var Feedback;
  (function (n) {
    var t;
    (function () {
      "use strict"; function u(t, i) {
        var u = t.getAttribute("id"), f; u || (u = "genId" + n.length, t.setAttribute("id", u)); f = new r(u, i, t.getAttribute(i)); n.push(f)
      } function i(n, t, i) {
        i === null ? n.removeAttribute(t) : n.setAttribute(t, i)
      }
      function t(n, t, r, f) {
        for (var e, s = _d.querySelectorAll(r), o = 0; o < s.length; o++)(e = s[o], f && e.id && f[e.id]) || (u(e, n), i(e, n, t))
      }
      function f(n) {
        for (var u = _d.querySelectorAll(n), e = 1, f = {}, t, i, r = 0; r < u.length; ++r) { if (t = u[r], !t.id) { for (; ;)if (i = "fbpgdgelem" + e++ , !_ge(i)) break; t.id = i } f[t.id] = t } return f
      }
      function e() {
        var i = "tabindex", r = "-1", n = f("#fbpgdg, #fbpgdg *"); t(i, r, "div", n); t(i, r, "svg", n); t(i, r, "a", n); t(i, r, "li", n); t(i, r, "input", n); t(i, r, "select", n); t("aria-hidden", "true", "body :not(script):not(style)", n)
      }
      function o() {
        for (var r, t = 0; t < n.length; t++)r = _d.getElementById(n[t].id), r && i(r, n[t].attributeName, n[t].originalAttributeValue); n.length = 0
      }
      function s() {
        typeof sj_evt != "undefined" && (sj_evt.bind("onFeedbackStarting", function () { e() }), sj_evt.bind("onFeedbackClosing", function () { o() }))
      } var n = [], r = function () {
        function n(n, t, i) {
          this.id = n; this.attributeName = t; this.originalAttributeValue = i
        } return n
      }(); s()
    })(t = n.Accessibility || (n.Accessibility = {}))
  })(Feedback || (Feedback = {}));
  var Feedback;
  (function (n) {
    var t; (function () {
      function r(i, r, u, f, e, o) {
        i = typeof i === t ? !1 : i; i && scrollTo(0, 0);
        u = typeof u === t ? !0 : u; n.PackageLoad.Load(r, u, f, e, o)
      }
      function e(n, t) {
        for (var r = 0, i = null; n && n.getAttribute && (!(t >= 1) || r < t);) { if (i = n.getAttribute("data-fbhlsel"), i != null) break; r++; n = n.parentNode } return i
      }
      var u = "feedbackformrequested", i, f = "", o = "feedback-binded", s = "clicked", t = "undefined", h;
      n.Bootstrap.InitializeFeedback = function (n, c, l, a, v, y, p, w) {
        function d(n) {
          var i = null, t; return n && (t = new h, sj_evt.fire("ajax.feedback.collectsettings", t), i = t.findSettings(n)), i
        }
        var b = _ge(c), k;
        b && b.classList && b.classList.contains(o) || (v = typeof v === t ? !1 : v, k = e(b, 3), f !== "sb_feedback" && (f = c, typeof sj_evt !== t && (i && sj_evt.unbind(u, i),
          i = function (t) {
            var f = null, i = null, o = null, s, u, h; t && t.length > 1 && (u = t[1], u.tagName !== undefined && u.nodeType !== undefined ? (f = u, i = d(f)) : i = u, s = i && i.elementToHighlight || f, o = e(s)); h = i && i.linkId || c; r(a, n, l, h, o, i)
          }, sj_evt.bind(u, i, 1)), typeof SearchAppWrapper !== t && SearchAppWrapper.CortanaApp && SearchAppWrapper.CortanaApp.addEventListener
          && SearchAppWrapper.CortanaApp.addEventListener(u,
            function (i) {
              (typeof i !== t && i !== null && (i.isHandled = !0), c === f) && _ge("fbpgdg") === null && r(a, n, l, c)
            })),
          b !== null ? (sj_be(b, "click", function (t) {
            var u = null, i = null, f = null, o;
            if (v && b.classList) { if (b.classList.contains(s)) return !1; b.classList.add(s) } sj_pd(t); sj_sp(t); u = sj_et(t);
            i = d(u); o = i && i.elementToHighlight || u; f = e(o); r(a, n, l, c, f || k, i || w)
          }), b.classList && b.classList.add(o)) : (p = typeof p === t ? !1 : p, p && r(a, n, l, c, k)))
      }; h = function () {
        function n() {
          this.settingsList = []
        }
        return n.prototype.setStartSettings = function (n, t) {
          n && t && this.settingsList.push({ c: n, s: t })
        }, n.prototype.findSettings = function (n) {
          var t = null; return this.settingsList.forEach(function (i) { sj_we(n, i.c) && (t = i.s) }), t
        }, n
      }()
    })(t = n.Bootstrap || (n.Bootstrap = {}))
  })(Feedback || (Feedback = {})),



  _w.rms.js({
    'A:rms:answers:Shared:BingCore.Bundle': '\/rms\/BingCore.Bundle\/cj,nj\/0b965b0e\/227a8999.js?bu=rms+answers+Shared+BingCore%24ClientInstV2%24DuplicateXls\
    DefaultConfig%2cBingCore%24ClientInstV2%24SharedLocalStorageConfigDefault%2cBingCore%24shared%2cBingCore%24env.override%2cEmpty%2cBingCore%24event.custom.fix\
    %2cBingCore%24event.native%2cBingCore%24onHTML%2cBingCore%24dom%2cBingCore%24cookies%2cBingCore%24XHRPrefetch%24rmsajax_xhrprefetch%2cBingCore%24ClientInstV2%24\
    LogUploadCapFeatureDisabled%2cBingCore%24ClientInstV2%24ClientInstConfigSeparateOfflineQueue%2cBingCore%24clientinst%2cBingCore%24replay%2cBingCore%24Animation%2c\
    BingCore%24fadeAnimation%2cBingCore%24framework'
  }, { 'A:0': 0 },
    { 'A:rms:answers:Identity:BlueIdentityDropdownBootStrap': '\/rms\/rms%20answers%20Identity%20Blue$BlueIdentityDropdownBootStrap_Redirect\/cj,nj\/1946cd5d\/345843dc.js' },
    { 'A:rms:answers:Identity:BlueIdentityHeader': '\/rms\/rms%20answers%20Identity%20Blue$BlueIdentityHeader\/cj,nj\/4c7364c5\/40e1b425.js' },
    { 'A:1': 1 },
    { 'A:rms:answers:Shared:Sharing': '\/rms\/rms%20answers%20Shared%20Sharing\/cj,nj\/91df1d1c\/165bfb80.js' },
    { 'A:2': 2 },
    { 'A:rms:answers:Shared:ShareAction': '\/rms\/rms%20answers%20Shared%20ShareAction\/cj,nj\/24da6ada\/c3989d43.js' },
    { 'A:3': 3 },
    { 'A:rms:answers:Shared:GlobalActionMenu': '\/rms\/rms%20answers%20Shared%20GlobalActionMenu\/cj,nj\/d83a0e8f\/4717f11d.js' },
    {
      'A:rms:answers:BoxModel:Framework': '\/rms\/Framework\/cj,nj\/25334ddc\/8a304522.js?bu=rms+answers+BoxModel+config%2cempty%2ccore%2ccore%24viewport%2ccore%24layout\
    %2ccore%24metrics%2cmodules%24mutation%2cmodules%24error%2cmodules%24network%2cmodules%24cursor%2cmodules%24keyboard%2cempty%2cmodules%24bot' },
    { 'A:4': 4 });;
}