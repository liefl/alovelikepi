var JATT = JATT || {};

JATT.init = function() {

  // if mobile/ipad/<IE9 browser , display placeholder and halt

  if(typeof window.orientation !== 'undefined' || !document.addEventListener) {

    JATT.Mobile.init();
    return false;

  }

  JATT.s = Snap('#jackandthegiantsvg');
  JATT.c = $('#jackandthegiant');

  JATT.Assets.load().then(function() {

    // pause all uneccesary animations for firefox because it can't handle them

    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
      $('*[class~="optional-animation"]').each(function() {
        $(this)[0].endElement();
      });
    }

    JATT.Nav.init(); // init navigation
    JATT.Music.init(); // init music

    setTimeout(function() {
      JATT.Navigation.intro(); // into animation
    }, 1000);
    
  });

};