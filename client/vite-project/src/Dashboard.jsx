import Home from './Home';

function Dashboard() {
  const token = localStorage.getItem('token');

  if (!token) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Access Denied 🚫</h2>
        <p>Please login to view this page.</p>
      </div>
    );
  }

  return <Home />;
}

export default Dashboard;
