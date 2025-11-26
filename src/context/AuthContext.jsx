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
            console.log('useEffect', user);
            
        }
        // setLoading(false);
        setInitializing(false);
    }, []);

    // const loginUser = (userData) => {
    //     setUser(userData)
    //     console.log(user);
    //     localStorage.setItem("cyclunoUser", JSON.stringify(userData));
    //     console.log("Saved to localStorage:", JSON.parse(localStorage.getItem("cyclunoUser")));
    // };
    const loginUser = (userData) => {
        // --- CRITICAL FIX ---
        // 1. Check if the incoming data contains the necessary 'access' token.
        // If it doesn't, assume it's incomplete data (the corrupting call) and DO NOT save it.
        if (!userData || !userData.access) {
            console.warn("loginUser blocked: Attempted to save incomplete user data (missing access token).");
            // We set the React state but skip overwriting localStorage
            setUser(userData);
            // This is likely the line that was causing the corruption
            // console.log(user); 
            return; 
        }

        // 2. If the data is complete, proceed with saving.
        setUser(userData);
        // console.log(user); // This line is unsafe, better to log the saved data directly
        localStorage.setItem("cyclunoUser", JSON.stringify(userData));
        // console.log("Saved complete payload to localStorage:", JSON.parse(localStorage.getItem("cyclunoUser")));
    };

    const login = async (credentials) => {
        try {
            const res = await loginAPI(credentials);
            
            // return the api response so callers can access res.data (email/user)
            const payload = res?.data?.result || res?.data;
            
            if (payload) {
                loginUser(payload)
                // console.log("After login, saved to localStorage:", JSON.parse(localStorage.getItem("cyclunoUser")));
            }
            // if payload contains a user object, set it in context
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
        }finally{
            // setLoading(false);
        }
    };

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

    // const logout = async () => {
    //     try {
    //         await logoutAPI();
    //     } catch (_) {}

    //     localStorage.removeItem("cyclunoUser");
    //     setUser(null);
    // };

    const logout = async () => {
        // 1. Safely retrieve the refresh token from localStorage
        const raw = localStorage.getItem("cyclunoUser");
        let refreshToken = null;

        if (raw) {
            try {
                const storedUser = JSON.parse(raw);
                // CRITICAL FIX: The refresh token is at the root of the stored object.
                refreshToken = storedUser?.refresh; 
            } catch (e) {
                console.error("Failed to parse user data for logout:", e);
            }
        }
        
        // 2. Call the API only if the token exists
        if (refreshToken) {
            try {
                // Pass the token to the updated logoutAPI function
                await logoutAPI(refreshToken);
                console.log("Backend logout successful.");
            } catch (error) {
                console.warn("Backend logout failed (Token might be expired):", error.message);
            }
        } else {
            console.log("No refresh token found. Skipping backend logout call.");
        }

        // 3. Mandatory Frontend Cleanup (Always runs)
        localStorage.removeItem("cyclunoUser");
        setUser(null);
    };

return (
    <AuthContext.Provider value={{ user, initializing, login, signup, logout, loginUser }}>
        {!initializing && children}
    </AuthContext.Provider>
);
}