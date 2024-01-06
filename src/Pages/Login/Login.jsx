import React, {useState} from 'react';
import './Login.css';
import { FaGoogle } from "react-icons/fa";
import { auth } from "../../firebase/config";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
   
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        navigate("/todos");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <div className="Signup">

      <form className="signup-form" onSubmit={(e) => {login(e)}}>

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
