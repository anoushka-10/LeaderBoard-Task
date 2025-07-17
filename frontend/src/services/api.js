// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
    baseURL: API_URL,
});

export const fetchUsers = () => apiClient.get('/users');
export const fetchLeaderboard = (page = 1, limit = 5) => apiClient.get(`/leaderboard?page=${page}&limit=${limit}`);
export const addUser = (name) => apiClient.post('/users', { name });
export const claimPoints = (userId) => apiClient.post('/claim', { userId });