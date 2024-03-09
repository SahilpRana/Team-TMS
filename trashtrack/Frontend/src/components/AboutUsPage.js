import React from 'react';

function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-200  flex flex-col items-center justify-center">
      <div className="w-[75%] bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Us</h2>
        <p className="text-lg text-gray-600 mb-4">
          CleanUpNow is dedicated to making our communities cleaner and healthier places to live. 
          Our mission is to empower individuals and municipalities to tackle waste management 
          challenges effectively and sustainably.
        </p>
        <p className="text-lg text-gray-600 mb-4">
          At CleanUpNow, we believe in the power of technology to drive positive change. 
          By harnessing the latest advancements in image recognition and geolocation technology, 
          we connect users with municipal resources to streamline the garbage cleanup process.
        </p>
        <p className="text-lg text-gray-600 mb-4">
          Our team is committed to fostering a culture of environmental stewardship and 
          community engagement. Together, we can create a cleaner, greener future for generations 
          to come.
        </p>
        
        {/* Additional Sections */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Values</h3>
          <ul className="list-disc list-inside text-lg text-gray-600">
            <li>Environmental Sustainability</li>
            <li>Community Engagement</li>
            <li>Innovation and Technology</li>
            <li>Transparency and Accountability</li>
            <li>Continuous Improvement</li>
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Team</h3>
          <p className="text-lg text-gray-600">
            Our diverse team of professionals brings together expertise in software development, 
            environmental science, and community outreach. We are passionate about making a 
            positive impact and driving meaningful change in our society.
          </p>
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Get Involved</h3>
          <p className="text-lg text-gray-600">
            Join us in our mission to create a cleaner, greener world. Whether you're an individual 
            looking to volunteer for cleanup events or a municipality interested in partnering with us, 
            we welcome your support and collaboration.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
