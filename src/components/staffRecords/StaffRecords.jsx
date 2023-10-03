import { useState } from "react";
import "./staffrecords.css";
import Table from "./Table";
import axios from "axios";
import { Icon } from '@iconify/react';
import { useQuery } from "react-query";
import { ThreeDots } from 'react-loader-spinner'

export default function StaffRecords() {
    const [query, setQuery] = useState("");

    const fetchEmployeeData = ()=>{
      return axios.get("http://localhost:5000/api/dashboard/employee-data",
      {
        headers: {authorization: "jwt " + sessionStorage.getItem("token")}
      }) 
    }
    const {isLoading, data, refetch} =useQuery('employeeData',fetchEmployeeData)

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
            {isLoading ? 
            <div className="loader">
              <ThreeDots 
              height="80" 
              width="80" 
              radius="9"
              color="#d74221" 
              ariaLabel="three-dots-loading"
              visible={true}
              />
            </div>
            : 
            <div>
            {data.data.employees.length ?
                <div className="staffRecords">
                  
                  <Table data={data} query={query} refetchEmployeeData={refetch}/>
                </div>
             : <p>There is no staff record.</p>}
             </div> } 
          </div>
      </div>
    );
  };