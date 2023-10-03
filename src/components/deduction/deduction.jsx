import "./deduction.css"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { Icon } from '@iconify/react';
import { CircularProgress } from "@mui/material";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true

function Deduction() {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        idNo:'',
        month: '',
        year:'',
        nhifNumber:'',
        nssfNumber:'',
        advances:'',
        taxes:''
    })
    function changeValue(e){
        setFormData({...formData, [e.target.name]:e.target.value})
    }
      
    const data = {
        id_no:formData.idNo,
        month: formData.month,
        year: formData.year,
        nhif: formData.nhifNumber,
        nssf: formData.nssfNumber,
        advances: formData.advances,
        taxes: formData.taxes
    }
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    async function saveDetails(e){
        e.preventDefault()
        setLoading(true)
        await axios.post("http://localhost:5000/api/dashboard/deduction-entry",data,{
                headers: {authorization: "jwt " + sessionStorage.getItem("token")}
              })
              .then((response)=>{
                setSuccess(true)
                  setFormData({
                    idNo:'',
                    month: '',
                    year:'',
                    nhifNumber:'',
                    nssfNumber:'',
                    advances:'',
                    taxes:''
                })
              })
              .catch((error)=>{
                if(error.response.status === 401){
                    setError(true)
                    setErrMsg('It seems you are not authorized. Try logging in again!')
                }else{
                    setErrMsg('An error occured. Refresh the page and try again.')
                }
              }).finally(() => {
                setLoading(false);
              });
              setTimeout(()=>{
                setSuccess(false)
              },2000) 
      }
      useEffect(()=>{
        if(success){
          toast.success('Saved successfully', {
              id:'deductionSaved'
          })
        }
    },[success])
      useEffect(() => {
        if (error) {
          const timeoutId = setTimeout(() => {
            navigate("/LoginPage")
          }, 3000); // Redirect to login after 3 seconds
    
          return () => {
            clearTimeout(timeoutId);
          };
        }
      }, [error, navigate]);
  return (
    <div className="allowance"> {/*uses classes from allowance component because they have same structure*/}
        <div className="allowanceContainer">
            <div className="allowancesFormTitle">
                <h3>Deduction Form</h3>
            </div>
            <div className="allowancesWrapper">
            <form className="allowancesForm" onSubmit={saveDetails}>
                <div>
                <label htmlFor="idNumber">ID No</label>
                        <input type="text" id="idNumber" name="idNo" value={formData.idNo} onChange = {changeValue} />
                </div>
                <div>
                    <label htmlFor="month">Month</label>
                    <select id='month' name="month" value={formData.month} onChange = {changeValue}>
                            <option value=''>--Select Month--</option>
                            <option value='January'>January</option>
                            <option value='February'>February</option>
                            <option value='March'>March</option>
                            <option value='April'>April</option>
                            <option value='May'>May</option>
                            <option value='June'>June</option>
                            <option value='July'>July</option>
                            <option value='August'>August</option>
                            <option value='September'>September</option>
                            <option value='October'>October</option>
                            <option value='November'>November</option>
                            <option value='December'>December</option>
                        </select> 
                </div>
                <div>
                <label htmlFor="year">Year</label>
                <input type="number" name="year" id="year" min="2023" max="2050" value={formData.year} onChange = {changeValue}/>
                </div>
                <div>
                <label htmlFor="NHIFnumber">NHIF</label>
                <input type="number" name="nhifNumber" id="NHIFnumber" value={formData.nhifNumber} onChange = {changeValue}/>
                </div>
                <div>
                <label htmlFor="nssfNumber">Nssf</label>
                <input type="number" name="nssfNumber" id="nssfNumber" value={formData.nssfNumber} onChange = {changeValue}/>
                </div>
                <div>
                <label htmlFor="advances">Advances</label>
                <input type="number" name="advances" id="advances" value={formData.advances} onChange = {changeValue}/>
                </div>
                <div>
                <label htmlFor="taxes">Taxes</label>
                <input type="number" name="taxes" id="taxes" value={formData.taxes} onChange = {changeValue}/>
                </div>
                {loading ? 
                    <button><CircularProgress size="14px" className="progress"/>Saving...</button>
                      :
                      <button type='submit'>Save</button>
                    }
            </form>
            {errMsg && <p className="deductionError"> <Icon icon="clarity:error-solid" color="red" width="22" /> {errMsg}</p> }
            </div>
        </div>




    </div>
  )
}

export default Deduction