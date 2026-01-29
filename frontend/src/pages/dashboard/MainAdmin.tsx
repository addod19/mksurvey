import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

type LoaderRental = {
  price_charged: string;
};

type LoaderExpense = {
  fuel: string;
  washing: string;
  greasing: string;
  chop_money: string;
};

const API_BASE = import.meta.env.VITE_API_BASE || '/api/v1';

const sampleAdmins = [
  { id: 1, name: 'Samuel Lucas', email: 'samuel@example.com', role: 'loader_admin', status: 'active', lastLogin: '2026-01-28' },
  { id: 2, name: 'Grace N.', email: 'grace@example.com', role: 'tipper_admin', status: 'active', lastLogin: '2026-01-27' },
  { id: 3, name: 'Ibrahim K.', email: 'ibrahim@example.com', role: 'survey_admin', status: 'suspended', lastLogin: '2025-12-21' },
  { id: 4, name: 'Marta O.', email: 'marta@example.com', role: 'blocks_admin', status: 'active', lastLogin: '2026-01-20' },
];

export default function MainAdmin() {
  const totalAdmins = sampleAdmins.length;
  const activeAdmins = sampleAdmins.filter(a => a.status === 'active').length;
  const suspendedAdmins = sampleAdmins.filter(a => a.status !== 'active').length;
  const [plPeriod, setPlPeriod] = useState<'week' | 'month'>('week');
  const [plTotals, setPlTotals] = useState({ revenue: 0, expenses: 0, balance: 0 });
  const [plLoading, setPlLoading] = useState(false);

  const fetchProfitLoss = async (period: 'week' | 'month') => {
    setPlLoading(true);
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
      const [rentalsRes, expensesRes] = await Promise.all([
        fetch(`${API_BASE}/loader_rentals?period=${period}`, { headers }),
        fetch(`${API_BASE}/loader_expenditures?period=${period}`, { headers }),
      ]);

      if (!rentalsRes.ok || !expensesRes.ok) throw new Error('Failed to load');

      const rentals: LoaderRental[] = await rentalsRes.json();
      const expenses: LoaderExpense[] = await expensesRes.json();

      const revenue = rentals.reduce((sum, rental) => sum + Number(rental.price_charged || 0), 0);
      const expensesTotal = expenses.reduce(
        (sum, exp) =>
          sum +
          Number(exp.fuel || 0) +
          Number(exp.washing || 0) +
          Number(exp.greasing || 0) +
          Number(exp.chop_money || 0),
        0
      );
      const balance = revenue - expensesTotal;

      setPlTotals({ revenue, expenses: expensesTotal, balance });
    } catch {
      setPlTotals({ revenue: 0, expenses: 0, balance: 0 });
    } finally {
      setPlLoading(false);
    }
  };

  useEffect(() => {
    fetchProfitLoss(plPeriod);
  }, [plPeriod]);

  const formatMoney = (value: number) => value.toLocaleString();

  return (
    <AdminLayout title="Main Admin" showStats={false}>
      <div className="main-dashboard">
        <section className="main-dashboard-hero">
          <div className="hero-left">
            <h1 className="title is-4">Platform Admin Overview</h1>
            <p className="subtitle">Monitor and manage all administrative users and site-wide activity.</p>
          </div>
          <div className="hero-actions">
            <button className="button is-primary">Invite Admin</button>
            <button className="button">Export</button>
          </div>
        </section>

        <section className="pl-card">
          <div className="pl-head">
            <div>
              <h3>Loader profit &amp; loss</h3>
              <p>Summary for {plPeriod === 'week' ? 'this week' : 'this month'}.</p>
            </div>
            <div className="loader-period-toggle">
              <button
                type="button"
                className={plPeriod === 'week' ? 'is-active' : ''}
                onClick={() => setPlPeriod('week')}
              >
                This week
              </button>
              <button
                type="button"
                className={plPeriod === 'month' ? 'is-active' : ''}
                onClick={() => setPlPeriod('month')}
              >
                This month
              </button>
            </div>
          </div>
          <div className="pl-grid">
            <div className="card summary-card">
              <div className="card-content">
                <div className="summary-label">Revenue</div>
                <div className="pl-value">{plLoading ? '—' : formatMoney(plTotals.revenue)}</div>
              </div>
            </div>
            <div className="card summary-card">
              <div className="card-content">
                <div className="summary-label">Expenses</div>
                <div className="pl-value">{plLoading ? '—' : formatMoney(plTotals.expenses)}</div>
              </div>
            </div>
            <div className="card summary-card">
              <div className="card-content">
                <div className="summary-label">Balance</div>
                <div className={`pl-value ${plTotals.balance < 0 ? 'pl-negative' : ''}`}>
                  {plLoading ? '—' : formatMoney(plTotals.balance)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="admin-cards-grid">
          <div className="card summary-card">
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <div className="summary-icon">👥</div>
                </div>
                <div className="media-content">
                  <div className="summary-value">{totalAdmins}</div>
                  <div className="summary-label">Total Admins</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card summary-card">
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <div className="summary-icon">✅</div>
                </div>
                <div className="media-content">
                  <div className="summary-value">{activeAdmins}</div>
                  <div className="summary-label">Active</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card summary-card">
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <div className="summary-icon">⏸️</div>
                </div>
                <div className="media-content">
                  <div className="summary-value">{suspendedAdmins}</div>
                  <div className="summary-label">Suspended</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card summary-card">
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <div className="summary-icon">📈</div>
                </div>
                <div className="media-content">
                  <div className="summary-value">—</div>
                  <div className="summary-label">Activity</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-main-grid">
          <div className="panel-left">
              <div className="card dark-card">
              <header className="card-header">
                <p className="card-header-title">Administrators</p>
              </header>
              <div className="card-content">
                <div className="admin-table-wrap">
                  <table className="table is-fullwidth is-hoverable admins-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Last login</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleAdmins.map(a => (
                        <tr key={a.id}>
                          <td>
                            <div style={{display:'flex', alignItems:'center', gap:12}}>
                              <div className="admin-list-avatar">{a.name.split(' ').map(n => n[0]).join('').slice(0,2)}</div>
                              <div>
                                <div className="has-text-weight-semibold">{a.name}</div>
                                <div className="is-size-7 has-text-grey">ID: {a.id}</div>
                              </div>
                            </div>
                          </td>
                          <td>{a.email}</td>
                          <td><span className="tag is-light">{a.role}</span></td>
                          <td>{a.status === 'active' ? <span className="badge badge-success">Active</span> : <span className="badge badge-warning">{a.status}</span>}</td>
                          <td>{a.lastLogin}</td>
                          <td style={{textAlign:'right'}}>
                            <button className="button is-small">Edit</button>
                            <button className="button is-small ml-2">Suspend</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <aside className="panel-right">
            <div className="card dark-card">
              <div className="card-content">
                <h4 className="title is-6">Recent activity</h4>
                <ul>
                  <li className="is-size-7">Samuel logged in 2 hours ago</li>
                  <li className="is-size-7">Grace invited new tipper (pending)</li>
                  <li className="is-size-7">Marta updated blocks factory status</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AdminLayout>
  );
}
