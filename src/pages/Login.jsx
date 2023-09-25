import React, { useEffect, useRef, useState} from "react";
import './login.css';
import myImage from '../images/powelElssLogo.jpg';
import axios from "axios";
import { server } from "../server";
import { useAuthContext} from "../context/AuthProvider";
import { CircularProgress } from "@mui/material";
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";

function Login() {
  const userRef = useRef();
  const errRef = useRef();
  const [formValues, setFormValues] = useState({email:'',password:''});
  const [, setUserFocus] = useState(false);
  const[errMsg, setErrMsg] = useState(''); 
  const[passwordType, setPasswordType] = useState(true); 
  const {setToken, setLoading, setUser, authenticated, loading} = useAuthContext();
  const navigate = useNavigate();

  useEffect(()=>{
    userRef.current.focus();
  },[]);
  useEffect(()=>{
    setErrMsg('');
  },[formValues])
  useEffect(()=>{
    if(authenticated){
      navigate('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  

  function handleChange(e){
    setFormValues({...formValues, [e.target.name]:e.target.value})
  }
  function showPassword(e){
    e.preventDefault()
    setPasswordType((prev)=>!prev)
  }
  async function handleLogin(e){
    e.preventDefault();
    setLoading(true)
    const data = {email:formValues.email, password:formValues.password};
    await axios.post(`${server}/api/auth/login`, data)
    .then((res) => {
      setToken(res.data.authorization)
      setUser(res.data.user)
      setFormValues({email:'',password:''})
      // navigate("/");
      window.location.href = "/"
    })
    .catch((err) => {
      if(err.response?.status === 403){
          setErrMsg('Wrong email or password')
      }else{
        setErrMsg('Login failed. Try again!')
      }
    }) 
    .finally(() => {
      setLoading(false);
    });
    setTimeout(() => {
      setErrMsg("")
      setFormValues({email:'',password:''})
    }, 3000);

  }

  return (
    <div className="loginContainer">
        <div className='formContainer'>
          <div className="formWrapper">
              <img src={myImage} alt="logo" />
              <div className="form">    
                  <span className="title">Log in to powel-elss</span>
                  {errMsg &&<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}> <Icon icon="clarity:error-solid" color="red" width="22" /> {errMsg}</p>}
                  <form onSubmit={handleLogin}>
                    <div className="inputBox">
                      <input 
                        type="email" 
                        value={formValues.email} 
                        ref={userRef} 
                        name="email"
                        autoComplete="off" 
                        onFocus={()=>setUserFocus(true)}
                        required 
                        onChange={handleChange}
                      />
                      <span className="placeHolder">Email</span>
                    </div>
                    <div className="passwordWrapper">
                      <div className="inputBox">
                        <input 
                          type={passwordType ? 'password' : 'text'} 
                          value={formValues.password}
                          name="password" 
                          required 
                          onChange={handleChange}
                        />
                        <span className="placeHolder">Password</span>
                      </div>
                      <div className="passIcon">
                      {passwordType ?
                       <Icon icon="basil:eye-closed-outline" width="28" color="rgb(109, 109, 109)" onClick={showPassword}/>
                      : <Icon icon="basil:eye-outline" width="28" color="rgb(109, 109, 109)" onClick={showPassword}/>}
                      </div>
                    </div>
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