import { useState } from 'react';
import './NewQuotation.css'
import CustomerTable from './CustomerTable';
import Quotation from '../quotation/Quotation';
import ProductsTable from './ProductsTable';

function NewQuotation() {

    const [modalOpen, setModalOpen] = useState(false);
    const [customer, setCustomer] = useState(null);
    const handleCustomerSelect = (item) => {
        setCustomer(item);
      };
    const [quotationType, setQuotationType] = useState(null);

    const receiveDataFromChild = (data) => {
        setQuotationType(data);
    }

  return (
    <main>
        <h2 className='newQuotationHeading'>Quotation</h2>
        <div className="quotationDetails">
            <Quotation sendDataToParent={receiveDataFromChild}/>
        </div>
        <div className="customerDetailsWrapper">
            <p> <span className='linkSpan' onClick={()=>setModalOpen(true)}>Click here</span> to select the customer</p>
            {modalOpen &&
                <CustomerTable
                    closeModal={() => {
                        setModalOpen(false);
                    }}

                    onCustomerSelect={handleCustomerSelect}
                />
            }
            {customer && (
                <div>
                    <h3>Selected Customer</h3>
                    <div className="customerDetails">
                        <div>
                            <span>Name</span>
                            <span>{customer.name}</span>
                        </div>
                        <div>
                            <span>Email</span>
                            <span>{customer.email}</span>
                        </div>
                        <div>
                            <span>Address</span>
                            <span>{customer.address}</span>
                        </div>  
                    </div>
                </div>
            )}
        </div>
            <div className="productDescription">
               <ProductsTable quotationType={quotationType}/> 
            </div>
    </main>
  )
}

export default NewQuotation