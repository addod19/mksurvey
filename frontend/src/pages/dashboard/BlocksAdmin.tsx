import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

type BlocksForm = {
  blockSize: '' | '5in' | '6in';
  blockType: '' | 'solid' | 'hollow';
  blocksProduced: string;
  cementBags: string;
  dustTrips: string;
  dustCost: string;
  manufacturingPay: string;
  waterCost: string;
  electricityCost: string;
  blocksSold: string;
  amountSold: string;
};

type Errors = {
  blockSize?: string;
  blockType?: string;
  blocksProduced?: string;
  cementBags?: string;
  dustTrips?: string;
  dustCost?: string;
  manufacturingPay?: string;
  waterCost?: string;
  electricityCost?: string;
  blocksSold?: string;
  amountSold?: string;
};

type BlocksProduction = {
  id: number;
  block_size: string;
  block_type: string;
  blocks_produced: number;
  cement_bags: number;
  dust_trips: number;
  dust_cost: string;
  manufacturing_pay: string;
  water_cost: string;
  electricity_cost: string;
  blocks_sold: number;
  amount_sold: string;
  created_at: string;
};

const API_BASE = import.meta.env.VITE_API_BASE || '/api/v1';

export default function BlocksAdmin() {
  const [period, setPeriod] = useState<'week' | 'month'>('week');
  const [logs, setLogs] = useState<BlocksProduction[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingFields, setEditingFields] = useState({
    waterCost: '',
    electricityCost: '',
    blocksSold: '',
    amountSold: '',
  });
  const [savingEdit, setSavingEdit] = useState(false);
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [form, setForm] = useState<BlocksForm>({
    blockSize: '',
    blockType: '',
    blocksProduced: '',
    cementBags: '',
    dustTrips: '',
    dustCost: '',
    manufacturingPay: '',
    waterCost: '',
    electricityCost: '',
    blocksSold: '',
    amountSold: '',
  });
  const [errors, setErrors] = useState<Errors>({});

  const periodLabel = period === 'week' ? 'This week' : 'This month';

  const fetchLogs = async (selectedPeriod = period) => {
    setLoadingList(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/blocks_productions?period=${selectedPeriod}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      if (!res.ok) throw new Error('Failed to load logs');
      const data = await res.json();
      setLogs(Array.isArray(data) ? data : []);
    } catch {
      setLogs([]);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchLogs(period);
  }, [period]);

  const validate = () => {
    const nextErrors: Errors = {};
    if (!form.blockSize) nextErrors.blockSize = 'Select block size';
    if (!form.blockType) nextErrors.blockType = 'Select block type';
    if (!form.blocksProduced.trim()) nextErrors.blocksProduced = 'Enter blocks produced';
    if (!form.cementBags.trim()) nextErrors.cementBags = 'Enter cement bags used';
    if (!form.dustTrips.trim()) nextErrors.dustTrips = 'Enter dust trips';
    if (!form.dustCost.trim()) nextErrors.dustCost = 'Enter dust cost';
    if (!form.manufacturingPay.trim()) nextErrors.manufacturingPay = 'Enter manufacturing payment';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const toNumberOrNull = (value: string) => (value === '' ? null : Number(value));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    if (!validate()) return;

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/blocks_productions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          blocks_production: {
            block_size: form.blockSize,
            block_type: form.blockType,
            blocks_produced: form.blocksProduced,
            cement_bags: form.cementBags,
            dust_trips: form.dustTrips,
            dust_cost: form.dustCost,
            manufacturing_pay: form.manufacturingPay,
            water_cost: toNumberOrNull(form.waterCost),
            electricity_cost: toNumberOrNull(form.electricityCost),
            blocks_sold: toNumberOrNull(form.blocksSold),
            amount_sold: toNumberOrNull(form.amountSold),
          },
        }),
      });
      if (!res.ok) throw new Error('Failed to save log');
      setStatus('success');
      setForm({
        blockSize: '',
        blockType: '',
        blocksProduced: '',
        cementBags: '',
        dustTrips: '',
        dustCost: '',
        manufacturingPay: '',
        waterCost: '',
        electricityCost: '',
        blocksSold: '',
        amountSold: '',
      });
      fetchLogs(period);
    } catch {
      setStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const startEditOptional = (entry: BlocksProduction) => {
    setEditingId(entry.id);
    setEditingFields({
      waterCost: entry.water_cost !== null && entry.water_cost !== undefined ? String(entry.water_cost) : '',
      electricityCost: entry.electricity_cost !== null && entry.electricity_cost !== undefined ? String(entry.electricity_cost) : '',
      blocksSold: entry.blocks_sold !== null && entry.blocks_sold !== undefined ? String(entry.blocks_sold) : '',
      amountSold: entry.amount_sold !== null && entry.amount_sold !== undefined ? String(entry.amount_sold) : '',
    });
  };

  const cancelEditOptional = () => {
    setEditingId(null);
    setEditingFields({
      waterCost: '',
      electricityCost: '',
      blocksSold: '',
      amountSold: '',
    });
  };

  const saveOptional = async (entryId: number) => {
    setSavingEdit(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/blocks_productions/${entryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          blocks_production: {
            water_cost: toNumberOrNull(editingFields.waterCost),
            electricity_cost: toNumberOrNull(editingFields.electricityCost),
            blocks_sold: toNumberOrNull(editingFields.blocksSold),
            amount_sold: toNumberOrNull(editingFields.amountSold),
          },
        }),
      });
      if (!res.ok) throw new Error('Failed to update');
      const updated = await res.json();
      setLogs(prev => prev.map(item => (item.id === entryId ? updated : item)));
      cancelEditOptional();
    } catch {
      // keep editing mode on error
    } finally {
      setSavingEdit(false);
    }
  };

  return (
    <AdminLayout title="Blocks Factory" showStats={false}>
      <div className="blocks-admin">
        <section className="blocks-form-card">
          <div className="loader-form-head">
            <div>
              <h3>Blocks production log</h3>
              <p>Capture production, materials, expenses, and sales.</p>
            </div>
            {status === 'success' && <span className="loader-pill loader-pill--success">Saved</span>}
            {status === 'error' && <span className="loader-pill loader-pill--error">Error</span>}
          </div>

          <form className="loader-form" onSubmit={handleSubmit} noValidate>
            <div className="blocks-section">
              <h4>Production</h4>
              <div className="blocks-form-grid">
                <div className="loader-field">
                  <label>Block size</label>
                  <select name="blockSize" value={form.blockSize} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="5in">5 inches</option>
                    <option value="6in">6 inches</option>
                  </select>
                  {errors.blockSize && <span className="loader-error">{errors.blockSize}</span>}
                </div>
                <div className="loader-field">
                  <label>Block type</label>
                  <select name="blockType" value={form.blockType} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="solid">Solid</option>
                    <option value="hollow">Hollow</option>
                  </select>
                  {errors.blockType && <span className="loader-error">{errors.blockType}</span>}
                </div>
                <div className="loader-field">
                  <label>Blocks produced</label>
                  <input
                    type="number"
                    name="blocksProduced"
                    value={form.blocksProduced}
                    onChange={handleChange}
                  />
                  {errors.blocksProduced && <span className="loader-error">{errors.blocksProduced}</span>}
                </div>
              </div>
            </div>

            <div className="blocks-section">
              <h4>Materials</h4>
              <div className="blocks-form-grid">
                <div className="loader-field">
                  <label>Cement bags</label>
                  <input
                    type="number"
                    name="cementBags"
                    value={form.cementBags}
                    onChange={handleChange}
                  />
                  {errors.cementBags && <span className="loader-error">{errors.cementBags}</span>}
                </div>
                <div className="loader-field">
                  <label>Dust trips</label>
                  <input
                    type="number"
                    name="dustTrips"
                    value={form.dustTrips}
                    onChange={handleChange}
                  />
                  {errors.dustTrips && <span className="loader-error">{errors.dustTrips}</span>}
                </div>
                <div className="loader-field">
                  <label>Dust cost</label>
                  <input
                    type="number"
                    step="0.01"
                    name="dustCost"
                    value={form.dustCost}
                    onChange={handleChange}
                  />
                  {errors.dustCost && <span className="loader-error">{errors.dustCost}</span>}
                </div>
              </div>
            </div>

            <div className="blocks-section">
              <h4>Expenses & sales</h4>
              <div className="blocks-form-grid">
                <div className="loader-field">
                  <label>Manufacturing payment</label>
                  <input
                    type="number"
                    step="0.01"
                    name="manufacturingPay"
                    value={form.manufacturingPay}
                    onChange={handleChange}
                  />
                  {errors.manufacturingPay && <span className="loader-error">{errors.manufacturingPay}</span>}
                </div>
                <div className="loader-field">
                  <label>Water (optional)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="waterCost"
                    value={form.waterCost}
                    onChange={handleChange}
                  />
                  {errors.waterCost && <span className="loader-error">{errors.waterCost}</span>}
                </div>
                <div className="loader-field">
                  <label>Electricity (optional)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="electricityCost"
                    value={form.electricityCost}
                    onChange={handleChange}
                  />
                  {errors.electricityCost && <span className="loader-error">{errors.electricityCost}</span>}
                </div>
                <div className="loader-field">
                  <label>Number of blocks sold (optional)</label>
                  <input
                    type="number"
                    name="blocksSold"
                    value={form.blocksSold}
                    onChange={handleChange}
                  />
                  {errors.blocksSold && <span className="loader-error">{errors.blocksSold}</span>}
                </div>
                <div className="loader-field">
                  <label>Total amount (optional)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="amountSold"
                    value={form.amountSold}
                    onChange={handleChange}
                  />
                  {errors.amountSold && <span className="loader-error">{errors.amountSold}</span>}
                </div>
              </div>
            </div>

            <div className="loader-actions">
              <button className="button is-primary" type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save log'}
              </button>
            </div>
          </form>
        </section>

        <section className="blocks-table-card">
          <div className="loader-table-head">
            <div>
              <h4>Production log</h4>
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
                  <th>Size</th>
                  <th>Type</th>
                  <th>Produced</th>
                  <th>Cement</th>
                  <th>Dust trips</th>
                  <th>Dust cost</th>
                  <th>Manufacturing</th>
                  <th>Water</th>
                  <th>Electricity</th>
                  <th>Blocks sold</th>
                  <th>Total amount</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {loadingList && (
                  <tr>
                    <td colSpan={13} className="has-text-centered">Loading...</td>
                  </tr>
                )}
                {!loadingList && logs.length === 0 && (
                  <tr>
                    <td colSpan={13} className="has-text-centered">No logs recorded yet.</td>
                  </tr>
                )}
                {logs.map(entry => (
                  <tr key={entry.id}>
                    <td>{new Date(entry.created_at).toLocaleDateString()}</td>
                    <td>{entry.block_size}</td>
                    <td>{entry.block_type}</td>
                    <td>{entry.blocks_produced}</td>
                    <td>{entry.cement_bags}</td>
                    <td>{entry.dust_trips}</td>
                    <td>{Number(entry.dust_cost).toLocaleString()}</td>
                    <td>{Number(entry.manufacturing_pay).toLocaleString()}</td>
                    <td>
                      {editingId === entry.id ? (
                        <input
                          className="blocks-edit-input"
                          type="number"
                          step="0.01"
                          value={editingFields.waterCost}
                          onChange={(e) => setEditingFields(prev => ({ ...prev, waterCost: e.target.value }))}
                        />
                      ) : (
                        entry.water_cost !== null && entry.water_cost !== undefined
                          ? Number(entry.water_cost).toLocaleString()
                          : '-'
                      )}
                    </td>
                    <td>
                      {editingId === entry.id ? (
                        <input
                          className="blocks-edit-input"
                          type="number"
                          step="0.01"
                          value={editingFields.electricityCost}
                          onChange={(e) => setEditingFields(prev => ({ ...prev, electricityCost: e.target.value }))}
                        />
                      ) : (
                        entry.electricity_cost !== null && entry.electricity_cost !== undefined
                          ? Number(entry.electricity_cost).toLocaleString()
                          : '-'
                      )}
                    </td>
                    <td>
                      {editingId === entry.id ? (
                        <input
                          className="blocks-edit-input"
                          type="number"
                          value={editingFields.blocksSold}
                          onChange={(e) => setEditingFields(prev => ({ ...prev, blocksSold: e.target.value }))}
                        />
                      ) : (
                        entry.blocks_sold ?? '-'
                      )}
                    </td>
                    <td>
                      {editingId === entry.id ? (
                        <input
                          className="blocks-edit-input"
                          type="number"
                          step="0.01"
                          value={editingFields.amountSold}
                          onChange={(e) => setEditingFields(prev => ({ ...prev, amountSold: e.target.value }))}
                        />
                      ) : (
                        entry.amount_sold !== null && entry.amount_sold !== undefined
                          ? Number(entry.amount_sold).toLocaleString()
                          : '-'
                      )}
                    </td>
                    <td>
                      {editingId === entry.id ? (
                        <div className="blocks-edit-actions">
                          <button
                            type="button"
                            className="button is-small is-primary"
                            disabled={savingEdit}
                            onClick={() => saveOptional(entry.id)}
                          >
                            {savingEdit ? 'Saving...' : 'Save'}
                          </button>
                          <button type="button" className="button is-small" onClick={cancelEditOptional}>
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button type="button" className="button is-small" onClick={() => startEditOptional(entry)}>
                          Edit
                        </button>
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
