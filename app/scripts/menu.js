var JATT = JATT || {};

JATT.Nav = (function() {

  var nav;

  var init = function() {

    nav = $('nav');

    nav.on('click', '.btn-nav', function() {
      JATT.Navigation.go($(this).data('destination'));
    });

  };

  var open = function() {

    $('body').addClass('nav-open');

  };

  var close = function() {

    $('body').removeClass('nav-open');
    
  };

  return {
    init: init,
    open: open,
    close: close
  };

})();