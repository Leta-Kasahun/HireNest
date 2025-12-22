import api from './api';

/**
 * CV Builder Service
 * Handles all CV template and builder operations
 */

// ==================== SEEKER ENDPOINTS ====================

/**
 * Get all active CV templates
 * @returns {Promise} List of active templates
 */
export const getActiveTemplates = async () => {
    const response = await api.get('/api/v1/cv-builder/templates');
    return response.data;
};

/**
 * Get template with auto-filled data from seeker profile
 * @param {string} templateId - Template UUID
 * @returns {Promise} Template with auto-filled data
 */
export const getTemplateWithAutoFill = async (templateId) => {
    const response = await api.get(`/api/v1/cv-builder/builder/${templateId}`);
    return response.data;
};

/**
 * Preview CV without saving
 * @param {Object} cvData - CV builder request data
 * @param {string} cvData.templateId - Template UUID
 * @param {Object} cvData.filledData - Filled CV data
 * @returns {Promise} Preview data
 */
export const previewCV = async (cvData) => {
    const response = await api.post('/api/v1/cv-builder/preview', cvData);
    return response.data;
};

/**
 * Prepare CV for download
 * @param {Object} cvData - CV builder request data
 * @param {string} cvData.templateId - Template UUID
 * @param {Object} cvData.filledData - Filled CV data
 * @returns {Promise} Download-ready data
 */
export const downloadCV = async (cvData) => {
    const response = await api.post('/api/v1/cv-builder/download', cvData);
    return response.data;
};

// ==================== CV DATA MANAGEMENT ====================

/**
 * Get seeker's CV data
 * @returns {Promise} CV data
 */
export const getSeekerCV = async () => {
    const response = await api.get('/api/v1/seekers/profile/details/cv');
    return response.data;
};

/**
 * Create or update seeker's CV
 * @param {Object} cvDto - CV data
 * @param {string} cvDto.title - CV title
 * @param {string} cvDto.about - About section
 * @param {Object} cvDto.details - CV details (JSONB)
 * @returns {Promise} Saved CV data
 */
export const saveCV = async (cvDto) => {
    const response = await api.post('/api/v1/seekers/profile/details/cv', cvDto);
    return response.data;
};

/**
 * Update seeker's CV
 * @param {Object} cvDto - CV data
 * @returns {Promise} Updated CV data
 */
export const updateCV = async (cvDto) => {
    const response = await api.put('/api/v1/seekers/profile/details/cv', cvDto);
    return response.data;
};

// ==================== ADMIN ENDPOINTS ====================

/**
 * Get all CV templates (Admin only)
 * @returns {Promise} List of all templates
 */
export const getAllTemplates = async () => {
    const response = await api.get('/api/v1/admin/cv-templates');
    return response.data;
};

/**
 * Create a new CV template (Admin only)
 * @param {Object} templateData - Template creation data
 * @param {string} templateData.name - Template name
 * @param {string} templateData.category - Template category
 * @param {string} templateData.description - Template description
 * @param {Object} templateData.sections - Template sections structure
 * @returns {Promise} Created template
 */
export const createTemplate = async (templateData) => {
    const response = await api.post('/api/v1/admin/cv-templates', templateData);
    return response.data;
};

/**
 * Delete a CV template (Admin only)
 * @param {string} templateId - Template UUID
 * @returns {Promise} Deletion confirmation
 */
export const deleteTemplate = async (templateId) => {
    const response = await api.delete(`/api/v1/admin/cv-templates/${templateId}`);
    return response.data;
};

// ==================== HELPER FUNCTIONS ====================

/**
 * Validate required fields in CV data
 * @param {Object} cvData - CV data to validate
 * @param {Object} templateSections - Template sections with required fields
 * @returns {Object} Validation result { isValid: boolean, errors: [] }
 */
export const validateCVData = (cvData, templateSections) => {
    const errors = [];

    Object.entries(templateSections).forEach(([sectionKey, sectionFields]) => {
        const sectionData = cvData[sectionKey];

        if (Array.isArray(sectionData)) {
            // Validate each item in the array section (Experience, Education etc)
            sectionData.forEach((item, index) => {
                Object.entries(sectionFields).forEach(([fieldKey, fieldConfig]) => {
                    if (fieldConfig.required) {
                        const value = item[fieldKey];
                        if (!value || (typeof value === 'string' && value.trim() === '')) {
                            errors.push({
                                section: sectionKey,
                                field: fieldKey,
                                index: index,
                                message: `${fieldKey.replace(/_/g, ' ')} is required (Item #${index + 1})`
                            });
                        }
                    }
                });
            });
        } else {
            // Validate single object section (Header etc)
            Object.entries(sectionFields).forEach(([fieldKey, fieldConfig]) => {
                if (fieldConfig.required) {
                    const value = sectionData?.[fieldKey];
                    if (!value || (typeof value === 'string' && value.trim() === '')) {
                        errors.push({
                            section: sectionKey,
                            field: fieldKey,
                            message: `${fieldKey.replace(/_/g, ' ')} is required`
                        });
                    }
                }
            });
        }
    });

    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Format CV data for display
 * @param {Object} cvData - Raw CV data
 * @returns {Object} Formatted CV data
 */
export const formatCVData = (cvData) => {
    return cvData;
};

/**
 * Get template category display name
 * @param {string} category - Category code
 * @returns {string} Display name
 */
export const getCategoryDisplayName = (category) => {
    const categories = {
        'TECH': 'Technology',
        'BUSINESS': 'Business',
        'CREATIVE': 'Creative',
        'HEALTHCARE': 'Healthcare',
        'EDUCATION': 'Education',
        'FINANCE': 'Finance',
        'MARKETING': 'Marketing',
        'SALES': 'Sales',
        'OTHER': 'Other'
    };
    return categories[category] || category;
};

/**
 * Get template category color
 * @param {string} category - Category code
 * @returns {string} Tailwind color class
 */
export const getCategoryColor = (category) => {
    const colors = {
        'TECH': 'bg-blue-100 text-blue-700',
        'BUSINESS': 'bg-purple-100 text-purple-700',
        'CREATIVE': 'bg-pink-100 text-pink-700',
        'HEALTHCARE': 'bg-green-100 text-green-700',
        'EDUCATION': 'bg-yellow-100 text-yellow-700',
        'FINANCE': 'bg-indigo-100 text-indigo-700',
        'MARKETING': 'bg-orange-100 text-orange-700',
        'SALES': 'bg-red-100 text-red-700',
        'OTHER': 'bg-gray-100 text-gray-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
};

export default {
    getActiveTemplates,
    getTemplateWithAutoFill,
    previewCV,
    downloadCV,
    getSeekerCV,
    saveCV,
    updateCV,
    getAllTemplates,
    createTemplate,
    deleteTemplate,
    validateCVData,
    formatCVData,
    getCategoryDisplayName,
    getCategoryColor
};
