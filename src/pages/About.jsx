import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700">
            We are dedicated to helping people achieve their fitness goals through personalized workout plans,
            nutrition guidance, and comprehensive health tracking. Our platform combines cutting-edge technology
            with proven fitness methodologies to deliver the best possible results for our users.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Personalized workout plans tailored to your goals</li>
            <li>Nutrition tracking and meal planning</li>
            <li>Progress tracking and analytics</li>
            <li>Sleep and hydration monitoring</li>
            <li>Expert recommendations and guidance</li>
            <li>Community support and motivation</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className="text-gray-700">
            Our team consists of certified fitness trainers, nutritionists, and technology experts
            who are passionate about helping you achieve your health and fitness goals. We combine
            our expertise to provide you with the most effective and user-friendly fitness platform.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About; 