function animateWaves() {

    var parameters = {
        clouds1: {
            initialScale: {x:2, y:2},
            targetScale: {x:1.25, y:2},
            targetX: 90,
            duration: 2,
        },
        clouds2: {
            initialScale: {x:1.8, y:1.8},
            targetScale: {x:1, y:2},
            targetX: 99,
            duration: 3,
        },
        clouds3: {
            initialScale: {x:1.5, y:1.5},
            targetScale: {x:1, y:2.5},
            targetX: 99,
            duration: 5,
        },
        clouds4: {
            initialScale: {x:1.2, y:1.2},
            targetScale: {x:1, y:2.5},
            targetX: 99,
            duration: 6,
        },
        cloudslow: {
            initialScale: {x:1, y:1},
            targetScale: {x:2, y:2.5},
            targetX: 99,
            duration: 1,
        }
    };

    $('.clouds').each(function(idx, el) {

        var params = parameters[el.id];

        $(this).find('.clouds-section').each(function() {

            var xPos = 0;
            var scaleX = params.initialScale.x;
            var scaleY = params.initialScale.y;

            $(this).find('.cloud').each(function(idx, el) {

                if(idx === 0) {

                    // scale first cloud up from nothing

                    TweenMax.to(el, 0, {
                      scaleX: params.initialScale.x,
                      scaleY: 0,
                      x: '-100%',
                      y: 2000,
                      transformOrigin:"0% 100%"
                    });

                    TweenMax.to(el, 5, {
                      scaleX: params.initialScale.x,
                      scaleY: params.initialScale.y,
                      x:  '0%',
                      ease: Linear.easeNone,
                      repeat: -1
                    });


                } else {

                    // normal transition for looping

                    TweenMax.to(el, 0, {
                      scaleX: scaleX,
                      scaleY: scaleY,
                      x: xPos + '%',
                      y: 2000,
                      transformOrigin:"0% 100%"
                    });

                    xPos += params.targetX * scaleX;
                    scaleX = params.targetScale.x * scaleX;
                    scaleY = params.targetScale.y * scaleY;

                    TweenMax.to(el, params.duration, {
                      scaleX: scaleX,
                      scaleY: scaleY,
                      x: xPos + '%',
                      ease: Linear.easeNone,
                      repeat: -1
                    });

                } 

            });

        });

    });

    // $('.clouds').each(function(idx, el) {

    //     var params = parameters[el.id];

    //     if(!params) {
    //         return false;
    //     }

    //     var group = $('<svg>').addClass('clouds-section right')

    //     for(var i=0; i < 5; i++) {

    //         var cloud = $('<g>').addClass('cloud');
    //         var path = $('<path>').attr('d', params.path).appendTo(cloud);

    //         cloud.appendTo(group);

    //     }

    //     $(this).append(group);

 

    // });



// $('.clouds-section').each(function(el) {

//     var x = 0;
//     var scaleX = scaleY = 2;
//     var yScale = $(this).data('yscale');
//     var xScale = $(this).data('xscale');
//     var xVal = $(this).data('xval');

//     $(this).find('.cloud').each(function(idx, el) {

//         if(idx > 0) {

//             TweenMax.to(el, 0, {
//               scaleX: scaleX,
//               scaleY: scaleY,
//               x: x + '%',
//               y: 300,
//               transformOrigin:"0% 100%"
//             });

//             x += xVal * scaleX;
//             scaleX = xScale * scaleX;
//             scaleY = yScale * scaleY;

//             TweenMax.to(el, 5, {
//               scaleX: scaleX,
//               scaleY: scaleY,
//               x: x + '%',
//               ease: Linear.easeNone,
//               repeat: -1
//             });

//         } else {

//             TweenMax.to(el, 0, {
//               scaleX: 2,
//               scaleY: 0,
//               x: '-100%',
//               y: 300,
//               transformOrigin:"0% 100%"
//             });

//             TweenMax.to(el, 5, {
//               scaleX: 2,
//               scaleY: 2,
//               x:  '0%',
//               ease: Linear.easeNone,
//               repeat: -1
//             });

//         }

        

//     });

// });

// $('.wave').each(function(idx, el) {

    

// });
    
//     function animateWave(wave, index, scaleX, scaleY, xPos, yPos) {

        


//     }

}

function drawStars() {

    var stars = '';

    for(var i=0; i < 300; i++) {

        var x = Math.random();
        var y = Math.random();
        var opacity = Math.random() * (1 - y) + 0.1;
        var size = Math.random() * 2 * (1 - y);
        var dur = Math.random() * 10 + 3;
        var delay = Math.random() * 1;

        stars += '<circle cx="' + x * 100 + '%"' + ' cy="' + y * 100 + '%" r="' + size + '">';
        stars += ' <animate attributeName="fill-opacity"  values="' + opacity + '; 0.1; 0.4; 0.3; 0.5; 0.7; 0.3; 0.5; 0.8; ' + opacity + ';"  dur="' + dur + 's" repeatCount="indefinite"/>';
        stars += '</circle>';
    }

    $('#stars').html(stars);

}


var s;

$(document).ready(function() {

    //drawRibbon();
    animateWaves();
    startParallax();
    drawStars();

});


function startParallax() {

    var constants = {
        jackandthegiantmiddle: 3000
    };

    s = skrollr.init({
        constants: constants
    });

}


drawRibbon();

function drawRibbon() {

    var canvas = $('#scarf')[0];
    var ctx = canvas.getContext('2d');

    var settings = {
        wavelength: 20,
        amplitude: 30,
        period: 150,
        squeeze: -0.1,
        startY: 30
    };

    var w = canvas.width - 40;
    var h = canvas.height;
    var points = [];

    setTimeout(function() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.lineWidth = 5;
        ctx.strokeStyle="#E61859";

        var now = (new Date) / settings.period;
        var length = w - 30;

        function getCoordinates(x) {

            var pct = x / w;
            var o = Math.sin(x / settings.wavelength - now) * settings.amplitude * pct;
            
            return { x: w-x, y: settings.startY + o }

        }


        // ribbon

        for(var x=0; x<length; ++x) {

            var coordinates = getCoordinates(x);
            ctx.lineTo(coordinates.x, coordinates.y);
            points.push({x:coordinates.x, y: coordinates.y});

        }

        console.log(points);
       
        ctx.stroke();

        // stripe

        ctx.beginPath();
        ctx.lineCap = 'square';

        // ctx.strokeStyle="#FFFFFF";
        // var stripeStart = getCoordinates(100);
        // var stripeEnd = getCoordinates(101);

        // ctx.lineTo(stripeStart.x, stripeStart.y);
        // ctx.lineTo(stripeEnd.x, stripeEnd.y);

        // ctx.stroke();





    }, 60);

}