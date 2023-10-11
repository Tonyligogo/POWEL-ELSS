import './NewQuotation.css'
import { Icon } from '@iconify/react';
import axios from 'axios';
import React, { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useQuery } from 'react-query';

function CustomerTable({closeModal, onCustomerSelect}) {

    const fetchCustomers = ()=>{
        return axios.get("http://localhost:5000/api/dashboard/customer-details",
        {
          headers: {authorization: "jwt " + sessionStorage.getItem("token")}
        }
        )
      }
      const {data, isLoading} = useQuery('customers', fetchCustomers)

    const [query, setQuery] = useState("");

    const handleRowClick = (item)=>{
        onCustomerSelect(item)
        closeModal()
    }

  return (
    <div
            className="modal-container"
            onClick={(e) => {
            if (e.target.className === "modal-container") closeModal();
            }}
          >
        <div className="tableModal">
            <div className='tableModalHeader'>
                <p>Select customer</p>
                <div className="searchBarStaff">
                <Icon icon="mdi:search" color="gray" width="20" />
                <input
                    className="search"
                    placeholder="Search..."
                    onChange={(e) => setQuery(e.target.value.toLowerCase())}
                />
                </div>
            </div>
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
                    <div className="customerTableWrapper">
                      <table className="staffRecordsTable">
                          <thead className="staffTHead">
                              <tr>
                                  <th>#</th>
                                  <th>Name</th>
                                  <th>Email</th>
                                  <th>Address</th>
                              </tr>
                          </thead>
                          <tbody className="staffTBody">
                              {data.data?.customers?.length ? data.data?.customers?.filter((name)=>{
                              return query === '' ? name : name.name.toLowerCase().includes(query) || name.contact_person.toLowerCase().includes(query);
                              })
                              .map((item,idx) => (
                              <tr key={item._id} onClick={()=>handleRowClick(item)}>
                              <td>{idx}</td>
                              <td>{item.name}</td>
                              <td>{item.email}</td>
                              <td>{item.address}</td>
                              </tr>
                          )) : null}
                          </tbody>
                      </table>
                  </div>
                  </div> 
                  :
              <p>There is no customer record.</p>}
              </div> }
            </div>
        </div>
    </div>
  )
}

export default CustomerTable