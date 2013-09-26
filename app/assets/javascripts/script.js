
var Map = function(selector){
  this.elem = $(selector); 
  this.elem.vectorMap({
    map: 'usa_en',
    backgroundColor: 'none',
    color: '#f4f3f0',
    hoverColor: 'rgba(240,242,241,0.9)',
    selectedColor: 'rgba(21,21,11,1)',
    scaleColors: ['#b6d6ff', '#005ace'],
    normalizeFunction: 'linear',
    enableZoom: false,
    showTooltip: false,
    selectedRegions: null,
    multiSelectRegion: false
  });
};

Map.prototype.statChange = function(){
  var self = this;
  $(this.elem).on('regionClick.jqvmap', function(event, code, region){
      self.elem.attr('class', 'display');
      $('#close').show();
      $('.stats').show();
      $.post('/update',{ state: region }, function(response){
        console.log(response);
        self.assignStats(region, response.pupil_cost, response.inmate_cost)
      })
  });
}

Map.prototype.assignStats = function(state, pupil_cost, inmate_cost){
  $('#state').text(state)
  // $('#recidivism').text(recidivism)
  $('#inmate_cost').text(inmate_cost)
  $('#pupil_cost').text(pupil_cost)
}


$(document).ready(function() {
    $('#close').hide();
    $('.stats').hide();
    var map = new Map('#vmap');
    map.statChange();
    $("#close").on('click', function(event){
      $("#vmap").attr('class', 'center');
      $('#close').hide();
    $('.stats').hide();
    })

  
  // var data_array = [4, 8, 15, 16, 23, 42];

  // var w = 20,
  //   h = 80;

  // var x = d3.scale.linear()
  //   .domain([0, 1])
  //   .range([0, w]);

  // var y = d3.scale.linear()
  //   .domain([0, 100])
  //   .rangeRound([0,h]);

  // var chart = d3.select("body").append("svg")
  //   .attr("class", "chart")
  //   .attr("width", w * data_array.length - 1)
  //   .attr("height", h);

  // var bars = chart.selectAll("rect")
  //   .data(data_array)
  //   .enter().append("rect")
  //   .attr("x", function(d, i) { return x(i) - .5; })
  //   .attr("y", 80)
  //   .attr("width", w)
  //   .attr("height", y );

  //   $('button').on("click", function() {
  //   bars.transition().attr("y",function(d) { return h - y(d) - .5; });
  // })

  // chart.append("line")
  //    .attr("x1", 0)
  //    .attr("x2", w * data_array.length)
  //    .attr("y1", h - .5)
  //    .attr("y2", h - .5)
  //    .style("stroke", "black");
  });







