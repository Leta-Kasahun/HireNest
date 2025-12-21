import { create } from 'zustand';
import * as seekerService from '../services/seekerService';

/**
 * Zustand store for Seeker Profile management
 */
const useSeekerStore = create((set, get) => ({
    // State
    profile: null,
    skills: [],
    projects: [],
    bio: null,
    sectors: [], // Changed from sector to sectors (multi-select)
    cv: null,
    tags: [], // Professional headlines/taglines
    socialLinks: [], // Social media links
    media: null, // Profile image and CV URLs
    isLoading: false,
    error: null,
    isInitialized: false,

    /**
     * Fetch all profile-related data
     */
    fetchAllProfileData: async () => {
        set({ isLoading: true, error: null });
        const [profileRes, skillsRes, projectsRes, bioRes, sectorsRes, cvRes, tagsRes, socialLinksRes, mediaRes] = await Promise.all([
            seekerService.getBasicInfo(),
            seekerService.getSkills(),
            seekerService.getProjects(),
            seekerService.getBio(),
            seekerService.getSectors(), // Changed from getSector
            seekerService.getCV(),
            seekerService.getTags(),
            seekerService.getSocialLinks(),
            seekerService.getMedia()
        ]);

        set({
            profile: profileRes.success ? profileRes.data : null,
            skills: skillsRes.success ? skillsRes.data : [],
            projects: projectsRes.success ? projectsRes.data : [],
            bio: bioRes.success ? bioRes.data : null,
            sectors: sectorsRes.success ? sectorsRes.data : [], // Changed from sector
            cv: cvRes.success ? cvRes.data : null,
            tags: tagsRes.success ? tagsRes.data : [],
            socialLinks: socialLinksRes.success ? socialLinksRes.data : [],
            media: mediaRes.success ? mediaRes.data : null,
            isLoading: false,
            isInitialized: true,
            error: profileRes.success ? null : (profileRes.error?.message || 'Failed to load profile')
        });
    },

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
     * Bio Actions
     */
    saveBio: async (bioData, isUpdate = false) => {
        set({ isLoading: true, error: null });
        const result = isUpdate ? await seekerService.updateBio(bioData) : await seekerService.saveBio(bioData);
        if (result.success) {
            set({ bio: result.data, isLoading: false });
            return result.data;
        } else {
            set({ error: result.error?.message || 'Failed to save bio', isLoading: false });
            throw new Error(result.error?.message || 'Failed to save bio');
        }
    },

    /**
     * Skill Actions
     */
    addSkill: async (skillData) => {
        set({ isLoading: true, error: null });
        const result = await seekerService.addSkill(skillData);
        if (result.success) {
            set(state => ({ skills: [...state.skills, result.data], isLoading: false }));
            return result.data;
        } else {
            set({ error: result.error?.message || 'Failed to add skill', isLoading: false });
            throw new Error(result.error?.message || 'Failed to add skill');
        }
    },

    updateSkill: async (id, skillData) => {
        set({ isLoading: true, error: null });
        const result = await seekerService.updateSkill(id, skillData);
        if (result.success) {
            set(state => ({
                skills: state.skills.map(s => s.id === id ? result.data : s),
                isLoading: false
            }));
            return result.data;
        } else {
            set({ error: result.error?.message || 'Failed to update skill', isLoading: false });
            throw new Error(result.error?.message || 'Failed to update skill');
        }
    },

    /**
     * Project Actions
     */
    saveProject: async (formData, id = null) => {
        set({ isLoading: true, error: null });
        const result = id ? await seekerService.updateProject(id, formData) : await seekerService.createProject(formData);
        if (result.success) {
            set(state => ({
                projects: id ? state.projects.map(p => p.id === id ? result.data : p) : [...state.projects, result.data],
                isLoading: false
            }));
            return result.data;
        } else {
            set({ error: result.error?.message || 'Failed to save project', isLoading: false });
            throw new Error(result.error?.message || 'Failed to save project');
        }
    },

    removeProject: async (id) => {
        set({ isLoading: true, error: null });
        const result = await seekerService.deleteProject(id);
        if (result.success) {
            set(state => ({ projects: state.projects.filter(p => p.id !== id), isLoading: false }));
        } else {
            set({ error: result.error?.message || 'Failed to delete project', isLoading: false });
            throw new Error(result.error?.message || 'Failed to delete project');
        }
    },

    /**
     * Sector Actions (Multi-select support)
     */
    addSector: async (sectorData) => {
        set({ isLoading: true, error: null });
        const result = await seekerService.addSector(sectorData);
        if (result.success) {
            set(state => ({ sectors: [...state.sectors, result.data], isLoading: false }));
            return result.data;
        } else {
            set({ error: result.error?.message || 'Failed to add sector', isLoading: false });
            throw new Error(result.error?.message || 'Failed to add sector');
        }
    },

    removeSector: async (id) => {
        set({ isLoading: true, error: null });
        const result = await seekerService.deleteSector(id);
        if (result.success) {
            set(state => ({ sectors: state.sectors.filter(s => s.id !== id), isLoading: false }));
        } else {
            set({ error: result.error?.message || 'Failed to remove sector', isLoading: false });
            throw new Error(result.error?.message || 'Failed to remove sector');
        }
    },

    /**
     * CV Actions
     */
    saveCV: async (cvData) => {
        set({ isLoading: true, error: null });
        const result = await seekerService.saveCV(cvData);
        if (result.success) {
            set({ cv: result.data, isLoading: false });
            return result.data;
        } else {
            set({ error: result.error?.message || 'Failed to save CV', isLoading: false });
            throw new Error(result.error?.message || 'Failed to save CV');
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
     * Tags Actions (Professional Headlines/Taglines)
     */
    addTag: async (tagData) => {
        set({ isLoading: true, error: null });
        const result = await seekerService.addTag(tagData);
        if (result.success) {
            set(state => ({ tags: [...state.tags, result.data], isLoading: false }));
            return result.data;
        } else {
            set({ error: result.error?.message || 'Failed to add tag', isLoading: false });
            throw new Error(result.error?.message || 'Failed to add tag');
        }
    },

    removeTag: async (tagData) => {
        set({ isLoading: true, error: null });
        const result = await seekerService.deleteTag(tagData);
        if (result.success) {
            set(state => ({ tags: state.tags.filter(t => t.tag !== tagData.tag), isLoading: false }));
        } else {
            set({ error: result.error?.message || 'Failed to remove tag', isLoading: false });
            throw new Error(result.error?.message || 'Failed to remove tag');
        }
    },

    /**
     * Social Links Actions
     */
    addSocialLink: async (linkData) => {
        set({ isLoading: true, error: null });
        const result = await seekerService.addSocialLink(linkData);
        if (result.success) {
            set(state => ({ socialLinks: [...state.socialLinks, result.data], isLoading: false }));
            return result.data;
        } else {
            set({ error: result.error?.message || 'Failed to add social link', isLoading: false });
            throw new Error(result.error?.message || 'Failed to add social link');
        }
    },

    removeSocialLink: async (linkData) => {
        set({ isLoading: true, error: null });
        const result = await seekerService.deleteSocialLink(linkData);
        if (result.success) {
            set(state => ({
                socialLinks: state.socialLinks.filter(l => !(l.platform === linkData.platform && l.url === linkData.url)),
                isLoading: false
            }));
        } else {
            set({ error: result.error?.message || 'Failed to remove social link', isLoading: false });
            throw new Error(result.error?.message || 'Failed to remove social link');
        }
    },

    /**
     * Media Actions (Profile Image & CV)
     */
    uploadProfileImage: async (file) => {
        set({ isLoading: true, error: null });
        const result = await seekerService.uploadProfileImage(file);
        if (result.success) {
            set({ media: result.data, isLoading: false });
            return result.data;
        } else {
            set({ error: result.error?.message || 'Failed to upload profile image', isLoading: false });
            throw new Error(result.error?.message || 'Failed to upload profile image');
        }
    },

    deleteProfileImage: async () => {
        set({ isLoading: true, error: null });
        const result = await seekerService.deleteProfileImage();
        if (result.success) {
            set({ media: result.data, isLoading: false });
        } else {
            set({ error: result.error?.message || 'Failed to delete profile image', isLoading: false });
            throw new Error(result.error?.message || 'Failed to delete profile image');
        }
    },

    uploadCVFile: async (file) => {
        set({ isLoading: true, error: null });
        const result = await seekerService.uploadCV(file);
        if (result.success) {
            set({ media: result.data, isLoading: false });
            return result.data;
        } else {
            set({ error: result.error?.message || 'Failed to upload CV', isLoading: false });
            throw new Error(result.error?.message || 'Failed to upload CV');
        }
    },

    deleteCVFile: async () => {
        set({ isLoading: true, error: null });
        const result = await seekerService.deleteCVFile();
        if (result.success) {
            set({ media: result.data, isLoading: false });
        } else {
            set({ error: result.error?.message || 'Failed to delete CV', isLoading: false });
            throw new Error(result.error?.message || 'Failed to delete CV');
        }
    },

    /**
     * Reset store
     */
    reset: () => set({
        profile: null,
        skills: [],
        projects: [],
        bio: null,
        sectors: [],
        cv: null,
        tags: [],
        socialLinks: [],
        media: null,
        isLoading: false,
        error: null,
        isInitialized: false
    })
}));

export default useSeekerStore;
