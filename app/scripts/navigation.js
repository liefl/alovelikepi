var JATT = JATT || {};

JATT.Navigation = (function() {

  var current = 'home';

  var states = {

    home: {

      enter: function() {

        clear(0.8);

      },

      leave: function() {

        var d = new $.Deferred();
        d.resolve();
        return d.promise();

      }

    },

    news: {

      enter: function() {

        var duration = duration || 1.2;
        var easing = Quint.easeInOut;

        TweenMax.to(JATT.elements['cliff'].node, duration, {
          x: -4300,
          y: -230,
          scale: 3,
          ease: easing
        });

        TweenMax.to(JATT.elements['mountains'].node, duration, {
          x: -350,
          y: 0,
          scale: 1.3,
          ease: easing
        });

        TweenMax.to(JATT.elements['mountains2'].node, duration, {
          x: -50,
          scale: 1.1,
          ease: easing
        });

        TweenMax.to(JATT.elements['giant'].node, duration, {
          x: 500,
          y: -170,
          scale: 1.4,
          ease: easing
        });

        TweenMax.to(JATT.elements['cloud6'].node, duration, {
          x: 600,
          ease: easing
        });

        TweenMax.to(JATT.elements['cloud5'].node, duration, {
          x: 100,
          ease: easing
        });

        TweenMax.to(JATT.elements['cloud4'].node, duration, {
          x: 200,
          ease: easing
        });

        TweenMax.to(JATT.elements['cloud3'].node, duration, {
          x: 300,
          ease: easing
        });

        TweenMax.to(JATT.elements['cloud2'].node, duration, {
          x: 400,
          ease: easing
        });

        TweenMax.to(JATT.elements['cloud1'].node, duration, {
          x: 500,
          ease: easing
        });

        TweenMax.to(JATT.elements['stars'].node, duration, {
          x: 100,
          ease: easing
        });

        TweenMax.to(JATT.elements['moon'].node, duration, {
          x: 250, 
          ease: easing
        });

        // timeline

        TweenMax.to(JATT.c, duration * 0.01, {
          x: 0,
          onComplete: JATT.News.init
        });

      },

      leave: function() {

        var d = new $.Deferred();

        JATT.News.hide();

        clear(0.8).then(d.resolve);

        return d.promise();

      }

    },

    shows: {

      enter: function(duration) {

        var duration = duration || 2.5;
        var easing = Quint.easeInOut;

        TweenMax.to(JATT.elements['cliff'].node, duration, {
          y: 1100,
          ease: easing
        });

        TweenMax.to(JATT.elements['mountains'].node, duration, {
          y: 850,
          ease: easing
        });

        TweenMax.to(JATT.elements['mountains2'].node, duration, {
          y: 800,
          ease: easing
        });

        TweenMax.to(JATT.elements['giant'].node, duration, {
          y: 850,
          ease: easing
        });

        TweenMax.to(JATT.elements['cloud6'].node, duration, {
          y: 950,
          ease: easing
        });

        TweenMax.to(JATT.elements['cloud5'].node, duration, {
          y: 850,
          ease: easing
        });

        TweenMax.to(JATT.elements['cloud4'].node, duration, {
          y: 750,
          ease: easing
        });

        TweenMax.to(JATT.elements['cloud3'].node, duration, {
          y: 650,
          ease: easing
        });

        TweenMax.to(JATT.elements['cloud2'].node, duration, {
          y: 550,
          ease: easing
        });

        TweenMax.to(JATT.elements['cloud1'].node, duration, {
          y: 450,
          ease: easing
        });

        TweenMax.to(JATT.elements['stars'].node, duration, {
          y: 250,
          ease: easing
        });

        TweenMax.to(JATT.elements['moon'].node, duration, {
          y: 500, // cheating
          ease: easing
        });

        // TweenMax.to(JATT.elements['stars'].select('.moon').node, duration, {
        //   y: 300,
        //   ease: easing
        // });

        // timeline

        TweenMax.to(JATT.c, duration * 0.1, {
          x: 0,
          onComplete: JATT.Shows.init
        });

      },

      leave: function(duration) {

        var d = new $.Deferred();

        JATT.Shows.hide();

        clear(0.8).then(d.resolve);

        return d.promise();

      }

    },

    media: {

      enter: function(duration) {

        var duration = duration || 2.5;
        var easing = Quint.easeOut;

        TweenMax.to(JATT.elements['cliff'].node, duration, {
          x: -2100,
          y: 100,
          scale: 2,
          ease: easing
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
          ease: easing
        });

        TweenMax.to(JATT.elements['mountains2'].node, duration, {
          x: -750,
          y: 150,
          scale: 1.5,
          ease: easing
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

         TweenMax.to(JATT.elements['moon'].node, duration, {
          y: -50,
          ease: easing
        });

        TweenMax.to('#jackandthegiantfade', 1.5, {
          opacity: 1,
          onComplete: JATT.Media.init
        });

      },

      leave: function(duration) {

        var d = new $.Deferred();

        JATT.Media.hide();

        clear(0.8, 0.5).then(d.resolve);

        return d.promise();

      }

    }

  };

  var intro = function() {

    var duration = 2.5;
    var easing = Quint.easeInOut;

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

    TweenMax.from(JATT.elements['moon'].node, duration, {
      y: 450,
      ease: easing
    });

    TweenMax.to('#jackandthegiantfade', 2, {
      opacity: 0
    });

    // timeline

    TweenMax.to(JATT.c, duration, {
      x: 0,
      onComplete: JATT.Nav.change
    });

  };

  var clear = function(duration, delay) {

    var d = new $.Deferred();

    var duration = duration || 0;
    var delay = delay || 0;
    var easing = Quint.easeInOut;

    for(var i in JATT.elements) {
      TweenMax.to(JATT.elements[i].node, duration, {
        x: 0,
        y: 0,
        scale: 1,
        delay: delay,
        ease: easing
      });
    }

    TweenMax.to('#jackandthegiantfade', duration * 0.3, {
      opacity: 0,
      delay: delay
    });

    // timeline

    TweenMax.to(JATT.c, duration, {
      x: 0,
      delay: delay,
      onComplete: d.resolve
    });

    return d.promise();

  };


  var go = function(key, duration) {

    JATT.Nav.view(key);

    if(current !== key) {

      states[current].leave().then(function() {
        current = key;
        states[key].enter();
      });

    }

  };

  return {
    intro: intro,
    go: go
  };

})();