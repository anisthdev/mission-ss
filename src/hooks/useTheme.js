import { useState, useEffect, useCallback } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState('light');
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const stored = localStorage.getItem('theme');

    // Default to light mode, only use dark if explicitly set
    const initialTheme = stored === 'dark' ? 'dark' : 'light';
    setTheme(initialTheme);

    // Ensure DOM is in sync
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    console.log('Theme initialized:', initialTheme, 'localStorage:', stored, 'classList:', document.documentElement.classList.contains('dark'));

    setIsLoaded(true);
  }, []);

  // Note: We don't listen to system preference changes
  // The site defaults to light mode, users can toggle manually

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';

      localStorage.setItem('theme', newTheme);

      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      return newTheme;
    });
  }, []);

  const setSpecificTheme = useCallback((newTheme) => {
    if (newTheme !== 'dark' && newTheme !== 'light') return;

    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  }, []);

  return {
    theme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    isLoaded,
    toggleTheme,
    setTheme: setSpecificTheme,
  };
}
