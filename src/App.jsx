import './App.css'
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="home" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
