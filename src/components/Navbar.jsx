import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import useAuthStore from '../store/authStore';
import useTheme from '../hooks/useTheme';
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
  const { theme, toggleTheme } = useTheme();
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
    ${location.pathname === path ? 'text-secondary' : 'text-text-secondary dark:text-gray-300 hover:text-secondary dark:hover:text-white'}
  `;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center space-x-2 group">
            <img
              src="/image.png"
              alt="HireNest Logo"
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-2xl font-heading font-bold text-primary dark:text-white tracking-tight">
              HireNest
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 items-center justify-between ml-12">
            <div className="flex items-center space-x-10">
              {!isAuthenticated ? (
                <>
                  <Link to={ROUTES.HOME} className={navLinkClass(ROUTES.HOME)}>
                    Home
                  </Link>
                  <Link to={ROUTES.LOGIN} className={navLinkClass(ROUTES.LOGIN)}>
                    Login
                  </Link>
                </>
              ) : (
                <>
                  <Link to={ROUTES.DASHBOARD} className={navLinkClass(ROUTES.DASHBOARD)}>
                    Dashboard
                  </Link>
                  {user?.role === 'ROLE_SEEKER' && (
                    <Link to={ROUTES.SEEKER.PROFILE} className={navLinkClass(ROUTES.SEEKER.PROFILE)}>
                      My Profile
                    </Link>
                  )}
                </>
              )}
            </div>

            <div className="flex items-center space-x-6">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>

              {!isAuthenticated ? (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate(ROUTES.REGISTER)}
                  className="!bg-secondary hover:!bg-secondary-dark !text-white !px-8 !rounded-full shadow-lg shadow-secondary/20 transition-all hover:-translate-y-0.5 font-bold"
                >
                  Get Started
                </Button>
              ) : (
                <div className="flex items-center space-x-4 pl-4 border-l border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col text-right hidden lg:block">
                    <span className="text-sm font-medium text-primary dark:text-white">
                      {user?.firstName || 'User'}
                    </span>
                    <span className="text-xs text-text-secondary dark:text-gray-400">
                      {user?.email}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    loading={isLoggingOut}
                    className="!rounded-full hover:!bg-red-50 hover:!text-red-600 hover:!border-red-200 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-red-900/20"
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary dark:text-white focus:outline-none p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
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
      </div>

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
