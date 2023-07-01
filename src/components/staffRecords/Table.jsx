import "./table.css"
import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";
const Table = ({ data, query }) => {
    return (
      <div className="recordsTableContainer">
        <table className="staffRecordsTable">
            <thead>
                <tr>
                    <th></th>
                    <th>P_No</th>
                    <th>Name</th>
                    <th>ID_No</th>
                    <th>Job Title</th>
                    <th>Phone No</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.length ? data.filter((name)=>{
                  return query === '' ? name : name.first_name.toLowerCase().includes(query) || name.last_name.toLowerCase().includes(query);
                })
                .map((item,idx) => (
                <tr key={item._id}>
                  <td>{idx}</td>
                  <td>{item.P_no}</td>
                  <td>{`${item.first_name} ${item.last_name}`}</td>
                  <td>{item.id_no}</td>
                  <td>{item.job_title}</td>
                  <td>{item.phone_no}</td>
                  <td className="clickable">  
                    <Link to={'/StaffRecords/delete/'+item._id}> <Icon icon="fluent-mdl2:delete" color="#d74221" width="24"/> </Link> 
                  </td>
                </tr>
            )) : null}
            </tbody>
        </table>
      </div>
    );
  };
  
  export default Table;