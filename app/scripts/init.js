var JATT = JATT || {};

JATT.init = function() {

  JATT.s = Snap('#jackandthegiantsvg');
  JATT.c = $('#jackandthegiant');

  JATT.Assets.load().then(function() {
    //JATT.Navigation.intro();

    setTimeout(function() {
      JATT.Navigation.media();
    }, 400);

  });

};