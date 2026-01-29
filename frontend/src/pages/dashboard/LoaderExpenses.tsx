import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

type ExpenseForm = {
  fuel: string;
  washing: string;
  greasing: string;
  chopMoney: string;
};

type Errors = {
  fuel?: string;
  washing?: string;
  greasing?: string;
  chopMoney?: string;
};

type LoaderExpense = {
  id: number;
  fuel: string;
  washing: string;
  greasing: string;
  chop_money: string;
  created_at: string;
};

const API_BASE = import.meta.env.VITE_API_BASE || '/api/v1';

export default function LoaderExpenses() {
  const [period, setPeriod] = useState<'week' | 'month'>('week');
  const [expenses, setExpenses] = useState<LoaderExpense[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [form, setForm] = useState<ExpenseForm>({
    fuel: '',
    washing: '',
    greasing: '',
    chopMoney: '',
  });
  const [errors, setErrors] = useState<Errors>({});

  const periodLabel = period === 'week' ? 'This week' : 'This month';

  const fetchExpenses = async (selectedPeriod = period) => {
    setLoadingList(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/loader_expenditures?period=${selectedPeriod}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      if (!res.ok) throw new Error('Failed to load expenses');
      const data = await res.json();
      setExpenses(Array.isArray(data) ? data : []);
    } catch {
      setExpenses([]);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchExpenses(period);
  }, [period]);

  const validate = () => {
    const nextErrors: Errors = {};
    if (!form.fuel.trim()) nextErrors.fuel = 'Enter fuel cost';
    if (!form.washing.trim()) nextErrors.washing = 'Enter washing cost';
    if (!form.greasing.trim()) nextErrors.greasing = 'Enter greasing cost';
    if (!form.chopMoney.trim()) nextErrors.chopMoney = 'Enter chop money';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const res = await fetch(`${API_BASE}/loader_expenditures`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          loader_expenditure: {
            fuel: form.fuel,
            washing: form.washing,
            greasing: form.greasing,
            chop_money: form.chopMoney,
          },
        }),
      });
      if (!res.ok) throw new Error('Failed to save expenses');
      setStatus('success');
      setForm({ fuel: '', washing: '', greasing: '', chopMoney: '' });
      fetchExpenses(period);
    } catch {
      setStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const formatMoney = (value: string) =>
    Number(value || 0).toLocaleString();

  return (
    <AdminLayout title="Loader Expenses" showStats={false}>
      <div className="loader-admin">
        <section className="loader-form-card">
          <div className="loader-form-head">
            <div>
              <h3>Log expenditure</h3>
              <p>Record expenses for fuel and daily upkeep.</p>
            </div>
            {status === 'success' && <span className="loader-pill loader-pill--success">Saved</span>}
            {status === 'error' && <span className="loader-pill loader-pill--error">Error</span>}
          </div>

          <form className="loader-form" onSubmit={handleSubmit} noValidate>
            <div className="loader-form-grid">
              <div className="loader-field">
                <label>Fuel</label>
                <input
                  type="number"
                  step="0.01"
                  name="fuel"
                  placeholder="0.00"
                  value={form.fuel}
                  onChange={handleChange}
                />
                {errors.fuel && <span className="loader-error">{errors.fuel}</span>}
              </div>

              <div className="loader-field">
                <label>Washing</label>
                <input
                  type="number"
                  step="0.01"
                  name="washing"
                  placeholder="0.00"
                  value={form.washing}
                  onChange={handleChange}
                />
                {errors.washing && <span className="loader-error">{errors.washing}</span>}
              </div>

              <div className="loader-field">
                <label>Greasing</label>
                <input
                  type="number"
                  step="0.01"
                  name="greasing"
                  placeholder="0.00"
                  value={form.greasing}
                  onChange={handleChange}
                />
                {errors.greasing && <span className="loader-error">{errors.greasing}</span>}
              </div>

              <div className="loader-field">
                <label>Chop money</label>
                <input
                  type="number"
                  step="0.01"
                  name="chopMoney"
                  placeholder="0.00"
                  value={form.chopMoney}
                  onChange={handleChange}
                />
                {errors.chopMoney && <span className="loader-error">{errors.chopMoney}</span>}
              </div>
            </div>

            <div className="loader-actions">
              <button className="button is-primary" type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save expenses'}
              </button>
            </div>
          </form>
        </section>

        <section className="loader-table-card">
          <div className="loader-table-head">
            <div>
              <h4>Expense log</h4>
              <p>Showing {periodLabel} entries.</p>
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
                  <th>Fuel</th>
                  <th>Washing</th>
                  <th>Greasing</th>
                  <th>Chop money</th>
                </tr>
              </thead>
              <tbody>
                {loadingList && (
                  <tr>
                    <td colSpan={5} className="has-text-centered">Loading...</td>
                  </tr>
                )}
                {!loadingList && expenses.length === 0 && (
                  <tr>
                    <td colSpan={5} className="has-text-centered">No expenses recorded yet.</td>
                  </tr>
                )}
                {expenses.map(expense => (
                  <tr key={expense.id}>
                    <td>{new Date(expense.created_at).toLocaleDateString()}</td>
                    <td>GHS{formatMoney(expense.fuel)}</td>
                    <td>GHS{formatMoney(expense.washing)}</td>
                    <td>GHS{formatMoney(expense.greasing)}</td>
                    <td>GHS{formatMoney(expense.chop_money)}</td>
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
