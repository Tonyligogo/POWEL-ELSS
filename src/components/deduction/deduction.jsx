import "./deduction.css"
import Sidebar from "../sidebar/sidebar"

function deduction() {
  return (
    <div className="deduction home">
        <Sidebar/>
        <div className="deductionContainer homeContainer">
            <div className="deductionFormTitle">
                <h3>Deduction Form</h3>
            </div>
            <div className="deductionWrapper">
            <form className="deductionForm">
                <div>
                    <label htmlFor="idNumber">ID No</label>
                    <input type="text" id="idNumber" name="month"/>
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