
define([
  'd3',
  'topojson'

],function() {

  var data = {shoropleth: true};

  var Shoropleth = function() {}
  Shoropleth.prototype.init = function(params) {
    this.params = params;
    this.width = params.width;
    this.height = params.height;

    this.control = d3.select(document.createElement('span')).append('svg');

    return this;

//    d3.json("uk.json", function(error, uk) {
//      svg.append("path")
//        .datum(topojson.feature(uk, uk.objects.subunits))
//        .attr("d", d3.geo.path().projection(d3.geo.mercator()));
//    });
  }

  Shoropleth.prototype.load = function(url) {
    var that = this;
    d3.json(url, function(error, data) {
      that.render(data);
    });
  }

  Shoropleth.prototype.render = function(data) {
    this.control.append("path")
      .datum(topojson.feature(data, data.objects.subunits))
      .attr("d", d3.geo.path().projection(d3.geo.mercator()));

    document.body.appendChild(this.getSVGControl());
  }

  Shoropleth.prototype.getSVGControl = function() {
    return this.control[0][0];
  }

  return Shoropleth;

});
