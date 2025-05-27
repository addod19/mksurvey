import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const handleLinkClick = () => setIsActive(false);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item has-text-white ml-2" href="/">
          <strong>MK Surveying&Construction Ltd</strong>
        </a>

        <a
          role="button"
          className={`navbar-burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasic"
          onClick={() => setIsActive(!isActive)}
        >
          <span className="has-background-danger" aria-hidden="true"></span>
          <span className="has-background-danger" aria-hidden="true"></span>
          <span className="has-background-danger" aria-hidden="true"></span>
          <span className="has-background-danger" aria-hidden="true"></span>
          <span className="has-background-danger" aria-hidden="true"></span>
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
          <>
            <Link to="/loaderTipper" className="navbar-item has-text-white" onClick={handleLinkClick}>
              Loader and Tipper
            </Link>
            <Link to="/machineRentals" className="navbar-item has-text-white" onClick={handleLinkClick}>
              Machine Rentals
            </Link>
            <Link to="/blocks" className="navbar-item has-text-white" onClick={handleLinkClick}>
              Blocks Factory
            </Link>
          </>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/login"
                className="button is-danger has-text-white"
                onClick={handleLinkClick}>
                Log in
              </Link>
              <Link to="/signup"
                className="button is-danger has-text-white mr-2"
                onClick={handleLinkClick}>
                <strong>Sign up</strong>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
