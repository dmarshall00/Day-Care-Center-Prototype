import axios from 'axios';
import React, {useEffect, useState} from 'react';

function ParentHome() {
    useEffect(() => {
        axios.get('/home')
        .then( res => {
            console.log(res);
        })
        .catch(error => {
            console.error(error);
        })
    })
    return(
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Parent Home</h2>
                
            </div>
        </div>
    );
}

export default ParentHome;