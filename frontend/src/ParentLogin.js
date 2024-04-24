import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './ValidationLogin';
import axios from 'axios';

function ParentLogin() {
    const [values, setValues] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState({})

    const handleInput = (event) =>{
        console.log([event.target.name] +": " + [event.target.values]);
        setValues(prev => ({...prev, [event.target.name]: [event.target.values]}))
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.username === "" && errors.password === ""){
            axios.post('http://localhost:3001/login', values)
            .then(res => {
                console.log("worked \n", values);
                console.log(res);
                if(res.data === "Success"){
                    console.log("Login Worked");
                    navigate('/home');
                }
                else{
                    alert("No records");
                }
            })
            .catch(err => console.log(err));
        }
    }

    return(
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Parent Log in</h2>
                <form action='' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="username"><strong>Username</strong></label>
                        <input type="username" placeholder="Username" name='username'
                        id='username' onChange={handleInput} className='form-control rounded-0'/>
                        {errors.username && <span className='text-danger'> {errors.username}</span>}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder="Password" name='password'
                        id='password' onChange={handleInput} className='form-control rounded-0'/>
                        {errors.password && <span className='text-danger'> {errors.password}</span>}
                    </div>

                    <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Log in</strong></button>
                    <p>Words that means something</p>
                    <Link to="/signup" className='btn btn-default border w-100 bg-light'><strong>Create Account</strong></Link>
                </form>
            </div>
        </div>
    );
}

export default ParentLogin;