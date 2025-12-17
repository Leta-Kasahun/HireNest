const stats = [
    { label: 'Active Jobs', value: '10k+', color: 'text-secondary' },
    { label: 'Companies', value: '500+', color: 'text-primary' },
    { label: 'Job Seekers', value: '50k+', color: 'text-accent' },
];

const StatsSection = () => {
    return (
        <section className="py-10 border-y border-primary/5 bg-white/30 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center justify-center p-4">
                            <div className={`text-4xl lg:text-5xl font-bold font-heading mb-2 ${stat.color}`}>
                                {stat.value}
                            </div>
                            <div className="text-text-secondary font-medium uppercase tracking-wider text-sm">
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
