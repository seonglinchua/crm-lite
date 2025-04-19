import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import ClientList from './pages/ClientList';
import Dashboard from './pages/Dashboard';
import AddClient from './pages/AddClient';
import ViewClient from './pages/ViewClient';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated } = useAuth();

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

        {/* View Client (Protected Route) */}
        <Route
          path="/clients/:id"
          element={
            isAuthenticated ? <ViewClient /> : <Navigate to="/" replace />
          }
        />

        {/* Add More Routes Later */}
      </Routes>
    </Router>
  );
}

export default function AppWithProvider() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}