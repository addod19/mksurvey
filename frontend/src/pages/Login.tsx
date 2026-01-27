import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';



export default function Login() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const res = await auth.signIn(formData.email, formData.password);
    if (!res.ok) setErrorMessage(res.error || 'Login failed');
    else navigate('/');
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
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

        {errorMessage && <p className="error-message has-text-danger">{errorMessage}</p>}

        <button type="submit" className="button is-primary submit-button mt-2">
          Login
        </button>
      </form>
    </div>
  );
}