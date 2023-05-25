import "./deduction.css"
import Sidebar from "../sidebar/sidebar"

function deduction() {
  return (
    <div className="deduction home">
        <Sidebar/>
        <div className="deductionContainer homeContainer">
            <div className="deductionWrapper">
            <h2>Deduction Form</h2>
            <form className="deductionForm">
                <div>
                    <label htmlFor="idNumber">ID No</label>
                    <input type="text" id="idNumber" name="month"/>
                </div>
                <div>
                    <label htmlFor="month">Month</label>
                    <select id='month' name="month">
                        <option selected value='1'>January</option>
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
                <label htmlFor="NHIFnumber">NHIF</label>
                <input type="text" name="NHIFnumber" id="NHIFnumber"/>
                </div>
                <div>
                <label htmlFor="nssfNumber">Nssf</label>
                <input type="text" name="nssfNumber" id="nssfNumber"/>
                </div>
                <div>
                <label htmlFor="advances">Advances</label>
                <input type="text" name="advances" id="advances"/>
                </div>
                <div>
                <label htmlFor="taxes">Taxes</label>
                <input type="text" name="taxes" id="taxes"/>
                </div>
                <button>Save</button>
            </form>
            </div>
        </div>




    </div>
  )
}

export default deduction