import apiClient from './apiClient.js';

const BASE_PATH = '/dashboard';

export const dashboardService = {
    /**
     * Get dashboard statistics
     * @returns {Promise<Object>}
     */
    getStats: async () => {
        try {
            return await apiClient.get(`${BASE_PATH}/stats`);
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            throw error;
        }
    }
};

export default dashboardService;
