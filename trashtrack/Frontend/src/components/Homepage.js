import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for routing
import TestimonialsSection from './Testimonials';

function HomePage({ parentstate }) {
  console.log(parentstate)
  return (
    <div className="flex flex-col w-[75%] mx-auto items-center justify-center min-h-screen bg-gray-100">
      <div className="">
        {/* Header Section */}
        <header className="text-center mt-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">CleanUpNow</h1>
          <p className="text-lg text-gray-600 mt-2">Help make your community cleaner!</p>
        </header>

        {/* Action Buttons Section */}
        <div className="grid w-[80%] mx-auto grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link to={!(parentstate) ? "/login" : "/upload"} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-center">
            Upload Image of Garbage
          </Link>
          <Link to={!(parentstate) ? "/login" : "/task-queue"} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-center">
            View Cleanup Tasks
          </Link>
          <Link to={!(parentstate) ? "/login" : "/contact"} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-center">
            {!(parentstate) ? "Provide Feedback or Ratings" : "Provide Feedback or Ratings"}
          </Link>
          <Link to="/resources" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center">
            Explore Educational Resources
          </Link>
        </div>

        {/* Information Section */}
        <section className="mb-8 max-w-[90%] mx-auto text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 mb-2">
            1. Upload an image of the garbage along with a description.
          </p>
          <p className="text-lg text-gray-600 mb-2">
            2. Our system verifies the image and coordinates the nearest Municipal corporation.
          </p>
          <p className="text-lg text-gray-600 mb-2">
            3. Municipality cleans the area and sends images back for rating and feedback.
          </p>
        </section>

        {/* Educational Content Section */}
        <section className="mb-8 max-w-[90%] mx-auto text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Educational Resources</h2>
          <p className="text-lg text-gray-600 mb-2">
            Learn more about waste management, recycling, environmental sustainability, and community involvement.
          </p>
          <Link to="/resources" className="text-blue-500 hover:underline">Explore Resources</Link>
        </section>

        {/* Testimonials Section */}
        <section className="mb-8 max-w-[90%] mx-auto text-center">
          <TestimonialsSection />
        </section>

        {/* Footer Section
        <footer className="mt-8 text-center">
          <p className="text-sm text-gray-500">&copy; 2024 CleanUpNow. All rights reserved.</p>
          <div className="mt-2">
            <Link to="#" className="text-blue-500 hover:underline">Privacy Policy</Link>
            <span className="mx-2 text-gray-400">|</span>
            <Link to="#" className="text-blue-500 hover:underline">Terms of Service</Link>
          </div>
        </footer> */}
      </div>
    </div>
  );
}

export default HomePage;
