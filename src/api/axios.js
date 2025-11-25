import axios from "axios";

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

api.interceptors.request.use((config) => {
    try {
        const raw = localStorage.getItem("cyclunoUser");
        if (raw) {
            const user = JSON.parse(raw);
            const token = user?.access;
            if (token) {
                config.headers = { ...config.headers, authorization: `Bearer ${token}` };
            }
        }
    } catch (e) {
        console.warn("Failed to attach token:", e);
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;

        // If 401 and not already retrying, attempt to refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const raw = localStorage.getItem("cyclunoUser");
                const user = JSON.parse(raw);
                const refreshToken = user?.refresh;

                console.log("🔄 Attempting token refresh...");
                console.log("Refresh token available?", !!refreshToken);

                if (!refreshToken) {
                    throw new Error("No refresh token available");
                }

                // Call refresh endpoint
                return axios
                    .post(
                        `${api.defaults.baseURL}/api/auth/token/refresh/`,
                        { refresh: refreshToken },
                        { withCredentials: true }
                    )
                    .then((res) => {
                        const newTokenData = res.data?.result || res.data;
                        const updated = { ...user, ...newTokenData };
                        localStorage.setItem("cyclunoUser", JSON.stringify(updated));

                        const newToken = newTokenData.access;
                        api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;

                        processQueue(null, newToken);
                        return api(originalRequest);
                    })
                    .catch((refreshErr) => {
                        processQueue(refreshErr, null);
                        console.error("Token refresh failed:", refreshErr.response?.data || refreshErr.message);
                        localStorage.removeItem("cyclunoUser");
                        // window.location.href = "/login";
                        return Promise.reject(refreshErr);
                    })
                    .finally(() => {
                        isRefreshing = false;
                    });
            } catch (err) {
                isRefreshing = false;
                processQueue(err, null);
                localStorage.removeItem("cyclunoUser");
                // window.location.href = "/login";
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default api;