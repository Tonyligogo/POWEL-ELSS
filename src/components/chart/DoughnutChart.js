import React, { useEffect, useState } from 'react'
import {Chart as ChartJS, ArcElement,Tooltip, Legend} from "chart.js"
import {Doughnut} from "react-chartjs-2"
import './DoughnutChart.css'

ChartJS.register(
    ArcElement,
    Legend,
    Tooltip
)

function DoughnutChart({sales, expenses}) {
  const [totalExpenseSum, setTotalExpenseSum] = useState(0);
  const [totalSaleSum, setTotalSaleSum] = useState(0);

  useEffect(() => {
      var totalExpense = expenses?.map(expense => expense.total_cost)
      const expenseSum = totalExpense.reduce((acc, num) => acc + num, 0);
      setTotalExpenseSum(expenseSum);
      var totalSale = sales?.map(sale => sale.product_details?.totalPrice)
      const saleSum = totalSale.reduce((acc, num) => acc + num, 0);
      setTotalSaleSum(saleSum);
 },[sales,expenses]);
  var data = {
    labels: ['Sales','Expenses'],
    datasets: [{
      label: 'Total',
      data: [ totalSaleSum, totalExpenseSum],
      backgroundColor: [
        'rgba(255, 99, 132, 0.3)',
        'rgba(54, 162, 235, 0.3)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 0.3)',
        'rgba(54, 162, 235, 0.3)'
      ],
      hoverOffset: 0
    }
  ]
  };
  var options = {
    radius:100,
    cutout: 80
  };
  return (
    <div className='doughnutBox'>
      <Doughnut
        data={data}
        options={options}
      />
    </div>
  )
}

export default DoughnutChart