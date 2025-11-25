import api from "./axios";

// LOGIN
export const login = (data) => api.post("/api/auth/login", data);

// REGISTER
export const signup = (data) => api.post("/api/auth/register", data);

// LOGOUT
export const logout = () => api.post("/api/auth/logout");

// CHANGE PASSWORD
export const changePassword = (data) => api.post("/api/auth/change-password", data);

// VERIFY EMAIL
export const verifyEmail = (token) => {
    if (!token) {
    return Promise.reject(new Error("Missing token or verification params"));
}

  // If passed a full URL string containing query params
if (token) {
    try {
    const url = new URL(token);
    const uid = url.searchParams.get("uid");
    const token = url.searchParams.get("token");
    if (uid && token) {
        return api.get(`/api/auth/verify-email/?uid=${encodeURIComponent(uid)}&token=${encodeURIComponent(token)}`);
    }
    } catch (_) {
      // not a full URL — fall through to treat as token string
    }

    // treat as token only
    // return api.get(`/api/auth/verify-email/?token=${encodeURIComponent(token)}`);
}

return Promise.reject(new Error("Invalid verification parameters"));
}
// api.get(`/api/auth/verify-email/?token=${token}`);