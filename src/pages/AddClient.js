import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const AddClient = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setError('All fields are required.');
      setSuccess('');
      return;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setSuccess('');
      return;
    }
    // Basic phone validation (digits, spaces, dashes, parentheses)
    const phoneRegex = /^[0-9\s\-()+]+$/;
    if (!phoneRegex.test(phone)) {
      setError('Please enter a valid phone number.');
      setSuccess('');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setSuccess('Client added successfully!');
      setName('');
      setEmail('');
      setPhone('');
      setLoading(false);
    }, 1000);
  };

  return (
    <Layout title="Add Client">
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded shadow p-8">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Add New Client</h2>
          <Link to="/clients" className="text-indigo-600 hover:underline dark:text-indigo-400 transition-colors text-sm">&larr; Back to Clients</Link>
        </div>
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-sm">{success}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-indigo-600 text-white rounded transition-colors flex items-center justify-center ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
            disabled={loading}
          >
            {loading && (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            )}
            {loading ? 'Adding...' : 'Add Client'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddClient;
