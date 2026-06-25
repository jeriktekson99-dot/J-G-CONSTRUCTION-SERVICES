import React, { useState, useEffect } from 'react';
import SgLogo from './SgLogo';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Video, 
  Instagram, 
  Facebook, 
  Clock
} from 'lucide-react';

import { ViewType } from '../types';

interface FooterProps {
  setView?: (view: ViewType) => void;
  onScrollToSection?: (id: string) => void;
}

export default function Footer({ setView, onScrollToSection }: FooterProps) {
  const currentYear = 2026;

  const [facebookUrl, setFacebookUrl] = useState('https://facebook.com');
  const [tiktokUrl, setTiktokUrl] = useState('https://tiktok.com');
  const [instagramUrl, setInstagramUrl] = useState('https://instagram.com');

  useEffect(() => {
    const loadSocial = () => {
      setFacebookUrl(localStorage.getItem('jg_facebook_url') || 'https://facebook.com');
      setTiktokUrl(localStorage.getItem('jg_tiktok_url') || 'https://tiktok.com');
      setInstagramUrl(localStorage.getItem('jg_instagram_url') || 'https://instagram.com');
    };
    loadSocial();
    window.addEventListener('jg_social_routing_updated', loadSocial);
    return () => window.removeEventListener('jg_social_routing_updated', loadSocial);
  }, []);

  const handleLinkClick = (view: ViewType) => {
    if (setView) {
      setView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSectionClick = (sectionId: string) => {
    if (onScrollToSection) {
      onScrollToSection(sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <footer id="main-footer" className="bg-white border-t-2 border-black pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-gray-200">
          
          {/* Col 1: Brand details */}
          <div className="lg:col-span-4 space-y-4">
            <button 
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-3 justify-start cursor-pointer focus:outline-none group text-left"
            >
              <SgLogo className="h-8 w-8 text-black group-hover:rotate-6 transition-transform duration-300" />
              <span className="font-display font-extrabold tracking-tight text-black text-lg">
                J/G ENGINEERING
              </span>
            </button>
            <p className="font-sans text-xs text-gray-600 leading-relaxed max-w-sm">
              We specialize in Architectural & Finishing Works including Renovation & Fit Out, Structural, Electrical, and Plumbing Works, committed to total customer satisfaction.
            </p>
             <div className="flex gap-3 pt-2">
              <a 
                href={tiktokUrl} 
                target="_blank" 
                rel="noreferrer"
                className="p-2 border border-gray-300 text-gray-500 hover:text-black hover:border-black transition-colors"
                aria-label="TikTok Profile"
              >
                <Video className="h-4 w-4" />
              </a>
              <a 
                href={instagramUrl} 
                target="_blank" 
                rel="noreferrer"
                className="p-2 border border-gray-300 text-gray-500 hover:text-black hover:border-black transition-colors"
                aria-label="Instagram Profile"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href={facebookUrl} 
                target="_blank" 
                rel="noreferrer"
                className="p-2 border border-gray-300 text-gray-500 hover:text-black hover:border-black transition-colors"
                aria-label="Facebook Profile"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Services / Our Services */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="font-mono text-xs font-black text-black uppercase tracking-wider border-b border-black pb-2">
              Our Services
            </h5>
            <ul className="space-y-2.5 font-sans text-xs">
              <li>
                <button 
                  onClick={() => handleLinkClick('services')} 
                  className="text-gray-600 hover:text-industrial-red cursor-pointer transition-colors text-left"
                >
                  Architectural Planning & Drafting
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('services')} 
                  className="text-gray-600 hover:text-industrial-red cursor-pointer transition-colors text-left"
                >
                  Interior Fit-Out & Finishing Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('services')} 
                  className="text-gray-600 hover:text-industrial-red cursor-pointer transition-colors text-left"
                >
                  General Building Renovation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('services')} 
                  className="text-gray-600 hover:text-industrial-red cursor-pointer transition-colors text-left"
                >
                  Civil Works & Site Infrastructure
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('services')} 
                  className="text-gray-600 hover:text-industrial-red cursor-pointer transition-colors text-left"
                >
                  Structural Engineering & Design
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('services')} 
                  className="text-gray-600 hover:text-industrial-red cursor-pointer transition-colors text-left"
                >
                  Foundations & Concrete Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('services')} 
                  className="text-gray-600 hover:text-industrial-red cursor-pointer transition-colors text-left"
                >
                  Electrical Systems Engineering
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('services')} 
                  className="text-gray-600 hover:text-industrial-red cursor-pointer transition-colors text-left"
                >
                  Plumbing & Sanitary Engineering
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('services')} 
                  className="text-gray-600 hover:text-industrial-red cursor-pointer transition-colors text-left"
                >
                  Pre-Construction & Estimates
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company / Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="font-mono text-xs font-black text-black uppercase tracking-wider border-b border-black pb-2">
              Quick Links
            </h5>
            <ul className="space-y-2.5 font-sans text-xs">
              <li>
                <button 
                  onClick={() => handleLinkClick('home')} 
                  className="text-gray-600 hover:text-industrial-red cursor-pointer transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('about')} 
                  className="text-gray-600 hover:text-industrial-red cursor-pointer transition-colors text-left"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('services')} 
                  className="text-gray-600 hover:text-industrial-red cursor-pointer transition-colors text-left"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('portfolio')} 
                  className="text-gray-600 hover:text-industrial-red cursor-pointer transition-colors text-left"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('get-started')} 
                  className="text-gray-600 hover:text-industrial-red cursor-pointer transition-colors text-left"
                >
                  Get Started
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Address / Contacts */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="font-mono text-xs font-black text-black uppercase tracking-wider border-b border-black pb-2">
              Operational Hub
            </h5>
            <ul className="space-y-3 font-sans text-xs text-gray-600">
              <li className="flex gap-2 items-start">
                <MapPin className="h-4 w-4 text-industrial-red shrink-0 mt-0.5" />
                <span>
                  Lot 8, Block 6, Legian 2D Subdivision,<br />Carsadang Bago I, Imus City, Cavite,<br />Philippines
                </span>
              </li>
              <li className="flex gap-2 items-center">
                <Phone className="h-3.5 w-3.5 text-industrial-red shrink-0" />
                <span>(+63) 945 308 7399</span>
              </li>
              <li className="flex gap-2 items-center">
                <Mail className="h-3.5 w-3.5 text-industrial-red shrink-0" />
                <a href="mailto:jgconstruction880@gmail.com" className="hover:text-black transition-colors">
                  jgconstruction880@gmail.com
                </a>
              </li>
              <li className="flex gap-2 items-center">
                <Clock className="h-3.5 w-3.5 text-industrial-red shrink-0" />
                <span>Mon – Fri: 9 AM - 5 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright/legal row with NO system indicators/status tags */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="font-sans text-xs text-gray-500 text-center md:text-left">
            © {currentYear} J/G Engineering Services. All Rights Reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-mono text-gray-500 justify-center md:justify-end items-center">
            <button 
              type="button"
              onClick={() => handleLinkClick('admin-portal')}
              className="hover:text-industrial-red font-black transition-colors cursor-pointer text-xs font-mono bg-transparent border-none p-0 focus:outline-none"
            >
              Admin Portal
            </button>
            <span className="text-gray-300">/</span>
            <button 
              onClick={() => handleLinkClick('privacy-policy')}
              className="hover:text-black transition-colors cursor-pointer text-xs font-mono bg-transparent border-none p-0 focus:outline-none"
            >
              Privacy Policy
            </button>
            <span className="text-gray-300">/</span>
            <button 
              onClick={() => handleLinkClick('terms-of-use')}
              className="hover:text-black transition-colors cursor-pointer text-xs font-mono bg-transparent border-none p-0 focus:outline-none"
            >
              Terms of Use
            </button>
            <span className="text-gray-300">/</span>
            <button 
              onClick={() => handleLinkClick('safety-compliance')}
              className="hover:text-black transition-colors cursor-pointer text-xs font-mono bg-transparent border-none p-0 focus:outline-none"
            >
              Safety Standard Compliance
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
