const steps = [
    {
        num: "01",
        title: "Create Profile",
        desc: "Sign up and build your professional presence in minutes."
    },
    {
        num: "02",
        title: "Browse Jobs",
        desc: "Filter through thousands of curated opportunities."
    },
    {
        num: "03",
        title: "Get Hired",
        desc: "Connect with employers and launch your new career."
    }
];

const HowItWorksSection = () => {
    return (
        <section className="py-24 bg-transparent relative z-10 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 gap-20 items-center">
                    <div className="mb-12 lg:mb-0">
                        <h2 className="text-secondary dark:text-secondary-light font-bold text-lg mb-2 uppercase tracking-widest text-center lg:text-left">The Process</h2>
                        <h3 className="text-4xl md:text-5xl font-heading font-bold text-primary dark:text-white mb-8 leading-tight text-center lg:text-left">
                            Your path to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">perfect job</span>
                        </h3>
                        <p className="text-text-secondary dark:text-gray-400 text-lg mb-10 leading-relaxed font-light text-center lg:text-left">
                            We've simplified the recruitment process. No more endless forms or
                            ghosting. Just a straightforward path to your next role.
                        </p>
                        <div className="space-y-10">
                            {steps.map((step, idx) => (
                                <div key={idx} className="flex items-start group">
                                    <span className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl bg-primary dark:bg-gray-800 text-white dark:text-secondary-light text-2xl font-bold font-heading mr-6 group-hover:bg-secondary transition-colors duration-300 shadow-lg">
                                        {step.num}
                                    </span>
                                    <div className="pt-1">
                                        <h4 className="text-2xl font-bold text-primary dark:text-white mb-2 group-hover:text-secondary dark:group-hover:text-secondary-light transition-colors">{step.title}</h4>
                                        <p className="text-text-secondary dark:text-gray-400 text-lg font-light leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800 transform group-hover:scale-[1.02] transition-transform duration-500">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            <img
                                src="https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                alt="Modern Office"
                                className="w-full h-auto"
                            />
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -z-10 -bottom-10 -right-10 w-full h-full bg-gradient-to-br from-secondary/20 to-accent/20 rounded-3xl blur-2xl"></div>
                        <div className="absolute -z-10 -top-10 -left-10 w-2/3 h-2/3 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
