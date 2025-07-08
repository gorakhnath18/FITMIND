import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaTachometerAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';

const ProfileDropdown = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

     useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!user) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="w-10 h-10 rounded-full overflow-hidden border-2 border-accent-cyan hover:opacity-90 transition-opacity">
                <img src={user.pfpUrl} alt="User Profile" className="w-full h-full object-cover" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-dark-card rounded-md shadow-lg border border-gray-700/60 z-50 text-red">
                    <div className="p-4 border-b border-gray-700/60">
                        <p className="font-bold">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                    <ul className="py-1">
                        <li><Link to="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 hover:bg-dark-bg"><FaTachometerAlt className="mr-3" /> Dashboard</Link></li>
                        <li><Link to="/settings" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 hover:bg-dark-bg"><FaCog className="mr-3" /> Settings</Link></li>
                        <hr className="my-1 border-gray-700/60" />
                        <li><button onClick={logout} className="w-full text-left flex items-center px-4 py-2 hover:bg-dark-bg text-red-400"><FaSignOutAlt className="mr-3" /> Logout</button></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;