import apiClient from './apiClient.js';

const BASE_PATH = '/transactions';

export const transactionService = {
    /**
     * Get all transactions
     * @returns {Promise<Array>}
     */
    getAll: async () => {
        try {
            return await apiClient.get(BASE_PATH);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            throw error;
        }
    },

    /**
     * Get inbound transactions
     * @returns {Promise<Array>}
     */
    getInbound: async () => {
        try {
            return await apiClient.get(`${BASE_PATH}/in`);
        } catch (error) {
            console.error('Error fetching inbound transactions:', error);
            throw error;
        }
    },

    /**
     * Get outbound transactions
     * @returns {Promise<Array>}
     */
    getOutbound: async () => {
        try {
            return await apiClient.get(`${BASE_PATH}/out`);
        } catch (error) {
            console.error('Error fetching outbound transactions:', error);
            throw error;
        }
    },

    /**
     * Record a new transaction
     * @param {Object} transactionData 
     * @returns {Promise<Object>}
     */
    create: async (transactionData) => {
        try {
            return await apiClient.post(BASE_PATH, transactionData);
        } catch (error) {
            console.error('Error creating transaction:', error);
            throw error;
        }
    }
};

export default transactionService;
