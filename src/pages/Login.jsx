import React, { useEffect, useRef, useState} from "react";
import './login.css';
import axios from "axios";
import { server } from "../server";
import { useAuthContext} from "../context/AuthProvider";
import { CircularProgress } from "@mui/material";
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const [formValues, setFormValues] = useState({email:'',password:''});
  const [, setUserFocus] = useState(false);
  const[passwordType, setPasswordType] = useState(true); 
  const {setToken, setLoading, setUser, authenticated, loading} = useAuthContext();
  const navigate = useNavigate();

  useEffect(()=>{
    userRef.current.focus();
  },[]);
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
          toast.error('Wrong email or password', {
            id: 'error',
        })
      }else{
        toast.error('Login failed. Try again!', {
          id: 'error',
      })
      }
    }) 
    .finally(() => {
      setLoading(false);
    });
  }

  return (
    <div className="loginPage">
      <div className="form">    
                  <h2 className="title">Sign in to powel-elss</h2>
                  <span className="google"> <img className="googleLogo" src="https://freelogopng.com/images/all_img/1657955079google-icon-png.png" alt="google logo" /> Sign in with Google</span>
                  <p className="line"> <small>or sign in with email</small> </p>
                  <form onSubmit={handleLogin}>
                    <div className="inputBox">
                      <label htmlFor="email">Email</label>
                      <input 
                        className="input"
                        id="email"
                        type="email" 
                        value={formValues.email} 
                        ref={userRef} 
                        name="email"
                        autoComplete="off" 
                        onFocus={()=>setUserFocus(true)}
                        required 
                        onChange={handleChange}
                      />
                    </div>
                      <div className="inputBox">
                        <div className="passIcon">
                        <label htmlFor="password">Password</label>
                        {passwordType ?
                        <Icon icon="basil:eye-closed-outline" width="28" color="rgb(109, 109, 109)" onClick={showPassword}/>
                        : <Icon icon="basil:eye-outline" width="28" color="rgb(109, 109, 109)" onClick={showPassword}/>}
                        </div>
                        <input 
                          className="input"
                          id="password"
                          type={passwordType ? 'password' : 'text'} 
                          value={formValues.password}
                          name="password" 
                          required 
                          onChange={handleChange}
                          ref={passwordRef}
                        />
                      </div>
                    {loading ? <button className="signIn"><CircularProgress size="14px" className="progress"/>Signing in...</button>
                    :<button className="signIn">Sign in</button>}
                  </form> 
              </div>
    </div>
    
  )
}

export default Login