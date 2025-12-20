import api from './api';

/**
 * Seeker Profile Services
 */

/**
 * Get seeker basic info
 */
export const getBasicInfo = async () => {
    try {
        const response = await api.get('api/v1/seekers/profile/basic-info');
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || { message: 'Failed to fetch basic info' }
        };
    }
};

/**
 * Create seeker basic info
 */
export const createBasicInfo = async (basicInfo) => {
    try {
        const response = await api.post('api/v1/seekers/profile/basic-info', basicInfo);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || { message: 'Failed to create basic info' }
        };
    }
};

/**
 * Update seeker basic info
 */
export const updateBasicInfo = async (basicInfo) => {
    try {
        const response = await api.put('api/v1/seekers/profile/basic-info', basicInfo);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || { message: 'Failed to update basic info' }
        };
    }
};

/**
 * Delete seeker profile
 */
export const deleteProfile = async () => {
    try {
        await api.delete('api/v1/seekers/profile/basic-info');
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || { message: 'Failed to delete profile' }
        };
    }
};

/**
 * Upload profile image
 */
export const uploadProfileImage = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post('api/v1/seekers/profile/image', formData);

        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || { message: 'Failed to upload profile image' }
        };
    }
};

/**
 * Delete profile image
 */
export const deleteProfileImage = async () => {
    try {
        const response = await api.delete('api/v1/seekers/profile/image');
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || { message: 'Failed to delete profile image' }
        };
    }
};

/**
 * Set address
 */
export const setAddress = async (address) => {
    try {
        const response = await api.post('api/v1/seekers/profile/address', address);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || { message: 'Failed to set address' }
        };
    }
};

/**
 * Delete address
 */
export const deleteAddress = async () => {
    try {
        const response = await api.delete('api/v1/seekers/profile/address');
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || { message: 'Failed to delete address' }
        };
    }
};
