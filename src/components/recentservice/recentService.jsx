import RecentSaleSkeleton from '../skeleton/RecentSaleSkeleton';
import './recentservice.css';
import { CircularProgress } from "@mui/material";


function RecentService({data, error, isError, loading}) {
  if(isError){
    return <p>{error.message}</p>
  }

  return (
    <>
    {loading ? 
    <RecentSaleSkeleton />
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
