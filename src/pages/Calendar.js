import React, { useState } from 'react';
import Layout from '../components/Layout';
import { FiChevronLeft, FiChevronRight, FiClock, FiCheckSquare } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useTask } from '../context/TaskContext';

const Calendar = () => {
  const { tasks } = useTask();
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getTasksForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return tasks.filter(task => task.dueDate === dateStr);
  };

  const getTaskPriorityColor = (priority) => {
    const colors = {
      low: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
      medium: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      high: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
      urgent: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
    };
    return colors[priority] || colors.medium;
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const renderMonthView = () => {
    const days = [];
    const today = new Date();
    const isToday = (day) => {
      return today.getDate() === day &&
             today.getMonth() === month &&
             today.getFullYear() === year;
    };

    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <div key={`empty-${i}`} className="min-h-24 p-2 bg-gray-50 dark:bg-gray-900"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayTasks = getTasksForDate(date);
      const isTodayDate = isToday(day);

      days.push(
        <div
          key={day}
          className={`min-h-24 p-2 border border-gray-200 dark:border-gray-700 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
            isTodayDate ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500' : 'bg-white dark:bg-gray-800'
          }`}
        >
          <div className={`text-sm font-medium mb-1 ${
            isTodayDate ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'
          }`}>
            {day}
            {isTodayDate && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-indigo-600 text-white rounded-full">Today</span>
            )}
          </div>
          <div className="space-y-1">
            {dayTasks.slice(0, 3).map(task => (
              <Link
                key={task.id}
                to={`/tasks/${task.id}`}
                className={`block text-xs p-1.5 rounded ${getTaskPriorityColor(task.priority)} truncate hover:opacity-80`}
                title={task.title}
              >
                {task.title}
              </Link>
            ))}
            {dayTasks.length > 3 && (
              <div className="text-xs text-gray-500 dark:text-gray-400 pl-1.5">
                +{dayTasks.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const renderUpcomingTasks = () => {
    const today = new Date();
    const upcomingTasks = tasks
      .filter(task => {
        const dueDate = new Date(task.dueDate);
        return dueDate >= today && task.status !== 'completed';
      })
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 10);

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <FiClock className="w-5 h-5" />
          Upcoming Tasks
        </h3>
        <div className="space-y-3">
          {upcomingTasks.length > 0 ? (
            upcomingTasks.map(task => (
              <Link
                key={task.id}
                to={`/tasks/${task.id}`}
                className="block p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                      {task.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(task.dueDate).toLocaleDateString('en-SG', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${getTaskPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No upcoming tasks
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <Layout title="Calendar">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            {/* Calendar Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {monthNames[month]} {year}
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={goToToday}
                    className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    Today
                  </button>
                  <button
                    onClick={prevMonth}
                    className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                    aria-label="Previous month"
                  >
                    <FiChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                    aria-label="Next month"
                  >
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Task Summary */}
              <div className="mt-4 grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {tasks.filter(t => t.status === 'pending').length}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Pending</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {tasks.filter(t => t.status === 'in-progress').length}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">In Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {tasks.filter(t => t.status === 'completed').length}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {tasks.length}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Total</div>
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-4">
              {/* Day names */}
              <div className="grid grid-cols-7 gap-0 mb-2">
                {dayNames.map(day => (
                  <div
                    key={day}
                    className="text-center text-sm font-semibold text-gray-700 dark:text-gray-300 py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-0">
                {renderMonthView()}
              </div>
            </div>

            {/* Legend */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Priority:</span>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs ${getTaskPriorityColor('low')}`}>Low</span>
                  <span className={`px-2 py-1 rounded text-xs ${getTaskPriorityColor('medium')}`}>Medium</span>
                  <span className={`px-2 py-1 rounded text-xs ${getTaskPriorityColor('high')}`}>High</span>
                  <span className={`px-2 py-1 rounded text-xs ${getTaskPriorityColor('urgent')}`}>Urgent</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar with Upcoming Tasks */}
        <div className="lg:col-span-1">
          {renderUpcomingTasks()}

          {/* Quick Actions */}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                to="/tasks/add"
                className="block w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-center"
              >
                <FiCheckSquare className="inline-block w-4 h-4 mr-2" />
                Add New Task
              </Link>
              <Link
                to="/tasks"
                className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-center"
              >
                View All Tasks
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calendar;
