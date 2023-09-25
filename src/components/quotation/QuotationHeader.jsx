import './QuotationHeader.css'

function QuotationHeader() {
  return (
            <div className='QuotationHeader'>
                <div className="topOfQuotation">
                    <div className="left">
                        <span>Naivasha Moi South Lake road</span>
                        <span>P.o.Box 1530-20117 Naivasha</span>
                        <span>Cell - +254722171416</span>
                        <span>Email: <a href="mailto:admin@powel-elss.com">admin@powel-elss.com</a> </span>
                    </div>
                    <div className="right">
                        <span>Powel-elss <sup>(K)</sup> </span>
                        <span className='line'></span>
                        <span>Electrical Sales, Installations & Industrial Services</span>
                    </div>
                </div>
            </div>
  )
}

export default QuotationHeader