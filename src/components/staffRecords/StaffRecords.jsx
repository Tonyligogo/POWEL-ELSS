import { useEffect, useState } from "react";
import "./staffrecords.css";
import Table from "./Table";
import Sidebar from "../sidebar/sidebar";
import axios from "axios";
import { Icon } from '@iconify/react';


export default function StaffRecords() {
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
  
    useEffect(() => {
        axios.get("http://localhost:5000/api/dashboard/employee-data",
        {
          headers: {authorization: "jwt " + localStorage.getItem("token")}
        }
        ).then(response => {
          setData(response.data.employees);
        })
    },[]);
  
    return (
        <div className="home">
        <Sidebar/>
          <div className="homeContainer">
            <div className="staffRecordsHeading">  
                <h3>Staff Records</h3>
            </div>
            <div className="staffRecords">
                <div className="searchBar">
                <Icon icon="mdi:search" color="gray" width="20" />
                <input
                    className="search"
                    placeholder="Search..."
                    onChange={(e) => setQuery(e.target.value.toLowerCase())}
                />
                </div>
                <Table data={data} query={query}/>
            </div>
          </div>
      </div>
    );
  };