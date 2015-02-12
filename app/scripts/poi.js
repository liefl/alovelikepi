var JATT = JATT || {};

JATT.POI = (function() {
 
  var init = function() {

    // add event listeners

    JATT.elements['giant'].select('.heart').click(function() {
      JATT.Navigation.go('media');
    });

    JATT.elements['jack'].click(function() {
      JATT.Navigation.go('news');
    });

    JATT.elements['giant'].select('.fairy').click(function() {
      JATT.Navigation.go('shows');
    });

  };

  return {
    init: init
  };

})();