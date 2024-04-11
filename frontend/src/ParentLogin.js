import React from 'react'

function Login() {
    return(
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <form action=''>
                    <div className='mb-3'>
                        <label htmlfor="username">Username</label>
                        <input type="username" placeholder="Username" className='form-control rounded-0'/>
                    </div>

                    <div className='mb-3'>
                        <label htmlfor="password">Password</label>
                        <input type="password" placeholder="Password" className='form-control rounded-0'/>
                    </div>

                    <button className='btn btn-success w-100'>Log in</button>
                    <p>Words that means something</p>
                    <button classname='btn btn-default border w-100 bg-light'>Create Account</button>
                </form>
            </div>
        </div>
    )
}

export default Login