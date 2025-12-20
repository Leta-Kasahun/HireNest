import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { ROUTES } from '../../config/constants';
import AuthLayout from '../../components/AuthLayout';
import Button from '../../components/Button';
import { ShieldCheck, ArrowRight } from 'lucide-react';

const AdminVerifyOtpPage = () => {
    const navigate = useNavigate();
    const { adminVerifyOtp, tempEmail, isLoading, error } = useAuthStore();
    const [otp, setOtp] = useState('');

    useEffect(() => {
        if (!tempEmail) {
            navigate(ROUTES.ADMIN_LOGIN);
        }
    }, [tempEmail, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await adminVerifyOtp(otp);
            navigate(ROUTES.ADMIN.DASHBOARD);
        } catch (err) {
            // Error
        }
    };

    return (
        <AuthLayout
            title="Secure Verification"
            subtitle={
                <span className="dark:text-gray-400">
                    A multi-factor authentication code was sent to <span className="font-bold text-primary dark:text-white">{tempEmail}</span>
                </span>
            }
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

            <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="relative">
                    <label className="block text-sm font-semibold text-primary dark:text-gray-300 mb-4 text-center uppercase tracking-widest">
                        Admin Security Code
                    </label>
                    <div className="relative group">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors duration-300 z-10">
                            <ShieldCheck size={24} />
                        </div>
                        <input
                            type="text"
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="block w-full px-4 py-6 border-2 border-gray-100 dark:border-gray-800 rounded-3xl bg-gray-50/30 dark:bg-gray-900/50 text-center text-4xl tracking-[0.5em] font-extrabold text-primary dark:text-white focus:outline-none focus:bg-white dark:focus:bg-gray-900 focus:border-primary transition-all duration-500 shadow-inner placeholder-gray-100 dark:placeholder-gray-800"
                            placeholder="000000"
                            maxLength={6}
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    loading={isLoading}
                    size="lg"
                    className="!bg-primary hover:!bg-primary-dark !rounded-full shadow-xl shadow-primary/20 transition-all transform hover:-translate-y-1 py-5 text-lg font-bold"
                >
                    {isLoading ? 'Decrypting...' : 'Confirm Identity'}
                    {!isLoading && <ArrowRight size={20} className="ml-3 inline-block" />}
                </Button>
            </form>
        </AuthLayout>
    );
};

export default AdminVerifyOtpPage;
