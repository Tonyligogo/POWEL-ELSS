import './home.css';
import Sidebar from '../components/sidebar/sidebar';
import Widget from '../components/widgets/widget';
// import Recents from '../components/recents/recents';
import RecentService from '../components/recentservice/recentService'
import BarChart from '../components/chart/BarChart';
import DoughnutChart from '../components/chart/DoughnutChart';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sales, setSales] = useState([]); // This is data for the doughnut chart
  const [error, setError] = useState("");
  const [expenses, setExpenses] = useState([]); //This is data for the doughnut chart
  // const [services, setServices] = useState([]);
  useEffect(()=>{
    axios.all([
      axios.get("http://localhost:5000/api/dashboard/expenses-records",
     {
       headers: {authorization: "jwt " + sessionStorage.getItem("token")}
     }
     ),
      axios.get("http://localhost:5000/api/dashboard/all-orders",
         {
         headers: {authorization: "jwt " + sessionStorage.getItem("token")}
         }
       ),
       axios.get("http://localhost:5000/api/dashboard/service-form-data",
       {
        headers: {authorization: "jwt " + sessionStorage.getItem("token")}
      })
     ])
     .then(axios.spread((data1, data2, data3) => {
      setExpenses(data1.data.expenses);
      setSales(data2.data.orders);
      setData(data2.data.orders.slice(-3))
      console.log(data2.data.orders.slice(-3))
      // setServices(data3.data.service_forms)
  })).catch((error)=>{
    console.log(error)
      if(error.response.status === 401){
        setError('It seems you are not authorized.Try logging in again')
      }else{
        setError('Check your connection then try again')
      }
  }).finally(() => {
    setLoading(false);
  });
  },[])
  return (
    <div className='home'>
      <Sidebar/>
      <div className='homeContainer'>
        <div className="widgets">
          <Widget type="sales"/>
          <Widget type="expenses"/>
          <Widget type="services"/>
          <Widget type="serviceForm"/>
        </div>
        <div className="middleContainer">
            <h3>Recent Sales</h3>
            <div className="recentServiceContainer">
              <RecentService data={data} error={error} loading={loading}/>
            </div>
          </div>
        <div className="bottomContainer">
          <div className="barChart">
            <BarChart/>
          </div>
          <div className="rightContainer">
            <DoughnutChart sales={sales} expenses={expenses}/>
          </div>
        </div>
        <div>
        <h3>Recent Services</h3> {/*This shows the recent services that were made*/}
            <div className="recentsContainer">
              {/* <Recents services={services}/> */}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Home