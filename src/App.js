import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import ClientList from './pages/ClientList';
import Dashboard from './pages/Dashboard';
import AddClient from './pages/AddClient';
import ViewClient from './pages/ViewClient';
import ContactList from './pages/ContactList';
import AddContact from './pages/AddContact';
import ViewContact from './pages/ViewContact';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import ViewTask from './pages/ViewTask';
import { AuthProvider } from './context/AuthContext';
import { ContactProvider } from './context/ContactContext';
import { TaskProvider } from './context/TaskContext';
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

        {/* Contact List (Protected Route) */}
        <Route
          path="/contacts"
          element={
            isAuthenticated ? <ContactList /> : <Navigate to="/" replace />
          }
        />

        {/* Add Contact (Protected Route) */}
        <Route
          path="/contacts/add"
          element={
            isAuthenticated ? <AddContact /> : <Navigate to="/" replace />
          }
        />

        {/* View Contact (Protected Route) */}
        <Route
          path="/contacts/:id"
          element={
            isAuthenticated ? <ViewContact /> : <Navigate to="/" replace />
          }
        />

        {/* Task List (Protected Route) */}
        <Route
          path="/tasks"
          element={
            isAuthenticated ? <TaskList /> : <Navigate to="/" replace />
          }
        />

        {/* Add Task (Protected Route) */}
        <Route
          path="/tasks/add"
          element={
            isAuthenticated ? <AddTask /> : <Navigate to="/" replace />
          }
        />

        {/* View Task (Protected Route) */}
        <Route
          path="/tasks/:id"
          element={
            isAuthenticated ? <ViewTask /> : <Navigate to="/" replace />
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
      <ContactProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </ContactProvider>
    </AuthProvider>
  );
}