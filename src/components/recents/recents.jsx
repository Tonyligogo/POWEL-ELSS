import './recents.css'

function Recents({data, loading}) {
  return (
    <div className='recentServicesContainer'>
    {data?.data.service_forms.map((service)=>(
      <div className='recents' key={service._id}>
        <span>{service.client_name}</span>
        <span>{service.work_location}</span>
    </div>
    ))}
    </div>
  )
}

export default Recents