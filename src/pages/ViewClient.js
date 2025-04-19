import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const mockClients = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
];

const ViewClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  const client = mockClients.find((c) => c.id === id);

  if (!client) {
    return (
      <Layout title="Client Not Found">
        <div className="p-6">Client not found.</div>
      </Layout>
    );
  }

  return (
    <Layout title={`View Client: ${client.name}`}>
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded shadow p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">{client.name}</h2>
        <div className="mb-2"><strong>Email:</strong> {client.email}</div>
        <div className="mb-2"><strong>Phone:</strong> {client.phone}</div>
        <button
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </Layout>
  );
};

export default ViewClient;
