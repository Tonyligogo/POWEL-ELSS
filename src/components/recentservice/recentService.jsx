import './recentservice.css';
import { CircularProgress } from "@mui/material";


function RecentService({data, error, loading}) {

  return (
    <>
    {loading ? 
    <CircularProgress size="24px" className="progress"/>
    :
    data.map((item)=>(
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