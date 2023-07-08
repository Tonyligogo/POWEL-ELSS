import React, { useState } from 'react'
import "./payslip.css"
import Sidebar from "../sidebar/sidebar"
import axios from 'axios'

axios.defaults.withCredentials = true

function Payslip() {

    const [deduction, setDeduction] = useState([]);
    const [allowance, setAllowance] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [deductionstate, setDeductionState] = useState(false);
    const [allowancestate, setAllowanceState] = useState(false);
    const [employeestate, setEmployeeState] = useState(false);
    const currentDate = new Date().toLocaleDateString();
    const basicPay = 30000;
    const [formData, setFormData] = useState({
        idNo:'',
        month:'',
        year:''
    })
    function changeValue(e){
        setFormData({...formData, [e.target.name]:e.target.value})
    }
     async function getDeduction_Allowance(e,idNo){
        e.preventDefault()
        axios.all([
           
            await axios.get("http://localhost:5000/api/dashboard/deduction-data/"+idNo,
            {
                headers: {authorization: "jwt " + sessionStorage.getItem("token")}
            }), 
            await axios.get("http://localhost:5000/api/dashboard/allowance/"+idNo,
            {
              headers: {authorization: "jwt " + sessionStorage.getItem("token")}
            }
            ),
            axios.get("http://localhost:5000/api/dashboard/single-employee/"+idNo,
            {
            headers: {authorization: "jwt " + sessionStorage.getItem("token")}
            }
            )
          ])
          .then(axios.spread((data1, data2, data3) => {
              setDeduction(data1.data.allowances[0])
              setDeductionState(true)
              setAllowance(data2.data.allowances[0])
              setAllowanceState(true)
              setEmployee(data3.data.employee[0])
              setEmployeeState(true)
          }));
    }
         
  return (
    <div className="home">
        <Sidebar/>
        <div className="homeContainer">
        <div className='payslipTitle'>
            <h3>Payslip</h3>
        </div>
        <div className='payslipContainer'>
            <form onSubmit={e => getDeduction_Allowance(e, formData.idNo)}>
                <div className="topPayslip">
                    <div>
                        <label>ID No</label>
                        <input type="text" name='idNo' value={formData.idNo} onChange={changeValue}/>
                    </div>
                    <div>
                    <label htmlFor="month">Month</label>
                            <select id='month' name="month" value={formData.month} onChange={changeValue}>
                                <option value=''>--Select Month--</option>
                                <option value='January'>January</option>
                                <option value='February'>February</option>
                                <option value='March'>March</option>
                                <option value='April'>April</option>
                                <option value='May'>May</option>
                                <option value='June'>June</option>
                                <option value='July'>July</option>
                                <option value='August'>August</option>
                                <option value='September'>September</option>
                                <option value='October'>October</option>
                                <option value='November'>November</option>
                                <option value='December'>December</option>
                            </select>
                    </div>
                    <div>
                        <label>Year</label>
                        <input type="number" min="2023" name='year' value={formData.year} onChange={changeValue}/>
                    </div>
                </div>
                <div className="paySlipButtons">
                    <button type='submit'>Generate</button>
                </div>
            </form>
            <div className="employeeDetailsContainer">
                
            <div className='employeeDetailsWrapper'>
            <div className="employeeDetails">
                <div>
                <label htmlFor="">Employee Name</label>
                {employeestate ?
                    <label className='outputField'>{`${employee.first_name} ${employee.last_name}`}</label>
                : <label className='outputField'></label>}
                </div>
                <div>
                <label htmlFor="">Job Title</label>
                {employeestate ?
                    <label className='outputField'>{employee.job_title}</label>
                : <label className='outputField'></label>}
                </div>
                <div>
                <label htmlFor="">Date</label>
                <label className='outputField'>{currentDate}</label>
                </div>
                <div>
                <label htmlFor="">Basic Pay</label>
                <label className='outputField'>{basicPay}</label>
                </div>
            </div>
                <h3 className='allowanceHeading'>Allowances</h3>
            <div className="allowanceDetails">
                <div>
                <label htmlFor="">Arrears</label>
                <label className='outputField'>{allowance.arrears}</label>
                </div>
                <div>
                <label htmlFor="">House</label>
                <label className='outputField'>{allowance.house}</label>
                </div>
                <div>
                <label htmlFor="">Imprest Amount</label>
                <label className='outputField'>{allowance.imprest_amount}</label>
                </div>
                <div>
                <label htmlFor="">Transport</label>
                <label className='outputField'>{allowance.transport}</label>
                </div>
                <div>
                <label htmlFor="">Gross Pay</label>
                {allowancestate ? 
                <label className='outputField'>{allowance.arrears + allowance.house+ allowance.imprest_amount+ allowance.transport}</label>
                : <label className='outputField'></label>}
                </div>
            </div>
                <h3 className='deductionHeading'>Deductions</h3>
            <div className="deductionDetails">
                <div>
                <label htmlFor="">NHIF</label>
                <label className='outputField'>{deduction.nhif}</label>
                </div>
                <div>
                <label htmlFor="">NSSF</label>
                <label className='outputField'>{deduction.nssf}</label>
                </div>
                <div>
                <label htmlFor="">Advances</label>
                <label className='outputField'>{deduction.advances}</label>
                </div>
                <div>
                <label htmlFor="">Taxes</label>
                <label className='outputField'>{deduction.taxes}</label>
                </div>
                <div>
                <label htmlFor="">Total Deductions</label>
                {deductionstate ? 
                    <label className='outputField'>{deduction.nhif + deduction.nssf + deduction.advances + deduction.taxes}</label>
                :
                    <label className='outputField'></label>
                }
                </div>
            </div>
            </div>
            <div className="netSalary">
                <label htmlFor="">Net Salary</label>
                <label className='outputField'>{basicPay + allowance.arrears + allowance.house+ allowance.imprest_amount+ allowance.transport - deduction.nhif  -deduction.nssf  -deduction.advances - deduction.taxes}</label>
            </div>
            </div>
            <div className='printButtonWrapper'><button className='printButton'>Print</button></div>
        </div>
        </div>
    </div>
  )
}

export default Payslip