import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const handleLinkClick = () => setIsActive(false);
  const { user, signOut, loading } = useAuth();
  const role = ((user && (user.role || (user as any).role_name)) || '').toString().toLowerCase();
  // const canSeeLoaderTipper = role.includes('loader') || role.includes('tipper') || role.includes('main');
  // const canSeeMachineRentals = role.includes('loader') || role.includes('main');
  // const canSeeBlocks = role.includes('blocks') || role.includes('main');
  const dashboardPath = role.includes('loader')
    ? '/dashboard/loader'
    : role.includes('tipper')
      ? '/dashboard/tipper'
      : role.includes('survey')
        ? '/dashboard/survey'
        : role.includes('blocks')
          ? '/dashboard/blocks'
          : role.includes('main')
            ? '/dashboard/main'
            : '/dashboard';

  // avatar menu open state
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // close menu on outside click
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  return (
    <nav className="navbar site-navbar" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item has-text-white ml-2">
            <strong>MK Surveying &amp; Construction Ltd</strong>
          </Link>

          <a
            role="button"
            className={`navbar-burger ${isActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasic"
            onClick={() => setIsActive(!isActive)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasic" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
          <div className="navbar-start">
            <Link to="/about" className="navbar-item has-text-white" onClick={handleLinkClick}>
              About
            </Link>
            <Link to="/" className="navbar-item has-text-white" onClick={handleLinkClick}>
              Home
            </Link>
            {/* {canSeeLoaderTipper && (
              <Link to="/loaderTipper" className="navbar-item has-text-white" onClick={handleLinkClick}>
                Loader and Tipper
              </Link>
            )}
            {canSeeMachineRentals && (
              <Link to="/machineRentals" className="navbar-item has-text-white" onClick={handleLinkClick}>
                Machine Rentals
              </Link>
            )}
            {canSeeBlocks && (
              <Link to="/blocks" className="navbar-item has-text-white" onClick={handleLinkClick}>
                Blocks Factory
              </Link>
            )} */}
          </div>

          <div className="navbar-end">
            <div className="navbar-item" ref={menuRef}>
              {/* Avatar button */}
              <div className="avatar-wrapper">
                <button
                  className="avatar-btn"
                  aria-haspopup="true"
                  aria-expanded={open}
                  onClick={() => setOpen((s) => !s)}
                >
                  {user ? (
                    // initials avatar when signed in
                    <span className="avatar-initials">{(user.full_name || user.name || user.email || 'U').slice(0,2).toUpperCase()}</span>
                  ) : (
                    // generic avatar icon when not signed in
                    <span className="avatar-icon">👤</span>
                  )}
                </button>

                <div className={`avatar-menu ${open ? 'is-open' : ''}`} role="menu">
                  {!loading && user ? (
                    <>
                      <div className="avatar-item avatar-email">{user.email}</div>
                      <Link to={dashboardPath} className="avatar-item" onClick={() => setOpen(false)}>
                        Admin dashboard
                      </Link>
                      <button className="avatar-item avatar-logout" onClick={() => { setOpen(false); signOut(); }}>
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="avatar-item" onClick={() => setOpen(false)}>Log in</Link>
                      <Link to="/signup" className="avatar-item" onClick={() => setOpen(false)}>
                        Sign up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
