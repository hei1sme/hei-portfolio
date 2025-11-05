'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaHome, FaUser, FaBriefcase, FaCog, FaEnvelope, FaUniversity, FaMoon, FaSun, FaFeatherAlt, FaBars, FaTimes, FaHistory } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Define section icons and labels
const navItems = [
  { id: 'home', label: 'Home', icon: <FaHome />, path: '/' },
  { id: 'about', label: 'About', icon: <FaUser />, path: '#about' },
  { id: 'projects', label: 'Projects', icon: <FaBriefcase />, path: '#projects' },
  { id: 'skills', label: 'Skills', icon: <FaCog />, path: '#skills' },
  { id: 'experience', label: 'Experience', icon: <FaHistory />, path: '#experience' },
  { id: 'education', label: 'Education', icon: <FaUniversity />, path: '#education' },
  { id: 'blog', label: 'Blog', icon: <FaFeatherAlt />, path: '/blog' },
  { id: 'contact', label: 'Contact', icon: <FaEnvelope />, path: '#contact' },
];

const VerticalNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);

    let scrollListener: (() => void) | null = null;
    if (isHomePage) {
        const sections = navItems.filter(item => item.path.startsWith('#')).map(item => item.id);
        const handleScroll = () => {
          let currentSectionId = 'home'; 
          let minTop = Infinity;

          for (const sectionId of sections) {
            const element = document.getElementById(sectionId);
            if (element) {
              const rect = element.getBoundingClientRect();
              const viewportHeight = window.innerHeight;
              
              if (rect.top < viewportHeight * 0.55 && rect.bottom > viewportHeight * 0.35) {
                currentSectionId = sectionId;
                minTop = rect.top;
                break;
              }
              
              if (rect.top >= 0 && rect.top < minTop) {
                minTop = rect.top;
                currentSectionId = sectionId;
              }
            }
          }
          
          if (minTop === Infinity && (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 150) {
             const contactElement = document.getElementById('contact');
             if (contactElement) currentSectionId = 'contact';
          }

          if (currentSectionId !== activeSection) {
            setActiveSection(currentSectionId);
          }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        scrollListener = handleScroll;
        handleScroll();
    } else {
        const currentNavItem = navItems.find(item => item.path === pathname || (item.id === 'blog' && pathname.startsWith('/blog')));
        setActiveSection(currentNavItem ? currentNavItem.id : 'home');
    }

    return () => {
      if (scrollListener) window.removeEventListener('scroll', scrollListener);
      window.removeEventListener('resize', handleResize);
    };
  }, [pathname, isHomePage, activeSection]);

  const handleNavLinkClick = (e: React.MouseEvent, itemPath: string, itemId: string) => {
      setIsMobileMenuOpen(false);
      setActiveSection(itemId);
      
      if (itemPath.startsWith('#') && isHomePage) {
          e.preventDefault();
          const element = document.getElementById(itemId);
          if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
      } 
  };

  const getHref = (itemPath: string): string => {
      if (itemPath.startsWith('#') && !isHomePage) {
          return `/${itemPath}`;
      }
      return itemPath;
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, y: "-100%", transition: { duration: 0.3, ease: "easeInOut" } },
  };

  return (
    <>
      <motion.div 
        className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#05010a]/85 backdrop-blur-2xl border-b border-white/10 z-50 flex items-center justify-between px-6 shadow-lg"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Link href="/" passHref onClick={(e) => handleNavLinkClick(e, '/', 'home')}>
            <motion.div
                className="text-2xl font-semibold tracking-tight cursor-pointer bg-gradient-to-r from-purple-300 via-fuchsia-400 to-sky-300 bg-clip-text text-transparent"
                whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 300 } }}
            >
                hei.
            </motion.div>
        </Link>

        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-200 hover:text-purple-300 text-2xl z-50"
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 bg-[#05010a]/95 backdrop-blur-3xl z-40 flex flex-col items-center justify-center space-y-7 pt-16 px-6"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {navItems.map((item) => {
                const href = getHref(item.path);
                return (
                    <Link 
                        key={`mobile-${item.id}`} 
                        href={href} 
                        passHref
                        onClick={(e) => handleNavLinkClick(e, item.path, item.id)}
                    >
                        <motion.span
                            className={`text-xl font-medium tracking-wide ${activeSection === item.id ? 'text-purple-200' : 'text-slate-300/80'} hover:text-purple-100 transition-colors duration-200 flex items-center gap-3 cursor-pointer`}
                            whileHover={{ x: 6 }}
                            whileTap={{ scale: 0.95 }}
                        >
                        {item.icon}
                        <span>{item.label}</span>
                        </motion.span>
                    </Link>
                );
            })}
            <motion.button
                className={`mt-10 px-5 py-2 rounded-full border border-white/10 flex items-center gap-2 text-sm uppercase tracking-[0.25em] transition-colors duration-300 ${isDarkMode ? 'text-amber-200 hover:bg-white/5' : 'text-sky-200 hover:bg-white/10'}`}
                whileHover={{ scale: 1.08, rotate: isDarkMode ? -6 : 6 }} 
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
                {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
                <span>{isDarkMode ? 'Light' : 'Dark'}</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        className="hidden md:flex fixed top-0 left-0 h-full w-24 bg-[#04010a]/80 backdrop-blur-2xl border-r border-white/10 z-50 flex-col items-center justify-between py-10 shadow-[0_0_60px_rgba(59,7,100,0.25)]"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <Link href="/" passHref onClick={(e) => handleNavLinkClick(e, '/', 'home')}>
          <motion.div
            className="text-[28px] font-semibold tracking-tight cursor-pointer bg-gradient-to-r from-purple-300 via-fuchsia-400 to-sky-200 bg-clip-text text-transparent"
            whileHover={{ scale: 1.08, rotate: 6, transition: { type: "spring", stiffness: 280, damping: 12 } }}
            whileTap={{ scale: 0.95, rotate: -4, transition: { type: "spring", stiffness: 320, damping: 15 } }}
            aria-label="Home"
          >
            hei.
          </motion.div>
        </Link>

        <div className="flex flex-col items-center space-y-6 relative">
          {navItems.map((item) => {
            if (item.id === 'home') return null;

            const href = getHref(item.path);
            
            return (
                <Link 
                    href={href} 
                    key={`desktop-${item.id}`} 
                    passHref
                    legacyBehavior={false}
                    onClick={(e) => handleNavLinkClick(e, item.path, item.id)}                    
                    title={item.label}
                    className={`relative group w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 ${ 
                      activeSection === item.id 
                        ? 'bg-white/10 text-purple-200 shadow-[0_0_25px_rgba(168,85,247,0.35)]' 
                        : 'text-slate-400 hover:bg-white/5 hover:text-purple-200'
                    }`}
                >
                    <motion.span 
                        className="text-lg block" 
                        whileHover={{ scale: 1.08, transition: { type: "spring", stiffness: 320 } }} 
                        whileTap={{ scale: 0.92 }}
                    >
                        {item.icon}
                    </motion.span>
                    <span 
                        className="absolute left-full ml-4 px-3 py-1.5 whitespace-nowrap bg-[#0f1120] text-slate-100 text-xs font-medium rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none scale-90 group-hover:scale-100 origin-left z-10 border border-white/5"
                    >
                        {item.label}
                    </span>
                    {activeSection === item.id && (
                        <motion.div 
                        className="absolute -right-2 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-gradient-to-b from-purple-400 via-fuchsia-400 to-sky-300 rounded-full"
                        layoutId="activeIndicator"
                        transition={{ type: "spring", stiffness: 480, damping: 30 }}
                        />
                    )}
                </Link>
            );
          })}
        </div>

        <motion.button
          className={`px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 transition-colors duration-300 text-xs tracking-[0.3em] uppercase ${isDarkMode ? 'text-amber-200 hover:bg-white/5' : 'text-sky-200 hover:bg-white/10'}`}
          whileHover={{ scale: 1.05, rotate: isDarkMode ? -6 : 6, transition: { type: "spring", stiffness: 300, damping: 12 } }}
          whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 400, damping: 18 } }}
          onClick={toggleTheme}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
          <span>{isDarkMode ? 'Light' : 'Dark'}</span>
        </motion.button>
      </motion.nav>
    </>
  );
};

export default VerticalNavigation; 
