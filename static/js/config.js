// Centralized API configuration for production and custom domain support
const API_BASE_URL =
    window.location.hostname === "inventorymanagement.site"
        ? "https://api.inventorymanagement.site/api"
        : "https://inventory-management-api.onrender.com/api";

window.API_BASE_URL = API_BASE_URL;
