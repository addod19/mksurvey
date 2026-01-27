import { useState } from 'react';

export default function BlocksAdmin() {
  const [form, setForm] = useState({
    cementUsed: '',
    cementLeft: '',
    produced: '',
    damaged: '',
    orderType: '5in',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Blocks input', form);
    alert('Blocks data recorded (frontend only)');
  };

  return (
    <div>
      <h2 className="title is-4">Blocks Factory Admin</h2>
      <form onSubmit={handleSubmit} className="box">
        <div className="field">
          <label className="label">Cement used (bags)</label>
          <div className="control">
            <input name="cementUsed" value={form.cementUsed} onChange={handleChange} className="input" />
          </div>
        </div>

        <div className="field">
          <label className="label">Cement left (bags)</label>
          <div className="control">
            <input name="cementLeft" value={form.cementLeft} onChange={handleChange} className="input" />
          </div>
        </div>

        <div className="field">
          <label className="label">Blocks produced today</label>
          <div className="control">
            <input name="produced" value={form.produced} onChange={handleChange} className="input" />
          </div>
        </div>

        <div className="field">
          <label className="label">Damaged blocks</label>
          <div className="control">
            <input name="damaged" value={form.damaged} onChange={handleChange} className="input" />
          </div>
        </div>

        <div className="field">
          <label className="label">Order type</label>
          <div className="control">
            <div className="select">
              <select name="orderType" value={form.orderType} onChange={handleChange}>
                <option value="5in">5 inches</option>
                <option value="6in">6 inches</option>
                <option value="solid">Solid</option>
                <option value="hollow">Hollow</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field mt-3">
          <div className="control">
            <button className="button is-primary">Record</button>
          </div>
        </div>
      </form>
    </div>
  );
}
