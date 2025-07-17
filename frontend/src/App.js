import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Leaderboard from './components/Leaderboard';
import UserActions from './components/UserActions';
import Pagination from './components/Pagination'; // Added the missing import
import './App.css';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
    // --- State Management ---
    const [users, setUsers] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [notification, setNotification] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // --- Data Fetching ---
    // Fetches the leaderboard for a specific page
    const fetchLeaderboard = useCallback(async (page = 1) => {
        try {
            const res = await axios.get(`${API_URL}/leaderboard?page=${page}&limit=5`);
            setLeaderboard(res.data.leaderboard);
            setTotalPages(res.data.totalPages);
            setCurrentPage(res.data.currentPage);
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
            showNotification("Failed to fetch leaderboard data.", "error");
        }
    }, []);
    
    // --- Initial Data Load ---
    // This now fetches both the user list and the first page of the leaderboard
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const usersRes = await axios.get(`${API_URL}/users`);
                setUsers(usersRes.data);
                fetchLeaderboard(1); // Fetch the first page of the leaderboard
            } catch (error) {
                 console.error("Error fetching users:", error);
                 showNotification("Failed to fetch user list.", "error");
            }
        };
        
        fetchInitialData();
    }, [fetchLeaderboard]); // Dependency array is correct

    // --- UI Notifications ---
    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(''), 3000);
    };

    // --- Event Handlers ---
    const handleUserAdded = async (name) => {
        try {
            await axios.post(`${API_URL}/users`, { name });
            showNotification(`User "${name}" added successfully!`);
            // Refresh the user list and the current page of the leaderboard
            const usersRes = await axios.get(`${API_URL}/users`);
            setUsers(usersRes.data);
            fetchLeaderboard(currentPage);
        } catch (error) {
            console.error("Error adding user:", error);
            showNotification(error.response?.data?.message || "Error adding user.", "error");
        }
    };

    const handleClaimPoints = async () => {
        if (!selectedUser) return;
        try {
            const res = await axios.post(`${API_URL}/claim`, { userId: selectedUser });
            showNotification(res.data.message);
            // SIMPLIFIED: Only make one call to refresh the current page
            fetchLeaderboard(currentPage);
        } catch (error) {
            console.error("Error claiming points:", error);
            showNotification("Error claiming points.", "error");
        }
    };

    // --- Component Rendering ---
    return (
        <div className="App">
            <h1>Leaderboard Challenge</h1>
            {notification && <div className="notification">{notification}</div>}
            <div className="container">
                <UserActions
                    users={users}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    onUserAdded={handleUserAdded}
                    onClaimPoints={handleClaimPoints}
                />
                <Leaderboard leaderboard={leaderboard} />
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={fetchLeaderboard} />
            </div>
        </div>
    );
}

export default App;