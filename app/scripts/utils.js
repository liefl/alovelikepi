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

