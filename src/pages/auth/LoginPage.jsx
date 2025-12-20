import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, UserCheck, ArrowRight } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import { ROUTES } from '../../config/constants';
import AuthLayout from '../../components/AuthLayout';
import Input from '../../components/Input';
import Button from '../../components/Button';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login, isLoading, error, clearError } = useAuthStore();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        if (error) clearError();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData);
            // Determine redirection based on role
            const { role } = useAuthStore.getState();
            if (role === 'ADMIN') navigate(ROUTES.ADMIN.DASHBOARD);
            else if (role === 'EMPLOYER') navigate(ROUTES.EMPLOYER.DASHBOARD);
            else if (role === 'SEEKER') navigate(ROUTES.SEEKER.DASHBOARD);
            else navigate(ROUTES.DASHBOARD); // Fallback
        } catch (err) {
            // Error handled in store
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    };

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to access your HireNest account and continue your journey"
        >
            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm mb-6 flex items-start animate-fade-in shadow-sm">
                    <div className="flex-shrink-0 mr-3">
                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <span>{error}</span>
                </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
                <Input
                    label="Email address"
                    id="email"
                    name="email"
                    type="email"
                    icon={Mail}
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                />

                <div className="space-y-2">
                    <Input
                        label="Password"
                        id="password"
                        name="password"
                        type="password"
                        icon={Lock}
                        autoComplete="current-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                    />
                    <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 dark:border-gray-600 rounded cursor-pointer transition-colors bg-white dark:bg-gray-800"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-500 dark:text-gray-400 cursor-pointer select-none">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link to={ROUTES.FORGOT_PASSWORD} className="font-semibold text-secondary dark:text-secondary-light hover:underline transition-all">
                                Forgot password?
                            </Link>
                        </div>
                    </div>
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    loading={isLoading}
                    size="lg"
                    className="mt-4 group !bg-secondary hover:!bg-secondary-dark !rounded-full shadow-lg shadow-secondary/20"
                >
                    Sign in
                    {!isLoading && <ArrowRight size={18} className="ml-2 inline-block transition-transform group-hover:translate-x-1" />}
                </Button>
            </form>

            <div className="mt-10">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium tracking-wider uppercase">Or continue with</span>
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
                        Sign in with Google
                    </button>
                </div>
            </div>

            <div className="mt-10 text-center space-y-6">
                <p className="text-base text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <Link to={ROUTES.REGISTER} className="font-bold text-secondary dark:text-secondary-light hover:underline transition-all">
                        Sign up for free
                    </Link>
                </p>

                <div className="pt-6 border-t border-gray-100 dark:border-gray-700/50">
                    <Link to={ROUTES.ADMIN_LOGIN} className="inline-flex items-center text-sm text-gray-400 dark:text-gray-500 hover:text-secondary dark:hover:text-secondary-light transition-all mt-2">
                        <UserCheck size={16} className="mr-2" />
                        Admin Portal
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
};

export default LoginPage;
