import { useState } from 'react'
import Sidebar from '../sidebar/sidebar'
import './newUser.css'
import axios from 'axios'
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';


function NewUser() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName:'',
        lastName:'',
        idNo:'',
        phoneNumber:'',
        jobTitle:'',
        option:''
    })
    const [userCreated, setUserCreated] = useState(false);
    function changeValue(e){
        setFormData({...formData, [e.target.name]:e.target.value})
    };
    async function addStaff(e){
        e.preventDefault();
        const userData = {
            first_name:formData.firstName,
            last_name:formData.lastName,
            id_no:formData.idNo,
            phone_no:formData.phoneNumber,
            job_title:formData.jobTitle,
            P_no:formData.option
        }
        await axios.post("http://localhost:5000/api/dashboard/new-employee", userData,{
            headers: {authorization: "jwt " + localStorage.getItem("token")}
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
        })  
        setTimeout(() => {
            setUserCreated(false);
            setFormData({
                firstName:'',
                lastName:'',
                idNo:'',
                phoneNumber:'',
                jobTitle:'',
                option:''
            })
            navigate("/StaffRecords")
          }, 3000);
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
                        <input type="text" placeholder='First Name' value={formData.firstName} name='firstName' required onChange={changeValue} />
                    </div>
                    <div className="formInput">
                        <label>Last Name</label>
                        <input type="text" placeholder='Last Name' value={formData.lastName} name='lastName' required onChange={changeValue}/>
                    </div>
                    <div className="formInput">
                        <label>ID number</label>
                        <input type="text" placeholder='ID no.' value={formData.idNo} name='idNo' required onChange={changeValue}/>
                    </div>
                    <div className="formInput">
                        <label>Phone Number</label>
                        <input type="text" placeholder='Phone number' value={formData.phoneNumber} name='phoneNumber' required onChange={changeValue}/>
                    </div>
                    <h3>Job Information</h3>
                    <div className="formInput">
                        <label>Job Title</label>
                        <input type="text" placeholder='Job title' value={formData.jobTitle} name='jobTitle' required onChange={changeValue}/>
                    </div>
                    <div className="formInput">
                        <label id='PNo'>P/No</label>
                        <select id='PNo' name='option' value={formData.option} onChange={changeValue}>
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
                    <button type='submit'>Save</button>
                </form>
                { userCreated && <p className='successMessage'> <Icon icon="mdi:success-circle" color="green" /> New staff added successfully</p>}
            </div>
        </div>

    </div>
  )
}

export default NewUser