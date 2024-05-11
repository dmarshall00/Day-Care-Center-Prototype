import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from 'react';

function AdminHome() {
    const [name, setName] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3030/ahome')
        .then( res => {
            console.log(res.data);
            if(res.data.valid)
            {
                console.log(res.data.username);
                setName(res.data.username);
            }
            else
            {
                navigate('/login');
            }
        })
        .catch(error => {
            console.error(error);
        }, [])
    })

    return(
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Welcome {name}</h2>
                
            </div>
        </div>
    );
}

export default AdminHome;