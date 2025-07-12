// server/routes/payment.js

const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();

// ✅ Initialize Razorpay with environment variables
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 🎯 POST /api/payment/create-order
router.post('/create-order', async (req, res) => {
  const { amount, currency = 'INR', receipt } = req.body;

  try {
    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency,
      receipt: receipt || 'rcpt_' + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.json(order); // Order will contain id, amount, currency, status, etc.
  } catch (error) {
    console.error('❌ Razorpay order creation failed:', error.message);
    res.status(500).json({ message: 'Order creation failed', error: error.message });
  }
});

module.exports = router;
