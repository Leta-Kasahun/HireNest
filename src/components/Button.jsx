import { COLORS } from '../config/constants';

/**
 * Reusable Button Component
 * @param {Object} props - Component props
 * @param {string} props.variant - Button variant (primary, secondary, outline, danger)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.loading - Loading state
 * @param {boolean} props.fullWidth - Full width button
 * @param {string} props.type - Button type (button, submit, reset)
 * @param {Function} props.onClick - Click handler
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional classes
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  onClick,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'font-medium rounded-none transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transform hover:-translate-y-1 active:translate-y-0';

  const variantClasses = {
    primary: 'bg-primary dark:bg-primary-light text-white hover:bg-primary-light dark:hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20 focus:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark hover:shadow-lg hover:shadow-secondary/20 focus:ring-secondary',
    outline: 'bg-transparent text-primary dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-primary',
    ghost: 'bg-transparent text-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 shadow-none hover:shadow-none translate-y-0 hover:translate-y-0',
    danger: 'bg-error text-white hover:bg-error-dark hover:shadow-lg hover:shadow-error/20 focus:ring-error',
    success: 'bg-accent text-white hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/20 focus:ring-accent',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
