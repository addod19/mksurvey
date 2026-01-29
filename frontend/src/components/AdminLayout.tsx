import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../App.css';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const role = ((user && (user.role || (user as any).role_name)) || '').toString().toLowerCase();
  const displayName = user?.full_name || user?.name || user?.email || 'Admin';
  const initials = displayName.slice(0, 2).toUpperCase();
  const roleLabel = role
    ? role.replace(/_/g, ' ').replace(/\b\w/g, (m: string) => m.toUpperCase())
    : 'Admin';

  const navItems = [
    { label: 'Loader', to: '/dashboard/loader', roles: ['loader'] },
    { label: 'Loader Expenses', to: '/dashboard/loader/expenses', roles: ['loader'] },
    { label: 'Tipper', to: '/dashboard/tipper', roles: ['tipper'] },
    { label: 'Survey', to: '/dashboard/survey', roles: ['survey'] },
    { label: 'Blocks', to: '/dashboard/blocks', roles: ['blocks'] },
    { label: 'Main', to: '/dashboard/main', roles: ['main'] },
  ];

  const visibleItems = navItems.filter(item =>
    item.roles.some(r => role.includes(r))
  );

  return (
    <aside className="admin-sidebar">
      <div className="brand"> 
        <div className="brand-icon">{initials}</div>
        <div className="brand-meta">
          <h3 className="brand-name">{displayName}</h3>
          <p className="brand-role">{roleLabel}</p>
        </div>
      </div>
      <nav className="admin-nav">
        {visibleItems.map(item => (
          <Link key={item.to} to={item.to} className="nav-item">
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="admin-sidebar-footer">
        <div className="admin-avatar">
          {(user?.full_name || user?.name || user?.email || 'U').slice(0,2).toUpperCase()}
        </div>
        <div className="admin-user">{user?.full_name || user?.name || user?.email || 'Admin'}</div>
      </div>
    </aside>
  );
};

const Header: React.FC<{ title?: string }> = ({ title }) => (
  <header className="admin-header">
    <div className="admin-header-left">
      <h2>{title || 'Dashboard'}</h2>
      <p className="muted">Welcome back, here's what's happening</p>
    </div>
    <div className="admin-header-right">
      <div className="search-box">
        <input placeholder="Search..." />
      </div>
    </div>
  </header>
);

const StatsRow: React.FC = () => (
  <div className="admin-stats">
    <div className="stat"> <div className="stat-value">5</div> <div className="stat-label">Rental Unit</div> </div>
    <div className="stat"> <div className="stat-value">4</div> <div className="stat-label">Lease Unit</div> </div>
    <div className="stat"> <div className="stat-value">10</div> <div className="stat-label">Vacant Unit</div> </div>
    <div className="stat"> <div className="stat-value">10000</div> <div className="stat-label">Overdue</div> </div>
  </div>
);

const AdminLayout: React.FC<{ title?: string; children?: React.ReactNode; showStats?: boolean }> = ({ title, children, showStats = true }) => {
  return (
    <div className="">
      <div className="container">
        <div className="admin-card-shell">
          {/* sidebar sits inside the white card shell to match the desired design */}
          <Sidebar />
          <div className="admin-main">
            <Header title={title} />
            <div className="admin-content">
              {showStats && <StatsRow />}
              <div className="admin-panel">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
