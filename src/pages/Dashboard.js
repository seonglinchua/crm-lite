import React from 'react';
import Layout from '../components/Layout';
import { FiUsers, FiUserPlus, FiPieChart, FiAlertTriangle } from 'react-icons/fi';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, ChartTitle);

const stats = [
  {
    label: 'Total Clients',
    value: 120,
    icon: <FiUsers className="w-6 h-6" />,
    color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
  },
  {
    label: 'New This Week',
    value: 8,
    icon: <FiUserPlus className="w-6 h-6" />,
    color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  },
  {
    label: 'Total AUM',
    value: 'SGD 25M',
    icon: <FiPieChart className="w-6 h-6" />,
    color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  },
  {
    label: 'Client Types',
    value: 'SME: 70 | Corp: 50',
    icon: <FiUsers className="w-6 h-6" />,
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  },
];

const recentActivity = [
  'Acme Corp updated KYC documents',
  'Globex Inc added as new client',
  'SME client "Beta LLC" increased AUM by SGD 1M',
];

const complianceAlerts = [
  '2 clients missing KYC: Delta Ltd, Omega Pte Ltd',
  '1 client flagged for review: Alpha Holdings',
];

const clientTypeData = {
  labels: ['SME', 'Corporate'],
  datasets: [
    {
      data: [70, 50],
      backgroundColor: ['#6366f1', '#38bdf8'],
      borderWidth: 1,
    },
  ],
};

const aumGrowthData = {
  labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
  datasets: [
    {
      label: 'AUM (SGD M)',
      data: [20, 21, 22, 23, 23.5, 24, 25],
      fill: false,
      borderColor: '#6366f1',
      backgroundColor: '#6366f1',
      tension: 0.4,
    },
  ],
};

const Dashboard = () => (
  <Layout title="Dashboard Overview">
    <div className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={stat.label}
            className={`flex items-center gap-4 p-5 rounded-lg shadow bg-white dark:bg-gray-800 transition-colors ${stat.color}`}
          >
            <div>{stat.icon}</div>
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm font-medium opacity-80">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Client Types</h2>
        <Pie data={clientTypeData} options={{ plugins: { legend: { position: 'bottom' } } }} />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">AUM Growth</h2>
        <Line data={aumGrowthData} options={{ plugins: { legend: { display: false } }, scales: { y: { beginAtZero: false } } }} />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Recent Activity</h2>
        <ul className="space-y-3">
          {recentActivity.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
              <span className="inline-block w-2 h-2 bg-indigo-400 dark:bg-indigo-300 rounded-full"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <FiAlertTriangle className="text-yellow-500" /> Compliance Alerts
        </h2>
        <ul className="space-y-3">
          {complianceAlerts.map((alert, idx) => (
            <li key={idx} className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <FiAlertTriangle className="w-4 h-4" />
              {alert}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Layout>
);

export default Dashboard;
