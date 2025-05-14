import React, { useState } from 'react';
import { login } from './api';
import Dashboard from './Dashboard';
import RegisterForm from './RegisterForm';
import './App.css';  // Import the CSS file here

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('login');

  const handleLogin = async () => {
    try {
      const res = await login(username, password);
      setToken(res.data.access);
      setError('');
    } catch (err) {
      setError('Invalid login credentials');
    }
  };

  if (token) {
    return <Dashboard token={token} />;
  }

  return (
    <div className="split-container">
      <div className="left-panel">
        <div className="branding">
          <svg width="80" height="80" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" stroke="#4caf50" strokeWidth="4"/>
            <path d="M20 32L28 40L44 24" stroke="#4caf50" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h1>ESP32 Motion Sensor</h1>
        </div>
      </div>
      <div className="right-panel">
        <div className="tab-header">
          <button
            className={activeTab === 'register' ? 'active' : ''}
            onClick={() => setActiveTab('register')}
          >
            SIGN UP
          </button>
          <button
            className={activeTab === 'login' ? 'active' : ''}
            onClick={() => setActiveTab('login')}
          >
            SIGN IN
          </button>
        </div>
        <div className="tab-content">
          {activeTab === 'login' ? (
            <div className="login-form">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="login-button" onClick={handleLogin}>LOGIN</button>
              {error && <p className="error">{error}</p>}
            </div>
          ) : (
            <RegisterForm />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
