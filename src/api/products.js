import api from "./axios";

export const createProduct = (data) => {

    return api.post("/api/products/", data);
};
export default {createProduct};