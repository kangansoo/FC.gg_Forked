import React from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);

const DoughnutChart = ({ win, loss }) => {
  const data = {
    labels: ['승', '무', '패'],
    datasets: [
      {
        data: [win*10, (10-win-loss)*10, loss*10],
        backgroundColor: ['rgba(94, 139, 226, 0.8)', 'rgba(255, 255, 255, 0.8)', 'rgba(255, 132, 132, 0.8)'],
        borderColor: ['rgba(94, 139, 226, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 132, 132, 1)'],
        //circumference: 180, // 도넛 반 자르기
        //rotation: 270,
      }
    ]
  };

  const Options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.formattedValue}%`;
          },
        },
      },
    },
  };

  return (
    <div style={{ height: '100px', width: '100px' }}>
      <Doughnut data={data} options={Options} />
    </div>
  );
};

export default DoughnutChart;
