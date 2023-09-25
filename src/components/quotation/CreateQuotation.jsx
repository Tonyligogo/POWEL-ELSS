import CustomerRecsTemplate from "../customers/CustomerRecsTemplate"

function CreateQuotation() {
    const path = 'quotation'
  return (
    <div className='newUser'>
        <div className="newUserContainer">
            <div className="newUserTitle">
                <h3>Generate quotation</h3>
            </div>
            <div className="newUserDetails">
                <p>Select the customer that wants to make a purchase</p>
                <CustomerRecsTemplate path={path} />
            </div>
        </div>
    </div>
  )
}

export default CreateQuotation