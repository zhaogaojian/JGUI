// 初始化内容
$(function () {
    J.JTab($(".jgui-tab")).init();
});
//Tab封装
(function($) {
  J.JTab = function($p_selector) {
    //初始化
    init = function(p_options, p_datas, p_param) {
      return $p_selector.each(function() {
        $this=$(this);
        var datas = $this.extend(
          {
            _sumdelta: 0,
            _mouseintervalhandle: undefined,
            _startmousewheeldatetime: null
          },
          p_datas
        );
        var events = {
          onTabItemClick: undefined
        };
        $this.data("datas", datas);
        $this.data("events", events);
        $this.find(".jgui-tab-pre").unbind('click').click(function(event) {
          var cur_left = $this.find(".jgui-tabcontent").scrollLeft(); //当前滚过的距离
          $this.find(".jgui-tabcontent")
            .stop()
            .animate({ scrollLeft: -200 + cur_left }, 200);
        });
        $this.find(".jgui-tab-next").unbind('click').click(function(event) {
          var cur_left = $this.find(".jgui-tabcontent").scrollLeft(); //当前滚过的距离
          $this.find(".jgui-tabcontent")
            .stop()
            .animate({ scrollLeft: 200 + cur_left }, 200);
        });
        $this.find(".jgui-tabitem").unbind('click').click(function(event) {
          $(this)
            .siblings(".jgui-tabitem")
            .removeClass("selected");
          $(this).addClass("selected");
          //更新样式
          var href = $(this).data('href');
          var target="#"+ $(this).data('target');
          if ($this.data("events").onTabItemClick != undefined) {
            $this.data("events").onTabItemClick(this,target);
          }
        });
        $this.find(".jgui-tabitem .jgui-tab-close").unbind('click').click(function(event) {
         var $pre=$(this)
          .closest(".jgui-tabitem").siblings(".jgui-tabitem").last();
          $(this)
            .closest(".jgui-tabitem")
            .remove();
            $pre.trigger("click");
        });
      });
    };
    return {
      init: init
    };
  };
})(J.$);
