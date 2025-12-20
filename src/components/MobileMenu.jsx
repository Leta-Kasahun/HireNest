import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/constants';
import Button from './Button';

const MobileMenu = ({
    isOpen,
    setIsOpen,
    isAuthenticated,
    user,
    handleLogout,
    isLoggingOut
}) => {
    const navigate = useNavigate();

    return (
        <div
            className={`md:hidden absolute w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
                }`}
        >
            <div className="px-4 py-6 space-y-4">
                {!isAuthenticated ? (
                    <>
                        <Link
                            to={ROUTES.HOME}
                            className="block text-lg font-medium text-primary hover:text-secondary"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to={ROUTES.LOGIN}
                            className="block text-lg font-medium text-primary hover:text-secondary"
                            onClick={() => setIsOpen(false)}
                        >
                            Login
                        </Link>
                        <Button
                            variant="primary"
                            size="lg"
                            fullWidth
                            onClick={() => {
                                navigate(ROUTES.REGISTER);
                                setIsOpen(false);
                            }}
                            className="!mt-4"
                        >
                            Get Started
                        </Button>
                    </>
                ) : (
                    <>
                        <Link
                            to={ROUTES.DASHBOARD}
                            className="block text-lg font-medium text-primary hover:text-secondary"
                            onClick={() => setIsOpen(false)}
                        >
                            Dashboard
                        </Link>

                        {user?.role === 'ROLE_SEEKER' && (
                            <Link
                                to={ROUTES.SEEKER.PROFILE}
                                className="block text-lg font-medium text-primary hover:text-secondary"
                                onClick={() => setIsOpen(false)}
                            >
                                My Profile
                            </Link>
                        )}

                        <div className="py-4 border-t border-gray-100 mt-4">
                            <div className="text-sm text-text-secondary mb-3">
                                Signed in as <span className="font-medium text-primary">{user?.email}</span>
                            </div>
                            <Button
                                variant="outline"
                                size="md"
                                fullWidth
                                onClick={handleLogout}
                                loading={isLoggingOut}
                                className="hover:!bg-red-50 hover:!text-red-600 hover:!border-red-200"
                            >
                                Logout
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MobileMenu;
