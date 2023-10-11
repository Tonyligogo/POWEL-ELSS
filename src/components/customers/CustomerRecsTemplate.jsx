import React from 'react'
import Table from "./Table";
import axios from "axios";
import { useQuery } from 'react-query';
import { ThreeDots } from 'react-loader-spinner';

function  CustomerRecsTemplate({path, query}) {
    
    const fetchCustomers = ()=>{
      return axios.get("http://localhost:5000/api/dashboard/customer-details",
      {
        headers: {authorization: "jwt " + sessionStorage.getItem("token")}
      }
      )
    }
    const {data, isLoading} = useQuery('customers', fetchCustomers)

  return (
    <div>
        {isLoading 
          ? 
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
        {data.data?.customers?.length  ?
            <div className="staffRecords">
              <Table data={data} query={query} path={path} fetchCustomers={fetchCustomers}/>
            </div> 
            :
         <p>There is no customer record.</p>}
         </div> }
    </div>
  )
}

export default CustomerRecsTemplate