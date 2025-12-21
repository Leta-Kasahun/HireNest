import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { Construction } from 'lucide-react';

const PlaceholderPage = ({ title }) => {
    return (
        <DashboardLayout>
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
                <div className="w-24 h-24 bg-secondary/10 rounded-[2rem] flex items-center justify-center text-secondary mb-8 shadow-xl shadow-secondary/5 border border-secondary/10">
                    <Construction size={48} />
                </div>
                <h1 className="text-4xl font-heading font-black text-primary dark:text-white mb-4 italic leading-tight">
                    Section: <span className="text-secondary">{title}</span>
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-lg font-medium max-w-md bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                    We are currently building this production-ready module. Our team of world-class engineers is working hard to bring this HireNest feature to life.
                </p>
                <div className="mt-10 flex gap-4">
                    <button className="px-8 py-3 bg-secondary text-white font-black rounded-xl shadow-lg shadow-secondary/20 hover:scale-105 transition-all uppercase tracking-widest text-xs">
                        Go to Overview
                    </button>
                    <button className="px-8 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-primary dark:text-white font-black rounded-xl hover:bg-gray-50 transition-all uppercase tracking-widest text-xs">
                        Contact Support
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default PlaceholderPage;
