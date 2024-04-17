import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Validation from './ValidationSignup';
import axios from 'axios'

// let axiosConfig = {
//     headers: {
//         'Content-Type' : 'application/json; charset=UTF-8',
//         'Accept': 'Token',
//         "Access-Control-Allow-Origin": "*",
  
//     }
//   };

function ParentSignup() {
    const [values, setValues] = useState({
        email: '',
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState({})

    const handleInput = (event) =>{
        console.log([event.target.name] +": " + [event.target.values]);
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    const handleSubmit = (event) =>{
        // const emailinput = document.getElementById("email");
        // const userinput = document.getElementById('username');
        // const passwordinput = document.getElementById('password');
        // const emailv = emailinput.value;
        // const usernamev = userinput.value;
        // const passwordv = passwordinput.value;

        // setValues(prev => ({...prev, "email": emailv}));
        // setValues(prev => ({...prev, "username": usernamev}));
        // setValues(prev => ({...prev, "empasswordail": passwordv}));

        event.preventDefault();
        setErrors(Validation(values));
        if(errors.username === "" && errors.email === "" && errors.password === ""){
            axios.post('http://localhost:3001/signup', values)
            .then(res => {
                console.log("worked \n", values);
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
        }
    }

    return(
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Parent Sign In</h2>
                <form action='' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder="Email" name='email'
                        id='email' onChange={handleInput} className='form-control rounded-0'/>
                        {errors.email && <span className='text-danger'> {errors.email}</span>}
                    </div>

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

                    <button className='btn btn-success w-100 rounded-0'><strong>Sign up</strong></button>
                    <p>Words that means something else</p>
                    <Link to="/" className='btn btn-default border w-100 bg-light'><strong>Log in</strong></Link>
                </form>
            </div>
        </div>
    );
}

export default ParentSignup;