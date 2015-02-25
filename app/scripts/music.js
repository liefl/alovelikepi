var JATT = JATT || {};

JATT.Music = (function() {

  var player;

  var init = function() {

    player = $('#audio-player');
    load(186050953);
  };

  var load = function(track) {

    var embed = '<iframe id="audio-player-embed-iframe" width="100%" height="100%" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/{id}&amp;color=1f2f42&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>';

    player.html(embed.replace('{id}', track)).addClass('open');

  };

  var show = function() {

  };

  var hide = function() {

  };

  return {
    init: init,
    load: load,
    show: show,
    hide: hide
  };

})();