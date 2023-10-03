import './recents.css'

function Recents({data, loading}) {
  return (
    // <div className='recentServicesContainer'>
    // {data?.data.service_forms.map((service)=>(
    //   <div className='recents' key={service._id}>
    //     <span>{service.client_name}</span>
    //     <span>{service.work_location}</span>
    // </div>
    // ))}
    // </div>
    <div className='recentServicesContainer'>
      {loading ? 
      <p>Loading...</p>
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