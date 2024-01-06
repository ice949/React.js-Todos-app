import React, {useState} from 'react';
import './Login.css';
import { FaGoogle } from "react-icons/fa";

const Login = () => {
    
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
  return (
    <div className="Signup">

      <form className="signup-form">

        <h2>SIGN IN</h2>

        <button type='button' className='plain-btn'>
            <FaGoogle />
            LOGIN WITH GOOGLE
        </button>

        <div className="divider">
            <hr />
            <span>OR</span>
            <hr />
        </div>

        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit" className="btn">LOGIN</button>

        <p>Already have an account? <a href="/">Register</a></p>

      </form>

    </div>
  );
}

export default Login;
