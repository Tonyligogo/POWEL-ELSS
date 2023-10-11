import { ThreeDots } from 'react-loader-spinner';
import './recentservice.css';


function RecentService({data, error, isError, loading}) {
  if(isError){
    return <p>{error.message}</p>
  }

  return (
    <>
    {loading ? 
    <ThreeDots 
    height="80" 
    width="80" 
    radius="9"
    color="#d74221" 
    ariaLabel="three-dots-loading"
    visible={true}
    />
  //   <div className="loader">
  // </div>
    :
    data?.data.orders.slice(-3).map((item)=>(
      <div className='recentService' key={item._id}>
        <span>{item.customer.name}</span>
        <span>Ksh {item.product_details?.totalPrice}</span>
        <span>{item.date}</span>
    </div>
    )) 
    }
    {!loading && data.length === 0 && <p>No recent services available</p>}
    </>
  )
}

export default RecentService
