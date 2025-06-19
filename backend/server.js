 const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); // Node.js module for working with file paths

// --------------------
// 1. CONFIGURATION
// --------------------

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();

// --------------------
// 2. MIDDLEWARE
// --------------------

// Enable Cross-Origin Resource Sharing (CORS) to allow requests from your frontend
app.use(cors());

// Enable the express.json() middleware to parse JSON bodies in requests
app.use(express.json());

// --------------------
// 3. DATABASE CONNECTION
// --------------------

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully!'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// --------------------
// 4. API ROUTES
// --------------------

// Import route handlers
const userRoutes = require('./routes/userRoutes');
const aiRoutes = require('./routes/aiRoutes');
const activityRoutes = require('./routes/activityRoutes');

// Define the base path for each set of routes
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);
app.g/api/activities', activityRoutes);

// --------------------
// 5. SERVER STARTUP
// --------------------

// Define the port the server will run on
const PORT = process.env.PORT || 5000;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});