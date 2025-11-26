// import api from "./axios";

// export const createProduct = (data) => {
//     let headers = {};
//     try {
//         const saved = localStorage.getItem("cyclunoUser");
//         if (saved) {
//             const user = JSON.parse(saved);
//             if (user?.access) {
//                 headers.Authorization = `Bearer ${user.access}`;
//             }
//         }
//     } catch (e) {
//         // ignore parse errors
//     }
//     return api.post("/api/products/", data, { headers })
// };
// export default {createProduct};

import api from "./axios";

export const createProduct = (data) => {
    // We will build a custom headers object just for this request.
    let customHeaders = {};

    try {
        const saved = localStorage.getItem("cyclunoUser");
        if (saved) {
            const user = JSON.parse(saved);
            
            // CRITICAL FIX: The access token is stored under the 'access' key.
            const accessToken = user?.access; 

            if (accessToken) { 
                // Set the Authorization header with the 'Bearer' scheme
                customHeaders.Authorization = `Bearer ${accessToken}`;
                // console.log(" Custom Authorization header set successfully for createProduct.");
            } else {
                console.warn(" products.js: Access token missing in stored user object. Did you log in recently?");
            }
        } else {
            console.warn(" products.js: No user found in localStorage.");
        }
    } catch (e) {
        console.error("products.js: Error parsing localStorage:", e);
    }
    
    // Send the POST request, passing the customHeaders directly.
    return api.post("/api/products/", data, { headers: customHeaders });
};

// Removed the redundant 'export default {createProduct};'