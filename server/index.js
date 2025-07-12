// index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Routes
const authRoutes = require('./routes/auth');
const subscribeRoutes = require('./routes/subscribe');
const paymentRoutes = require('./routes/payment'); // ✅ Added payment route

app.use('/api/auth', authRoutes);
app.use('/api/subscribe', subscribeRoutes);
app.use('/api/payment', paymentRoutes); // ✅ Mount the route

// Health Check
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send('Welcome to Trupthi Backend 🚀');
});

// Start Server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
