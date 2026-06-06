import apiClient from './apiClient.js';

const BASE_PATH = '/categories';

export const categoryService = {
    /**
     * Get all categories
     * @returns {Promise<Array>}
     */
    getAll: async () => {
        try {
            return await apiClient.get(BASE_PATH);
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    },

    /**
     * Get a category by ID
     * @param {string|number} id 
     * @returns {Promise<Object>}
     */
    getById: async (id) => {
        try {
            return await apiClient.get(`${BASE_PATH}/${id}`);
        } catch (error) {
            console.error(`Error fetching category with id ${id}:`, error);
            throw error;
        }
    },

    /**
     * Create a new category
     * @param {Object} categoryData 
     * @returns {Promise<Object>}
     */
    create: async (categoryData) => {
        try {
            return await apiClient.post(BASE_PATH, categoryData);
        } catch (error) {
            console.error('Error creating category:', error);
            throw error;
        }
    },

    /**
     * Update an existing category
     * @param {string|number} id 
     * @param {Object} categoryData 
     * @returns {Promise<Object>}
     */
    update: async (id, categoryData) => {
        try {
            return await apiClient.put(`${BASE_PATH}/${id}`, categoryData);
        } catch (error) {
            console.error(`Error updating category with id ${id}:`, error);
            throw error;
        }
    },

    /**
     * Delete a category
     * @param {string|number} id 
     * @returns {Promise<Object>}
     */
    delete: async (id) => {
        try {
            return await apiClient.delete(`${BASE_PATH}/${id}`);
        } catch (error) {
            console.error(`Error deleting category with id ${id}:`, error);
            throw error;
        }
    }
};

export default categoryService;
