
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

    if (typeof this.params.center != "undefined") {
      this.setCenter(this.params.center);
    }

    if (typeof this.params.rotate != "undefined") {
      this.setRotate(this.params.rotate);
    }

    if (typeof this.params.scale != "undefined") {
      this.setScale(this.params.scale);
    }

    if (typeof this.params.translate != "undefined") {
      this.setTranslate(this.params.translate);
    }

    if (typeof this.params.parallels != "undefined") {
      this.setParallels(this.params.parallels);
    }

    this.clear();

    this.control = d3.select(this.container).append('svg');
    this.container.style.width = this.width + "px";
    this.container.style.height = this.height + "px";

    return this;
  }

  Shoropleth.prototype.clear = function() {
    while(this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }

  Shoropleth.prototype.getProjection = function() {
    var width = this.width;
    var height = this.height;

    return d3.geo.albers()
      .center(this.getCenter())
      .rotate(this.getRotate())
      .parallels(this.getParallels())
      .scale(this.getScale())
      .translate([width / 2, height / 2]);
  }

  Shoropleth.prototype.setCenter = function(center) {
    this.center = center;
    return this;
  }
  Shoropleth.prototype.getCenter = function() {
    return this.center;
  }

  Shoropleth.prototype.setRotate = function(rotate) {
    this.rotate = rotate;
    return this;
  }
  Shoropleth.prototype.getRotate = function() {
    return this.rotate;
  }

  Shoropleth.prototype.setScale = function(scale) {
    this.scale = scale;
    return this;
  }
  Shoropleth.prototype.getScale = function() {
    return this.scale;
  }

  Shoropleth.prototype.setTranslate = function(translate) {
    this.translate = translate;
    return this;
  }
  Shoropleth.prototype.getTranslate = function() {
    return this.translate;
  }

  Shoropleth.prototype.setParallels = function(parallels) {
    this.parallels = parallels;
    return this;
  }
  Shoropleth.prototype.getParallels = function() {
    return this.parallels;
  }


  Shoropleth.prototype.load = function(url) {
    var that = this;
    d3.json(url, function(error, data) {
      that.render(data);
    });
  }

  Shoropleth.prototype.render = function(data) {

    var subunits = topojson.feature(data, data.objects.subunits);

    var projection = this.getProjection();

    var path = d3.geo.path().projection(projection);

//    this.control.append("path")
//      .datum(subunits)
//      .attr("d", path);

    this.control.selectAll(".subunit")
      .data(subunits.features)
      .enter().append("path")
//      .attr("class", function(d) {
////        this.style.fill = 'red';
//        return "subunit " + d.id;
//      })
      .attr("d", path);
  }

  Shoropleth.prototype.getSVGControl = function() {
    return this.control[0][0];
  }

  return Shoropleth;

});
