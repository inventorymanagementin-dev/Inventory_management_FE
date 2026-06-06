import apiClient from './apiClient.js';

const BASE_PATH = '/suppliers';

export const supplierService = {
    /**
     * Get all suppliers
     * @returns {Promise<Array>}
     */
    getAll: async () => {
        try {
            return await apiClient.get(BASE_PATH);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
            throw error;
        }
    },

    /**
     * Get a supplier by ID
     * @param {string|number} id 
     * @returns {Promise<Object>}
     */
    getById: async (id) => {
        try {
            return await apiClient.get(`${BASE_PATH}/${id}`);
        } catch (error) {
            console.error(`Error fetching supplier with id ${id}:`, error);
            throw error;
        }
    },

    /**
     * Create a new supplier
     * @param {Object} supplierData 
     * @returns {Promise<Object>}
     */
    create: async (supplierData) => {
        try {
            return await apiClient.post(BASE_PATH, supplierData);
        } catch (error) {
            console.error('Error creating supplier:', error);
            throw error;
        }
    },

    /**
     * Update an existing supplier
     * @param {string|number} id 
     * @param {Object} supplierData 
     * @returns {Promise<Object>}
     */
    update: async (id, supplierData) => {
        try {
            return await apiClient.put(`${BASE_PATH}/${id}`, supplierData);
        } catch (error) {
            console.error(`Error updating supplier with id ${id}:`, error);
            throw error;
        }
    },

    /**
     * Delete a supplier
     * @param {string|number} id 
     * @returns {Promise<Object>}
     */
    delete: async (id) => {
        try {
            return await apiClient.delete(`${BASE_PATH}/${id}`);
        } catch (error) {
            console.error(`Error deleting supplier with id ${id}:`, error);
            throw error;
        }
    }
};

export default supplierService;
