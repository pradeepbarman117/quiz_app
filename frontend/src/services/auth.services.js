import apiClient from "@/api/baseAPI";

const authServices = {
    login: (credentials) => {
        return apiClient.post('/users/auth/login', credentials)
    },

    register: (credentials) => {
        return apiClient.post('/users/auth/register', credentials)
    },

    validateSession: () => {
        return apiClient.get('/auth/validate-session')
    }
};

export default authServices;