import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profession: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    // Convert name and email to uppercase
    if (name === 'name' || name === 'email') {
      updatedValue = value.toUpperCase();
    }

    setFormData({
      ...formData,
      [name]: updatedValue
    });
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const postData = async (e) => {
    e.preventDefault();
    const { name, email, phone, profession, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    const res = await fetch("http://localhost:5000/backsignup", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        name, email, phone, profession, password, confirmPassword
      })
    });

    const data = await res.json();

    if (!data) {
      alert("Invalid data");
    } else {
      alert("Successful");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen pt-8 flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-medium text-blue-500 text-center mb-4">Create New Account</h2>
        <div className="font-medium text-green-500 hover:underline hover:text-green-600 text-center mb-4"><Link to="/login">Already registered? Login</Link></div>

        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="border-gray-300 border-[1.5px] focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded-md p-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="border-gray-300 border-[1.5px] focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded-md p-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone:</label>
            <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="border-gray-300 border-[1.5px] focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded-md p-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="profession" className="block text-gray-700 font-medium mb-2">Profession:</label>
            <input type="text" id="profession" name="profession" value={formData.profession} onChange={handleChange} className="border-gray-300 border-[1.5px] focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded-md p-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password:</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} id="password" name="password" value={formData.password} onChange={handleChange} className="border-gray-300 border-[1.5px] focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded-md p-2 w-full" />
              <span className="absolute right-3 top-3" onClick={() => togglePasswordVisibility('password')}>
                {showPassword ? <i className="fas fa-eye-slash text-gray-500"></i> : <i className="fas fa-eye text-gray-500"></i>}
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm Password:</label>
            <div className="relative">
              <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="border-gray-300 border-[1.5px] focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded-md p-2 w-full" />
              <span className="absolute right-3 top-3" onClick={() => togglePasswordVisibility('confirmPassword')}>
                {showConfirmPassword ? <i className="fas fa-eye-slash text-gray-500"></i> : <i className="fas fa-eye text-gray-500"></i>}
              </span>
            </div>
          </div>
          <button type="submit" onClick={postData} className="bg-blue-500 hover:bg-blue-600 text-center w-full text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
