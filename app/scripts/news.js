var JATT = JATT || {};

JATT.News = (function() {

  var active;
 
  var init = function() {

    JATT.c.addClass('news-active');

    JATT.elements['cliff'].select('.dialogue-shape').animate({
      d: 'M0,326.4 32.2,287.2 40.9,64.4 648.1,40 689,53.1 702,40 735.1,49.6 740.3,69.6 766.4,78.3 776,581.3 756,598.7 41.8,579.6 19.1,548.2 31.3,319.4 0,326.4'
    }, 1000, function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t });

    
    $('#dialogueShakeAnimation')[0].endElement();

    $.get('data/news.html', function(response) {
      $('#news-viewer').html(response);
    });

  };

  var hide = function() {

    JATT.c.removeClass('news-active');

    JATT.elements['cliff'].select('.dialogue-shape').animate({
      d: 'M-13,336.4 -1.6,320.7 -0.9,312.5 32.3,311.2 34.5,311.9 35.2,311.2 37,311.7 37.3,312.8 38.7,313.2 39.2,340.7 38.2,341.6 -0.8,340.6 -2,338.9 -1.4,336 13,336.4'
    }, 600, function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t });

    setTimeout(function() {
      $('#dialogueShakeAnimation')[0].beginElement();
    }, 500);

  };

  var start = function() {

    // JATT.elements['cliff'].select('.dialogue-shape').animate({
    //   transform: 'rotate(200 -13 336)'
    // }, 5000, null, ender);

    // function ender() {
    //   console.log('ended')
    // }



  };

  var stop = function() {

  };

  return {
    init: init,
    hide: hide
  };

})();