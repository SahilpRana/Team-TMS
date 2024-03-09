import React, { useState } from 'react';
import NearestMunicipalityFinder from './Nearest';

function UploadPage({ user }) {
  // State variables
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');

  // Handle file change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle description change
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // Get user's location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setError('');
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setError('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('description', description);
    formData.append("location",location)

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('Response recorded successfully');
        setError('');
      } else {
        console.error('Failed to upload file');
        setError('Failed to upload file. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Error uploading file. Please try again later.');
    }
  };

  // Render component
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-8 bg-gray-100">
      <div className="flex flex-row justify-center w-full mb-8">
        {/* Left Section (Location and Nearest Municipality Finder) */}
        <div className="mr-8">
  <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md mb-8 min-h-72">
    <h1 className="text-3xl font-bold mb-4">Get User Location</h1>
    <p className="mb-4">Click the button below to retrieve your current location.</p>
    <button
      onClick={getLocation}
      className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Get My Location
    </button>
    {location && (
      <p className="mt-4">
        Latitude: {location.latitude}<br />
        Longitude: {location.longitude}
      </p>
    )}
  </div>

  {/* Nearest Municipality Finder */}
  <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md ">
    <NearestMunicipalityFinder />
  </div>
</div>
     

        {/* Right Section (Form) */}
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload Image of Garbage</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="image" className="block text-gray-700 font-semibold">Select Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="mt-2 border-gray-300 border-[1.5px] focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded-md p-2 w-full"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-gray-700 font-semibold">Description:</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                className="mt-2 border-gray-300 border-[1.5px] focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded-md p-2 w-full"
                value={description}
                onChange={handleDescriptionChange}
                placeholder='Enter vital details'
              ></textarea>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="bg-blue-500  hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
