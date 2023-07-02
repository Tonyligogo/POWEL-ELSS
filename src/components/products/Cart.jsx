// import { useState } from 'react'
import './Cart.css'
import axios from 'axios'

function Cart() {
    
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
        <button onClick={viewCart}>View cart</button>
    </div>
  )
}

export default Cart