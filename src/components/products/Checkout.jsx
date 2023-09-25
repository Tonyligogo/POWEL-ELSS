import { useState } from 'react'
import './Checkout.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { nanoid } from 'nanoid';

axios.defaults.withCredentials = true

function Checkout() {
    const [formData, setFormData] = useState({
        contactPerson:'',
        terms:'',
        purchase_type:'',
        discount:'',
        tax:''
    })
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const currentDate = new Date().toLocaleDateString();
    const invCode = nanoid(10)
    function changeValue(e){
        setFormData({...formData, [e.target.name]:e.target.value})
    };
    const data = {
      date:currentDate,
      invoice_code:invCode,
      terms:formData.terms,
      purchase_type:formData.purchase_type,
      discount:formData.discount,
      tax:formData.tax,
      contact_person:formData.contactPerson
    };
    async function checkout(e){
        e.preventDefault()

        await axios.post("http://localhost:5000/api/dashboard/checkout",data,{
                headers: {authorization: "jwt " + sessionStorage.getItem("token")}
              })
              .then((response)=>{
                  navigate("/Invoice")
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
        <div className="checkoutHeading">  
          <h3>Checkout</h3>
        </div>
        <div className="checkout">
          <div className='checkoutWrapper'>
            <form>
              <div>
                    <label htmlFor="contactPerson">Contact Person</label>
                    <input type="text" id='contactPerson' name='contactPerson' required value={formData.contactPerson} onChange={changeValue}/>
                </div>
                <div>
                    <label htmlFor="purchase">Purchase type</label>
                    <input type="text" id='purchase' name='purchase_type' required value={formData.purchase_type} onChange={changeValue}/>
                </div>
                <div>
                    <label htmlFor="terms">Terms</label>
                    <input type="text" id='terms' name='terms' required value={formData.terms} onChange={changeValue} />
                </div>
                <div>
                    <label htmlFor="discount">Discount</label>
                    <input type="text" id='discount' name='discount' required value={formData.discount} onChange={changeValue}/>
                </div>
                <div>
                    <label htmlFor="tax">Tax</label>
                    <input type="text" id='tax' name='tax' required value={formData.tax} onChange={changeValue} />
                </div>
                <div>
                    <label htmlFor="date">Date</label>
                    <label className='outputField dateField' >{currentDate}</label>
                </div>
                <div>
                    <label htmlFor="invoice">Invoice</label>
                    <label className='outputField dateField' >{invCode}</label>
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