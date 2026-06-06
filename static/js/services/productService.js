import apiClient from './apiClient.js';

const BASE_PATH = '/products';

export const productService = {
    /**
     * Get all products
     * @returns {Promise<Array>}
     */
    getAll: async () => {
        try {
            return await apiClient.get(BASE_PATH);
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    /**
     * Get a product by ID
     * @param {string|number} id 
     * @returns {Promise<Object>}
     */
    getById: async (id) => {
        try {
            return await apiClient.get(`${BASE_PATH}/${id}`);
        } catch (error) {
            console.error(`Error fetching product with id ${id}:`, error);
            throw error;
        }
    },

    /**
     * Create a new product
     * @param {Object} productData 
     * @returns {Promise<Object>}
     */
    create: async (productData) => {
        try {
            return await apiClient.post(BASE_PATH, productData);
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    },

    /**
     * Update an existing product
     * @param {string|number} id 
     * @param {Object} productData 
     * @returns {Promise<Object>}
     */
    update: async (id, productData) => {
        try {
            return await apiClient.put(`${BASE_PATH}/${id}`, productData);
        } catch (error) {
            console.error(`Error updating product with id ${id}:`, error);
            throw error;
        }
    },

    /**
     * Delete a product
     * @param {string|number} id 
     * @returns {Promise<Object>}
     */
    delete: async (id) => {
        try {
            return await apiClient.delete(`${BASE_PATH}/${id}`);
        } catch (error) {
            console.error(`Error deleting product with id ${id}:`, error);
            throw error;
        }
    }
};

export default productService;
