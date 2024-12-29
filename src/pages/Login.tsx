import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import { LogIn, Moon, Sun } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
      toast.success('Welcome back!');
    } catch (error) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md relative">
        {/* Theme Toggle */}
        <button
          onClick={handleThemeToggle}
          className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 shadow-md focus:outline-none"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-blue-500" />
          )}
        </button>

        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://img.freepik.com/premium-photo/futuristic-neon-lit-3d-clipboard-icon_1142-209711.jpg"
            alt="Project Logo"
            className="w-24 h-24 mb-4 rounded-full shadow-lg"
          />
          <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
            TaskPro 
          </h1>
          
          <p className="text-sm text-gray-600 dark:text-gray-400">
          
          The Ultimate Solution for Your Project Needs
          </p>
        </div>

        {/* Icon and Heading */}
        <div className="flex justify-center mb-8">
          <LogIn className="w-12 h-12 text-blue-500" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Welcome Back
        </h1>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign in
          </button>
        </form>

        {/* Demo Credentials */}
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Demo credentials: demo@example.com / demo123
        </p>
      </div>
    </div>
  );
};

export default Login;
