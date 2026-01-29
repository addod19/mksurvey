import { useState } from 'react';


export default function MachineRentals() {
  const [formData, setFormData] = useState({
    date: '',
    job_funds: '',
    fuel: '',
    chop_money: '',
    balance: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
  };

  return (
    <div className="form-container">
      <h2>Loader Database</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group mt-2">
          <div className="field">
            <p className="control has-icons-left">
              <input className="input"
                type="date"
                id="date"
                name="date"
                placeholder="Date"
                value={formData.date}
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
                type="number"
                step="0.01"
                min="0"
                id="job_funds"
                name="job_funds"
                placeholder="Job Funds"
                value={formData.job_funds}
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
                type="number"
                step="0.01"
                min="0"
                id="fuel"
                name="fuel"
                placeholder="Fuel"
                value={formData.fuel}
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
                type="number"
                id="chop_money"
                step="0.01"
                min="0"
                name="chop_money"
                placeholder="Chop Money"
                value={formData.chop_money}
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
                type="number"
                id="balance"
                step="0.01"
                min="0" 
                name="balance"
                placeholder="Balance"
                value={formData.balance}
                onChange={handleChange}
                required
              />
            </p>
          </div>
        </div>

        <button type="submit" className="button is-primary submit-button mt-2">
          Save
        </button>
      </form>
    </div>
  );
}