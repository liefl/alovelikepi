var JATT = JATT || {};

JATT.Assets = (function() {

  JATT.elements = [];

  var assets = [
    {
      name: 'mountains',
      path: 'images/mountains.svg',
      xPos: 0,
      yPos: 700
    },
    {
      name: 'mountains2',
      path: 'images/mountains-2.svg',
      xPos: 0,
      yPos: 380
    },
    {
      name: 'stars',
      path: 'images/stars.svg',
      xPos: 0,
      yPos: 0
    },
    {
      name: 'moon',
      path: 'images/moon.svg',
      xPos: 1750,
      yPos: 730
    },
    {
      name: 'giant',
      path: 'images/giant.svg',
      xPos: 1240,
      yPos: 680
    },
    {
      name: 'cliff',
      path: 'images/cliff.svg',
      xPos: -700,
      yPos: 1000
    },
    {
      name: 'jack',
      path: 'images/jack.svg',
      xPos: 1260,
      yPos: 995
    },
    {
      name: 'cloud1',
      path: 'images/cloud-1.svg',
      xPos: 0,
      yPos: 0
    },
    {
      name: 'cloud2',
      path: 'images/cloud-2.svg',
      xPos: 0,
      yPos: 75
    },
    {
      name: 'cloud3',
      path: 'images/cloud-3.svg',
      xPos: 0,
      yPos: 160
    },
    {
      name: 'cloud4',
      path: 'images/cloud-4.svg',
      xPos: 0,
      yPos: 225
    },
    {
      name: 'cloud5',
      path: 'images/cloud-5.svg',
      xPos: 0,
      yPos: 280
    },
    {
      name: 'cloud6',
      path: 'images/cloud-6.svg',
      xPos: 0,
      yPos: 320
    },
    {
      name: 'map',
      path: 'images/map.svg',
      xPos: 1030,
      yPos: 450
    }
  ];

  var loadAssets = function() {

    var dfd = new $.Deferred();
    var loaded = 0;

    for(var k in assets) {
      loadAsset(assets[k]);
    }

    function loadAsset(asset) {

      Snap.load(asset.path, function(f) {

        var t = new Snap.Matrix().translate(asset.xPos, asset.yPos);
        var g = f.select('g').transform(t);

        JATT.elements[asset.name] = JATT.s.group().addClass(asset.name).append(g);

        if(++loaded === assets.length) {
          onAssetsLoaded();
        }

      });

    }

    function onAssetsLoaded() {

      // controlling depth

      JATT.s.append(JATT.elements['stars']);
      JATT.s.append(JATT.elements['moon']);
      JATT.s.append(JATT.elements['cloud1']);
      JATT.s.append(JATT.elements['cloud2']);
      JATT.s.append(JATT.elements['cloud3']);
      JATT.s.append(JATT.elements['cloud4']);
      JATT.s.append(JATT.elements['cloud5']);
      JATT.s.append(JATT.elements['giant']);
      JATT.s.append(JATT.elements['cloud6']);
      JATT.s.append(JATT.elements['cloud7']);
      JATT.s.append(JATT.elements['mountains2']);
      JATT.s.append(JATT.elements['mountains']);
      JATT.s.append(JATT.elements['cliff']);

      // adding child elements

      JATT.elements['stars'].append(JATT.elements['map']);
      JATT.elements['cliff'].append(JATT.elements['jack']);


      // return success

      dfd.resolve();

    }

    return dfd.promise();

  };

  return {
    load: loadAssets
  };

})();

