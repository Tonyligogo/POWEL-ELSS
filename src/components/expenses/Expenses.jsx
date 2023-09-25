import './expenses.css'
import axios from 'axios'
import { useState } from 'react'
import { nanoid } from 'nanoid';
axios.defaults.withCredentials = true

function Expenses() {
    const [formData, setFormData] = useState({
        code:'',
        service:'',
        cost: '',
        recordedBy:'',
        date:''
    })
    function changeValue(e){
        setFormData({...formData, [e.target.name]:e.target.value})
    }
    const invCode = nanoid(10)
    const currentDate = new Date().toLocaleDateString();
    const data = {
        code:invCode,
        service_item_name:formData.service,
        total_cost: formData.cost,
        recorded_by: formData.recordedBy,
        date: currentDate,
    }
    const [error, setError] = useState(false)
    async function saveDetails(e){
        e.preventDefault()
        await axios.post("http://localhost:5000/api/dashboard/expenses",data,{
                headers: {authorization: "jwt " + sessionStorage.getItem("token")}
              })
              .then((response)=>{
                  console.log(response)
                  setFormData({
                    code:'',
                    service:'',
                    cost: '',
                    recordedBy:'',
                    date:''
                })
              })
              .catch((error)=>{
                if(error.response.status){
                  setError(true)
                }
              })
      }


  return (
    <div className='expense'>
        <div className="expenseContainer">
            <div className="expenseTitle">
                <h3>Expenses Form</h3>
            </div>
            <div className="expenseForm">
                <form onSubmit={saveDetails}>
                    <div className="formInput">
                        <label>Service/ Item name</label>
                        <input type="text" name='service' value={formData.service} onChange = {changeValue}/>
                    </div>
                    <div className="formInput">
                        <label>Total Cost</label>
                        <input type="text" name='cost' value={formData.cost} onChange = {changeValue}/>
                    </div>
                    <div className="formInput">
                        <label>Recorded by</label>
                        <input type="text" name='recordedBy' value={formData.recordedBy} onChange = {changeValue}/>
                    </div>
                    <div className="formInput">
                        <label>Date</label>
                        <label className='outputField'>{currentDate}</label>
                    </div>
                    <div className="formInput">
                        <label>Code</label>
                        <label className='outputField'>{invCode}</label>
                    </div>
                    <button>Save</button>
                </form>
                {error && <p>Some error occured</p> }
            </div>
        </div>

    </div>
  )
}

export default Expenses