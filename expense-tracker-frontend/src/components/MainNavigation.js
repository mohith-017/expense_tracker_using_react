import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNavigation.css';

const MainNavigation = () => {
  return (
    <header className="main-header">
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              end // 'end' makes sure this is only active for the exact "/" path
            >
              Expenses
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              Dashboard
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;