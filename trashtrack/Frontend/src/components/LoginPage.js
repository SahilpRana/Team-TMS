import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as EyeIcon } from './eye-on.svg';
import { ReactComponent as EyeOffIcon } from './eye-off.svg';

function LoginPage({ setParentState, setActiveProfile }) {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const updateParentState = () => {
    setParentState(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/backlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);

        // If login is successful, store user data in a prop object
        const userData = {
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone,
          profession: data.user.profession,
          password: data.user.password
        };

        setActiveProfile(userData)
        // Call the function to update the parent state with user data
        updateParentState();

        navigate('/profile'); // Navigate to profile page upon successful login
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Internal server error');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value.toUpperCase()); // Convert email to uppercase
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl  font-medium text-blue-500 text-center  mb-5">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <label htmlFor="email" className=" block text-gray-700 font-medium mb-3">Email:</label>
            <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} className="border-gray-300 border-[1.5px] border-solid border-x-gray-300  focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded-md p-2 w-full" />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-3">Password:</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border-[1.5px] border-solid border-x-gray-300 rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 mb-6rounded-md p-2 w-full" />
              <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 mb-5">{error}</p>}
          <button type="submit" className="bg-green-500 hover:bg-green-600 mt-8 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 w-[100%] text-center focus:ring-blue-500">Login</button>
        </form>
        <p className="mt-4 text-gray-600">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:text-blue-800 font-bold">Sign Up</Link>
        </p>
        {/* <div className="flex justify-center items-center mt-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline">
            Sign in with Facebook
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Sign in with Google
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default LoginPage;
