import React from 'react';
import { useTaskStore } from '../store/useTaskStore';

const TaskFilter: React.FC = () => {
  const { filter, setFilter } = useTaskStore();

  return (
    <div className="flex justify-center space-x-4 mb-6">
      <button
        onClick={() => setFilter('all')}
        className={`px-4 py-2 rounded-lg transition-colors ${
          filter === 'all'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        All
      </button>
      <button
        onClick={() => setFilter('pending')}
        className={`px-4 py-2 rounded-lg transition-colors ${
          filter === 'pending'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        Pending
      </button>
      <button
        onClick={() => setFilter('completed')}
        className={`px-4 py-2 rounded-lg transition-colors ${
          filter === 'completed'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        Completed
      </button>
    </div>
  );
};

export default TaskFilter;