import { ThreeDots } from 'react-loader-spinner'
import './recents.css'

function Recents({data, loading}) {
  return (
    <div className='recentServicesContainer'>
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
      <table className="staffRecordsTable">
            <thead className="staffTHead">
                <tr>
                    <th>Client name</th>
                    <th>Work location</th>
                </tr>
            </thead>
            <tbody className="staffTBody">
                {data?.data.service_forms.map((service) => (
                <tr key={service._id}>
                  <td>{service.client_name}</td>
                  <td>{service.work_location}</td>
                </tr>
            ))}
            </tbody> 
        </table>}
    </div>
  )
}

export default Recents