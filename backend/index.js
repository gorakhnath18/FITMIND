 const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

 
app.get('/', (req, res) => {
    res.send('FitMind API is up and running!');
});

app.use('/api/auth', require('./routes/authRoutes'));

app.use('/api/users', require('./routes/userRoutes'));

app.use('/api/ai', require('./routes/aiRoutes'));


 const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT} and is ready to accept requests.`));