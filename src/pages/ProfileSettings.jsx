import { useState } from "react";

const ProfileSettings = () => {
  const [name, setName] = useState("John Doe");
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const [goal, setGoal] = useState("maintain");

  const handleSave = () => {
    alert("Profile Updated Successfully! (Save to database later)");
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-800 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Profile Settings</h2>

      <label className="block">Full Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 rounded bg-gray-700"
      />

      <label className="block mt-2">Age:</label>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="w-full p-2 rounded bg-gray-700"
      />

      <label className="block mt-2">Weight (kg):</label>
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="w-full p-2 rounded bg-gray-700"
      />

      <label className="block mt-2">Height (cm):</label>
      <input
        type="number"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        className="w-full p-2 rounded bg-gray-700"
      />

      <label className="block mt-2">Select Goal:</label>
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
        onClick={handleSave}
        className="mt-4 bg-blue-500 px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
};

export default ProfileSettings;
