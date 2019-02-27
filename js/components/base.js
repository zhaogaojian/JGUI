// 判断浏览器类型
function getBrowserInfo() {
  var OsObject = "";
  if (navigator.userAgent.indexOf("MSIE") > 0) {
    return "MSIE";
  }
  if ((isFirefox = navigator.userAgent.indexOf("Firefox") > 0)) {
    return "Firefox";
  }
  if ((isSafari = navigator.userAgent.indexOf("Safari") > 0)) {
    return "Safari";
  }
  if ((isCamino = navigator.userAgent.indexOf("Camino") > 0)) {
    return "Camino";
  }
  if ((isMozilla = navigator.userAgent.indexOf("Gecko/") > 0)) {
    return "Gecko";
  }
}
//阻止冒泡
function stopPropagation(e) {
  e = window.event || e;
  if (document.all) {
    //只有ie识别
    e.cancelBubble = true;
  } else {
    e.stopPropagation();
  }
}
var JGUI = J = {
  version : '0.01',
  $ : Window.jQuery
};