import React from 'react';

function TestimonialsSection() {
  return (
    <section className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Testimonials</h2>
          <p className="text-lg text-gray-600 mt-2">See what our users are saying about us!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Testimonial Card for Sambhav */}
          <div className="bg-white flex flex-col justify-between rounded-lg shadow-md p-6">
            <p className="text-gray-700 text-lg mb-4">
              "CleanUpNow has transformed the way we tackle garbage in our community. It's incredibly easy to use and has made a huge difference!"
            </p>
            <p className="text-gray-600 font-semibold">- Sambhav</p>
          </div>
          {/* Testimonial Card for Sahil Rana */}
          <div className="bg-white flex flex-col justify-between rounded-lg shadow-md p-6">
            <p className="text-gray-700 text-lg mb-4">
              "I'm amazed at how quickly and efficiently CleanUpNow gets the job done. It's revolutionizing the way we keep our city clean!"
            </p>
            <p className="text-gray-600 font-semibold">- Sahil Rana</p>
          </div>
          {/* Testimonial Card for Tanishq Parashar */}
          <div className="bg-white flex flex-col justify-between rounded-lg shadow-md p-6">
            <p className="text-gray-700 text-lg mb-4">
              "CleanUpNow is a game-changer! It's inspiring to see the impact it's making on our environment and community."
            </p>
            <p className="text-gray-600 font-semibold">- Tanishq Parashar</p>
          </div>
          <div className="bg-white flex flex-col justify-between rounded-lg shadow-md p-6">
            <p className="text-gray-700 text-lg mb-4">
            "CleanUpNow has truly revolutionized the way we manage waste in our neighborhood. Its user-friendly interface and efficiency have made waste disposal a breeze!"            </p>
            <p className="text-gray-600 font-semibold">-Vyom Sharma</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
