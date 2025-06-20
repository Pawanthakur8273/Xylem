import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mountain, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Memoize navigation items to prevent unnecessary re-renders
  const navItems = useMemo(() => [
    { path: '/', label: 'Home' },
    { path: '/emissions', label: 'Emissions Map' },
    { path: '/quiz', label: 'Glacier Quiz' },
    { path: '/glacier', label: 'Glacier Timeline' },
    { path: '/Games', label: 'Games' },
  ], []);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 30);
  }, []);

  useEffect(() => {
    let timeoutId: number | null = null;
    
    const throttledScrollHandler = () => {
      if (timeoutId === null) {
        timeoutId = setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, 16); // ~60fps
      }
    };

    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Enhanced animation variants with more sophisticated motion
  const navVariants = {
    hidden: { y: -120, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      scale: 0.95,
      y: -20,
      transition: {
        duration: 0.25,
        ease: [0.4, 0.0, 0.2, 1]
      }
    },
    visible: { 
      opacity: 1, 
      height: "auto",
      scale: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.0, 0.0, 0.2, 1],
        staggerChildren: 0.05
      }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: i * 0.08,
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    })
  };

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${isScrolled ? 'bg-white/85 backdrop-blur-2xl shadow-2xl shadow-blue-500/10 border-b border-white/30' : 'bg-gradient-to-b from-white/20 to-transparent backdrop-blur-md'}`}
        style={{
          background: isScrolled 
            ? 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.98) 50%, rgba(243,244,246,0.95) 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(248,250,252,0.08) 50%, transparent 100%)',
          backdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'blur(12px) saturate(150%)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-20">
            {/* Logo and Navigation with animated icon */}
            <Link to="/" className="flex items-center space-x-3 group relative">
              <motion.div
                className="relative p-3 rounded-2xl bg-gradient-to-br from-blue-50/80 via-indigo-50/60 to-purple-50/40"
                animate={{
                  y: [0, -2, 0, -1, 0], // Floating animation
                  rotate: [0, 0.5, 0, -0.5, 0] // Gentle sway
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Mountain className={`h-8 w-8 ${
                  isHomePage && !isScrolled 
                    ? 'text-white group-hover:text-blue-200' 
                    : 'text-blue-600 group-hover:text-blue-700'
                }`} />
              </motion.div>
              <div className="relative">
                <motion.span 
                  className={`text-2xl font-bold bg-clip-text group-hover:from-blue-800 group-hover:via-indigo-700 group-hover:to-purple-700 ${
                    isHomePage && !isScrolled
                      ? 'text-white group-hover:text-blue-200'
                      : 'bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 text-transparent'
                  }`}
                >
                  GlaCTrack
                </motion.span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    custom={index}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      to={item.path}
                      className={`relative px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-400 group overflow-hidden ${
                        isActive 
                          ? 'text-white shadow-xl shadow-blue-500/30' 
                          : (isHomePage && !isScrolled 
                              ? 'text-white hover:text-blue-200' 
                              : 'text-slate-700 hover:text-slate-800')
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                      style={{
                        background: isActive ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)' : 'transparent'
                      }}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                onClick={toggleMobileMenu}
                className={`p-3 rounded-2xl backdrop-blur-xl transition-all duration-400 ${
                  isHomePage && !isScrolled
                    ? 'bg-white/20 text-white hover:bg-white/30'
                    : 'bg-white/50 text-slate-700 hover:bg-white/70 hover:text-slate-800'
                }`}
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed top-24 left-4 right-4 z-40 md:hidden"
          >
            <nav className="p-6 space-y-3" role="navigation" aria-label="Mobile navigation">
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div key={item.path} custom={index} variants={menuItemVariants} initial="hidden" animate="visible">
                    <Link
                      to={item.path}
                      onClick={closeMobileMenu}
                      className={`relative block px-6 py-4 rounded-2xl text-base font-semibold transition-all duration-400 group overflow-hidden ${
                        isActive 
                          ? 'text-white shadow-xl shadow-blue-500/25' 
                          : 'text-slate-700 hover:text-slate-800'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span className="relative z-10">{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-slate-900/20 via-blue-900/10 to-indigo-900/20 backdrop-blur-md md:hidden z-30"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;