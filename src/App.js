import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import ClientList from './pages/ClientList';
import Dashboard from './pages/Dashboard';
import AddClient from './pages/AddClient';

function App() {
  const isAuthenticated = localStorage.getItem('loggedIn') === 'true';

  return (
    <Router basename="/crm-lite">
      <Routes>
        {/* Login Page */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginForm />
          }
        />

        {/* Dashboard Route (Protected) */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />
          }
        />

        {/* Client List (Protected Route) */}
        <Route
          path="/clients"
          element={
            isAuthenticated ? <ClientList /> : <Navigate to="/" replace />
          }
        />

        {/* Add Client (Protected Route) */}
        <Route
          path="/clients/add"
          element={
            isAuthenticated ? <AddClient /> : <Navigate to="/" replace />
          }
        />

        {/* Add More Routes Later */}
      </Routes>
    </Router>
  );
}

export default App;