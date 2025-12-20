const stats = [
    { label: 'Active Jobs', value: '10k+', color: 'text-secondary dark:text-secondary-light' },
    { label: 'Companies', value: '500+', color: 'text-primary dark:text-white' },
    { label: 'Job Seekers', value: '50k+', color: 'text-accent dark:text-accent-light' },
];

const StatsSection = () => {
    return (
        <section className="py-12 border-y border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md relative z-10 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 text-center sm:divide-x dark:divide-gray-800 divide-gray-100">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center justify-center p-4 group">
                            <div className={`text-4xl lg:text-6xl font-bold font-heading mb-2 transition-transform duration-300 group-hover:scale-110 ${stat.color}`}>
                                {stat.value}
                            </div>
                            <div className="text-text-secondary dark:text-gray-400 font-bold uppercase tracking-widest text-xs">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
