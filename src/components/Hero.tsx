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
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '2rem',
        background: '#e0e5ec',
      }}>
        {/* Soft colored orbs */}
        <div style={{
          position: 'absolute', width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(102,126,234,0.15), transparent 70%)',
          top: '10%', left: '10%', animation: 'pulse-orb 6s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: '350px', height: '350px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(118,75,162,0.12), transparent 70%)',
          bottom: '15%', right: '10%', animation: 'pulse-orb 8s ease-in-out infinite 2s',
        }} />
        <div style={{
          position: 'absolute', width: '250px', height: '250px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(72,187,120,0.1), transparent 70%)',
          top: '40%', right: '30%', animation: 'pulse-orb 7s ease-in-out infinite 1s',
        }} />

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '800px', animation: 'fadeInUp 1s ease-out' }}>
          <div style={{ fontSize: '4.5rem', marginBottom: '1rem' }}>🌍</div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, margin: '0 0 1rem',
            background: 'linear-gradient(135deg, #667eea, #764ba2, #48bb78)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            lineHeight: 1.2,
          }}>
            Understand Your<br />Carbon Footprint
          </h1>
          <p style={{
            color: '#718096', fontSize: '1.15rem', maxWidth: '600px',
            margin: '0 auto 2.5rem', lineHeight: 1.7,
          }}>
            Track your daily impact, get personalized insights, and discover simple actions
            to reduce your environmental footprint — one step at a time.
          </p>
          <button onClick={onStart} style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: '#ffffff', border: 'none', padding: '1rem 2.5rem', borderRadius: '16px',
            fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            boxShadow: '5px 5px 15px #b8bec7, -5px -5px 15px #ffffff',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '8px 8px 20px #b8bec7, -8px -8px 20px #ffffff'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '5px 5px 15px #b8bec7, -5px -5px 15px #ffffff'; }}
          >
            Get Started →
          </button>
        </div>

        {/* Feature cards */}
        <div style={{
          display: 'flex', gap: '1.5rem', marginTop: '4rem', flexWrap: 'wrap',
          justifyContent: 'center', position: 'relative', zIndex: 1,
          animation: 'fadeInUp 1s ease-out 0.3s both',
        }}>
          {[
            { icon: '📊', title: 'Track', desc: 'Calculate your carbon emissions from transport, home, food & shopping' },
            { icon: '🧠', title: 'Understand', desc: 'See how you compare to global averages with visual breakdowns' },
            { icon: '🌱', title: 'Reduce', desc: 'Get personalized tips and daily challenges to lower your impact' },
          ].map((f, i) => (
            <div key={f.title} style={{
              background: '#e0e5ec',
              boxShadow: '9px 9px 16px #b8bec7, -9px -9px 16px #ffffff',
              borderRadius: '20px',
              padding: '1.5rem', width: '220px', textAlign: 'center',
              animation: `float 5s ease-in-out infinite ${i * 0.5}s`,
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{f.icon}</div>
              <h3 style={{ color: '#2d3748', fontSize: '1.1rem', margin: '0 0 0.5rem', fontWeight: 700 }}>{f.title}</h3>
              <p style={{ color: '#718096', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
