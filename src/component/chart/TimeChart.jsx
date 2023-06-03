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

const generateRandomColor = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const alpha = Math.random().toFixed(1); // 1 ondalık basamaklı alpha değeri

  const borderColor = `rgb(${red}, ${green}, ${blue})`;
  const backgroundColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

  return {
    borderColor: borderColor,
    backgroundColor: backgroundColor
  };
}
  
const TimeChart = ({ statistic }) => {

  if (statistic == null) return;

  const data = {
    labels: statistic.labels,
    datasets: statistic.dataSets.map(ds => {
      const colors = generateRandomColor();
      return ({
        label: ds.name,
        data: ds.data,
        borderColor: colors.borderColor,
        backgroundColor: colors.backgroundColor,
      })
    }) 
  };

  return <Line options={options} data={data} />;
};

export default TimeChart;