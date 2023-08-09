import { useEffect, useState } from "react";
import axios from "axios";
import {  useParams } from "react-router-dom";
import Sidebar from "../sidebar/sidebar"

function QuotationData() {

    const {id} = useParams()
    const [data, setData] = useState({})
    const [products, setProducts] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:5000/api/dashboard/quotation-data/"+id,{
          headers: {authorization: "jwt " + sessionStorage.getItem("token")}
        })
      .then((response)=>{
        setData(response.data.allowances[0])
          console.log(response.data.allowances[0])
          setProducts(response.data.allowances[0].quotations_details.items)
          console.log(response.data.allowances[0].quotations_details.items)

      }).catch((error)=>{
          console.log(error)
      })
      },[id])

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
                            <span>Invoice no. {data.invoice_code}</span>
                            <span>Date {data.date}</span>
                            <span>Due date {data.due_date}</span>
                            <span>Terms {data.terms}</span>
                    </div>
              : null}
                <table className="staffRecordsTable">
                    <thead className="staffTHead">
                        <tr>
                            <th>ID</th>
                            <th>Product description</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody className="staffTBody">
                    
                    </tbody>
                </table>
            </div>
      </div>
    </div>
  </div>
  )
}

export default QuotationData