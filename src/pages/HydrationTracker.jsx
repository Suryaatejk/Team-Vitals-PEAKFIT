import { useState } from "react";

const HydrationTracker = () => {
  const [waterIntake, setWaterIntake] = useState(0);
  const recommendedIntake = 3000; // 3 Liters (adjust based on user details)

  const addWater = (amount) => {
    setWaterIntake((prev) => Math.min(prev + amount, recommendedIntake));
  };

  return (
    <div className="mt-16 max-w-lg mx-auto p-4 bg-gray-800 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">💧 Hydration Tracker</h2>
      <p>Recommended Daily Intake: <strong>{recommendedIntake} ml</strong></p>
      
      <div className="w-full bg-gray-600 rounded h-6 mt-3">
        <div
          className="bg-blue-400 h-6 rounded"
          style={{ width: `${(waterIntake / recommendedIntake) * 100}%` }}
        ></div>
      </div>

      <p className="mt-2">You have consumed: <strong>{waterIntake} ml</strong></p>

      <div className="flex gap-2 mt-4">
        <button onClick={() => addWater(250)} className="bg-blue-500 px-3 py-2 rounded">
          +250 ml
        </button>
        <button onClick={() => addWater(500)} className="bg-blue-700 px-3 py-2 rounded">
          +500 ml
        </button>
      </div>
    </div>
  );
};

export default HydrationTracker;
