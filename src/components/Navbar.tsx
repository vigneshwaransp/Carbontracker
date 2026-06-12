import React from 'react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onReset }) => {
  const navItems = ['Dashboard', 'Tips', 'Challenges'];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: '#e0e5ec',
      boxShadow: '0 4px 12px #b8bec7',
      padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: '68px',
    }} aria-label="Main Navigation">
      <button 
        onClick={() => onNavigate('Dashboard')} 
        style={{
          fontSize: '1.4rem', fontWeight: 700, cursor: 'pointer',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          border: 'none', padding: 0, outline: 'none', fontFamily: 'inherit',
        }}
        aria-label="EcoTrack Home"
      >
        <span role="img" aria-hidden="true">🌍</span> EcoTrack
      </button>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {navItems.map(item => (
          <button key={item} onClick={() => onNavigate(item)} 
            aria-pressed={currentPage === item}
            style={{
              background: currentPage === item ? '#e0e5ec' : 'transparent',
              border: 'none',
              color: currentPage === item ? '#667eea' : '#718096',
              fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer',
              padding: '0.5rem 1.2rem', borderRadius: '12px',
              boxShadow: currentPage === item ? 'inset 3px 3px 6px #b8bec7, inset -3px -3px 6px #ffffff' : 'none',
              transition: 'all 0.3s ease',
            }}>
            {item}
          </button>
        ))}
      </div>
      <button onClick={onReset} style={{
        background: '#e0e5ec',
        boxShadow: '3px 3px 6px #b8bec7, -3px -3px 6px #ffffff',
        border: 'none',
        color: '#fc8181', padding: '0.4rem 0.8rem', borderRadius: '10px',
        fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600,
        transition: 'all 0.3s ease',
      }} title="Reset all data" aria-label="Reset all data">Reset</button>
    </nav>
  );
};
