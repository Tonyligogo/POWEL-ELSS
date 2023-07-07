import React, { useEffect, useRef, useState} from "react";
import './login.css';
import myImage from '../images/powelElssLogo.jpg';
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { server } from "../server";
import { useAuthContext} from "../context/AuthProvider";
import { CircularProgress } from "@mui/material";

function Login() {
  // const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const [formValues, setFormValues] = useState({email:'',password:''});
  const [, setUserFocus] = useState(false);
  const[errMsg, setErrMsg] = useState('') 

  useEffect(()=>{
    userRef.current.focus();
  },[]);

  useEffect(()=>{
    setErrMsg('');
  },[formValues])

  function handleChange(e){
    setFormValues({...formValues, [e.target.name]:e.target.value})
  }
  const {setToken, setLoading, loading} = useAuthContext();
  async function handleLogin(e){
    e.preventDefault();
    setLoading(true)
    const data = {email:formValues.email, password:formValues.password};
    await axios.post(`${server}/api/auth/login`, data)
    .then((res) => {
      setToken(res.data.authorization)
      setFormValues({email:'',password:''})
      setLoading(false)
      // navigate("/");
      window.location.href = "/"
    })
    .catch((err) => {
      if(err.response?.status === 403){
        setErrMsg('Wrong email or password')
        console.log(errMsg)
      }else{
        setErrMsg('Login failed')
      }
    }) 
    .finally(() => {
      setLoading(false);
    });

  }

  return (
    <div className="loginContainer">
        <div className='formContainer'>
          <div className="formWrapper">
              <img src={myImage} alt="logo" />
              <div className="form">    
                  <span className="title">Log in to powel-elss</span>
                  <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
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
                      required 
                      onChange={handleChange}
                    />
                    {loading ? <CircularProgress size="24px" className="progress"/>
                    :<button>Sign in</button>}
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