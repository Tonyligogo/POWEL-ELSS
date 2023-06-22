import './allowances.css'
import React, { useState } from 'react'
import Sidebar from '../sidebar/sidebar'

function Allowances() {

    const [formData, setFormData] = useState({
        idNo:'',
        month: '',
        year:'',
        arrears:'',
        house:'',
        imprestAmount:'',
        transport:''
    })
    function changeValue(e){
        setFormData({...formData, [e.target.name]:e.target.value})
    }
    function saveDetails (e){
        e.preventDefault()
        localStorage.setItem('object', JSON.stringify(formData))
        setFormData({
            idNo:'',
            month: '',
            year:'',
            arrears:'',
            house:'',
            imprestAmount:'',
            transport:''
        })
    }
    

  return (
    <div className="allowance home">
        <Sidebar/>
        <div className='allowanceContainer homeContainer'>
            <div className='allowancesFormTitle'><h3>Allowances Form</h3></div>
            <div className="allowancesWrapper">
                <form className="allowancesForm" onSubmit={saveDetails}>
                    <div>
                        <label htmlFor="idNumber">ID No</label>
                        <input type="text" id="idNumber" name="idNo" value={formData.idNo} onChange = {changeValue} />
                    </div>
                    <div>
                        <label htmlFor="month">Month</label>
                        <select id='month' name="month" value={formData.month} onChange = {changeValue}>
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
                    <label htmlFor="year">Year</label>
                    <input type="number" name="year" value={formData.year} id="year" min="2023" max="2050" onChange = {changeValue}/>
                    </div>
                    <div>
                    <label htmlFor="arrears">Arrears</label>
                    <input type="text" name="arrears" id="arrears" value={formData.arrears} onChange = {changeValue}/>
                    </div>
                    <div>
                    <label htmlFor="house">House</label>
                    <input type="text" name="house" id="house" value={formData.house} onChange = {changeValue}/>
                    </div>
                    <div>
                    <label htmlFor="imprestAmount">Imprest Amount</label>
                    <input type="text" name="imprestAmount" id="imprestAmount" value={formData.imprestAmount} onChange = {changeValue}/>
                    </div>
                    <div>
                    <label htmlFor="transport">Transport</label>
                    <input type="text" name="transport" id="transport" value={formData.transport} onChange = {changeValue}/>
                    </div>
                    <button type='submit'>Save</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Allowances