import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './ValidationLogin';
import axios from 'axios';

function ParentLogin() {
    const [values, setValues] = useState({
        user: '',
        pwd: ''
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleInput = (event) =>{
        //console.log([event.target.name] +": " + [event.target.value]);
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        console.log(values);
        setErrors(Validation(values));
        if(errors.username === "" && errors.password === ""){
            //console.log(values);
            axios.post('http://localhost:3030/login', values)
            .then(res => {
                console.log(res);
                if(res.data.Login){
                    console.log("Login Worked");
                    navigate('/home');
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
                <h2>Parent Log in</h2>
                <form action='' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="username"><strong>Username</strong></label>
                        <input 
                            type="username" 
                            placeholder="Username" 
                            name='user'
                            id='user' 
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
                            name='pwd'
                            id='pwd' 
                            onChange={handleInput} 
                            className='form-control rounded-0'
                            //value={values.pwd}
                        />
                        {errors.password && <span className='text-danger'> {errors.password}</span>}
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