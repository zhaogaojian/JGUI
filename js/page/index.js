$(function() {
  //主页绑定关闭事件,因为主页是直接包含的
  $("#pageiframe").on("load", function(event){//判断 iframe是否加载完成  这一步很重要
    　　$(this.contentDocument).click(function(){//添加点击事件
      　　　　$('.jgui-menu').css("visibility","hidden");
    　　});
    });

  //用户事件
  $("#personalbtn").unbind('click').click(function ()
  {
      
      var $this=$(this);
      var $btnmenu=$this.find('.jgui-menu');
      //显示菜单
      $btnmenu.css("top",$this.position().top+$this.height());
      $btnmenu.css("left",$this.position().left);
      $btnmenu.css("right",10);
      $btnmenu.css("visibility","visible");
      $btnmenu.find('.password').unbind("click").click(function(event){
        alert('点击了修改密码');
      });
      $btnmenu.find('.exit').unbind("click").click(function(event){
        alert('点击了退出系统');
      });
      return false; 
  });
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
  //抽屉点击事件
  var events = $("#menuaccordion").data("events");
  events.onNavItemClick = function(p_obj, p_type) {
    if (!$("#leftpanel").is(".unfold") && p_type == "navitem") {//目录
      //折叠状态展开
      $("#leftpanel").width(300);
      $("#centerpanel").css("left", "300px");
      $("#mainlogo").html("JGUI DEMO");
      J.Accordion($(p_obj).closest(".jgui-accordion")).unfold();
      $("#leftpanel").toggleClass("unfold");
      $("#folderbtn").toggleClass("icon-menuunfold", "icon-menufold");
      return false;
    } else if (p_type == "navitemchildleaf") {//点击了抽屉叶节点
      $tabcontent=$("#pagetab .jgui-tabcontent");
      var text = $(p_obj).find("a").html();
      var href = $(p_obj).find('a').data('href');
      var $findTab = undefined;
      $tabcontent
        .find("span")
        .each(function() {
         var $this = $(this);
           if ($this.html() == text) {
             $findTab = $this.closest(".jgui-tabitem");
             return;
           }
        });
        var isnewpage=false;
      if ($findTab == undefined) {
        iframePageCount++;
        var appentHtml =
          '<a class="jgui-tabitem"  data-href="'+href+'"? data-target="pageiframe'+iframePageCount+'"><i class="anticon icon-codepen jgui-tab-item-icon"></i><span>' +
          text +
          '</span><i class=" anticon icon-close jgui-tab-close "></i></a>';
          $("#pagetab .jgui-tabcontent").append(appentHtml);
          J.JTab($("#pagetab")).init();
          $findTab=$("#pagetab .jgui-tabcontent .jgui-tabitem").last();
          $('.page-content').append('<iframe  class="page-iframe" id="pageiframe'+iframePageCount+'" name="pageiframe'+iframePageCount+'" src="'+href+'" frameborder="0"></iframe>');
          isnewpage=true;
          //监听this点击事件
          var thisEvents=$('#pagetab').data("events");
          thisEvents.onthisClick = function(p_obj, target) {
            $('.page-content iframe').css('visibility','hidden');
            $(target).css('visibility','visible');
          }
          //监听this关闭事件
          var thisEvents=$('#pagetab').data("events");
          thisEvents.onthisClose = function(p_obj, target) {
            $(target).remove();
          }
          //监听this刷新事件
          var thisEvents=$('#pagetab').data("events");
          thisEvents.onthisRefresh = function(p_obj, target) {
            $(target).attr('src', $(target).attr('src'));
          }
          //监听iframe子页面，关闭menu
          $("iframe").on("load", function(event){//判断 iframe是否加载完成  这一步很重要
            　　$(this.contentDocument).click(function(){//添加点击事件
              　　　　$('.jgui-menu').css("visibility","hidden");
            　　});
            });
      }
      var left=$tabcontent.scrollLeft();
      var objleft=$findTab.offset().left-$tabcontent.offset().left-50;//50是左右按钮的宽度
      var objright=$findTab.offset().left-$tabcontent.offset().left-50+left+$findTab.width();//50是左右按钮的宽度
      var objwidth=$findTab.width();
      if(objleft<0)//左边非可见区域
      {
        $tabcontent.stop().animate({ scrollLeft: left+objleft-objwidth }, 200);
      }else if(objright>$tabcontent.width())//右边非可见区域
      {
        $tabcontent.stop().animate({ scrollLeft: left+(objright-$tabcontent.width())+objwidth }, 200);
      }
      $findTab.trigger("click");
      var target="#"+ $findTab.data('target');
      $('.page-content iframe').css('visibility','hidden');
      $(target).css('visibility','visible');
    }
    return true;
  };

});
var iframePageCount=0;