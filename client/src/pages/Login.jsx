import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import Register from './Register'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/authVerification'

const Login = () => {
  //navigate to gome
  const navigate = useNavigate()

  const [input, setInput] = useState({
    username:"",
    email:"",
    password:""
  })
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
      setInput((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
      }))
      
  }

  const handleSubmit = async (e) => {
      //for prevent fresh page after click button
      e.preventDefault()
      try {
          await login(input)
          navigate("/");
      } catch (error) {
          console.error(error);
          if (error.response && error.response.status === 404) {
              alert("The username or email is wrong!");
          } else {
              alert("An error occurred during login.");
          }
      }
      
  }


  return (
    <div className='auth'>
        <h1>Login</h1>
        <form>
            <input required type='text' placeholder='Username' name='username' onChange={handleChange}/> 
            <input required type='password' placeholder='Password' name='password' onChange={handleChange} /> 
            <button onClick={handleSubmit}>Login</button>
            <span>Don't have an account? <Link to='/register'>Register</Link>
            </span>
        </form>
        
    </div>
  )
}

export default Login