import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

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
    const res = await auth.signUp(payload);
  if (!res.ok) setErrorMessage(res.error || 'Registration failed');
  };

  return (
    <div className="form-container">
      <h2>User Registration</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group mt-2">
          <div className="field">
            <p className="control has-icons-left">
              <input className="input"
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Full Name"
                value={formData.fullname}
                onChange={handleChange}
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </p>
          </div>
        </div>

        <div className="form-group mt-2">
          <div className="field">
            <p className="control has-icons-left">
              <input className="input"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </p>
          </div>
        </div>

        <div className="form-group mt-2">
          <div className="field">
            <p className="control has-icons-left">
              <input className="input"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
        </div>

        <div className="form-group mt-2">
          <div className="field">
            <p className="control has-icons-left">
              <input className="input"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
        </div>

        <div className="form-group mt-2">
          <div className="field">
            <p className="control has-icons-left">
              <input className="input"
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </p>
          </div>
        </div>

        <div className="form-group mt-2">
          <div className="field">
            <label className="label">Role (choose admin role if creating admin)</label>
            <div className="control">
              <div className="select">
                <select name="role" value={formData.role} onChange={handleChange}>
                  <option value="survey_admin">Survey Admin</option>
                  <option value="loader_admin">Loader Admin</option>
                  <option value="tipper_admin">Tipper Admin</option>
                  <option value="blocks_admin">Blocks Admin</option>
                  <option value="main_admin">Main Admin</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {errorMessage && <p className="error-message has-text-danger">{errorMessage}</p>}

        <button type="submit" className="button is-primary submit-button mt-2">
          Register
        </button>
      </form>
    </div>
  );
}