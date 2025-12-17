import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAuthStore from '../store/authStore';
import { ROUTES } from '../config/constants';
import Button from './Button';
import MobileMenu from './MobileMenu';

/**
 * Navigation Bar Component
 */
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    setIsLoggingOut(false);
    navigate(ROUTES.LOGIN);
  };

  const navLinkClass = (path) => `
    font-medium transition-colors duration-200 
    ${location.pathname === path ? 'text-secondary' : 'text-text-secondary hover:text-secondary'}
  `;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center space-x-2 group">
            <img
              src="/image.png"
              alt="HireNest Logo"
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-2xl font-heading font-bold text-primary tracking-tight">
              HireNest
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!isAuthenticated ? (
              <>
                <Link to={ROUTES.HOME} className={navLinkClass(ROUTES.HOME)}>
                  Home
                </Link>
                <Link to={ROUTES.LOGIN} className={navLinkClass(ROUTES.LOGIN)}>
                  Login
                </Link>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate(ROUTES.REGISTER)}
                  className="!bg-primary hover:!bg-primary-light !text-white !px-6 !rounded-full shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
                >
                  Get Started
                </Button>
              </>
            ) : (
              <>
                <Link to={ROUTES.DASHBOARD} className={navLinkClass(ROUTES.DASHBOARD)}>
                  Dashboard
                </Link>
                <div className="flex items-center space-x-4 pl-4 border-l border-gray-200">
                  <div className="flex flex-col text-right hidden lg:block">
                    <span className="text-sm font-medium text-primary">
                      {user?.firstName || 'User'}
                    </span>
                    <span className="text-xs text-text-secondary">
                      {user?.email}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    loading={isLoggingOut}
                    className="!rounded-full hover:!bg-red-50 hover:!text-red-600 hover:!border-red-200"
                  >
                    Logout
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-primary focus:outline-none p-2 rounded-lg hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
        isAuthenticated={isAuthenticated}
        user={user}
        handleLogout={handleLogout}
        isLoggingOut={isLoggingOut}
      />
    </nav>
  );
};

export default Navbar;
