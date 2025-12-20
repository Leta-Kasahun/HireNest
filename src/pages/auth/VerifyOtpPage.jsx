import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import { ROUTES } from '../../config/constants';
import AuthLayout from '../../components/AuthLayout';
import Button from '../../components/Button';

const VerifyOtpPage = () => {
    const navigate = useNavigate();
    const { verifyOtp, tempEmail, isLoading, error } = useAuthStore();
    const [otp, setOtp] = useState('');

    useEffect(() => {
        if (!tempEmail) {
            navigate(ROUTES.REGISTER);
        }
    }, [tempEmail, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await verifyOtp(otp);
            if (data.token) {
                navigate(ROUTES.DASHBOARD);
            } else if (data.needsRoleSelection) {
                navigate(ROUTES.SELECT_ROLE);
            } else {
                navigate(ROUTES.LOGIN);
            }
        } catch (err) {
            // Error handled in store
        }
    };

    return (
        <AuthLayout
            title="Verify Your Email"
            subtitle={
                <span className="dark:text-gray-400">
                    We've sent a 6-digit verification code to <span className="font-bold text-primary dark:text-secondary-light">{tempEmail}</span>
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
                        Enter Verification Code
                    </label>
                    <div className="relative group">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors duration-300 z-10">
                            <ShieldCheck size={24} />
                        </div>
                        <input
                            type="text"
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="block w-full pl-16 pr-4 py-5 border-2 border-gray-100 dark:border-gray-700 rounded-3xl bg-gray-50/30 dark:bg-gray-800/50 text-center text-4xl tracking-[0.5em] font-extrabold text-primary dark:text-white focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:border-secondary transition-all duration-500 shadow-inner placeholder-gray-200 dark:placeholder-gray-700"
                            placeholder="000000"
                            maxLength={6}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        loading={isLoading}
                        size="lg"
                        className="!bg-secondary hover:!bg-secondary-dark !rounded-full shadow-xl shadow-secondary/20 transition-all transform hover:-translate-y-1 py-5 text-lg font-bold"
                    >
                        Verify & Continue
                        {!isLoading && <ArrowRight size={20} className="ml-3 inline-block animate-pulse" />}
                    </Button>

                    <button
                        type="button"
                        className="w-full text-sm text-gray-500 hover:text-secondary dark:hover:text-secondary-light font-medium transition-colors py-2"
                        onClick={() => {/* Implement Resend logic if needed */ }}
                    >
                        Didn't receive a code? <span className="underline decoration-secondary/30 underline-offset-4">Resend OTP</span>
                    </button>
                </div>
            </form>
        </AuthLayout>
    );
};

export default VerifyOtpPage;
