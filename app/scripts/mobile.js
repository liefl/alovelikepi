var JATT = JATT || {};

JATT.Mobile = (function() {
 
  var init = function() {

    $('body').addClass('is-mobile');

    // populate news

    $.get('data/news.html', function(response) {
      $('.mobile-news').html(response);
    });

    // populate tour

    $.get('data/shows.json', function(response) {

      var shows = [];


      for(var i=0; i < response.data.locations.length; i++) {

        var location = response.data.locations[i];

        for(var j=0; j < location.events.length; j++) {

          var show = location.events[j];
          show.city = location.city;
          show.state = location.state;
          show.date = new Date(show.date);

          shows.push(show);

        }

      }

      var element = $('.show-template');
      var container = $('.shows-body');

      for(var k=0; k < shows.length; k++) {

        var show = shows[k];
        var showDate = new Date(show.date);

        console.log(show);

        var el = element.clone();

        el.find('.date').html(showDate.getMonth() + '/' + showDate.getDay());
        el.find('.time').html(formatAMPM(show.date));
        el.find('.city').html(show.city + ', ' + show.state);
        el.find('.venue').html(show.venue);
        el.find('.info').attr('href', show.link)

        el.removeClass('show-template');

        container.append(el);

        




      }



    });





    

  };

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

  return {
    init: init
  };

})();