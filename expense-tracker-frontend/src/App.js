import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainNavigation from './components/MainNavigation';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import AuthContext from './context/AuthContext';
import './App.css';

function App() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return (
    <div>
      <MainNavigation />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              !isAuthenticated ? <AuthPage /> : <Navigate to="/dashboard" />
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? <DashboardPage /> : <Navigate to="/" />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;