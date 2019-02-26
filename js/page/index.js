$('#folderbtn').click(function(event) {
    if($('#leftpanel').is('.unfold')){//未折叠
        $('#leftpanel').width(50);
        $('#centerpanel').css('left','50px');
        $('#mainlogo').html('J');
        $('#menuaccordion').jAccordionfold();
        
    }
    else{
        $('#leftpanel').width(300);
        $('#centerpanel').css('left','300px');
        $('#mainlogo').html('JGUI DEMO');
        $('#menuaccordion').jAccordionunfold();
    }
    $('#leftpanel').toggleClass('unfold');
});
$("#menuaccordion .jgui-accordion-navitem").click(function(event) {
    if(!$('#leftpanel').is('.unfold')){
        $('#leftpanel').width(300);
        $('#centerpanel').css('left','300px');
        $('#mainlogo').html('JGUI DEMO');
        $('#menuaccordion').jAccordionunfold();
        $('#leftpanel').toggleClass('unfold');
    }
  });