import React from "react";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-900 text-white p-6">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-white">
          {title || "Welcome to ChatVerse"}
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          {subtitle ||
            "A seamless chat experience with a touch of elegance."}
        </p>
      </div>

      {/* Decorative Content */}
      <div className="relative w-full flex justify-center mb-10">
        <div className="w-72 h-72 bg-gray-800 rounded-full opacity-30"></div>
        <div className="absolute w-56 h-56 bg-gray-700 rounded-full opacity-40"></div>
        <div className="absolute w-48 h-48 bg-gray-600 rounded-full opacity-50"></div>
      </div>

      {/* Features List */}
      <ul className="space-y-4">
        <li className="flex items-center space-x-3">
          <span className="bg-gray-500 w-3 h-3 rounded-full"></span>
          <p className="text-gray-300">Real-time messaging</p>
        </li>
        <li className="flex items-center space-x-3">
          <span className="bg-gray-500 w-3 h-3 rounded-full"></span>
          <p className="text-gray-300">End-to-end encryption</p>
        </li>
        <li className="flex items-center space-x-3">
          <span className="bg-gray-500 w-3 h-3 rounded-full"></span>
          <p className="text-gray-300">Interactive UI/UX</p>
        </li>
        <li className="flex items-center space-x-3">
          <span className="bg-gray-500 w-3 h-3 rounded-full"></span>
          <p className="text-gray-300">Customizable themes</p>
        </li>
      </ul>

      {/* Call to Action */}
      <div className="mt-10">
        <button className="bg-gray-700 text-white font-semibold px-6 py-3 rounded-full hover:bg-gray-600 transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default AuthImagePattern;
