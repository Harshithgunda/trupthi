const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  mealPlan: {
    type: String,
    required: true
  },
  restaurant: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
