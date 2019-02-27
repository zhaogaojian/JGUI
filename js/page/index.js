$(function() {
  // 初始化内容
  $("#folderbtn").click(function(event) {
    if ($("#leftpanel").is(".unfold")) {
      //未折叠
      $("#leftpanel").width(50);
      $("#centerpanel").css("left", "50px");
      $("#mainlogo").html("J");
      J.Accordion($("#menuaccordion")).fold();
    } else {
      $("#leftpanel").width(300);
      $("#centerpanel").css("left", "300px");
      $("#mainlogo").html("JGUI DEMO");
      J.Accordion($("#menuaccordion")).unfold();
    }
    $("#leftpanel").toggleClass("unfold");
    $("#folderbtn").toggleClass("icon-menu-unfold icon-menu-fold");
  });
  //NavItem点击事件
 var events = $('#menuaccordion').data("events");
 events.onNavItemClick=function (obj)
  {
      if (!$("#leftpanel").is(".unfold")) {//折叠状态展开
        $("#leftpanel").width(300);
        $("#centerpanel").css("left", "300px");
        $("#mainlogo").html("JGUI DEMO");
        J.Accordion($(obj).closest(".jgui-accordion")).unfold();
        $("#leftpanel").toggleClass("unfold");
        $("#folderbtn").toggleClass("icon-menu-unfold icon-menu-fold");
        return false;
      }
  };
});
