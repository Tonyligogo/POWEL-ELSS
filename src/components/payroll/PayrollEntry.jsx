import './PayrollEntry.css'
import { useState } from 'react'
import axios from 'axios'
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

function PayrollEntry() {
    const navigate = useNavigate();
    const currentDate = new Date().toLocaleDateString();
    const [formData, setFormData] = useState({
        idNo:'',
        netSalary:'',
        remittedAmount:'',
        outstandingAmount:'',
    })
    const [userCreated, setUserCreated] = useState(false);
    function changeValue(e){
        setFormData({...formData, [e.target.name]:e.target.value})
    };
      
    async function enterPayroll(e){
        e.preventDefault();
        const userData = {
            id_no:formData.idNo,
            net_salary:formData.netSalary,
            remitted_amount:formData.remittedAmount,
            outstanding_amount:formData.outstandingAmount,
            date_of_payment:currentDate
        }
        await axios.post("http://localhost:5000/api/dashboard/payroll-entry", userData,{
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
                idNo:'',
                netSalary:'',
                remittedAmount:'',
                outstandingAmount:'',
                dateOfPayment:''
            })
            navigate("/Payroll")
          }, 2000);
    }
  return (
    <div className='newUser'>
        <div className="newUserContainer">
            <div className="newUserTitle">
                <h3>Add New Payroll</h3>
            </div>
            <div className="newUserDetails">
                <form onSubmit={enterPayroll}>
                    <h3>Payroll Entry</h3>
                    <div className="formInput">
                        <label>ID number</label>
                        <input type="number" value={formData.idNo} name='idNo' required onChange={changeValue} />
                    </div>
                    <div className="formInput">
                        <label>Net Salary</label>
                        <input type="number" value={formData.netSalary} name='netSalary' required onChange={changeValue}/>
                    </div>
                    <div className="formInput">
                        <label>Remitted amount</label>
                        <input type="number" value={formData.remittedAmount} name='remittedAmount' required onChange={changeValue}/>
                    </div>
                    <div className="formInput">
                        <label>Outstanding amount</label>
                        <input type="number" value={formData.outstandingAmount} name='outstandingAmount' required onChange={changeValue}/>
                    </div>
                    <div className="formInput">
                        <label>Date of Payment</label>
                        <label className='outputField' id='date'>{currentDate}</label>
                    </div>
                    <button type='submit'>Save</button>
                </form>
                { userCreated && <p className='successMessage'> <Icon icon="mdi:success-circle" color="green" />Successful Payroll entry</p>}
            </div>
        </div>

    </div>
  )
}

export default PayrollEntry