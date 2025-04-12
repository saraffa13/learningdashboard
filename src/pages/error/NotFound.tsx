import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-purple-700">404</h1>
                </div>

                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-purple-900 mb-2">
                        Page Not Found
                    </h2>
                    <p className="text-purple-600 text-lg">
                        The page you're looking for doesn't exist.
                    </p>
                </div>

                <div className="mb-8">
                    <Link
                        to="/"
                        className="inline-flex items-center px-6 py-3 bg-purple-700 text-white font-medium rounded-lg hover:bg-purple-800 transition-colors"
                    >
                        <FaHome className="mr-2" />
                        Return to Home
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default NotFound;