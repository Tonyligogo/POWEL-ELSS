import "./table.css"
const Table = ({ data, query, error }) => {
    return (
      <div className="recordsTableContainer">
        {data.length ? <table className="staffRecordsTable">
            <thead className="staffTHead">
                <tr>
                    <th></th>
                    <th>Client name</th>
                    <th>Phone number</th>
                    <th>Date</th>
                    <th>No. of Items</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody className="staffTBody">
                 {data.filter((name)=>{
                  return query === '' ? name : name.name.toLowerCase().includes(query) || name.last_name.toLowerCase().includes(query);
                })
                .map((item,idx) => (
                <tr key={item._id}>
                  <td>{idx}</td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.date}</td>
                  <td>{item.cart?.totalQty}</td>
                  <td>{item.cart?.totalPrice}</td>
                </tr>
            ))}
            </tbody> 
        </table>: <p>{error}</p> }
      </div>
    );
  };
  
  export default Table;