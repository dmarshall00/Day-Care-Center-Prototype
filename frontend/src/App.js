import React from 'react'
import ParentLogin from './ParentLogin'
import ParentSignup from './ParentSignup'
import ParentHome from './ParentHome';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ParentLogin />}></Route>
        <Route path='/signup' element={<ParentSignup />}></Route>
        <Route path='/home' element={<ParentHome />}></Route>
      </Routes>
      <ParentLogin />
    </BrowserRouter>
  );
}

export default App;
