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

function mapTourHeader() {

  var html = '';

  $('.header').find('path').each(function() {
    var points = $(this).attr('d').split(',');

    html += '<circle cx="' + points[0] + '" cy="' + points[1] + '" r="1"></circle>\n';
  });

  console.log(html);

}

