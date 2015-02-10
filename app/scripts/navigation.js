var JATT = JATT || {};

JATT.Navigation = (function() {

  this.state = 'home';

  var intro = function() {

    var duration = 5;
    var easing = Quint.EaseOut;

    TweenMax.from(JATT.elements['cliff'].node, duration, {
      y: 1800,
      ease: easing
    });

    TweenMax.from(JATT.elements['mountains'].node, duration, {
      y: 1300,
      ease: easing
    });

    TweenMax.from(JATT.elements['mountains2'].node, duration, {
      y: 1100,
      ease: easing
    });

    TweenMax.from(JATT.elements['giant'].node, duration, {
      y: 1000,
      ease: easing
    });

    TweenMax.from(JATT.elements['cloud6'].node, duration, {
      y: 1100,
      ease: easing
    });

    TweenMax.from(JATT.elements['cloud5'].node, duration, {
      y: 1000,
      ease: easing
    });

    TweenMax.from(JATT.elements['cloud4'].node, duration, {
      y: 900,
      ease: easing
    });

    TweenMax.from(JATT.elements['cloud3'].node, duration, {
      y: 800,
      ease: easing
    });

    TweenMax.from(JATT.elements['cloud2'].node, duration, {
      y: 700,
      ease: easing
    });

    TweenMax.from(JATT.elements['cloud1'].node, duration, {
      y: 600,
      ease: easing
    });

    TweenMax.from(JATT.elements['stars'].node, duration, {
      y: 400,
      ease: easing
    });

  };

  var media = function() {

    this.state = 'media';

    var duration = 2.5;
    var easing = Quint.EaseInOut;

    TweenMax.to(JATT.elements['cliff'].node, duration, {
      x: -2100,
      y: 100,
      scale: 2
    });

    TweenMax.to(JATT.elements['giant'].node, duration, {
      y: -100,
      x: -50,
      scale: 1.4,
      ease: easing
    });

    TweenMax.to(JATT.elements['mountains'].node, duration, {
      x: -1200,
      y: 200,
      scale: 1.8,
    });

    TweenMax.to(JATT.elements['mountains2'].node, duration, {
      x: -750,
      y: 150,
      scale: 1.5,
    });

    TweenMax.to(JATT.elements['cloud6'].node, duration, {
      y: 150,
      ease: easing
    });

    TweenMax.to(JATT.elements['cloud5'].node, duration, {
      y: 100,
      ease: easing
    });

    TweenMax.to(JATT.elements['cloud4'].node, duration, {
      y: 0,
      ease: easing
    });

    TweenMax.to(JATT.elements['cloud3'].node, duration, {
      y: -50,
      ease: easing
    });

    TweenMax.to(JATT.elements['cloud2'].node, duration, {
      y: -75,
      ease: easing
    });

    TweenMax.to(JATT.elements['cloud1'].node, duration, {
      y: -125,
      ease: easing
    });

    TweenMax.to('#fade', 1.5, {
      opacity: 1,
      onComplete: function() {
        JATT.Media.init();
      }
    });

  };

  var home = function() {

    for(var i in JATT.elements) {
      TweenMax.to(JATT.elements[i].node, duration, {
        x: 0,
        y: 0,
        scale: 1
      });
    }

  };

  return {
    intro: intro,
    media: media,
    home: home
  };

})();