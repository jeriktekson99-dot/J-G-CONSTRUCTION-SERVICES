/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Services from './components/Services';
import Showcase from './components/Showcase';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import ConsultationForm from './components/ConsultationForm';
import About from './components/About';
import ServicesPage from './components/ServicesPage';
import PortfolioPage from './components/PortfolioPage';
import GetStartedPage from './components/GetStartedPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';
import SafetyCompliance from './components/SafetyCompliance';
import AdminPortal from './components/AdminPortal';
import Footer from './components/Footer';
import { ViewType } from './types';
import ProjectShowcasePage from './components/ProjectShowcasePage';
import { Project, dataStore } from './utils/dataStore';
import { supabaseSync } from './utils/supabaseSync';
import { supabase, isSupabaseConfigured } from './utils/supabaseClient';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>(() => {
    const hash = window.location.hash.replace('#', '');
    const validViews = ['home', 'about', 'services', 'portfolio', 'get-started', 'privacy-policy', 'terms-of-use', 'safety-compliance', 'admin-portal'];
    if (hash && validViews.includes(hash)) {
      return hash as ViewType;
    }
    const saved = localStorage.getItem('jg_current_view');
    if (saved && validViews.includes(saved)) {
      return saved as ViewType;
    }
    return 'home';
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [syncVersion, setSyncVersion] = useState(0);
  const [isInitialSyncLoading, setIsInitialSyncLoading] = useState(true);

  // Sync hash and localStorage on currentView changes
  useEffect(() => {
    localStorage.setItem('jg_current_view', currentView);
    if (currentView === 'home') {
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } else {
      window.location.hash = currentView;
    }
  }, [currentView]);

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validViews = ['home', 'about', 'services', 'portfolio', 'get-started', 'privacy-policy', 'terms-of-use', 'safety-compliance', 'admin-portal'];
      if (hash && validViews.includes(hash)) {
        setCurrentView(hash as ViewType);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync data with Supabase database on mount
  useEffect(() => {
    setIsInitialSyncLoading(true);
    supabaseSync.pullAll().then(() => {
      // Apply monthly leads rollover logic
      dataStore.checkAndApplyRollover();
      setSyncVersion(prev => prev + 1);
      setIsInitialSyncLoading(false);
    }).catch((err) => {
      console.error(err);
      setIsInitialSyncLoading(false);
    });
  }, []);

  // Listen for local changes to dataStore to instantly update UI on this device
  useEffect(() => {
    const unsubscribe = dataStore.subscribe(() => {
      setSyncVersion(prev => prev + 1);
    });
    return unsubscribe;
  }, []);

  // Near-instant sync across different devices (real-time channel subscription & background polling)
  useEffect(() => {
    let realtimeChannel: any = null;

    const triggerSync = () => {
      if (document.visibilityState === 'visible') {
        supabaseSync.pullAll().then(() => {
          setSyncVersion(prev => prev + 1);
        }).catch((err) => {
          console.warn('[Sync] Background polling sync failed:', err);
        });
      }
    };

    // 1. Establish Live real-time Postgres changes channel subscription
    if (isSupabaseConfigured && supabase) {
      try {
        realtimeChannel = supabase
          .channel('public-db-changes')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public' },
            (payload) => {
              console.log('[Sync] Real-time database payload received:', payload);
              // Trigger instant data synchronization
              supabaseSync.pullAll().then(() => {
                setSyncVersion(prev => prev + 1);
              }).catch(err => {
                console.error('[Sync] Real-time pullAll sync error:', err);
              });
            }
          )
          .subscribe((status) => {
            console.log(`[Sync] Real-time subscription status: ${status}`);
          });
      } catch (err) {
        console.warn('[Sync] Failed to register real-time channel subscription:', err);
      }
    }

    // 2. Poll every 3 seconds as a fast fallback when the tab/window is visible
    const intervalId = setInterval(triggerSync, 3000);

    // Sync instantly when user clicks back onto the tab or window
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        triggerSync();
      }
    };

    window.addEventListener('focus', triggerSync);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('focus', triggerSync);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      if (realtimeChannel && supabase) {
        try {
          supabase.removeChannel(realtimeChannel);
        } catch (err) {
          console.warn('[Sync] Error cleaning up real-time channel:', err);
        }
      }
    };
  }, []);

  const handleSetView = (view: ViewType) => {
    setSelectedProject(null);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToSection = (id: string) => {
    setSelectedProject(null);
    if (id === 'consultation') {
      setCurrentView('get-started');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (id === 'services-view') {
      setCurrentView('services');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (id.startsWith('ser-')) {
      setCurrentView('services');
      setTimeout(() => {
        scrollToElement(id);
      }, 150);
      return;
    }
    // If not currently on the home view, switch to home first, then scroll
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        scrollToElement(id);
      }, 100);
    } else {
      scrollToElement(id);
    }
  };

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Height of fixed navigation bar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased overflow-x-hidden selection:bg-industrial-red selection:text-white">
      {/* Shared Navigation Bar */}
      <Navbar 
        currentView={currentView}
        setView={handleSetView}
        onScrollToSection={handleScrollToSection}
      />
      
      {/* View Content Delivery */}
      <div>
        {selectedProject ? (
          <ProjectShowcasePage 
            project={selectedProject}
            onBack={() => {
              setSelectedProject(null);
              // Scroll back to showcase section header if on home view
              if (currentView === 'home') {
                setTimeout(() => {
                  scrollToElement('showcase');
                }, 100);
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            onScrollToSection={(id) => {
              setSelectedProject(null);
              handleScrollToSection(id);
            }}
          />
        ) : (
          <>
            {currentView === 'home' && (
              <main>
                {/* Hero Section with interactive CAD mockup */}
                <Hero 
                  onGetStarted={() => setCurrentView('get-started')}
                  onViewProjects={() => handleScrollToSection('showcase')}
                />
                
                {/* Problem Statement & Solution Statement Splits */}
                <ProblemSolution />
                
                {/* Offered Services Section */}
                <Services onScrollToSection={handleScrollToSection} />
                
                {/* Project Showcases Section */}
                <Showcase 
                  onScrollToSection={handleScrollToSection} 
                  onSelectProject={setSelectedProject}
                  isInitialSyncLoading={isInitialSyncLoading}
                />
                
                {/* Why Choose Us Pillars Section */}
                <WhyChooseUs />
                
                {/* Testimonials Review Card Matrix */}
                <Testimonials />
                
                {/* Clean Estimating & Consultation Form */}
                <ConsultationForm onScrollToSection={handleScrollToSection} />
              </main>
            )}
  
            {currentView === 'about' && (
              <About onScrollToSection={handleScrollToSection} />
            )}
  
            {currentView === 'services' && (
              <ServicesPage onScrollToSection={handleScrollToSection} />
            )}
  
            {currentView === 'portfolio' && (
              <PortfolioPage 
                onScrollToSection={handleScrollToSection} 
                isInitialSyncLoading={isInitialSyncLoading}
              />
            )}
  
            {currentView === 'get-started' && (
              <GetStartedPage onScrollToSection={handleScrollToSection} />
            )}
  
            {currentView === 'privacy-policy' && (
              <PrivacyPolicy onScrollToSection={handleScrollToSection} />
            )}
  
            {currentView === 'terms-of-use' && (
              <TermsOfUse onScrollToSection={handleScrollToSection} />
            )}
  
            {currentView === 'safety-compliance' && (
              <SafetyCompliance onScrollToSection={handleScrollToSection} />
            )}
  
            {currentView === 'admin-portal' && (
              <AdminPortal 
                setView={handleSetView} 
                onScrollToSection={handleScrollToSection} 
                onViewLiveProject={(p) => {
                  setSelectedProject(p);
                  handleSetView('home');
                }}
                syncVersion={syncVersion}
              />
            )}
          </>
        )}
      </div>
      
      {/* Shared Structurally Verified Footer */}
      <Footer setView={handleSetView} onScrollToSection={handleScrollToSection} />
    </div>
  );
}

