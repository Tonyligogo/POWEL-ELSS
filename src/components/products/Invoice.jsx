import axios from "axios"
import Sidebar from "../sidebar/sidebar"
import './Invoice.css'
import { useEffect, useState } from "react"

axios.defaults.withCredentials = true


function Invoice() {
    
    const [data, setData] = useState([])
    const [order, setOrder] = useState([])
    
          useEffect(()=>{
            axios.get("http://localhost:5000/api/dashboard/all-orders",{
              headers: {authorization: "jwt " + sessionStorage.getItem("token")}
            })
          .then((response)=>{
              setData(response.data.orders.at(-1))
              setOrder(Object.entries(response.data.orders.at(-1).cart?.items))
              console.log(Object.entries(response.data.orders.at(-1).cart?.items))
              console.log(Object.entries(response.data.orders.at(-1).cart?.items)[0][1].item)
          }).catch((error)=>{
              console.log(error)
          })
          },[])
          if(order){
            console.log(order,'this is me')
            var eachOrder = order.map((item)=>(
              item[1].item
            ))
          }
          console.log(eachOrder,'eachorder')
         
  return (
    <div className='home'>
    <Sidebar/>
    <div className="homeContainer">
      <div className="allProductsHeading">  
        <h3>Sale</h3>
      </div>
        <div className='allProducts'>
            <div className="recordsTableContainer">
            {data ?<div className="saleDetails">
                            <span>Client name: {data.name}</span>
                            <span>Phone number: {data.phone_number}</span>
                            <span>No. of Items: {data.cart?.totalQty}</span>
                            <span>Total price: {data.cart?.totalPrice}</span>
                            <span>Date: {data.date}</span>
                    </div>
              : null}
                <table className="staffRecordsTable">
                    <thead className="staffTHead">
                        <tr>
                            <th>ID</th>
                            <th>Product name</th>
                            <th>Product description</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody className="staffTBody">
                        {order? (
                          eachOrder.map((newOrder,idx)=>(
                            <tr key={newOrder._id}>
                              <td>{idx}</td>
                              <td>{newOrder.name}</td>
                              <td>{newOrder.desc}</td>
                              <td>{newOrder.price}</td>
                            </tr>
                          ))
                        ) :null}
                    </tbody>
                </table>
            </div>
      </div>
    </div>
  </div>
  )
}

export default Invoice