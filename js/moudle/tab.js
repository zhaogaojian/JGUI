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
        });
        $this.find(".jgui-tabitem .jgui-tab-close").unbind('click').click(function(event) {
          $(this)
            .closest(".jgui-tabitem")
            .remove();
        });
      });
    };
    return {
      init: init
    };
  };
})(J.$);
