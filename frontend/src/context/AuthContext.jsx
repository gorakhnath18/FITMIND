import React, { createContext, useState, useContext } from 'react';

const defaultPfp = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2EwYTBiMyI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgM2MxLjY2IDAgMyAxLjM0IDMgM3MtMS4zNCAzLTMgMy0zLTEuMzQtMy0zIDEuMzQtMyAzLTN6bTAgMTRjLTIuNzEgMC01LjE4LTEuNDQtNi43My0zLjU1QzYuOTYgMTQuNjIgOS4yMyAxNCAxMiAxNGM0IDAgNS41IDEuNSAxLjcgMy41NUMxNC43MSA4LjQzIDEwLjQxIDE5IDEyIDE5eiIvPjwvc3ZnPg==";
const AuthContext = createContext(null);

 export const AuthProvider = ({ children }) => {
     const [user, setUser] = useState({
        name: 'Alex Pro',
        email: 'alex.pro@example.com',
        pfpUrl: defaultPfp,
    });

     const login = (userData) => {
         setUser({
            name: userData.name || 'Test User',
            email: userData.email,
            pfpUrl: userData.pfpUrl || defaultPfp,
        });
    };
    
     const logout = () => {
         setUser(null);
    };

     const updatePfp = (newUrl) => {
        if (user) {
            setUser({ ...user, pfpUrl: newUrl || defaultPfp });
         }
    };

    const value = { user, login, logout, updatePfp };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

 export const useAuth = () => {
    return useContext(AuthContext);
};