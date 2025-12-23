import api from './api';

const adminUserService = {
    // Get all users, optionally filtered by type (SEEKER/EMPLOYER)
    getAllUsers: async (type = null) => {
        const params = type ? { type } : {};
        const response = await api.get('/api/v1/admin/users', { params });
        return response.data;
    },

    getUserById: async (id) => {
        const response = await api.get(`/api/v1/admin/users/${id}`);
        return response.data;
    },

    updateUser: async (id, data) => {
        const response = await api.put(`/api/v1/admin/users/${id}`, data);
        return response.data;
    },

    deleteUser: async (id) => {
        await api.delete(`/api/v1/admin/users/${id}`);
    }
};

export default adminUserService;
