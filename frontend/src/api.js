import axios from 'axios';

const API = axios.create({
  baseURL: "http://192.168.100.223:8000/api/", // ✅ Use local network IP, not localhost
});

// Login function
export const login = (username, password) =>
  API.post("token/", { username, password });

// Get motion events (make sure endpoint matches your Django view URL)
export const getMotionEvents = (token) =>
  API.get("sensor-data/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Register with email
export const register = (username, email, password) =>
  API.post("register/", { username, email, password });
