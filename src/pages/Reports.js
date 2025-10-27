import React, { useState } from 'react';
import Layout from '../components/Layout';
import {
  FiDownload, FiTrendingUp, FiDollarSign,
  FiCheckSquare, FiUserCheck
} from 'react-icons/fi';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { useTask } from '../context/TaskContext';
import { useContacts } from '../context/ContactContext';
import { useOpportunity } from '../context/OpportunityContext';

const Reports = () => {
  const { tasks } = useTask();
  const { contacts } = useContacts();
  const { opportunities, getPipelineStats } = useOpportunity();
  const [dateRange, setDateRange] = useState('30days');

  const pipelineStats = getPipelineStats();

  // Task Status Distribution
  const taskStatusData = {
    labels: ['Pending', 'In Progress', 'Completed'],
    datasets: [{
      data: [
        tasks.filter(t => t.status === 'pending').length,
        tasks.filter(t => t.status === 'in-progress').length,
        tasks.filter(t => t.status === 'completed').length
      ],
      backgroundColor: ['#FCD34D', '#A78BFA', '#34D399'],
      borderWidth: 0
    }]
  };

  // Contact Type Distribution
  const contactTypeData = {
    labels: ['Contacts', 'Leads'],
    datasets: [{
      data: [
        contacts.filter(c => c.type === 'contact').length,
        contacts.filter(c => c.type === 'lead').length
      ],
      backgroundColor: ['#6366F1', '#10B981'],
      borderWidth: 0
    }]
  };

  // Opportunity Pipeline by Stage
  const pipelineData = {
    labels: ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'],
    datasets: [{
      label: 'Number of Opportunities',
      data: [
        pipelineStats.byStage.prospecting?.count || 0,
        pipelineStats.byStage.qualification?.count || 0,
        pipelineStats.byStage.proposal?.count || 0,
        pipelineStats.byStage.negotiation?.count || 0,
        pipelineStats.byStage['closed-won']?.count || 0,
        pipelineStats.byStage['closed-lost']?.count || 0
      ],
      backgroundColor: '#6366F1',
      borderRadius: 8
    }]
  };

  // Pipeline Value by Stage
  const pipelineValueData = {
    labels: ['Prospecting', 'Qualification', 'Proposal', 'Negotiation'],
    datasets: [{
      label: 'Pipeline Value (SGD)',
      data: [
        pipelineStats.byStage.prospecting?.value || 0,
        pipelineStats.byStage.qualification?.value || 0,
        pipelineStats.byStage.proposal?.value || 0,
        pipelineStats.byStage.negotiation?.value || 0
      ],
      fill: false,
      borderColor: '#10B981',
      backgroundColor: '#10B981',
      tension: 0.4
    }]
  };

  // Task Priority Distribution
  const taskPriorityData = {
    labels: ['Low', 'Medium', 'High', 'Urgent'],
    datasets: [{
      label: 'Tasks by Priority',
      data: [
        tasks.filter(t => t.priority === 'low').length,
        tasks.filter(t => t.priority === 'medium').length,
        tasks.filter(t => t.priority === 'high').length,
        tasks.filter(t => t.priority === 'urgent').length
      ],
      backgroundColor: ['#6B7280', '#3B82F6', '#F59E0B', '#EF4444'],
      borderRadius: 8
    }]
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-SG', {
      style: 'currency',
      currency: 'SGD',
      minimumFractionDigits: 0
    }).format(value);
  };

  const handleExport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      dateRange,
      summary: {
        totalTasks: tasks.length,
        totalContacts: contacts.length,
        totalOpportunities: opportunities.length,
        pipelineValue: pipelineStats.totalValue,
        weightedValue: pipelineStats.weightedValue
      },
      tasks: {
        byStatus: {
          pending: tasks.filter(t => t.status === 'pending').length,
          inProgress: tasks.filter(t => t.status === 'in-progress').length,
          completed: tasks.filter(t => t.status === 'completed').length
        },
        byPriority: {
          low: tasks.filter(t => t.priority === 'low').length,
          medium: tasks.filter(t => t.priority === 'medium').length,
          high: tasks.filter(t => t.priority === 'high').length,
          urgent: tasks.filter(t => t.priority === 'urgent').length
        }
      },
      contacts: {
        byType: {
          contacts: contacts.filter(c => c.type === 'contact').length,
          leads: contacts.filter(c => c.type === 'lead').length
        },
        byStatus: {
          active: contacts.filter(c => c.status === 'active').length,
          inactive: contacts.filter(c => c.status === 'inactive').length
        }
      },
      pipeline: pipelineStats
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `crm-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Layout title="Reports & Analytics">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive insights into your CRM performance
          </p>
        </div>
        <div className="flex gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="year">This Year</option>
          </select>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 inline-flex items-center gap-2"
          >
            <FiDownload />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
              <FiCheckSquare className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Tasks</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{tasks.length}</p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-2">
            {tasks.filter(t => t.status === 'completed').length} completed
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <FiUserCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Contacts</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{contacts.length}</p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
            {contacts.filter(c => c.type === 'lead').length} leads
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <FiTrendingUp className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Opportunities</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{opportunities.length}</p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-2">
            {pipelineStats.won} won
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <FiDollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Pipeline Value</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {formatCurrency(pipelineStats.totalValue)}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
            Weighted: {formatCurrency(pipelineStats.weightedValue)}
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Status Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Task Status Distribution
          </h3>
          <div className="h-64 flex items-center justify-center">
            <Doughnut
              data={taskStatusData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: { position: 'bottom' }
                }
              }}
            />
          </div>
        </div>

        {/* Contact Type Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Contact Type Distribution
          </h3>
          <div className="h-64 flex items-center justify-center">
            <Doughnut
              data={contactTypeData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: { position: 'bottom' }
                }
              }}
            />
          </div>
        </div>

        {/* Opportunity Pipeline */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Opportunity Pipeline by Stage
          </h3>
          <div className="h-64">
            <Bar
              data={pipelineData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: { display: false }
                },
                scales: {
                  y: { beginAtZero: true }
                }
              }}
            />
          </div>
        </div>

        {/* Task Priority Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Task Priority Distribution
          </h3>
          <div className="h-64">
            <Bar
              data={taskPriorityData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: { display: false }
                },
                scales: {
                  y: { beginAtZero: true }
                }
              }}
            />
          </div>
        </div>

        {/* Pipeline Value Trend */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Pipeline Value by Stage
          </h3>
          <div className="h-64">
            <Line
              data={pipelineValueData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: { display: false }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => formatCurrency(value)
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
