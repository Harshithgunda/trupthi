import { useState } from 'react';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5050/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token && data.refreshToken) {
        localStorage.setItem('token', data.token); // access token
        localStorage.setItem('refreshToken', data.refreshToken); // refresh token
        localStorage.setItem('user', JSON.stringify(data.user)); // user info
        window.location.href = '/home'; // redirect
      } else {
        alert(data.msg || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      alert('Server error during signup');
    }
  };

  return (
    <form onSubmit={handleSignup} className="auth-form">
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
      />

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

      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;
