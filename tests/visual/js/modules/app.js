define([
  'shoropleth',

  'd3'
], function(Shoropleth) {

  var sh = new Shoropleth().init('#uk1', {
    width: 96,
    height: 116,
    center: [0, 55.4],
    rotate: [4.4, 0],
    parallels: [50, 60],
    scale: 600
  });

  sh.load('data/uk.json');


  var sh = new Shoropleth().init('#uk2', {
    width: 96,
    height: 116,
    center: [0, 55.4],
    rotate: [4.4, 0],
    parallels: [50, 60],
    scale: 600
  });

  sh.load('data/uk.json');


});