import React, { useState } from 'react';
import { login } from './api';
import Dashboard from './Dashboard';
import RegisterForm from './RegisterForm';  // ✅ Import here

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [showRegister, setShowRegister] = useState(false);  // toggle

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
    <div className="login-container">
      <h2>ESP32 Motion Sensor - Login</h2>
      {!showRegister ? (
        <>
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
          <button onClick={handleLogin}>Log In</button>
          <p>Don't have an account? <button onClick={() => setShowRegister(true)}>Register</button></p>
          {error && <p className="error">{error}</p>}
        </>
      ) : (
        <>
          <RegisterForm />
          <button onClick={() => setShowRegister(false)}>Back to Login</button>
        </>
      )}
    </div>
  );
}

export default App;
