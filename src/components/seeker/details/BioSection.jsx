import { useState } from 'react';
import { AlignLeft, Edit3, Save, X } from 'lucide-react';
import Button from '../../Button';
import useSeekerStore from '../../../store/seekerStore';

const BioSection = () => {
    const { bio, saveBio, isLoading } = useSeekerStore();
    const [isEditing, setIsEditing] = useState(false);
    const [bioText, setBioText] = useState(bio?.bio || '');

    const handleSave = async () => {
        try {
            await saveBio({ bio: bioText }, !!bio);
            setIsEditing(false);
        } catch (error) {
            // Error managed by store
        }
    };

    const handleCancel = () => {
        setBioText(bio?.bio || '');
        setIsEditing(false);
    };

    return (
        <section className="bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/20 rounded-[2rem] p-8 transition-all hover:shadow-2xl hover:shadow-gray-200/40 dark:hover:shadow-none">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                        <AlignLeft size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-primary dark:text-white">Professional Bio</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Tell us about your professional journey</p>
                    </div>
                </div>
                {!isEditing && (
                    <Button
                        variant="ghost"
                        icon={<Edit3 size={18} />}
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </Button>
                )}
            </div>

            {isEditing ? (
                <div className="space-y-4">
                    <textarea
                        value={bioText}
                        onChange={(e) => setBioText(e.target.value)}
                        placeholder="Write a brief professional summary..."
                        className="w-full min-h-[150px] p-6 rounded-3xl bg-gray-50 dark:bg-gray-900/50 border-2 border-transparent focus:border-secondary/30 focus:bg-white dark:focus:bg-gray-800 outline-none transition-all resize-none text-primary dark:text-white"
                    />
                    <div className="flex justify-end gap-3">
                        <Button variant="ghost" icon={<X size={18} />} onClick={handleCancel} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button variant="primary" icon={<Save size={18} />} onClick={handleSave} isLoading={isLoading}>
                            Save Bio
                        </Button>
                    </div>
                </div>
            ) : bio?.bio ? (
                <div className="p-6 bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                        {bio.bio}
                    </p>
                </div>
            ) : (
                <div className="text-center py-10 bg-gray-50 dark:bg-gray-800/20 rounded-[1.5rem] border-2 border-dashed border-gray-200 dark:border-gray-700">
                    <AlignLeft className="mx-auto text-gray-300 dark:text-gray-600 mb-4" size={48} />
                    <h3 className="text-lg font-bold text-primary dark:text-white">No bio yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-xs mx-auto">Share your story to help employers know you better.</p>
                    <Button onClick={() => setIsEditing(true)} variant="outline" icon={<Edit3 size={18} />}>Add Bio</Button>
                </div>
            )}
        </section>
    );
};

export default BioSection;
