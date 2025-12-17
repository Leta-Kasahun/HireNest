import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { ROUTES } from '../../config/constants';

const CTASection = () => {
    const navigate = useNavigate();

    return (
        <section className="py-24 px-4 bg-white">
            <div className="max-w-5xl mx-auto text-center bg-primary rounded-3xl p-12 lg:p-20 relative overflow-hidden shadow-2xl">
                {/* Background blobs */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/20 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/20 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                <div className="relative z-10">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
                        Ready to jumpstart your career?
                    </h2>
                    <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                        Join thousands of professionals finding their dream jobs on HireNest today.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button
                            variant="success"
                            size="lg"
                            onClick={() => navigate(ROUTES.REGISTER)}
                            className="!bg-accent !text-white hover:!bg-accent-dark !border-none !text-lg !px-8 !py-4 shadow-lg shadow-accent/20"
                        >
                            Create Free Account
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => navigate(ROUTES.LOGIN)}
                            className="!border-white/20 !text-white hover:!bg-white/10 !text-lg !px-8 !py-4"
                        >
                            Log In
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
