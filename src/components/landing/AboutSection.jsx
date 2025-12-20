const AboutSection = () => {
    return (
        <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-50 dark:from-gray-800 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative mb-12 lg:mb-0">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                            <div className="absolute inset-0 bg-secondary/10 dark:bg-secondary/20 mix-blend-overlay" />
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                alt="Team working"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl max-w-xs">
                            <p className="text-4xl font-bold text-primary dark:text-white mb-2">10k+</p>
                            <p className="text-gray-600 dark:text-gray-400">Successful matches made this year alone.</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-secondary dark:text-secondary-light font-bold text-lg mb-2 tracking-wide uppercase">About Us</h2>
                        <h3 className="text-4xl md:text-5xl font-heading font-bold text-primary dark:text-white mb-6 leading-tight">
                            We're more than just a <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">job board.</span>
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            HireNest was built on the belief that finding a job should be an exciting journey, not a stressful chore. We leverage AI and human-centric design to connect talent with opportunity in real-time.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            Our mission is to democratize hiring by providing powerful tools to both seekers and employers, ensuring the perfect fit every time.
                        </p>

                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-xl font-bold text-primary dark:text-white mb-2">Global Reach</h4>
                                <p className="text-gray-500 dark:text-gray-400">Connecting talent across 50+ countries.</p>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-primary dark:text-white mb-2">Smart Matching</h4>
                                <p className="text-gray-500 dark:text-gray-400">AI-driven algorithms for better relevance.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
