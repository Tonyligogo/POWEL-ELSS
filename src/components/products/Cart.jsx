// import { useState } from 'react'
import './Cart.css'
import axios from 'axios'

function Cart() {
    async function addToCart(e){
        e.preventDefault()
        await axios.get("http://localhost:5000/api/dashboard/add-to-cart/649e8aa476705c410b85b133",{
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