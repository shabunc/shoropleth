define([
  'shoropleth'
], function(Shoropleth) {

  var sh = new Shoropleth().init('#uk1', {
    width: 96,
    height: 116
  });

  sh.load('data/uk.json');


});