import { useState } from 'react'
import './NewProduct.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Sidebar from '../sidebar/sidebar';

function NewProduct() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name:'',
        desc:'',
        category:'',
        price:''
    })
    const [userCreated, setUserCreated] = useState(false);
    function changeValue(e){
        setFormData({...formData, [e.target.name]:e.target.value})
    };
    async function addStaff(e){
        e.preventDefault();
        const userData = {
            name:formData.name,
            desc:formData.desc,
            category:formData.category,
            price:formData.price
        }
        await axios.post("http://localhost:5000/api/dashboard/new-item", userData,{
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
        })  
        setTimeout(() => {
            setUserCreated(false);
            setFormData({
                name:'',
                desc:'',
                category:'',
                price:''
            })
            navigate("/Products")
          }, 2000);
    }

  return (
    <div className='home'>
        <Sidebar/>
        <div className="homeContainer">
            <div className="productHeading">  
                <h3>New Product</h3>
            </div>
            <div className="productWrapper">
                 <form onSubmit={addStaff}>
                    <h3>Product Information</h3>
                    <div className="formInput">
                        <label>Name</label>
                        <input type="text" placeholder='Name' value={formData.name} name='name' required onChange={changeValue} />
                    </div>
                    <div className="formInput">
                        <label>Description</label>
                        <input type="text" placeholder='Description' value={formData.desc} name='desc' required onChange={changeValue}/>
                    </div>
                    <div className="formInput">
                        <label>Category</label>
                        <input type="text" placeholder='Category' value={formData.category} name='category' required onChange={changeValue}/>
                    </div>
                    <div className="formInput">
                        <label>Price</label>
                        <input type="text" placeholder='Price' value={formData.price} name='price' required onChange={changeValue}/>
                    </div>
                    <button type='submit'>Save</button>
                </form>
                { userCreated && <p className='successMessage'> <Icon icon="mdi:success-circle" color="green" /> New item added successfully</p>}
            </div>
        </div>
       </div>
  )
}

export default NewProduct