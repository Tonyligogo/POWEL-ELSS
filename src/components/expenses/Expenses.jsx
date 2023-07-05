import './expenses.css'
import Sidebar from "../sidebar/sidebar"
import axios from 'axios'
import { useState } from 'react'

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
    const currentDate = new Date().toLocaleDateString();
    const data = {
        code:1234,
        service_item_name:formData.service,
        total_cost: formData.cost,
        recorded_by: formData.recordedBy,
        date: currentDate,
    }
    const [error, setError] = useState(false)
    async function saveDetails(e){
        e.preventDefault()
        await axios.post("http://localhost:5000/api/dashboard/expenses",data,{
                headers: {authorization: "jwt " + localStorage.getItem("token")}
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
    <div className='expense home'>
        <Sidebar/>
        <div className="expenseContainer homeContainer">
            <div className="expenseTitle">
                <h3>Expenses Form</h3>
            </div>
            <div className="expenseForm">
                <form onSubmit={saveDetails}>
                    <div className="formInput">
                        <label>Code</label>
                        <label className='outputField'>1234</label>
                    </div>
                    <div className="formInput">
                        <label>Service/ Item name</label>
                        <input type="text" placeholder='Service or Item name' name='service' value={formData.service} onChange = {changeValue}/>
                    </div>
                    <div className="formInput">
                        <label>Total Cost</label>
                        <input type="text" placeholder='Total cost' name='cost' value={formData.cost} onChange = {changeValue}/>
                    </div>
                    <div className="formInput">
                        <label>Recorded by</label>
                        <input type="text" placeholder='Recorded by' name='recordedBy' value={formData.recordedBy} onChange = {changeValue}/>
                    </div>
                    <div className="formInput">
                        <label>Date</label>
                        <label className='outputField'>{currentDate}</label>
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