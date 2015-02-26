var JATT = JATT || {};

JATT.Shows = (function() {

  var loaded = false;
  var shows = [];
  var locations = [];

  var init = function() {

    if(loaded) {
      displayShows();
    } else {
      load();
    }

  };

  var load = function() {

    $.get('data/shows.json', function(response) {

      loaded = true;

      buildMapShows(response.data.locations);
      buildTableShows(response.data.locations);

      hideShows(0);
      displayShows();

    });

  };


  var buildMapShows = function(data) {

    var template = JATT.elements['map'].select('.map-location-template');

    for(var i=0; i < data.length; i++) {

      var location = data[i];

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

      locations.push(location);

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

  function formatAMPM(date) {

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
    
  }

  function buildTableShows(locations) {

    // pull shows out of locations

    for(var i=0; i < locations.length; i++) {

      var location = locations[i];

      for(var j=0; j < location.events.length; j++) {

        var show = location.events[j];
        show.city = location.city;
        show.state = location.state;
        show.date = new Date(show.date);

        shows.push(show);

      }

    }

    shows.sort(function(a,b) {
      return a.date - b.date;
    });

    // build elements

    var template = JATT.elements['map'].select('.table-row-template');

    for(var k=0; k < shows.length; k++) {

      var show = shows[k];

      var transform = new Snap.Matrix().translate(0, k * 42);
      var element = template.clone().removeClass('table-row-template').transform(transform);

      element.select('.table-row-date').attr('text', show.date.getMonth() + '/' + show.date.getDay());
      element.select('.table-row-location').attr('text', show.city + ', ' + show.state);
      element.select('.table-row-venue').attr('text', show.venue);
      element.select('.table-row-time').attr('text', formatAMPM(show.date));
      element.select('.table-row-info').attr('xlink:href', show.link);

      TweenMax.to(element.select('.table-row-content').node, 0, {
        x: -200,
        y: -20,
        opacity: 0,
        scale: 1.4,
      });

      shows[k].element = element;

    }

    // attach listeners

    JATT.elements['map'].select('.toggle-table').click(displayShowsTable);
    JATT.elements['map'].select('.toggle-map').click(hideShowsTable);

  }


  function displayShows(duration) {

    JATT.c.addClass('shows-state');

    // show outline stars duration draw animation

    TweenMax.to(JATT.elements['map'].select('.map-outline-points').node, 3, {
      opacity: 1,
      delay: 0.4
    });

    // show header

    TweenMax.to(JATT.elements['map'].select('.map-header-text').node, 0.5, {
      attr: {
        y: 0
      },
      alpha: 1,
      delay: 1,
      ease: Back.easeOut
    });

    TweenMax.to(JATT.elements['map'].select('.map-header-toggle').node, 0.5, {
      y: 15,
      alpha: 1,
      delay: 1.2,
      ease: Back.easeOut
    });

    // animate in location markers

    for(var i=0; i < locations.length; i++) {

      var element = locations[i].element;

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

  function hideShows(duration) {

    // fade out outline stars

    TweenMax.to(JATT.elements['map'].select('.map-outline-points').node, 3 * duration, {
      opacity: 0,
      overwrite: true
    });

    // hide header

    TweenMax.to(JATT.elements['map'].select('.map-header-text').node, 0.4 * duration, {
      attr: {
        y: 50
      },
      alpha: 0,
      overwrite: true
    });

    TweenMax.to(JATT.elements['map'].select('.map-header-toggle').node, 0.4 * duration, {
      y: 65,
      alpha: 0,
      overwrite: true
    });

    // animate out location markers

    for(var i=0; i < locations.length; i++) {

      var element = locations[i].element;

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

  }

  function displayShowsTable() {

    JATT.c.addClass('shows-table-state');

    for(var i=0; i < shows.length; i++) {

      TweenMax.to(shows[i].element.select('.table-row-content').node, 0.8, {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        overwrite: true,
        delay: i * 0.1 + 0.8,
        ease: Back.easeOut
      });

    }

  }

  function hideShowsTable() {

    JATT.c.removeClass('shows-table-state');

    for(var i=0; i < shows.length; i++) {

      TweenMax.to(shows[i].element.select('.table-row-content').node, 0.1, {
        x: -200,
        y: -20,
        opacity: 0,
        scale: 1.4,
        overwrite: true,
        delay: 0.5
      });

    }

  }

  var hide = function() {

    JATT.c.removeClass('shows-state');

    hideShows(0.5);
    hideShowsTable();

  };

  return {
    init: init,
    hide: hide
  };

})();