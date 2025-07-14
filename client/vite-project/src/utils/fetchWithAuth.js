const API_URL = import.meta.env.VITE_API_URL;

export const fetchWithAuth = async (url, options = {}) => {
  let token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  // Set Authorization header
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json', // ensure content-type is set
  };

  // ✅ Smart handling of full or relative URLs
  const fullUrl = url.startsWith('http') ? url : `${API_URL}${url}`;

  const res = await fetch(fullUrl, options);

  // If token expired, try to refresh
  if (res.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token found');

    const refreshRes = await fetch(`${API_URL}/api/auth/refresh-token`, {
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

    // Retry original request with new token
    options.headers.Authorization = `Bearer ${token}`;
    return fetch(fullUrl, options);
  }

  return res;
};
