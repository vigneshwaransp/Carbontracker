import React, { useState, useCallback } from 'react';
import { UserProfile, CarbonBreakdown } from './types';
import { calculateCarbon } from './utils/carbonCalc';
import { getPersonalizedTips } from './utils/tipEngine';
import { loadUserData, saveProfile, addCarbonLog, toggleChallenge, resetAllData } from './utils/storage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OnboardingWizard } from './components/OnboardingWizard';
import { Dashboard } from './components/Dashboard';
import { TipsPanel } from './components/TipsPanel';
import { Challenges } from './components/Challenges';
import { Footer } from './components/Footer';

type AppView = 'hero' | 'onboarding' | 'Dashboard' | 'Tips' | 'Challenges';

const App: React.FC = () => {
  // Load saved data synchronously on mount
  const initialData = loadUserData();

  const [view, setView] = useState<AppView>(() => 
    initialData.onboardingComplete && initialData.profile ? 'Dashboard' : 'hero'
  );
  const [profile, setProfile] = useState<UserProfile | null>(() => 
    initialData.profile
  );
  const [breakdown, setBreakdown] = useState<CarbonBreakdown | null>(() => 
    initialData.profile ? calculateCarbon(initialData.profile) : null
  );
  const [completedChallenges, setCompletedChallenges] = useState<string[]>(() => 
    initialData.completedChallenges
  );

  const handleOnboardingComplete = useCallback((newProfile: UserProfile) => {
    setProfile(newProfile);
    const newBreakdown = calculateCarbon(newProfile);
    setBreakdown(newBreakdown);
    saveProfile(newProfile);
    // Log today's carbon
    addCarbonLog({
      date: new Date().toISOString().split('T')[0],
      total: newBreakdown.total,
      breakdown: newBreakdown,
    });
    setView('Dashboard');
  }, []);

  const handleNavigate = useCallback((page: string) => {
    setView(page as AppView);
  }, []);

  const handleReset = useCallback(() => {
    if (window.confirm('Reset all data? This cannot be undone.')) {
      resetAllData();
      setProfile(null);
      setBreakdown(null);
      setCompletedChallenges([]);
      setView('hero');
    }
  }, []);

  const handleToggleChallenge = useCallback((id: string) => {
    toggleChallenge(id);
    setCompletedChallenges(prev => {
      const idx = prev.indexOf(id);
      if (idx >= 0) return prev.filter(c => c !== id);
      return [...prev, id];
    });
  }, []);

  const handleEdit = useCallback(() => {
    setView('onboarding');
  }, []);

  // Hero or Onboarding (no navbar)
  if (view === 'hero') {
    return (
      <>
        <Hero onStart={() => setView('onboarding')} />
        <Footer />
      </>
    );
  }

  if (view === 'onboarding') {
    return (
      <>
        <OnboardingWizard onComplete={handleOnboardingComplete} />
        <Footer />
      </>
    );
  }

  // App views with navbar
  const tips = profile && breakdown ? getPersonalizedTips(profile, breakdown) : [];

  return (
    <>
      <Navbar currentPage={view} onNavigate={handleNavigate} onReset={handleReset} />
      <main style={{ flex: 1 }}>
        {view === 'Dashboard' && profile && breakdown && (
          <Dashboard profile={profile} breakdown={breakdown} onEdit={handleEdit} />
        )}
        {view === 'Tips' && (
          <TipsPanel tips={tips} />
        )}
        {view === 'Challenges' && (
          <Challenges completedIds={completedChallenges} onToggle={handleToggleChallenge} />
        )}
      </main>
      <Footer />
    </>
  );
};

export default App;
