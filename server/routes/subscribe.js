const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const User = require('../models/User'); 
const jwt = require('jsonwebtoken');
const sendConfirmationEmail = require('../utils/mailer');

// POST /api/subscribe
router.post('/', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const { mealPlan, restaurant, duration, address } = req.body;

    if (!mealPlan || !restaurant || !duration || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // 1. Save to Database
    const newSubscription = new Subscription({
      userId,
      mealPlan,
      restaurant,
      duration,
      address,
    });
    await newSubscription.save();

    // 2. Fetch user's email
    const user = await User.findById(userId);
    const email = user?.email;

    if (email) {
      // ✅ FIX: Removed 'await'. 
      // The email will try to send in the background. 
      // If Render blocks the port, the server will log the error but WON'T hang.
      sendConfirmationEmail(email, 'Subscription Confirmed ✅', `
        <h2>Thank you for subscribing, ${user.name}!</h2>
        <p><strong>Meal Plan:</strong> ${mealPlan}</p>
        <p><strong>Restaurant:</strong> ${restaurant}</p>
        <p><strong>Duration:</strong> ${duration}</p>
        <p><strong>Delivery Address:</strong> ${address}</p>
      `).catch(err => console.error('❌ Background Email Error:', err.message));
    }

    // 3. Send Success Response to Frontend
    // This allows the React app to proceed to the Razorpay step.
    res.status(201).json({ 
      success: true,
      message: '✅ Subscription successful' 
    });

  } catch (error) {
    // Check if the error is due to an expired login session
    if (error.name === 'TokenExpiredError' || error.message === 'jwt expired') {
      console.log("Session expired for user. Requesting re-login.");
      return res.status(401).json({ message: 'jwt expired' });
    }

    console.error('Subscription error:', error.message);
    res.status(500).json({ message: '❌ Server error' });
  }
});

module.exports = router;
