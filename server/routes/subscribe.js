const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const User = require('../models/User'); // ✅ Add this line to fetch user info
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

    const newSubscription = new Subscription({
      userId,
      mealPlan,
      restaurant,
      duration,
      address,
    });

    await newSubscription.save();

    // ✅ Fetch user's email using userId
    const user = await User.findById(userId);
    const email = user?.email;

    if (!email) {
      return res.status(500).json({ message: 'Could not find user email for confirmation' });
    }

    // ✅ Send confirmation email to actual logged-in user
    await sendConfirmationEmail(email, 'Subscription Confirmed ✅', `
      <h2>Thank you for subscribing, ${user.name}!</h2>
      <p><strong>Meal Plan:</strong> ${mealPlan}</p>
      <p><strong>Restaurant:</strong> ${restaurant}</p>
      <p><strong>Duration:</strong> ${duration}</p>
      <p><strong>Delivery Address:</strong> ${address}</p>
    `);

    res.status(201).json({ message: '✅ Subscription successful & email sent' });
  } catch (error) {
    console.error('Subscription error:', error.message);
    res.status(500).json({ message: '❌ Server error' });
  }
});

module.exports = router;
