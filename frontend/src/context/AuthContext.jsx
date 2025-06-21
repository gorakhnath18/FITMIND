 import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const userInfo = localStorage.getItem('userInfo');
            if (userInfo) {
                setUser(JSON.parse(userInfo));
            }
        } catch (error) {
            console.error("Failed to parse user info from localStorage", error);
            localStorage.removeItem('userInfo'); // Clear corrupted data
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post('/api/auth/login', { email, password });
        if (data && data.token) {
            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
        }
        return data;
    };
    
    const register = async (name, email, password) => {
        const { data } = await api.post('/api/auth/register', { name, email, password });
        if (data && data.token) {
            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
        }
        return data;
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    };
    
    // This is the most robust way to update state that depends on previous state.
    const updateUserState = (newUserDataFromServer) => {
        setUser(prevUser => {
            // Ensure we always have a previous user and their token
            if (!prevUser || !prevUser.token) {
                console.error("Update user state called without a valid previous session. Aborting.");
                return prevUser; // Abort update if token is missing
            }
            const updatedUser = {
                ...prevUser, // Preserves the token and other non-updated fields
                ...newUserDataFromServer, // Overwrites fields like level and xp
            };
            localStorage.setItem('userInfo', JSON.stringify(updatedUser));
            return updatedUser;
        });
    };

    const value = { user, loading, login, register, logout, updateUserState };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};