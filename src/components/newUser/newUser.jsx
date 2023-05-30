import { useState } from 'react'
import Sidebar from '../sidebar/sidebar'
import './newUser.css'
import axios from 'axios'

function NewUser() {
    const [formData, setFormData] = useState({
        firstName:'',
        lastName:'',
        idNo:'',
        phoneNumber:'',
        jobTitle:'',
        option:''
    })
    function changeValue(e){
        setFormData({...formData, [e.target.name]:e.target.value})
    };
    async function addStaff(e){
        e.preventDefault();
        const values = [formData.firstName,formData.lastName,formData.idNo,formData.phoneNumber,formData.jobTitle,formData.option];
        const data = new FormData();
        values.forEach((item) => {
            data.append('values', item);
        });
        await axios.post('/api/newStaff', data)
    }
  return (
    <div className='newUser home'>
        <Sidebar/>
        <div className="newUserContainer homeContainer">
            <div className="newUserTitle">
                <p>Add New Staff</p>
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
            </div>
        </div>

    </div>
  )
}

export default NewUser