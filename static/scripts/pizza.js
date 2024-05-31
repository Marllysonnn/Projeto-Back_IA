async function fetchData() {
  const response = await fetch('/dados_ataque_cardiaco');
  const data = await response.json();
  return data;
}

am5.ready(async function() {
  // Fetch data from backend
  const data = await fetchData();

  // Prepare chart data
  const chartData = [
      { category: 'Homem', value: data.Homem },
      { category: 'Mulher', value: data.Mulher }
  ];

  // Create root element
  var root = am5.Root.new("chartpizza");

  // Set themes
  root.setThemes([
      am5themes_Animated.new(root)
  ]);

  // Create chart
  var chart = root.container.children.push(
      am5percent.PieChart.new(root, {
          endAngle: 270
      })
  );

  // Create series
  var series = chart.series.push(
      am5percent.PieSeries.new(root, {
          valueField: "value",
          categoryField: "category",
          endAngle: 270
      })
  );

  series.states.create("hidden", {
      endAngle: -90
  });

  // Set data
  series.data.setAll(chartData);

  series.appear(2000, 100);
});