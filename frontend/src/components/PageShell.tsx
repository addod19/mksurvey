import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  title?: string;
  showSidebar?: boolean;
  children?: React.ReactNode;
};

export default function PageShell({ title, showSidebar = true, children }: Props) {
  return (
    <div className="page-shell">
      {showSidebar && (
        <aside className="page-rail">
          <div className="page-rail-brand">
            <img src="/assets/admin-logo.png" alt="brand" />
          </div>
          <nav className="page-rail-nav">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/blocks">Blocks</Link>
            <Link to="/loaderTipper">Loader & Tipper</Link>
          </nav>
          <div className="page-rail-footer">MK</div>
        </aside>
      )}

      <div className="page-shell-card container">
        <header className="page-shell-header">
          <div>
            <h2 className="title is-4">{title}</h2>
            <p className="muted">Welcome — explore our services and latest updates.</p>
          </div>
          <div className="page-shell-search">
            <input placeholder="Search..." />
          </div>
        </header>

        <div className="page-shell-body">{children}</div>
      </div>
    </div>
  );
}
