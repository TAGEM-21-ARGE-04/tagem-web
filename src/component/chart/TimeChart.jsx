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
  
const TimeChart = ({ statistic }) => {

  if (statistic == null) return;

  const data = {
    labels: statistic.labels,
    datasets: statistic.dataSets.map(ds => ({
      label: ds.name,
      data: ds.data,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    })) 
  };


    console.log({ data });
    return <Line options={options} data={data} />;
  };
  
  export default TimeChart;