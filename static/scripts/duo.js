am5.ready(function() {


  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("chartduo");
  
  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([
    am5themes_Animated.new(root)
  ]);
  
  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  var chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      layout: root.verticalLayout,
      arrangeTooltips: false,
      paddingLeft: 0,
      paddingRight: 10
    })
  );
  
  // Use only absolute numbers
  chart.getNumberFormatter().set("numberFormat", "#.#s");
  
  // Add legend
  // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
  var legend = chart.children.push(
    am5.Legend.new(root, {
      centerX: am5.p50,
      x: am5.p50
    })
  );
  
  // Data
  var data = [
    {
      age: "80+",
      male: -0.1,
      female: 0.3
    },
    {
      age: "74-79",
      male: -0.2,
      female: 0.3
    },
    {
      age: "68-73",
      male: -0.3,
      female: 0.6
    },
    {
      age: "62-67",
      male: -0.5,
      female: 0.8
    },
    {
      age: "56-61",
      male: -0.8,
      female: 1.0
    },
    {
      age: "50-55",
      male: -1.1,
      female: 1.3
    },
  ];
  
  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var yAxis = chart.yAxes.push(
    am5xy.CategoryAxis.new(root, {
      categoryField: "age",
      renderer: am5xy.AxisRendererY.new(root, {
        inversed: true,
        cellStartLocation: 0.1,
        cellEndLocation: 0.9,
        minorGridEnabled: true,
        minGridDistance: 20
      })
    })
  );
  
  yAxis.data.setAll(data);
  
  var xAxis = chart.xAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererX.new(root, {
        minGridDistance: 60,
        strokeOpacity: 0.1
      })
    })
  );
  
  // Add series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  function createSeries(field, labelCenterX, pointerOrientation, rangeValue) {
    var series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: field,
        categoryYField: "age",
        sequencedInterpolation: true,
        clustered: false,
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: pointerOrientation,
          labelText: "{categoryY}: {valueX}"
        })
      })
    );
  
    series.columns.template.setAll({
      height: am5.p100,
      strokeOpacity: 0,
      fillOpacity: 0.8
    });
  
    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationX: 1,
        locationY: 0.5,
        sprite: am5.Label.new(root, {
          centerY: am5.p50,
          text: "{valueX}",
          populateText: true,
          centerX: labelCenterX
        })
      });
    });
  
    series.data.setAll(data);
    series.appear();
  
    var rangeDataItem = xAxis.makeDataItem({
      value: rangeValue
    });
    xAxis.createAxisRange(rangeDataItem);
    rangeDataItem.get("grid").setAll({
      strokeOpacity: 1,
      stroke: series.get("stroke")
    });
  
    var label = rangeDataItem.get("label");
    label.setAll({
      text: field.toUpperCase(),
      fontSize: "1.1em",
      fill: series.get("stroke"),
      paddingTop: 10,
      isMeasured: false,
      centerX: labelCenterX
    });
    label.adapters.add("dy", function() {
      return -chart.plotContainer.height();
    });
  
    return series;
  }
  
  createSeries("male", am5.p100, "right", -3);
  createSeries("female", 0, "left", 4);
  
  // Add cursor
  // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
  var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
    behavior: "zoomY"
  }));
  cursor.lineY.set("forceHidden", true);
  cursor.lineX.set("forceHidden", true);
  
  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  chart.appear(1000, 100);
  
  }); // end am5.ready()