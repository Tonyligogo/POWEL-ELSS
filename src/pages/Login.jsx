import React, { useEffect, useRef, useState, useContext} from "react";
import AuthContext from "../context/AuthProvider";
import './login.css';
import myImage from '../images/powelElssLogo.jpg';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../server";

function Login() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const [formValues, setFormValues] = useState({email:'',password:''});
  const [userFocus, setUserFocus] = useState(false);
  const[errMsg, setErrMsg] = useState('') 

  useEffect(()=>{
    userRef.current.focus();
  },[]);
  console.log(userFocus);

  useEffect(()=>{
    setErrMsg('');
  },[formValues])

  function handleChange(e){
    setFormValues({...formValues, [e.target.name]:e.target.value})
  }
  
  async function handleLogin(e){
    e.preventDefault();
    const data = {email:formValues.email, password:formValues.password};
    await axios.post(`${server}/api/auth/login`, data)
    .then((res) => {
      localStorage.setItem("token", res.data.authorization)
      const token = res.data.authorization
      setAuth({formValues, token})
      setFormValues({email:'',password:''})
      navigate("/");
    })
    .catch((err) => {
      if(err.response?.status === 403){
        setErrMsg('Wrong email or password')
        console.log(errMsg)
      }else{
        setErrMsg('Login failed')
      }
    });
  }
  console.log('this is logged', errMsg)

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
                    <button>Sign In</button>
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