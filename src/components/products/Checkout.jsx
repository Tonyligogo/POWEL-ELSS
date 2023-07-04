import { useState } from 'react'
import Sidebar from '../sidebar/sidebar'
import './Checkout.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

axios.defaults.withCredentials = true

function Checkout() {
    const [formData, setFormData] = useState({
        name:'',
        address:''
    })
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const currentDate = new Date().toLocaleDateString();
    function changeValue(e){
        setFormData({...formData, [e.target.name]:e.target.value})
    };
    const data = {name:formData.name, address:formData.address, date:currentDate};
    async function checkout(e){
        e.preventDefault()

        await axios.post("http://localhost:5000/api/dashboard/checkout",data,{
                headers: {authorization: "jwt " + localStorage.getItem("token")}
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
        <div className="productListHeading">  
          <h3>Checkout</h3>
        </div>
        <div className="productList">
          <div className='productsWrapper'>
            <form>
                <div>
                    <label htmlFor="name">Client full name</label>
                    <input type="text" id='name' name='name' required value={formData.name} onChange={changeValue}/>
                </div>
                <div>
                    <label htmlFor="date">Date</label>
                    <label className='outputField dateField' >{currentDate}</label>
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text" id='address' name='address' required value={formData.address} onChange={changeValue} />
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