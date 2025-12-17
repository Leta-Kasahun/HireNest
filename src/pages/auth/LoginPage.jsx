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
            subtitle="Sign in to access your HireNest account"
        >
            {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm mb-6 flex items-start animate-fade-in">
                    <div className="flex-shrink-0 mr-3">
                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <span>{error}</span>
                </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
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

                <div className="space-y-1">
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
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer transition-colors"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-500 cursor-pointer select-none">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link to={ROUTES.FORGOT_PASSWORD} className="font-medium text-primary hover:text-secondary transition-colors">
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
                    className="mt-2 group"
                >
                    Sign in
                    {!isLoading && <ArrowRight size={18} className="ml-2 inline-block transition-transform group-hover:translate-x-1" />}
                </Button>
            </form>

            <div className="mt-8">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full flex justify-center items-center py-2.5 px-4 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-all transform hover:-translate-y-0.5"
                    >
                        <img
                            className="h-5 w-5 mr-3"
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                        />
                        Sign in with Google
                    </button>
                </div>
            </div>

            <div className="mt-8 text-center space-y-4">
                <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to={ROUTES.REGISTER} className="font-semibold text-primary hover:text-secondary transition-colors">
                        Sign up for free
                    </Link>
                </p>

                <div className="pt-2 border-t border-gray-100">
                    <Link to={ROUTES.ADMIN_LOGIN} className="inline-flex items-center text-xs text-gray-400 hover:text-primary transition-colors mt-4">
                        <UserCheck size={14} className="mr-1" />
                        Admin Access
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
};

export default LoginPage;
