import React from 'react';
import { Link } from 'react-router-dom';
import {
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaGithub,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt
} from 'react-icons/fa';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white mt-auto border shadow-inner">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                About Learning Dashboard
                            </h3>
                            <p className="text-gray-600 text-sm">
                               Platform to enhance your learning
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Links
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        to="/content"
                                        className="text-gray-600 hover:text-blue-500 text-sm"
                                    >
                                        Learning Content
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/assessment"
                                        className="text-gray-600 hover:text-blue-500 text-sm"
                                    >
                                        Assessments
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/profile"
                                        className="text-gray-600 hover:text-blue-500 text-sm"
                                    >
                                        Your Profile
                                    </Link>
                                </li>
                                
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Contact Us
                            </h3>
                            <ul className="space-y-2">
                                <li className="flex items-center text-gray-600 text-sm">
                                    shivam@gmail.com
                                </li>
                                <li className="flex items-center text-gray-600 text-sm">
                                    +91 1234567890
                                </li>
                                <li className="flex items-center text-gray-600 text-sm">
                                    123 Begusarai
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Follow Us
                            </h3>
                            <div className="flex space-x-4">
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    <FaFacebook className="w-6 h-6" />
                                </a>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-blue-400 transition-colors"
                                >
                                    <FaTwitter className="w-6 h-6" />
                                </a>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-blue-700 transition-colors"
                                >
                                    <FaLinkedin className="w-6 h-6" />
                                </a>
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    <FaGithub className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 mt-8 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="text-gray-500 text-sm">
                                © {currentYear} Learning Dashboard. All rights reserved.
                            </p>
                            <div className="flex space-x-4 mt-4 md:mt-0">
                                <Link
                                    to="/privacy"
                                    className="text-gray-500 hover:text-blue-500 text-sm"
                                >
                                    Privacy Policy
                                </Link>
                                <Link
                                    to="/terms"
                                    className="text-gray-500 hover:text-blue-500 text-sm"
                                >
                                    Terms of Service
                                </Link>
                                <Link
                                    to="/cookies"
                                    className="text-gray-500 hover:text-blue-500 text-sm"
                                >
                                    Cookie Policy
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;