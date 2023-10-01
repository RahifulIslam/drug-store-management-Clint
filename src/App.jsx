import './App.css'
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/SideBarPage'
import Home from './components/Home';
import Users from './components/Users';
import Medicines from './components/Medicines';
import Sales from './components/Sales/Sales';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="sidebar" element={<Sidebar />} />
        <Route path="home" element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route path="medicines" element={<Medicines />} />
        <Route path="sales" element={<Sales />} />
      </Routes>
    </Router>
  )
}

export default App
