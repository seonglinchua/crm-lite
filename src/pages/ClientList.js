import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';

const dummyClients = [
  { id: 1, name: "Acme Corp", email: "acme@example.com", phone: "123-456-7890" },
  { id: 2, name: "Globex Inc", email: "globex@example.com", phone: "987-654-3210" },
];

const ClientList = () => {
  return (
    <Layout title="Clients">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <Link
            to="/clients/add"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            + Add Client
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow transition-colors">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-200 text-sm">
            {dummyClients.map((client) => (
              <tr key={client.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                <td className="py-3 px-6">{client.name}</td>
                <td className="py-3 px-6">{client.email}</td>
                <td className="py-3 px-6">{client.phone}</td>
                <td className="py-3 px-6">
                  <Link
                    to={`/clients/${client.id}`}
                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ClientList;
