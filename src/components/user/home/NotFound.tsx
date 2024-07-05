// src/components/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-700">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
                <p className="text-lg mb-8">Sorry, the page you are looking for does not exist.</p>
                <Link to="/" className="inline-block px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300">
                    Go to Homepage
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
