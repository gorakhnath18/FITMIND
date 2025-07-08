 import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post('/api/auth/login', { email, password });
        if (data) {
             localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
        }
        return data;
    };
    
    const register = async (name, email, password) => {
        const { data } = await api.post('/api/auth/register', { name, email, password });
        if (data) {
             localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
        }
        return data;
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    };
    
     const updateUserState = (newUserDataFromServer) => {
         setUser(prevUser => {
             const updatedUser = {
                ...prevUser, 
                ...newUserDataFromServer, 
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