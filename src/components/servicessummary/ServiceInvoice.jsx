import axios from 'axios'
import './ServiceInvoice.css'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react';
import { CircularProgress } from "@mui/material";

function ServiceInvoice({pid, name, closeModal}) {

    const [data, setData] = useState([])
    const [error, setError] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        axios.get("http://localhost:5000/api/dashboard/service-invoice/"+pid,{
          headers: {authorization: "jwt " + sessionStorage.getItem("token")}
        })
      .then((response)=>{
          setData(response.data.service_invoices)
      }).catch((error)=>{
          if(error.response.status === 401){
            setError(true)
            setErrMsg('It seems you are not authorized.Try logging in again')
          }else{
            setErrMsg('An error occured. Refresh the page and try again.')
          }
      }).finally(() => {
        setLoading(false);
      });

      },[pid, setLoading])
      useEffect(() => {
        if (error) {
          const timeoutId = setTimeout(() => {
            navigate("/LoginPage")
          }, 3000); 
    
          return () => {
            clearTimeout(timeoutId);
          };
        }
      }, [error, navigate]);

  return (
    <div
        className="modal-container"
        onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
        }}
    >
        <div className="modal">
            <h3>Invoice details</h3>
            {loading ? 
                <CircularProgress size="24px" className="progress"/>
            :
                <div>
                    <p>Client name: {name}</p>
                    <p>Invoice code: {data.invoice_code}</p>
                    <p>Date: {data.date}</p>
                    <p>Time: {data.time}</p>
                    <p>Cost: {data.cost}</p>
                    <button onClick={closeModal} >Back</button>
                    {errMsg && <p className="deductionError"> <Icon icon="clarity:error-solid" color="red" width="22" /> {errMsg}</p> }
                </div>}
        </div>
    </div>
  )
}

export default ServiceInvoice