// src/RegisterForm.js
import React, { useState } from 'react';
import { register } from './api';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      await register(username, password);
      setMessage("User registered successfully!");
    } catch (err) {
      setMessage("Registration failed.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleRegister}>Register</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default RegisterForm;
