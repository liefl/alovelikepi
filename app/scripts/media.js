var JATT = JATT || {};

JATT.Media = (function() {

  var index = 0;
  var items = [];

  var $container, $buttons = [];
  var $viewer = $('#media-viewer');

  var init = function() {

    Snap.load('images/cave.svg', function(f) {

      var g = JATT.s.group().addClass('media').append(f.select('g'));

      // elements

      $container = $(g.node);

      $buttons['prev'] = $container.find('.btn-prev').on('click', prev);
      $buttons['next'] = $container.find('.btn-next').on('click', next);
      $buttons['exit'] = $container.find('.btn-exit').on('click', exit);

      // listeners

      $.get('data/media.json', function(response) {

        items = response.data.media;

        $container.find('.slab').each(function(idx) {
          $(this)
            .on('click', function() { select(idx) })
            .find('.slab-thumb').attr('xlink:href', items[idx].thumb);
        });

      });

      $(window).on('resize', onResize).trigger('resize');

      // opening animation

      TweenMax.to($container.find('.controls'), 0, {
        y: 1600
      });

      TweenMax.to('#fade', 1, {
        opacity: 0,
        delay: 0.5
      });

    });


  };

  var hide = function() {

    TweenMax.to('#fade', 0.5, {
      opacity: 1,
      onComplete: function() {
        $container.remove();
      }
    });

  };

  // private methods

  var prev = function() {

    if(index > 0) {
      index--;
    } else {
      index = 5;
    }

    load(index);

  };

  var next = function() {

    if(index < 5) {
      index++;
    } else {
      index = 0;
    }

    load(index);

  };

  var load = function(idx) {

    var $content = $viewer.removeClass('ready').find('.media-viewer-content');
    $content.css('background-image', '').html('');

    if(items[idx].type === 'image') {

      var image = new Image();
      image.onload = function() {
        $content.css('background-image', 'url(' + items[idx].url + ')');

        setTimeout(function() {
          $viewer.addClass('ready');
        }, 300);

      };
      image.src = items[idx].url;

    } else if(items[idx].type === 'video') {

      $content.html(items[idx].url);

      setTimeout(function() {
        $viewer.addClass('ready');
      }, 300);
      

    }

  };

  var clear = function() {

    $viewer.removeClass('ready').find('.media-viewer-content').html('');

  };

  var onResize = function() {

    var w = $(this).width();
    var h = $(this).height();

    TweenMax.to($buttons['exit'], 0, {
      x: 1500 + w / 2 - 100,
      y: 1000 - h / 2 + 50
    });

    TweenMax.to($buttons['next'], 0, {
      x: 1500 + w / 2 - 150,
      y: 950 
    });

    TweenMax.to($buttons['prev'], 0, {
      x: 1500 - w / 2 + 50,
      y: 950 
    });

  };

  var select = function(idx) {

    index = idx;

    var duration = 1.5;
    var easing = Quint.easeInOut;

    // animation

    $viewer.addClass('active');

    TweenMax.to($container.find('.slabs'), duration, {
      y: -1800,
      ease: easing
    });

    TweenMax.to($container.find('.rocks'), duration, {
      y: -1600,
      ease: easing
    });

    TweenMax.to($container.find('.background'), duration, {
      y: -790,
      ease: easing
    });

    TweenMax.to($container.find('.controls'), duration, {
      y: 0,
      ease: easing,
      onComplete: function() {
        load(idx);
      }
    });

  };

  var exit = function() {

    var duration =  1.5;
    var easing = Quint.easeInOut;

    // animation

    $viewer.removeClass('active');

    TweenMax.to($container.find('.slabs'), duration, {
      y: 0,
      ease: easing
    });

    TweenMax.to($container.find('.rocks'), duration, {
      y: 0,
      ease: easing
    });

    TweenMax.to($container.find('.background'), duration, {
      y: 0,
      ease: easing
    });

    TweenMax.to($container.find('.controls'), duration, {
      y: 1600,
      ease: easing,
      onComplete: function() {
        clear();
      }
    });

  };


  return {
    init: init,
    hide: hide
  };

})();