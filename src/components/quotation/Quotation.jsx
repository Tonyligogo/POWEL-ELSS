import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Quotation.css"
axios.defaults.withCredentials = true

function Quotation() {

    const [formData, setFormData] = useState({
        ref_code:'',
        due_date:"",
        terms:'',
        discount:'',
        tax:''
    })
    const [selectedData, setSelectedData] = useState('')
    function handleSelect(e){
      setSelectedData(e.target.value)
  };
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const [invoice, setInvoice] = useState('')
    const [isComplete, setIsComplete] = useState(false)
    const currentDate = new Date().toLocaleDateString();
    function changeValue(e){
        setFormData({...formData, [e.target.name]:e.target.value})
    };
    const data = {
      ref_code:formData.ref_code,
      due_date:formData.due_date,
      terms:formData.terms,
      discount:formData.discount,
      tax:formData.tax,
      date:currentDate,
      quotation_type:selectedData
    };

    async function checkout(e){
        e.preventDefault()

        await axios.post("http://localhost:5000/api/dashboard/quotation",data,{
                headers: {authorization: "jwt " + sessionStorage.getItem("token")}
              })
              .then((response)=>{
                  console.log(response)
                  setIsComplete(true)
                  setInvoice(response.data.result.ref_code)
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
    <div>
        <div className="checkoutHeading">  
          <h3>Quotation</h3>
          <div className="select">
              <label htmlFor="select">Select quotation type</label>
              <select name="option" id="select" required onChange={handleSelect}>
                <option value=''>--Select type--</option>
                <option value={selectedData.option}>Service</option>
                <option value={selectedData.option}>Supply</option>
                <option value={selectedData.option}>Service and Supply</option>
              </select>
            </div>
        </div>
          <div className='quotationWrapper'>
            <div>
        {selectedData !== "" && 
              <form className='quotationGridContent'>
                  <div>
                      <label htmlFor="refCode">Ref code</label>
                      <input type="text" id='refCode' name='ref_code' required value={formData.ref_code} onChange={changeValue}/>
                  </div>
                  <div>
                      <label htmlFor="date">Current date</label>
                      <span className='datesField'>{currentDate}</span>
                  </div>
                  <div>
                      <label htmlFor="address">Due date</label>
                      <input type="date" id='address' name='due_date' required value={formData.due_date} onChange={changeValue} />
                  </div>
                  <div>
                      <label htmlFor="name">Terms</label>
                      <input type="text" id='name' name='terms' required value={formData.terms} onChange={changeValue}/>
                  </div>
                  <div>
                      <label htmlFor="discount">Discount</label>
                      <input type="number" id='discount' name='discount' required value={formData.discount} onChange={changeValue} />
                  </div>
                  <div>
                      <label htmlFor="tax">Tax</label>
                      <input type="number" id='tax' name='tax' required value={formData.tax} onChange={changeValue} />
                  </div>
              </form>
              }
              {error && 
                <div>
                  <p>Failed! There is nothing in the cart</p>
                  <Link to="/Products"> <button>Go to Products</button> </Link>
                </div>
              }
            </div>
            {selectedData !== "" && <button onClick={checkout}>Save</button>}
          </div>
      </div>
  )
}

export default Quotation