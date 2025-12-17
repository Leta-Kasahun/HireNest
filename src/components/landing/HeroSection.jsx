import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { ROUTES } from '../../config/constants';

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
                    <div className="lg:col-span-6 text-center lg:text-left mb-12 lg:mb-0 animate-fade-in flex flex-col justify-center h-full">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-medium text-sm mb-6 w-fit mx-auto lg:mx-0">
                            #1 Job Platform
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading text-primary mb-6 leading-tight tracking-tight">
                            Find your <span className="text-secondary relative">
                                dream job
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-secondary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                                </svg>
                            </span> <br className="hidden lg:block" /> with confidence.
                        </h1>
                        <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                            Connect with top employers and discover opportunities that match your skills.
                            Simple, transparent, and built for you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => navigate(ROUTES.REGISTER)}
                                className="!bg-secondary hover:!bg-secondary-dark !text-white !px-8 !py-4 text-lg shadow-xl shadow-secondary/20 transition-all hover:-translate-y-1"
                            >
                                Get Started Free
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => navigate(ROUTES.LOGIN)}
                                className="!border-gray-200 !text-primary hover:!bg-gray-50 !px-8 !py-4 text-lg backdrop-blur-sm"
                            >
                                Sign In
                            </Button>
                        </div>
                        <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-text-secondary/80">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-500">
                                        Use
                                    </div>
                                ))}
                            </div>
                            <p>Join 10,000+ users today</p>
                        </div>
                    </div>

                    <div className="lg:col-span-6 relative animate-fade-in flex items-center justify-center" style={{ animationDelay: '0.2s' }}>
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border border-primary/5 group max-w-lg lg:max-w-full mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                            <img
                                src="./herocontent.png"
                                alt="Modern Job Search Platform Dashboard"
                                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>

                        {/* Floating Card 1 */}
                        <div className="absolute -bottom-6 -left-4 md:-left-8 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl shadow-primary/5 border border-white/50 animate-bounce-slow hidden md:block z-20">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold shadow-sm">
                                    ✓
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-primary">Job Offered</div>
                                    <div className="text-xs text-text-secondary">Just now</div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Card 2 (Added to balance) */}
                        <div className="absolute -top-6 -right-4 md:-right-8 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl shadow-primary/5 border border-white/50 animate-bounce-slow hidden md:block z-20" style={{ animationDelay: '1.5s' }}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shadow-sm">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-primary">Interview</div>
                                    <div className="text-xs text-text-secondary">Today, 2:00 PM</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
