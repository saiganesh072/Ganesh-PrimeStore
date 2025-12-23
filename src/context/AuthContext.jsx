import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (email, password) => {
        // Mock login
        if (email && password) {
            setUser({ email, name: email.split('@')[0] });
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
    };

    const signup = (email, password) => {
        // Mock signup
        if (email && password) {
            setUser({ email, name: email.split('@')[0] });
            return true;
        }
        return false;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
};
