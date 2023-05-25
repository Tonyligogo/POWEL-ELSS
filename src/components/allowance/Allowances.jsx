import './allowances.css'
import React from 'react'
import Sidebar from '../sidebar/sidebar'

function Allowances() {
  return (
    <div className="allowance home">
        <Sidebar/>
        <div className='allowanceContainer homeContainer'>
            <div className="allowancesWrapper">
                <h2>Allowances Form</h2>
                <form className="allowancesForm">
                    <div>
                        <label htmlFor="idNumber">ID No</label>
                        <input type="text" id="idNumber" name="month"/>
                    </div>
                    <div>
                        <label htmlFor="month">Month</label>
                        <select id='month' name="month">
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
                    <label htmlFor="year">Year</label>
                    <input type="number" name="year" id="year" min="2023" max="2050"/>
                    </div>
                    <div>
                    <label htmlFor="arrears">Arrears</label>
                    <input type="text" name="arrears" id="arrears"/>
                    </div>
                    <div>
                    <label htmlFor="house">House</label>
                    <input type="text" name="house" id="house"/>
                    </div>
                    <div>
                    <label htmlFor="imprestAmount">Imprest Amount</label>
                    <input type="text" name="imprestAmount" id="imprestAmount"/>
                    </div>
                    <div>
                    <label htmlFor="transport">Transport</label>
                    <input type="text" name="transport" id="transport"/>
                    </div>
                    <button>Save</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Allowances