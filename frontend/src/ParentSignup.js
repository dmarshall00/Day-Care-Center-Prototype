import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Validation from './ValidationSignup';
import axios from 'axios';

function ParentSignup() {
    const [values, setValues] = useState({
        email: '',
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState({})

    const handleInput = (event) =>{
        //console.log([event.target.name] +": " + [event.target.value]);
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
    }

    const handleSubmit = (event) =>{
        // var working = true;
        event.preventDefault();
        setErrors(Validation(values));
        console.log(values);
        if(errors.username === "" && errors.email === "" && errors.password === ""){
            axios.post('http://localhost:3030/signup', values)
            .then((res) => {
                if(res.data.Registration){
                    console.log("Registered in:\n", values);
                    navigate('/');
                }
                else{
                    console.log("Already in the system:\n", values);
                }
            })
            .catch(err => {
                console.log("Something went wrong but it moved on");
                console.log(err);
            });
            
        }
    }

    return(
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Parent Sign In</h2>
                <form action='' onSubmit={handleSubmit} method='post'>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            name='email'
                            id='email' 
                            onChange={handleInput} 
                            className='form-control rounded-0'/>
                        {errors.email && <span className='text-danger'> {errors.email}</span>}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="username"><strong>Username</strong></label>
                        <input 
                            type="username" 
                            placeholder="Username" 
                            name='username'
                            id='username' 
                            onChange={handleInput} 
                            className='form-control rounded-0'/>
                        {errors.username && <span className='text-danger'> {errors.username}</span>}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            name='password'
                            id='password' 
                            onChange={handleInput} 
                            className='form-control rounded-0'/>
                        {errors.password && <span className='text-danger'> {errors.password}</span>}
                    </div>

                    <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Sign up</strong></button>
                    <p>Words that means something else</p>
                    <Link to="/" className='btn btn-default border w-100 bg-light'><strong>Log in</strong></Link>
                </form>
            </div>
        </div>
    );
}

export default ParentSignup;