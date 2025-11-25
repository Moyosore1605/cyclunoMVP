import { createContext, useState, useEffect } from "react";
import { login as loginAPI, signup as signupAPI, logout as logoutAPI } from "../api/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    // const [loading, setLoading] = useState(true); // prevent flicker on refresh
    const [initializing, setInitializing] = useState(true);

  // Keep user logged in using localStorage
    useEffect(() => {
        const savedUser = localStorage.getItem("cyclunoUser");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        // setLoading(false);
        setInitializing(false);
    }, []);

    const loginUser = (userData) => {
        setUser(userData);
        localStorage.setItem("cyclunoUser", JSON.stringify(userData));
        console.log("Saved to localStorage:", JSON.parse(localStorage.getItem("cyclunoUser")));
    };

    const login = async (credentials) => {
        try {
            // setLoading(true);
            // const res = await loginAPI(credentials);
            // const userData = res.data?.data;
            // setUser(userData);
            // return { success: true };
            const res = await loginAPI(credentials);
            
            // return the api response so callers can access res.data (email/user)
            const payload = res?.data?.result || res?.data;
            
            if (payload) {
                loginUser(payload)
                console.log("After login, saved to localStorage:", JSON.parse(localStorage.getItem("cyclunoUser")));
            }
            // if payload contains a user object, set it in context
            // const userData = payload?.data ?? payload?.user ?? (typeof payload === 'string' ? { email: payload } : payload) ?? null;
            // if (userData) setUser(userData);
            return { success: true, data: payload };

        } catch (err) {
            let message = "Login failed";
            if (err.response?.data) {
                // backend may return: { message: "..."} OR field errors
                if (typeof err.response.data === "string") {
                    message = err.response.data;
                } else if (err.response.data.message) {
                    message = err.response.data.message;
                } else {
                  // collect field errors (job_title, team_size...)
                    message = Object.values(err.response.data).flat().join("\n");
                }
            }
            return { success: false, message };
            // return {
            //     success: false,
            //     message: err.response?.data?.message || err.response?.data?.error || JSON.stringify(err.response?.data) || "Login failed",
            // };
        }finally{
            // setLoading(false);
        }
    };

    // const signup = async (formData) => {
    //     try {
    //         setLoading(true);
    //         const res = await signupAPI(formData);
    //         return { success: true, data: res.data };
    //     } catch (err) {
    //         return {
    //             success: false,
    //             message: err.response?.data?.message || "Signup failed",
    //         };
    //     }finally{
    //         setLoading(false);
    //     }
    // };

    const signup = async (formData) => {
        try {
            // setLoading(true);
            const res = await signupAPI(formData);
            return { success: true, data: res.data };
        } catch (err) {
            let message = "Signup failed";
            if (err.response?.data) {
                if (typeof err.response.data === "string") {
                    message = err.response.data;
                } else if (err.response.data.message) {
                    message = err.response.data.message;
                } else {
                    // collect field errors (e.g. { password: ["..."], email: ["..."] })
                    message = Object.values(err.response.data).flat().join("\n");
                }
            }
            return { success: false, message };
        } finally {
            // setLoading(false);
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
    // <AuthContext.Provider value={{ user, loading, login, signup, logout, loginUser }}>
    //     {!loading && children}
    <AuthContext.Provider value={{ user, initializing, login, signup, logout, loginUser }}>
        {!initializing && children}
    </AuthContext.Provider>
    // </AuthContext.Provider>
);
}