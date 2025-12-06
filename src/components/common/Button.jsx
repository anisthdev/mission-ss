import { motion } from 'framer-motion';
import { buttonTap } from '../../utils/animations';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  ...props
}) {
  const baseClasses = 'rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2';

  const variants = {
    primary: 'btn-primary-adaptive',
    secondary: 'btn-secondary-adaptive',
    outline: 'btn-outline-adaptive',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileTap={buttonTap}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
