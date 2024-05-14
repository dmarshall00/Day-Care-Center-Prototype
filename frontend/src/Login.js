import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Validation, CheckValidation} from './ValidationLogin';
import axios from 'axios';

function ParentLogin() {
    const [values, setValues] = useState({
        username: '',
        password: '',
        User:''
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleInput = (event) =>{
        //console.log([event.target.name] +": " + [event.target.value]);
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
    }

    axios.defaults.withCredentials = true;

    const handleSubmit = async (event) =>{
        event.preventDefault();
        setErrors(Validation(values));
        if(CheckValidation(errors)){
            console.log(values);
            axios.post('http://localhost:3030/login', values)
            .then(res => {
                if(res.data.Login){
                    console.log("Login Worked");
                    switch(values.User[0])
                    {
                        case 'Parent':
                            navigate('/phome');
                            break;
                        case 'Faculty':
                            navigate('/fhome');
                            break;
                        case 'Admin':
                            navigate('/ahome');
                            break;
                    }
                    
                }
                else{
                    alert("No records");
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
    }

    return(
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Log in</h2>
                <form action='' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="username"><strong>Username</strong></label>
                        <input 
                            type="username" 
                            placeholder="Username" 
                            name='username'
                            id='username' 
                            onChange={handleInput} 
                            className='form-control rounded-0'
                            //value={values.user}
                        />
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
                            className='form-control rounded-0'
                            //value={values.pwd}
                        />
                        {errors.password && <span className='text-danger'> {errors.password}</span>}
                    </div>

                    <div className='mb-3'>
                        <select name="User" id="User" onChange={handleInput}>
                            <option value="">-- Select User</option>
                            <option value="Parent">Parent</option>
                            <option value="Faculty">Faculty</option>
                            <option value="Admin">Admin</option>
                        </select>
                        {errors.User && <span className='text-danger'> {errors.User}</span>}
                    </div>

                    <button 
                        type='submit' 
                        className='btn btn-success w-100 rounded-0'
                    >
                        <strong>Log in</strong>
                    </button>
                    <p>Words that means something</p>
                    <Link to="/signup" className='btn btn-default border w-100 bg-light'><strong>Create Account</strong></Link>
                </form>
            </div>
        </div>
    );
}

export default ParentLogin;