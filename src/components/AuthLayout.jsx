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
        <div className="min-h-screen bg-white relative flex items-center justify-center p-4 overflow-hidden">
            {/* Global Background Grid */}
            <div className="absolute inset-0 bg-grid-pattern z-0 pointer-events-none" />

            {/* Global Background Blobs */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl opacity-50 z-0 pointer-events-none" />
            <div className="absolute top-[30%] left-0 -ml-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl opacity-50 z-0 pointer-events-none" />
            <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl opacity-50 z-0 pointer-events-none" />

            {/* Auth Card */}
            <div className="relative z-10 w-full max-w-md bg-white rounded-none shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden animate-fade-in">

                {/* Header */}
                <div className="px-8 pt-8 pb-6 text-center">
                    {backButton && (
                        <button
                            onClick={() => navigate(-1)}
                            className="absolute left-6 top-6 p-2 rounded-full text-gray-400 hover:text-primary hover:bg-gray-50 transition-all duration-200 group"
                            aria-label="Go back"
                        >
                            <ChevronLeft size={20} className="transform group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                    )}

                    <div className="flex justify-center mb-6">
                        {/* Logo Icon */}
                        <div className="w-16 h-16 bg-primary/5 rounded-none flex items-center justify-center">
                            <img src="/logo.png" alt="HireNest" className="w-10 h-10 object-contain" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold font-heading text-primary mb-2">
                        {title}
                    </h2>

                    {subtitle && (
                        <p className="text-text-secondary text-base">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Content */}
                <div className="px-8 pb-8">
                    {children}
                </div>

            </div>

            {/* Footer Text */}
            <div className="absolute bottom-6 text-center text-sm text-gray-400 z-10 w-full">
                &copy; {new Date().getFullYear()} HireNest. All rights reserved.
            </div>

        </div>
    );
};

export default AuthLayout;
