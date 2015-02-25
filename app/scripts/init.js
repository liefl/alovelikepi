var JATT = JATT || {};

JATT.init = function() {

  // if mobile/ipad browser, display placeholder and halt

  if(typeof window.orientation !== 'undefined') {

    $('body').addClass('is-mobile');
    return false;

  }

  JATT.s = Snap('#jackandthegiantsvg');
  JATT.c = $('#jackandthegiant');

  // pause animations for firefox because it can't handle them

  if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    JATT.s.node.pauseAnimations();
  }

  JATT.Assets.load().then(function() {

    JATT.Nav.init(); // init navigation
    JATT.Music.init(); // init music
    JATT.c.addClass('loaded');

    setTimeout(function() {
      JATT.Navigation.intro(); // into animation
    }, 1000);
    
  });

};