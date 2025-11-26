import api from "./axios";

// LOGIN
export const login = (data) => api.post("/api/auth/login", data);

// REGISTER
export const signup = (data) => api.post("/api/auth/register", data);

// LOGOUT
export const logout = (refreshToken) => {
    // The backend now expects the refresh token in the request body
    const data = {refresh_token: refreshToken};
    return api.post("/api/auth/logout", data);
};

// CHANGE PASSWORD
export const changePassword = (data) => api.post("/api/auth/change-password", data);

// VERIFY EMAIL
export const verifyEmail = (data) => api.post("api/auth/verify-otp/", data);

//RESET PASSWORD
export const forgotPassword = (data) => api.post("api/auth/auth/password-reset-request/", data);

//RESET PASSWORD CONFIRM
export const forgotPasswordConfirm = (data) => api.post("api/auth/auth/password-reset-confirm/", data);