import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const HealthMetrics = () => {
  const { user, logout } = useAuth();
  const [metrics, setMetrics] = useState({
    weight: "",
    height: "",
    bmi: "",
    bmr: "",
    tdee: "",
    bodyFat: "",
    lastUpdated: null
  });
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch health data
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          setLoading(false);
          return;
        }

        const docRef = doc(db, "healthMetrics", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setMetrics(docSnap.data());
        } else {
          // Initialize empty health metrics document for new users
          const initialMetrics = {
            weight: "",
            height: "",
            bmi: "",
            bmr: "",
            tdee: "",
            bodyFat: "",
            lastUpdated: null
          };
          await setDoc(docRef, initialMetrics);
          setMetrics(initialMetrics);
        }
      } catch (error) {
        console.error("Error fetching health metrics:", error);
        toast.error("Unable to load health metrics. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

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

      if (!metrics.weight || !metrics.height) {
        toast.error("Please enter both weight and height");
        return;
      }

      const weight = Number(metrics.weight);
      const height = Number(metrics.height);

      if (weight <= 0 || height <= 0) {
        toast.error("Weight and height must be positive numbers");
        return;
      }

      const bmi = ((weight / ((height / 100) ** 2))).toFixed(2);
      const updatedMetrics = {
        weight: weight,
        height: height,
        bmi: Number(bmi),
        lastUpdated: new Date()
      };

      const docRef = doc(db, "healthMetrics", user.uid);
      await setDoc(docRef, updatedMetrics);
      
      setMetrics(updatedMetrics);
      toast.success("Health metrics updated successfully!");
    } catch (error) {
      console.error("Error updating metrics:", error);
      toast.error("Failed to update health metrics. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  const calculateBMICategory = (bmi) => {
    if (!bmi) return "Not calculated";
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  const calculateBMR = (weight, height, age, gender) => {
    if (!weight || !height || !age || !gender) return "N/A";
    if (gender === "male") {
      return Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age));
    } else {
      return Math.round(447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age));
    }
  };

  const calculateTDEE = (bmr, activityLevel) => {
    if (!bmr || !activityLevel) return "N/A";
    const activityFactors = {
      sedentary: 1.2,
      lightlyActive: 1.375,
      moderatelyActive: 1.55,
      veryActive: 1.725,
      superActive: 1.9
    };
    return Math.round(bmr * activityFactors[activityLevel] || 1.2);
  };

  const calculateBodyFat = (bmi, age, gender) => {
    if (!bmi || !age || !gender) return "N/A";
    let bodyFat = gender === "male"
      ? (1.20 * bmi) + (0.23 * age) - 16.2
      : (1.20 * bmi) + (0.23 * age) - 5.4;
    return bodyFat.toFixed(1) + "%";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* User Welcome Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.displayName || user?.email?.split('@')[0] || "User"}
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
      </div>

      {/* Health Metrics Update Form */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Update Health Metrics</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                Weight (kg)
              </label>
              <input
                id="weight"
                type="number"
                step="0.1"
                min="20"
                max="300"
                placeholder="Enter your weight"
                value={metrics.weight}
                onChange={(e) => setMetrics({ ...metrics, weight: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              />
            </div>
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                Height (cm)
              </label>
              <input
                id="height"
                type="number"
                step="0.1"
                min="100"
                max="250"
                placeholder="Enter your height"
                value={metrics.height}
                onChange={(e) => setMetrics({ ...metrics, height: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isUpdating}
            className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition font-medium shadow-md disabled:opacity-70"
          >
            {isUpdating ? "Updating..." : "Update Metrics"}
          </button>
        </form>
      </div>

      {/* Health Metrics Display Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Health Metrics</h2>
          <span className="text-sm text-gray-500">
            Last updated: {metrics.lastUpdated ? new Date(metrics.lastUpdated?.toDate()).toLocaleDateString() : 'Not updated'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Weight Card */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Weight</p>
                <p className="text-2xl font-bold text-blue-900">{metrics.weight || "N/A"}</p>
              </div>
              <div className="p-3 bg-blue-200 rounded-full">
                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
            </div>
            <p className="mt-2 text-sm text-blue-600">Kilograms</p>
          </div>

          {/* Height Card */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Height</p>
                <p className="text-2xl font-bold text-green-900">{metrics.height || "N/A"}</p>
              </div>
              <div className="p-3 bg-green-200 rounded-full">
                <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            </div>
            <p className="mt-2 text-sm text-green-600">Centimeters</p>
          </div>

          {/* BMI Card */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">BMI</p>
                <p className="text-2xl font-bold text-purple-900">{metrics.bmi ? Number(metrics.bmi).toFixed(1) : "N/A"}</p>
              </div>
              <div className="p-3 bg-purple-200 rounded-full">
                <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <p className="mt-2 text-sm text-purple-600">{calculateBMICategory(metrics.bmi)}</p>
          </div>
        </div>

        {/* BMR Card */}
        <div className="mt-4 bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">BMR</p>
              <p className="text-2xl font-bold text-blue-900">{metrics.bmr ? Number(metrics.bmr).toFixed(1) : "N/A"} kcal/day</p>
            </div>
            <div className="p-3 bg-blue-200 rounded-full">
              <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v4m0 0v-4m0 0V8m0-4h.01M6 20h12m-6 0v-6" />
              </svg>
            </div>
          </div>
        </div>

        {/* TDEE Card */}
        <div className="mt-4 bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">TDEE</p>
              <p className="text-2xl font-bold text-green-900">{metrics.tdee ? Number(metrics.tdee).toFixed(1) : "N/A"} kcal/day</p>
            </div>
            <div className="p-3 bg-green-200 rounded-full">
              <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Body Fat Card */}
        <div className="mt-4 bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Body Fat</p>
              <p className="text-2xl font-bold text-red-900">{metrics.bodyFat ? Number(metrics.bodyFat).toFixed(1) : "N/A"}%</p>
            </div>
            <div className="p-3 bg-red-200 rounded-full">
              <svg className="w-6 h-6 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12l5 5L20 7" />
              </svg>
            </div>
          </div>
        </div>

        {!metrics.weight && !metrics.height && (
          <div className="mt-6 text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-yellow-700">
              No health metrics available. Please update your measurements above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthMetrics;
