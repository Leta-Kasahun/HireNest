import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { ROUTES } from '../../config/constants';

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section className="relative min-h-screen flex items-center pt-32 lg:pt-48 overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
            {/* Background container that fills the section and keeps the portrait visible */}
            <div className="absolute inset-0 z-0 bg-cover bg-[position:35%_center] lg:bg-right bg-no-repeat transition-opacity duration-1000" style={{ backgroundImage: "url('/herobg.png')" }}>
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent dark:from-gray-900 dark:via-gray-900/95 dark:to-transparent"></div>
                {/* Subtle top overlay to ensure navbar text is always readable */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent dark:from-black/30 pointer-events-none h-32"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-10 pb-20">
                <div className="text-left max-w-3xl animate-fade-in">
                    <div className="inline-block px-4 py-2 rounded-full bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary-light font-bold text-sm mb-8 tracking-widest uppercase">
                        #1 Job Platform for Professionals
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading text-primary dark:text-white mb-8 leading-[1.1] tracking-tight">
                        Find your <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent animate-gradient bg-300% relative">
                            dream job
                        </span> <br /> with confidence.
                    </h1>
                    <p className="text-xl md:text-2xl text-text-secondary dark:text-gray-400 mb-12 leading-relaxed font-light max-w-2xl">
                        Connect with top employers and discover opportunities that match your skills.
                        Simple, transparent, and built for you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => navigate(ROUTES.REGISTER)}
                            className="!bg-secondary hover:!bg-secondary-dark !text-white !px-12 !py-5 text-xl shadow-2xl shadow-secondary/20 transition-all hover:-translate-y-1 rounded-full font-bold"
                        >
                            Get Started Free
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => navigate(ROUTES.LOGIN)}
                            className="!border-gray-200 dark:!border-gray-700 !text-primary dark:!text-white hover:!bg-white dark:hover:!bg-gray-800 !px-12 !py-5 text-xl backdrop-blur-sm rounded-full font-medium"
                        >
                            Sign In
                        </Button>
                    </div>

                    <div className="mt-16 flex flex-col items-center gap-4 text-sm text-text-secondary/80 dark:text-gray-400">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-bold text-gray-500 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <p className="font-medium">Join 10,000+ users today</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
