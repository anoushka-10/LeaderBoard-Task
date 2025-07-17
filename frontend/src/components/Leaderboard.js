import React from 'react';

function Leaderboard({ leaderboard }) {
  if (!Array.isArray(leaderboard)) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>

      <div className="leaderboard-header">
        <span className="header-rank">RANK</span>
        <span className="header-user">User</span>
        <span className="header-score">Points</span>
      </div>

      {leaderboard.map((user) => (
        <div className="leaderboard-item" key={user._id}>
          <span className="leaderboard-rank">{user.rank}</span>
          <img
            src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`}
            alt={`${user.name}'s avatar`}
            className="leaderboard-avatar"
          />
          <span className="leaderboard-name">{user.name}</span>
          <div className="leaderboard-score">
            <span>{user.totalPoints.toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Leaderboard;