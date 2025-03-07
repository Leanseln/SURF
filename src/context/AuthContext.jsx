import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // ✅ Load authentication status from localStorage on startup
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem("isAuthenticated") === "true";
    });

    // ✅ Save authentication status to localStorage when it changes
    useEffect(() => {
        localStorage.setItem("isAuthenticated", isAuthenticated);
    }, [isAuthenticated]);

    const login = (password, navigate) => {
        const ADMIN_PASSWORD = "surfproject2024!";
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            localStorage.setItem("isAuthenticated", "true"); // ✅ Save login status
            navigate("/dashboard");
        } else {
            alert("Invalid password");
        }
    };

    const logout = (navigate) => {
        setIsAuthenticated(false);
        localStorage.removeItem("isAuthenticated"); // ✅ Clear on logout
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
