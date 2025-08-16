import { useState } from "react";
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [hydrationGoal, setHydrationGoal] = useState(3); // Default 3 liters

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>
        
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Appearance</h2>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Dark Mode</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark mode for the entire application</p>
            </div>
            
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                isDarkMode ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isDarkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates about your fitness progress</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Push Notifications</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Get instant updates on your device</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Hydration Goal */}
        <div className="border-b pb-3 mb-3">
          <label className="text-lg block mb-2">Daily Hydration Goal (Liters)</label>
          <input
            type="number"
            min="1"
            max="5"
            value={hydrationGoal}
            onChange={(e) => setHydrationGoal(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Account Options */}
        <div className="text-center mt-6">
          <button className="bg-red-500 text-white px-4 py-2 rounded mr-4">
            Delete Account
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
