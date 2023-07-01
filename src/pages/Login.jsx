import React, { useEffect, useRef, useState } from "react";
import './login.css';
import myImage from '../images/powelElssLogo.jpg';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../server";

function Login() {
  const navigate = useNavigate();
  const userRef = useRef();
  const [formValues, setFormValues] = useState({email:'',password:''});
  const [userFocus, setUserFocus] = useState(false);

  useEffect(()=>{
    userRef.current.focus();
  },[]);
  console.log(userFocus);

  function handleChange(e){
    setFormValues({...formValues, [e.target.name]:e.target.value})
  }
  
  async function handleLogin(e){
    e.preventDefault();
    const data = {email:formValues.email, password:formValues.password};
    await axios.post(`${server}/api/auth/login`, data)
    .then((res) => {
      localStorage.setItem("token", res.data.authorization)
      navigate("/HomePage");
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className="container">
        <div className='formContainer'>
        <div className="formWrapper">
            <img src={myImage} alt="" />
            <div className="form">    
                <span className="title">Log in to powel-elss</span>
                <form onSubmit={handleLogin}>
                  <input 
                    type="email" 
                    value={formValues.email} 
                    ref={userRef} 
                    name="email"
                    placeholder='Your email'  
                    autoComplete="off" 
                    onFocus={()=>setUserFocus(true)}
                    required 
                    onChange={handleChange}
                  />
                  <input 
                    type="password" 
                    value={formValues.password}
                    name="password" 
                    placeholder='password' 
                    autoComplete="off"
                    required 
                    onChange={handleChange}
                  />
                  <button>Sign in</button>
                </form> 
            </div>
        </div>
        </div>
    <div className="footer">
            <p>&copy;Powel-elss<sup>KE</sup>. Energy Efficiency Services</p>
        </div>
    </div>
    
  )
}

export default Login