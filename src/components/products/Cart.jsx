import { Link, useLocation } from 'react-router-dom'
import Sidebar from '../sidebar/sidebar'
import './Cart.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
axios.defaults.withCredentials = true

function Cart() {
   const [data, setData] = useState([])
   const [error, setError] = useState(false)
   const location = useLocation();
  const path = location.state.path;
   useEffect(() => {
      fetchCart()
  },[]);

  async function fetchCart(){

    await axios.get("http://localhost:5000/api/dashboard/shopping-cart",{
            headers: {authorization: "jwt " + sessionStorage.getItem("token")}
          })
        .then((response)=>{
            setData(response.data.products)
        }).catch((error)=>{
          if(error.response.status){
            setError(true)
          }
        })
  }

  return (
    <div className='home'>
      <Sidebar/>
      <div className="homeContainer">
        <div className="allProductsHeading">  
          <h3>Cart</h3>
              <Link to={path === 'quotation' ? "/Quotation": "/Checkout"}>
                <button>{path === 'quotation' ? 'Quotation': 'Checkout'}</button>
              </Link>
        </div>
          <div className='allProducts'>
          {data ? 
            <div className="recordsTableContainer">
                <table className="staffRecordsTable">
                    <thead className="staffTHead">
                        <tr>
                            <th>Id</th>
                            <th>Product name</th>
                            <th>Product category</th>
                            <th>Product description</th>
                            <th>Product quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody className="staffTBody">
                        
                        {data.map((item,idx) => (
                        <tr key={item.item._id}>
                          <td>{idx}</td>
                          <td>{item.item.name}</td>
                          <td>{item.item.category}</td>
                          <td>{item.item.desc}</td>
                          <td className='qtyControl'>
                            {item.qty}
                            <span className='qtyButtons'>
                              +-
                            </span>
                          </td>
                          <td>{item.price}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div> : null}

            {error && 
              <div>
                <p>No cart</p>
                <Link to="/Products"> <button>Go to Products</button> </Link>
              </div> 
            }
          </div>
        </div>
      </div>
  )
}

export default Cart