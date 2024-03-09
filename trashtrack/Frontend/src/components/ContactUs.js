import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ContactUs() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, message } = formData;

        try {
            const response = await fetch("http://localhost:5000/contact", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    message
                })
            });

            if (response.ok) {
                alert("Message sent successfully!");
                navigate("/"); // Redirect to the home page or any other page after successful submission
            } else {
                alert("Failed to send message. Please try again later.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-4xl font-medium text-blue-500 text-center  mb-4">Contact Us</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium">Name:</label>
                        <input type="text" id="name" name="name" className="mt-2 border-gray-300 border-[1.5px] focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded-md p-2 w-full" required onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium">Email:</label>
                        <input type="email" id="email" name="email" className="mt-2 border-gray-300 border-[1.5px] focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded-md p-2 w-full" required onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="message" className="block  text-gray-700 font-medium">Message:</label>
                        <textarea id="message" placeholder='Enter your query here: ' name="message" rows="4" className="mt-2 border-gray-300 border-[1.5px] focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 mb-5 rounded-md p-2 w-full" required onChange={handleChange}></textarea>
                    </div>
                    <button type="submit" className="bg-green-500  hover:bg-green-600 text-center w-full text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">Submit</button>
                </form>
            </div>
        </div>
    );
}
