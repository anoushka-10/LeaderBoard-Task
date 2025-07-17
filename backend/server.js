// server.js
require('dotenv').config(); // Loads environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const User = require('./models/user.model'); // Import User model for seeding

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // To parse JSON bodies

// Routes
app.use('/api', userRoutes);

// --- Database Connection and Initial Seeding ---
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    console.log('MongoDB connected successfully.');

    // Seed initial users if the collection is empty
    const userCount = await User.countDocuments();
    if (userCount === 0) {
        console.log('No users found. Seeding initial users...');
        const initialUsers = [
            { name: 'Rahul' },
            { name: 'Kamal' },
            { name: 'Sana' },
            { name: 'John Doe' },
            { name: 'Jane Smith' },
            { name: 'Amit' },
            { name: 'Priya' },
            { name: 'Vikram' },
            { name: 'Anjali' },
            { name: 'Deepak' }
        ];
        await User.insertMany(initialUsers);
        console.log('Database seeded with 10 users.');
    }

    // Start the server
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

}).catch(err => console.error('MongoDB connection error:', err));