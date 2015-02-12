var JATT = JATT || {};

JATT.init = function() {

  JATT.s = Snap('#jackandthegiantsvg');
  JATT.c = $('#jackandthegiant');

  JATT.Assets.load().then(function() {

    JATT.POI.init(); // init points of interest
    JATT.Nav.init(); // init nav bar

    scarfAnimation(); // we have to write this animation dynamically, it's too fucken big

    //particleAnimation();

    //JATT.Navigation.intro();

  });

};