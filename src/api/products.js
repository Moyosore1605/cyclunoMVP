import api from "./axios";

export const createProduct = (data) => {
    let headers = {};
    try {
        const saved = localStorage.getItem("cyclunoUser");
        if (saved) {
            const user = JSON.parse(saved);
            if (user?.token) {
                headers.Authorization = `Bearer ${user.token}`;
            }
        }
    } catch (e) {
        // ignore parse errors
    }

    return api.post("/api/products/", data, { headers })

    // return api.post("/api/products/", data);
};
export default {createProduct};