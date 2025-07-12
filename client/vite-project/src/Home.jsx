import './home.css';
import logo from './thrupthilogo.png';
import Anil from './assets/Anil.jpg';
import Baali from './assets/Baali.jpg';
import Deepak from './assets/Deepak.jpg';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const handleSubscribe = (mealType) => {
    navigate('/subscribe', { state: { meal: mealType } });
  };

  return (
    <>
      {/* Navbar */}
      <nav className="nav glass-nav">
        <div className="nav-logo">
          <img src={logo} alt="Trupthi" className="logo-animate" />
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content fade-in">
          <h1>Delicious Meals, Delivered Daily</h1>
          <p>Subscribe for fresh, home-style food from nearby restaurants — breakfast, lunch & dinner.</p>
          <a href="#plans" className="hero-btn animated-btn">Explore Subscriptions</a>
        </div>
      </header>

      {/* Combined Meal Plans Section */}
      <section className="bg-overlay" id="plans">
        <div className="blur-box plans-section fade-in">
          <h2>Meal Subscription Plans</h2>
          <div className="plan-grid">
            <div className="plan-card">
              <img src="https://assets.vogue.com/photos/63d169f727f1d528635b4287/3:2/w_3630,h_2420,c_limit/GettyImages-1292563627.jpg" alt="Breakfast" />
              <h3>Breakfast Plan</h3>
              <p>₹599/month — Start your day with hand-picked meals delivered to your door.</p>
              <button className="subscribe-btn" onClick={() => handleSubscribe('Breakfast Plan')}>Subscribe</button>
            </div>
            <div className="plan-card">
              <img src="https://cdn.siasat.com/wp-content/uploads/2023/11/hyderabadi-thali.jpg" alt="Lunch" />
              <h3>Lunch Plan</h3>
              <p>₹899/month — Affordable and tasty lunch combos for your workday break.</p>
              <button className="subscribe-btn" onClick={() => handleSubscribe('Lunch Plan')}>Subscribe</button>
            </div>
            <div className="plan-card">
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" alt="Dinner" />
              <h3>Dinner Plan</h3>
              <p>₹799/month — Healthy and filling meals to end your day the right way.</p>
              <button className="subscribe-btn" onClick={() => handleSubscribe('Dinner Plan')}>Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-overlay">
        <div className="blur-box how-it-works fade-in">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <h4>1. Choose a Plan</h4>
              <p>Select a breakfast, lunch, or dinner subscription that fits your schedule.</p>
            </div>
            <div className="step">
              <h4>2. Pick a Restaurant</h4>
              <p>Pick from a list of top-rated nearby restaurants for each meal.</p>
            </div>
            <div className="step">
              <h4>3. Enjoy Daily Meals</h4>
              <p>Get fresh food delivered daily without the hassle of reordering.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-overlay">
        <div className="blur-box testimonials-section fade-in">
          <h2>What Our Customers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <img src={Anil} alt="Anil" />
              <h4>Anil</h4>
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>The breakfast plan is my go-to now. Super convenient!</p>
            </div>
            <div className="testimonial-card">
              <img src={Baali} alt="Baali" />
              <h4>Baali</h4>
              <div className="stars">⭐⭐⭐⭐</div>
              <p>Great lunch deals, especially for busy weekdays. Highly recommended and paneer is topnotch.</p>
            </div>
            <div className="testimonial-card">
              <img src={Deepak} alt="Deepak" />
              <h4>Deepak</h4>
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>Dinner meals remind me of home. Always fresh and filling. Pulihora made my day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="bg-overlay">
        <div className="blur-box site-footer fade-in">
          <p>© {new Date().getFullYear()} Trupthi. All Rights Reserved.</p>
        </div>
      </section>
    </>
  );
}

export default Home;
