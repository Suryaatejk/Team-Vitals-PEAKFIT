import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AppContext";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-blue-800 mb-4">Welcome to <img src="src/assets/m-text.png" className="inline h-12 " /></h1>
        
        {user ? (
          // Logged in content
          <div>
            <p className="text-xl text-gray-700 mb-8">Welcome back, {user.email}!</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate('/dashboard')}
              >
                <div className="text-indigo-600 text-4xl mb-3">📊</div>
                <h3 className="text-lg font-semibold mb-2">Dashboard</h3>
                <p className="text-gray-600">View your fitness overview and progress</p>
              </div>
              <div 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate('/health-metrics')}
              >
                <div className="text-indigo-600 text-4xl mb-3">💪</div>
                <h3 className="text-lg font-semibold mb-2">Health Metrics</h3>
                <p className="text-gray-600">Track your daily health and fitness metrics</p>
              </div>
              <div 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate('/progress-tracking')}
              >
                <div className="text-indigo-600 text-4xl mb-3">🏆</div>
                <h3 className="text-lg font-semibold mb-2">Progress</h3>
                <p className="text-gray-600">Monitor your fitness journey and achievements</p>
              </div>
            </div>
          </div>
        ) : (
          // Logged out content
          <div>
            <p className="text-xl text-gray-700 mb-8">Your personal fitness companion for a healthier lifestyle</p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link to="/login" className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transform hover:scale-105 transition duration-300 shadow-md">
                Login
              </Link>
              <Link to="/signup" className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transform hover:scale-105 transition duration-300 shadow-md">
                Sign Up
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-indigo-600 text-4xl mb-3">📊</div>
                <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
                <p className="text-gray-600">Monitor your fitness journey with detailed metrics and visualizations</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-indigo-600 text-4xl mb-3">💪</div>
                <h3 className="text-lg font-semibold mb-2">Set Goals</h3>
                <p className="text-gray-600">Create personalized fitness goals and track your achievements</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-indigo-600 text-4xl mb-3">🏆</div>
                <h3 className="text-lg font-semibold mb-2">Stay Motivated</h3>
                <p className="text-gray-600">Earn rewards and celebrate milestones on your fitness journey</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
