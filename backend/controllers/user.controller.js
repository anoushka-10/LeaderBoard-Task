// controllers/user.controller.js
const User = require('../models/user.model');
const ClaimHistory = require('../models/claimHistory.model.js');

// @desc    Get all users
// @route   GET /api/users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// @desc    Add a new user
// @route   POST /api/users
exports.addUser = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        const newUser = new User({ name });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        // Handle duplicate name error
        if (error.code === 11000) {
             return res.status(409).json({ message: 'Username already exists.' });
        }
        res.status(500).json({ message: 'Error adding user', error });
    }
};

// @desc    Claim points for a user
// @route   POST /api/claim
exports.claimPoints = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const randomPoints = Math.floor(Math.random() * 10) + 1;

        // Find user and update points in one atomic operation
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $inc: { totalPoints: randomPoints } },
            { new: true } // Returns the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a history log
        const historyLog = new ClaimHistory({
            userId: userId,
            pointsClaimed: randomPoints
        });
        await historyLog.save();

        res.status(200).json({
            message: `Awarded ${randomPoints} points to ${updatedUser.name}`,
            user: updatedUser,
            pointsAwarded: randomPoints
        });

    } catch (error) {
        res.status(500).json({ message: 'Error claiming points', error });
    }
};

// @desc    Get leaderboard (ranked users)
// @route   GET /api/leaderboard
// controllers/user.controller.js

// In backend/controllers/user.controller.js

exports.getLeaderboard = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Get the total count for calculating total pages
        const totalUsers = await User.countDocuments();

        const leaderboard = await User.find({})
            .sort({ totalPoints: -1 })
            .skip(skip)
            .limit(limit);

        const rankedUsers = leaderboard.map((user, index) => ({
            rank: skip + index + 1,
            _id: user._id,
            name: user.name,
            totalPoints: user.totalPoints,
        }));

        // This sends the data in the correct object format
        res.status(200).json({
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: page,
            leaderboard: rankedUsers
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leaderboard', error });
    }
};
// @desc    Get claim history
// @route   GET /api/history
exports.getHistory = async (req, res) => {
    try {
        const history = await ClaimHistory.find({})
            .sort({ createdAt: -1 }) // Show most recent first
            .populate('userId', 'name'); // Replace userId with user's name
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching history', error });
    }
};