var JATT = JATT || {};

JATT.Media = (function() {

  var loaded = false;
  var items = [];
  
  var element, slabs;

  var init = function() {

    Snap.load('images/cave.svg', function(f) {

      element = JATT.s.group().addClass('media').append(f.select('g'));
      slabs = $(element.node).find('.slab');

      if(!loaded)
      load();

      TweenMax.to('#fade', 1, {
        opacity: 0,
        delay: 0.5
      });

    });


  };

  var load = function() {

    $.get('data/media.json', function(response) {

      loaded = true;
      items = response.data.media;

      slabs.each(function(idx) {
        $(this)
          .on('click', function() { select(idx) })
          .find('.slab-thumb').attr('xlink:href', items[idx].thumb);
      });

    });

  };

  var select = function(idx) {

    var duration = 1;
    var easing = Quint.EaseInOut;

    // animation

    TweenMax.to(slabs[0], duration, {
      x: -600,
      y: -700,
      ease: easing
    });

    TweenMax.to(slabs[1], duration, {
      x: -100,
      y: -700,
      ease: easing
    });

    TweenMax.to(slabs[2], duration, {
      x: 100,
      y: -700,
      ease: easing
    });

    TweenMax.to(slabs[3], duration, {
      x: 600,
      y: -700,
      ease: easing
    });

    TweenMax.to(slabs[4], duration, {
      x: -600,
      y: 700,
      ease: easing
    });

    TweenMax.to(slabs[5], duration, {
      x: -100,
      y: 700,
      ease: easing
    });

    TweenMax.to(slabs[6], duration, {
      x: 100,
      y: 700,
      ease: easing
    });

    TweenMax.to(slabs[7], duration, {
      x: 600,
      y: 700,
      ease: easing
    });

  };


  return {
    init: init,
    loaded: loaded
  };

})();