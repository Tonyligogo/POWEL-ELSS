import React from "react";
import './login.css';
import myImage from '../images/powelElssLogo.jpg';

function Login() {
  // const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <div className="container">
        <div className='formContainer'>
        <div className="formWrapper">
            <img src={myImage} alt="" />
            <div className="form">    
                <span className="title">Log in to powel-elss</span>
                <form>
                  <input type="email" value={email} placeholder='Your email' required onChange={(e)=>setEmail(e.target.value)}/>
                  <input type="password" value={password} placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
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