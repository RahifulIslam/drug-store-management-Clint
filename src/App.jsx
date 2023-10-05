import './App.css'
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Users from './components/Users';
import Medicines from './components/Medicines';
import Sales from './components/Sales/Sales';
import { useState } from 'react';
import Sidebar from './components/SideBarPage';
// import Header from './Header';
// import Sidebar from './Sidebar';


function App() {

  return (
   
     <Router>
      <div className='app-container'>
        {/* <Sidebar/> */}
        <div className="main-content">
        <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        {/* <Route path="sidebar" element={<Sidebar />} /> */}
        <Route path="home" element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route path="medicines" element={<Medicines />} />
        <Route path="sales" element={<Sales />} />
      </Routes>
        </div>
      </div>
      {/* <SidebarPage/> */}
    </Router>
  )
}

export default App
