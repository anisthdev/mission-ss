import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { nameKey: "nav.home", path: "/" },
    {
      nameKey: "nav.about",
      path: "/about",
      dropdown: [
        { nameKey: "nav.aboutDropdown.ourStory", path: "/about" },
        { nameKey: "nav.aboutDropdown.visionMission", path: "/about#vision" },
        { nameKey: "nav.aboutDropdown.teamGovernance", path: "/team" },
      ],
    },
    {
      nameKey: "nav.programs",
      path: "/programs",
      dropdown: [
        { nameKey: "nav.programsDropdown.allPrograms", path: "/programs" },
        {
          nameKey: "nav.programsDropdown.livelihoods",
          path: "/programs/livelihoods",
        },
        {
          nameKey: "nav.programsDropdown.farmerCollectives",
          path: "/programs/farmer-collectives",
        },
        {
          nameKey: "nav.programsDropdown.womenEmpowerment",
          path: "/programs/women-empowerment",
        },
        {
          nameKey: "nav.programsDropdown.artisanRevival",
          path: "/programs/artisan-revival",
        },
        {
          nameKey: "nav.programsDropdown.skillDevelopment",
          path: "/programs/skill-development",
        },
      ],
    },
    { nameKey: "nav.impact", path: "/impact" },
    { nameKey: "nav.whereWeWork", path: "/where-we-work" },
    { nameKey: "nav.partners", path: "/partners" },
    { nameKey: "nav.transparency", path: "/transparency" },
    { nameKey: "nav.getInvolved", path: "/get-involved" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header
      className={`${isScrolled ? "sticky" : "absolute"} top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-[rgb(var(--dark-bg-secondary))]/90 backdrop-blur-md border-b border-sand-200 dark:border-[rgb(var(--dark-border))] shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/images/hope_logo.png"
              alt="Hope Foundation Logo"
              className={`h-20 lg:h-24 w-auto rounded-full object-cover transition-all ${
                isScrolled
                  ? "opacity-90 mix-blend-multiply dark:mix-blend-normal dark:brightness-110"
                  : "opacity-100 drop-shadow-lg"
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div key={item.nameKey} className="relative">
                {item.dropdown ? (
                  <div
                    onMouseEnter={() => setActiveDropdown(item.nameKey)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="relative"
                  >
                    <button
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                        !isScrolled
                          ? "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:text-white/90"
                          : ""
                      } ${
                        isScrolled && isActive(item.path)
                          ? "text-hope-500 dark:text-[rgb(var(--dark-accent-hope))]"
                          : isScrolled
                            ? "text-slate-600 dark:text-[rgb(var(--dark-text-primary))] hover:text-hope-500 dark:hover:text-[rgb(var(--dark-accent-saffron)))]"
                            : ""
                      }`}
                    >
                      {t(item.nameKey)}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${activeDropdown === item.nameKey ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === item.nameKey && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 mt-1 w-56 py-2 rounded-lg shadow-xl
                                     bg-white dark:bg-[rgb(var(--dark-bg-secondary))]
                                     border border-sand-200 dark:border-[rgb(var(--dark-border))]"
                        >
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              className="block px-4 py-2 text-sm text-slate-600 dark:text-[rgb(var(--dark-text-primary))]
                                       hover:bg-sand-100 dark:hover:bg-[rgb(var(--dark-bg-hover))]
                                       hover:text-hope-500 dark:hover:text-[rgb(var(--dark-accent-hope))]
                                       transition-colors"
                            >
                              {t(subItem.nameKey)}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      !isScrolled
                        ? "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:text-white/90"
                        : ""
                    } ${
                      isScrolled && isActive(item.path)
                        ? "text-hope-500 dark:text-[rgb(var(--dark-accent-hope))]"
                        : isScrolled
                          ? "text-slate-600 dark:text-[rgb(var(--dark-text-primary))] hover:text-hope-500 dark:hover:text-[rgb(var(--dark-accent-saffron)))]"
                          : ""
                    }`}
                  >
                    {t(item.nameKey)}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-all ${
                !isScrolled
                  ? "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:bg-white/10"
                  : "text-slate-600 dark:text-[rgb(var(--dark-text-primary))] hover:bg-sand-100 dark:hover:bg-[rgb(var(--dark-bg-hover))]"
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden border-t border-sand-200 dark:border-[rgb(var(--dark-border))]"
            >
              <div className="py-4 space-y-1">
                {navigation.map((item) => (
                  <div key={item.nameKey}>
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.nameKey)}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-base font-medium
                                     text-slate-600 dark:text-[rgb(var(--dark-text-primary))]
                                     hover:bg-sand-100 dark:hover:bg-[rgb(var(--dark-bg-hover))]
                                     transition-colors"
                        >
                          {t(item.nameKey)}
                          <ChevronDown
                            size={18}
                            className={`transition-transform ${activeDropdown === item.nameKey ? "rotate-180" : ""}`}
                          />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === item.nameKey && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 space-y-1"
                            >
                              {item.dropdown.map((subItem) => (
                                <Link
                                  key={subItem.path}
                                  to={subItem.path}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-[rgb(var(--dark-text-secondary))]
                                           hover:bg-sand-100 dark:hover:bg-[rgb(var(--dark-bg-hover))]
                                           hover:text-hope-500 dark:hover:text-[rgb(var(--dark-accent-hope))]
                                           transition-colors"
                                >
                                  {t(subItem.nameKey)}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors
                                   ${
                                     isActive(item.path)
                                       ? "text-hope-500 dark:text-[rgb(var(--dark-accent-hope))] bg-sand-100 dark:bg-[rgb(var(--dark-bg-hover))]"
                                       : "text-slate-600 dark:text-[rgb(var(--dark-text-primary))] hover:bg-sand-100 dark:hover:bg-[rgb(var(--dark-bg-hover))]"
                                   }`}
                      >
                        {t(item.nameKey)}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
