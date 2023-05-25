import Sidebar from '../sidebar/sidebar'
import './newUser.css'

function newUser() {
  return (
    <div className='newUser home'>
        <Sidebar/>
        <div className="newUserContainer homeContainer">
            <div className="newUserTitle">
                <p>Add New Staff</p>
            </div>
            <div className="newUserDetails">
                <form>
                    <h3>Personal Information</h3>
                    <div className="formInput">
                        <label>First Name</label>
                        <input type="text" placeholder='First Name' />
                    </div>
                    <div className="formInput">
                        <label>Last Name</label>
                        <input type="text" placeholder='Last Name' />
                    </div>
                    <div className="formInput">
                        <label>ID number</label>
                        <input type="text" placeholder='ID no.' />
                    </div>
                    <div className="formInput">
                        <label>Phone Number</label>
                        <input type="text" placeholder='Phone number' />
                    </div>
                    <h3>Job Information</h3>
                    <div className="formInput">
                        <label>Job Title</label>
                        <input type="text" placeholder='Job title' />
                    </div>
                    <div className="formInput">
                        <label>P/No</label>
                        <select id='month' name="month">
                            <option selected value='1'>PE-01</option>
                            <option value='2'>PE-02</option>
                            <option value='3'>PE-03</option>
                            <option value='4'>PE-04</option>
                            <option value='5'>PE-05</option>
                            <option value='6'>PE-06</option>
                            <option value='7'>PE-07</option>
                            <option value='8'>PE-08</option>
                            <option value='7'>PE-09</option>
                            <option value='8'>PE-10</option>
                        </select> 
                    </div>
                    <button>Save</button>
                </form>
            </div>
        </div>

    </div>
  )
}

export default newUser