import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import HealthMetrics from "./pages/HealthMetrics";
import ProgressTracking from "./pages/ProgressTracking";
import Recommendations from "./pages/Recommendations";
import WorkoutMealPlans from "./pages/WorkoutMealPlans";
import HydrationTracker from "./pages/HydrationTracker";
import SleepTracker from "./pages/SleepTracker";
import ProfileSettings from "./pages/ProfileSettings";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/auth" />;
  }
  return children;
};

function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      
      <main className="container mx-auto px-4 py-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/auth" element={user ? <Navigate to="/dashboard" /> : <AuthPage />} />
          <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <SignupPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<Home />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/metrics" element={<ProtectedRoute><HealthMetrics /></ProtectedRoute>} />
          <Route path="/progress" element={<ProtectedRoute><ProgressTracking /></ProtectedRoute>} />
          <Route path="/recommendations" element={<ProtectedRoute><Recommendations /></ProtectedRoute>} />
          <Route path="/workout-meal-plans" element={<ProtectedRoute><WorkoutMealPlans /></ProtectedRoute>} />
          <Route path="/hydration-tracker" element={<ProtectedRoute><HydrationTracker /></ProtectedRoute>} />
          <Route path="/sleep-tracker" element={<ProtectedRoute><SleepTracker /></ProtectedRoute>} />
          <Route path="/profile-settings" element={<ProtectedRoute><ProfileSettings /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/auth"} />} />

          <Route path="/footer" element={<Footer />} />

        </Routes>
      </main>
    </div>
  );
}

export default App;
