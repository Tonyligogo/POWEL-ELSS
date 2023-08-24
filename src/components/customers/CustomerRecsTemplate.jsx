import React from 'react'
import { useEffect, useState } from "react";
import Table from "./Table";
import axios from "axios";
import { Icon } from '@iconify/react';
import { CircularProgress } from "@mui/material";

function CustomerRecsTemplate({path}) {

    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
      fetchCustomerData()   
   },[]);

    async function fetchCustomerData(){
      setLoading(true)
      await axios.get("http://localhost:5000/api/dashboard/customer-details",
      {
        headers: {authorization: "jwt " + sessionStorage.getItem("token")}
      }
      ).then(response => {
        setData(response.data.customers);
        setFinished(true)
      }).finally(()=>{
        setLoading(false)
      })
    }

  return (
    <div>
        {!loading ? 
        <div>
        {data.length && finished ?
            <div className="staffRecords">
              <div className="searchBarStaff">
                <Icon icon="mdi:search" color="gray" width="20" />
                <input
                    className="search"
                    placeholder="Search..."
                    onChange={(e) => setQuery(e.target.value.toLowerCase())}
                />
              </div>
              <Table data={data} query={query} path={path} fetchCustomerData={fetchCustomerData}/>
            </div>
         : <p>There is no customer record.</p>}
         </div>: <CircularProgress size="24px" className="progress"/> }
    </div>
  )
}

export default CustomerRecsTemplate