import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { db } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [metrics, setMetrics] = useState({
    weight: "",
    height: "",
    age: "",
    gender: "",
    activityLevel: "",
    bmi: 0,
    bmr: 0,
    tdee: 0,
    bodyFat: 0,
    lastUpdated: null
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/auth");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };


  const fetchData = async () => {
    if (!user) return;
    
    try {
      const docRef = doc(db, "healthMetrics", user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setMetrics(docSnap.data());
      } else {
        // Initialize empty metrics for new users
        const emptyMetrics = {
          weight: "",
          height: "",
          age: "",
          gender: "",
          activityLevel: "",
          bmi: 0,
          bmr: 0,
          tdee: 0,
          bodyFat: 0,
          lastUpdated: new Date()
        };
        await setDoc(docRef, emptyMetrics);
        setMetrics(emptyMetrics);
      }
    } catch (error) {
      console.error("Error fetching health metrics:", error);
      toast.error("Error fetching health metrics");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      if (!user) {
        toast.error("Please log in to update your metrics");
        return;
      }

      const { weight, height, age, gender, activityLevel } = metrics;
      if (!weight || !height || !age || !gender || !activityLevel) {
        toast.error("Please fill in all fields");
        return;
      }

      const weightNum = Number(weight);
      const heightNum = Number(height);
      const ageNum = Number(age);

      if (weightNum <= 0 || heightNum <= 0 || ageNum <= 0) {
        toast.error("Please enter valid numbers for all fields");
        return;
      }

      const bmi = Number(calculateBMI(weightNum, heightNum));
      const bmr = calculateBMR(weightNum, heightNum, ageNum, gender);
      const tdee = calculateTDEE(bmr, activityLevel);
      const bodyFat = Number(calculateBodyFat(bmi, ageNum, gender));

      const updatedMetrics = {
        weight: weightNum,
        height: heightNum,
        age: ageNum,
        gender,
        activityLevel,
        bmi,
        bmr,
        tdee,
        bodyFat,
        lastUpdated: new Date()
      };

      await setDoc(doc(db, "healthMetrics", user.uid), updatedMetrics);
      
      setMetrics(updatedMetrics);
      toast.success("Health metrics updated successfully!");
    } catch (error) {
      console.error("Error updating metrics:", error);
      toast.error("Failed to update health metrics. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome, {user?.displayName || user?.email?.split('@')[0] || "User"}
              </h1>
              <p className="text-gray-600 mt-1">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>


          {/* Quick Stats Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <div className="bg-indigo-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-indigo-900 mb-4">Workout Stats</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Workouts This Week</span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Calories Burned</span>
                    <span className="font-semibold">1,250</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Minutes</span>
                    <span className="font-semibold">45</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-green-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-green-900 mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-gray-600">Morning Run - 5km</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-gray-600">Strength Training</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-gray-600">Yoga Session</span>
                  </div>
                </div>
              </div>

              {/* Goals Progress */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Goals Progress</h2>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">Weekly Workouts</span>
                      <span className="font-semibold">3/5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">Calorie Goal</span>
                      <span className="font-semibold">1,250/2,000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '62.5%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                to="/workout-meal-plans"
                className="bg-blue-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-2">View Meal Plans</h3>
                <p className="text-white-600">Check your personalized meal plans based on your health metrics</p>
              </Link>
              <Link
                to="/workout-plans"
                className="bg-green-500 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-2">View Workout Plans</h3>
                <p className="text-white-600">Access your customized workout plans</p>
              </Link>
              <Link
                to="/progress"
                className="bg-orange-500 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
                <p className="text-white-600">Monitor your fitness journey and achievements</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
