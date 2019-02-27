// 初始化内容
$(function() {
  //目录点击事件
  $(".jgui-accordion dt.jgui-accordion-navitem").click(function(event) {
    $(this).removeClass("selected");
    $(this)
      .siblings("dd")
      .slideToggle(300, function() {
        if ($(this).is(":hidden")) {
          $(this)
            .siblings("dt")
            .children()
            .children(".jgui-accordion-navitem-more")
            .removeClass("expanded", 0);
        } else {
          $(this)
            .siblings("dt")
            .children()
            .children(".jgui-accordion-navitem-more")
            .addClass("expanded", 0);
        }
      });
    $(this)
      .closest(".jgui-accordion")
      .find(".jgui-accordion-navitem")
      .removeClass("selected");
    $(this)
      .closest(".jgui-accordion")
      .find(".jgui-accordion-navitem-child")
      .removeClass("selected");
    $(this).addClass("selected");
    stopPropagation(event);
  });
  //菜单内容点击事件
  $(".jgui-accordion-navitem-child").click(function(event) {
    $(this)
      .closest(".jgui-accordion")
      .find(".jgui-accordion-navitem")
      .removeClass("selected");
    $(this)
      .closest(".jgui-accordion")
      .find(".jgui-accordion-navitem-child")
      .removeClass("selected");
    $(this).addClass("selected");
    stopPropagation(event);
  });
  //电脑端中键滚动事件
  var mousewheel =
    getBrowserInfo() == "Firefox" ? "DOMMouseScroll" : "mousewheel";
  $(".jgui-accordion").on(mousewheel, function(event) {
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
      var handle = function() {
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
            function() {
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
  //手机端鼠标拖动事件
  $(".jgui-accordion").on("touchstart", function(e) {
    startY = e.originalEvent.changedTouches[0].pageY;
  });
  $(".jgui-accordion").on("touchmove", function(e) {
    e.preventDefault();
    (moveEndY = e.originalEvent.changedTouches[0].pageY),
      (Y = moveEndY - startY);
    startY = moveEndY;
    var cur_top = $(this).scrollTop(); //当前滚过的高度
    $(this)
      .stop()
      .animate({ scrollTop: -Y + cur_top }, 0);
  });
  J.Accordion.init($(".jgui-accordion"));
});
//Accordion封装
J.Accordion = (function($) {
  init = function($p_selector, p_options, p_datas, p_param) {
    return $p_selector.each(function() {
      var datas = $p_selector.extend(
        {
          _sumdelta: 0,
          _mouseintervalhandle: undefined,
          _startmousewheeldatetime: null
        },
        p_datas
      );
      $p_selector.data("datas", datas);
    });
  };
  //折叠
  fold = function($p_selector) {
    return $p_selector.each(function() {
      $p_selector
        .find(".jgui-accordion-navitem")
        .siblings("dd")
        .slideUp();
      $p_selector.find(".jgui-accordion-navitem span").hide();
      $p_selector
        .find(".jgui-accordion-navitem .jgui-accordion-navitem-more")
        .hide();
    });
  };
  //展开
  unfold = function($p_selector) {
    return $p_selector.each(function() {
      $p_selector
        .find(".jgui-accordion-navitem-more.expanded")
        .closest(".jgui-accordion-navitem")
        .siblings("dd")
        .slideDown();
      $p_selector.find(".jgui-accordion-navitem span").show();
      $p_selector
        .find(".jgui-accordion-navitem .jgui-accordion-navitem-more")
        .show();
    });
  };
  return {
    init: init,
    fold: fold,
    unfold: unfold
  };
})(J.$);
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
