define([
  'shoropleth',

  'd3'
], function(Shoropleth) {

  var RUSSIA = {
    //озеров Виви - Координаты: Координаты: 66°47′20″ с. ш. 93°46′31″ в. д. (G) (O) (Я)
    //66°25′N 94°15′E
    width: 500,
    height: 500,
//    center: [0, 66.47],
//    rotate: [93.4, 0],
//    parallels: [42, 70],
//    scale: 100
      //.rotate([-105, 0]) .center([-10, 65]) .parallels([52, 64]) .scale(700) .translate([width / 2, height / 2]);
    rotate: [-105, 0],
    center: [0, 65],
    parallels: [52, 64],
    scale: 100
  }

  var USA = {
    //Coordinates: 38°3′56″N 97°55′25″W
    //scale 1000, translate [480, 250], rotation [96°, 0°], center ⟨-0.6°, 38.7°⟩ and parallels [29.5°, 45.5°],
    width: 500,
    height: 500,
    center: [0, 38.7],
    rotate: [96, 0],
    parallels: [29.5, 45.5],
    scale: 100
  }

  var JAPAN = {
    //Coordinates: 38°3′56″N 97°55′25″W
    //scale 1000, translate [480, 250], rotation [96°, 0°], center ⟨-0.6°, 38.7°⟩ and parallels [29.5°, 45.5°],
    width: 500,
    height: 500,
    center: [0, 38.7],
    rotate: [96, 0],
    parallels: [29.5, 45.5],
    scale: 100
  }


  var drawMap = function(data_url, params) {
    var sh = new Shoropleth().init('#map', params);

    sh.load(data_url);
  }


  drawMap('data/rus.json', RUSSIA);

  window.Shoropleth = Shoropleth;
});