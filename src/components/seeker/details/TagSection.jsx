import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import Button from '../../Button';
import useSeekerStore from '../../../store/seekerStore';

/**
 * TagSection Component - Professional Headlines/Taglines
 * Clean separation: UI rendering + business logic via store
 */
const TagSection = () => {
    const { tags, addTag, removeTag, isLoading } = useSeekerStore();
    const [isAdding, setIsAdding] = useState(false);
    const [newTag, setNewTag] = useState('');
    const [error, setError] = useState('');

    const handleAddTag = async () => {
        if (!newTag.trim()) {
            setError('Please enter a tag');
            return;
        }

        try {
            await addTag({ tag: newTag.trim() });
            setNewTag('');
            setIsAdding(false);
            setError('');
        } catch (err) {
            setError(err.message || 'Failed to add tag');
        }
    };

    const handleRemoveTag = async (tag) => {
        try {
            await removeTag({ tag: tag.tag });
        } catch (err) {
            setError(err.message || 'Failed to remove tag');
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Professional Headlines
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Add tags that describe your professional identity
                    </p>
                </div>
                {!isAdding && (
                    <Button
                        onClick={() => setIsAdding(true)}
                        variant="primary"
                        className="flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add Tag
                    </Button>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
            )}

            {/* Add Tag Form */}
            {isAdding && (
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                            placeholder="e.g., Full-Stack Developer, UI/UX Designer"
                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                     focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent
                                     transition-all duration-200"
                            maxLength={100}
                            disabled={isLoading}
                        />
                        <Button
                            onClick={handleAddTag}
                            variant="primary"
                            disabled={isLoading || !newTag.trim()}
                        >
                            Add
                        </Button>
                        <Button
                            onClick={() => {
                                setIsAdding(false);
                                setNewTag('');
                                setError('');
                            }}
                            variant="secondary"
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}

            {/* Tags Display */}
            {tags && Array.isArray(tags) && tags.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                    {tags.map((tag, index) => (
                        <div
                            key={index}
                            className="group flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 
                                     border border-blue-200 dark:border-blue-800 rounded-full
                                     hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200"
                        >
                            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                {tag.tag}
                            </span>
                            <button
                                onClick={() => handleRemoveTag(tag)}
                                disabled={isLoading}
                                className="p-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 
                                         transition-colors duration-200 disabled:opacity-50"
                                aria-label="Remove tag"
                            >
                                <X className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                !isAdding && (
                    <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full 
                                      bg-gray-100 dark:bg-gray-700 mb-4">
                            <Plus className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                            No professional headlines added yet
                        </p>
                        <Button
                            onClick={() => setIsAdding(true)}
                            variant="primary"
                            className="inline-flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add Your First Tag
                        </Button>
                    </div>
                )
            )}
        </div>
    );
};

export default TagSection;
