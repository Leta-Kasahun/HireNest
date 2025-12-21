import { useState, useRef } from 'react';
import { Briefcase, Plus, Save, X, Trash2, Image as ImageIcon, Video, Link as LinkIcon, ExternalLink, Youtube, Eye, Pencil } from 'lucide-react';
import Button from '../../Button';
import useSeekerStore from '../../../store/seekerStore';
import ProjectDetailModal from './ProjectDetailModal';

const ProjectSection = () => {
    const { projects, saveProject, removeProject, isLoading } = useSeekerStore();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null); // For detail modal
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        projectUrl: '',
        videoUrl: '',
        videoType: 'UPLOAD' // UPLOAD or YOUTUBE
    });
    const [selectedImages, setSelectedImages] = useState([]);
    const [videoFile, setVideoFile] = useState(null);

    const imagesRef = useRef(null);
    const videoRef = useRef(null);

    const handleOpenAdd = () => {
        setFormData({ title: '', description: '', projectUrl: '', videoUrl: '', videoType: 'UPLOAD' });
        setSelectedImages([]);
        setVideoFile(null);
        setIsAdding(true);
        setEditingId(null);
    };

    const handleEdit = (project) => {
        setFormData({
            title: project.title,
            description: project.description || '',
            projectUrl: project.projectUrl || '',
            videoUrl: project.videoUrl || '',
            videoType: project.videoType || 'UPLOAD'
        });

        const existingImages = (project.imageUrls || []).map(url => ({
            preview: url,
            isExisting: true
        }));
        if (!existingImages.length && project.imageUrl) {
            existingImages.push({ preview: project.imageUrl, isExisting: true });
        }

        setSelectedImages(existingImages);
        setVideoFile(null); // Reset file input
        setEditingId(project.id);
        setIsAdding(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleImageSelect = (e) => {
        const files = Array.from(e.target.files);
        const imageUrls = files.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            isExisting: false
        }));
        setSelectedImages(prev => [...prev, ...imageUrls]);
    };

    const removeImage = (index) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleVideoTypeChange = (type) => {
        setFormData({ ...formData, videoType: type, videoUrl: '' });
        setVideoFile(null);
    };

    const getYouTubeEmbedUrl = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
    };

    const handleSave = async () => {
        // Validation
        if (!formData.title || !formData.title.trim()) {
            alert('Please enter a project title');
            return;
        }

        const data = new FormData();

        // Add project data with proper defaults
        const projectData = {
            title: formData.title.trim(),
            description: formData.description?.trim() || '',
            projectUrl: formData.projectUrl?.trim() || '',
            videoUrl: formData.videoType === 'YOUTUBE' ? (formData.videoUrl?.trim() || '') : (editingId ? undefined : ''), // undefined to keep old url if not changed? No, backend logic handles replacement if file provided.
            videoType: formData.videoType || 'UPLOAD'
        };

        // If editing and uploading new video, or switching to youtube, we update.
        // If UPLOAD and no file, backend keeps existing.

        console.log('=== Saving Project ===');
        console.log('Project data:', projectData);
        data.append('project', new Blob([JSON.stringify(projectData)], { type: 'application/json' }));

        // Add ONLY NEW images
        if (selectedImages && selectedImages.length > 0) {
            selectedImages.forEach((img, index) => {
                if (img.file) {
                    data.append('images', img.file);
                    console.log(`Image ${index + 1}:`, img.file.name, img.file.type);
                }
            });
        }

        // Add video file if type is UPLOAD and selected
        if (formData.videoType === 'UPLOAD' && videoFile) {
            data.append('video', videoFile);
            console.log('Video file:', videoFile.name, videoFile.type);
        } else if (formData.videoType === 'YOUTUBE') {
            console.log('YouTube URL:', formData.videoUrl);
        }

        try {
            console.log('Sending request...');
            await saveProject(data, editingId);
            console.log('Project saved successfully!');
            setIsAdding(false);
            setEditingId(null);
            // Clean up preview URLs
            selectedImages.forEach(img => {
                if (!img.isExisting) URL.revokeObjectURL(img.preview);
            });
            setSelectedImages([]);
            setVideoFile(null);
        } catch (error) {
            console.error('=== Failed to save project ===');
            console.error('Error:', error);
            const errorMsg = error.response?.data?.message || error.message || 'Unknown error';
            alert(`Failed to save project: ${errorMsg}\n\nCheck console for details.`);
        }
    };

    return (
        <section className="bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/20 rounded-[2rem] p-8 transition-all hover:shadow-2xl hover:shadow-gray-200/40 dark:hover:shadow-none">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                        <Briefcase size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-primary dark:text-white">Portfolio Projects</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Showcase your best work and case studies</p>
                    </div>
                </div>
                {!isAdding && (
                    <Button
                        variant="ghost"
                        icon={<Plus size={18} />}
                        onClick={handleOpenAdd}
                    >
                        Add Project
                    </Button>
                )}
            </div>

            {isAdding && (
                <div className="mb-10 p-8 bg-gray-50 dark:bg-gray-900/30 rounded-[2.5rem] border border-secondary/20 space-y-6 animate-in fade-in zoom-in-95 duration-300 shadow-xl shadow-secondary/5">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-bold text-primary dark:text-white">
                            {editingId ? 'Edit Project' : 'New Project'}
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        {/* Title */}
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-gray-400 tracking-widest pl-2">Project Title *</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g. E-Commerce Platform"
                                className="w-full bg-white dark:bg-gray-800 border-2 border-transparent focus:border-secondary/30 rounded-2xl px-6 py-4 outline-none text-primary dark:text-white transition-all shadow-sm focus:shadow-lg focus:shadow-secondary/10"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-gray-400 tracking-widest pl-2">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="What did you build? What technologies did you use?"
                                className="w-full min-h-[120px] bg-white dark:bg-gray-800 border-2 border-transparent focus:border-secondary/30 rounded-2xl px-6 py-4 outline-none text-primary dark:text-white transition-all shadow-sm resize-none focus:shadow-lg focus:shadow-secondary/10"
                            />
                        </div>

                        {/* Project URL */}
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-gray-400 tracking-widest pl-2">Live URL / Repo (Optional)</label>
                            <div className="relative">
                                <LinkIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="url"
                                    value={formData.projectUrl}
                                    onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                                    className="w-full bg-white dark:bg-gray-800 border-2 border-transparent focus:border-secondary/30 rounded-2xl pl-12 pr-6 py-4 outline-none text-primary dark:text-white transition-all shadow-sm focus:shadow-lg focus:shadow-secondary/10"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        {/* Images Upload */}
                        <div className="space-y-3">
                            <label className="text-xs font-black uppercase text-gray-400 tracking-widest pl-2">Project Images (Optional)</label>
                            <button
                                onClick={() => imagesRef.current.click()}
                                className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-400 hover:border-secondary hover:text-secondary transition-all hover:bg-secondary/5"
                            >
                                <ImageIcon size={20} />
                                <span className="text-sm font-bold">Add Images</span>
                                <input
                                    type="file"
                                    ref={imagesRef}
                                    onChange={handleImageSelect}
                                    hidden
                                    accept="image/*"
                                    multiple
                                />
                            </button>

                            {/* Image Previews */}
                            {selectedImages.length > 0 && (
                                <div className="grid grid-cols-3 gap-3">
                                    {selectedImages.map((img, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={img.preview}
                                                alt={`Preview ${index + 1}`}
                                                className={`w-full h-24 object-cover rounded-xl ${img.isExisting ? 'opacity-90' : ''}`}
                                            />
                                            {img.isExisting && (
                                                <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-black/60 rounded-md text-[10px] text-white font-bold">
                                                    EXISTING
                                                </div>
                                            )}
                                            {!img.isExisting && (
                                                <button
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X size={14} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Video Section */}
                        <div className="space-y-3">
                            <label className="text-xs font-black uppercase text-gray-400 tracking-widest pl-2">Project Video (Optional)</label>

                            {/* Video Type Toggle */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleVideoTypeChange('UPLOAD')}
                                    className={`flex-1 py-2 px-4 rounded-xl font-bold text-sm transition-all ${formData.videoType === 'UPLOAD'
                                        ? 'bg-accent text-white shadow-lg shadow-accent/25'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    <Video size={16} className="inline mr-2" />
                                    Upload Video
                                </button>
                                <button
                                    onClick={() => handleVideoTypeChange('YOUTUBE')}
                                    className={`flex-1 py-2 px-4 rounded-xl font-bold text-sm transition-all ${formData.videoType === 'YOUTUBE'
                                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    <Youtube size={16} className="inline mr-2" />
                                    YouTube URL
                                </button>
                            </div>

                            {/* Video Upload or YouTube URL */}
                            {formData.videoType === 'UPLOAD' ? (
                                <button
                                    onClick={() => videoRef.current.click()}
                                    className={`w-full flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed transition-all ${videoFile
                                        ? 'border-accent bg-accent/5 text-accent'
                                        : 'border-gray-200 dark:border-gray-700 text-gray-400 hover:border-accent hover:text-accent hover:bg-accent/5'
                                        }`}
                                >
                                    <Video size={20} />
                                    <span className="text-sm font-bold">{videoFile ? videoFile.name : (editingId && !videoFile ? 'Replace Current Video (Optional)' : 'Select Video File')}</span>
                                    <input
                                        type="file"
                                        ref={videoRef}
                                        onChange={(e) => setVideoFile(e.target.files[0])}
                                        hidden
                                        accept="video/*"
                                    />
                                </button>
                            ) : (
                                <div className="space-y-2">
                                    <input
                                        type="url"
                                        value={formData.videoUrl}
                                        onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        className="w-full bg-white dark:bg-gray-800 border-2 border-transparent focus:border-red-500/30 rounded-2xl px-6 py-4 outline-none text-primary dark:text-white transition-all shadow-sm focus:shadow-lg focus:shadow-red-500/10"
                                    />
                                </div>
                            )}
                            {/* Existing YouTube Preview if editing and not changed */}
                            {formData.videoType === 'YOUTUBE' && formData.videoUrl && getYouTubeEmbedUrl(formData.videoUrl) && (
                                <div className="relative pt-[56.25%] rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
                                    <iframe
                                        className="absolute top-0 left-0 w-full h-full"
                                        src={getYouTubeEmbedUrl(formData.videoUrl)}
                                        title="YouTube video preview"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="ghost" onClick={() => {
                            setIsAdding(false);
                            selectedImages.forEach(img => {
                                if (!img.isExisting) URL.revokeObjectURL(img.preview);
                            });
                            setEditingId(null);
                        }}>Cancel</Button>
                        <Button
                            variant="primary"
                            icon={<Save size={18} />}
                            onClick={handleSave}
                            isLoading={isLoading}
                            disabled={!formData.title}
                        >
                            {editingId ? 'Update Project' : 'Save Project'}
                        </Button>
                    </div>
                </div>
            )}

            {/* Projects Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects && Array.isArray(projects) && projects.map((project) => {
                    const imageCount = project.imageUrls?.length || (project.imageUrl ? 1 : 0);
                    const firstImage = project.imageUrls?.[0] || project.imageUrl;

                    return (
                        <div
                            key={project.id}
                            className="group bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700/50 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-900/10 hover:border-blue-500/30 transition-all duration-500 flex flex-col cursor-pointer relative"
                            onClick={() => setSelectedProject(project)}
                        >
                            {/* Project Image/Video */}
                            <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
                                {firstImage ? (
                                    <>
                                        <img
                                            src={firstImage}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        {/* Image Count Badge */}
                                        {imageCount > 1 && (
                                            <div className="absolute top-3 right-3 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full flex items-center gap-1 text-white text-xs font-bold z-10">
                                                <ImageIcon size={12} />
                                                {imageCount}
                                            </div>
                                        )}
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedProject(project);
                                                    }}
                                                    className="p-4 bg-white/90 backdrop-blur-sm rounded-full text-blue-600 hover:scale-110 transition-transform shadow-lg hover:shadow-blue-500/20"
                                                >
                                                    <Eye size={24} />
                                                </button>
                                                {project.projectUrl && (
                                                    <a
                                                        href={project.projectUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="p-4 bg-white/90 backdrop-blur-sm rounded-full text-green-600 hover:scale-110 transition-transform shadow-lg hover:shadow-green-500/20"
                                                    >
                                                        <ExternalLink size={24} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center relative">
                                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600 via-purple-600 to-transparent"></div>
                                        <Briefcase size={64} className="text-gray-300 dark:text-gray-600 relative z-10" />
                                    </div>
                                )}
                            </div>

                            {/* Project Info */}
                            <div className="p-6 flex-1 flex flex-col relative">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 flex-1">
                                    {project.description || 'No description provided'}
                                </p>

                                {/* Tags/Badges */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.videoType === 'YOUTUBE' && project.videoUrl && (
                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-xs font-medium">
                                            <Youtube size={12} />
                                            Video Demo
                                        </span>
                                    )}
                                    {project.projectUrl && (
                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-xs font-medium">
                                            <LinkIcon size={12} />
                                            Live
                                        </span>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        icon={<Eye size={16} />}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedProject(project);
                                        }}
                                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                    >
                                        View Details
                                    </Button>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEdit(project);
                                            }}
                                            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all"
                                            title="Edit Project"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (window.confirm('Delete this project?')) {
                                                    removeProject(project.id);
                                                }
                                            }}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                                            title="Delete Project"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {!isAdding && (!projects || projects.length === 0) && (
                <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/20 rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-gray-700">
                    <Briefcase className="mx-auto text-gray-200 dark:text-gray-700 mb-6" size={64} />
                    <h3 className="text-xl font-bold text-primary dark:text-white">Empty Portfolio</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs mx-auto">Upload your projects to show employers what you're capable of.</p>
                    <Button onClick={handleOpenAdd} icon={<Plus size={18} />}>Create First Project</Button>
                </div>
            )}

            {/* Project Detail Modal */}
            {selectedProject && (
                <ProjectDetailModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </section>
    );
};

export default ProjectSection;
