import React, { useState } from 'react';
import { Tip } from '../types';

interface TipsPanelProps {
  tips: Tip[];
}

const difficultyColors: Record<string, string> = {
  easy: '#48bb78',
  medium: '#ecc94b',
  hard: '#fc8181',
};

export const TipsPanel: React.FC<TipsPanelProps> = ({ tips }) => {
  const [filter, setFilter] = useState<string>('all');
  const categories = ['all', 'transport', 'home', 'food', 'shopping'];
  const filtered = filter === 'all' ? tips : tips.filter(t => t.category === filter);

  return (
    <div style={{ padding: '5rem 1.5rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <h2 style={{
        background: 'linear-gradient(135deg, #667eea, #48bb78)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        fontSize: '2rem', fontWeight: 800, margin: '0 0 0.5rem',
      }}>Personalized Tips</h2>
      <p style={{ color: '#718096', marginBottom: '1.5rem' }}>Actions sorted by your highest-impact areas</p>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }} role="tablist" aria-label="Filter tips by category">
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} 
            role="tab"
            aria-selected={filter === cat}
            aria-controls="tips-grid"
            style={{
              background: filter === cat ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#e0e5ec',
              color: filter === cat ? '#ffffff' : '#718096',
              border: 'none',
              padding: '0.5rem 1.2rem', borderRadius: '14px', cursor: 'pointer',
              fontWeight: 600, fontSize: '0.85rem', textTransform: 'capitalize' as const,
              boxShadow: filter === cat
                ? 'inset 5px 5px 10px #b8bec7, inset -5px -5px 10px #ffffff'
                : '5px 5px 10px #b8bec7, -5px -5px 10px #ffffff',
              transition: 'all 0.3s ease',
            }}>{cat}</button>
        ))}
      </div>

      {/* Tips grid */}
      <div id="tips-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }} role="region" aria-live="polite">
        {filtered.map(tip => (
          <div key={tip.id} style={{
            background: '#e0e5ec',
            boxShadow: '9px 9px 16px #b8bec7, -9px -9px 16px #ffffff',
            borderRadius: '20px',
            padding: '1.5rem', transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'default',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '12px 12px 20px #b8bec7, -12px -12px 20px #ffffff'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '9px 9px 16px #b8bec7, -9px -9px 16px #ffffff'; }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '2rem' }}>
                <span role="img" aria-hidden="true">{tip.icon}</span>
              </span>
              <span style={{
                background: '#e0e5ec',
                boxShadow: 'inset 2px 2px 4px #b8bec7, inset -2px -2px 4px #ffffff',
                color: difficultyColors[tip.difficulty],
                padding: '0.2rem 0.6rem', borderRadius: '8px', fontSize: '0.7rem',
                fontWeight: 700, textTransform: 'uppercase' as const,
              }}>{tip.difficulty}</span>
            </div>
            <h3 style={{ color: '#2d3748', fontSize: '1.05rem', fontWeight: 600, margin: '0 0 0.5rem' }}>{tip.title}</h3>
            <p style={{ color: '#718096', fontSize: '0.85rem', lineHeight: 1.6, margin: '0 0 1rem' }}>{tip.description}</p>
            <div style={{
              background: '#e0e5ec',
              boxShadow: 'inset 2px 2px 4px #b8bec7, inset -2px -2px 4px #ffffff',
              borderRadius: '10px', padding: '0.4rem 0.75rem', display: 'inline-block',
            }}>
              <span style={{ color: '#48bb78', fontWeight: 700, fontSize: '0.85rem' }}>
                <span role="img" aria-hidden="true">💚</span> Save {tip.savingsKgPerYear} kg/year
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
