import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import {
  FiEdit, FiTrash2, FiDollarSign, FiCalendar, FiUser,
  FiTag, FiFileText, FiArrowLeft
} from 'react-icons/fi';
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

const ViewOpportunity = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOpportunityById, deleteOpportunity, updateOpportunity } = useOpportunity();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);

  const opportunity = getOpportunityById(id);

  if (!opportunity) {
    return (
      <Layout title="Opportunity Not Found">
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Opportunity not found</p>
          <Link
            to="/opportunities"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Back to Opportunities
          </Link>
        </div>
      </Layout>
    );
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-SG', {
      style: 'currency',
      currency: 'SGD',
      minimumFractionDigits: 0
    }).format(value);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this opportunity?')) {
      deleteOpportunity(id);
      navigate('/opportunities');
    }
  };

  const handleEdit = () => {
    setFormData({ ...opportunity });
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateOpportunity(id, formData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'value' ? parseFloat(value) :
              name === 'probability' ? parseInt(value) :
              value
    }));
  };

  if (isEditing) {
    return (
      <Layout title="Edit Opportunity">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSave} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Opportunity Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Client Name
                </label>
                <input
                  type="text"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deal Value (SGD)
                </label>
                <input
                  type="number"
                  name="value"
                  value={formData.value}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Stage
                </label>
                <select
                  name="stage"
                  value={formData.stage}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="prospecting">Prospecting</option>
                  <option value="qualification">Qualification</option>
                  <option value="proposal">Proposal</option>
                  <option value="negotiation">Negotiation</option>
                  <option value="closed-won">Closed Won</option>
                  <option value="closed-lost">Closed Lost</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Probability (%)
                </label>
                <input
                  type="number"
                  name="probability"
                  value={formData.probability}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={opportunity.name}>
      <div className="max-w-4xl mx-auto">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/opportunities"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <FiArrowLeft />
            Back to Opportunities
          </Link>
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 inline-flex items-center gap-2"
            >
              <FiEdit />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 inline-flex items-center gap-2"
            >
              <FiTrash2 />
              Delete
            </button>
          </div>
        </div>

        {/* Opportunity Details */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          {/* Header */}
          <div className="border-b border-gray-200 dark:border-gray-700 p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {opportunity.name}
            </h1>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${stageColors[opportunity.stage]}`}>
                {stageLabels[opportunity.stage]}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {opportunity.probability}% probability
              </span>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <FiDollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Deal Value</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {formatCurrency(opportunity.value)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <FiCalendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Expected Close</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {new Date(opportunity.expectedCloseDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <FiUser className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Owner</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {opportunity.owner}
                </p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Client</h3>
              <p className="text-gray-900 dark:text-gray-100">{opportunity.client}</p>
            </div>

            {opportunity.source && (
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Source</h3>
                <p className="text-gray-900 dark:text-gray-100">{opportunity.source}</p>
              </div>
            )}

            {opportunity.description && (
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-2">
                  <FiFileText className="w-4 h-4" />
                  Description
                </h3>
                <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                  {opportunity.description}
                </p>
              </div>
            )}

            {opportunity.tags && opportunity.tags.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                  <FiTag className="w-4 h-4" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {opportunity.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Created</h3>
                <p className="text-gray-900 dark:text-gray-100">
                  {new Date(opportunity.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Last Updated</h3>
                <p className="text-gray-900 dark:text-gray-100">
                  {new Date(opportunity.lastUpdated).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewOpportunity;
