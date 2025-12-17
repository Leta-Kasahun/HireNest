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
            subtitle={step === 1 ? `We've sent a code to ${tempEmail}` : 'Create a strong password for your account'}
        >
            {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-none text-sm mb-6 flex items-start animate-fade-in">
                    <div className="flex-shrink-0 mr-3">
                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <span>{error}</span>
                </div>
            )}

            {step === 1 ? (
                <form className="space-y-6" onSubmit={handleVerifyOtp}>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Verification Code
                        </label>
                        <input
                            type="text"
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="block w-full px-4 py-3 border border-gray-300 rounded-none bg-gray-50/50 text-center text-3xl tracking-[0.5em] font-bold focus:outline-none focus:bg-white focus:border-primary transition-all duration-300 placeholder-gray-300"
                            maxLength={6}
                            placeholder="······"
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        loading={isLoading}
                        size="lg"
                        className="shadow-none hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out mt-4"
                    >
                        Verify Code
                        {!isLoading && <ArrowRight size={18} className="ml-2 inline-block" />}
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
                        placeholder="New password"
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        icon={CheckCircle}
                        required
                        value={passwords.confirmPassword}
                        onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                        placeholder="Confirm new password"
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        loading={isLoading}
                        size="lg"
                        className="shadow-none hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out mt-4"
                    >
                        Reset Password
                        {!isLoading && <Key size={18} className="ml-2 inline-block" />}
                    </Button>
                </form>
            )}
        </AuthLayout>
    );
};

export default ResetPasswordPage;
