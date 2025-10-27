import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import {
  FiMail,
  FiPhone,
  FiBriefcase,
  FiUser,
  FiCalendar,
  FiTag,
  FiFileText,
  FiArrowLeft,
  FiEdit2,
  FiTrash2,
} from 'react-icons/fi';
import Layout from '../components/Layout';
import { useContacts } from '../context/ContactContext';

const ViewContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getContactById, deleteContact, updateContact } = useContacts();

  const contact = getContactById(id);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(contact || {});

  if (!contact) {
    return (
      <Layout title="Contact Not Found">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Contact/Lead Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The contact or lead you're looking for doesn't exist.
          </p>
          <Link
            to="/contacts"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Contacts
          </Link>
        </div>
      </Layout>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${contact.firstName} ${contact.lastName}?`)) {
      deleteContact(contact.id);
      navigate('/contacts');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditData(contact);
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    // Process tags if they're a string
    const processedData = {
      ...editData,
      tags: typeof editData.tags === 'string'
        ? editData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
        : editData.tags,
    };
    updateContact(contact.id, processedData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      contacted: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      qualified: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  };

  const getTypeColor = (type) => {
    return type === 'lead'
      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
  };

  return (
    <Layout title={`${contact.firstName} ${contact.lastName}`}>
      <div className="mb-6">
        <Link
          to="/contacts"
          className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <FiArrowLeft className="mr-2" />
          Back to Contacts
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information Card */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            {/* Header with Actions */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                  {contact.firstName} {contact.lastName}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{contact.position}</p>
                <div className="flex gap-2 mt-3">
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getTypeColor(contact.type)}`}>
                    {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
                  </span>
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(contact.status)}`}>
                    {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                {!isEditing ? (
                  <>
                    <button
                      onClick={handleEdit}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                    >
                      <FiEdit2 className="mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                    >
                      <FiTrash2 className="mr-2" />
                      Delete
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleSaveEdit}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white border-b dark:border-gray-700 pb-2">
                Contact Information
              </h3>

              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={editData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={editData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={editData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={editData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={editData.position}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Status
                      </label>
                      <select
                        name="status"
                        value={editData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Source
                      </label>
                      <select
                        name="source"
                        value={editData.source}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      >
                        <option value="website">Website</option>
                        <option value="referral">Referral</option>
                        <option value="cold-call">Cold Call</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="trade-show">Trade Show</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Assigned To
                    </label>
                    <input
                      type="text"
                      name="assignedTo"
                      value={editData.assignedTo}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={Array.isArray(editData.tags) ? editData.tags.join(', ') : editData.tags}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Notes
                    </label>
                    <textarea
                      name="notes"
                      value={editData.notes}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <FiMail className="mr-3 text-gray-500" size={20} />
                    <a href={`mailto:${contact.email}`} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                      {contact.email}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <FiPhone className="mr-3 text-gray-500" size={20} />
                    <a href={`tel:${contact.phone}`} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                      {contact.phone}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <FiBriefcase className="mr-3 text-gray-500" size={20} />
                    <span>{contact.company}</span>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <FiUser className="mr-3 text-gray-500" size={20} />
                    <span>Assigned to: {contact.assignedTo}</span>
                  </div>
                </div>
              )}
            </div>

            {!isEditing && (
              <>
                {/* Tags Section */}
                {contact.tags && contact.tags.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white border-b dark:border-gray-700 pb-2 mb-4">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {contact.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm flex items-center"
                        >
                          <FiTag className="mr-1" size={14} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes Section */}
                {contact.notes && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white border-b dark:border-gray-700 pb-2 mb-4">
                      Notes
                    </h3>
                    <div className="flex items-start text-gray-700 dark:text-gray-300">
                      <FiFileText className="mr-3 mt-1 text-gray-500" size={20} />
                      <p>{contact.notes}</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Additional Information
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Source</p>
                <p className="text-gray-800 dark:text-white font-medium capitalize">
                  {contact.source.replace('-', ' ')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Created</p>
                <div className="flex items-center text-gray-800 dark:text-white">
                  <FiCalendar className="mr-2 text-gray-500" size={16} />
                  {new Date(contact.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Last Contact</p>
                <div className="flex items-center text-gray-800 dark:text-white">
                  <FiCalendar className="mr-2 text-gray-500" size={16} />
                  {new Date(contact.lastContact).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <a
                href={`mailto:${contact.email}`}
                className="block w-full px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors text-center"
              >
                Send Email
              </a>
              <a
                href={`tel:${contact.phone}`}
                className="block w-full px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors text-center"
              >
                Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewContact;
