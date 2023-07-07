import "./table.css"
const Table = ({ data, query, error }) => {
    return (
      <div className="recordsTableContainer">
        {data.length ? <table className="staffRecordsTable">
            <thead className="staffTHead">
                <tr>
                    <th>ID</th>
                    <th>Recorded by</th>
                    <th>Service/ Item name</th>
                    <th>Total Cost</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody className="staffTBody">
                 {data.filter((name)=>{
                  return query === '' ? name : name.recorded_by.toLowerCase().includes(query);
                })
                .map((item,idx) => (
                <tr key={item._id}>
                  <td>{idx}</td>
                  <td>{item.recorded_by}</td>
                  <td>{item.service_item_name}</td>
                  <td>{item.total_cost}</td>
                  <td>{item.date}</td>
                </tr>
            ))}
            </tbody> 
        </table>: <p>{error}</p> }
      </div>
    );
  };
  
  export default Table;