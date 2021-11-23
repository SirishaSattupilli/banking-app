import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react'
import Home from './components/Home';
import Login from './components/Login';
import Balance from './components/Balance';
import Transfer from './components/Transfer';


function App() {

  let RequireAuth = ({ children, redirectTo }) => {
    let isAuthenticated = localStorage.getItem('token');
    return isAuthenticated ? children : <Navigate to={redirectTo} />
  }

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/transfer" element={<RequireAuth redirectTo="/login"><Transfer /></RequireAuth>} />
            <Route path="/balance" element={<RequireAuth redirectTo="/login"><Balance /></RequireAuth>} />
          </Routes>
        </header>
      </div>
    </BrowserRouter>

  );
}

export default App;
