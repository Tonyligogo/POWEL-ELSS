import { useState } from 'react'
import Sidebar from '../sidebar/sidebar'
import './newUser.css'
import axios from 'axios'
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from "@mui/material";


function NewUser() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        firstName:'',
        lastName:'',
        idNo:'',
        phoneNumber:'',
        basicSalary:'',
        jobTitle:'',
        option:''
    })
    const [userCreated, setUserCreated] = useState(false);
    function changeValue(e){
        setFormData({...formData, [e.target.name]:e.target.value})
    };
    async function addStaff(e){
        e.preventDefault();
        setLoading(true)
        const userData = {
            first_name:formData.firstName,
            last_name:formData.lastName,
            id_no:formData.idNo,
            phone_no:formData.phoneNumber,
            basic_salary:formData.basicSalary,
            job_title:formData.jobTitle,
            P_no:formData.option
        }
        await axios.post("http://localhost:5000/api/dashboard/new-employee", userData,{
            headers: {authorization: "jwt " + sessionStorage.getItem("token")}
          })
        .then((response)=>{
            setUserCreated(true)
        })
        .catch((error)=>{
            if(error.response){
                console.log(error.response);
            }else if(error.request){
                console.log('network error')
            }else{
                console.log(error)
            }
        }).finally(() => {
            setLoading(false);
          });  
        setTimeout(() => {
            setUserCreated(false);
            setFormData({
                firstName:'',
                lastName:'',
                idNo:'',
                phoneNumber:'',
                basicSalary:'',
                jobTitle:'',
                option:''
            })
            navigate("/StaffRecords")
          }, 2000);
    }
  return (
    <div className='newUser home'>
        <Sidebar/>
        <div className="newUserContainer homeContainer">
            <div className="newUserTitle">
                <h3>Add New Staff</h3>
            </div>
            <div className="newUserDetails">
                <form onSubmit={addStaff}>
                    <h3>Personal Information</h3>
                    <div className="formInput">
                        <label>First Name</label>
                        <input type="text" value={formData.firstName} name='firstName' required onChange={changeValue} />
                    </div>
                    <div className="formInput">
                        <label>Last Name</label>
                        <input type="text" value={formData.lastName} name='lastName' required onChange={changeValue}/>
                    </div>
                    <div className="formInput">
                        <label>ID number</label>
                        <input type="number" value={formData.idNo} name='idNo' required onChange={changeValue}/>
                    </div>
                    <div className="formInput">
                        <label>Phone Number</label>
                        <input type="text" value={formData.phoneNumber} max='10' min='10' name='phoneNumber' required onChange={changeValue}/>
                    </div>
                    <h3>Job Information</h3>
                    <div className="formInput">
                        <label>Basic Salary</label>
                        <input type="number" value={formData.basicSalary} name='basicSalary' required onChange={changeValue}/>
                    </div>
                    <div className="formInput">
                        <label>Job Title</label>
                        <input type="text" value={formData.jobTitle} name='jobTitle' required onChange={changeValue}/>
                    </div>
                    <div className="formInput">
                        <label id='PNo'>P/No</label>
                        <select id='PNo' name='option' value={formData.option} required onChange={changeValue}>
                            <option >-- Select P/No --</option>
                            <option >PE-01</option>
                            <option >PE-02</option>
                            <option >PE-03</option>
                            <option >PE-04</option>
                            <option >PE-05</option>
                            <option >PE-06</option>
                            <option >PE-07</option>
                            <option >PE-08</option>
                            <option >PE-09</option>
                            <option >PE-10</option>
                        </select> 
                    </div>
                    {loading ? 
                      <CircularProgress size="24px" className="progress"/> 
                      :
                      <button type='submit'>Save</button>
                    }
                </form>
                { userCreated && <p className='successMessage'> <Icon icon="mdi:success-circle" color="green" /> New staff added successfully</p>}
            </div>
        </div>

    </div>
  )
}

export default NewUser