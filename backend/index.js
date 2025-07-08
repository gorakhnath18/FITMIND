const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

app.use(cors());

// The webhook route must come BEFORE express.json() to receive the raw body
// If you are not using payments, you can remove this line.
// app.use('/api/payments', require('./routes/paymentRoutes'));

app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/plans', require('./routes/planRoutes'));

// --- THIS IS THE FIX ---
// The old path resolution was incorrect for Render's environment.
if (process.env.NODE_ENV === 'production') {
  // Get the absolute path to the project's root directory
  const __dirname = path.resolve();

  // Correctly join the root path with the 'frontend/dist' folder
  app.use(express.static(path.join(__dirname, 'frontend/dist')));

  // For any non-API route, send the index.html file from the corrected path
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running in development mode...');
  });
}
 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`));