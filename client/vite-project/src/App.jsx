import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import Home from './Home';
import Subscribe from './Subscribe';
import ConfirmSubscription from './ConfirmSubscription';
import './auth.css';
import logo from './thrupthilogo.png';

function App() {
  const [page, setPage] = useState('login');
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        {token ? (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/confirm" element={<ConfirmSubscription />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </>
        ) : (
          <>
            <Route
              path="/"
              element={
                <div className={`auth-container ${page === 'signup' ? 'signup-bg' : 'login-bg'}`}>
                  <div className="auth-card">
                    <img src={logo} alt="Trupthi Logo" className="logo" />
                    <h2>{page === 'signup' ? 'Signup to Trupthi' : 'Login to Trupthi'}</h2>
                    <div className="toggle-buttons">
                      <button
                        onClick={() => setPage('login')}
                        className={page === 'login' ? 'active' : ''}
                      >
                        Login
                      </button>
                      <button
                        onClick={() => setPage('signup')}
                        className={page === 'signup' ? 'active' : ''}
                      >
                        Signup
                      </button>
                    </div>
                    {page === 'login' ? <Login /> : <Signup />}
                  </div>
                </div>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
