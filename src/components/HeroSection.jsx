import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center bg-gray-100">
      <h2 className="text-4xl font-bold">Track Your Fitness Journey</h2>
      <p className="text-lg text-gray-600 mt-4">Monitor your health, track progress, and stay fit.</p>
      <Link to="/auth" className="mt-6 px-6 py-3 bg-blue-600 text-white rounded">Get Started</Link>
    </div>
  );
};

export default HeroSection;
