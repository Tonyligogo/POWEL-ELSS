import { Link } from 'react-router-dom'
import Sidebar from '../sidebar/sidebar'
import './Cart.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
axios.defaults.withCredentials = true

function Cart() {
   const [data, setData] = useState([])
   const [error, setError] = useState(false)
   useEffect(() => {
      fetchCart()
},[]);

  async function fetchCart(){

    await axios.get("http://localhost:5000/api/dashboard/shopping-cart",{
            headers: {authorization: "jwt " + localStorage.getItem("token")}
          })
        .then((response)=>{
            setData(response.data.products)
        }).catch((error)=>{
          if(error.response.status){
            setError(true)
          }
        })
  }
  function refresh(e){
    e.preventDefault()
    fetchCart()
  }

  return (
    <div className='home'>
      <Sidebar/>
      <div className="homeContainer">
        <div className="productListHeading">  
          <h3>Cart</h3>
            <div className="btns">
              <button onClick={refresh}>Refresh</button>
              <Link to="/Checkout">
                <button>Checkout</button>
              </Link>
            </div>
        </div>
        <div className="productList">
          <div className='productsWrapper'>
            {data && 
              data.map((item) => (
                <div key={item.item._id} className='product'>
                  <p className='name'>Product name: <span>{item.item.name}</span></p>
                  <p className='category'>Product category: <span>{item.item.category}</span></p>
                  <p className='desc'>Product description: <span>{item.item.desc}</span></p>
                  <p className='desc'>Product quantity: <span>{item.qty}</span></p>
                  <p className='price'>Price: <span>{item.price}</span></p>
                </div>
              ))
            }
            {error && 
              <div>
                <p>No cart</p>
                <Link to="/Products"> <button>Go to Products</button> </Link>
              </div> 
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart