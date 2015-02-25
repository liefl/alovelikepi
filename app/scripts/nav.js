var JATT = JATT || {};

JATT.Nav = (function() {

  var locations, visited;

  var init = function() {

    locations = {
      news: {
        destination: 'news',
        element: JATT.elements['jack']
      },
      media: {
        destination: 'shows',
        element: JATT.elements['giant'].select('.heart')
      },
      // shows: {
      //   destination: 'shows',
      //   element: JATT.elements['giant'].select('.fairy')
      // }
    };

    // add click listeners

    for(k in locations) {
      (function(_dest) {
        locations[k].element.click(function() {
          JATT.Navigation.go(_dest)
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





    $('.btn-home').click(function() {
      JATT.Navigation.go('home');
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
        // visited 
        
      } else {
        // new content
       
      }
    }

    $.cookie('visited', JSON.stringify(visited)); // save visited cookie

  };

  var display = function() {

  };

  var hide = function() {

  };


  return {
    init: init,
    view: view
  };

})();