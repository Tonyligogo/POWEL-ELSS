import "./table.css"
const Table = ({ data, query, error }) => {
  console.log(data)
    return (
      <div className="recordsTableContainer">
        {data.length ? <table className="staffRecordsTable">
            <thead className="staffTHead">
                <tr>
                    <th></th>
                    <th>Client name</th>
                    <th>Requested by</th>
                    <th>Scope</th>
                    <th>Work location</th>
                </tr>
            </thead>
            <tbody className="staffTBody">
                 {data.filter((name)=>{
                  return query === '' ? name : name.client_name.toLowerCase().includes(query) || name.requested_by.toLowerCase().includes(query);
                })
                .map((item,idx) => (
                <tr key={item._id}>
                  <td>{idx}</td>
                  <td>{item.client_name}</td>
                  <td>{item.requested_by}</td>
                  <td>{item.scope}</td>
                  <td>{item.work_location}</td>
                </tr>
            ))}
            </tbody> 
        </table>: <p>{error}</p> }
      </div>
    );
  };
  
  export default Table;