import React from 'react'
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, PointElement, LineElement, Legend} from "chart.js"
import {Bar} from "react-chartjs-2"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip
)

function BarChart() {

  var data = {
    labels: ['Monday','Tuesday','Wednesday','Thursday','Friday'],
    datasets: [{
      label: 'Sales',
      data: [650, 590, 800, 810, 560, 550, 400],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1,
      order: 2,
      yAxisID: 'Sales'
    },
    {
      label: 'Expense',
      data: [75, 60, 85, 85, 50, 62, 45],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.4,
      type: 'line',
      order: 1,
      yAxisID: 'Expense'
    }
  ]
  };
  var options = {
    aspectRatio: 2,
    scales:{
      Sales:{
        beginAtZero: true,
        type: 'linear',
        position: 'right'
      },
      Expense:{
        beginAtZero: true,
        type: 'linear',
        position: 'left'
      }
    },
    plugins: {
      tooltip: {
        yAlign: 'bottom'
      }
    }
  }

  return (
    <div>
      <Bar
        data={data}
        options={options}
      />
    </div>
  )
}

export default BarChart