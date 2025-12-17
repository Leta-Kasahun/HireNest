import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { User, Briefcase, Check } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import { ROUTES } from '../../config/constants';
import AuthLayout from '../../components/AuthLayout';

const SelectRolePage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { selectRoleAction, isLoading, error } = useAuthStore();

    // Get params from URL (from Google redirect)
    const email = searchParams.get('email');
    const name = searchParams.get('name');
    const googleId = searchParams.get('googleId');

    const [selectedRole, setSelectedRole] = useState(null);

    useEffect(() => {
        if (!email || !googleId) {
            navigate(ROUTES.LOGIN);
        }
    }, [email, googleId, navigate]);

    const handleRoleSelect = async (role) => {
        setSelectedRole(role);
        try {
            await selectRoleAction({
                email,
                name,
                googleId,
                userType: role
            });

            if (role === 'EMPLOYER') navigate(ROUTES.EMPLOYER.DASHBOARD);
            else navigate(ROUTES.SEEKER.DASHBOARD);
        } catch (err) {
            // Error
        }
    };

    return (
        <AuthLayout
            title="Complete Registration"
            subtitle={`Hello ${name || 'there'}, please select your role to continue`}
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

            <div className="space-y-4">
                <button
                    onClick={() => handleRoleSelect('SEEKER')}
                    disabled={isLoading}
                    className={`w-full group relative flex items-center p-6 border rounded-none transition-all duration-300 ease-out text-left focus:outline-none ${selectedRole === 'SEEKER'
                        ? 'border-secondary bg-secondary/5'
                        : 'border-gray-300 hover:border-secondary hover:bg-gray-50'
                        }`}
                >
                    <div className={`p-3 rounded-none mr-5 transition-colors duration-300 ${selectedRole === 'SEEKER' ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-secondary/10 group-hover:text-secondary'}`}>
                        <User size={24} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-secondary transition-colors">Job Seeker</h3>
                        <p className="text-sm text-gray-500">I'm looking for my dream job</p>
                    </div>
                    {selectedRole === 'SEEKER' && (
                        <div className="absolute top-0 right-0 p-1">
                            <div className="w-0 h-0 border-t-[20px] border-r-[20px] border-t-secondary border-r-transparent"></div>
                            <Check size={12} className="absolute top-0 left-0 text-white transform -translate-y-0.5" />
                        </div>
                    )}
                </button>

                <button
                    onClick={() => handleRoleSelect('EMPLOYER')}
                    disabled={isLoading}
                    className={`w-full group relative flex items-center p-6 border rounded-none transition-all duration-300 ease-out text-left focus:outline-none ${selectedRole === 'EMPLOYER'
                        ? 'border-secondary bg-secondary/5'
                        : 'border-gray-300 hover:border-secondary hover:bg-gray-50'
                        }`}
                >
                    <div className={`p-3 rounded-none mr-5 transition-colors duration-300 ${selectedRole === 'EMPLOYER' ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-secondary/10 group-hover:text-secondary'}`}>
                        <Briefcase size={24} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-secondary transition-colors">Employer</h3>
                        <p className="text-sm text-gray-500">I want to hire top talent</p>
                    </div>
                    {selectedRole === 'EMPLOYER' && (
                        <div className="absolute top-0 right-0 p-1">
                            <div className="w-0 h-0 border-t-[20px] border-r-[20px] border-t-secondary border-r-transparent"></div>
                            <Check size={12} className="absolute top-0 left-0 text-white transform -translate-y-0.5" />
                        </div>
                    )}
                </button>
            </div>

            {isLoading && (
                <div className="mt-6 text-center">
                    <div className="inline-flex items-center text-secondary text-sm font-semibold">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Setting up your account...
                    </div>
                </div>
            )}
        </AuthLayout>
    );
};

export default SelectRolePage;
