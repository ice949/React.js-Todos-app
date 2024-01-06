import React, { useState } from 'react';
import './Signup.css';
import { FaGoogle } from "react-icons/fa";

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="Signup">

      <form className="signup-form">

        <h2>Create An Account</h2>

        <button type='button' className='plain-btn'>
            <FaGoogle />
            SIGNUP WITH GOOGLE
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

        <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>

        <button type="submit" className="btn">SIGNUP</button>

        <p>Already have an account? <a href="/login">Login</a></p>

      </form>

    </div>
  );
}

export default Signup;
