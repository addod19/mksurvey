import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

type SurveyForm = {
  machineColor: string;
  last4: string;
  rentee: string;
  tookStick: 'yes' | 'no';
  points: string;
};

type Errors = {
  machineColor?: string;
  last4?: string;
  rentee?: string;
  tookStick?: string;
};

type SurveyRental = {
  id: number;
  machine_color: string;
  last_four_digits: string;
  rentee_name: string;
  took_stick: boolean;
  points: number | null;
  created_at: string;
};

const API_BASE = import.meta.env.VITE_API_BASE || '/api/v1';

export default function SurveyAdmin() {
  const [period, setPeriod] = useState<'week' | 'month'>('week');
  const [rentals, setRentals] = useState<SurveyRental[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingPoints, setEditingPoints] = useState('');
  const [savingPoint, setSavingPoint] = useState(false);
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [form, setForm] = useState<SurveyForm>({
    machineColor: '',
    last4: '',
    rentee: '',
    tookStick: 'no',
    points: '',
  });
  const [errors, setErrors] = useState<Errors>({});

  const periodLabel = period === 'week' ? 'This week' : 'This month';

  const fetchRentals = async (selectedPeriod = period) => {
    setLoadingList(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/survey_rentals?period=${selectedPeriod}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      if (!res.ok) throw new Error('Failed to load rentals');
      const data = await res.json();
      setRentals(Array.isArray(data) ? data : []);
    } catch {
      setRentals([]);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchRentals(period);
  }, [period]);

  const validate = () => {
    const nextErrors: Errors = {};
    if (!form.machineColor.trim()) nextErrors.machineColor = 'Enter machine color';
    if (!form.last4.trim()) nextErrors.last4 = 'Enter last 4 digits';
    if (!form.rentee.trim()) nextErrors.rentee = 'Enter rentee name';
    if (!form.tookStick) nextErrors.tookStick = 'Select an option';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    if (!validate()) return;

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/survey_rentals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          survey_rental: {
            machine_color: form.machineColor,
            last_four_digits: form.last4,
            rentee_name: form.rentee,
            took_stick: form.tookStick === 'yes',
            points: form.points ? Number(form.points) : null,
          },
        }),
      });
      if (!res.ok) throw new Error('Failed to save rental');
      setStatus('success');
      setForm({
        machineColor: '',
        last4: '',
        rentee: '',
        tookStick: 'no',
        points: '',
      });
      fetchRentals(period);
    } catch {
      setStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const startEditPoints = (rental: SurveyRental) => {
    setEditingId(rental.id);
    setEditingPoints(rental.points !== null && rental.points !== undefined ? String(rental.points) : '');
  };

  const cancelEditPoints = () => {
    setEditingId(null);
    setEditingPoints('');
  };

  const savePoints = async (rentalId: number) => {
    setSavingPoint(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/survey_rentals/${rentalId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          survey_rental: {
            points: editingPoints === '' ? null : Number(editingPoints),
          },
        }),
      });
      if (!res.ok) throw new Error('Failed to update points');
      const updated = await res.json();
      setRentals((prev) => prev.map((r) => (r.id === rentalId ? updated : r)));
      cancelEditPoints();
    } catch {
      // keep edit mode so admin can retry
    } finally {
      setSavingPoint(false);
    }
  };

  return (
    <AdminLayout title="Survey Rentals" showStats={false}>
      <div className="survey-admin">
        <section className="survey-form-card">
          <div className="loader-form-head">
            <div>
              <h3>Log survey rental</h3>
              <p>Record field equipment usage and rentee details.</p>
            </div>
            {status === 'success' && <span className="loader-pill loader-pill--success">Saved</span>}
            {status === 'error' && <span className="loader-pill loader-pill--error">Error</span>}
          </div>

          <form className="loader-form" onSubmit={handleSubmit} noValidate>
            <div className="survey-form-grid">
              <div className="loader-field">
                <label>Machine color</label>
                <input
                  type="text"
                  name="machineColor"
                  placeholder="e.g. Yellow"
                  value={form.machineColor}
                  onChange={handleChange}
                />
                {errors.machineColor && <span className="loader-error">{errors.machineColor}</span>}
              </div>

              <div className="loader-field">
                <label>Last 4 digits</label>
                <input
                  type="text"
                  name="last4"
                  placeholder="e.g. 1234"
                  maxLength={4}
                  value={form.last4}
                  onChange={handleChange}
                />
                {errors.last4 && <span className="loader-error">{errors.last4}</span>}
              </div>

              <div className="loader-field">
                <label>Rentee name</label>
                <input
                  type="text"
                  name="rentee"
                  placeholder="Full name"
                  value={form.rentee}
                  onChange={handleChange}
                />
                {errors.rentee && <span className="loader-error">{errors.rentee}</span>}
              </div>

              <div className="loader-field">
                <label>Took stick?</label>
                <select name="tookStick" value={form.tookStick} onChange={handleChange}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.tookStick && <span className="loader-error">{errors.tookStick}</span>}
              </div>

              <div className="loader-field">
                <label>Number of points (optional)</label>
                <input
                  type="number"
                  name="points"
                  placeholder="e.g. 50"
                  value={form.points}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="loader-actions">
              <button className="button is-primary" type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Record rental'}
              </button>
            </div>
          </form>
        </section>

        <section className="survey-table-card">
          <div className="loader-table-head">
            <div>
              <h4>Rental log</h4>
              <p>Showing {periodLabel} rentals.</p>
            </div>
            <div className="loader-period-toggle">
              <button
                type="button"
                className={period === 'week' ? 'is-active' : ''}
                onClick={() => setPeriod('week')}
              >
                This week
              </button>
              <button
                type="button"
                className={period === 'month' ? 'is-active' : ''}
                onClick={() => setPeriod('month')}
              >
                This month
              </button>
            </div>
          </div>

          <div className="loader-table-wrap">
            <table className="table is-fullwidth">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Machine color</th>
                  <th>Last 4</th>
                  <th>Rentee</th>
                  <th>Took stick</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {loadingList && (
                  <tr>
                    <td colSpan={6} className="has-text-centered">Loading...</td>
                  </tr>
                )}
                {!loadingList && rentals.length === 0 && (
                  <tr>
                    <td colSpan={6} className="has-text-centered">No rentals recorded yet.</td>
                  </tr>
                )}
                {rentals.map(rental => (
                  <tr key={rental.id}>
                    <td>{new Date(rental.created_at).toLocaleDateString()}</td>
                    <td>{rental.machine_color}</td>
                    <td>{rental.last_four_digits}</td>
                    <td>{rental.rentee_name}</td>
                    <td>{rental.took_stick ? 'Yes' : 'No'}</td>
                    <td>
                      {editingId === rental.id ? (
                        <div className="points-edit">
                          <input
                            type="number"
                            value={editingPoints}
                            onChange={(e) => setEditingPoints(e.target.value)}
                            placeholder="Points"
                          />
                          <button
                            className="button is-small is-primary"
                            type="button"
                            disabled={savingPoint}
                            onClick={() => savePoints(rental.id)}
                          >
                            {savingPoint ? 'Saving...' : 'Save'}
                          </button>
                          <button className="button is-small" type="button" onClick={cancelEditPoints}>
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="points-display">
                          <span>{rental.points ?? '—'}</span>
                          <button className="button is-small" type="button" onClick={() => startEditPoints(rental)}>
                            Edit
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
