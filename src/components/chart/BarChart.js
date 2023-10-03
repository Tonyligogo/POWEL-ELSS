import React from 'react'
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, PointElement, LineElement, Legend} from "chart.js"
import {Bar} from "react-chartjs-2"
import './BarChart.css'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip
)

function BarChart({expenses, sales, loading, salesLoading}) {
  
  function getDayOfWeek(dateString) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const dayOfWeek = daysOfWeek[date.getDay()];
    return dayOfWeek;
  }

  const salesByDayOfWeek = {};
  sales?.data?.orders?.forEach(order => {
    const dayOfWeek = getDayOfWeek(order.createdAt);
    const totalSales = order?.product_details?.totalPrice
    if (!salesByDayOfWeek[dayOfWeek]) {
      salesByDayOfWeek[dayOfWeek] = totalSales;
    }else{
      salesByDayOfWeek[dayOfWeek] += totalSales
    }
});

  const expensesByDayOfWeek = {};
  expenses?.data?.expenses?.forEach(expense => {
  const dayOfWeek = getDayOfWeek(expense.createdAt);
  const totalExpenses = expense?.total_cost
  if (!expensesByDayOfWeek[dayOfWeek]) {
    expensesByDayOfWeek[dayOfWeek] = totalExpenses;
  }
  expensesByDayOfWeek[dayOfWeek] += totalExpenses;
});

const predefinedDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const salesData = predefinedDayNames.map(dayName => salesByDayOfWeek[dayName] || 0);
const expensesData = predefinedDayNames.map(dayName => expensesByDayOfWeek[dayName] || 0);


  var data = {
    labels: predefinedDayNames,
    datasets: [{
      label: 'Sales',
      data:salesData,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(153, 102, 255)'
      ],
      borderWidth: 1,
      order: 2,
      yAxisID: 'Sales'
    },
    {
      label: 'Expense',
      data:expensesData,
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
    maintainAspectRatio:false,
    scales:{
      Sales:{
        beginAtZero: true,
        type: 'linear',
        position: 'right',
        grid:{display:false}
      },
      Expense:{
        beginAtZero: true,
        type: 'linear',
        position: 'left',
        grid:{display:false}
      }
    },
    plugins: {
      tooltip: {
        yAlign: 'bottom'
      }
    }
  }

  return (
    <div className='chartBox'>
      <Bar
        data={data}
        options={options}
      />
    </div>
  )
}

export default BarChart