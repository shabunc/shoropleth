define([
  'shoropleth',

  'd3'
], function(Shoropleth) {

  var RUS = {
    //.rotate([-105, 0]) .center([-10, 65]) .parallels([52, 64]) .scale(700) .translate([width / 2, height / 2]);
    //озеров Виви - Координаты: Координаты: 66°47′20″ с. ш. 93°46′31″ в. д. (G) (O) (Я)
    //66°25′N 94°15′E
    width: 900,
    height: 470,
    rotate: [-105, 0],
    center: [-13, 65],
    parallels: [52, 64],
    scale: 720
  }

  var CIS = {
    width: 900,
    height: 470,
    rotate: [-105, 0],
    center: [-13, 62],
    parallels: [52, 64],
    scale: 680
  }

  var USA = {
    //Coordinates: 38°3′56″N 97°55′25″W
    //scale 1000, translate [480, 250], rotation [96°, 0°], center ⟨-0.6°, 38.7°⟩ and parallels [29.5°, 45.5°],
    width: 00,
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

  var UK = {
    width: 500,
    height: 500,
    center: [0, 55.4],
    rotate: [4.4, 0],
    parallels: [50, 60],
    scale: 100
  }


  var drawMap = function(data_url, params) {
    var sh = new Shoropleth().init('#map', params);

    sh.load(data_url);
  }

  drawMap('data/rus.json', RUS);
  window.Shoropleth = Shoropleth;
});