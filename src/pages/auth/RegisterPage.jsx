import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Briefcase, ArrowRight, Check } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import { ROUTES } from '../../config/constants';
import AuthLayout from '../../components/AuthLayout';
import Input from '../../components/Input';
import Button from '../../components/Button';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { register, isLoading, error, clearError } = useAuthStore();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [validationError, setValidationError] = useState(null);

    const handleChange = (e) => {
        if (error) clearError();
        if (validationError) setValidationError(null);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationError(null);

        if (formData.password !== formData.confirmPassword) {
            setValidationError("Passwords don't match");
            return;
        }

        try {
            await register({
                email: formData.email,
                password: formData.password,
                userType: null
            });
            navigate(ROUTES.VERIFY_EMAIL);
        } catch (err) {
            // Handled by store
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    };

    return (
        <AuthLayout
            title="Join HireNest"
            subtitle="Create your account and unlock a world of professional opportunities"
        >
            {(error || validationError) && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm mb-6 flex items-start animate-fade-in shadow-sm">
                    <div className="flex-shrink-0 mr-3">
                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <span>{error || validationError}</span>
                </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
                <Input
                    label="Email address"
                    id="email"
                    name="email"
                    type="email"
                    icon={Mail}
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                />

                <Input
                    label="Password"
                    id="password"
                    name="password"
                    type="password"
                    icon={Lock}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                />

                <Input
                    label="Confirm Password"
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    icon={Lock}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat your password"
                />

                <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    loading={isLoading}
                    size="lg"
                    className="mt-6 group !bg-secondary hover:!bg-secondary-dark !rounded-full shadow-lg shadow-secondary/20 transition-all"
                >
                    Create Account
                    {!isLoading && <ArrowRight size={18} className="ml-2 inline-block transition-transform group-hover:translate-x-1" />}
                </Button>
            </form>

            <div className="mt-10">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium tracking-wider uppercase">Or sign up with</span>
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full flex justify-center items-center py-3 px-4 border border-gray-200 dark:border-gray-700 rounded-full shadow-sm bg-white dark:bg-gray-800 text-base font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-all transform hover:-translate-y-1"
                    >
                        <img
                            className="h-6 w-6 mr-3"
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                        />
                        Continue with Google
                    </button>
                </div>
            </div>

            <div className="mt-10 text-center">
                <p className="text-base text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                    <Link to={ROUTES.LOGIN} className="font-bold text-secondary dark:text-secondary-light hover:underline transition-all">
                        Sign in here
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default RegisterPage;
