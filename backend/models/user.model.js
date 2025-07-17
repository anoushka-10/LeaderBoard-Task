// models/user.model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true // Removes whitespace
    },
    totalPoints: {
        type: Number,
        default: 0
    }
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

const User = mongoose.model('User', userSchema);
module.exports = User;