import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

type RentalForm = {
  workType: 'half_day' | 'full_day' | 'contract' | '';
  priceCharged: string;
  clientName: string;
  clientContact: string;
};

type Errors = {
  workType?: string;
  priceCharged?: string;
  clientName?: string;
  clientContact?: string;
};

type LoaderRental = {
  id: number;
  work_type: string;
  price_charged: string;
  client_name: string;
  client_contact: string;
  created_at: string;
};

const API_BASE = import.meta.env.VITE_API_BASE || '/api/v1';

export default function LoaderAdmin() {
  const [period, setPeriod] = useState<'week' | 'month'>('week');
  const [searchTerm, setSearchTerm] = useState('');
  const [rentals, setRentals] = useState<LoaderRental[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [form, setForm] = useState<RentalForm>({
    workType: '',
    priceCharged: '',
    clientName: '',
    clientContact: '',
  });
  const [errors, setErrors] = useState<Errors>({});

  const periodLabel = period === 'week' ? 'This week' : 'This month';

  const filteredRentals = rentals.filter((rental) => {
    if (!searchTerm.trim()) return true;
    const query = searchTerm.toLowerCase();
    const dateObj = new Date(rental.created_at);
    const dateIso = isNaN(dateObj.getTime()) ? '' : dateObj.toISOString().slice(0, 10);
    const dateLocal = isNaN(dateObj.getTime()) ? '' : dateObj.toLocaleDateString();
    return (
      rental.client_name.toLowerCase().includes(query) ||
      dateIso.includes(query) ||
      dateLocal.toLowerCase().includes(query)
    );
  });

  const fetchRentals = async (selectedPeriod = period) => {
    setLoadingList(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/loader_rentals?period=${selectedPeriod}`, {
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
    if (!form.workType) nextErrors.workType = 'Select a work type';
    if (!form.priceCharged.trim()) nextErrors.priceCharged = 'Enter price charged';
    if (!form.clientName.trim()) nextErrors.clientName = 'Enter client name';
    if (!form.clientContact.trim()) nextErrors.clientContact = 'Enter client contact';
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
      const res = await fetch(`${API_BASE}/loader_rentals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          loader_rental: {
            work_type: form.workType,
            price_charged: form.priceCharged,
            client_name: form.clientName,
            client_contact: form.clientContact,
          },
        }),
      });
      if (!res.ok) throw new Error('Failed to save rental');
      setStatus('success');
      setForm({ workType: '', priceCharged: '', clientName: '', clientContact: '' });
      fetchRentals(period);
    } catch {
      setStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const formatWorkType = (value: string) =>
    value.replace('_', ' ').replace(/\b\w/g, (m) => m.toUpperCase());

  return (
    <AdminLayout title="Loader Rentals" showStats={false}>
      <div className="loader-admin">
        <section className="loader-form-card">
          <div className="loader-form-head">
            <div>
              <h3>Log loader rental</h3>
              <p>Record today's loader work and client details.</p>
            </div>
            <div className="loader-head-actions">
              <Link to="/dashboard/loader/expenses" className="button is-light">
                Add expenditure
              </Link>
              {status === 'success' && <span className="loader-pill loader-pill--success">Saved</span>}
              {status === 'error' && <span className="loader-pill loader-pill--error">Error</span>}
            </div>
          </div>

          <form className="loader-form" onSubmit={handleSubmit} noValidate>
            <div className="loader-form-grid">
              <div className="loader-field">
                <label>Type of work</label>
                <select name="workType" value={form.workType} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="half_day">Half day</option>
                  <option value="full_day">Full day</option>
                  <option value="contract">Contract</option>
                </select>
                {errors.workType && <span className="loader-error">{errors.workType}</span>}
              </div>

              <div className="loader-field">
                <label>Price charged</label>
                <input
                  type="number"
                  step="0.01"
                  name="priceCharged"
                  placeholder="0.00"
                  value={form.priceCharged}
                  onChange={handleChange}
                />
                {errors.priceCharged && <span className="loader-error">{errors.priceCharged}</span>}
              </div>

              <div className="loader-field">
                <label>Client name</label>
                <input
                  type="text"
                  name="clientName"
                  placeholder="Client name"
                  value={form.clientName}
                  onChange={handleChange}
                />
                {errors.clientName && <span className="loader-error">{errors.clientName}</span>}
              </div>

              <div className="loader-field">
                <label>Client contact</label>
                <input
                  type="text"
                  name="clientContact"
                  placeholder="Phone or email"
                  value={form.clientContact}
                  onChange={handleChange}
                />
                {errors.clientContact && <span className="loader-error">{errors.clientContact}</span>}
              </div>
            </div>

            <div className="loader-actions">
              <button className="button is-primary" type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save rental'}
              </button>
            </div>
          </form>
        </section>

        <section className="loader-table-card">
          <div className="loader-table-head">
            <div>
              <h4>Work log</h4>
              <p>Showing {periodLabel} rentals.</p>
            </div>
            <div className="loader-table-actions">
              <div className="loader-search">
                <input
                  type="text"
                  placeholder="Search by client or date (YYYY-MM-DD)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
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
          </div>

          <div className="loader-table-wrap">
            <table className="table is-fullwidth">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Work type</th>
                  <th>Client</th>
                  <th>Contact</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {loadingList && (
                  <tr>
                    <td colSpan={5} className="has-text-centered">Loading...</td>
                  </tr>
                )}
                {!loadingList && filteredRentals.length === 0 && (
                  <tr>
                    <td colSpan={5} className="has-text-centered">No rentals recorded yet.</td>
                  </tr>
                )}
                {filteredRentals.map(rental => (
                  <tr key={rental.id}>
                    <td>{new Date(rental.created_at).toLocaleDateString()}</td>
                    <td>{formatWorkType(rental.work_type)}</td>
                    <td>{rental.client_name}</td>
                    <td>{rental.client_contact}</td>
                    <td>GHS{Number(rental.price_charged).toLocaleString()}</td>
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
