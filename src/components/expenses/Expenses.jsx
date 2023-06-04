import './expenses.css'
import Sidebar from "../sidebar/sidebar"
function Expenses() {
  return (
    <div className='expense home'>
        <Sidebar/>
        <div className="expenseContainer homeContainer">
            <div className="expenseTitle">
                <h3>Expenses Form</h3>
            </div>
            <div className="expenseForm">
                <form>
                    <div className="formInput">
                        <label>Code</label>
                        <label className='outputField'></label>
                    </div>
                    <div className="formInput">
                        <label>Service/ Item name</label>
                        <input type="text" placeholder='Service or Item name' />
                    </div>
                    <div className="formInput">
                        <label>Total Cost</label>
                        <input type="text" placeholder='Total cost' />
                    </div>
                    <div className="formInput">
                        <label>Recorded by</label>
                        <input type="text" placeholder='Recorded by' />
                    </div>
                    <div className="formInput">
                        <label>Date</label>
                        <label className='outputField'></label>
                    </div>
                    <button>Save</button>
                </form>
            </div>
        </div>

    </div>
  )
}

export default Expenses