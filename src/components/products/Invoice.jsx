import axios from "axios"
import './Invoice.css'
import { useEffect, useRef, useState } from "react"
import ReactToPrint from "react-to-print"
import { Link } from "react-router-dom"

axios.defaults.withCredentials = true


function Invoice() {
    
    const [data, setData] = useState([])
    const [customerData, setCustomerData] = useState([])
    const [order, setOrder] = useState([])
    const [price, setPrice] = useState({})
    const [disabled, setDisabled] = useState(true);
    const componentRef = useRef()
    
          useEffect(()=>{
            axios.get("http://localhost:5000/api/dashboard/latest-order-invoice",{
              headers: {authorization: "jwt " + sessionStorage.getItem("token")}
            })
          .then((response)=>{
              setCustomerData(response.data.customer_details)
              setData(response.data.order_invoice[0])
              setOrder(Object.entries(response.data.order_invoice[0].product_details?.items))
              setPrice(response.data.order_invoice[0].product_details)
          }).catch((error)=>{
              console.log(error)
          })
          },[])
          if(order){
            var eachOrder = order.map((item)=>(
              item[1].item
            ))
          }
         
  return (
    <div>
    <div>
      <div className="allProductsHeading">  
        <h3>Invoice</h3>
      </div>
        <div className='allProducts invoiceToPrint'>
          <ReactToPrint
            trigger={() => <button className="print">Print/Download</button>}
            content={() => componentRef.current}
            onAfterPrint={()=> setDisabled(false)}
          />
          <div  ref={componentRef}>
              <div className="recordsTableContainer invoiceTable">
                <div className="invoiceDetails">
              {customerData ?<div className="saleDetails">
                              <span>BILL TO: {customerData.name}</span>
                              <span>Address: {customerData.address}</span>
                              <span>Email: {customerData.email}</span>
                      </div>
                : null}
              {data ?<div className="saleDetails">
                              <span>Invoice No: {data.invoice_code}</span>
                              <span>Date: {data.date}</span>
                              <span>Terms: {data.terms}</span>
                      </div>
                : null}
                </div>
                  <table className="staffRecordsTable">
                      <thead className="staffTHead">
                          <tr>
                              <th>ID</th>
                              <th>Quantity</th>
                              <th>Item description</th>
                              <th>Unit price</th>
                              <th>Total</th>
                          </tr>
                      </thead>
                      <tbody className="staffTBody">
                          {order? (
                            eachOrder.map((newOrder,idx)=>(
                              <tr key={newOrder._id}>
                                <td>{idx}</td>
                                <td>{price.totalQty}</td>
                                <td>{newOrder.desc}</td>
                                <td>{newOrder.price}</td>
                                <td>{price.totalPrice}</td>
                              </tr>
                            ))
                          ) :null}
                      </tbody>
                  </table>
              </div>
          </div>
          <div className="invoiceButtons">
            <button className={`print ${disabled && 'emailBtn'}`} ><a href={`mailto:${customerData.email}`}>Email Invoice to {customerData.email}</a></button>
            <button className="print"> <Link to='/'>Go To Home</Link> </button>
          </div>
        </div>
    </div>
  </div>
  )
}

export default Invoice