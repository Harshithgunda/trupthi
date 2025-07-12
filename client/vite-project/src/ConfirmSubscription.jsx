import React, { useState, useEffect } from 'react';
import './confirm.css';
import logo from './thrupthilogo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchWithAuth } from './utils/fetchWithAuth';

function ConfirmSubscription() {
  const [duration, setDuration] = useState('1 Month');
  const [address, setAddress] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const restaurant = location.state?.restaurant;
  const mealPlan = location.state?.meal;

  useEffect(() => {
    if (!restaurant || !mealPlan) {
      navigate('/subscribe');
    }
  }, [restaurant, mealPlan, navigate]);

  // 💸 Razorpay handler with UPI enabled
  const openRazorpay = async () => {
    try {
      const res = await fetch('http://localhost:5050/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 199,
          receipt: 'trupthi_rcpt_' + Date.now()
        }),
      });

      const order = await res.json();

      const options = {
        key: 'rzp_test_3xE97lCXBiS3FV',
        amount: order.amount,
        currency: order.currency,
        name: 'Trupthi Meals',
        description: 'Subscription Payment',
        order_id: order.id,
        handler: function (response) {
          alert('✅ Payment successful!');
          setTimeout(() => navigate('/home'), 2000);
        },
        prefill: {
          name: 'Customer',
          email: '',
        },
        theme: {
          color: '#663399',
        },
        method: {
          upi: true,         // ✅ Explicitly enabling UPI
          card: true,
          netbanking: true,
          wallet: true
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert('Failed to initiate payment');
    }
  };

  const handleConfirm = async () => {
    if (address.trim() === '') {
      setError('Please enter a delivery address.');
      return;
    }

    try {
      const response = await fetchWithAuth('http://localhost:5050/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mealPlan,
          restaurant,
          duration,
          address
        })
      });

      const data = await response.json();

      if (response.ok) {
        setConfirmed(true);
        openRazorpay(); // 💸 Trigger payment only after confirmation
      } else {
        setError(data.message || 'Subscription failed.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Try again later.');
    }
  };

  return (
    <div className="confirm-page">
      <div className="confirm-nav">
        <img src={logo} alt="Trupthi Logo" className="confirm-logo" />
        <button className="home-btn" onClick={() => navigate('/home')}>Home</button>
      </div>

      <div className="confirm-box">
        <h2>Confirm Your Subscription</h2>
        <p><strong>Meal:</strong> {mealPlan}</p>
        <p><strong>Restaurant:</strong> {restaurant}</p>

        <label>Choose Duration:</label>
        <select value={duration} onChange={(e) => setDuration(e.target.value)}>
          <option>1 Week</option>
          <option>2 Weeks</option>
          <option>1 Month</option>
          <option>3 Months</option>
        </select>

        <label>Delivery Address:</label>
        <textarea
          placeholder="Enter your delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>

        <button className="confirm-btn" onClick={handleConfirm} disabled={!address.trim()}>
          Confirm Subscription
        </button>

        {error && <p className="error-msg">{error}</p>}
        {confirmed && (
          <div className="confirmation-message">
            ✅ Subscription Confirmed! Proceeding to payment...
          </div>
        )}
      </div>
    </div>
  );
}

export default ConfirmSubscription;
