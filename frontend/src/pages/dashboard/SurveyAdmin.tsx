import { useState } from 'react';

export default function SurveyAdmin() {
  const [form, setForm] = useState({
    machineColor: '',
    last4: '',
    rentee: '',
    tookStick: 'no',
    points: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with API
    console.log('Survey rental submitted', form);
    alert('Survey rental recorded (frontend only)');
  };

  return (
    <div>
      <h2 className="title is-4">Survey Rentals (Secretary)</h2>
      <form onSubmit={handleSubmit} className="box">
        <div className="field">
          <label className="label">Machine color</label>
          <div className="control">
            <input name="machineColor" value={form.machineColor} onChange={handleChange} className="input" placeholder="e.g. Yellow" />
          </div>
        </div>

        <div className="field">
          <label className="label">Last 4 digits</label>
          <div className="control">
            <input name="last4" value={form.last4} onChange={handleChange} className="input" placeholder="e.g. 1234" maxLength={4} />
          </div>
        </div>

        <div className="field">
          <label className="label">Rentee name</label>
          <div className="control">
            <input name="rentee" value={form.rentee} onChange={handleChange} className="input" placeholder="Full name" />
          </div>
        </div>

        <div className="field">
          <label className="label">Took stick?</label>
          <div className="control">
            <div className="select">
              <select name="tookStick" value={form.tookStick} onChange={handleChange}>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Number of points (optional)</label>
          <div className="control">
            <input name="points" value={form.points} onChange={handleChange} className="input" placeholder="e.g. 50" />
          </div>
        </div>

        <div className="field mt-3">
          <div className="control">
            <button className="button is-primary">Record Rental</button>
          </div>
        </div>
      </form>
    </div>
  );
}
