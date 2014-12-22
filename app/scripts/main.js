$(document).ready(function () {
  createJackAndTheGiant();
});

function createJackAndTheGiant () {

  var s = Snap('#jackandthegiant');
  var globals = {
    status: 'center',
    width: 3000,
    height: 2000,
    clouds: {
      height: 2000,
      initY: 1600
    }
  };

  var assets = [
    {
      name: 'mountains',
      path: 'images/mountains.svg',
      xPos: 0,
      yPos: 800
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
      xPos: 1400,
      yPos: 680
    },
    {
      name: 'cliff',
      path: 'images/cliff.svg',
      xPos: -700,
      yPos: 1000
    }
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

    

    s.append(elements['stars']);
    drawStars();
    buildClouds();
    s.append(elements['giant']);
    s.append(elements['mountains']);
    s.append(elements['cliff']);

    addListeners();

  }

  function addListeners() {

    $(elements['giant'].node).on('click', function() {
      lookAtGiant(3);
    });
  }

  function drawStars() {

    // $('.stars').on('mouseenter', function(e) {
    //   TweenMax.to(e.target, 1, {
    //     scale: 2,
    //     transformOrigin: '50% 50%'
    //   });
    // });



    // var stars = '';

    // for(var i=0; i < 500; i++) {

    //     var x = Math.random();
    //     var y = Math.random();
    //     var opacity = Math.random() * (1 - y) + 0.1;
    //     var size = Math.random() * 3 * (1 - y);
    //     var dur = Math.random() * 10 + 3;
    //     var delay = Math.random() * 1;

    //     stars += '<circle cx="' + x * 100 + '%"' + ' cy="' + y * 100 + '%" r="' + size + '">';
    //     stars += ' <animate attributeName="fill-opacity"  values="' + opacity + '; 0.1; 0.4; 0.3; 0.5; 0.7; 0.3; 0.5; 0.8; ' + opacity + ';"  dur="' + dur + 's" repeatCount="indefinite"/>';
    //     stars += '</circle>';
    // }

    // $('#stars').html(stars);

  }

  function speechBubble(text) {

    var text = s.text(1400, 1000,  text);
    elements['cliff'].append(text);
  }

  function buildClouds() {

    var cloudData = [
      {
        path: 'M0,2.4h3.8C57,2.4,33.3,0,109.2,0l2.6,0v4H0V2.4z',
        color: '#223448',
        y: 1000,
        animation: {
          duration: 6,
          targetX: 99,
          initScaleX: 1.2,
          initScaleY: 1.2,
          targetScaleX: 1,
          targetScaleY: 2.5
        }
      },
      {
        path: 'M0,2.4h3.8C57,2.4,33.3,0,109.2,0l2.6,0v4H0V2.4z',
        color: '#274455',
        y: 1075,
        animation: {
          duration: 5,
          targetX: 99,
          initScaleX: 1.5,
          initScaleY: 1.5,
          targetScaleX: 1,
          targetScaleY: 2.5
        }
      },
      {
        path: 'M97.5,0C63.8,0,59.8,0.5,48.4,1.3C39.5,2,30.4,2.9,0,2.9v2.9h97.5V0z',
        color: '#4fb98f',
        y: 1150,
        animation: {
          duration: 3,
          targetX: 99,
          initScaleX: 1.8,
          initScaleY: 1.8,
          targetScaleX: 1,
          targetScaleY: 2
        }
      },
      {
        path: 'M0,2.4V1.7c8.6-0.4,16.2-1.2,23.2-1.5c8.2-0.4,10.3,0.2,11.5,0.6c1.3,0.5,3.1,0.3,5.7,0.1c8.2-0.6,11.2,0.7,7.8,1.6H0z',
        color: '#9beea6',
        y: 1225,
        animation: {
          duration: 2,
          targetX: 90,
          initScaleX: 2,
          initScaleY: 2,
          targetScaleX: 1.25,
          targetScaleY: 2
        }
      },
      {
        path: 'M0,2.4h3.8C57,2.4,33.3,0,109.2,0l2.6,0v4H0V2.4z',
        color: '#f0ffb4',
        y: 1280,
        animation: {
          duration: 1,
          targetX: 99,
          initScaleX: 1,
          initScaleY: 1,
          targetScaleX: 2,
          targetScaleY: 2.5
        }
      }
    ];

    for(var i=0; i < cloudData.length; i++) {

      var data = cloudData[i];

      var container = s.group().addClass('clouds clouds-' + i).attr({
        fill: data.color
      });

      var g1 = s.group().addClass('clouds-section').transform(new Snap.Matrix().translate(globals.width / 2 - 200, data.y));
      var cloud = g1.group().append(s.path(data.path)).addClass('cloud');

      for(var j=0; j < 8; j++) {
        cloud.clone();
      }

      container.append(g1);

      var g2 = g1.clone().transform(new Snap.Matrix().translate(globals.width / 2 + 200, data.y).scale(-1,1));

      s.rect(0, data.y - 4, '100%', 400).appendTo(container); // extend bottom
      s.append(container);

      elements['clouds' + i] = container;

      // POSITION & ANIMATE CLOUDS //

      $(container.node).find('.clouds-section').each(function() {

        var xPos = 0;
        var scaleX = data.animation.initScaleX;
        var scaleY = data.animation.initScaleY;

        $(this).find('.cloud').each(function(idx, el) {

          if(idx === 0) {

            // scale first cloud up from nothing

            TweenMax.to(el, 0, {
              scaleX: data.animation.initScaleX,
              scaleY: 0,
              x: '-100%',
              transformOrigin:"0% 100%"
            });

            TweenMax.to(el, data.animation.duration, {
              scaleX: data.animation.initScaleX,
              scaleY: data.animation.initScaleY,
              x:  '0%',
              ease: Linear.easeNone,
              repeat: -1
            });


        } else {

            TweenMax.to(el, 0, {
              scaleX: scaleX,
              scaleY: scaleY,
              x: xPos + '%',
              transformOrigin:"0% 100%"
            });

            xPos += data.animation.targetX * scaleX;
            scaleX = data.animation.targetScaleX * scaleX;
            scaleY = data.animation.targetScaleY * scaleY;

            TweenMax.to(el, data.animation.duration, {
              scaleX: scaleX,
              scaleY: scaleY,
              x: xPos + '%',
              ease: Linear.easeNone,
              repeat: -1
            });

          }



        });
      });

    }

  }

  loadExternalAssets();

  





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
      x: -700,
      scale: 1.4
    });

    TweenMax.to(elements['mountains'].node, duration, {
      x: -400,
      scale: 1.05
    });

    TweenMax.to(elements['giant'].node, duration, {
      x: 600,
      scale: 0.95
    });

    TweenMax.to(elements['clouds4'].node, duration, {
      x: 100
    });

    TweenMax.to(elements['clouds3'].node, duration, {
      x: 150
    });

    TweenMax.to(elements['clouds2'].node, duration, {
      x: 200
    });

    TweenMax.to(elements['clouds1'].node, duration, {
      x: 250
    });

    TweenMax.to(elements['clouds0'].node, duration, {
      x: 200
    });

    TweenMax.to(elements['stars'].node, duration, {
      x: 100
    });

  }

  function lookLeft(duration) {

    globals.status = 'left';

    TweenMax.to($('.cliff'), 2, {
      x: -200,
      scale: 1.2
    });

    TweenMax.to($('.mountains'), 2, {
      x: 300
    });

    TweenMax.to($('.giant'), 2, {
      x: 00,
      scale: 0.9
    });

    TweenMax.to($('.clouds-4'), 2, {
      x: -100
    });

    TweenMax.to($('.clouds-3'), 2, {
      x: -150
    });

    TweenMax.to($('.clouds-2'), 2, {
      x: -250
    });

    TweenMax.to($('.clouds-1'), 2, {
      x: -350
    });

    TweenMax.to($('.clouds-0'), 2, {
      x: -450
    });

    TweenMax.to($('.stars'), 2, {
      x: -50
    });

  }

  function lookUp(duration) {

    globals.status = 'up';

    TweenMax.to(elements['cliff'].node, duration, {
      y: 800
    });

    TweenMax.to(elements['mountains'].node, duration, {
      y: 700
    });

    TweenMax.to(elements['giant'].node, duration, {
      y: 700
    });

    TweenMax.to(elements['clouds4'].node, duration, {
      y: 700
    });

    TweenMax.to(elements['clouds3'].node, duration, {
      y: 600
    });

    TweenMax.to(elements['clouds2'].node, duration, {
      y: 500
    });

    TweenMax.to(elements['clouds1'].node, duration, {
      y: 400
    });

    TweenMax.to(elements['clouds0'].node, duration, {
      y: 300
    });

    TweenMax.to(elements['stars'].node, duration, {
      y: 100
    });

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

    TweenMax.to(elements['clouds4'].node, duration, {
      y: -150
    });

    TweenMax.to(elements['clouds3'].node, duration, {
      y: -125
    });

    TweenMax.to(elements['clouds2'].node, duration, {
      y: -100
    });

    TweenMax.to(elements['clouds1'].node, duration, {
      y: -75
    });

    TweenMax.to(elements['clouds0'].node, duration, {
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

    TweenMax.from(elements['cliff'].node, duration, {
      y: 1800
    });

    TweenMax.from(elements['mountains'].node, duration, {
      y: 1300
    });

    TweenMax.from(elements['giant'].node, duration, {
      y: 1000
    });

    TweenMax.from(elements['clouds4'].node, duration, {
      y: 1000
    });

    TweenMax.from(elements['clouds3'].node, duration, {
      y: 900
    });

    TweenMax.from(elements['clouds2'].node, duration, {
      y: 800
    });

    TweenMax.from(elements['clouds1'].node, duration, {
      y: 700
    });

    TweenMax.from(elements['clouds0'].node, duration, {
      y: 600
    });

    TweenMax.from(elements['stars'].node, duration, {
      y: 400
    });



    // TweenMax.from(elements['stars'].node, 5, {
    //   y: 200
    // });

    // TweenMax.from(elements['giant'].node, 10, {
    //   scale: 80,
    //   delay: 2,
    //   ease: Circ.easeInOut,
    //   transformOrigin: '50% 50%'
    // });

    // TweenMax.from(elements['mountains'].node, 1, {
    //   scale: 4,
    //   delay: 6,
    //   y: 600,
    //   ease: Circ.easeInOut,
    //   transformOrigin: '50% 0%'
    // });

    // TweenMax.from($('.clouds-0'), 5, {
    //   y: 0,
    //   scale: 3,
    //   delay: 0.5,
    //   transformOrigin:"50% 0%"
    // });

    // TweenMax.from($('.clouds-1'), 5, {
    //   y: 0,
    //   scale: 3,
    //   delay: 1,
    //   transformOrigin:"50% 0%"
    // });

    // TweenMax.from($('.clouds-2'), 5, {
    //   y: 0,
    //   scale: 3,
    //   delay: 1.5,
    //   transformOrigin:"50% 0%"
    // });

    // TweenMax.from($('.clouds-3'), 5, {
    //   y: 0,
    //   scale: 3,
    //   delay: 2,
    //   transformOrigin:"50% 0%"
    // });

    // TweenMax.from($('.clouds-4'), 5, {
    //   y: 0,
    //   scale: 3,
    //   delay: 2.5,
    //   transformOrigin:"50% 0%"
    // });


    // TweenMax.from($('.giant'), 5, {
    //   y: 0,
    //   scale: 80,
    //   delay: 0,
    //   transformOrigin:"50% 50%"
    // });

    // TweenMax.from($('.mountains'), 5, {
    //   y: 0,
    //   scale: 3,
    //   delay: 3,
    //   transformOrigin:"50% 0%"
    // });

    // TweenMax.from($('.cliff'), 5, {
    //   x: -2000,
    //   scale: 80,
    //   delay: 1,
    //   transformOrigin:"50% 0%"
    // });

  }

  $(document).on('keydown', function(e) {

    var code = e.keyCode;

    switch(code) {

      // left arrow
      case 37:
      (globals.status === 'right') ? lookCenter(2) : lookLeft(3);
      break;

      // up arrow
      case 38:
      (globals.status === 'down') ? lookCenter(2) : lookUp(3);
      break;

      // right arrow
      case 39:
      (globals.status === 'left') ? lookCenter(2) : lookRight(3);
      break;

      // down arrow
      case 40:
      (globals.status === 'up') ? lookCenter(2) : lookDown(3);
      break;

    }

  });


  setTimeout(function() {
    //intro();


  }, 400);

  
  $(document).click(function() {
    $("#audio-player").toggleClass('open');
  })

  // scarf 

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

  

  var t = new Snap.Matrix().translate(1000, 1000);
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

  scarf.attr('stroke', '#E61859');
  scarf.attr('fill', 'none');
  scarf.attr('stroke-width', '4');
  scarf.attr('stroke-linecap', 'round');


  setTimeout(function() {
    elements['cliff'].append(scarfContainer);
  }, 1000)
  

  //console.log(points);







}