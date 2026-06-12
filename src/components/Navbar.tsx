import React from 'react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onReset }) => {
  const navItems = ['Dashboard', 'Tips', 'Challenges'];

  return (
    <nav className="navbar" aria-label="Main Navigation">
      <button 
        onClick={() => onNavigate('Dashboard')} 
        className="nav-logo"
        aria-label="EcoTrack Home"
      >
        <span role="img" aria-hidden="true">🌍</span> EcoTrack
      </button>
      <div className="nav-links">
        {navItems.map(item => (
          <button 
            key={item} 
            onClick={() => onNavigate(item)} 
            aria-pressed={currentPage === item}
            className={`nav-link ${currentPage === item ? 'active' : ''}`}
          >
            {item}
          </button>
        ))}
      </div>
      <button 
        onClick={onReset} 
        className="nav-reset-btn"
        title="Reset all data" 
        aria-label="Reset all data"
      >
        Reset
      </button>
    </nav>
  );
};
