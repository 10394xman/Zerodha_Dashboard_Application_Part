import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ watchlist }) => {
  const data = {
    labels: watchlist.map((item) => item.name),
    datasets: [
      {
        label: "Stock Price",
        data: watchlist.map((item) => item.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(255, 205, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(201, 203, 207, 0.7)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "30rem", margin: "24px auto" }}>
      <Doughnut data={data} />
    </div>
  );
};

export default DoughnutChart;
