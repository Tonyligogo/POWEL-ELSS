import { useState, useEffect } from 'react'
import './Products.css'
import axios from 'axios'
import Sidebar from '../sidebar/sidebar'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react';
axios.defaults.withCredentials = true

function Products() {

  const [data, setData] = useState([])
  const [addedToCart, setAddedToCart] = useState(false);
  useEffect(() => {
      axios.get("http://localhost:5000/api/dashboard/all-products",{
          headers: {authorization: "jwt " + localStorage.getItem("token")}
        })
      .then((response)=>{
          setData(response.data.products)
      })
},[]);
  
async function addToCart(e, id){
  e.preventDefault()
  await axios.get("http://localhost:5000/api/dashboard/add-to-cart/"+id,{
      headers: {authorization: "jwt " + localStorage.getItem("token")}
    })
  .then((response)=>{
      setAddedToCart(true)
  })
  setTimeout(() => {
    setAddedToCart(false);
  }, 2000);
}

  return (
    <div className='home'>
      <Sidebar/>
      <div className="homeContainer productContainer">
        <div className="productListHeading">  
          <h3>Products</h3>
          <Link to="/NewProduct">
            <button>Add new Product</button>
          </Link>
        </div>
        <div className="productList">
          <div className='productsWrapper'>
            {data && 
              data.map((item) => (
                <div key={item._id} className='product'>
                  <p className='name'>Product name: <span>{item.name}</span></p>
                  <p className='category'>Product category: <span>{item.category}</span></p>
                  <p className='desc'>Product description: <span>{item.desc}</span></p>
                  <p className='price'>Price: <span>{item.price}</span></p>
                  { addedToCart && <p className='successMessage'> <Icon icon="mdi:success-circle" color="green" /></p>}
                  <button onClick={(e) => addToCart(e,item._id)}>Add to cart</button>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products