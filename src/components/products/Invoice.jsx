import axios from "axios"
import Sidebar from "../sidebar/sidebar"
import './Invoice.css'
import { useEffect, useState } from "react"

axios.defaults.withCredentials = true


function Invoice() {
    
    const [data, setData] = useState([])
    
          useEffect(()=>{
            axios.get("http://localhost:5000/api/dashboard/all-orders",{
              headers: {authorization: "jwt " + localStorage.getItem("token")}
            })
          .then((response)=>{
              setData(response.data.orders.at(-1))
              console.log(response.data.orders.at(-1))
          }).catch((error)=>{
              console.log(error)
          })
          },[])
         
  return (
    <div className='home'>
    <Sidebar/>
    <div className="homeContainer">
      <div className="allProductsHeading">  
        <h3>Sale</h3>
      </div>
        <div className='allProducts'>
            <div className="recordsTableContainer">
                <table className="staffRecordsTable">
                    <thead className="staffTHead">
                        <tr>
                            <th>Client Name</th>
                            <th>Number of Items</th>
                            <th>Total Price</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody className="staffTBody">
                        {data ?
                            <tr key={data._id}>
                            <td>{data.name}</td>
                            <td>{data.cart?.totalQty}</td>
                            <td>{data.cart?.totalPrice}</td>
                            <td>{data.date}</td>
                          </tr>
                     : null}
                    </tbody>
                </table>
            </div>
      </div>
    </div>
  </div>
  )
}

export default Invoice