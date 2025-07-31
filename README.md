# Trupthi: Restaurant Reservation and Food Ordering Platform
Trupthi is a full-stack web application designed to help users discover location-based restaurants and place orders based on subscription wise. The platform supports real-time subscrptions, secure payment processing, and confirmation notifications via email.

# Features
1) User Registration & Login
Secure authentication system with JWT-based token handling, including access and refresh tokens.

2) Restaurant Search
Users can search restaurants based on their current location using an external public location-based restaurant API.

3) Subscription Plan
Users can view and choose different types of subscriptions from nearby restaurants and place order.

4) Razorpay Payment Integration
Users can make secure payments through Razorpay for their bookings and food orders.

5) Email Confirmation
Customers receive confirmation emails after successful bookings or payments.

6) Admin Dashboard
Admins can manage restaurants, menus, bookings, and users.

# Technologies Used
* Frontend
* Vite (React)
* Tailwind CSS
* React Router
* JWT handling using fetchWithAuth

# Backend
* Node.js
* Express.js
* MongoDB with Mongoose
* JSON Web Tokens (JWT)
* Nodemailer for sending confirmation emails
* Razorpay for payment gateway integration

# Folder Structure

Trupthi/
├── client/                  # Frontend codebase (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/fetchWithAuth.js
│   │   └── App.jsx
│   └── vite.config.js
├── server/                  # Backend codebase (Node + Express)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   └── index.js             # Server entry point
├── .env
└── README.md

# Deployment
* Frontend: Deployed using Vercel
Production URL: https://trupthi.vercel.app/

* Backend: Deployed using Render
API Base URL is configured in frontend as an environment variable (VITE_API_URL).

# Environment Variables
Create a .env file in both client and server folders.

* For Frontend (client/.env):
VITE_API_URL=https://your-render-backend-url.onrender.com

* For Backend (server/.env):
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Scripts
Frontend :
* cd client
* npm install
* npm run dev
  
Backend :
* cd server
* npm install
* node index.js
# Author : 
Developed by Harshith Gunda
gundaharshith2@gmail.com
