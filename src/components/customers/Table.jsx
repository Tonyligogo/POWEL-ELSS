import axios from "axios";
import "./Table.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Table = ({ data, query, fetchCustomerData, path }) => {
    const navigate = useNavigate()
  const [pid, setPid] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  function singleCustomer(Pid){
    setPid(Pid)
    singleCustomerDetails()
  }
  async function singleCustomerDetails(){
    await axios.get("http://localhost:5000/api/dashboard/customer-details/"+pid,{
        headers: {authorization: "jwt " + sessionStorage.getItem("token")}
      }).then((response)=>{
        setIsComplete(true)
    })
    if(isComplete){
      navigate("/Products", { state: { path } })
    }
  }

    return (
      <div className="recordsTableContainer">
        <table className="staffRecordsTable">
            <thead className="staffTHead">
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Contact Person</th>
                    <th>Email</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody className="staffTBody">
                {data.length ? data.filter((name)=>{
                  return query === '' ? name : name.name.toLowerCase().includes(query) || name.contact_person.toLowerCase().includes(query);
                })
                .map((item,idx) => (
                <tr key={item._id} onClick={()=>singleCustomer(item._id)}>
                  <td>{idx}</td>
                  <td>{item.name}</td>
                  <td>{item.contact_person}</td>
                  <td>{item.email}</td>
                  <td>{item.address}</td>
                </tr>
            )) : null}
            </tbody>
        </table>
      </div>
    );
  };
  
  export default Table;

