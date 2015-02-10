$(document).ready(function () {
  createJackAndTheGiant();
});

var JATT = JATT || {};

JATT.Elements = (function() {

  this.elements = [];

  var assets = [
    {
      name: 'mountains',
      path: 'images/mountains.svg',
      xPos: 0,
      yPos: 750
    },
    {
      name: 'mountains2',
      path: 'images/mountains-2.svg',
      xPos: 0,
      yPos: 420
    },
    {
      name: 'stars',
      path: 'images/stars.svg',
      xPos: 0,
      yPos: 0
    },
    {
      name: 'giant',
      path: 'images/giant.svg',
      xPos: 1250,
      yPos: 680
    },
    {
      name: 'cliff',
      path: 'images/cliff.svg',
      xPos: -700,
      yPos: 1000
    },
    {
      name: 'jack',
      path: 'images/jack.svg',
      xPos: 1260,
      yPos: 995
    },
    {
      name: 'cloud1',
      path: 'images/cloud-1.svg',
      xPos: 0,
      yPos: 0
    },
    {
      name: 'cloud2',
      path: 'images/cloud-2.svg',
      xPos: 0,
      yPos: 75
    },
    {
      name: 'cloud3',
      path: 'images/cloud-3.svg',
      xPos: 0,
      yPos: 160
    },
    {
      name: 'cloud4',
      path: 'images/cloud-4.svg',
      xPos: 0,
      yPos: 225
    },
    {
      name: 'cloud5',
      path: 'images/cloud-5.svg',
      xPos: 0,
      yPos: 280
    },
    {
      name: 'cloud6',
      path: 'images/cloud-6.svg',
      xPos: 0,
      yPos: 320
    },
    {
      name: 'map',
      path: 'images/map.svg',
      xPos: 1030,
      yPos: 450
    }
  ];

  this.loadElements = function() {

    var loaded = 0;

    for(var k in assets) {
      loadAsset(assets[k]);
    }

    function loadAsset(asset) {

      Snap.load(asset.path, function(f) {

        var t = new Snap.Matrix().translate(asset.xPos, asset.yPos);
        var g = f.select('g').transform(t);

        this.elements[asset.name] = s.group().addClass(asset.name).append(g);

        if(++loaded === assets.length) {
          onAssetsLoadComplete();
        }

      });

    }

  };



})();


JATT.Shows = (function() {

  var loaded = false;

  this.init = function() {


  };

  this.loadShows = function() {

    $.get('data/shows.json', function(response) {

      loaded = true;

      buildMapShows(response.data.locations);
      buildTableShows(response.data.locations);

      hideShows(0);
      displayShows();

    });

  };

  

})();




