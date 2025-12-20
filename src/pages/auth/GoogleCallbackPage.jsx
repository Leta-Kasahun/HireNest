import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { ROUTES } from '../../config/constants';
import AuthLayout from '../../components/AuthLayout';

const GoogleCallbackPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { socialLogin } = useAuthStore();

    useEffect(() => {
        const token = searchParams.get('token');
        const email = searchParams.get('email');
        const userType = searchParams.get('userType');

        if (token && email) {
            // Successful login from Google
            socialLogin(token, email, userType);
            // Redirect based on role
            if (userType === 'ADMIN') navigate(ROUTES.ADMIN.DASHBOARD);
            else if (userType === 'EMPLOYER') navigate(ROUTES.EMPLOYER.DASHBOARD);
            else if (userType === 'SEEKER') navigate(ROUTES.SEEKER.DASHBOARD);
            else navigate(ROUTES.DASHBOARD);
        } else {
            // Error or invalid callback
            navigate(ROUTES.LOGIN);
        }
    }, [searchParams, socialLogin, navigate]);

    return (
        <AuthLayout
            title="Authenticating..."
            subtitle="Securely connecting with Google to sync your profile"
        >
            <div className="flex flex-col items-center justify-center py-20">
                <div className="relative w-20 h-20 mb-8">
                    <div className="absolute inset-0 border-4 border-secondary/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-secondary/10 rounded-full animate-pulse"></div>
                    </div>
                </div>
                <p className="text-primary dark:text-gray-300 font-bold text-lg animate-pulse tracking-wide">Syncing your account...</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">This will only take a moment.</p>
            </div>
        </AuthLayout>
    );
};

export default GoogleCallbackPage;
