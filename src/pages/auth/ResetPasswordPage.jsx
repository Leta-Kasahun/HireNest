import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Key, CheckCircle, ArrowRight } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import { ROUTES } from '../../config/constants';
import * as authService from '../../services/authService';
import AuthLayout from '../../components/AuthLayout';
import Input from '../../components/Input';
import Button from '../../components/Button';

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const { tempEmail } = useAuthStore();
    const [step, setStep] = useState(1); // 1: OTP, 2: New Password
    const [otp, setOtp] = useState('');
    const [resetToken, setResetToken] = useState('');
    const [passwords, setPasswords] = useState({ newPassword: '', confirmPassword: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const data = await authService.verifyResetOTP({ email: tempEmail, otp });

            if (data.success) {
                const responseData = data.data;
                if (responseData.token || responseData.resetToken) {
                    setResetToken(responseData.token || responseData.resetToken);
                    setStep(2);
                } else {
                    setStep(2);
                }
            } else {
                setError(data.error.message);
            }
        } catch (err) {
            setError('Invalid OTP');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const result = await authService.resetPassword({
                resetToken: resetToken,
                newPassword: passwords.newPassword,
                confirmPassword: passwords.confirmPassword
            });

            if (result.success) {
                navigate(ROUTES.LOGIN);
            } else {
                setError(result.error.message);
            }
        } catch (err) {
            setError('Failed to reset password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title={step === 1 ? 'Verify Code' : 'Set New Password'}
            subtitle={
                <span className="dark:text-gray-400">
                    {step === 1
                        ? `Enter the secure code we've sent to your email ${tempEmail}`
                        : 'Almost there! Create a strong new password for your account'}
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

            {step === 1 ? (
                <form className="space-y-8" onSubmit={handleVerifyOtp}>
                    <div className="relative">
                        <label className="block text-sm font-semibold text-primary dark:text-gray-300 mb-4 text-center uppercase tracking-widest">
                            Verification Code
                        </label>
                        <input
                            type="text"
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="block w-full px-4 py-5 border-2 border-gray-100 dark:border-gray-700 rounded-3xl bg-gray-50/30 dark:bg-gray-800/50 text-center text-4xl tracking-[0.5em] font-extrabold text-primary dark:text-white focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:border-secondary transition-all duration-500 shadow-inner placeholder-gray-200 dark:placeholder-gray-700"
                            maxLength={6}
                            placeholder="000000"
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        loading={isLoading}
                        size="lg"
                        className="!bg-secondary hover:!bg-secondary-dark !rounded-full shadow-xl shadow-secondary/20 transition-all transform hover:-translate-y-1 py-5 text-lg font-bold"
                    >
                        Verify Code
                        {!isLoading && <ArrowRight size={20} className="ml-3 inline-block" />}
                    </Button>
                </form>
            ) : (
                <form className="space-y-6" onSubmit={handleResetPassword}>
                    <Input
                        label="New Password"
                        type="password"
                        icon={Lock}
                        required
                        value={passwords.newPassword}
                        onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                        placeholder="••••••••"
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        icon={CheckCircle}
                        required
                        value={passwords.confirmPassword}
                        onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                        placeholder="••••••••"
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        loading={isLoading}
                        size="lg"
                        className="!bg-secondary hover:!bg-secondary-dark !rounded-full shadow-xl shadow-secondary/20 transition-all transform hover:-translate-y-1 py-5 text-lg font-bold mt-4"
                    >
                        Reset Password
                        {!isLoading && <Key size={20} className="ml-3 inline-block" />}
                    </Button>
                </form>
            )}
        </AuthLayout>
    );
};

export default ResetPasswordPage;
