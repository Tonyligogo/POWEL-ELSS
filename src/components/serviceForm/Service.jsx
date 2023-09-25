import './service.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';

axios.defaults.withCredentials = true


function Service() {
    const [employees, setEmployees] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/api/dashboard/employee-data",
        {
          headers: {authorization: "jwt " + sessionStorage.getItem("token")}
        }
        ).then(response => {
          setEmployees(response.data.employees);
        })
        
    },[]);

    const [formData, setFormData] = useState({
        name:'',
        location:'',
        requestedBy:'',
        scope:'',
        duration:'',
        scopeDesc:'',
        cost:''
    })
    function changeValue(e){
        setFormData({...formData, [e.target.name]:e.target.value})
    } 
    const [checked, setChecked] = useState([])
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const invCode = nanoid(10)
    function handleCheck(e){
        var updatedList = [...checked]
        if(e.target.checked){
            updatedList = [...checked, e.target.value];
        }else{
            updatedList.splice(checked.indexOf(e.target.value),1)
        }
        setChecked(updatedList)
    }
    const data = {
        client_name:formData.name,
        work_location: formData.location,
        requested_by: formData.requestedBy,
        scope: formData.scope,
        scope_description: formData.scopeDesc,
        employee_details:[checked],
        work_duration: formData.duration,
        date:currentDate,
        time:currentTime,
        cost:formData.cost,
        invoice_code:invCode
    }
    const [error, setError] = useState(false)
    async function saveDetails(e){
        e.preventDefault()
        await axios.post("http://localhost:5000/api/dashboard/service-form",data,{
                headers: {authorization: "jwt " + sessionStorage.getItem("token")}
              })
              .then((response)=>{
                  setFormData({
                    name:'',
                    location:'',
                    requestedBy:'',
                    scope:'',
                    duration:'',
                    scopeDesc:'',
                    cost:''
                })
                setChecked([])
              })
              .catch((error)=>{
                if(error.response.status){
                  setError(true)
                }
              })
      }

  return (
    <div>
        <div>
            <div className='serviceFormTitle'>
                <h3>Service Form</h3>
            </div>
            <div className='serviceForm'>
                <form className="service" onSubmit={saveDetails}>
                    <div className="serviceDetails">
                        {error && <p>There was an error</p> }
                    <div>
                        <label htmlFor="name">Client Name</label>
                        <input type="text" id='name' name="name" value={formData.name} onChange = {changeValue}/>
                    </div>
                    <div>
                        <label htmlFor="invCode">Invoice Code</label>
                        <label className='outputField' id='invCode'>{invCode}</label>
                    </div>
                    <div>
                        <label htmlFor="location">Work Location</label>
                        <input type="text" id='location' name="location" value={formData.location} onChange = {changeValue}/>
                    </div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <label className='outputField' id='date'>{currentDate}</label>
                    </div>
                    <div>
                        <label htmlFor="requestedBy">Requested by</label>
                        <input type="text" id='requestedBy' name="requestedBy" value={formData.requestedBy} onChange = {changeValue}/>
                    </div>
                    <div>
                        <label htmlFor="time">Time</label>
                        <label className='outputField' id='time'>{currentTime}</label>
                    </div>
                    <div>
                        <label htmlFor="scope">Scope</label>
                        <input type="text" id='scope'  name="scope" value={formData.scope} onChange = {changeValue}/>
                    </div>
                    <div>
                        <label htmlFor="duration">Work Duration</label>
                        <input type="number" min="0" id='duration' name="duration" value={formData.duration} onChange = {changeValue}/>
                    </div>
                    <div className='scopeDescription'>
                        <label htmlFor="scopeDesc">Scope Description</label>
                        <textarea className='scopeDesc' id='scopeDesc' cols="60" rows="3"  name="scopeDesc" value={formData.scopeDesc} onChange = {changeValue}></textarea>
                    </div>
                    <div>
                        <label htmlFor="cost">Cost</label>
                        <input type="text" id='cost' name="cost" value={formData.cost} onChange = {changeValue}/>
                    </div>
                    </div>
                    <div>
                        <div className="serviceAttendants">
                            <p>Service attended by(choose below):</p>
                            <div className="employees">
                                {employees.map((employee)=>(
                                    <div key={employee._id}>
                                        <input type="checkbox" value={`${employee.first_name} ${employee.last_name} ${employee.id_no}`} onChange={handleCheck}/>
                                        <span>{`${employee.first_name} ${employee.last_name} ${employee.id_no}`} </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button>Save</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Service