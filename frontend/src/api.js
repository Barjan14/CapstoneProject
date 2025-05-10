import axios from 'axios';

const API = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export const login = (username, password) =>
  API.post("token/", { username, password });

export const getMotionEvents = (token) =>
  API.get('motion-events/', {
    headers: { Authorization: `Bearer ${token}` },
  });

export const register = (username, password) =>
API.post("register/", { username, password });

