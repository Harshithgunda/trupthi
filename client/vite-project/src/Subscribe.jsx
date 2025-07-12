import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './subscribe.css';
import logo from './thrupthilogo.png';

function Subscribe() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const mealPlan = location.state?.meal || 'Meal Plan';
  const API_KEY = '7534473680414fb3820b28020bf700b3';

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(
          `https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=circle:${longitude},${latitude},5000&limit=12&apiKey=${API_KEY}`
        )
          .then((res) => res.json())
          .then((data) => {
            setRestaurants(data.features);
            setFiltered(data.features);
            setLoading(false);
          })
          .catch(() => {
            setError('Failed to fetch restaurant data.');
            setLoading(false);
          });
      },
      () => {
        setError('Unable to retrieve your location.');
        setLoading(false);
      }
    );
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    const filteredResults = restaurants.filter((place) =>
      place.properties.name?.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(filteredResults);
  };

  const handleSubscribe = (place) => {
    navigate('/confirm', {
      state: {
        restaurant: place.properties.name || 'Unnamed',
        meal: mealPlan,
      },
    });
  };

  return (
    <div className="subscribe-page">
      {/* Top Navbar */}
      <div className="subscribe-nav">
        <img src={logo} alt="Trupthi Logo" className="subscribe-logo" />
        <input
          type="text"
          placeholder="Search restaurants..."
          value={search}
          onChange={handleSearch}
          className="search-bar"
        />
        <button className="back-btn" onClick={() => navigate('/home')}>Back to Home</button>
      </div>

      <h2>Nearby Restaurants</h2>
      {loading && <div className="loader"></div>}
      {error && <p className="error">{error}</p>}

      <div className="restaurant-grid">
        {filtered.map((place) => (
          <div
            key={place.properties.place_id}
            className="restaurant-card glass-card"
          >
            <h3>{place.properties.name || 'Unnamed Restaurant'}</h3>
            <p>{place.properties.address_line1}</p>
            <p>{place.properties.city}</p>
            <p className="category">{place.properties.categories?.[0]}</p>
            <button
              className="subscribe-now-btn"
              onClick={(e) => {
                e.stopPropagation(); // Ensure card click doesn’t interfere
                handleSubscribe(place);
              }}
            >
              Subscribe Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subscribe;
