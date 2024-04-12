import React from 'react'
import { Link } from 'react-router-dom';

function ParentLogin() {
    return(
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Parent Log in</h2>
                <form action=''>
                    <div className='mb-3'>
                        <label htmlFor="username"><strong>Username</strong></label>
                        <input type="username" placeholder="Username" className='form-control rounded-0'/>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder="Password" className='form-control rounded-0'/>
                    </div>

                    <button className='btn btn-success w-100 rounded-0'><strong>Log in</strong></button>
                    <p>Words that means something</p>
                    <Link to="/signup" className='btn btn-default border w-100 bg-light'><strong>Create Account</strong></Link>
                </form>
            </div>
        </div>
    );
}

export default ParentLogin;