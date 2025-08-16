import { useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    activityLevel: "sedentary",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Updated:", profile);
  };

  return (
    <div>
      <div className="p-6 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Enter Your Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="age"
            value={profile.age}
            onChange={handleChange}
            placeholder="Enter Age"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="weight"
            value={profile.weight}
            onChange={handleChange}
            placeholder="Enter Weight (kg)"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="height"
            value={profile.height}
            onChange={handleChange}
            placeholder="Enter Height (cm)"
            className="w-full p-2 border rounded"
          />
          <select
            name="activityLevel"
            value={profile.activityLevel}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="sedentary">Sedentary (Little Exercise)</option>
            <option value="light">Light Activity (1-2 days/week)</option>
            <option value="moderate">Moderate Activity (3-5 days/week)</option>
            <option value="active">Active (6-7 days/week)</option>
            <option value="very active">Very Active (Athlete)</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
