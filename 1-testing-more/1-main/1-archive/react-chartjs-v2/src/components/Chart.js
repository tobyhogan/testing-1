import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { default as barChart } from "../bar_chart";
import { default as lineChart } from "../line_chart";
import { default as pieChart } from "../pie_chart";

function Chart(props) {
  return (
    <div className="chart">
      <Bar data={barChart.data} options={barChart.options} />
      <Line data={lineChart.data} options={lineChart.options} />
      <Pie data={pieChart.data} options={pieChart.options} />
    </div>
  );
}

Chart.defaultProps = {
  displayTitle: true,
  displayLegend: false,
  legendPosition: "bottom"
};

export default Chart;
