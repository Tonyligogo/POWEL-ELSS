import "./servicessummary.css"
import Sidebar from "../sidebar/sidebar"
import { Icon } from '@iconify/react';
import {useState, useEffect} from "react"
import axios from "axios";
import Table from "./Table";

function ServicesSummary() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/api/dashboard/service-form-data",{
      headers: {authorization: "jwt " + sessionStorage.getItem("token")}
    })
  .then((response)=>{
      setData(response.data.service_forms)
  }).catch((error)=>{
    console.log(error)
      if(error.response.status === 401){
        setError('It seems you are not authorized.Try logging in again')
      }
  })
  },[])

  return (
    <div className="home">
        <Sidebar/>
          <div className="homeContainer">
            <div className="servicesSummaryHeading">  
                <h3>Services Summary</h3>
            </div>
            <div className="servicesSummary">
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

export default ServicesSummary