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
            title="Processing Login"
            subtitle="Please wait while we set things up..."
        >
            <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                <p className="text-gray-500 text-sm">Validating credentials...</p>
            </div>
        </AuthLayout>
    );
};

export default GoogleCallbackPage;
