import { useState } from "react";

const Recommendations = () => {
  const [goal, setGoal] = useState("maintain");
  const [workout, setWorkout] = useState("");
  const [mealPlan, setMealPlan] = useState("");

  const generateRecommendations = () => {
    let workoutSuggestion, mealSuggestion;

    if (goal === "lose") {
      workoutSuggestion = "Cardio (Running, Cycling, HIIT) - 5 days/week";
      mealSuggestion = "High-protein, low-carb diet with lots of vegetables.";
    } else if (goal === "gain") {
      workoutSuggestion = "Strength training (Weight lifting, Resistance) - 4-5 days/week";
      mealSuggestion = "High-calorie meals with lean protein & healthy fats.";
    } else {
      workoutSuggestion = "Balanced mix of Cardio & Strength training - 3-4 days/week";
      mealSuggestion = "Balanced diet with proteins, carbs & healthy fats.";
    }

    setWorkout(workoutSuggestion);
    setMealPlan(mealSuggestion);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-800 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Personalized Recommendations</h2>

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

      <button
        onClick={generateRecommendations}
        className="mt-4 bg-blue-500 px-4 py-2 rounded"
      >
        Get Recommendations
      </button>

      {workout && (
        <div className="mt-4">
          <p><strong>Workout Plan:</strong> {workout}</p>
          <p><strong>Meal Plan:</strong> {mealPlan}</p>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
