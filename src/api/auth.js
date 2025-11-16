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
export const verifyEmail = (token) => api.get(`/api/auth/verify-email/?token=${token}`);