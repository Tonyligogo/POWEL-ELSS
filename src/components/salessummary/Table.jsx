import "./table.css"
const Table = ({ data }) => {
    return (
      <div className="recordsTableContainer">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.email}</td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
    );
  };
  
  export default Table;