var JATT = JATT || {};

JATT.News = (function() {
 
  var init = function() {

    JATT.c.addClass('news-active');

  };

  var hide = function() {

    JATT.c.removeClass('news-active');

  };

  return {
    init: init,
    hide: hide
  };

})();