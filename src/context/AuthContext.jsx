import { createContext, useState, useEffect } from "react";
import { login as loginAPI, signup as signupAPI, logout as logoutAPI } from "../api/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // prevent flicker on refresh

  // Keep user logged in using localStorage
    useEffect(() => {
        const savedUser = localStorage.getItem("cyclunoUser");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const loginUser = (userData) => {
        setUser(userData);
        localStorage.setItem("cyclunoUser", JSON.stringify(userData));
    };

    const login = async (credentials) => {
        try {
            const res = await loginAPI(credentials);
            loginUser(res.data.data);
            return { success: true };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Login failed",
            };
        }
    };

    const signup = async (formData) => {
        try {
            const res = await signupAPI(formData);
            return { success: true, data: res.data };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Signup failed",
            };
        }
    };

    const logout = async () => {
        try {
            await logoutAPI();
        } catch (_) {}

        localStorage.removeItem("cyclunoUser");
        setUser(null);
    };

return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
        {!loading && children}
    </AuthContext.Provider>
);
}