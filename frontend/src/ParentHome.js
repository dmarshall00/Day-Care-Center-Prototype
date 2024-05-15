import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from 'react';

function ParentHome() {
    var showForm = true;

    const navigate = useNavigate();

    //ParentInfo
    const [username, setUserName] = useState('');
    // const [Fname, setFName] = useState('');
    // const [Lname, setLName] = useState('');
    // const [Pnum, setNum] = useState('');
    // const [Email, setEmail] = useState('');
    // const [Address, setAddy] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3030/home')
        .then( res => {
            console.log(res.data);
            if(res.data.valid)
            {
                console.log(res.data.username);
                setUserName(res.data.username);
                // setFName(res.data.Fname);
                // setLName(res.data.Lname);
                // setNum(res.data.Pnum);
                // setEmail(res.data.Email);
                // setAddy(res.data.Address);
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

    const ShowForm = async (event)=>{
        showForm = !showForm;
        console.log("Show: " + showForm);
    }

    //ParentInfo

    const [parentvalues, setparentValues] = useState({
        Fname: '',
        Lname: '',
        Pnum: '',
        Email: '',
        Address: ''
    });

    const handleInputProfile = (event) =>{
        event.preventDefault();
        //console.log([event.target.name] +": " + [event.target.value]);
        setparentValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
    }

    const handleSubmitProfile = async (event) =>{
        //event.preventDefault();
        console.log(parentvalues);
        axios.post('http://localhost:3030/fillp', parentvalues)
        .then({

        })
        .catch((error) => {
            console.error(error);
        })
    }

    //ChildrenInfo
    //const han

    return(
        <div className='d-flex justify-content-center align-items-start bg-primary vh-100'>

            {/* <div className='bg-white justify-content-center p-3 rounded w-25'>
                <h2>Profile</h2>
                <table style={{border:'1px solid black', justifyContent: 'center'}}>
                    <tr>
                        <th style={{border:'1px solid black'}}><strong>Categories</strong></th>
                        <th style={{border:'1px solid black'}}><strong>Information</strong></th>
                    </tr>
                    <tr>
                        <td style={{border:'1px solid black'}}><strong>UserName</strong></td>
                        <td style={{border:'1px solid black'}}>{username}</td>
                    </tr>
                    <tr>
                        <td style={{border:'1px solid black'}}><strong>First Name</strong></td>
                        <td style={{border:'1px solid black'}}>{Fname}</td>
                    </tr>
                    <tr>
                        <td style={{border:'1px solid black'}}><strong>Last Name</strong></td>
                        <td style={{border:'1px solid black'}}>{Lname}</td>
                    </tr>
                    <tr>
                        <td style={{border:'1px solid black'}}><strong>Phone Number</strong></td>
                        <td style={{border:'1px solid black'}}>{Pnum}</td>
                    </tr>
                    <tr>
                        <td style={{border:'1px solid black'}}><strong>Email</strong></td>
                        <td style={{border:'1px solid black'}}>{Email}</td>
                    </tr>
                    <tr>
                        <td style={{border:'1px solid black'}}><strong>Address</strong></td>
                        <td style={{border:'1px solid black'}}>{Address}</td>
                    </tr>
                </table>

                <div>
                    <button className='btn btn-default border w-100 bg-light' onClick={ShowForm}>Change Profile?</button>
                    {(showForm === true) ? form(ShowForm, handleInputProfile, handleSubmitProfile) : null}
                </div>

            </div> */}

            <div className='bg-white p-3 rounded w-25'>
                <h2>Welcome {username}</h2>
            </div>

            <div className='bg-white p-3 rounded w-25'>
                <h2>Children</h2>
            </div>

        </div>
    );
}

function form(ShowForm, handleInput, handleSubmit)
{
   return (
        <div >
            <form action='' onSubmit={handleSubmit}>
                {/* <div className='mb-3'>
                    <label htmlFor="username"><strong>Username</strong></label>
                    <input 
                        type="username" 
                        placeholder="Username" 
                        name='username'
                        id='username' 
                        onChange={handleInput} 
                        className='form-control rounded-0'
                    />
                </div> */}

                <div className='mb-3'>
                    <label htmlFor="Fname"><strong>First Name</strong></label>
                    <input 
                        type="name" 
                        placeholder="First Name" 
                        name='Fname'
                        id='Fname' 
                        onChange={handleInput} 
                        className='form-control rounded-0'
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor="Lname"><strong>Last Name</strong></label>
                    <input 
                        type="name" 
                        placeholder="Last Name" 
                        name='Lname'
                        id='Lname' 
                        onChange={handleInput} 
                        className='form-control rounded-0'
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor="Pnum"><strong>Phone Number</strong></label>
                    <input 
                        type="Phone number" 
                        placeholder="Phone Number" 
                        name='Pnum'
                        id='Pnum' 
                        onChange={handleInput} 
                        className='form-control rounded-0'
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor="Email"><strong>Email</strong></label>
                    <input 
                        type="Email" 
                        placeholder="Email" 
                        name='Email'
                        id='Email' 
                        onChange={handleInput} 
                        className='form-control rounded-0'
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor="Address"><strong>Address</strong></label>
                    <input 
                        type="Address" 
                        placeholder="Address" 
                        name='Address'
                        id='Address' 
                        onChange={handleInput} 
                        className='form-control rounded-0'
                    />
                </div>

                <button type='submit' className='btn btn-success w-100 rounded-0' ><strong>Change it</strong></button>
                <p></p>
                <button onClick={ShowForm} className='btn btn-default border w-100 bg-light' ><strong>Cancel</strong></button>
            </form>
        </div>
    )
}

// function ChildPart(){
//     return(
//         <div>
//             <h3>Your Children in the system: {}</h3>
//         </div>
//     );
// }

export default ParentHome;