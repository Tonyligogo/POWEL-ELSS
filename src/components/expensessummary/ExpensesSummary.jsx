import "./expensessummary.css"
import Sidebar from "../sidebar/sidebar"
import { Icon } from '@iconify/react';
import {useState, useEffect} from "react"
import axios from "axios";
import Table from "./Table";

axios.defaults.withCredentials = true

function ExpensesSummary() {
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
  
    useEffect(() => {
      axios.get("http://localhost:5000/api/dashboard/expenses-records",{
        headers: {authorization: "jwt " + sessionStorage.getItem("token")}
      })
    .then((response)=>{
        setData(response.data.expenses)
    }).catch((error)=>{
        if(error.response.status === 401){
          setError('It seems you are not authorized.Try logging in again')
        }
    })
    }, []);  

    let total = data.map((item)=>(
      item.total_cost
    ))
    let sum = 0;
    total.map((item) => (
    sum += Number(item)
    ));

  return (
    <div className="home">
        <Sidebar/>
          <div className="homeContainer">
            <div className="expensesSummaryHeading">  
                <h3>Expenses Summary</h3>
                <div className="totalSales">
                  <h4>{`Total Expenses is ${sum}`}</h4>
                </div>
            </div>
            <div className="expensesSummary">
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

export default ExpensesSummary