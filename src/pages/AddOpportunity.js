import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { FiSave, FiX } from 'react-icons/fi';
import { useOpportunity } from '../context/OpportunityContext';

const AddOpportunity = () => {
  const navigate = useNavigate();
  const { addOpportunity } = useOpportunity();

  const [formData, setFormData] = useState({
    name: '',
    client: '',
    value: '',
    stage: 'prospecting',
    probability: 20,
    expectedCloseDate: '',
    owner: '',
    source: '',
    description: '',
    tags: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const opportunityData = {
      ...formData,
      value: parseFloat(formData.value),
      probability: parseInt(formData.probability),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    addOpportunity(opportunityData);
    navigate('/opportunities');
  };

  return (
    <Layout title="Add New Opportunity">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Opportunity Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Opportunity Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., Acme Corp - Digital Transformation"
              />
            </div>

            {/* Client */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Client Name *
              </label>
              <input
                type="text"
                name="client"
                value={formData.client}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Client or prospect name"
              />
            </div>

            {/* Value */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Deal Value (SGD) *
              </label>
              <input
                type="number"
                name="value"
                value={formData.value}
                onChange={handleChange}
                required
                min="0"
                step="1000"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., 150000"
              />
            </div>

            {/* Stage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Stage *
              </label>
              <select
                name="stage"
                value={formData.stage}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="prospecting">Prospecting</option>
                <option value="qualification">Qualification</option>
                <option value="proposal">Proposal</option>
                <option value="negotiation">Negotiation</option>
                <option value="closed-won">Closed Won</option>
                <option value="closed-lost">Closed Lost</option>
              </select>
            </div>

            {/* Probability */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Probability (%) *
              </label>
              <input
                type="number"
                name="probability"
                value={formData.probability}
                onChange={handleChange}
                required
                min="0"
                max="100"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Expected Close Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Expected Close Date *
              </label>
              <input
                type="date"
                name="expectedCloseDate"
                value={formData.expectedCloseDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Owner */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Owner *
              </label>
              <input
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Sales person name"
              />
            </div>

            {/* Source */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Source
              </label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select source...</option>
                <option value="Direct">Direct</option>
                <option value="Referral">Referral</option>
                <option value="Website">Website</option>
                <option value="Event">Event</option>
                <option value="Cold Call">Cold Call</option>
                <option value="Partner">Partner</option>
              </select>
            </div>

            {/* Tags */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter tags separated by commas (e.g., enterprise, technology)"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Describe the opportunity, key requirements, and any important details..."
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center justify-center gap-2"
            >
              <FiSave />
              Save Opportunity
            </button>
            <button
              type="button"
              onClick={() => navigate('/opportunities')}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors inline-flex items-center gap-2"
            >
              <FiX />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddOpportunity;
