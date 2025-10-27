import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Task Assigned',
      message: 'Follow up with Acme Corp regarding contract renewal',
      time: '5 minutes ago',
      read: false,
      type: 'task'
    },
    {
      id: 2,
      title: 'Client Update',
      message: 'Globex Inc updated their KYC documents',
      time: '1 hour ago',
      read: false,
      type: 'update'
    },
    {
      id: 3,
      title: 'Overdue Task',
      message: 'Task "Call Beta LLC" is overdue',
      time: '2 hours ago',
      read: false,
      type: 'alert'
    }
  ]);

  const addNotification = (notification) => {
    setNotifications(prev => [
      {
        id: Date.now(),
        ...notification,
        read: false,
        time: 'Just now'
      },
      ...prev
    ]);
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
