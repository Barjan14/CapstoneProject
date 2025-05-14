import React, { useState } from 'react';
import { register } from './api';
import './RegisterForm.css';  // Import the CSS file

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');          // ✅ email state
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      await register(username, email, password);   // ✅ include email
      setMessage("User registered successfully! Please check your email.");
    } catch (err) {
      setMessage("Registration failed.");
    }
  };

  return (
    <div className="register-form">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"                        // ✅ email input
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button className="register-button" onClick={handleRegister}>REGISTER</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default RegisterForm;
