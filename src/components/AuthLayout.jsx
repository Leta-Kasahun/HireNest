import { useNavigate } from 'react-router-dom';
// import { ROUTES } from '../../config/constants';
import { ROUTES } from '../config/constants';
import { ChevronLeft } from 'lucide-react';

/**
 * Authentication Layout
 * Wraps auth pages with a consistent professional design.
 */
const AuthLayout = ({ children, title, subtitle, backButton = false }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 relative flex items-center justify-center pt-24 pb-8 lg:p-0 overflow-hidden">
            {/* Global Background Grid */}
            <div className="absolute inset-0 bg-grid-pattern z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" />


            <div className="flex w-full max-w-[1400px] h-screen lg:h-[85vh] lg:rounded-[2.5rem] bg-white dark:bg-gray-800 shadow-2xl overflow-hidden relative z-10 mx-auto border border-gray-100 dark:border-gray-700">
                {/* Left Side: Image/Info (Hidden on Mobile) */}
                <div className="hidden lg:flex lg:w-1/2 relative bg-primary overflow-hidden mt-10">
                    <img
                        src="/auth_side_image_v2.png"
                        alt="Authenticating"
                        className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />

                    <div className="relative z-20 mt-auto p-16">
                        <div className="mb-10">
                            <img src="/image.png" alt="HireNest" className="h-10 w-auto invert brightness-0" />
                        </div>
                        <h1 className="text-5xl font-heading font-bold text-white mb-6 leading-tight">
                            Unlock your <span className="text-secondary-light underline decoration-accent-light underline-offset-8">potential</span> today.
                        </h1>
                        <p className="text-xl text-blue-100/70 font-light leading-relaxed max-w-lg">
                            Join our community of over 10,000 professionals finding their dream roles through AI-driven matching.
                        </p>
                    </div>
                </div>

                {/* Right Side: Auth Form */}
                <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-16 overflow-y-auto bg-white dark:bg-gray-800">
                    <div className="max-w-md w-full mx-auto my-auto animate-fade-in">
                        {backButton && (
                            <button
                                onClick={() => navigate(-1)}
                                className="mb-8 p-2 rounded-full text-gray-400 hover:text-primary dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group flex items-center gap-2"
                                aria-label="Go back"
                            >
                                <ChevronLeft size={20} className="transform group-hover:-translate-x-1 transition-transform" />
                                <span className="text-sm font-medium">Back</span>
                            </button>
                        )}

                        <div className="flex lg:hidden justify-center mb-8">
                            <img src="/image.png" alt="HireNest" className="h-10 w-auto dark:invert" />
                        </div>

                        <div className="mb-10">
                            <h2 className="text-3xl lg:text-4xl font-bold font-heading text-primary dark:text-white mb-3">
                                {title}
                            </h2>
                            {subtitle && (
                                <p className="text-text-secondary dark:text-gray-400 text-lg font-light leading-relaxed">
                                    {subtitle}
                                </p>
                            )}
                        </div>

                        <div className="w-full">
                            {children}
                        </div>

                        <div className="mt-12 text-center text-sm text-gray-400 dark:text-gray-500 font-light">
                            &copy; {new Date().getFullYear()} HireNest. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
