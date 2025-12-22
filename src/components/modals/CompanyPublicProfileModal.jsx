import { useState, useEffect } from 'react';
import { X, Globe, MapPin, Briefcase, Calendar, Link as LinkIcon, Building2 } from 'lucide-react';
import companyService from '../../services/companyService';
import Button from '../Button';

const CompanyPublicProfileModal = ({ isOpen, onClose, companyId }) => {
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen && companyId) {
            fetchCompanyProfile();
        }
    }, [isOpen, companyId]);

    const fetchCompanyProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await companyService.getPublicProfile(companyId);
            setCompany(data);
        } catch (err) {
            console.error('Error fetching company profile:', err);
            setError('Failed to load company profile');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pb-20 sm:pb-6">
            <div className="absolute inset-0 bg-[#0B1C2D]/80 backdrop-blur-xl animate-in fade-in duration-300" onClick={onClose} />

            <div className="relative w-full max-w-4xl bg-white dark:bg-[#111820] rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 border border-white/10">
                {/* Header/Banner Area */}
                <div className="h-40 sm:h-52 bg-gradient-to-r from-secondary to-secondary-light relative">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all z-10"
                    >
                        <X size={20} />
                    </button>

                    <div className="absolute -bottom-16 left-8 sm:left-12 flex items-end">
                        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-white dark:bg-gray-800 p-2 shadow-2xl border-4 border-white dark:border-gray-800 overflow-hidden">
                            {company?.logoUrl ? (
                                <img src={company.logoUrl} alt={company.companyName} className="w-full h-full object-cover rounded-2xl" />
                            ) : (
                                <div className="w-full h-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                                    <Building2 size={64} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-20 pb-12 px-8 sm:px-12 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    {loading ? (
                        <div className="space-y-8 animate-pulse">
                            <div className="space-y-4">
                                <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded-xl w-1/3" />
                                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-lg w-1/4" />
                            </div>
                            <div className="space-y-4">
                                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-lg w-full" />
                                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-lg w-full" />
                                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-lg w-2/3" />
                            </div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 bg-red-50 dark:bg-red-900/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <X size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-primary dark:text-white mb-2">{error}</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-8">This company profile might have been removed or is temporarily unavailable.</p>
                            <Button variant="outline" onClick={onClose}>Close Profile</Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-10">
                                <div>
                                    <h1 className="text-3xl sm:text-4xl font-black text-primary dark:text-white mb-2 leading-tight">
                                        {company.companyName}
                                    </h1>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
                                        {company.location && (
                                            <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800/50 px-3 py-1.5 rounded-full">
                                                <MapPin size={14} className="text-secondary" /> {company.location}
                                            </span>
                                        )}
                                        {company.industry && (
                                            <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800/50 px-3 py-1.5 rounded-full">
                                                <Briefcase size={14} className="text-secondary" /> {company.industry}
                                            </span>
                                        )}
                                        {company.website && (
                                            <a
                                                href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1.5 bg-secondary/10 text-secondary hover:bg-secondary/20 px-3 py-1.5 rounded-full transition-colors"
                                            >
                                                <Globe size={14} /> Website
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <section>
                                    <h2 className="text-xl font-bold text-primary dark:text-white mb-4">About</h2>
                                    <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 whitespace-pre-wrap leading-relaxed">
                                        {company.description || "No description provided."}
                                    </div>
                                </section>

                                {company.socialLinks && company.socialLinks.length > 0 && (
                                    <section>
                                        <h2 className="text-xl font-bold text-primary dark:text-white mb-4">Social Presence</h2>
                                        <div className="flex flex-wrap gap-3">
                                            {company.socialLinks.map((link, idx) => (
                                                <a
                                                    key={idx}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-5 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 rounded-2xl hover:border-secondary hover:text-secondary transition-all group font-bold text-sm"
                                                >
                                                    <LinkIcon size={16} className="text-gray-400 group-hover:text-secondary" />
                                                    {link.platform}
                                                </a>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </div>

                            {/* Sidebar Info */}
                            <div className="space-y-8">
                                <div className="bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-700/30 rounded-3xl p-8">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6">Company Details</h3>

                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1 p-2 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
                                                <Building2 size={18} className="text-secondary" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase font-black tracking-wider text-gray-400">Legal Status</p>
                                                <p className="text-sm font-bold text-primary dark:text-white mt-0.5">{company.legalStatus || 'Not specified'}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="mt-1 p-2 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
                                                <Calendar size={18} className="text-secondary" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase font-black tracking-wider text-gray-400">Joined On</p>
                                                <p className="text-sm font-bold text-primary dark:text-white mt-0.5">
                                                    {new Date(company.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-8 text-white relative overflow-hidden group">
                                    <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                        <Briefcase size={120} />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">Hiring?</h3>
                                    <p className="text-white/60 text-xs mb-6 leading-relaxed">Check out all open positions from this company.</p>
                                    <Button variant="secondary" fullWidth size="sm">View Jobs</Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompanyPublicProfileModal;
