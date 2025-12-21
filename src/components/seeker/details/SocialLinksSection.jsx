import { useState } from 'react';
import { Plus, X, Linkedin, Github, Globe, Twitter, Instagram, Facebook } from 'lucide-react';
import Button from '../../Button';
import useSeekerStore from '../../../store/seekerStore';

/**
 * SocialLinksSection Component - Social Media Links
 * Clean separation: UI rendering + business logic via store
 */
const SocialLinksSection = () => {
    const { socialLinks, addSocialLink, removeSocialLink, isLoading } = useSeekerStore();
    const [isAdding, setIsAdding] = useState(false);
    const [platform, setPlatform] = useState('');
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');

    const platforms = [
        { value: 'LinkedIn', icon: Linkedin, color: 'text-blue-600 dark:text-blue-400' },
        { value: 'GitHub', icon: Github, color: 'text-gray-900 dark:text-gray-100' },
        { value: 'Portfolio', icon: Globe, color: 'text-green-600 dark:text-green-400' },
        { value: 'Twitter', icon: Twitter, color: 'text-sky-500 dark:text-sky-400' },
        { value: 'Instagram', icon: Instagram, color: 'text-pink-600 dark:text-pink-400' },
        { value: 'Facebook', icon: Facebook, color: 'text-blue-700 dark:text-blue-500' },
    ];

    const getPlatformIcon = (platformName) => {
        const found = platforms.find(p => p.value === platformName);
        return found || { icon: Globe, color: 'text-gray-600 dark:text-gray-400' };
    };

    const handleAddLink = async () => {
        if (!platform) {
            setError('Please select a platform');
            return;
        }
        if (!url.trim()) {
            setError('Please enter a URL');
            return;
        }

        try {
            await addSocialLink({ platform, url: url.trim() });
            setPlatform('');
            setUrl('');
            setIsAdding(false);
            setError('');
        } catch (err) {
            setError(err.message || 'Failed to add social link');
        }
    };

    const handleRemoveLink = async (link) => {
        try {
            await removeSocialLink(link);
        } catch (err) {
            setError(err.message || 'Failed to remove social link');
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Social Links
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Connect your professional social media profiles
                    </p>
                </div>
                {!isAdding && (
                    <Button
                        onClick={() => setIsAdding(true)}
                        variant="primary"
                        className="flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add Link
                    </Button>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
            )}

            {/* Add Link Form */}
            {isAdding && (
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Platform
                            </label>
                            <select
                                value={platform}
                                onChange={(e) => setPlatform(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                         focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent
                                         transition-all duration-200"
                                disabled={isLoading}
                            >
                                <option value="">Select a platform</option>
                                {platforms.map(p => (
                                    <option key={p.value} value={p.value}>{p.value}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                URL
                            </label>
                            <input
                                type="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://linkedin.com/in/yourprofile"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                         focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent
                                         transition-all duration-200"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="flex gap-3">
                            <Button
                                onClick={handleAddLink}
                                variant="primary"
                                disabled={isLoading || !platform || !url.trim()}
                                className="flex-1"
                            >
                                Add Link
                            </Button>
                            <Button
                                onClick={() => {
                                    setIsAdding(false);
                                    setPlatform('');
                                    setUrl('');
                                    setError('');
                                }}
                                variant="secondary"
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Social Links Display */}
            {socialLinks && Array.isArray(socialLinks) && socialLinks.length > 0 ? (
                <div className="space-y-3">
                    {socialLinks.map((link, index) => {
                        const { icon: Icon, color } = getPlatformIcon(link.platform);
                        return (
                            <div
                                key={index}
                                className="group flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 
                                         rounded-lg border border-gray-200 dark:border-gray-600
                                         hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                            >
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    <div className={`p-2 rounded-lg bg-white dark:bg-gray-800 ${color}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {link.platform}
                                        </p>
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline truncate block"
                                        >
                                            {link.url}
                                        </a>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRemoveLink(link)}
                                    disabled={isLoading}
                                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 
                                             transition-colors duration-200 disabled:opacity-50"
                                    aria-label="Remove link"
                                >
                                    <X className="w-5 h-5 text-red-600 dark:text-red-400" />
                                </button>
                            </div>
                        );
                    })}
                </div>
            ) : (
                !isAdding && (
                    <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full 
                                      bg-gray-100 dark:bg-gray-700 mb-4">
                            <Globe className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                            No social links added yet
                        </p>
                        <Button
                            onClick={() => setIsAdding(true)}
                            variant="primary"
                            className="inline-flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add Your First Link
                        </Button>
                    </div>
                )
            )}
        </div>
    );
};

export default SocialLinksSection;
