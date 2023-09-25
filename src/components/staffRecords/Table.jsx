import "./table.css"
import { useState } from "react";
import DeleteStaff from "./DeleteStaff"
const Table = ({ data, query, fetchEmployeeData }) => {

  const [modalOpen, setModalOpen] = useState(false);
  const [pid, setPid] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  function openDelete(Pid, firstName, lastName){
    setModalOpen(true)
    setPid(Pid)
    setFirstName(firstName)
    setLastName(lastName)
  }

    return (
      <div className="recordsTableContainer">
        <table className="staffRecordsTable">
            <thead className="staffTHead">
                <tr>
                    <th>P_No</th>
                    <th>Name</th>
                    <th>ID_No</th>
                    <th>Job Title</th>
                    <th>Phone No</th>
                    <th></th>
                </tr>
            </thead>
            <tbody className="staffTBody">
                {data.length ? data.filter((name)=>{
                  return query === '' ? name : name.first_name.toLowerCase().includes(query) || name.last_name.toLowerCase().includes(query);
                })
                .map((item,idx) => (
                <tr key={item._id}>
                  <td>{item.P_no}</td>
                  <td>{`${item.first_name} ${item.last_name}`}</td>
                  <td>{item.id_no}</td>
                  <td>{item.job_title}</td>
                  <td>{item.phone_no}</td>
                  <td className="clickable">  
                    <button className="deleteBtn" onClick={()=>openDelete(item._id, item.first_name, item.last_name)}>Delete</button>                  </td>
                </tr>
            )) : null}
            </tbody>
        </table>
        {modalOpen &&
          <DeleteStaff 
            pid={pid} 
            firstName={firstname}
            lastName={lastname}
            closeModal={() => {
              setModalOpen(false);
            }}
            fetchEmployeeData={fetchEmployeeData}
          />}
      </div>
    );
  };
  
  export default Table;

