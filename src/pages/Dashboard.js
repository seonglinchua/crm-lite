import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import {
  FiUsers, FiUserPlus, FiPieChart, FiAlertTriangle, FiCheckSquare, FiClock,
  FiUserCheck, FiTrendingUp, FiBarChart2, FiCalendar, FiArrowRight
} from 'react-icons/fi';
import { Pie, Line } from 'react-chartjs-2';
import { useTask } from '../context/TaskContext';
import { useContacts } from '../context/ContactContext';
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

const moduleCards = [
  {
    title: 'Client Management',
    description: 'Manage your clients and accounts',
    icon: <FiUsers className="w-8 h-8" />,
    link: '/clients',
    color: 'from-indigo-500 to-indigo-600',
    stats: '120 Clients'
  },
  {
    title: 'Contacts & Leads',
    description: 'Track contacts and potential leads',
    icon: <FiUserCheck className="w-8 h-8" />,
    link: '/contacts',
    color: 'from-green-500 to-green-600',
    stats: 'Dynamic from context'
  },
  {
    title: 'Tasks & Activities',
    description: 'Manage tasks and track activities',
    icon: <FiCheckSquare className="w-8 h-8" />,
    link: '/tasks',
    color: 'from-purple-500 to-purple-600',
    stats: 'Dynamic from context'
  },
  {
    title: 'Sales Pipeline',
    description: 'Track opportunities and deals',
    icon: <FiTrendingUp className="w-8 h-8" />,
    link: '/opportunities',
    color: 'from-blue-500 to-blue-600',
    stats: 'Coming soon'
  },
  {
    title: 'Reports & Analytics',
    description: 'View insights and generate reports',
    icon: <FiBarChart2 className="w-8 h-8" />,
    link: '/reports',
    color: 'from-yellow-500 to-yellow-600',
    stats: 'Available now'
  },
  {
    title: 'Calendar',
    description: 'Schedule and view your activities',
    icon: <FiCalendar className="w-8 h-8" />,
    link: '/calendar',
    color: 'from-pink-500 to-pink-600',
    stats: 'Task calendar'
  }
];

const Dashboard = () => {
  const { tasks, getOverdueTasks, getUpcomingTasks } = useTask();
  const { contacts } = useContacts();

  // Calculate task statistics
  const taskStats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    overdue: getOverdueTasks().length,
    upcoming: getUpcomingTasks(7).length
  };

  // Calculate contact statistics
  const contactStats = {
    total: contacts.length,
    leads: contacts.filter(c => c.type === 'lead').length,
    contacts: contacts.filter(c => c.type === 'contact').length
  };

  // Get recent tasks (last 5)
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <Layout title="Dashboard Overview">
      {/* Module Cards */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Quick Access
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {moduleCards.map((module, idx) => {
            let displayStats = module.stats;
            if (module.title === 'Contacts & Leads') {
              displayStats = `${contactStats.total} Total`;
            } else if (module.title === 'Tasks & Activities') {
              displayStats = `${taskStats.total} Tasks`;
            }

            return (
              <Link
                key={idx}
                to={module.link}
                className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${module.color} text-white`}>
                      {module.icon}
                    </div>
                    <FiArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transform group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                    {module.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {module.description}
                  </p>
                  <div className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                    {displayStats}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
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

      {/* Task Statistics */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Tasks & Activities Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-5 rounded-lg shadow bg-white dark:bg-gray-800 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 transition-colors">
            <div><FiCheckSquare className="w-6 h-6" /></div>
            <div>
              <div className="text-2xl font-bold">{taskStats.total}</div>
              <div className="text-sm font-medium opacity-80">Total Tasks</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-5 rounded-lg shadow bg-white dark:bg-gray-800 bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 transition-colors">
            <div><FiClock className="w-6 h-6" /></div>
            <div>
              <div className="text-2xl font-bold">{taskStats.pending}</div>
              <div className="text-sm font-medium opacity-80">Pending</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-5 rounded-lg shadow bg-white dark:bg-gray-800 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 transition-colors">
            <div><FiClock className="w-6 h-6" /></div>
            <div>
              <div className="text-2xl font-bold">{taskStats.inProgress}</div>
              <div className="text-sm font-medium opacity-80">In Progress</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-5 rounded-lg shadow bg-white dark:bg-gray-800 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 transition-colors">
            <div><FiCheckSquare className="w-6 h-6" /></div>
            <div>
              <div className="text-2xl font-bold">{taskStats.completed}</div>
              <div className="text-sm font-medium opacity-80">Completed</div>
            </div>
          </div>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Recent Tasks</h2>
          <ul className="space-y-3">
            {recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <li key={task.id} className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                  <span className="inline-block w-2 h-2 bg-purple-400 dark:bg-purple-300 rounded-full"></span>
                  <span className="truncate">{task.title}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-500 dark:text-gray-400 italic">No tasks yet</li>
            )}
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <FiAlertTriangle className="text-yellow-500" /> Alerts
          </h2>
          <ul className="space-y-3">
            {taskStats.overdue > 0 && (
              <li className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <FiAlertTriangle className="w-4 h-4" />
                {taskStats.overdue} overdue task{taskStats.overdue !== 1 ? 's' : ''}
              </li>
            )}
            {taskStats.upcoming > 0 && (
              <li className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                <FiClock className="w-4 h-4" />
                {taskStats.upcoming} task{taskStats.upcoming !== 1 ? 's' : ''} due this week
              </li>
            )}
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
};

export default Dashboard;
