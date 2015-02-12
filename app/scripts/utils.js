function buildPathCSS(paths) {

  var text = "";

  paths.each(function() {
    text += '\n\n#'+$(this).attr('id') + ' {\n' + '  stroke-dasharray: ' + $(this)[0].getTotalLength() + ';\n' + '  stroke-dashoffset: ' + $(this)[0].getTotalLength() + ';\n}';
  });

  console.log(text);

}

function animateTraceStars() {

  $('.trace-points').find('circle').each(function() {

    var y = $(this).attr('cy') / 600;
    var dur = Math.random() * 10 + 3;
    var opacity = 1;//Math.random() * (1 - y) + 0.1;

    $(this).html('<animate attributeName="fill-opacity"  values="' + opacity + '; 0.1; 0.5; 0.7; 0.8; ' + opacity + ';"  dur="' + dur + 's" repeatCount="indefinite"/>')

  });

}

function mapPathToCircles(path) {

  var txt = '';
  var points = path.attr('d').split(' ');

  for(var i=0; i < points.length; i++) {
    var c = points[i].split(',');
    var x = (i === 0) ? c[0].substr(1) : c[0];
    var y = c[1];

    txt += '<circle cx="' + x + '" cy="' + y + '" r="2"></circle>\n';
  }

  console.log(points);

  console.log(txt);
}

function mapPathToPolygon(path, polygon) {


  var pathPoints = path.split(' ');
  var pathPointsLength = pathPoints.length;
  var polygonPoints = polygon.split(' ');
  var polygonPointsLength = polygonPoints.length;

  var pathRatio = Math.round(pathPoints.length / polygonPoints.length);
  var pathIndex = -1;

  var targetPoints = [];

  for(var i=0; i < pathPoints.length; i++) {

    if((i % pathRatio) === 0) {
      pathIndex++;
    }

    var p = polygonPoints[pathIndex];

    targetPoints.push(p);

    //console.log(i % pathRatio);

  }

  console.log(targetPoints.join(' '));

}


