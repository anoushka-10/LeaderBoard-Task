import React, { useState } from 'react';

function UserActions({ users, selectedUser, setSelectedUser, onUserAdded, onClaimPoints }) {
    const [newUserName, setNewUserName] = useState('');

    const handleAddUser = (e) => {
        e.preventDefault();
        if (newUserName.trim()) {
            onUserAdded(newUserName.trim());
            setNewUserName('');
        }
    };

    return (
        <div className="actions-container">
            {/* Aesthetic Card for Claiming Points */}
            <div className="aesthetic-card">
                <div className="card-header">
                    <i className="fa-solid fa-star card-icon"></i>
                    <h3>Claim Points</h3>
                </div>
                <p className="card-description">Select a user to award them random points.</p>
                <select
                    className="aesthetic-select"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                >
                    <option value="">-- Select a User --</option>
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                <button onClick={onClaimPoints} disabled={!selectedUser} className="aesthetic-button">
                    <i className="fa-solid fa-medal"></i> Award Points
                </button>
            </div>

            {/* Aesthetic Card for Adding a New User */}
            <div className="aesthetic-card">
                 <div className="card-header">
                    <i className="fa-solid fa-user-plus card-icon"></i>
                    <h3>Add New User</h3>
                </div>
                <p className="card-description">Add a new competitor to the leaderboard.</p>
                <form onSubmit={handleAddUser}>
                    <input
                        className="aesthetic-input"
                        type="text"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        placeholder="Enter new user's name..."
                    />
                    <button type="submit" className="aesthetic-button">
                        <i className="fa-solid fa-plus"></i> Add User
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UserActions;