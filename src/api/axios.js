import axios from "axios";
import { isAppInitialized } from "../context/AuthContext";

const api = axios.create({
    baseURL: "https://cycluno-backend-development-service.onrender.com",
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// api.interceptors.request.use((config) => {
//     try {
//         const raw = localStorage.getItem("cyclunoUser");
//         if (raw) {
//             const user = JSON.parse(raw);
//             const token = user?.access;
//             if (token) {
//                 config.headers = { ...config.headers, authorization: `Bearer ${token}` };
//             }
//         }
//     } catch (e) {
//         console.warn("Failed to attach token:", e);
//     }
//     return config;
// });

// from axios.js (inside api.interceptors.request.use)

api.interceptors.request.use(async (config) => {
    console.log("--- Starting API Request Interceptor ---"); //  NEW LOG 1
    if (config.url.includes('/api/') && !isAppInitialized) {
        console.log("Request paused: Waiting for App Initialization...");
        
        // Wait loop: Poll every 50ms until the flag is true
        let attempts = 0;
        while (!isAppInitialized && attempts < 100) { // Max 5 seconds wait
            await new Promise(resolve => setTimeout(resolve, 50));
            attempts++;
        }

        if (!isAppInitialized) {
            console.warn("Initialization timed out. Request proceeding without token.");
        }};

    try {
        const raw = localStorage.getItem("cyclunoUser");
        
        // if (!raw) {
        //     console.warn("No 'cyclunoUser' found in localStorage. Skipping token attachment.");
        //     return config; // Exit early if no user is found
        // }
        
        // const user = JSON.parse(raw);
        // const token = user?.access; 

        // if (token) {
        //     //  NEW LOG 2: Confirming the token and header attachment
        //     console.log("Token found. Attaching header...");
        //     console.log("Token starts with:", token.substring(0, 15) + "...");
            
        //     // This is how you are setting the header:
        //     config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
        // } else {
        //     console.warn("User found, but 'access' token is missing/undefined in the object.");
        // }

        if (raw) {
            const storedUserObject = JSON.parse(raw); 
            
            // ACCESS FIX: The token is at the root of the stored object.
            const token = storedUserObject?.access; 
            
            if (token) {
                // This will now correctly attach the token
                config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
                console.log("✅ Token attached successfully!"); 
            } else {
                // This should no longer log after you successfully log in.
                console.warn("⚠️ User found, but 'access' token is missing/undefined.");
            }
        }
        
    } catch (e) {
        console.warn("Failed to attach token:", e);
    }

    // NEW LOG 3: Show the final header configuration
    console.log("Final Headers for Request:", config.headers);
    console.log("----------------------------------------");
    
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Log the error so you can see it clearly
        console.error("API Error encountered:", error.response?.status, error.message);
        
        // When the fix is live, your 401s should stop.
        // If a 401 happens now, it means the token is expired (as expected with 5s lifetime).
        
        // This line ensures the error is passed down to your component's try/catch block
        return Promise.reject(error); 
    }
);

// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         const originalRequest = error.config;

//         // If 401 and not already retrying, attempt to refresh token
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             if (isRefreshing) {
//                 return new Promise((resolve, reject) => {
//                     failedQueue.push({ resolve, reject });
//                 }).then((token) => {
//                     originalRequest.headers.Authorization = `Bearer ${token}`;
//                     return api(originalRequest);
//                 });
//             }

//             originalRequest._retry = true;
//             isRefreshing = true;

//             try {
//                 const raw = localStorage.getItem("cyclunoUser");
//                 const user = JSON.parse(raw);
//                 const refreshToken = user?.refresh;

//                 console.log("🔄 Attempting token refresh...");
//                 console.log("Refresh token available?", !!refreshToken);

//                 if (!refreshToken) {
//                     throw new Error("No refresh token available");
//                 }

//                 // Call refresh endpoint
//                 return axios
//                     .post(
//                         `${api.defaults.baseURL}/api/auth/token/refresh/`,
//                         { refresh: refreshToken },
//                         { withCredentials: true }
//                     )
//                     .then((res) => {
//                         const newTokenData = res.data?.result || res.data;
//                         const updated = { ...user, ...newTokenData };
//                         localStorage.setItem("cyclunoUser", JSON.stringify(updated));

//                         const newToken = newTokenData.access;
//                         api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
//                         originalRequest.headers.Authorization = `Bearer ${newToken}`;

//                         processQueue(null, newToken);
//                         return api(originalRequest);
//                     })
//                     .catch((refreshErr) => {
//                         processQueue(refreshErr, null);
//                         console.error("Token refresh failed:", refreshErr.response?.data || refreshErr.message);
//                         localStorage.removeItem("cyclunoUser");
//                         // window.location.href = "/login";
//                         return Promise.reject(refreshErr);
//                     })
//                     .finally(() => {
//                         isRefreshing = false;
//                     });
//             } catch (err) {
//                 isRefreshing = false;
//                 processQueue(err, null);
//                 localStorage.removeItem("cyclunoUser");
//                 // window.location.href = "/login";
//                 return Promise.reject(err);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

export default api;