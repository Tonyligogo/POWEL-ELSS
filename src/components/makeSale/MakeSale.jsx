import CustomerRecsTemplate from "../customers/CustomerRecsTemplate"
import Sidebar from "../sidebar/sidebar"
import "./MakeSale.css"

function MakeSale() {
  return (
    <div className='newUser home'>
        <Sidebar/>
        <div className="newUserContainer homeContainer">
            <div className="newUserTitle">
                <h3>Make new sale</h3>
            </div>
            <div className="newUserDetails">
                <p>Select the customer that wants to make a purchase</p>
                <CustomerRecsTemplate/>
            </div>
        </div>
    </div>
  )
}

export default MakeSale