import "./deduction.css"
import Sidebar from "../sidebar/sidebar"
import { useState } from 'react'
import axios from 'axios'

axios.defaults.withCredentials = true

function Deduction() {

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
    const [error, setError] = useState(false)
    async function saveDetails(e){
        e.preventDefault()
        await axios.post("http://localhost:5000/api/dashboard/deduction-entry",data,{
                headers: {authorization: "jwt " + sessionStorage.getItem("token")}
              })
              .then((response)=>{
                  console.log(response)
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
                console.log(error.response.message)
                if(error.response.status){
                  setError(true)
                }
              })
      }

  return (
    <div className="deduction home">
        <Sidebar/>
        <div className="deductionContainer homeContainer">
            <div className="deductionFormTitle">
                <h3>Deduction Form</h3>
            </div>
            <div className="deductionWrapper">
            <form className="deductionForm" onSubmit={saveDetails}>
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
                <button>Save</button>
            </form>
            {error && <p>Some error occured</p> }
            </div>
        </div>




    </div>
  )
}

export default Deduction