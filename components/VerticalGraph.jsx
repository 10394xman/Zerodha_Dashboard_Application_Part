import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'  ,
    },
    title: {
      display: true,
      text: 'Holdings',
    },
  },
};


export const VerticalGraph = ({ data }) => (
  <div style={{ width: "100%", maxWidth: 1000, height: 500, margin: "0 auto" }}>
    <Bar data={data} options={{
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { beginAtZero: true },
        y: { beginAtZero: true }
      }
    }} />
  </div>
);