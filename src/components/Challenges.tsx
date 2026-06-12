import React from 'react';

interface ChallengesProps {
  completedIds: string[];
  onToggle: (id: string) => void;
}

const CHALLENGES = [
  { id: 'c1', icon: '🚶', title: 'Walk 10,000 steps', description: 'Skip the car today and walk to nearby destinations.', points: 15, category: 'transport' },
  { id: 'c2', icon: '🥗', title: 'Meatless meal', description: 'Eat a fully plant-based meal today.', points: 10, category: 'food' },
  { id: 'c3', icon: '🔌', title: 'Unplug devices', description: 'Unplug 5 devices that are on standby mode.', points: 5, category: 'home' },
  { id: 'c4', icon: '🛍️', title: 'No new purchases', description: 'Go the entire day without buying anything new.', points: 10, category: 'shopping' },
  { id: 'c5', icon: '🚲', title: 'Bike commute', description: 'Use a bicycle for at least one trip today.', points: 20, category: 'transport' },
  { id: 'c6', icon: '💧', title: '5-minute shower', description: 'Keep your shower under 5 minutes to save water and energy.', points: 10, category: 'home' },
  { id: 'c7', icon: '🧺', title: 'Air dry laundry', description: 'Skip the dryer and hang your clothes to dry.', points: 10, category: 'home' },
  { id: 'c8', icon: '🌿', title: 'Plant something', description: 'Plant a seed, herb, or tree today.', points: 25, category: 'food' },
  { id: 'c9', icon: '📦', title: 'Reuse a container', description: 'Use a reusable bag, bottle, or container instead of disposable.', points: 5, category: 'shopping' },
  { id: 'c10', icon: '💡', title: 'Lights off challenge', description: 'Use only natural light until sunset.', points: 10, category: 'home' },
  { id: 'c11', icon: '🍳', title: 'Cook at home', description: 'Prepare all meals at home — no takeout or delivery.', points: 15, category: 'food' },
  { id: 'c12', icon: '🧘', title: 'Digital detox hour', description: 'Turn off screens for 1 hour to save energy and relax.', points: 10, category: 'home' },
];

export const Challenges: React.FC<ChallengesProps> = ({ completedIds, onToggle }) => {
  const totalPoints = CHALLENGES.filter(c => completedIds.includes(c.id)).reduce((sum, c) => sum + c.points, 0);

  return (
    <div style={{ padding: '5rem 1.5rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <div>
          <h2 style={{
            background: 'linear-gradient(135deg, #ecc94b, #ed8936)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            fontSize: '2rem', fontWeight: 800, margin: '0 0 0.3rem',
          }}>Daily Challenges</h2>
          <p style={{ color: '#718096', margin: 0 }}>Complete eco-friendly tasks and earn points!</p>
        </div>
        <div style={{
          background: '#e0e5ec',
          boxShadow: '9px 9px 16px #b8bec7, -9px -9px 16px #ffffff',
          borderRadius: '20px', padding: '0.75rem 1.5rem', textAlign: 'center',
        }}>
          <div style={{ color: '#ed8936', fontSize: '1.5rem', fontWeight: 800 }}>{totalPoints}</div>
          <div style={{ color: '#718096', fontSize: '0.75rem', fontWeight: 600 }}>Points Earned</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
        {CHALLENGES.map(ch => {
          const done = completedIds.includes(ch.id);
          return (
            <div key={ch.id} style={{
              background: '#e0e5ec',
              boxShadow: done
                ? 'inset 5px 5px 10px #b8bec7, inset -5px -5px 10px #ffffff'
                : '9px 9px 16px #b8bec7, -9px -9px 16px #ffffff',
              borderRadius: '20px', padding: '1.25rem',
              transition: 'all 0.3s ease',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.8rem' }}>
                  <span role="img" aria-hidden="true">{ch.icon}</span>
                </span>
                <span style={{
                  background: '#e0e5ec',
                  boxShadow: 'inset 2px 2px 4px #b8bec7, inset -2px -2px 4px #ffffff',
                  color: '#9f7aea',
                  padding: '0.15rem 0.5rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700,
                }}>+{ch.points} pts</span>
              </div>
              <h3 style={{ color: '#2d3748', fontSize: '1rem', fontWeight: 600, margin: '0 0 0.4rem' }}>{ch.title}</h3>
              <p style={{ color: '#718096', fontSize: '0.82rem', lineHeight: 1.5, margin: '0 0 1rem' }}>{ch.description}</p>
              <button 
                onClick={() => onToggle(ch.id)} 
                aria-pressed={done}
                aria-label={`Toggle challenge: ${ch.title}`}
                style={{
                  width: '100%', padding: '0.6rem',
                  background: done ? 'linear-gradient(135deg, #48bb78, #38a169)' : '#e0e5ec',
                  boxShadow: done
                    ? 'none'
                    : '5px 5px 10px #b8bec7, -5px -5px 10px #ffffff',
                  border: 'none', borderRadius: '14px',
                  color: done ? '#ffffff' : '#718096',
                  cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
                  transition: 'all 0.3s ease',
                }}>{done ? '✓ Completed' : 'Mark Complete'}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
