import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useThemeContext } from '../../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme, isLoaded } = useThemeContext();

  // Prevent hydration mismatch
  if (!isLoaded) {
    return (
      <div className="w-10 h-10 rounded-full bg-sand-200 dark:bg-[rgb(var(--dark-bg-tertiary))] animate-pulse" />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-full
                 bg-sand-200 dark:bg-[rgb(var(--dark-bg-tertiary))]
                 hover:bg-sand-300 dark:hover:bg-[rgb(var(--dark-bg-hover))]
                 text-hope-500 dark:text-[rgb(var(--dark-accent-radiance))]
                 transition-colors duration-200
                 focus:outline-none focus:ring-2 focus:ring-hope-400/50"
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.05 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'moon' : 'sun'}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
        >
          {isDark ? (
            <Sun size={20} strokeWidth={2.5} />
          ) : (
            <Moon size={20} strokeWidth={2.5} />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
