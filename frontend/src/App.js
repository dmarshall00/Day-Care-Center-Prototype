import React from 'react'
import ParentLogin from './Login'
import ParentSignup from './Signup'
import ParentHome from './ParentHome';
import FacultyHome from './FacultyHome';
import AdminHome from './AdminHome';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ParentLogin />}></Route>
        <Route path='/signup' element={<ParentSignup />}></Route>
        <Route path='/phome' element={<ParentHome />}></Route>
        <Route path='/fhome' element={<FacultyHome />}></Route>
        <Route path='/ahome' element={<AdminHome />}></Route>
      </Routes>
      <ParentLogin />
    </BrowserRouter>
  );
}

export default App;
