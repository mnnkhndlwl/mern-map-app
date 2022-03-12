import { Room } from '@material-ui/icons'
import React, { useRef } from 'react'
import { useState } from 'react';
import "./register.css"
import axios from 'axios';
import { Cancel } from '@material-ui/icons';

export default function Register({setShowRegister}) {

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      await axios.post("/users/register", newUser);
      setError(false);
      setSuccess(true);
    } catch (error) {
      setError(true);
    }
  }

  return (
    <div className="registerContainer">
        <div className="logo"> 
        <Room />
        Map
        </div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Enter username' ref={usernameRef}/>
            <input type="email" placeholder='Enter Email'ref={emailRef}/>
            <input type="password" placeholder='Enter password' ref={passwordRef}/>
            <button className='registerBtn'>Register</button>
            {success && ( 
            <span className="success">Successful ! You can login now</span>
            )}
            {error && ( 
            <span className="failure">Something went wrong ! </span>
            )}
             
        </form>
        <Cancel
        className="registerCancel"
        onClick={() => setShowRegister(false)}
      /> 
    </div>
  )
}
