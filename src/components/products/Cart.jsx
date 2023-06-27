// import { useState } from 'react'
import './Cart.css'
import axios from 'axios'

function Cart() {
    async function addToCart(e){
        e.preventDefault()
        await axios.get("http://localhost:5000/api/dashboard/add-to-cart/649a9ea4704eb1eb2c2def3b",{
            headers: {authorization: "jwt " + localStorage.getItem("token")}
          })
        .then((response)=>{
            console.log(response)
        })
    }
    async function viewCart(e){
        e.preventDefault()
        await axios.get("http://localhost:5000/api/dashboard/shopping-cart",{
            headers: {authorization: "jwt " + localStorage.getItem("token")}
          })
        .then((response)=>{
            console.log(response)
        })
    }

  return (
    <div>
        <button onClick={addToCart}>Add to cart</button>
        <button onClick={viewCart}>View cart</button>
    </div>
  )
}

export default Cart