function mapTourHeader() {

  var html = '';

  $('.header').find('path').each(function() {
    var points = $(this).attr('d').split(',');

    html += '<circle cx="' + points[0] + '" cy="' + points[1] + '" r="1"></circle>\n';
  });

  console.log(html);

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

function turnGroupsToPointTransform(path) {

  Snap.load(path, function(f) {

    var g = f.select('g');
    var groups = g.selectAll('g');

    for(var i=0; i < groups.length; i++) {

      var paths = groups[i].selectAll('path');
      var values = [];

      for(var j=0; j < paths.length; j++) {
        values.push(paths[j].attr('d'));
      }

      var animationHTML = '<path><animate';
      animationHTML += ' attributeName="d"';
      animationHTML += ' values="' + values.join(';') + '"';
      animationHTML += ' dur="5s"';
      animationHTML += ' begin="' + i * 0.3 + 's"';
      animationHTML += ' keyTimes="0; 0.3; 1"'
      animationHTML += ' repeatCount="indefinite"';
      animationHTML += '/></path>';
      console.log(animationHTML);

    }

    

       


  });
}

function splitPathIntoSections(path) {

  var ar = path.split(' ');
  var html = '';

  for(var i=0; i < ar.length; i++) {
    html += '<path d="M' + ar[i] + ' ' + ar[i+1] + '"/>\n'; 
  }

  console.log(html);

}

function animateRocks(node) {

  var html = '';

  $(node).find('.rocks').find('*').each(function(idx, el) {

    var depth = 15;
    var outerHTML = el.outerHTML.split('>');

    html += outerHTML[0] + '>\n';

    var animation = '  <animateTransform\n';
    animation += '    attributeName="transform"\n';
    animation += '    attributeType="XML"\n';
    animation += '    type="translate"\n';
    animation += '    from="0 ' + depth + '"\n';
    animation += '    to="0 ' + depth + '"\n';
    animation += '    dur="4.5s"\n';
    animation += '    begin="0s"\n';
    animation += '    keySplines="0.455 0.030 0.515 1; 0.455 0.030 0.515 1;"\n';
    animation += '    values="0 ' + depth + ';0 -' + depth + ';0 ' + depth + '"\n';
    animation += '    calcMode="spline"\n';
    animation += '    repeatCount="indefinite"/>\n';

    html += animation;
    html += outerHTML[1] + '>\n';            
                                                       
    //$(el).html(animation);


    


  });

  console.log(html);
}

function scarfAnimation() {

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

  var animation = [];

  for(var j=0; j < 1200; j++) {

    var points = [];
    var now = j / settings.period;

    function getCoordinates(x) {

      var pct = x / w;
      var o = Math.sin(x / settings.wavelength - now) * settings.amplitude * pct;
      
      return { x: w-x, y: settings.startY + o }

    }

    for(var x=0; x<length; ++x) {

      var coordinates = getCoordinates(x);
      points.push(coordinates.x + ',' + coordinates.y);

    }

    animation.push('M' + points.join(' '));

  }

  var animationHTML = '<animate \n';
  animationHTML += '  attributeName="d" \n';
  animationHTML += '  dur="1s"\n';
  animationHTML += '  values="' + animation.join(';\n') + '"\n';
  animationHTML += '  repeatCount="indefinite"\n';
  animationHTML += '></animate>';

  $('.scarf-path').html(animationHTML);

}

function particleAnimation() {

  var paths = [
    "M247.7,134.3c0,0-0.8,3.5,2.6,6.2s3.5,8.3,3.5,8.3",
    "M255.8,132.6c0,0,4.3,3.6,4,9.5c-0.4,9,5.4,10.2,5.4,10.2",
    "M267.2,129.2c0,0-3.7,6,0.3,11.9s2.4,9.8,2.4,9.8",
    "M274.8,126.1c0,0-3,2.8-0.9,7.2c2.7,5.7-0.5,8.2-0.5,8.2",
    "M283.7,132.6c0,0-3.6,2.4-3.6,7.5c0,5,0.6,9.4-3,12.2",
    "M293.6,131.9c-0.4,0.1-5.5,1.2-6.1,5.8s-2.1,7.9-4.4,9.2",
    "M281.4,155c0,0,4-0.6,9.2-5.7c5.2-5,9.2-0.1,13-6.9",
    "M291.7,143.9c2.1-4.6,6.7-2.7,9.2-6.8",
    "M296.2,158.1c7.4-4.4,8.7,1.2,13-3.1",
    "M279.8,164.7c10.3-5.7,12,5.4,21.9,0",
    "M279.8,170.7c4.6,5.7,11.3-4,19.1,6.7",
    "M286.1,177.4c3.2,4.5,8,3.2,11.9,8.3",
    "M276.5,179.5c9.7-0.1,4.6,9.9,17.1,12.5",
    "M279.3,188.9c0,5.7,5.8,5.5,6.8,9.5",
    "M271,180.5c-1.2,7.1,4.6,8.8,3,16.1c-1.6,7.3,3.1,9.3,3.1,9.3",
    "M266.5,192c0.6,5-5.4,5.4-2.9,12.4",
    "M263.6,180.5c1.6,12.7-9.6,9.7-8.8,19.3",
    "M258.1,159.5c-4.5-9.8-10.6-2.3-14.8-16.5",
    "M244.4,156.6c-3.9-7.5-9.4-3.6-12.4-9.7",
    "M253.8,166.2c-4.8-4.6-7.3-1-11.4-3.9c-4.1-2.8-5.7-7-11.4-5.8",
    "M238.2,167.6c-4.8-2.8-9.9-0.3-13.4-3",
    "M236.6,174.1c-5.5-1.5-6.1,4.8-11.9,2.1",
    "M254.8,171.8c-7.1,0-5,5.2-9,7c-4,1.8-7.9-0.4-11,3.8",
    "M246.4,184.1c-5.9-0.4-5.7,3.7-9.8,4.3",
    "M258.7,177.4c-6.1,2.6-3.7,8.1-7.3,11.8c-3.8,3.9-8,2.8-8,2.8"
  ];

  var animationHTML = '';

  for(var i=0; i < paths.length; i++) {

    var animation = '';
    var duration = Math.random() * 4 + 2;
    var delay = Math.random();

    animation += '<g class="particle">\n';

    // path animation

    animation += '  <animateMotion\n';
    animation += '    dur="' + duration + 's"\n';
    animation += '    begin="' + delay + 's"\n';
    animation += '    repeatCount="indefinite"\n';
    animation += '    path="' + paths[i] + '"\n';
    animation += '  />\n';

    // shape group 

    animation += '  <g class="particle-shape">\n';

    // opacity animation

    var values = [0, Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), 0];
    var times = [0, Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), 1].sort(function(a, b){return a-b});

    animation += '    <animate\n';
    animation += '      attributeName="fill-opacity"\n';
    animation += '      from="0"\n';
    animation += '      to="0"\n';
    animation += '      dur="' + duration + 's"\n';
    animation += '      begin="' + delay + 's"\n';
    animation += '      values="' + values.join(';') + '"\n';
    animation += '      keyTimes="' + times.join(';') + '"\n';
    animation += '      repeatCount="indefinite"\n';
    animation += '    />\n'

    // shape

    var size = Math.random() * 2.5;

    animation += '    <rect class="particle-shape" height="' + size + '" width="' + size + '">\n';
    animation += '      <animate\n';
    animation += '        attributeName="fill"\n';
    animation += '        from="#FFFFFF"\n';
    animation += '        to="#f0ffb4"\n';
    animation += '        dur="' + duration + 's"\n';
    animation += '        begin="' + delay + 's"\n';
    animation += '        repeatCount="indefinite"/>\n';
    animation += '    </rect>\n';

    // end shape group

    animation += '  </g>\n';
    animation += '</g>\n';

    animationHTML += animation;

  }

  console.log(animationHTML);

  $('.fairy-particles').html(animationHTML);



}





