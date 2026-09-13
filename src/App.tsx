import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HookSection } from './components/HookSection';
import { ProjectsHook } from './components/ProjectsHook';
import { SkillsHook } from './components/SkillsHook';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { SectionDivider } from './components/SectionDivider';
import { Ticker } from './components/Ticker';
import { Footer } from './components/Footer';
import { ConnectModal } from './components/ConnectModal';
import { TabId } from './types';

const VALID_TABS: TabId[] = ['home', 'about', 'projects', 'skills', 'contact'];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');

  // Enforce scroll to top and reset to Hero section on page refresh/load
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Clean hash on reload so user starts cleanly at the hero section
    if (window.location.hash && window.location.hash !== '#home') {
      window.history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // Keep URL hash in sync with tab changes while browsing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase() as TabId;
      if (VALID_TABS.includes(hash)) {
        setActiveTab(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectTab = (tab: TabId) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLightTab = activeTab === 'about' || activeTab === 'skills';

  // Synchronize document theme and body background with active tab
  useEffect(() => {
    if (isLightTab) {
      document.documentElement.classList.add('light');
      document.body.style.backgroundColor = '#FAF9F5';
    } else {
      document.documentElement.classList.remove('light');
      document.body.style.backgroundColor = '#0B111E';
    }
  }, [isLightTab]);

  return (
    <div
      className={`min-h-screen w-full max-w-full flex flex-col font-sans transition-colors duration-200 selection:bg-sky-500/30 selection:text-white ${
        isLightTab ? 'bg-[#FAF9F5] text-slate-900' : 'bg-[#0B111E] text-[#E2E8F0]'
      }`}
    >
      <Navbar activeTab={activeTab} onSelectTab={handleSelectTab} />

      <main
        className={`flex-grow w-full max-w-full pt-16 sm:pt-18 lg:pt-14 ${
          isLightTab ? 'bg-[#FAF9F5] text-slate-900' : ''
        }`}
      >
        {/* Animated Single-Tab View Engine */}
        <div key={activeTab} className="w-full max-w-full animate-in fade-in duration-300">
          {activeTab === 'home' && (
            <>
              <Hero onNavigate={handleSelectTab} />
              <SectionDivider variant="light" label="OVERVIEW" />
              <HookSection onNavigate={handleSelectTab} />
              <SectionDivider variant="dark" label="FEATURED" />
              <ProjectsHook onNavigate={handleSelectTab} />
              <SectionDivider variant="light" label="SKILLS" />
              <SkillsHook onNavigate={handleSelectTab} />
            </>
          )}
          {activeTab === 'about' && <About />}
          {activeTab === 'projects' && <Projects />}
          {activeTab === 'skills' && <Skills />}
          {activeTab === 'contact' && <Contact />}
        </div>
      </main>

      <SectionDivider variant="light" />
      <Ticker />
      <Footer onSelectTab={handleSelectTab} />
      <ConnectModal />
    </div>
  );
}


