import "./CustomerRecords.css"
import Sidebar from "../sidebar/sidebar";
import CustomerRecsTemplate from "./CustomerRecsTemplate";
import { Link } from "react-router-dom";

function CustomerRecords() {
  return (
    <div className="home">
    <Sidebar/>
      <div className="homeContainer">
        <div className="staffRecordsHeading">  
            <h3>Customer Records</h3>
            <div className="myLinks">
            <Link to="/NewCustomer">
              <button>Add new Customer</button>
            </Link>
          </div>
        </div>
        <CustomerRecsTemplate/>
        </div>
  </div>
  )
}

export default CustomerRecords