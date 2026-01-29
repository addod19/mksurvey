import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BackButton from '../components/BackButton';

export default function Signup() {
  const auth = useAuth();

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    role: 'survey_admin',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }
    const payload = {
      name: formData.fullname,
      email: formData.email,
      password: formData.password,
      phone: formData.phoneNumber,
      role: formData.role,
    };
    setLoading(true);
    const res = await auth.signUp(payload);
    setLoading(false);
    if (!res.ok) setErrorMessage(res.error || 'Registration failed');
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
            <h2>Create your account</h2>
            <p>
              Register to access admin tools, rental logs, and operations
              tracking with precision.
            </p>
            <div className="auth-tags">
              <span>Survey Admin</span>
              <span>Loader</span>
              <span>Blocks</span>
            </div>
          </div>

          <div className="auth-form-panel">
            <h3 className="auth-title">Sign up</h3>
            <p className="auth-subtitle">Complete the form to get started.</p>
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-field">
                <label className="auth-label" htmlFor="fullname">Full name</label>
                <input
                  className="auth-input"
                  type="text"
                  id="fullname"
                  name="fullname"
                  placeholder="Full name"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                />
              </div>

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
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button type="button" className="input-action-btn auth-action-btn" aria-label="Toggle password visibility" onClick={() => setShowPassword(s => !s)}>
                    {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                  </button>
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="confirmPassword">Confirm password</label>
                <div className="input-with-action">
                  <input
                    className="auth-input"
                    type={showConfirm ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Repeat your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button type="button" className="input-action-btn auth-action-btn" aria-label="Toggle confirm password visibility" onClick={() => setShowConfirm(s => !s)}>
                    {showConfirm ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                  </button>
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="phoneNumber">Phone number</label>
                <input
                  className="auth-input"
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="+233 00 000 0000"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="role">Role</label>
                <select id="role" name="role" value={formData.role} onChange={handleChange} className="auth-select">
                  <option value="survey_admin">Survey Admin</option>
                  <option value="loader_admin">Loader Admin</option>
                  <option value="tipper_admin">Tipper Admin</option>
                  <option value="blocks_admin">Blocks Admin</option>
                  <option value="main_admin">Main Admin</option>
                </select>
                <p className="auth-hint">Choose the admin role for this account.</p>
              </div>

              {errorMessage && <div className="auth-error">{errorMessage}</div>}

              <button type="submit" className="mk-btn mk-btn-primary auth-submit" disabled={loading}>
                {loading ? <span className="spinner" /> : 'Register'}
              </button>
            </form>

            <p className="auth-alt">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
