// index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// ✅ Define allowed origins (localhost for dev, Vercel for prod)
const allowedOrigins = [
  'http://localhost:5173',
  'https://trupthi-fpvdm1nax-harshiths-projects-227a92aa.vercel.app'
];

// ✅ Apply CORS with origin checking
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // important if you use cookies or auth headers
}));

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

// Routes
const authRoutes = require('./routes/auth');
const subscribeRoutes = require('./routes/subscribe');
const paymentRoutes = require('./routes/payment');

app.use('/api/auth', authRoutes);
app.use('/api/subscribe', subscribeRoutes);
app.use('/api/payment', paymentRoutes);

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
