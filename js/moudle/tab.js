// 初始化内容
$(function () {
    J.JTab($(".jgui-tab")).init();
    $(document).click(function()
    {
        $('.jgui-menu').css("visibility","hidden");
    });
});
//Tab封装
(function($) {
  J.JTab = function($p_selector) {
    //初始化
    init = function(p_options, p_datas, p_param) {
      return $p_selector.each(function() {
        $tab=$(this);
        var datas =  $tab.extend(
          {
            _sumdelta: 0,
            _mouseintervalhandle: undefined,
            _startmousewheeldatetime: null
          },
          p_datas
        );
        var events = {
          onTabItemClick: undefined,
          onTabItemClose:undefined,
          onTabItemRefresh:undefined
        };
        $tab.data("datas", datas);
        $tab.data("events", events);
        $tab.find(".jgui-tab-pre").unbind('click').click(function(event) {
          var cur_left =  $tab.find(".jgui-tabcontent").scrollLeft(); //当前滚过的距离
          $tab.find(".jgui-tabcontent")
            .stop()
            .animate({ scrollLeft: -200 + cur_left }, 200);
        });
        $tab.find(".jgui-tab-next").unbind('click').click(function(event) {
          var cur_left =  $tab.find(".jgui-tabcontent").scrollLeft(); //当前滚过的距离
          $tab.find(".jgui-tabcontent")
            .stop()
            .animate({ scrollLeft: 200 + cur_left }, 200);
        });
        $tab.find(".jgui-tabitem").unbind('click').click(function(event) {
          $(this)
            .siblings(".jgui-tabitem")
            .removeClass("selected");
          $(this).addClass("selected");
          //更新样式
          var href = $(this).data('href');
          var target="#"+ $(this).data('target');
          if ( $tab.data("events").onTabItemClick != undefined) {
            $tab.data("events").onTabItemClick(this,target);
          }
        });
        $tab.find(".jgui-tabitem").unbind('contextmenu').contextmenu(function ()
        {
            $tabitem=$(this);
            if($tabitem.find(".jgui-tab-close").css("visibility")=="hidden")//判断是否需要隐藏关闭当前标签
            {
              $('#testmenu .closecurtab').addClass('jgui-disable');
            }
            else
            $('#testmenu .closecurtab').removeClass('jgui-disable');

            $('#testmenu').css("top",$tabitem.position().top+$tabitem.height()/2);
            $('#testmenu').css("left",$tabitem.position().left+$tabitem.width());
            $('#testmenu').css("visibility","visible");
            $('#testmenu .closecurtab').unbind("click").click(function(event){
              $tabitem.find(".jgui-tab-close").first().trigger("click");
            });
            $('#testmenu .closeothertab').unbind("click").click(function(event){
              $tabitem.siblings('.jgui-tabitem').find(".jgui-tab-close").trigger("click");
            });

            $('#testmenu .closelefttab').unbind("click").click(function(event){
              $tabitem.prevAll().find(".jgui-tab-close").trigger("click");
            });
            $('#testmenu .closerighttab').unbind("click").click(function(event){
              $tabitem.nextAll().find(".jgui-tab-close").trigger("click");
            });
            $('#testmenu .refreshcur').unbind("click").click(function(event){
              var target="#"+ $tabitem.data('target');
              if ( $tab.data("events").onTabItemRefresh != undefined) {
                $tab.data("events").onTabItemRefresh(this,target);
              }
            });
            return false; 
        });
        $tab.find(".jgui-tabitem .jgui-tab-close").unbind('click').click(function(event) {
          if($(this).css("visibility")=="hidden")return;//隐藏的不触发动作
          var $nextTabItem=$(this).closest(".jgui-tabitem").siblings(".jgui-tabitem").last();
          var $tabitem=$(this).closest(".jgui-tabitem");
          var target="#"+ $tabitem.data('target');
          if ($tab.data("events").onTabItemClose != undefined) {
              $tab.data("events").onTabItemClose(this,target);
          }
          $(this)
            .closest(".jgui-tabitem")
            .remove();
            $nextTabItem.trigger("click");
        });
        
      });
    };
    return {
      init: init
    };
  };
})(J.$);
