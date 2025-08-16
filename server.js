const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

dotenv.config(); // Load environment variables from .env

const app = express();

// ✅ Fix CORS properly
const allowedOrigins = [
  'http://localhost:3000',
  'https://registration-frontend-rose.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());


// ✅ Connect to MongoDB with error handling
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('✅ MongoDB connected'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1); // Exit if unable to connect
});

// Routes
app.use('/api', authRoutes);

// ✅ Health check route (optional but helpful)
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));