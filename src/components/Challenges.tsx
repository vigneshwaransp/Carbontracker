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
    <div className="challenges-container">
      <div className="challenges-header">
        <div>
          <h2 className="challenges-title">Daily Challenges</h2>
          <p className="challenges-subtitle">Complete eco-friendly tasks and earn points!</p>
        </div>
        <div className="challenges-points-card">
          <div className="challenges-points-value">{totalPoints}</div>
          <div className="challenges-points-label">Points Earned</div>
        </div>
      </div>

      <div className="challenges-grid">
        {CHALLENGES.map(ch => {
          const done = completedIds.includes(ch.id);
          return (
            <div key={ch.id} className={`challenge-card ${done ? 'done' : ''}`}>
              <div className="challenge-card-header">
                <span className="challenge-icon">
                  <span role="img" aria-hidden="true">{ch.icon}</span>
                </span>
                <span className="challenge-points-badge">+{ch.points} pts</span>
              </div>
              <h3 className="challenge-title">{ch.title}</h3>
              <p className="challenge-description">{ch.description}</p>
              <button 
                onClick={() => onToggle(ch.id)} 
                aria-pressed={done}
                aria-label={`Toggle challenge: ${ch.title}`}
                className="nm-btn"
                style={{
                  width: '100%',
                  background: done ? 'linear-gradient(135deg, #48bb78, #38a169)' : '',
                  color: done ? '#ffffff' : '',
                  boxShadow: done ? 'none' : '',
                }}
              >
                {done ? '✓ Completed' : 'Mark Complete'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
