import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskStore } from '../store/useTaskStore';
import { useAuthStore } from '../store/useAuthStore';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskFilter from '../components/TaskFilter';
import ThemeToggle from '../components/ThemeToggle';
import { fetchTasks, createTask, updateTaskStatus, deleteTaskApi } from '../services/api';
import { Task } from '../types/task';
import { LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const {
    tasks,
    setTasks,
    addTask,
    updateTask,
    deleteTask,
    setLoading,
    setError,
    isLoading,
    error,
  } = useTaskStore();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const loadTasks = async () => {
      try {
        setLoading(true);
        const data = await fetchTasks();
        setTasks(
          data.slice(0, 10).map((task: any) => ({
            ...task,
            createdAt: new Date().toISOString(),
          }))
        );
      } catch (err) {
        setError('Failed to load tasks');
        toast.error('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [isAuthenticated, navigate, setTasks, setLoading, setError]);

  const handleAddTask = async (title: string) => {
    try {
      setLoading(true);
      const newTask = await createTask({ title, userId: 1 });
      addTask({
        ...newTask,
        createdAt: new Date().toISOString(),
      });
      toast.success('Task added successfully');
    } catch (err) {
      toast.error('Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (title: string) => {
    if (!editingTask) return;

    try {
      setLoading(true);
      await updateTaskStatus(editingTask.id, { completed: editingTask.completed });
      updateTask(editingTask.id, { title });
      setEditingTask(null);
      toast.success('Task updated successfully');
    } catch (err) {
      toast.error('Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Logged out successfully');
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <img
              src="https://img.freepik.com/premium-photo/futuristic-neon-lit-3d-clipboard-icon_1142-209711.jpg"
              alt="Project Logo"
              className="w-24 h-24 mb-4 rounded-full shadow-lg"
            />
            <h1 className="text-5xl font-bold text-gray-700 dark:text-gray-300">
            TaskPro 
          </h1>
          
            <div className="flex items-center mt-4 md:mt-0 space-x-4">
              <ThemeToggle />
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all transform hover:scale-105"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Task Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 dark:text-gray-300">
                Completed: {completedTasks}/{totalTasks}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Task Form */}
          <TaskForm
            task={editingTask || undefined}
            onSubmit={editingTask ? handleUpdateTask : handleAddTask}
            onCancel={editingTask ? () => setEditingTask(null) : undefined}
          />

          {/* Task Filter */}
          <TaskFilter />

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center my-8">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 p-4 rounded-lg mb-6 shadow-md">
              {error}
            </div>
          )}

          {/* Task List */}
          <div>
            {tasks.length > 0 ? (
              <TaskList
                tasks={tasks.map((task, index) => ({
                  ...task,
                  displayNumber: index + 1,
                }))}
                onEdit={setEditingTask}
              />
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-400">
                No tasks found. Start adding some tasks!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
