import React from 'react'
import "./payslip.css"
import Sidebar from "../sidebar/sidebar"

function Payslip() {
  return (
    <div className="home">
        <Sidebar/>
        <div className="homeContainer">
        <h2 className='payslipHeading'>PAYSLIP</h2>
        <div className='payslipContainer'>
            <div className="topPayslip">
                <div>
                    <label>ID No</label>
                    <input type="text" />
                </div>
                <div>
                <label htmlFor="month">Month</label>
                        <select id='month' name="month">
                            <option value=''>--Select Month--</option>
                            <option selected value='1'>Janaury</option>
                            <option value='2'>February</option>
                            <option value='3'>March</option>
                            <option value='4'>April</option>
                            <option value='5'>May</option>
                            <option value='6'>June</option>
                            <option value='7'>July</option>
                            <option value='8'>August</option>
                            <option value='9'>September</option>
                            <option value='10'>October</option>
                            <option value='11'>November</option>
                            <option value='12'>December</option>
                        </select>
                </div>
                <div>
                    <label>Year</label>
                    <input type="number" min="2023" />
                </div>
            </div>
            <div className="paySlipButtons">
                <button>Generate</button>
                <button>Clear</button>
                <button>Print</button>
            </div>
            <div className="employeeDetailsContainer">
                
            <div className='employeeDetailsWrapper'>
            <div className="employeeDetails">
                <div>
                <label htmlFor="">Employee Name</label>
                <label className='outputField'></label>
                </div>
                <div>
                <label htmlFor="">Job Title</label>
                <label className='outputField'></label>
                </div>
                <div>
                <label htmlFor="">Date</label>
                <label className='outputField'></label>
                </div>
                <div>
                <label htmlFor="">Basic Pay</label>
                <label className='outputField'></label>
                </div>
            </div>
                <h3 className='allowanceHeading'>Allowances</h3>
            <div className="allowanceDetails">
                <div>
                <label htmlFor="">Arrears</label>
                <label className='outputField'></label>
                </div>
                <div>
                <label htmlFor="">House</label>
                <label className='outputField'></label>
                </div>
                <div>
                <label htmlFor="">Gross Pay</label>
                <label className='outputField'></label>
                </div>
                <div>
                <label htmlFor="">Imprest Amount</label>
                <label className='outputField'></label>
                </div>
                <div>
                <label htmlFor="">Transport</label>
                <label className='outputField'></label>
                </div>
            </div>
                <h3 className='deductionHeading'>Deductions</h3>
            <div className="deductionDetails">
                <div>
                <label htmlFor="">NHIF</label>
                <label className='outputField'></label>
                </div>
                <div>
                <label htmlFor="">NSSF</label>
                <label className='outputField'></label>
                </div>
                <div>
                <label htmlFor="">Advances</label>
                <label className='outputField'></label>
                </div>
                <div>
                <label htmlFor="">Taxes</label>
                <label className='outputField'></label>
                </div>
                <div>
                <label htmlFor="">Total Deductions</label>
                <label className='outputField'></label>
                </div>
            </div>
            </div>
            <div className="netSalary">
            <label htmlFor="">Net Salary</label>
            <label className='outputField'></label>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Payslip