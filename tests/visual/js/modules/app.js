define([
  'shoropleth'
], function(Shoropleth) {

  var sh = new Shoropleth().init('#uk', {
    width: 960,
    height: 1160
  });

  sh.load('data/uk.json');


});