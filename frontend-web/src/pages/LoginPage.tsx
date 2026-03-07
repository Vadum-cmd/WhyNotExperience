import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      // Redirect to the page user was trying to access, or home
      const returnTo = new URLSearchParams(window.location.search).get('returnTo') || '/';
      navigate(returnTo);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.response?.data?.message || err.message || 'Failed to login';
      setError(errorMessage);
      console.error('Login error:', err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">BOAT</h1>
        <p className="login-subtitle">Welcome back</p>

        <Card className="login-card">
          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
                placeholder="Enter your password"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Card>

        <div className="register-section">
          <p className="register-link">
            Don't have an account? <Link to={`/register${searchParams.get('returnTo') ? `?returnTo=${encodeURIComponent(searchParams.get('returnTo')!)}` : ''}`}>Create account</Link>
          </p>
          <Link to={`/register${searchParams.get('returnTo') ? `?returnTo=${encodeURIComponent(searchParams.get('returnTo')!)}` : ''}`}>
            <Button
              variant="outline"
              size="large"
              fullWidth
            >
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
