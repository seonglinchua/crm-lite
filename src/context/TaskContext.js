import React, { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Follow up with John Smith',
      description: 'Send proposal for new CRM system implementation',
      type: 'follow-up',
      status: 'pending',
      priority: 'high',
      assignedTo: 'Sarah Johnson',
      relatedContact: 'John Smith',
      relatedContactId: 1,
      dueDate: '2025-10-28T10:00:00.000Z',
      completedDate: null,
      createdAt: '2025-10-25T08:30:00.000Z',
      notes: 'Discussed budget and timeline during last meeting',
      tags: ['sales', 'proposal']
    },
    {
      id: 2,
      title: 'Schedule demo for Acme Corp',
      description: 'Product demonstration for enterprise package',
      type: 'meeting',
      status: 'in-progress',
      priority: 'urgent',
      assignedTo: 'Michael Chen',
      relatedContact: 'Jane Doe',
      relatedContactId: 2,
      dueDate: '2025-10-27T14:00:00.000Z',
      completedDate: null,
      createdAt: '2025-10-24T09:15:00.000Z',
      notes: 'Prepare slides and demo environment',
      tags: ['demo', 'enterprise']
    },
    {
      id: 3,
      title: 'Send contract to Mike Johnson',
      description: 'Final contract review and signature',
      type: 'email',
      status: 'completed',
      priority: 'medium',
      assignedTo: 'Emily Davis',
      relatedContact: 'Mike Johnson',
      relatedContactId: 3,
      dueDate: '2025-10-26T16:00:00.000Z',
      completedDate: '2025-10-26T15:30:00.000Z',
      createdAt: '2025-10-23T11:00:00.000Z',
      notes: 'Contract signed and filed',
      tags: ['contract', 'legal']
    },
    {
      id: 4,
      title: 'Cold call - Tech Startup Inc',
      description: 'Initial outreach for new business opportunity',
      type: 'call',
      status: 'pending',
      priority: 'low',
      assignedTo: 'Sarah Johnson',
      relatedContact: 'Sarah Williams',
      relatedContactId: 4,
      dueDate: '2025-10-29T09:00:00.000Z',
      completedDate: null,
      createdAt: '2025-10-25T10:00:00.000Z',
      notes: 'Found contact through LinkedIn',
      tags: ['cold-call', 'prospecting']
    },
    {
      id: 5,
      title: 'Quarterly review meeting',
      description: 'Review Q4 performance and set Q1 goals',
      type: 'meeting',
      status: 'pending',
      priority: 'medium',
      assignedTo: 'Michael Chen',
      relatedContact: 'David Brown',
      relatedContactId: 5,
      dueDate: '2025-10-30T11:00:00.000Z',
      completedDate: null,
      createdAt: '2025-10-25T12:00:00.000Z',
      notes: 'Prepare quarterly reports and analysis',
      tags: ['review', 'planning']
    }
  ]);

  const addTask = (newTask) => {
    const task = {
      ...newTask,
      id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
      createdAt: new Date().toISOString(),
      completedDate: null
    };
    setTasks([...tasks, task]);
    return task;
  };

  const updateTask = (id, updatedData) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const updated = { ...task, ...updatedData };
        // Auto-set completedDate when status changes to completed
        if (updated.status === 'completed' && !updated.completedDate) {
          updated.completedDate = new Date().toISOString();
        }
        // Clear completedDate if status is not completed
        if (updated.status !== 'completed') {
          updated.completedDate = null;
        }
        return updated;
      }
      return task;
    }));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getTaskById = (id) => {
    return tasks.find(task => task.id === parseInt(id));
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const getTasksByPriority = (priority) => {
    return tasks.filter(task => task.priority === priority);
  };

  const getTasksByType = (type) => {
    return tasks.filter(task => task.type === type);
  };

  const getTasksByAssignee = (assignee) => {
    return tasks.filter(task => task.assignedTo === assignee);
  };

  const getTasksByContact = (contactId) => {
    return tasks.filter(task => task.relatedContactId === contactId);
  };

  const getOverdueTasks = () => {
    const now = new Date();
    return tasks.filter(task =>
      task.status !== 'completed' &&
      task.status !== 'cancelled' &&
      new Date(task.dueDate) < now
    );
  };

  const getUpcomingTasks = (days = 7) => {
    const now = new Date();
    const future = new Date();
    future.setDate(future.getDate() + days);

    return tasks.filter(task =>
      task.status !== 'completed' &&
      task.status !== 'cancelled' &&
      new Date(task.dueDate) >= now &&
      new Date(task.dueDate) <= future
    );
  };

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getTaskById,
    getTasksByStatus,
    getTasksByPriority,
    getTasksByType,
    getTasksByAssignee,
    getTasksByContact,
    getOverdueTasks,
    getUpcomingTasks
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};
