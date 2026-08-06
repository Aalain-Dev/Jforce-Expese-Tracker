import { apiClient } from "../../apiBase.js"

export const register = async ({ username, email, password, full_name }) => {
    const data = { username, password, email, full_name };
    const response = await apiClient.post("/auth/signup", data);
    return response.data;
};

export const loginuser = async ({ email, password }) => {
    const data = { email, password };
    const response = await apiClient.post("/auth/login", data);
    return response.data;
};