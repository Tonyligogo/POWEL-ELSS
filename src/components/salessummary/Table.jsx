import "./table.css"
const Table = ({ data, query, error }) => {
    return (
      <div className="recordsTableContainer">
        {data.length ? <table className="staffRecordsTable">
            <thead className="staffTHead">
                <tr>
                    <th></th>
                    <th>Client name</th>
                    <th>Address</th>
                    <th>Date</th>
                    <th>No. of Items</th>
                    <th>Price</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody className="staffTBody">
                 {data.filter((name)=>{
                  return query === '' ? name : name.name.toLowerCase().includes(query) || name.last_name.toLowerCase().includes(query);
                })
                .map((item,idx) => (
                <tr key={item._id}>
                  <td>{idx}</td>
                  <td>{item.customer.name}</td>
                  <td>{item.customer.address}</td>
                  <td>{item.date}</td>
                  <td>{item.product_details?.totalQty}</td>
                  <td>{item.product_details?.totalPrice}</td>
                  <td> <span className="statusBtn">{item.purchase_status}</span></td>
                </tr>
            ))}
            </tbody> 
        </table>: <p>{error}</p> }
      </div>
    );
  };
  
  export default Table;