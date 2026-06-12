import React from 'react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <>
      <style>{`
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes pulse-orb { 0%,100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.1); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <div className="hero-container">
        {/* Soft colored orbs (decorative only) */}
        <div aria-hidden="true" className="hero-orb-1" />
        <div aria-hidden="true" className="hero-orb-2" />
        <div aria-hidden="true" className="hero-orb-3" />

        <div className="hero-content">
          <div className="hero-globe">
            <span role="img" aria-label="Globe">🌍</span>
          </div>
          <h1 className="hero-title">
            Understand Your<br />Carbon Footprint
          </h1>
          <p className="hero-subtitle">
            Track your daily impact, get personalized insights, and discover simple actions
            to reduce your environmental footprint — one step at a time.
          </p>
          <button onClick={onStart} className="hero-cta">
            Get Started <span aria-hidden="true">→</span>
          </button>
        </div>

        {/* Feature cards */}
        <div className="hero-features">
          {[
            { icon: '📊', label: 'Bar chart', title: 'Track', desc: 'Calculate your carbon emissions from transport, home, food & shopping' },
            { icon: '🧠', label: 'Brain', title: 'Understand', desc: 'See how you compare to global averages with visual breakdowns' },
            { icon: '🌱', label: 'Sprout', title: 'Reduce', desc: 'Get personalized tips and daily challenges to lower your impact' },
          ].map((f, i) => (
            <div 
              key={f.title} 
              className="hero-feature-card"
              style={{ animation: `float 5s ease-in-out infinite ${i * 0.5}s` }}
            >
              <div className="hero-feature-icon">
                <span role="img" aria-label={f.label}>{f.icon}</span>
              </div>
              <h3 className="hero-feature-title">{f.title}</h3>
              <p className="hero-feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
