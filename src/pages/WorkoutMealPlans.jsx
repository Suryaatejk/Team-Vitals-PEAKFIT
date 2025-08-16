import { useState } from "react";

const WorkoutMealPlans = () => {
  const [goal, setGoal] = useState("maintain");

  const workoutPlans = {
    lose: ["Cardio - 30 min", "Strength Training - 20 min", "Stretching - 10 min"],
    gain: ["Weight Training - 45 min", "Protein-rich Meal", "Core Workouts - 20 min"],
    maintain: ["Balanced Workout - 40 min", "Healthy Meal", "Yoga - 15 min"]
  };

  const mealPlans = {
    lose: ["Salad & Grilled Chicken", "Smoothie Bowl", "Low-carb Dinner"],
    gain: ["High Protein Meal", "Oatmeal & Nuts", "Chicken & Rice"],
    maintain: ["Balanced Diet", "Vegetables & Protein", "Light Dinner"]
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-gray-800 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Workout & Meal Plans</h2>

      <label className="block">Select Goal:</label>
      <select
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        className="w-full p-2 rounded bg-gray-700"
      >
        <option value="lose">Lose Weight</option>
        <option value="gain">Gain Muscle</option>
        <option value="maintain">Maintain Fitness</option>
      </select>

      <div className="mt-4">
        <h3 className="font-semibold">🏋️ Workout Plan:</h3>
        <ul>
          {workoutPlans[goal].map((item, index) => (
            <li key={index}>✅ {item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">🍽️ Meal Plan:</h3>
        <ul>
          {mealPlans[goal].map((item, index) => (
            <li key={index}>✅ {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkoutMealPlans;