function createJackAndTheGiant () {

  var s = Snap('#jackandthegiantsvg');
  var $container = $('#jackandthegiant');

  var globals = {
    status: 'center',
    shows: null,
    width: 3000,
    height: 2000,
    shows: {
      loaded: false
    }
  };

  var assets = [
    {
      name: 'mountains',
      path: 'images/mountains.svg',
      xPos: 0,
      yPos: 750
    },
    {
      name: 'mountains2',
      path: 'images/mountains-2.svg',
      xPos: 0,
      yPos: 420
    },
    {
      name: 'stars',
      path: 'images/stars.svg',
      xPos: 0,
      yPos: 0
    },
    {
      name: 'giant',
      path: 'images/giant.svg',
      xPos: 1250,
      yPos: 680
    },
    {
      name: 'cliff',
      path: 'images/cliff.svg',
      xPos: -700,
      yPos: 1000
    },
    {
      name: 'jack',
      path: 'images/jack.svg',
      xPos: 1260,
      yPos: 995
    },
    {
      name: 'cloud1',
      path: 'images/cloud-1.svg',
      xPos: 0,
      yPos: 0
    },
    {
      name: 'cloud2',
      path: 'images/cloud-2.svg',
      xPos: 0,
      yPos: 75
    },
    {
      name: 'cloud3',
      path: 'images/cloud-3.svg',
      xPos: 0,
      yPos: 160
    },
    {
      name: 'cloud4',
      path: 'images/cloud-4.svg',
      xPos: 0,
      yPos: 225
    },
    {
      name: 'cloud5',
      path: 'images/cloud-5.svg',
      xPos: 0,
      yPos: 280
    },
    // {
    //   name: 'cloud6',
    //   path: 'images/cloud-6.svg',
    //   xPos: 0,
    //   yPos: 320
    // },
    // {
    //   name: 'cloud7',
    //   path: 'images/cloud-7.svg',
    //   xPos: 0,
    //   yPos: 440
    // },
    {
      name: 'map',
      path: 'images/map.svg',
      xPos: 1030,
      yPos: 450
    },
    // {
    //   name: 'cave',
    //   path: 'images/cave.svg',
    //   xPos: 0,
    //   yPos: 0
    // },
  ];

  var elements = {}; // we can store elements here for later use

  // load assets

  function loadExternalAssets() {

    var loaded = 0;

    for(var k in assets) {
      loadAsset(assets[k]);
    }

    function loadAsset(asset) {

      Snap.load(asset.path, function(f) {

        var t = new Snap.Matrix().translate(asset.xPos, asset.yPos);
        var g = f.select('g').transform(t);

        elements[asset.name] = s.group().addClass(asset.name).append(g);

        if(++loaded === assets.length) {
          onAssetsLoadComplete();
        }

      });

    }

  }

  function onAssetsLoadComplete() {

    // controlling depth

    s.append(elements['stars']);
    s.append(elements['cloud1']);
    s.append(elements['cloud2']);
    s.append(elements['cloud3']);
    s.append(elements['cloud4']);
    s.append(elements['cloud5']);
    s.append(elements['giant']);
    s.append(elements['cloud6']);
    s.append(elements['cloud7']);
    // s.append(elements['mountains2']);
    s.append(elements['mountains']);
    s.append(elements['cliff']);
    elements['stars'].append(elements['map']);
    elements['cliff'].append(elements['jack']);
    

    // special elements

    buildScarf();

    // listeners

    attachListeners();







  //animateTraceStars();
  //buildPathCSS($('.map').find('.outline').find('path'));
  //mapPathToCircles($('.outline').find('path'));
  //mapTourHeader();

  }

  function attachListeners() {

    elements['giant'].select('.heart').click(lookInHeart);

    elements['map'].select('.toggle-table').click(displayShowsTable);

  }




  

  loadExternalAssets();

  function lookInHeart() {

    var duration = 3;

    // TweenMax.to(elements['cliff'].node, duration, {
    //   x: -9000,
    //   y: 500,
    //   scale: 5,
    // });

    // TweenMax.to(elements['mountains'].node, duration, {
    //   y: 600,
    //   x: 300,
    //   scale: 2,
    //   transformOrigin: '50% 50%'
    // });

    // TweenMax.to(elements['giant'].node, duration, {
    //   y: -13050,
    //   x: -9500,
    //   scale: 80
    // });

    // TweenMax.to(elements['cloud5'].node, duration, {
    //   y: 100
    // });

    // TweenMax.to(elements['cloud4'].node, duration, {
    //   y: 0
    // });

    // TweenMax.to(elements['cloud3'].node, duration, {
    //   y: -50
    // });

    // TweenMax.to(elements['cloud2'].node, duration, {
    //   y: -75
    // });

    // TweenMax.to(elements['cloud1'].node, duration, {
    //   y: -125
    // });



    TweenMax.to(elements['cliff'].node, 1, {
      x: -180000,
      y: 9000,
      scale: 60,
      ease: Quint.easeIn
    });


    TweenMax.to(elements['giant'].node, 1, {
      y: -13050,
      x: -9500,
      scale: 80,
      delay: 0.4,
      ease: Quint.easeIn
    });

 
    // TweenMax.to(elements['cliff'].node, 4, {
    //   x: -140000,
    //   y: 10000,
    //   scale: 60,
    //   delay: 2
    //   ease: Quint.easeIn
    // });


    // mountains 

    // new TimelineMax()
    //   .to(elements['mountains'].node, 1, {
    //     scale: 1.1,
    //     ease: Linear.easeNone
    //   })
    //   .to(elements['mountains'].node, 4, {
    //     scale: 10,
    //     ease: Quint.easeIn
    //   });

    TweenMax.to(elements['mountains'].node, 1, {
      x: -10000,
      y: 1500,
      scale: 7,

      ease: Quint.easeIn
    });



    // TweenMax.to(elements['cliff'].node, 2, {
    //   x: -3000,
    //   y: 200,
    //   scale: 2
    // });




    // TweenMax.to(elements['cliff'].node, duration, {
    //   x: -2100,
    //   y: 100,
    //   scale: 2,
    // });

    // TweenMax.to(elements['mountains'].node, duration, {
    //   y: 1000,
    //   x: 200,
    //   scale: 1.8,
    //   transformOrigin: '50% 50%'
    // });

    // TweenMax.to(elements['mountains2'].node, duration, {
    //   y: 1000,
    //   x: 200,
    //   scale: 1.8,
    //   transformOrigin: '50% 50%'
    // });

    // TweenMax.to(elements['giant'].node, duration, {
    //   y: -13050,
    //   x: -9500,
    //   scale: 80
    // });

    // TweenMax.to(elements['cloud6'].node, duration, {
    //   y: 3000
    // });

    // TweenMax.to(elements['cloud5'].node, 6, {
    //   scale: 1.4,
    //   ease: Quint.easeInOut
    // });

    // TweenMax.to(elements['cloud4'].node, 6, {
    //   scale: 1.8,
    //   ease: Quint.easeInOut
    // });

    // TweenMax.to(elements['cloud3'].node, 6, {
    //   scale: 1.6,
    //   ease: Quint.easeInOut
    // });

    // TweenMax.to(elements['cloud2'].node, 6, {
    //   scale: 1.4,
    //   ease: Quint.easeInOut
    // });

    // TweenMax.to(elements['cloud1'].node, 6, {
    //   scale: 1.2,
    //   ease: Quint.easeInOut
    // });

  }

  





  // ** BUILD STARS ** //

  // function buildStars() {

  //   var container = s.group().addClass('stars').attr({
  //     fill: '#FFFFFF'
  //   });

  //   for(var i=0; i < 500; i++) {

  //     var x = Math.random();
  //     var y = Math.random();
  //     var opacity = Math.random() * (1 - y) + 0.1;
  //     var size = Math.random() * 2 * (1 - y);

  //     var circle = stars.circle(x * globals.width, y * globals.height, size).attr({
  //       'fill-opacity': opacity
  //     }).addClass('star');

  //     circle.appendTo(stars);

  //   }

  //   s.append(stars);

  // }


  // ** ANIMATE STARS ** //


  // function lookRight() {

  //   (global.status === 'left') ? animationCenter() : animationRight();

  // }

  function lookRight(duration) {

    globals.status = 'right';

    TweenMax.to(elements['cliff'].node, duration, {
      x: -2000,
      scale: 2
    });

    TweenMax.to(elements['mountains'].node, duration, {
      x: -400,
      scale: 2
    });

    TweenMax.to(elements['giant'].node, duration, {
      x: 0,
      y: -900,
      scale: 4
    });

    TweenMax.to(elements['clouds4'].node, duration, {
      x: 100,
      y: -50
    });

    TweenMax.to(elements['clouds3'].node, duration, {
      x: 150,
      y: -75
    });

    TweenMax.to(elements['clouds2'].node, duration, {
      x: 200,
      y: -100
    });

    TweenMax.to(elements['clouds1'].node, duration, {
      x: 250,
      y: -125
    });

    TweenMax.to(elements['clouds0'].node, duration, {
      x: 200,
      y: -150
    });

    TweenMax.to(elements['stars'].node, duration, {
      x: 100,
      y: -20
    });

  }

  function lookLeft(duration) {

    globals.status = 'left';

    TweenMax.to(elements['cliff'].node, duration, {
      x: -2100,
      y: 100,
      scale: 2,
      onComplete: function() {
        $container.addClass('dialogue');
      }
    });

    TweenMax.to(elements['mountains'].node, duration, {
      y: 400,
      x: 200,
      scale: 1.8,
      transformOrigin: '50% 50%'
    });

    TweenMax.to(elements['giant'].node, duration, {
      y: 100,
      x: 0,
      scale: 1.4,
      transformOrigin: '50% 100%'
    });

    TweenMax.to(elements['cloud5'].node, duration, {
      y: 100
    });

    TweenMax.to(elements['cloud4'].node, duration, {
      y: 0
    });

    TweenMax.to(elements['cloud3'].node, duration, {
      y: -50
    });

    TweenMax.to(elements['cloud2'].node, duration, {
      y: -75
    });

    TweenMax.to(elements['cloud1'].node, duration, {
      y: -125
    });
    

  }

  function lookUp(duration) {

    globals.status = 'up';
    initShows();

    TweenMax.to(elements['cliff'].node, duration, {
      y: 1100
    });

    TweenMax.to(elements['mountains'].node, duration, {
      y: 850
    });

    TweenMax.to(elements['mountains2'].node, duration, {
      y: 800
    });

    TweenMax.to(elements['giant'].node, duration, {
      y: 850
    });

    // TweenMax.to(elements['cloud6'].node, duration, {
    //   y: 950
    // });

    TweenMax.to(elements['cloud5'].node, duration, {
      y: 850
    });

    TweenMax.to(elements['cloud4'].node, duration, {
      y: 750
    });

    TweenMax.to(elements['cloud3'].node, duration, {
      y: 650
    });

    TweenMax.to(elements['cloud2'].node, duration, {
      y: 550
    });

    TweenMax.to(elements['cloud1'].node, duration, {
      y: 450
    });

    TweenMax.to(elements['stars'].node, duration, {
      y: 250
    });

  }

  function initShows() {

    if(!globals.shows.loaded) {
      loadShows();
    } else {
      displayShows();
    }

  }

  function loadShows() {

    $.get('data/shows.json', function(response) {

      globals.shows.loaded = true;

      buildMapShows(response.data.locations);
      buildTableShows(response.data.locations);

      hideShows(0);
      displayShows();

    });

  }

  function buildMapShows(locations) {

    globals.shows.locations = [];

    var template = elements['map'].select('.map-location-template');

    for(var i=0; i < locations.length; i++) {

      var location = locations[i];

      var transform =  new Snap.Matrix().translate(location.x, location.y);
      location.element = template.clone().removeClass('map-location-template').transform(transform);

      location.element.select('.map-text-location').attr('text', location.city + ', ' + location.state);

      // populate events

      var eventTemplate = location.element.select('.map-location-event-template');

      for(var j=0; j < location.events.length; j++) {

        var eventData = location.events[j];
        eventData.date = new Date(eventData.date);

        var eventTransform = new Snap.Matrix().translate(0, j * 94 + 6);
        var eventElement = eventTemplate.clone().removeClass('map-location-event-template').transform(eventTransform);
        
        // have to use jquery to populate tspan elements

        $(eventElement.select('.map-location-venue').node).text(eventData.venue);
        $(eventElement.select('.map-location-date').node).text(eventData.date.getMonth() + '/' + eventData.date.getDay() + '/' + eventData.date.getFullYear() + ' - ' + formatAMPM(eventData.date));
        $(eventElement.select('.map-location-info').node).attr('xlink:href', eventData.link);

      }

      // animation and interactions (using jquery for better mouse event handlers)

      var $element = $(location.element.node);

      $element.data({
        initialWidth: location.element.select('.map-text-location').getBBox().width + 21,
        initialHeight: 44,
        targetWidth: location.element.select('.map-location-text').getBBox().width + 21,
        targetHeight: 95 * location.events.length
      });

      $element.on({
        mouseenter: onLocationMouseEnter,
        mouseleave: onLocationMouseLeave
      }).trigger('mouseleave'); // trigger mouseout state

      globals.shows.locations.push(location);

    }

  }

  function onLocationMouseEnter() {

    var $this = $(this);

    TweenMax.to($this.find('.map-location-box'), 0.5, {
      attr: {
        width: $this.data('targetWidth'),
        height: $this.data('targetHeight') + $this.data('initialHeight'),
        y: ($this.data('targetHeight') + $this.data('initialHeight')) * -1
      },
      ease: Quint.easeOut
    });

    TweenMax.to($this.find('.map-location-mask-rect'), 0.5, {
      attr: {
        height: $this.data('targetHeight') + $this.data('initialHeight'),
        width: $this.data('targetWidth')
      },
      ease: Quint.easeOut
    });

    TweenMax.to($this.find('.map-location-text'), 0.5, {
      y: $this.data('targetHeight') * -1,
      ease: Quint.easeOut
    });

  }

  function onLocationMouseLeave() {

    var $this = $(this);

    TweenMax.to($this.find('.map-location-box'), 0.5, {
       attr: {
        width: $this.data('initialWidth'),
        height: $this.data('initialHeight'),
        y: $this.data('initialHeight') * -1
      },
      ease: Quint.easeInOut
    });

    TweenMax.to($this.find('.map-location-box'), 0.5, {
       attr: {
        width: $this.data('initialWidth'),
        height: $this.data('initialHeight'),
        y: $this.data('initialHeight') * -1
      },
      ease: Quint.easeInOut
    });

    TweenMax.to($(this).find('.map-location-mask-rect'), 0.5, {
       attr: {
        height: $this.data('initialHeight'), 
        width: $this.data('initialWidth')
      },
      ease: Quint.easeInOut
    });

    TweenMax.to($this.find('.map-location-text'), 0.5, {
      y: 0,
      ease: Quint.easeInOut
    });
    
  }

  function buildTableShows(locations) {

    globals.shows.list = [];

    // pull shows out of locations

    for(var i=0; i < locations.length; i++) {

      var location = locations[i];

      for(var j=0; j < location.events.length; j++) {

        var show = location.events[j];
        show.city = location.city;
        show.state = location.state;
        show.date = new Date(show.date);

        globals.shows.list.push(show);

      }

    }

    globals.shows.list.sort(function(a,b) {
      return a.date - b.date;
    });

    // build elements

    var template = elements['map'].select('.table-row-template');

    for(var k=0; k < globals.shows.list.length; k++) {

      var show = globals.shows.list[k];

      var transform = new Snap.Matrix().translate(0, k * 42);
      var element = template.clone().removeClass('table-row-template').transform(transform);

      element.select('.table-row-date').attr('text', show.date.getMonth() + '/' + show.date.getDay());
      element.select('.table-row-location').attr('text', show.city + ', ' + show.state);
      element.select('.table-row-venue').attr('text', show.venue);
      element.select('.table-row-time').attr('text', formatAMPM(show.date));

      globals.shows.list[k].element = element;

    }

  }


  function displayShows(duration) {

    $container.addClass('shows-state');

    // show outline stars duration draw animation

    TweenMax.to(elements['map'].select('.map-outline-points').node, 3, {
      opacity: 1,
      delay: 0.4
    });

    // show header

    TweenMax.to(elements['map'].select('.map-header-text').node, 0.5, {
      attr: {
        y: 0
      },
      alpha: 1,
      delay: 1,
      ease: Back.easeOut
    });

    TweenMax.to(elements['map'].select('.map-header-toggle').node, 0.5, {
      y: 15,
      alpha: 1,
      delay: 1.2,
      ease: Back.easeOut
    });

    // animate in location markers

    for(var i=0; i < globals.shows.locations.length; i++) {

      var element = globals.shows.locations[i].element;

      TweenMax.to(element.select('.location-dot').node, 0.3, {
        attr: {
          r: 5
        },
        delay: 2 + i * 0.2,
        ease: Back.easeOut
      });

      TweenMax.to(element.select('.map-location-hover').node, 0.8, {
        x: 0,
        y: 0,
        opacity: 1,
        delay: 2.2 + i * 0.2,
        ease: Elastic.easeOut
      });

    }

  }

  function displayShowsTable() {

    $container.addClass('shows-table-state');

    for(var i=0; i < globals.shows.list.length; i++) {

      console.log(globals.shows.list[i].element);

      TweenMax.to(globals.shows.list[i].element.select('.table-row-content').node, 1, {
        x: 0,
        overwrite: true,
        delay: i * 0.4 + 1
      });

    }

    // $(elements['map'].node).find('.table-row').each(function(idx, el) {

    //   console.log(idx);

      

    // });

    // TweenMax.to(elements['map'].select('.map-outline').node, 1, {
    //   opacity: 0,
    //   overwrite: true
    // });

  }

  function hideShows(duration) {

    // fade out outline stars

    TweenMax.to(elements['map'].select('.map-outline-points').node, 3 * duration, {
      opacity: 0,
      overwrite: true
    });

    // hide header

    TweenMax.to(elements['map'].select('.map-header-text').node, 0.4 * duration, {
      attr: {
        y: 50
      },
      alpha: 0,
      overwrite: true
    });

    TweenMax.to(elements['map'].select('.map-header-toggle').node, 0.4 * duration, {
      y: 65,
      alpha: 0,
      overwrite: true
    });

    // animate out location markers

    for(var i=0; i < globals.shows.locations.length; i++) {

      var element = globals.shows.locations[i].element;

      TweenMax.to(element.select('.location-dot').node, 0.3 * duration, {
        attr: {
          r: 0
        },
        ease: Back.easeIn,
        overwrite: true
      });

      TweenMax.to(element.select('.map-location-hover').node, 0.8 * duration, {
        x: 20,
        y: -20,
        opacity: 0,
        ease: Back.easeIn,
        overwrite: true
      });

    }

    // for(var i=0; i < globals.shows.length; i++) {

    //   var element = globals.shows[i].element;

    //   TweenMax.to(element.select('.location-dot').node, 0.5, {
    //     attr: {
    //       r: 0
    //     },
    //     ease: Back.easeIn,
    //     overwrite: true
    //   });

    //   TweenMax.to(element.select('.map-location-hover').node, 0.5, {
    //     x: 20,
    //     y: -20,
    //     opacity: 0,
    //     ease: Back.easeIn,
    //     overwrite: true
    //   });

    // }

  }

  function showTableView() {

    for(var i=0; i < globals.shows.length; i++) {

      var element = globals.shows[i].element;

      TweenMax.to(element.select('.location-dot').node, 0.5, {
        attr: {
          r: 0
        },
        ease: Back.easeIn
      });

      TweenMax.to(element.select('.map-location-hover').node, 0.5, {
        x: 20,
        y: -20,
        opacity: 0,
        ease: Back.easeIn
      });

    }


  }

  function lookDown(duration) {

    globals.status = 'down';

    TweenMax.to(elements['cliff'].node, duration, {
      y: -200
    });

    TweenMax.to(elements['mountains'].node, duration, {
      y: -300
    });

    TweenMax.to(elements['giant'].node, duration, {
      y: -175
    });

    TweenMax.to(elements['cloud5'].node, duration, {
      y: -150
    });

    TweenMax.to(elements['cloud4'].node, duration, {
      y: -125
    });

    TweenMax.to(elements['cloud3'].node, duration, {
      y: -100
    });

    TweenMax.to(elements['cloud2'].node, duration, {
      y: -75
    });

    TweenMax.to(elements['cloud1'].node, duration, {
      y: -50
    });

    TweenMax.to(elements['stars'].node, duration, {
      y: -20
    });

  }

  function lookAtGiant(duration) {

    // TweenMax.to(elements['cliff'].node, duration, {
    //   x: -8000,
    //   scale: 5,
    //   ease: Quint.easeIn,
    // });



    // TweenMax.to(elements['mountains'].node, duration, {
    //   y: 300,
    //   scale: 5,
    //   transformOrigin: '50% 0%'
    // });

    // TweenMax.to(elements['giant'].node, duration, {
    //   y: -200,
    //   x: -50,
    //   scale: 2,
    //   transformOrigin: '50% 0%'
    // });

  }

  function lookCenter(duration) {

    globals.status = 'center';

    hideShows();

    $container.removeClass();

    for(var i in elements) {
      TweenMax.to(elements[i].node, duration, {
        x: 0,
        y: 0,
        scale: 1
      });
    }

  }

  function intro() {

    var duration = 5;
    var easing = Quint.EaseOut;

    TweenMax.from(elements['cliff'].node, duration, {
      y: 1800,
      ease: easing
    });

    TweenMax.from(elements['mountains'].node, duration, {
      y: 1300,
      ease: easing
    });

    TweenMax.from(elements['giant'].node, duration, {
      y: 1000,
      ease: easing
    });

    TweenMax.from(elements['cloud5'].node, duration, {
      y: 1000,
      ease: easing
    });

    TweenMax.from(elements['cloud4'].node, duration, {
      y: 900,
      ease: easing
    });

    TweenMax.from(elements['cloud3'].node, duration, {
      y: 800,
      ease: easing
    });

    TweenMax.from(elements['cloud2'].node, duration, {
      y: 700,
      ease: easing
    });

    TweenMax.from(elements['cloud1'].node, duration, {
      y: 600,
      ease: easing
    });

    TweenMax.from(elements['stars'].node, duration, {
      y: 400,
      ease: easing
    });

  }

  $(document).on('keydown', function(e) {

    var code = e.keyCode;

    switch(code) {

      // left arrow
      case 37:
      (globals.status === 'right') ? lookCenter(2) : lookLeft(2);
      break;

      // up arrow
      case 38:
      (globals.status === 'down') ? lookCenter(2) : lookUp(3);
      break;

      // right arrow
      case 39:
      (globals.status === 'left') ? lookCenter(2) : lookRight(2);
      break;

      // down arrow
      case 40:
      (globals.status === 'up') ? lookCenter(2) : lookDown(3);
      break;

    }

  });




  
  $(document).click(function() {
    // $("#audio-player").toggleClass('open');
    // $('body').toggleClass('nav-open');
  })

  // function buildScarf() {

  //   var settings = {
  //     wavelength: 10,
  //     amplitude: 7,
  //     period: 200,
  //     startY: 30,
  //     width: 150,
  //     height: 100
  //   };

  //   var t = new Snap.Matrix().translate(1000, 1000);



  // }

  // scarf 

  function buildScarf() {

    var settings = {
      wavelength: 10,
      amplitude: 7,
      period: 200,
      squeeze: -0.8,
      startY: 30
    };

    var w = 150;
    var h = 100;
    var length = w - 30;

    var t = new Snap.Matrix().translate(-140, -23);
    var scarf = s.polyline();
    var scarfContainer = s.group().transform(t).addClass('scarf').append(scarf);

    setInterval(function() {

      var points = [];
      var now = (new Date) / settings.period;

      function getCoordinates(x) {

        var pct = x / w;
        var o = Math.sin(x / settings.wavelength - now) * settings.amplitude * pct;
        
        return { x: w-x, y: settings.startY + o }

      }

      for(var x=0; x<length; ++x) {

        var coordinates = getCoordinates(x);
        points.push(coordinates.x);
        points.push(coordinates.y);

      }

      scarf.attr('points', points);

    }, 60);

     elements['jack'].select('g').append(scarfContainer);


  }

  





  

  //console.log(points);







}