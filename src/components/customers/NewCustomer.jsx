import "./NewCustomer.css"
import { useState } from 'react'
import Sidebar from '../sidebar/sidebar'
import axios from 'axios'
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from "@mui/material";

function NewCustomer() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        email: "",
        contact_person: ""
    })
    const [userCreated, setUserCreated] = useState(false);
    function changeValue(e){
        setFormData({...formData, [e.target.name]:e.target.value})
    };
    async function addCustomer(e){
        e.preventDefault();
        setLoading(true)
        const userData = {
            name:formData.name,
            address:formData.address,
            email:formData.email,
            contact_person:formData.contact_person
        }
        await axios.post("http://localhost:5000/api/dashboard/customer-entry", userData,{
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
                name: "",
                address: "",
                email: "",
                contact_person: ""
            })
            navigate("/CustomerRecords")
          }, 2000);
    }

  return (
    <div className='newUser home'>
        <Sidebar/>
        <div className="newUserContainer homeContainer">
            <div className="newUserTitle">
                <h3>Add New Customer</h3>
            </div>
            <div className="newUserDetails">
                <form onSubmit={addCustomer}>
                    <h3>Personal Information</h3>
                    <div className="formInput">
                        <label>Customer Name</label>
                        <input type="text" value={formData.name} name='name' required onChange={changeValue} />
                    </div>
                    <div className="formInput">
                        <label>Email</label>
                        <input type="email" value={formData.email} name='email' required onChange={changeValue}/>
                    </div>
                    <div className="formInput">
                        <label>Address</label>
                        <input type="text" value={formData.address} name='address' required onChange={changeValue}/>
                    </div>
                    <div className="formInput">
                        <label>Contact Person</label>
                        <input type="text" value={formData.contact_person}  name='contact_person' required onChange={changeValue}/>
                    </div>
                    {loading ? 
                      <CircularProgress size="24px" className="progress"/> 
                      :
                      <button type='submit'>Save</button>
                    }
                </form>
                { userCreated && <p className='successMessage'> <Icon icon="mdi:success-circle" color="green" /> New Customer added successfully</p>}
            </div>
        </div>

    </div>
  )
}

export default NewCustomer