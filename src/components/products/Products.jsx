import { useState, useEffect } from 'react'
import './Products.css'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react';
import { ThreeDots } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { CircularProgress } from "@mui/material";
import toast from 'react-hot-toast';

axios.defaults.withCredentials = true

function Products() {

  const location = useLocation();
  const path = location.state?.path;
  const [query, setQuery] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rowId, setRowId] = useState('');

  const products = ()=>{
    return axios.get("http://localhost:5000/api/dashboard/all-products",
    {
      headers: {authorization: "jwt " + sessionStorage.getItem("token")}
    }) 
  }
  const {isLoading, data} =useQuery('products',products)
  
async function addToCart(e, id, idx){
  e.preventDefault()
  setLoading(true)
  setRowId(idx)
  await axios.get("http://localhost:5000/api/dashboard/add-to-cart/"+id,{
      headers: {authorization: "jwt " + sessionStorage.getItem("token")}
    })
  .then((response)=>{
      setAddedToCart(true)
  })
  .finally(()=>{
    setLoading(false)
    setRowId('')
})
  setTimeout(() => {
    setAddedToCart(false);
  }, 2000);
}
useEffect(()=>{
  if(addedToCart){
    toast.success('Added to cart successfully', {
        id:'addedToCart'
    })
  }
},[addedToCart])
  return (
    <div>
      <div className="productContainer">
        <div className="allProductsHeading">  
          <h3>Products</h3>
          <div className="myLinks">
          <div className="searchBarStaff">
                <Icon icon="mdi:search" color="gray" width="20" />
                <input
                    className="search"
                    placeholder="Search..."
                    onChange={(e) => setQuery(e.target.value.toLowerCase())}
                />
            </div>
            <Link to="/NewProduct">
              <button>Add new Product</button>
            </Link>
            <Link to= '/Cart' state={{path}}>
              <button>View Cart</button>
            </Link>
          </div>
        </div>
        {isLoading ? 
            <div className="loader">
              <ThreeDots 
              height="80" 
              width="80" 
              radius="9"
              color="#d74221" 
              ariaLabel="three-dots-loading"
              visible={true}
              />
            </div>
            : 
        <div className="allProducts">
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
                        {data?.data?.products?.length ? data?.data?.products?.filter((name)=>{
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
                            {loading && rowId === idx? 
                              <button><CircularProgress size="14px" className="progress"/>Adding...</button> 
                            :
                              <button onClick={(e) => addToCart(e,item._id, idx)}>Add to cart</button>}
                          </td>
                          <td className="clickable">  
                            <Link to={'/StaffRecords/delete/'+item._id}> <Icon icon="fluent-mdl2:delete" color="#d74221" width="24"/> </Link> 
                          </td>
                        </tr>
                    )) : null}
                    </tbody>
                </table>
          </div>
        </div> }
      </div>
    </div>
  )
}

export default Products