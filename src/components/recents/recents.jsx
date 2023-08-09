import './recents.css'

function Recents({services}) {
  return (
    <>
    {services.map((service)=>(
      <div className='recents' key={service._id}>
        <span>{service.client_name}</span>
        <span>{service.requested_by}</span>
        <span>{service.work_location}</span>
    </div>
    ))}
    </>
  )
}

export default Recents