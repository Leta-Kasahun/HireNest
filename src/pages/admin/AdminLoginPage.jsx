import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { ROUTES } from '../../config/constants';
import AuthLayout from '../../components/AuthLayout';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Mail, Lock, ShieldAlert } from 'lucide-react';

const AdminLoginPage = () => {
    const navigate = useNavigate();
    const { adminLogin, isLoading, error } = useAuthStore();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await adminLogin(formData);
            navigate(ROUTES.ADMIN_VERIFY_OTP);
        } catch (err) {
            // Error
        }
    };

    return (
        <AuthLayout
            title="Admin Access"
            subtitle="Secure portal for HireNest administrators and moderators"
        >
            <div className="flex items-center justify-center mb-8 px-4 py-2 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-full w-fit mx-auto animate-pulse">
                <ShieldAlert size={16} className="text-red-600 dark:text-red-400 mr-2" />
                <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">Restricted Zone</span>
            </div>

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
                <div className="space-y-4">
                    <Input
                        label="Admin Email"
                        id="email"
                        name="email"
                        type="email"
                        icon={Mail}
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="admin@hirenest.com"
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
                        placeholder="••••••••"
                    />
                </div>

                <div className="pt-2">
                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        loading={isLoading}
                        size="lg"
                        className="!bg-primary hover:!bg-primary-dark !rounded-full shadow-lg shadow-primary/20 transition-all font-bold py-4"
                    >
                        {isLoading ? 'Decrypting...' : 'Secure Authorization'}
                    </Button>
                </div>

                <div className="text-center pt-4">
                    <Link to={ROUTES.LOGIN} className="text-sm font-bold text-gray-500 hover:text-secondary dark:text-gray-400 dark:hover:text-secondary-light transition-colors underline underline-offset-4 decoration-current/30">
                        Return to Public Portal
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
};

export default AdminLoginPage;
