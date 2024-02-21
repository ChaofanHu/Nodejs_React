import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Register = () => {
    const [input, setInput] = useState({
        username:"",
        email:"",
        password:""
    })

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
            const res = await axios.post("http://localhost:8080/api/auth/register", input);
            console.log(input);
            console.log(res);
            if(res.status === 200){
                alert("Register Successfully");
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 409) {
                alert("The username or email has already existed!");
            } else {
                alert("An error occurred during registration.");
            }
        }
        
    }

    return (
        <div className='auth'>
            <h1>Login</h1>
            <form>
                <input required type='text' placeholder='Username' name='username' onChange={handleChange}/> 
                <input required type='text' placeholder='Email' name='email' onChange={handleChange}/> 
                <input required type='password' placeholder='Password' name='password' onChange={handleChange} /> 
                <button onClick={handleSubmit}>Register</button>
                <span>Click Here to Login &nbsp;<Link to='/login'>Login</Link>
                </span>
            </form>
            
        </div>
      )
}

export default Register