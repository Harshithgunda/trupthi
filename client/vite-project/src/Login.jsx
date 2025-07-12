import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5050/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || 'Login failed');
        return;
      }

      // ✅ Fixed: correctly handling tokens from backend
      if (data.accessToken && data.refreshToken) {
        localStorage.setItem('token', data.accessToken);           // Access Token
        localStorage.setItem('refreshToken', data.refreshToken);   // Refresh Token
        localStorage.setItem('user', JSON.stringify(data.user));   // Optional: store user

        window.location.href = '/home'; // Or use navigate()
      } else {
        alert('Login failed: Missing tokens');
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
