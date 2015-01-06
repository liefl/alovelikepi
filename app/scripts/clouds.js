(function() {

  var data = [
    {
      url: 'images/cloud-1-raw.svg',
      duration: 6
    },
    {
      url: 'images/cloud-2-raw.svg',
      duration: 5
    },
    {
      url: 'images/cloud-3-raw.svg',
      duration: 3
    },
    {
      url: 'images/cloud-4-raw.svg',
      duration: 2
    },
    {
      url: 'images/cloud-5-raw.svg',
      duration: 1
    }
  ];


  var cloud = data[4];

  Snap.load(cloud.url, function(f) {

    var groups = f.selectAll('g');
    var html = '<g>';

    for(var i=0; i < groups.length; i++) {

      var paths = groups[i].selectAll('path');

      for(var j=0; j < paths.length - 1; j++) {

        html += '<path d="' + paths[j].attr('d') + '">';
        html += '<animate attributeName="d"';
        html += 'from="' + paths[j].attr('d') + '"';
        html += 'to="' + paths[j+1].attr('d') + '"';
        html += 'dur="' + cloud.duration + 's"';
        html += 'repeatCount="indefinite" />';
        html += '</path>';
       
      }

    }

    html += '<rect x="0" y="997" width="3000" height="700"/>';
    html += '</g>';

    $('#test').html(html);


  });



})();

// old build clouds function for reference


// function buildClouds() {

//   var cloudData = [
//     {
//       path: 'M0,2.4h3.8C57,2.4,33.3,0,109.2,0l2.6,0v4H0V2.4z',
//       color: '#223448',
//       y: 1000,
//       animation: {
//         duration: 6,
//         targetX: 99,
//         initScaleX: 1.2,
//         initScaleY: 1.2,
//         targetScaleX: 1,
//         targetScaleY: 2.5
//       }
//     },
//     {
//       path: 'M0,2.4h3.8C57,2.4,33.3,0,109.2,0l2.6,0v4H0V2.4z',
//       color: '#274455',
//       y: 1075,
//       animation: {
//         duration: 5,
//         targetX: 99,
//         initScaleX: 1.5,
//         initScaleY: 1.5,
//         targetScaleX: 1,
//         targetScaleY: 2.5
//       }
//     },
//     {
//       path: 'M97.5,0C63.8,0,59.8,0.5,48.4,1.3C39.5,2,30.4,2.9,0,2.9v2.9h97.5V0z',
//       color: '#4fb98f',
//       y: 1150,
//       animation: {
//         duration: 3,
//         targetX: 99,
//         initScaleX: 1.8,
//         initScaleY: 1.8,
//         targetScaleX: 1,
//         targetScaleY: 2
//       }
//     },
//     {
//       path: 'M0,2.4V1.7c8.6-0.4,16.2-1.2,23.2-1.5c8.2-0.4,10.3,0.2,11.5,0.6c1.3,0.5,3.1,0.3,5.7,0.1c8.2-0.6,11.2,0.7,7.8,1.6H0z',
//       color: '#9beea6',
//       y: 1225,
//       animation: {
//         duration: 2,
//         targetX: 90,
//         initScaleX: 2,
//         initScaleY: 2,
//         targetScaleX: 1.25,
//         targetScaleY: 2
//       }
//     },
//     {
//       path: 'M0,2.4h3.8C57,2.4,33.3,0,109.2,0l2.6,0v4H0V2.4z',
//       color: '#f0ffb4',
//       y: 1280,
//       animation: {
//         duration: 1,
//         targetX: 99,
//         initScaleX: 1,
//         initScaleY: 1,
//         targetScaleX: 2,
//         targetScaleY: 2.5
//       }
//     }
//   ];

//   for(var i=0; i < cloudData.length; i++) {

//     var data = cloudData[i];

//     var container = s.group().addClass('clouds clouds-' + i).attr({
//       fill: data.color
//     });

//     var g1 = s.group().addClass('clouds-section').transform(new Snap.Matrix().translate(globals.width / 2 - 200, data.y));
//     var cloud = g1.group().append(s.path(data.path)).addClass('cloud');

//     for(var j=0; j < 8; j++) {
//       cloud.clone();
//     }

//     container.append(g1);

//     var g2 = g1.clone().transform(new Snap.Matrix().translate(globals.width / 2 + 200, data.y).scale(-1,1));

//     s.rect(0, data.y - 4, '100%', 400).appendTo(container); // extend bottom
//     s.append(container);

//     elements['clouds' + i] = container;

//     // POSITION & ANIMATE CLOUDS //

//     $(container.node).find('.clouds-section').each(function() {

//       var xPos = 0;
//       var scaleX = data.animation.initScaleX;
//       var scaleY = data.animation.initScaleY;



//       $(this).find('.cloud').each(function(idx, el) {

//         console.log(scaleY);

//         if(idx === 0) {

//           // scale first cloud up from nothing

//           TweenMax.to(el, 0, {
//             scaleX: data.animation.initScaleX,
//             scaleY: 0,
//             x: '-100%',
//             transformOrigin:"0% 100%"
//           });

//           TweenMax.to(el, data.animation.duration, {
//             scaleX: data.animation.initScaleX,
//             scaleY: data.animation.initScaleY,
//             x:  '0%',
//             ease: Linear.easeNone,
//             repeat: -1
//           });


//       } else {

//           TweenMax.to(el, 0, {
//             scaleX: scaleX,
//             scaleY: scaleY,
//             x: xPos + '%',
//             transformOrigin:"0% 100%"
//           });

//           xPos += data.animation.targetX * scaleX;
//           scaleX = data.animation.targetScaleX * scaleX;
//           scaleY = data.animation.targetScaleY * scaleY;



//           TweenMax.to(el, data.animation.duration, {
//             scaleX: scaleX,
//             scaleY: scaleY,
//             x: xPos + '%',
//             ease: Linear.easeNone,
//             repeat: -1
//           });

//         }



//       });
//     });

//   }

// }