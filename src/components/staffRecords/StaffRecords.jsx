import { useEffect, useState } from "react";
import "./staffrecords.css";
import Table from "./Table";
import axios from "axios";
import { Icon } from '@iconify/react';
import { CircularProgress } from "@mui/material";


export default function StaffRecords() {
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
      fetchEmployeeData()   
   },[]);

    async function fetchEmployeeData(){
      setLoading(true)
      await axios.get("http://localhost:5000/api/dashboard/employee-data",
      {
        headers: {authorization: "jwt " + sessionStorage.getItem("token")}
      }
      ).then(response => {
        setData(response.data.employees);
        setFinished(true)
      }).finally(()=>{
        setLoading(false)
      })
    }  
  
    return (
        <div>
          <div>
            <div className="staffRecordsHeading">  
                <h3>Staff Records</h3>
                <div className="searchBarStaff">
                    <Icon icon="mdi:search" color="gray" width="20" />
                    <input
                        className="search"
                        placeholder="Search..."
                        onChange={(e) => setQuery(e.target.value.toLowerCase())}
                    />
                  </div>
            </div>
            {!loading ? 
            <div>
            {data.length && finished ?
                <div className="staffRecords">
                  
                  <Table data={data} query={query} fetchEmployeeData={fetchEmployeeData}/>
                </div>
             : <p>There is no staff record.</p>}
             </div>: <CircularProgress size="24px" className="progress"/> } 
          </div>
      </div>
    );
  };