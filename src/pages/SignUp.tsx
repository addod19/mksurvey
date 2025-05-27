import { useState } from 'react';

export default function Signup() {

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match!');
      setSuccessMessage('');
    } else {
      setErrorMessage('');
      setSuccessMessage('Registration Successful!');
    }
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
                <i className="fas fa-lock"></i>
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
                id="Password"
                name="Password"
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
                placeholder="confirm Password"
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
                required
              />
            </p>
          </div>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button type="submit" className="button is-primary submit-button mt-2">
          Register
        </button>
      </form>
    </div>
  );
}