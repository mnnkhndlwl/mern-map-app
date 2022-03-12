import { Room } from '@material-ui/icons'
import React, { useRef } from 'react'
import { useState } from 'react';
import "./login.css"
import axios from 'axios';
import { Cancel } from '@material-ui/icons';

export default function Login({setShowLogin}) {

  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const newUser = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      await axios.post("/users/register", newUser);
      setError(false); 
    } catch (error) {
      setError(true);
    }
  }

  return (
    <div className="loginContainer">
        <div className="logo"> 
        <Room />
        Map
        </div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Enter username' ref={usernameRef}/>
            <input type="password" placeholder='Enter password' ref={passwordRef}/>
            <button className='loginBtn'>Login</button>
            {error && ( 
            <span className="failure">Something went wrong ! </span>
            )}
             
        </form>
        <Cancel
        className="loginCancel"
        onClick={() => setShowLogin(false)}
      /> 
    </div>
  )
}
