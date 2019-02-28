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
    $(this).toggleClass("icon-menu-unfold", "icon-menu-fold");
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
      $("#folderbtn").toggleClass("icon-menu-unfold", "icon-menu-fold");
      return false;
    } else if (p_type == "navitemchild") {
      //点击了子项
      $tabcontent=$("#pagetab .jgui-tabcontent");
      var text = $(p_obj)
        .find("a")
        .html();
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
          '<a class="jgui-tabitem "><i class="anticon icon-codepen jgui-tab-item-icon"></i><span>' +
          text +
          '</span><i class=" anticon icon-close jgui-tab-close "></i></a>';
          $("#pagetab .jgui-tabcontent").append(appentHtml);
          J.JTab($("#pagetab")).init();
      }
      else
      {
        $findTab.trigger("click");
        var left=$tabcontent.scrollLeft();
        var objleft=$findTab.offset().left-400;
        var objwidth=$findTab.width()*4;
        console.log(left+','+objleft+','+$tabcontent.width());
        if(objleft<0)//跑到左边了
        {
          $tabcontent
                   .stop()
                   .animate({ scrollLeft: left+objleft }, 200);
        }else if(objleft>$tabcontent.width())
        {
          $tabcontent
                   .stop()
                   .animate({ scrollLeft: left+(objleft-$tabcontent.width())+objwidth }, 200);
        }
        // if(realeft<=400)
        // {     $tabcontent
        //         .stop()
        //         .animate({ scrollLeft: realeft }, 200);
        // }
        // if(realeft>0)
        // {
          
        //    $tabcontent
        //      .stop()
        //      .animate({ scrollLeft: objleft - left }, 200);
        // }
        
        
      }
    }
    return true;
  };
});
