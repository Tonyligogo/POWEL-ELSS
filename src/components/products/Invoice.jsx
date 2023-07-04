import axios from "axios"
import Sidebar from "../sidebar/sidebar"
import './Invoice.css'
import { useState } from "react"

axios.defaults.withCredentials = true


function Invoice() {
    
    const [data, setData] = useState([])
    async function fetchInvoice(){

        await axios.get("http://localhost:5000/api/dashboard/all-orders",{
                headers: {authorization: "jwt " + localStorage.getItem("token")}
              })
            .then((response)=>{
                setData(response.data.orders)
                console.log(response.data.orders[0].cart)
            }).catch((error)=>{
                console.log(error)
            })
      }

  return (
    <div className='home'>
    <Sidebar/>
    <div className="homeContainer">
      <div className="productListHeading">  
        <h3>Invoice</h3>
      </div>
      <div className="productList">
        <div className='productsWrapper'>
            <button onClick={fetchInvoice}>Fetch</button>
            <div className='tableContainer'>
                <table>
                    <thead>
                    <tr>
                        <th>Client Name</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                   {data &&
                    <tbody>
                        {data.map((invoice)=>(
                            <tr key={invoice._id}>
                                <td>{invoice.name}</td>
                                <td>{invoice.cart.items.name}</td>
                                <td>{invoice.cart.totalQty}</td>
                                <td>{invoice.cart.totalPrice}</td>
                                <td>{invoice.date}</td>
                            </tr>
                        ))}
                    </tbody>}
                </table>
            </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Invoice