import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown, Sun, Moon } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { useTheme } from '@/app/context/ThemeContext';

interface AMIANavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function AMIANavigation({ currentPage, onNavigate }: AMIANavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showArtistsDropdown, setShowArtistsDropdown] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.overflowY = 'auto';
      document.documentElement.style.overflow = '';
      document.documentElement.style.overflowY = 'scroll';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.overflowY = 'auto';
      document.documentElement.style.overflow = '';
      document.documentElement.style.overflowY = 'scroll';
    };
  }, [isMobileMenuOpen]);

  // Reset mobile menu when page changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
    document.body.style.overflowY = 'auto';
    document.documentElement.style.overflow = '';
    document.documentElement.style.overflowY = 'scroll';
  }, [currentPage]);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'categories', label: 'Categories' },
    { id: 'news', label: 'News' },
    { id: 'about', label: 'About' },
  ];

  const artistsDropdownItems = [
    { id: 'nominees', label: 'Nominees' },
    { id: 'winners', label: 'Winners' },
    { id: 'hall-of-fame', label: 'Hall of Fame' },
  ];

  const isArtistsPageActive = ['nominees', 'winners', 'hall-of-fame'].includes(currentPage);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-[60] transition-all duration-300 dark:bg-black/95 dark:border-white/10 light:bg-white/95 light:border-black/10 backdrop-blur-xl border-b"
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Minimal */}
            <button
              onClick={() => {
                onNavigate('home');
                setIsMobileMenuOpen(false);
              }}
              className="relative z-[70] font-raleway text-xl font-bold dark:text-white light:text-black hover:text-[#6401CF] transition-colors duration-300"
            >
              AMI
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {/* Home Link */}
              <button
                onClick={() => onNavigate('home')}
                className={`relative font-inter text-[15px] font-medium transition-all duration-300 group ${
                  currentPage === 'home'
                    ? 'dark:text-white light:text-black'
                    : 'dark:text-white/50 dark:hover:text-white light:text-black/50 light:hover:text-black'
                }`}
              >
                {t('nav.home')}
                {currentPage === 'home' && (
                  <motion.div
                    layoutId="activeNavItem"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#6401CF] to-[#FF4350]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <div className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#6401CF] to-[#FF4350] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${currentPage === 'home' ? 'hidden' : ''}`} />
              </button>

              {/* Awards Dropdown - Right After Home */}
              <div className="relative">
                <button
                  onMouseEnter={() => setShowArtistsDropdown(true)}
                  onMouseLeave={() => setShowArtistsDropdown(false)}
                  className={`relative font-inter text-[15px] font-medium transition-all duration-300 group flex items-center gap-1 ${
                    isArtistsPageActive
                      ? 'dark:text-white light:text-black'
                      : 'dark:text-white/50 dark:hover:text-white light:text-black/50 light:hover:text-black'
                  }`}
                >
                  Awards
                  <ChevronDown className="w-4 h-4" />
                  
                  {isArtistsPageActive && (
                    <motion.div
                      layoutId="activeNavItem"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#6401CF] to-[#FF4350]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <div className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#6401CF] to-[#FF4350] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isArtistsPageActive ? 'hidden' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {showArtistsDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      onMouseEnter={() => setShowArtistsDropdown(true)}
                      onMouseLeave={() => setShowArtistsDropdown(false)}
                      className="absolute top-full left-0 mt-6 dark:bg-black light:bg-white backdrop-blur-xl dark:border-white/10 light:border-black/10 border shadow-xl overflow-hidden min-w-[180px]"
                    >
                      {artistsDropdownItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            onNavigate(item.id);
                            setShowArtistsDropdown(false);
                          }}
                          className={`w-full px-6 py-3 text-left font-inter text-[15px] transition-colors ${
                            currentPage === item.id
                              ? 'bg-gradient-to-r from-[#6401CF] to-[#FF4350] text-white font-medium'
                              : 'dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white light:text-black/70 light:hover:bg-black/5 light:hover:text-black'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Rest of the nav links */}
              {navLinks.slice(1).map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`relative font-inter text-[15px] font-medium transition-all duration-300 group ${
                    currentPage === link.id
                      ? 'dark:text-white light:text-black'
                      : 'dark:text-white/50 dark:hover:text-white light:text-black/50 light:hover:text-black'
                  }`}
                >
                  {t(`nav.${link.id}` as any)}
                  {currentPage === link.id && (
                    <motion.div
                      layoutId="activeNavItem"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#6401CF] to-[#FF4350]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <div className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#6401CF] to-[#FF4350] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${currentPage === link.id ? 'hidden' : ''}`} />
                </button>
              ))}
            </div>

            {/* Right Side: Theme + Language + CTA */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-10 h-10 dark:text-white/60 dark:hover:text-white light:text-black/60 light:hover:text-black transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="flex items-center gap-2 px-4 py-2 dark:text-white/60 dark:hover:text-white light:text-black/60 light:hover:text-black transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span className="font-inter text-[14px] font-medium uppercase">
                    {language}
                  </span>
                </button>

                {/* Language Dropdown */}
                <AnimatePresence>
                  {showLanguageMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full right-0 mt-2 dark:bg-black light:bg-white backdrop-blur-xl dark:border-white/10 light:border-black/10 border shadow-lg overflow-hidden min-w-[120px]"
                    >
                      {[
                        { code: 'en', label: 'English' },
                        { code: 'fr', label: 'Français' },
                        { code: 'es', label: 'Español' },
                      ].map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code as 'en' | 'fr' | 'es');
                            setShowLanguageMenu(false);
                          }}
                          className={`w-full px-4 py-3 text-left font-inter text-sm transition-colors ${
                            language === lang.code
                              ? 'bg-gradient-to-r from-[#6401CF] to-[#FF4350] text-white'
                              : 'dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white light:text-black/70 light:hover:bg-black/5 light:hover:text-black'
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA Button */}
              <button
                disabled
                className="px-6 py-2.5 dark:bg-neutral-200 dark:text-neutral-500 light:bg-neutral-800 light:text-neutral-400 text-[14px] font-inter font-medium cursor-not-allowed"
                title="Voting opens soon"
              >
                {t('nav.vote')}
              </button>
            </div>

            {/* Mobile Right Side: Theme + Language + Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-10 h-10 dark:text-white/60 dark:hover:text-white light:text-black/60 light:hover:text-black transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* Mobile Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="flex items-center gap-1 px-2 py-2 dark:text-white/60 dark:hover:text-white light:text-black/60 light:hover:text-black transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  <span className="font-inter text-[13px] font-medium uppercase">
                    {language}
                  </span>
                </button>

                {/* Language Dropdown */}
                <AnimatePresence>
                  {showLanguageMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full right-0 mt-2 dark:bg-black light:bg-white backdrop-blur-xl dark:border-white/10 light:border-black/10 border shadow-lg overflow-hidden min-w-[120px] z-[70]"
                    >
                      {[
                        { code: 'en', label: 'English' },
                        { code: 'fr', label: 'Français' },
                        { code: 'es', label: 'Español' },
                      ].map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code as 'en' | 'fr' | 'es');
                            setShowLanguageMenu(false);
                          }}
                          className={`w-full px-4 py-3 text-left font-inter text-sm transition-colors ${
                            language === lang.code
                              ? 'bg-gradient-to-r from-[#6401CF] to-[#FF4350] text-white'
                              : 'dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white light:text-black/70 light:hover:bg-black/5 light:hover:text-black'
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative z-[70] p-3 -mr-3 dark:text-white light:text-black"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[65] lg:hidden dark:bg-black light:bg-white"
          >
            {/* Close Button - Top Right */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-7 right-6 z-[70] p-3 dark:text-white light:text-black hover:opacity-70 transition-opacity"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center justify-center h-full gap-6 p-8 pt-32">
              {/* Home Link */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0 }}
                onClick={() => {
                  onNavigate('home');
                  setIsMobileMenuOpen(false);
                }}
                className={`font-raleway text-4xl font-bold transition-colors duration-300 ${
                  currentPage === 'home'
                    ? 'dark:text-white light:text-black'
                    : 'dark:text-white/40 dark:hover:text-white light:text-black/40 light:hover:text-black'
                }`}
              >
                Home
              </motion.button>

              {/* Awards Submenu - Right After Home */}
              <div className="flex flex-col items-center gap-4 mt-2">
                <div className="font-raleway text-2xl font-bold dark:text-white/60 light:text-black/60 uppercase text-sm tracking-widest">
                  Awards
                </div>
                {artistsDropdownItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (1 + index) * 0.05 }}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`font-raleway text-3xl font-bold transition-colors duration-300 ${
                      currentPage === item.id
                        ? 'dark:text-white light:text-black'
                        : 'dark:text-white/40 dark:hover:text-white light:text-black/40 light:hover:text-black'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>

              {/* Rest of nav links */}
              {navLinks.slice(1).map((link, index) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (1 + artistsDropdownItems.length + index) * 0.05 }}
                  onClick={() => {
                    onNavigate(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`font-raleway text-4xl font-bold transition-colors duration-300 ${
                    currentPage === link.id
                      ? 'dark:text-white light:text-black'
                      : 'dark:text-white/40 dark:hover:text-white light:text-black/40 light:hover:text-black'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (1 + artistsDropdownItems.length + navLinks.slice(1).length) * 0.05 }}
                disabled
                className="mt-8 px-10 py-4 dark:bg-neutral-800 dark:text-neutral-500 light:bg-neutral-200 light:text-neutral-400 font-inter font-semibold text-lg cursor-not-allowed opacity-60"
                title="Voting opens soon"
              >
                Vote • Coming Soon
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}