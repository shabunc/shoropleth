
define([
  'd3',
  'topojson'

],function() {

  var data = {shoropleth: true};

  var Shoropleth = function() {}
  Shoropleth.prototype.init = function(container_selector, params) {
    this.params = params;
    this.width = params.width;
    this.height = params.height;
    this.container = document.querySelector(container_selector);

    if (typeof this.params.getProjection === "function") {
      this.getProjection = this.params.getProjection;
    }

    this.control = d3.select(this.container).append('svg');
    this.container.style.width = this.width + "px";
    this.container.style.height = this.height + "px";

    return this;
  }

  Shoropleth.prototype.load = function(url) {
    var that = this;
    d3.json(url, function(error, data) {
      that.render(data);
    });
  }


  Shoropleth.prototype.getProjection = function() {
    var width = this.width;
    var height = this.height;

    return d3.geo.albers()
      .center([0, 55.4])
      .rotate([4.4, 0])
      .parallels([50, 60])
      .scale(600)
      .translate([width / 2, height / 2]);
  }

  Shoropleth.prototype.render = function(data) {
    var subunits = topojson.feature(data, data.objects.subunits);

    var projection = this.getProjection();
    console.log("PROJE", projection);

    var path = d3.geo.path().projection(projection);

    this.control.append("path")
      .datum(subunits)
      .attr("d", path);
  }

  Shoropleth.prototype.getSVGControl = function() {
    return this.control[0][0];
  }

  return Shoropleth;

});
