import "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

export default function GenreMusicChart() {
  const randomGenre = Math.floor(Math.random() * 100) + 1;
  const data = {
    labels: ["Pop", "Rock", "Reggeaton"],
    datasets: [
      {
        data: [randomGenre(), randomGenre(), randomGenre()],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div style={{ width: "150px", height: "150px" }}>
      <Doughnut data={data} />
    </div>
  );
}
