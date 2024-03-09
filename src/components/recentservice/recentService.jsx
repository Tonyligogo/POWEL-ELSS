import { ThreeDots } from 'react-loader-spinner';
import './recentservice.css';


function RecentService({data, error, isError, loading}) {
  if(isError){
    return <p>{error.message}</p>
  }

  return (
    <main className='recentServicesWrapper'>
    {loading ? 
    <div className="loader">
    <ThreeDots 
    height="80" 
    width="80" 
    radius="9"
    color="#d74221" 
    ariaLabel="three-dots-loading"
    visible={true}
    />
  </div>
    :
    <div className="recordsTableContainer recentServicesContainer">
    <table className="staffRecordsTable">
        <thead className="staffTHead">
            <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody className="staffTBody">    
        {data?.data?.orders?.slice(-5).map((item) => (
            <tr key={item._id}>
              <td>{item.customer.name}</td>
              <td>Ksh {item.product_details?.totalPrice}</td>
              <td>{item.date}</td>
            </tr>
        ))}
        </tbody>
    </table>
  </div>
    }
    {!loading && data.length === 0 && <p>No recent services available</p>}
    </main>
  )
}

export default RecentService

// data?.data.orders.slice(-5).map((item)=>(
//   <div className='recentService' key={item._id}>
//     <span>{item.customer.name}</span>
//     <span>Ksh {item.product_details?.totalPrice}</span>
//     <span>{item.date}</span>
// </div>
// )) 

