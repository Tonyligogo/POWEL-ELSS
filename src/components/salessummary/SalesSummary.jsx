import "./salessummary.css"
import Sidebar from "../sidebar/sidebar"
import { Icon } from '@iconify/react';
import {useState, useEffect} from "react"
import axios from "axios";
import Table from "./Table";

function SalesSummary() {

    const [query, setQuery] = useState("");
    const [error, setError] = useState("");
    const [data, setData] = useState([]);

    useEffect(()=>{
      axios.get("http://localhost:5000/api/dashboard/all-orders",{
        headers: {authorization: "jwt " + localStorage.getItem("token")}
      })
    .then((response)=>{
        setData(response.data.orders)
    }).catch((error)=>{
      console.log(error)
        if(error.response.status === 401){
          setError('It seems you are not authorized.Try logging in again')
        }
    })
    },[])

    let total = data.map((item)=>(
      item.cart?.totalPrice
    ))
    let sum = 0;
    total.map((item) => (
    sum += Number(item)
    ));

  return (
    <div className="home">
        <Sidebar/>
          <div className="homeContainer">
            <div className="salesSummaryHeading">  
                <h3>Sales Summary</h3>
                <div className="totalSales">
                  <h4>{`Total Sales is ${sum}`}</h4>
                </div>
            </div>
            <div className="salesSummary">
                <div className="searchBarStaff">
                <Icon icon="mdi:search" color="gray" width="20" />
                <input
                    className="search"
                    placeholder="Search..."
                    onChange={(e) => setQuery(e.target.value.toLowerCase())}
                />
                </div>
                <Table data={data} query={query} error={error}/>
            </div>
          </div>
      </div>
  )
}

export default SalesSummary