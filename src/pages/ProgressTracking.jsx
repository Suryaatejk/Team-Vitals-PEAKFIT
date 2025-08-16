import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import { useTheme } from "../context/ThemeContext";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const ProgressTracking = () => {
  const { isDarkMode } = useTheme();
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({ date: "", weight: "", calories: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addEntry = () => {
    if (formData.date && formData.weight && formData.calories) {
      setEntries([...entries, formData]);
      setFormData({ date: "", weight: "", calories: "" });
    }
  };

  // Preparing data for the chart
  const chartData = {
    labels: entries.map(entry => entry.date),
    datasets: [
      {
        label: "Weight (kg)",
        data: entries.map(entry => entry.weight),
        borderColor: isDarkMode ? "#60A5FA" : "#3B82F6",
        backgroundColor: isDarkMode ? "rgba(96, 165, 250, 0.1)" : "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Calories (kcal)",
        data: entries.map(entry => entry.calories),
        borderColor: isDarkMode ? "#F87171" : "#EF4444",
        backgroundColor: isDarkMode ? "rgba(248, 113, 113, 0.1)" : "rgba(239, 68, 68, 0.1)",
        fill: true,
        tension: 0.4,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? '#E5E7EB' : '#374151',
        },
      },
    },
    scales: {
      y: {
        grid: {
          color: isDarkMode ? 'rgba(75, 85, 99, 0.2)' : 'rgba(75, 85, 99, 0.1)',
        },
        ticks: {
          color: isDarkMode ? '#E5E7EB' : '#374151',
        },
      },
      x: {
        grid: {
          color: isDarkMode ? 'rgba(75, 85, 99, 0.2)' : 'rgba(75, 85, 99, 0.1)',
        },
        ticks: {
          color: isDarkMode ? '#E5E7EB' : '#374151',
        },
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Track Your Progress</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Enter weight"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Calories (kcal)
              </label>
              <input
                type="number"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                placeholder="Enter calories"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <button
            onClick={addEntry}
            className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition font-medium shadow-md"
          >
            Add Entry
          </button>

          {entries.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Progress Chart</h3>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;
