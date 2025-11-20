import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function TrendChart({ data, label }) {
  const chartData = {
    labels: data.map(d => d.year),
    datasets: [
      {
        label: label.toUpperCase(),
        data: data.map(d => d[label]),
        borderWidth: 2,
        tension: 0.2
      }
    ]
  };

  return <Line data={chartData} />;
}
