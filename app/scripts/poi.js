var JATT = JATT || {};

JATT.POI = (function() {

  var visited, locations, content;
 
  var init = function() {

    // locations = {
    //   news: {
    //     destination: 'news',
    //     element: JATT.elements['jack']
    //   },
    //   media: {
    //     destination: 'media',
    //     element: JATT.elements['giant'].select('.heart')
    //   },
    //   shows: {
    //     destination: 'shows',
    //     element: JATT.elements['giant'].select('.fairy')
    //   }
    // };

    // // add event listeners

    // for(k in locations) {
    //   locations[k].element.click(function() {
    //     JATT.Navigation.go(locations[k].destination)
    //   });
    // }

    // get cookie

    visited = ($.cookie('visited')) ? JSON.parse($.cookie('visited')) : {};

    // get content

    $.get('data/content.json', function(response) {

      content = response.data.content;
      update();

    });

   

    // update

    


  };

  var visit = function(key) {

    visited[key] = new Date().getTime();
    update();

  };

  var update = function() {

    console.log(content);

    for(var k in content) {
      if(visited[k] && visited[k] > content[k].updatedAt) {
        console.log('visited ' + k);
      } else {
        console.log('new content at ' + k);
      }
    }

    $.cookie('visited', JSON.stringify(visited));

  };

  return {
    init: init,
    visit: visit
  };

})();