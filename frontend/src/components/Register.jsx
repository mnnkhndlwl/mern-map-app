import React from 'react'
import "./register.css"
export default function Register() {
  return (
    <div className="registerContainer">
        <div className="logo"> </div>
        <form>
            <input type="text" placeholder='Enter username'/>
            <input type="email" placeholder='Enter Email'/>
            <input type="password" placeholder='Enter password'/>
            <button>Register</button>
        </form>
    </div>
  )
}
