import React, { createContext, useContext, useState } from 'react';

const ContactContext = createContext();

export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContacts must be used within a ContactProvider');
  }
  return context;
};

export const ContactProvider = ({ children }) => {
  // Mock data for contacts and leads
  const [contacts, setContacts] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '555-0101',
      company: 'Tech Solutions Inc',
      position: 'CTO',
      type: 'contact',
      status: 'active',
      source: 'website',
      assignedTo: 'Sarah Johnson',
      tags: ['vip', 'decision-maker'],
      notes: 'Met at tech conference 2024',
      createdAt: '2024-01-15',
      lastContact: '2024-10-20',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '555-0102',
      company: 'Global Industries',
      position: 'Marketing Director',
      type: 'lead',
      status: 'qualified',
      source: 'referral',
      assignedTo: 'Mike Chen',
      tags: ['hot-lead', 'enterprise'],
      notes: 'Interested in enterprise package',
      createdAt: '2024-02-10',
      lastContact: '2024-10-25',
    },
    {
      id: 3,
      firstName: 'Robert',
      lastName: 'Johnson',
      email: 'robert.j@example.com',
      phone: '555-0103',
      company: 'StartupX',
      position: 'CEO',
      type: 'lead',
      status: 'new',
      source: 'cold-call',
      assignedTo: 'Sarah Johnson',
      tags: ['startup'],
      notes: 'Follow up next week',
      createdAt: '2024-10-01',
      lastContact: '2024-10-15',
    },
    {
      id: 4,
      firstName: 'Emily',
      lastName: 'Brown',
      email: 'emily.brown@example.com',
      phone: '555-0104',
      company: 'Design Studio Co',
      position: 'Lead Designer',
      type: 'contact',
      status: 'active',
      source: 'linkedin',
      assignedTo: 'Mike Chen',
      tags: ['creative'],
      notes: 'Potential partnership opportunity',
      createdAt: '2024-03-20',
      lastContact: '2024-10-22',
    },
    {
      id: 5,
      firstName: 'Michael',
      lastName: 'Davis',
      email: 'michael.d@example.com',
      phone: '555-0105',
      company: 'Finance Corp',
      position: 'VP of Operations',
      type: 'lead',
      status: 'contacted',
      source: 'trade-show',
      assignedTo: 'Sarah Johnson',
      tags: ['finance', 'qualified'],
      notes: 'Requested demo for next month',
      createdAt: '2024-09-05',
      lastContact: '2024-10-18',
    },
    {
      id: 6,
      firstName: 'Sarah',
      lastName: 'Wilson',
      email: 'sarah.w@example.com',
      phone: '555-0106',
      company: 'Health Systems Ltd',
      position: 'IT Manager',
      type: 'contact',
      status: 'active',
      source: 'website',
      assignedTo: 'Mike Chen',
      tags: ['healthcare'],
      notes: 'Current customer since 2023',
      createdAt: '2023-11-10',
      lastContact: '2024-10-26',
    },
  ]);

  const addContact = (newContact) => {
    const contact = {
      ...newContact,
      id: Math.max(...contacts.map(c => c.id), 0) + 1,
      createdAt: new Date().toISOString().split('T')[0],
      lastContact: new Date().toISOString().split('T')[0],
    };
    setContacts([...contacts, contact]);
    return contact;
  };

  const updateContact = (id, updatedData) => {
    setContacts(contacts.map(contact =>
      contact.id === id ? { ...contact, ...updatedData } : contact
    ));
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const getContactById = (id) => {
    return contacts.find(contact => contact.id === parseInt(id));
  };

  const getContactsByType = (type) => {
    return contacts.filter(contact => contact.type === type);
  };

  const getContactsByStatus = (status) => {
    return contacts.filter(contact => contact.status === status);
  };

  const value = {
    contacts,
    addContact,
    updateContact,
    deleteContact,
    getContactById,
    getContactsByType,
    getContactsByStatus,
  };

  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  );
};
