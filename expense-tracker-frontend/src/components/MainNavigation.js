import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import './MainNavigation.css';

const MainNavigation = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  return (
    <header className="main-navigation">
      <div className="main-navigation__logo">
        <h1>ExpenseTracker</h1>
      </div>
      <nav className="main-navigation__nav">
        <ul>
          {isAuthenticated && user && (
            <li>
              <span className="nav-welcome">Welcome, {user.name}!</span>
            </li>
          )}
          {isAuthenticated && (
            <li>
              <button onClick={logout} className="nav-logout-btn">
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;