import api from './api';

const jobAlertService = {
    createAlert: async (alertData) => {
        const response = await api.post('/api/v1/job-alerts', alertData);
        return response.data;
    },

    getMyAlerts: async () => {
        const response = await api.get('/api/v1/job-alerts');
        return response.data;
    },

    deleteAlert: async (alertId) => {
        await api.delete(`/api/v1/job-alerts/${alertId}`);
    },

    toggleAlert: async (alertId) => {
        const response = await api.patch(`/api/v1/job-alerts/${alertId}/toggle`);
        return response.data;
    },

    // New: Sync alerts with seeker profile (auto-generate based on skills/sectors)
    syncProfile: async () => {
        const response = await api.post('/api/v1/job-alerts/sync-profile');
        return response.data;
    },

    getMatchedJobs: async () => {
        const response = await api.get('/api/v1/job-alerts/matched');
        return response.data;
    },

    getRecommendedCandidates: async (jobId) => {
        const response = await api.get(`/api/v1/jobs/${jobId}/recommended-candidates`);
        return response.data;
    }
};

export default jobAlertService;
