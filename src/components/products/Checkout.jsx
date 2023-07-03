import { useState } from 'react'
import Sidebar from '../sidebar/sidebar'
import './Checkout.css'
import axios from 'axios'

axios.defaults.withCredentials = true

function Checkout() {
    const [formData, setFormData] = useState({
        name:'',
        date:'',
        address:''
    })
    function changeValue(e){
        console.log(formData)
        setFormData({...formData, [e.target.name]:e.target.value})
    };
    async function checkout(e){
        e.preventDefault()
        await axios.post("http://localhost:5000/api/dashboard/checkout",{
                headers: {authorization: "jwt " + localStorage.getItem("token")}
              })
            .then((response)=>{
                console.log(response)
            })
      }
      const currentDate = new Date().toLocaleDateString();
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
                    <label className='outputField' >{currentDate}</label>
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text" id='address' name='address' required value={formData.address} onChange={changeValue} />
                </div>
            </form>
          </div>
          <button onClick={checkout}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default Checkout