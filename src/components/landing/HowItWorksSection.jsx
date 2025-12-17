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
        <section className="py-24 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
                    <div className="mb-12 lg:mb-0">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                            Your path to the perfect job
                        </h2>
                        <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                            We've simplified the recruitment process. No more endless forms or
                            ghosting. Just a straightforward path to your next role.
                        </p>
                        <div className="space-y-8">
                            {steps.map((step, idx) => (
                                <div key={idx} className="flex items-start">
                                    <span className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white font-bold font-heading mr-4">
                                        {step.num}
                                    </span>
                                    <div>
                                        <h3 className="text-xl font-bold text-primary mb-2">{step.title}</h3>
                                        <p className="text-text-secondary">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                            {/* Using a collaborative/meeting image */}
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Team Collaboration"
                                className="w-full h-auto"
                            />
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -z-10 top-10 -right-10 w-full h-full bg-secondary/5 rounded-2xl transform rotate-3"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
