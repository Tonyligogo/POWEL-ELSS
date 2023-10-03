import { useState } from "react";
import CustomerRecsTemplate from "../customers/CustomerRecsTemplate"
import { Icon } from '@iconify/react';

function CreateQuotation() {
    const path = 'quotation'
    const [query, setQuery] = useState("");
  return (
    <div className='newUser'>
        <div className="newUserContainer">
            <div className="newUserTitle generateQuotationHeader">
                <h3>Generate quotation</h3>
                <div className="searchBarStaff">
                <Icon icon="mdi:search" color="gray" width="20" />
                <input
                    className="search"
                    placeholder="Search..."
                    onChange={(e) => setQuery(e.target.value.toLowerCase())}
                />
              </div>
            </div>
            <div className="newUserDetails">
                <p>Select the customer that wants to make a purchase</p>
                <CustomerRecsTemplate path={path} query={query}/>
            </div>
        </div>
    </div>
  )
}

export default CreateQuotation