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
    $(this).toggleClass("icon-menuunfold", "icon-menufold");
  });
  //NavItem点击事件
  var events = $("#menuaccordion").data("events");
  events.onNavItemClick = function(p_obj, p_type) {
    if (!$("#leftpanel").is(".unfold") && p_type == "navitem") {
      //折叠状态展开
      $("#leftpanel").width(300);
      $("#centerpanel").css("left", "300px");
      $("#mainlogo").html("JGUI DEMO");
      J.Accordion($(p_obj).closest(".jgui-accordion")).unfold();
      $("#leftpanel").toggleClass("unfold");
      $("#folderbtn").toggleClass("icon-menuunfold", "icon-menufold");
      return false;
    } else if (p_type == "navitemchildleaf") {
      //点击了子项叶节点
      $tabcontent=$("#pagetab .jgui-tabcontent");
      var text = $(p_obj).find("a").html();
      var href = $(p_obj).find('a').data('href');
      var $findTab = undefined;
      $tabcontent
        .find("span")
        .each(function() {
         var $this = $(this);
           if ($this.html() == text) {
             $findTab = $this;
             return;
           }
        });
      if ($findTab == undefined) {
        var appentHtml =
          '<div class="jgui-tabitem"  data-href="'+href+'" data-frame="pageiframe"><i class="anticon icon-codepen jgui-tab-item-icon"></i><span>' +
          text +
          '</span><i class=" anticon icon-close jgui-tab-close "></i></div>';
          $("#pagetab .jgui-tabcontent").append(appentHtml);
          J.JTab($("#pagetab")).init();
          $findTab=$("#pagetab .jgui-tabcontent .jgui-tabitem:last-child");
      }
      var left=$tabcontent.scrollLeft();
      var objleft=$findTab.offset().left-$tabcontent.offset().left-50;//50是左右按钮的宽度
      var objright=$findTab.offset().left-$tabcontent.offset().left-50+left+$findTab.width();//50是左右按钮的宽度
      var objwidth=$findTab.width();
      console.log(left+','+objleft+','+$tabcontent.width());
      if(objleft<0)//左边非可见区域
      {
        $tabcontent
                  .stop()
                  .animate({ scrollLeft: left+objleft-objwidth }, 200);
      }else if(objright>$tabcontent.width())//右边非可见区域
      {
        $tabcontent
                  .stop()
                  .animate({ scrollLeft: left+(objright-$tabcontent.width())+objwidth }, 200);
      }
      $findTab.trigger("click");
      
      if(href!=undefined)
      $('#pageiframe').attr('src', href);
    }
    return true;
  };
});
