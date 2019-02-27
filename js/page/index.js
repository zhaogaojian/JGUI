$(function() {
  // 初始化内容
  $("#folderbtn").click(function(event) {
    if ($("#leftpanel").is(".unfold")) {
      //未折叠
      $("#leftpanel").width(50);
      $("#centerpanel").css("left", "50px");
      $("#mainlogo").html("J");
      J.Accordion.fold($("#menuaccordion"));
    } else {
      $("#leftpanel").width(300);
      $("#centerpanel").css("left", "300px");
      $("#mainlogo").html("JGUI DEMO");
      J.Accordion.unfold($("#menuaccordion"));
    }
    $("#leftpanel").toggleClass("unfold");
    $("#folderbtn").toggleClass("icon-menu-unfold icon-menu-fold");
  });
  $("#menuaccordion .jgui-accordion-navitem").click(function(event) {
    if (!$("#leftpanel").is(".unfold")) {
      $("#leftpanel").width(300);
      $("#centerpanel").css("left", "300px");
      $("#mainlogo").html("JGUI DEMO");
      J.Accordion.unfold($("#menuaccordion"));
      $("#leftpanel").toggleClass("unfold");
      $("#folderbtn").toggleClass("icon-menu-unfold icon-menu-fold");
    }
  });
});
