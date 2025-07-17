// routes/user.routes.js
const express = require('express');
const router = express.Router();
const {
    getUsers,
    addUser,
    claimPoints,
    getLeaderboard,
    getHistory
} = require('../controllers/user.controller.js');

// Define the routes
router.get('/users', getUsers);
router.post('/users', addUser);
router.post('/claim', claimPoints);
router.get('/leaderboard', getLeaderboard);
router.get('/history', getHistory);

module.exports = router;