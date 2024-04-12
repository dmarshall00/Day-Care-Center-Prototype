import React from 'react'
import { Link } from 'react-router-dom';

function ParentSignup() {
    return(
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Parent Sign In</h2>
                <form action=''>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder="Email" className='form-control rounded-0'/>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="username"><strong>Username</strong></label>
                        <input type="username" placeholder="Username" className='form-control rounded-0'/>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder="Password" className='form-control rounded-0'/>
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