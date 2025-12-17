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
        userType: 'SEEKER',
    });
    const [validationError, setValidationError] = useState(null);

    const handleChange = (e) => {
        if (error) clearError();
        if (validationError) setValidationError(null);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUserTypeChange = (type) => {
        setFormData({ ...formData, userType: type });
    }

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
                userType: formData.userType
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
            title="Create an Account"
            subtitle="Join HireNest today and start your journey"
        >
            {(error || validationError) && (
                <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-none text-sm mb-6 flex items-start animate-fade-in">
                    <div className="flex-shrink-0 mr-3">
                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <span>{error || validationError}</span>
                </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
                {/* User Type Selection */}
                {/* User Type Selection */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">I am a</label>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => handleUserTypeChange('SEEKER')}
                            className={`relative flex items-center justify-center py-3 px-4 border-2 rounded-none text-sm font-bold focus:outline-none transition-all duration-300 ease-out ${formData.userType === 'SEEKER'
                                ? 'bg-secondary/5 border-secondary text-secondary'
                                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400 hover:bg-gray-50'
                                }`}
                        >
                            <User size={18} className="mr-2" />
                            Job Seeker
                            {formData.userType === 'SEEKER' && (
                                <div className="absolute top-0 right-0 p-1">
                                    <div className="w-0 h-0 border-t-[16px] border-r-[16px] border-t-secondary border-r-transparent"></div>
                                    <Check size={10} className="absolute top-0 left-0 text-white transform -translate-y-0.5" />
                                </div>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => handleUserTypeChange('EMPLOYER')}
                            className={`relative flex items-center justify-center py-3 px-4 border-2 rounded-none text-sm font-bold focus:outline-none transition-all duration-300 ease-out ${formData.userType === 'EMPLOYER'
                                ? 'bg-secondary/5 border-secondary text-secondary'
                                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400 hover:bg-gray-50'
                                }`}
                        >
                            <Briefcase size={18} className="mr-2" />
                            Employer
                            {formData.userType === 'EMPLOYER' && (
                                <div className="absolute top-0 right-0 p-1">
                                    <div className="w-0 h-0 border-t-[16px] border-r-[16px] border-t-secondary border-r-transparent"></div>
                                    <Check size={10} className="absolute top-0 left-0 text-white transform -translate-y-0.5" />
                                </div>
                            )}
                        </button>
                    </div>
                </div>

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
                    placeholder="Create a password"
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
                    placeholder="Confirm your password"
                />

                <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    loading={isLoading}
                    size="lg"
                    className="mt-4 group shadow-none hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out"
                >
                    Create Account
                    {!isLoading && <ArrowRight size={18} className="ml-2 inline-block transition-transform group-hover:translate-x-1" />}
                </Button>
            </form>

            <div className="mt-8">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500 font-medium">Or sign up with</span>
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full flex justify-center items-center py-2.5 px-4 border border-gray-200 rounded-none shadow-sm bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
                    >
                        <img
                            className="h-5 w-5 mr-3"
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                        />
                        Google
                    </button>
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to={ROUTES.LOGIN} className="font-semibold text-primary hover:text-secondary transition-colors">
                        Sign in
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default RegisterPage;
