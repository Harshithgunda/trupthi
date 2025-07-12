// src/utils/fetchWithAuth.js
export const fetchWithAuth = async (url, options = {}) => {
  let token = localStorage.getItem('token');

  if (!token) throw new Error('No token found');

  // Set Authorization header
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const res = await fetch(url, options);

  // If token expired, try to refresh
  if (res.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token found');

    const refreshRes = await fetch('http://localhost:5050/api/auth/refresh-token', {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    const refreshData = await refreshRes.json();

    if (!refreshRes.ok) {
      localStorage.clear();
      window.location.href = '/'; // redirect to login
      throw new Error(refreshData.message || 'Token refresh failed');
    }

    // Save new access token
    token = refreshData.accessToken;
    localStorage.setItem('token', token);

    // Retry original request
    options.headers.Authorization = `Bearer ${token}`;
    return fetch(url, options);
  }

  return res;
};
