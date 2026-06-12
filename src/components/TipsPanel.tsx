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
    <div className="tips-container">
      <h2 className="tips-title">Personalized Tips</h2>
      <p className="tips-subtitle">Actions sorted by your highest-impact areas</p>

      {/* Filter tabs */}
      <div className="tips-filter-tabs" role="tablist" aria-label="Filter tips by category">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setFilter(cat)} 
            role="tab"
            aria-selected={filter === cat}
            aria-controls="tips-grid"
            style={{
              background: filter === cat ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#e0e5ec',
              color: filter === cat ? '#ffffff' : '#718096',
              boxShadow: filter === cat
                ? 'inset 5px 5px 10px #b8bec7, inset -5px -5px 10px #ffffff'
                : '5px 5px 10px #b8bec7, -5px -5px 10px #ffffff',
            }}
            className="nm-btn"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tips grid */}
      <div id="tips-grid" className="tips-grid" role="region" aria-live="polite">
        {filtered.map(tip => (
          <div key={tip.id} className="tip-card">
            <div className="tip-header">
              <span className="tip-icon">
                <span role="img" aria-hidden="true">{tip.icon}</span>
              </span>
              <span 
                className="tip-difficulty-badge"
                style={{ color: difficultyColors[tip.difficulty] }}
              >
                {tip.difficulty}
              </span>
            </div>
            <h3 className="tip-title">{tip.title}</h3>
            <p className="tip-description">{tip.description}</p>
            <div className="tip-savings">
              <span className="tip-savings-text">
                <span role="img" aria-hidden="true">💚</span> Save {tip.savingsKgPerYear} kg/year
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
