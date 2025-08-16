import { useState } from "react";

const SleepTracker = () => {
  const [sleepHours, setSleepHours] = useState(0);
  const recommendedSleep = 8; // 8 hours recommended

  const addSleep = (hours) => {
    setSleepHours((prev) => Math.min(prev + hours, 12)); // Max 12 hours
  };

  return (
    <div className=" mt-16 max-w-lg mx-auto p-4 bg-gray-800 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">🌙 Sleep Tracker</h2>
      <p>Recommended Sleep: <strong>7-9 hours</strong></p>

      <div className="w-full bg-gray-600 rounded h-6 mt-3 relative overflow-hidden">
        <div
          className={`h-6 rounded transition-all duration-300 ${
            sleepHours >= 8 ? 'bg-yellow-400' : 'bg-purple-400'
          }`}
          style={{ width: `${Math.min((sleepHours / 8) * 100, 100)}%` }}
        ></div>
        {sleepHours > recommendedSleep && (
          <div className="absolute top-1/2 left-2 transform -translate-y-1/2 text-xs font-medium text-gray-800">
            Exceeding recommended sleep by {(sleepHours - recommendedSleep).toFixed(1)} hours
          </div>
        )}
      </div>

      <p className="mt-2">You have slept for: <strong>{sleepHours} hours</strong></p>

      <div className="flex gap-2 mt-4">
        <button onClick={() => addSleep(1)} className="bg-purple-500 px-3 py-2 rounded">
          +1 Hour
        </button>
        <button onClick={() => addSleep(2)} className="bg-purple-700 px-3 py-2 rounded">
          +2 Hours
        </button>
      </div>
    </div>
  );
};

export default SleepTracker;
