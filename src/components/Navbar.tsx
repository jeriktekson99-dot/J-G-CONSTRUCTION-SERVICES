import React, { useState, useEffect } from 'react';
import SgLogo from './SgLogo';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'about' | 'services' | 'portfolio' | 'get-started' | 'privacy-policy' | 'terms-of-use' | 'safety-compliance';
  setView: (view: 'home' | 'about' | 'services' | 'portfolio' | 'get-started' | 'privacy-policy' | 'terms-of-use' | 'safety-compliance') => void;
  onScrollToSection: (id: string) => void;
}

export default function Navbar({ currentView, setView, onScrollToSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    onScrollToSection(sectionId);
  };

  const handleViewClick = (viewName: 'home' | 'about' | 'services' | 'portfolio' | 'get-started' | 'privacy-policy' | 'terms-of-use' | 'safety-compliance') => {
    setIsOpen(false);
    setView(viewName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav 
      id="jg-nav-bar"
      className={`fixed top-0 left-0 w-full z-50 bg-white transition-all duration-300 ${
        scrolled ? 'border-b border-black shadow-[0_2px_15px_rgba(0,0,0,0.05)] py-3' : 'border-b border-gray-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Left: Brand logo & name */}
          <button 
            onClick={() => handleViewClick('home')}
            className="flex items-center gap-3 group cursor-pointer focus:outline-none"
            aria-label="J/G Construction Services Homepage"
          >
            <div className="transition-transform duration-500 group-hover:rotate-12">
              <SgLogo className="h-9 w-9 sm:h-10 sm:w-10" />
            </div>
            <span className="font-display font-extrabold text-[#111111] tracking-tight hover:text-industrial-red transition-colors text-base sm:text-lg lg:text-xl">
              J/G CONSTRUCTION SERVICES
            </span>
          </button>

          {/* Center/Right: Nav links for wide screens - Exactly: Home, About, Services, Portfolio */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <button 
              onClick={() => handleViewClick('home')} 
              className={`font-display font-bold text-sm transition-colors cursor-pointer ${
                currentView === 'home' ? 'text-industrial-red border-b-2 border-industrial-red pb-1' : 'text-gray-600 hover:text-black hover:border-b hover:border-black pb-1'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => handleViewClick('about')} 
              className={`font-display font-bold text-sm transition-colors cursor-pointer ${
                currentView === 'about' ? 'text-industrial-red border-b-2 border-industrial-red pb-1' : 'text-gray-600 hover:text-black hover:border-b hover:border-black pb-1'
              }`}
            >
              About
            </button>
            <button 
              onClick={() => handleViewClick('services')} 
              className={`font-display font-bold text-sm transition-colors cursor-pointer ${
                currentView === 'services' ? 'text-industrial-red border-b-2 border-industrial-red pb-1' : 'text-gray-600 hover:text-black hover:border-b hover:border-black pb-1'
              }`}
            >
              Services
            </button>
            <button 
              onClick={() => handleViewClick('portfolio')} 
              className={`font-display font-bold text-sm transition-colors cursor-pointer ${
                currentView === 'portfolio' ? 'text-industrial-red border-b-2 border-industrial-red pb-1' : 'text-gray-600 hover:text-black hover:border-b hover:border-black pb-1'
              }`}
            >
              Portfolio
            </button>
          </div>

          {/* Far Right: CTA Action - Get Started */}
          <div className="hidden md:block">
            <button
              onClick={() => handleViewClick('get-started')}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xs font-black uppercase text-gray-900 rounded-none group bg-gradient-to-br from-industrial-red to-engineering-blue focus:ring-2 focus:outline-none focus:ring-[#1B49B8] transition-all cursor-pointer"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-black font-display font-bold group-hover:bg-opacity-0 group-hover:text-white flex items-center gap-2">
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black p-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-black">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 text-left">
            <button
              onClick={() => handleViewClick('home')}
              className={`block w-full text-left px-3 py-3 rounded-none text-base font-bold transition-colors ${
                currentView === 'home' ? 'text-industrial-red font-black bg-gray-50' : 'text-gray-700 hover:text-black hover:bg-gray-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleViewClick('about')}
              className={`block w-full text-left px-3 py-3 rounded-none text-base font-bold transition-colors ${
                currentView === 'about' ? 'text-industrial-red font-black bg-gray-50' : 'text-gray-700 hover:text-black hover:bg-gray-50'
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleViewClick('services')}
              className={`block w-full text-left px-3 py-3 rounded-none text-base font-bold transition-colors ${
                currentView === 'services' ? 'text-industrial-red font-black bg-gray-50' : 'text-gray-700 hover:text-black hover:bg-gray-50'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => handleViewClick('portfolio')}
              className={`block w-full text-left px-3 py-3 rounded-none text-base font-bold transition-colors ${
                currentView === 'portfolio' ? 'text-industrial-red font-black bg-gray-50' : 'text-gray-700 hover:text-black hover:bg-gray-50'
              }`}
            >
              Portfolio
            </button>
            <div className="pt-3 px-3">
              <button
                onClick={() => handleViewClick('get-started')}
                className="w-full bg-industrial-red hover:bg-industrial-red-hover text-white font-display font-bold py-3 text-center block transition-colors shadow-sm cursor-pointer text-sm uppercase tracking-wider"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
