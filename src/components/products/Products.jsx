import { useState, useEffect } from 'react'
import './Products.css'
import axios from 'axios'
import Sidebar from '../sidebar/sidebar'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react';

axios.defaults.withCredentials = true

function Products() {

  const [data, setData] = useState([])
  const [query, setQuery] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);
  useEffect(() => {
      axios.get("http://localhost:5000/api/dashboard/all-products",{
          headers: {authorization: "jwt " + sessionStorage.getItem("token")}
        })
      .then((response)=>{
          setData(response.data.products)
      })
},[]);
  
async function addToCart(e, id){
  e.preventDefault()
  await axios.get("http://localhost:5000/api/dashboard/add-to-cart/"+id,{
      headers: {authorization: "jwt " + sessionStorage.getItem("token")}
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
        <div className="allProductsHeading">  
          <h3>Products</h3>
          <Link to="/NewProduct">
            <button>Add new Product</button>
          </Link>
        </div>
        <div className="allProducts">
          <div className="searchBarStaff">
              <Icon icon="mdi:search" color="gray" width="20" />
              <input
                  className="search"
                  placeholder="Search..."
                  onChange={(e) => setQuery(e.target.value.toLowerCase())}
              />
          </div>
          <div className="recordsTableContainer">
                <table className="staffRecordsTable">
                    <thead className="staffTHead">
                        <tr>
                            <th>Id</th>
                            <th>Product name</th>
                            <th>Product category</th>
                            <th>Product description</th>
                            <th>Price</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="staffTBody">
                        {data.length ? data.filter((name)=>{
                          return query === '' ? name : name.name.toLowerCase().includes(query) || name.category.toLowerCase().includes(query);
                        })
                        .map((item,idx) => (
                        <tr key={item._id}>
                          <td>{idx}</td>
                          <td>{item.name}</td>
                          <td>{item.category}</td>
                          <td>{item.desc}</td>
                          <td>{item.price}</td>
                          <td>
                            <button onClick={(e) => addToCart(e,item._id)}>Add to cart</button>
                            { addedToCart && <Icon icon="mdi:success-circle" color="green" />}
                          </td>
                          <td className="clickable">  
                            <Link to={'/StaffRecords/delete/'+item._id}> <Icon icon="fluent-mdl2:delete" color="#d74221" width="24"/> </Link> 
                          </td>
                        </tr>
                    )) : null}
                    </tbody>
                </table>
          </div>
        </div> 
      </div>
    </div>
  )
}

export default Products