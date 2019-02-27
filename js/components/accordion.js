// 初始化内容
$(function () {
  //电脑端中键滚动事件
  var mousewheel =
    getBrowserInfo() == "Firefox" ? "DOMMouseScroll" : "mousewheel";
  $(".jgui-accordion").on(mousewheel, function (event) {
    var delta = 0;
    var direction = 0;
    if (!event)
      /* For IE. */
      event = window.event;
    if (event.originalEvent.wheelDelta) {
      /* IE/Opera. */
      delta = event.originalEvent.wheelDelta / 120;
    } else if (event.originalEvent.detail) {
      delta = -event.originalEvent.detail / 3;
    }
    if (delta) {
      var datas = $(this).data("datas");
      datas._sumdelta += delta > 0 ? -1 : 1;
      datas._startmousewheeldatetime = new Date().valueOf();
      var $obj = $(this);
      var handle = function () {
        var step = Math.floor($obj.height() / 10); //可视区高度
        var cur_top = $obj.scrollTop(); //当前滚过的高度
        if (
          new Date().valueOf() - datas._startmousewheeldatetime > 100 &&
          datas._sumdelta != 0
        ) {
          //100ms内没有移动滚轮
          direction = datas._sumdelta;
          datas._sumdelta = 0;
          $obj.stop().animate(
            {
              scrollTop: direction * Math.abs(direction) * step + cur_top
            },
            400,
            "linear",
            function () {
              clearInterval(datas._mouseintervalhandle);
              datas._mouseintervalhandle = undefined;
            }
          );
        }
      };
      if (datas._mouseintervalhandle == undefined) {
        datas._mouseintervalhandle = setInterval(handle, 10);
      }
    }
    stopPropagation(event);
  });
  J.Accordion($(".jgui-accordion")).init();
});
//Accordion封装
(function ($) {
  J.Accordion = function ($p_selector) {
    init = function (p_options, p_datas, p_param) {
      return $p_selector.each(function () {
        var $accordion = $(this);
        var datas = $accordion.extend(
          {
            _sumdelta: 0,
            _mouseintervalhandle: undefined,
            _startmousewheeldatetime: null
          },
          p_datas
        );
        var events = {
          onNavItemClick: undefined
        };
        $accordion.data("datas", datas);
        $accordion.data("events", events);
        //Accordion目录点击绑定
        $accordion.find("dt.jgui-accordion-navitem").unbind("click"); //先解绑
        $accordion.find("dt.jgui-accordion-navitem").click(function (event) {
          var $accordionnavitem = $(this);
          if ($accordion.data("events").onNavItemClick != undefined) {
            var ret = $accordion.data("events").onNavItemClick(this);
            if (ret == false) return;
          }
          $accordionnavitem.removeClass("selected");
          $accordionnavitem.siblings("dd").slideToggle(300, function () {
            $dd = $(this);
            if ($dd.is(":hidden")) {
              $dd
                .siblings("dt")
                .children()
                .children(".jgui-accordion-navitem-more")
                .removeClass("expanded", 0);
            } else {
              $dd
                .siblings("dt")
                .children()
                .children(".jgui-accordion-navitem-more")
                .addClass("expanded", 0);
            }
          });
          $accordionnavitem
            .closest(".jgui-accordion")
            .find(".jgui-accordion-navitem")
            .removeClass("selected");
          $accordionnavitem
            .closest(".jgui-accordion")
            .find(".jgui-accordion-navitem-child")
            .removeClass("selected");
          $accordionnavitem.addClass("selected");
          stopPropagation(event);
        });
        //Accordion内容条目点击绑定
        $accordion.find(".jgui-accordion-navitem-child").unbind("click");
        $accordion.find(".jgui-accordion-navitem-child").click(function (event) {
          var $accordionnavitemchild = $(this);
          $accordionnavitemchild
            .closest(".jgui-accordion")
            .find(".jgui-accordion-navitem")
            .removeClass("selected");
          $accordionnavitemchild
            .closest(".jgui-accordion")
            .find(".jgui-accordion-navitem-child")
            .removeClass("selected");
          $accordionnavitemchild.addClass("selected");
          stopPropagation(event);
        });
        //手机端鼠标拖动事件,手机端可以屏蔽下面改成用css3隐藏滚动条，毕竟手机端不用考虑兼容性
        $accordion.unbind("touchstart");
        $accordion.on("touchstart", function (e) {
          startY = e.originalEvent.changedTouches[0].pageY;
        });
        $accordion.unbind("touchmove");
        $accordion.on("touchmove", function (e) {
          e.preventDefault();
          (moveEndY = e.originalEvent.changedTouches[0].pageY),
            (Y = moveEndY - startY);
          startY = moveEndY;
          var cur_top = $accordion.scrollTop(); //当前滚过的高度
          $accordion.stop().animate({ scrollTop: -Y + cur_top }, 0);
        });
      });
    };
    //折叠成工具条样式
    fold = function () {
      return $p_selector.each(function () {
        var $accordion = $(this);
        $accordion
          .find(".jgui-accordion-navitem")
          .siblings("dd")
          .slideUp();
        $accordion.find(".jgui-accordion-navitem span").hide();
        $accordion
          .find(".jgui-accordion-navitem .jgui-accordion-navitem-more")
          .hide();
      });
    };
    //展开成面板样式
    unfold = function () {
      return $p_selector.each(function () {
        var $accordion = $(this);
        $accordion
          .find(".jgui-accordion-navitem-more.expanded")
          .closest(".jgui-accordion-navitem")
          .siblings("dd")
          .slideDown();
        $accordion.find(".jgui-accordion-navitem span").show();
        $accordion
          .find(".jgui-accordion-navitem .jgui-accordion-navitem-more")
          .show();
      });
    };
    return {
      init: init,
      fold: fold,
      unfold: unfold
    };
  };
})(J.$); //这样写后，函数内部就会使用J.$对应的选择器
//(".jgui-accordion").init();

//使用css3实现
// //手机端鼠标拖动事件
// $(".jgui-accordion-list").on("touchstart", function (e) {
//     startY = e.originalEvent.changedTouches[0].pageY;
//     console.log("aa");
// });
// curY=0;
// allow=true;
// $(".jgui-accordion-list").on("touchmove", function (e) {

//     if(!allow)return;
//     e.preventDefault();

//     moveEndY = e.originalEvent.changedTouches[0].pageY,
//     Y = (moveEndY - startY) ;
//     curY+=Y;
//     startY = moveEndY;

//     var cur_top = $('.jgui-accordion-list').scrollTop();    //当前滚过的高度

//     $(".jgui-accordion-list").css('-webkit-transform','translate3d(0px,'+curY+'px,0px)')
//     $(".jgui-accordion-list").css('-moz-transform','translate3d(0px,'+curY+'px,0px)')
// });
