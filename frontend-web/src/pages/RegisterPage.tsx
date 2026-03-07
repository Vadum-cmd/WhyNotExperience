import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import './RegisterPage.css';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'guest' | 'host'>('guest');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(email, password, name, role);
      // Redirect to the page user was trying to access, or home
      const returnTo = new URLSearchParams(window.location.search).get('returnTo') || '/';
      navigate(returnTo);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.response?.data?.message || err.message || 'Failed to register';
      setError(errorMessage);
      console.error('Registration error:', err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1 className="register-title">BOAT</h1>
        <p className="register-subtitle">Create your account</p>

        <Card className="register-card">
          <form onSubmit={handleSubmit} className="register-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-input"
                placeholder="Your name"
              />
            </div>

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
                minLength={6}
                className="form-input"
                placeholder="At least 6 characters"
              />
            </div>

            <div className="form-group">
              <label className="form-label">I want to</label>
              <div className="role-selector">
                <button
                  type="button"
                  className={`role-option ${role === 'guest' ? 'role-option-active' : ''}`}
                  onClick={() => setRole('guest')}
                >
                  Book experiences
                </button>
                <button
                  type="button"
                  className={`role-option ${role === 'host' ? 'role-option-active' : ''}`}
                  onClick={() => setRole('host')}
                >
                  Host experiences
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </Card>

        <p className="login-link">
          Already have an account? <Link to={`/login${searchParams.get('returnTo') ? `?returnTo=${encodeURIComponent(searchParams.get('returnTo')!)}` : ''}`}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
