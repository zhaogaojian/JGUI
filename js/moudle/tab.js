$('.jgui-tab-pre').click(function (event){
    var cur_left = $('.jgui-tabcontent').scrollLeft(); //当前滚过的距离
    $('.jgui-tabcontent').stop().animate({ scrollLeft: 200 + cur_left }, 800);
});
$('.jgui-tab-next').click(function (event){
    var cur_left = $('.jgui-tabcontent').scrollLeft(); //当前滚过的距离
    $('.jgui-tabcontent').stop().animate({ scrollLeft: -200 + cur_left }, 800);
});
$('.jgui-tabitem').click(function (event){
    $(this).siblings(".jgui-tabitem").removeClass('selected');
    $(this).addClass('selected');
});
$('.jgui-tabitem .jgui-tab-close').click(function (event){
    $(this).closest(".jgui-tabitem").remove();
});