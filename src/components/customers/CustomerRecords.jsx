import "./CustomerRecords.css"
import CustomerRecsTemplate from "./CustomerRecsTemplate";
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import { useState } from "react";


function CustomerRecords() {
  const [query, setQuery] = useState("");
  return (
    <div>
      <div>
        <div className="staffRecordsHeading">  
            <h3>Customer Records</h3>
            <div className="myLinks">
            <div className="searchBarStaff">
                <Icon icon="mdi:search" color="gray" width="20" />
                <input
                    className="search"
                    placeholder="Search..."
                    onChange={(e) => setQuery(e.target.value.toLowerCase())}
                />
              </div>
            <Link to="/NewCustomer">
              <button>Add new Customer</button>
            </Link>
          </div>
        </div>
        <CustomerRecsTemplate query={query}/>
        </div>
  </div>
  )
}

export default CustomerRecords