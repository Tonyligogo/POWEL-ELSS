import { useEffect, useRef, useState } from "react";
import './QuotationData.css'
import axios from "axios";
import {  Link, useParams } from "react-router-dom";
import ReactToPrint from "react-to-print"
import QuotationHeader from "./QuotationHeader";

axios.defaults.withCredentials = true

function QuotationData() {

    const {id} = useParams()
    const [data, setData] = useState({})
    const [products, setProducts] = useState([])
    const [disabled, setDisabled] = useState(true);
    const componentRef = useRef()

    useEffect(()=>{
        axios.get("http://localhost:5000/api/dashboard/quotation-data/"+id,{
          headers: {authorization: "jwt " + sessionStorage.getItem("token")}
        })
      .then((response)=>{
        setData(response.data.allowances[0])
        console.log(response.data.allowances[0])
        setProducts(response.data.allowances[0].quotations_details.items)
      }).catch((error)=>{
          console.log(error)
      })
      },[id])

  return (
    <div>
    <div>
        <div className='allProducts invoiceToPrint'>
            <div ref={componentRef} >
            <div className="recordsTableContainer invoiceTable" style={{padding: '4px'}}>
              <QuotationHeader/>
            <div className="invoiceDetails">
              {data ? <div className="saleDetails customerInformation">
                              <span>Bill To</span>
                              {/* <span>{data.customer?.name}</span>
                              <span>{data.customer?.address}</span>
                              <span>{data.customer?.email}</span> */}
                              <small>{data.customer?.name}</small>
                              <small>{data.customer?.address}</small>
                              <small>{data.customer?.email}</small>
                      </div>
                : null}
              {data ? <div className="saleDetails">
                              <span>Quotation no.: <small>{data.ref_code}</small></span>
                              <span>Date: <small>{data.date}</small></span>
                              <span>Due date: <small>{data.due_date}</small></span>
                              <span>Terms: <small>{data.terms}</small></span>
                      </div>
                : null}
            </div>
                <table className="staffRecordsTable">
                    <thead className="staffTHead">
                        <tr>
                            <th>Product description</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody className="staffTBody">
                        {products && 
                            Object.keys(products).map((key)=>{
                                const item = products[key];
                                return (
                                <tr key={item.item._id}>
                                  <td>{item.item.desc}</td>
                                  <td>{item.qty}</td>
                                  <td>{item.price}</td>
                                  <td>{item.qty * item.price}</td>
                                </tr> )  
                            }) 
                        }
                    </tbody>
                </table>
            </div>
            </div>
            <div className="invoiceButtons">
              <button className={`print ${disabled && 'emailBtn'}`} ><a href={`mailto:${data.customer?.email}`}>Email Invoice to {data.customer?.email}</a></button>
              <ReactToPrint
              trigger={() => <button className="print">Print/Download</button>}
              content={() => componentRef.current}
              onAfterPrint={()=> setDisabled(false)}
            />
              <button className="print"> <Link to='/'>Go To Home</Link> </button>
          </div>
      </div>
    </div>
  </div>
  )
}

export default QuotationData