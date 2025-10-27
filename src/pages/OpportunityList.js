import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { FiPlus, FiDollarSign, FiTrendingUp, FiSearch, FiEye } from 'react-icons/fi';
import { useOpportunity } from '../context/OpportunityContext';

const stageLabels = {
  'prospecting': 'Prospecting',
  'qualification': 'Qualification',
  'proposal': 'Proposal',
  'negotiation': 'Negotiation',
  'closed-won': 'Closed Won',
  'closed-lost': 'Closed Lost'
};

const stageColors = {
  'prospecting': 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  'qualification': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  'proposal': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  'negotiation': 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  'closed-won': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  'closed-lost': 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
};

const OpportunityList = () => {
  const { opportunities, getPipelineStats } = useOpportunity();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'pipeline'

  const stats = getPipelineStats();

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = filterStage === 'all' || opp.stage === filterStage;
    return matchesSearch && matchesStage;
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-SG', {
      style: 'currency',
      currency: 'SGD',
      minimumFractionDigits: 0
    }).format(value);
  };

  const renderPipelineView = () => {
    const stages = ['prospecting', 'qualification', 'proposal', 'negotiation', 'closed-won', 'closed-lost'];

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stages.map(stage => {
          const stageOpps = filteredOpportunities.filter(opp => opp.stage === stage);
          const stageValue = stageOpps.reduce((sum, opp) => sum + opp.value, 0);

          return (
            <div key={stage} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <div className="mb-3">
                <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-1">
                  {stageLabels[stage]}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {stageOpps.length} deals • {formatCurrency(stageValue)}
                </p>
              </div>
              <div className="space-y-2">
                {stageOpps.map(opp => (
                  <Link
                    key={opp.id}
                    to={`/opportunities/${opp.id}`}
                    className="block bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-medium text-sm text-gray-800 dark:text-gray-100 mb-1 truncate">
                      {opp.name}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 truncate">
                      {opp.client}
                    </p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                        {formatCurrency(opp.value)}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {opp.probability}%
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderListView = () => {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Opportunity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Stage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Probability
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOpportunities.length > 0 ? (
                filteredOpportunities.map(opp => (
                  <tr key={opp.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {opp.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700 dark:text-gray-300">{opp.client}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {formatCurrency(opp.value)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${stageColors[opp.stage]}`}>
                        {stageLabels[opp.stage]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700 dark:text-gray-300">{opp.probability}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700 dark:text-gray-300">{opp.owner}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        to={`/opportunities/${opp.id}`}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 inline-flex items-center gap-1"
                      >
                        <FiEye className="w-4 h-4" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    No opportunities found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <Layout title="Sales Pipeline">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Opportunities</h3>
            <FiTrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.total}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Pipeline Value</h3>
            <FiDollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {formatCurrency(stats.totalValue)}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Weighted Value</h3>
            <FiDollarSign className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {formatCurrency(stats.weightedValue)}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Won Deals</h3>
            <FiTrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.won}</p>
        </div>
      </div>

      {/* Actions and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search opportunities or clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">All Stages</option>
            {Object.entries(stageLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          <button
            onClick={() => setViewMode(viewMode === 'list' ? 'pipeline' : 'list')}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {viewMode === 'list' ? 'Pipeline View' : 'List View'}
          </button>

          <Link
            to="/opportunities/add"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center gap-2"
          >
            <FiPlus />
            Add Opportunity
          </Link>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'pipeline' ? renderPipelineView() : renderListView()}
    </Layout>
  );
};

export default OpportunityList;
