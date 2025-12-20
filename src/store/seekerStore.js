import { create } from 'zustand';
import * as seekerService from '../services/seekerService';

/**
 * Zustand store for Seeker Profile management
 */
const useSeekerStore = create((set, get) => ({
    profile: null,
    isLoading: false,
    error: null,
    isInitialized: false,

    /**
     * Fetch profile data
     */
    fetchProfile: async () => {
        set({ isLoading: true, error: null });
        const result = await seekerService.getBasicInfo();
        if (result.success) {
            set({ profile: result.data, isLoading: false, isInitialized: true });
        } else {
            console.error('Seeker Profile Fetch Error:', result.error);
            set({
                error: result.error?.message || 'Failed to load profile',
                isLoading: false,
                isInitialized: true
            });
        }

    },

    /**
     * Create or update basic info
     */
    saveBasicInfo: async (data, isUpdate = false) => {
        set({ isLoading: true, error: null });
        const result = isUpdate
            ? await seekerService.updateBasicInfo(data)
            : await seekerService.createBasicInfo(data);

        if (result.success) {
            set({ profile: result.data, isLoading: false });
            return result.data;
        } else {
            set({ error: result.error?.message || 'Failed to save basic info', isLoading: false });
            throw new Error(result.error?.message || 'Failed to save basic info');
        }
    },

    /**
     * Upload profile image
     */
    uploadImage: async (file) => {
        set({ isLoading: true, error: null });
        const result = await seekerService.uploadProfileImage(file);
        if (result.success) {
            set({ profile: result.data, isLoading: false });
            return result.data;
        } else {
            set({ error: result.error?.message || 'Failed to upload image', isLoading: false });
            throw new Error(result.error?.message || 'Failed to upload image');
        }
    },

    /**
     * Delete profile image
     */
    removeImage: async () => {
        set({ isLoading: true, error: null });
        const result = await seekerService.deleteProfileImage();
        if (result.success) {
            set({ profile: result.data, isLoading: false });
        } else {
            set({ error: result.error?.message || 'Failed to delete image', isLoading: false });
        }
    },

    /**
     * Set address
     */
    saveAddress: async (addressData) => {
        set({ isLoading: true, error: null });
        const result = await seekerService.setAddress(addressData);
        if (result.success) {
            set({ profile: result.data, isLoading: false });
            return result.data;
        } else {
            set({ error: result.error?.message || 'Failed to save address', isLoading: false });
            throw new Error(result.error?.message || 'Failed to save address');
        }
    },

    /**
     * Delete address
     */
    removeAddress: async () => {
        set({ isLoading: true, error: null });
        const result = await seekerService.deleteAddress();
        if (result.success) {
            set({ profile: result.data, isLoading: false });
        } else {
            set({ error: result.error?.message || 'Failed to remove address', isLoading: false });
        }
    },

    /**
     * Reset store
     */
    reset: () => set({ profile: null, isLoading: false, error: null, isInitialized: false })
}));

export default useSeekerStore;
