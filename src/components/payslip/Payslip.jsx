import React from 'react'
import "./payslip.css"
import Sidebar from "../sidebar/sidebar"

function Payslip() {

    const allowanceDetails = localStorage.getItem('object')
    const allowanceDetailsParsed = JSON.parse(allowanceDetails)
    function generateDetails(e){
        e.preventDefault()
        console.log(allowanceDetailsParsed)
        console.log(allowanceDetailsParsed.month)
    }

  return (
    <div className="home">
        <Sidebar/>
        <div className="homeContainer">
        <div className='payslipTitle'>
            <h3>Payslip</h3>
        </div>
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
                            <option value='January'>Janaury</option>
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
                    <input type="number" min="2023" />
                </div>
            </div>
            <div className="paySlipButtons">
                <button onClick={generateDetails}>Generate</button>
                <button>Clear</button>
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
                <label className='outputField'>{allowanceDetailsParsed.arrears}</label>
                </div>
                <div>
                <label htmlFor="">House</label>
                <label className='outputField'>{allowanceDetailsParsed.house}</label>
                </div>
                <div>
                <label htmlFor="">Gross Pay</label>
                <label className='outputField'>{allowanceDetailsParsed.month}</label>
                </div>
                <div>
                <label htmlFor="">Imprest Amount</label>
                <label className='outputField'>{allowanceDetailsParsed.imprestAmount}</label>
                </div>
                <div>
                <label htmlFor="">Transport</label>
                <label className='outputField'>{allowanceDetailsParsed.transport}</label>
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
            <div className='printButtonWrapper'><button className='printButton'>Print</button></div>
        </div>
        </div>
    </div>
  )
}

export default Payslip