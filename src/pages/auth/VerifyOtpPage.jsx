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
                <span>
                    We sent a code to <span className="font-bold text-gray-800">{tempEmail}</span>
                </span>
            }
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

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Verification Code
                    </label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                            <ShieldCheck size={20} />
                        </div>
                        <input
                            type="text"
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-none bg-gray-50/50 text-center text-3xl tracking-[0.5em] font-bold focus:outline-none focus:bg-white focus:border-primary transition-all duration-300 placeholder-gray-300"
                            placeholder="······"
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
                    className="shadow-none hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out mt-4"
                >
                    Verify Email
                    {!isLoading && <ArrowRight size={18} className="ml-2 inline-block" />}
                </Button>
            </form>
        </AuthLayout>
    );
};

export default VerifyOtpPage;
