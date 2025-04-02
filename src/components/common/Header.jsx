import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" className="logo-link">
            Profile Map
          </Link>
        </div>
        
        <nav className="main-nav">
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link"><b>HOME</b></Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/admin" className="nav-link"><b>ADMIN</b></Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/admin" className="nav-link"><b>ADMIN Login</b></Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;