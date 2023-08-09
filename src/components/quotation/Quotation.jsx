import axios from 'axios'
import { useEffect, useState } from 'react'
import Sidebar from '../sidebar/sidebar'
import { Link, useNavigate } from 'react-router-dom'
axios.defaults.withCredentials = true

function Quotation() {

    const [formData, setFormData] = useState({
        invoice_code:'',
        date:'',
        due_date:"",
        terms:'',
        discount:'',
        tax:''
    })
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const [invoice, setInvoice] = useState('')
    const [isComplete, setIsComplete] = useState(false)
    const currentDate = new Date().toLocaleDateString();
    function changeValue(e){
        setFormData({...formData, [e.target.name]:e.target.value})
    };
    const data = {invoice_code:formData.invoice_code, due_date:formData.due_date, terms:formData.terms, discount:formData.discount, tax:formData.tax, date:currentDate};
    async function checkout(e){
        e.preventDefault()

        await axios.post("http://localhost:5000/api/dashboard/quotation",data,{
                headers: {authorization: "jwt " + sessionStorage.getItem("token")}
              })
              .then((response)=>{
                  console.log(response)
                  setIsComplete(true)
                  setInvoice(response.data.result.invoice_code)
              })
              .catch((error)=>{
                if(error.response.status){
                  setError(true)
                }
              })
      }
     useEffect(()=>{
      if(isComplete){
        navigate("/QuotationData/"+invoice)
      }
     },[navigate, isComplete, invoice])
  return (
    <div className='home'>
      <Sidebar/>
      <div className="homeContainer">
        <div className="checkoutHeading">  
          <h3>Quotation</h3>
        </div>
        <div className="checkout">
          <div className='checkoutWrapper'>
            <form>
                <div>
                    <label htmlFor="name">Invoice code</label>
                    <input type="text" id='name' name='invoice_code' required value={formData.invoice_code} onChange={changeValue}/>
                </div>
                <div>
                    <label htmlFor="address">Due date</label>
                    <input type="text" id='address' name='due_date' required value={formData.due_date} onChange={changeValue} />
                </div>
                <div>
                    <label htmlFor="date">Date</label>
                    <label className='outputField dateField' >{currentDate}</label>
                </div>
                <div>
                    <label htmlFor="name">Terms</label>
                    <input type="text" id='name' name='terms' required value={formData.terms} onChange={changeValue}/>
                </div>
                <div>
                    <label htmlFor="address">Discount</label>
                    <input type="number" id='address' name='discount' required value={formData.discount} onChange={changeValue} />
                </div>
                <div>
                    <label htmlFor="date">Tax</label>
                    <input type="number" id='date' name='tax' required value={formData.tax} onChange={changeValue} />
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

export default Quotation