import { useState } from 'react'
import Sidebar from '../sidebar/sidebar'
import './Checkout.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

axios.defaults.withCredentials = true

function Checkout() {
    const [formData, setFormData] = useState({
        name:'',
        phoneNumber:''
    })
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const currentDate = new Date().toLocaleDateString();
    function changeValue(e){
        setFormData({...formData, [e.target.name]:e.target.value})
    };
    const data = {name:formData.name, phone_number:formData.phoneNumber, date:currentDate};
    async function checkout(e){
        e.preventDefault()

        await axios.post("http://localhost:5000/api/dashboard/checkout",data,{
                headers: {authorization: "jwt " + sessionStorage.getItem("token")}
              })
              .then((response)=>{
                  console.log(response)
                  navigate("/Invoice")
              })
              .catch((error)=>{
                if(error.response.status){
                  setError(true)
                }
              })
      }
  return (
    <div className='home'>
      <Sidebar/>
      <div className="homeContainer">
        <div className="checkoutHeading">  
          <h3>Checkout</h3>
        </div>
        <div className="checkout">
          <div className='checkoutWrapper'>
            <form>
                <div>
                    <label htmlFor="name">Client full name</label>
                    <input type="text" id='name' name='name' required value={formData.name} onChange={changeValue}/>
                </div>
                <div>
                    <label htmlFor="address">Phone number</label>
                    <input type="text" id='address' name='phoneNumber' required value={formData.phoneNumber} onChange={changeValue} />
                </div>
                <div>
                    <label htmlFor="date">Date</label>
                    <label className='outputField dateField' >{currentDate}</label>
                </div>
            </form>
            {error && 
              <div>
                <p>Failed! There is nothing in the cart</p>
                <Link to="/Products"> <button>Go to Products</button> </Link>
              </div>
             }
          </div>
          <button onClick={checkout}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default Checkout