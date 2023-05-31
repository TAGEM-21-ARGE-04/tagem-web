import react from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend
);
  
export const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart',
      }
    },
};
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'AUGUST', 'SEPTEMBER', 'NOVEMBER', 'DECEMBER'];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map((a, i) => i * 30),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };
const TimeChart = () => {
    return <Line options={options} data={data} />;
  };
  
  export default TimeChart;