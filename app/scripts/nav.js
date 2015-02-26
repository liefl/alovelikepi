var JATT = JATT || {};

JATT.Nav = (function() {

  var locations, visited, timer;

  var init = function() {

    $(window).hashchange(change);

    locations = {
      news: {
        destination: 'news',
        element: JATT.elements['jack']
      },
      media: {
        destination: 'media',
        element: JATT.elements['giant'].select('.heart')
      },
      shows: {
        destination: 'shows',
        element: JATT.elements['moon']
      }
    };

    // add click listeners

    for(k in locations) {
      (function(_dest) {
        locations[k].element.click(function() {
           window.location.hash = _dest;
        });
      })(locations[k].destination);
    }

    // add custom listeners

    $(JATT.elements['jack'].node).on({
      mouseenter: function() {
        JATT.elements['cliff'].addClass('news-hover');
      },
      mouseleave: function() {
        JATT.elements['cliff'].removeClass('news-hover');
      }
    });

    // controls

    $('.btn-help').click(function() {
      help();
    });

    $('.btn-home').click(function() {
      window.location.hash = '';
    });

    // get last visited times

    visited = ($.cookie('visited')) ? JSON.parse($.cookie('visited')) : {};

    // get last updated times

    $.get('data/content.json', function(response) {

      for(var k in response.data.content) {
        if(locations[k]) {
          locations[k].updatedAt = response.data.content[k].updatedAt;
        }
      }

      update();

    });

  };

  var view = function(key) {

    visited[key] = new Date().getTime();
    update();

  };

  var update = function() {

    for(var k in locations) {
      if(visited[k] && visited[k] > locations[k].updatedAt) {
        locations[k].element.removeClass('new-content');
        
      } else {
        locations[k].element.addClass('new-content');
       
      }
    }

    $.cookie('visited', JSON.stringify(visited)); // save visited cookie

  };

  var change = function() {

    var hash = window.location.hash.substr(1);

    switch(hash) {

      case 'news':
      JATT.Navigation.go('news');
      break;

      case 'media':
      JATT.Navigation.go('media');
      break;

      case 'shows':
      JATT.Navigation.go('shows');
      break;

      default:
      JATT.Navigation.go('home');
      break;

    }

  };


  var help = function() {

    JATT.c.addClass('help-state');

    clearTimeout(timer);

    timer = setTimeout(function() {

      JATT.c.removeClass('help-state');

    }, 4000);

  };


  return {
    init: init,
    view: view,
    change: change
  };

})();