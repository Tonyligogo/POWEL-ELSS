import './home.css';
import Widget from '../components/widgets/widget';
import Recents from '../components/recents/recents';
import RecentService from '../components/recentservice/recentService'
import BarChart from '../components/chart/BarChart';
import axios from 'axios';
// import { useAuthContext} from "../context/AuthProvider";
import { useQuery } from 'react-query';
import DoughnutChart from '../components/chart/DoughnutChart';

function Home() {
  // const {authToken, authenticated} = useAuthContext();

  const {isLoading: ordersLoading, data:orders, isError:isOrdersError, error:ordersError} = useQuery('orders', ()=>{
    return axios.get("http://localhost:5000/api/dashboard/all-orders",
    {
    headers: {authorization: "jwt " + sessionStorage.getItem("token")}
    }
  )
  })
  const {isLoading: expensesLoading, data:expenses} = useQuery('expenses', ()=>{
    return axios.get("http://localhost:5000/api/dashboard/expenses-records",
    {
    headers: {authorization: "jwt " + sessionStorage.getItem("token")}
    }
  )
  })
  const {isLoading:servicesLoading, data:services} = useQuery('services', ()=>{
    return axios.get("http://localhost:5000/api/dashboard/service-form-data",
    {
    headers: {authorization: "jwt " + sessionStorage.getItem("token")}
    }
  )
  })
  return (
    <div className='home'>
        <div className="widgets">
          <Widget type="sales"/>
          <Widget type="expenses"/>
          <Widget type="services"/>
          <Widget type="serviceForm"/>
        </div>
        <div className="middleContainer">
            <div className="left">
            <h3>Recent Sales</h3>
              <div className="recentSalesContainer">
              <RecentService data={orders} error={ordersError} isError={isOrdersError} loading={ordersLoading}/>
              </div>
            </div>
              <div className="right">
              <h3>Recent Services</h3>
              <div className="recentServicesContainer">
                <Recents data={services} loading={servicesLoading}/>
              </div>
              </div>
          </div>
        <div className="bottomContainer">
          <div className="left">
          <BarChart expenses={expenses} sales={orders} salesLoading={ordersLoading} loading={expensesLoading}/>
          </div>
          <div className="right">
          <DoughnutChart expenses={expenses} sales={orders}/>
          </div>
        </div>
        <div>
        </div>
    </div>
  )
}

export default Home