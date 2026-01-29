import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BackButton from '../components/BackButton';
export default function Login() {
  const auth = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);
    const res = await auth.signIn(formData.email, formData.password);
    setLoading(false);
    if (!res.ok) setErrorMessage(res.error || 'Login failed');
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <div className="auth-toolbar">
          <BackButton className="mk-back-btn auth-back" />
        </div>
        <div className="auth-card">
          <div className="auth-side">
            <p className="auth-eyebrow">MK Surveying</p>
            <h2>Welcome back</h2>
            <p>
              Sign in to access admin tools, project updates, and operational
              dashboards.
            </p>
            <div className="auth-tags">
              <span>Surveying</span>
              <span>Construction</span>
              <span>Operations</span>
            </div>
          </div>

          <div className="auth-form-panel">
            <h3 className="auth-title">Login</h3>
            <p className="auth-subtitle">Enter your details to continue.</p>
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-field">
                <label className="auth-label" htmlFor="email">Email</label>
                <input
                  className="auth-input"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="password">Password</label>
                <div className="input-with-action">
                  <input
                    className="auth-input"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="input-action-btn auth-action-btn"
                    aria-label="Toggle password visibility"
                    onClick={() => setShowPassword(s => !s)}
                  >
                    {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                  </button>
                </div>
              </div>

              {errorMessage && <div className="auth-error">{errorMessage}</div>}

              <button type="submit" className="mk-btn mk-btn-primary auth-submit" disabled={loading}>
                {loading ? <span className="spinner" /> : 'Login'}
              </button>
            </form>

            <p className="auth-alt">
              New here? <Link to="/signup">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
